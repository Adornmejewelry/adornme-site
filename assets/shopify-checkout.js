/**
 * Adornme — Shopify Storefront API Integration
 * Routes "Add to bag" clicks from adornme.ai to Shopify's checkout
 *
 * How it works:
 * 1. On page load, fetches all products + variants from Shopify Storefront API
 * 2. Builds a local map of "prototype product ID + metal + size" → Shopify variant ID
 * 3. When customer clicks "Add to bag", reads the current configuration and redirects
 *    to a Shopify checkout URL with that exact variant + custom attributes (initial, engraving, note)
 *
 * Customer flow:
 *   adornme.ai/product.html?id=necklace → clicks Add to bag →
 *   adornme-809.myshopify.com/cart/{variantId}:1?attributes[Initial]=A&attributes[Engraving]=...
 *   → Shopify checkout → Pay → Order received in Shopify admin
 */

const ADORNME_SHOPIFY = {
  domain: "adornme-809.myshopify.com",
  storefrontToken: "2482cf1bb40398a3d5c6d3d3d55d4059",
  apiVersion: "2026-04",
  variantMap: null, // populated after fetchProducts()
  ready: false,
  readyPromise: null,
};

/**
 * Fetch all products + variants from Shopify Storefront API and build a lookup map.
 * Map key format: "prototypeId|MetalLabel|SizeLabel" (case-sensitive, exact match)
 *   e.g. "necklace|Sterling Silver|16–18″" → "gid://shopify/ProductVariant/12345..."
 */
async function fetchShopifyVariants() {
  const query = `
    {
      products(first: 50) {
        edges {
          node {
            id
            handle
            title
            variants(first: 50) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  selectedOptions { name value }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(
    `https://${ADORNME_SHOPIFY.domain}/api/${ADORNME_SHOPIFY.apiVersion}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": ADORNME_SHOPIFY.storefrontToken,
      },
      body: JSON.stringify({ query }),
    }
  );

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status}`);
  }

  const data = await response.json();
  if (data.errors) {
    throw new Error(`Shopify GraphQL error: ${JSON.stringify(data.errors)}`);
  }

  const map = new Map();

  for (const productEdge of data.data.products.edges) {
    const product = productEdge.node;
    // The Shopify "handle" matches our prototype product IDs (because we set
    // Handle = id in the CSV import)
    const prototypeId = product.handle;

    for (const variantEdge of product.variants.edges) {
      const variant = variantEdge.node;
      const variantGid = variant.id; // e.g. "gid://shopify/ProductVariant/45678901234"

      // Build the map key from selected options. Match exactly what our CSV used.
      const opts = {};
      for (const o of variant.selectedOptions) {
        opts[o.name] = o.value;
      }

      const metal = opts.Metal || "";
      const size = opts.Size || "";
      const key = `${prototypeId}|${metal}|${size}`;

      // Extract the numeric ID at the end of the GID — that's what cart URLs use
      const numericId = variantGid.split("/").pop();

      map.set(key, {
        id: numericId,
        gid: variantGid,
        handle: prototypeId,
        title: variant.title,
        available: variant.availableForSale,
      });
    }
  }

  ADORNME_SHOPIFY.variantMap = map;
  ADORNME_SHOPIFY.ready = true;
  return map;
}

/**
 * Look up a Shopify variant ID by prototype product ID, metal, and size.
 * Returns null if not found.
 */
function findShopifyVariant(productId, metal, size) {
  if (!ADORNME_SHOPIFY.variantMap) return null;

  // Translate our internal metal name into the label used in Shopify
  const metalLabels = {
    silver: "Sterling Silver",
    vermeil: "Gold Vermeil",
    gold: "Solid 14k Gold",
  };
  const metalLabel = metalLabels[metal] || metal;
  const sizeLabel = size || "";

  const key = `${productId}|${metalLabel}|${sizeLabel}`;
  return ADORNME_SHOPIFY.variantMap.get(key) || null;
}

/**
 * Build a Shopify cart-permalink URL that adds the given variant to a cart,
 * with custom attributes (initial, engraving, gift note) attached.
 *
 * Format: https://store.myshopify.com/cart/{variantId}:{quantity}?attributes[Name]=Value
 */
function buildCheckoutUrl(variantId, attributes = {}) {
  let url = `https://${ADORNME_SHOPIFY.domain}/cart/${variantId}:1`;

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(attributes)) {
    if (value && String(value).trim()) {
      params.append(`attributes[${key}]`, value);
    }
  }

  const qs = params.toString();
  if (qs) url += `?${qs}`;

  return url;
}

/**
 * Main entry point — called when the customer clicks Add to bag.
 * Reads the current product configuration from the page state and redirects to Shopify.
 *
 * Expects the caller to pass:
 *   { productId, metal, size, initial, engraving, giftNote }
 */
async function addToShopifyCart(config) {
  // Wait for product map to be ready (in case the customer clicked early)
  if (!ADORNME_SHOPIFY.ready) {
    await ADORNME_SHOPIFY.readyPromise;
  }

  const variant = findShopifyVariant(config.productId, config.metal, config.size);

  if (!variant) {
    alert(
      "Sorry — this combination isn't available right now. Please try a different metal or size, or email mira@adornme.ai for assistance."
    );
    console.error("[Adornme] Variant not found for:", config);
    return;
  }

  // Build custom attributes — these appear on the order in Shopify admin
  const attributes = {};
  if (config.initial && config.initial !== "—") {
    attributes["Initial"] = config.initial;
  }
  if (config.engraving) {
    attributes["Engraving"] = config.engraving;
  }
  if (config.giftNote) {
    attributes["Gift note"] = config.giftNote;
  }

  const url = buildCheckoutUrl(variant.id, attributes);

  // Redirect customer to Shopify checkout
  window.location.href = url;
}

/**
 * Initialize on page load — start fetching variants immediately so the map is ready
 * by the time the customer clicks Add to bag.
 */
(function init() {
  ADORNME_SHOPIFY.readyPromise = fetchShopifyVariants().catch((err) => {
    console.error("[Adornme] Failed to load Shopify product data:", err);
    // Don't block the page — Add to bag will show a clear error if clicked
  });
})();

// Expose to global scope so page scripts can call it
window.AdornmeShopify = {
  addToCart: addToShopifyCart,
  findVariant: findShopifyVariant,
};
