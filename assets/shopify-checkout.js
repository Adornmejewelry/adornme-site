/**
 * Adornme — Shopify Storefront API Integration (v43.0, Nov 16 2026)
 * Shopify = source of truth for prices.
 *
 * Variant option model (must match Adornme_Shopify_Import_v40.csv):
 *   - Pieces with a drop:    Option1 = Metal, Option2 = Drop
 *   - Pieces without a drop: Option1 = Metal
 *   - The Adornme Chain:     Option1 = Metal, Option2 = Length
 *   Metal values: "Sterling Silver", "Gold Plated", "14K Gold", "18K Gold" (gold only on pieces with gold prices)
 *   Drop values:  "Synthetic Stone", "Freshwater Pearl", "Lab Diamond" (lab diamond only in 14K / 18K gold)
 *   Size / Length (necklaces) / Initial / Engraving / Gift note / Gold Color = order notes (no price change)
 */

const ADORNME_SHOPIFY = {
  domain: "adornme-809.myshopify.com",
  storefrontToken: "2482cf1bb40398a3d5c6d3d3d55d4059",
  apiVersion: "2026-04",
  productMap: null,
  ready: false,
  readyPromise: null,
};

async function fetchShopifyProducts() {
  const query = `
    {
      products(first: 100) {
        edges {
          node {
            handle
            variants(first: 100) {
              edges {
                node {
                  id
                  availableForSale
                  price { amount }
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
    { method: "POST",
      headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": ADORNME_SHOPIFY.storefrontToken },
      body: JSON.stringify({ query }) }
  );
  if (!response.ok) throw new Error(`Shopify API error: ${response.status}`);
  const data = await response.json();
  if (data.errors) throw new Error(`Shopify GraphQL error: ${JSON.stringify(data.errors)}`);

  const productMap = new Map();
  for (const edge of data.data.products.edges) {
    const node = edge.node;
    const variants = node.variants.edges.map(({ node: v }) => {
      const options = {};
      for (const o of v.selectedOptions) options[o.name] = o.value;
      return { options, price: Math.round(parseFloat(v.price.amount)), id: v.id.split("/").pop(), available: v.availableForSale };
    });
    const prices = variants.map((x) => x.price).filter((n) => !isNaN(n));
    productMap.set(node.handle, { variants, from: prices.length ? Math.min(...prices) : null });
  }
  ADORNME_SHOPIFY.productMap = productMap;
  ADORNME_SHOPIFY.ready = true;
  return productMap;
}

/** A variant matches when every option it has equals the requested value.
 *  Shopify adds a "Title: Default Title" option to products with no options; that one is ignored. */
function variantMatches(variant, wanted) {
  for (const [name, value] of Object.entries(variant.options)) {
    if (name === "Title" && value === "Default Title") continue;
    if ((wanted[name] || "") !== value) return false;
  }
  return true;
}

/** Find a variant by option values, e.g. { Metal: "Gold Plated", Drop: "Freshwater Pearl" }. */
function findShopifyVariant(handle, wanted) {
  const entry = ADORNME_SHOPIFY.productMap && ADORNME_SHOPIFY.productMap.get(handle);
  if (!entry) return null;
  return entry.variants.find((v) => variantMatches(v, wanted || {})) || null;
}

/** Live pricing for a product: { variants, from }. Resolves to null when Shopify is unreachable. */
async function getProductPricing(handle) {
  if (!ADORNME_SHOPIFY.ready) await ADORNME_SHOPIFY.readyPromise;
  const entry = ADORNME_SHOPIFY.productMap && ADORNME_SHOPIFY.productMap.get(handle);
  return entry || null;
}

/** Lowest live price for one Metal value (e.g. "14K Gold"), or null. */
function liveMetalFrom(handle, metalValue) {
  const entry = ADORNME_SHOPIFY.productMap && ADORNME_SHOPIFY.productMap.get(handle);
  if (!entry) return null;
  const p = entry.variants.filter((v) => v.options.Metal === metalValue).map((v) => v.price).filter((n) => !isNaN(n));
  return p.length ? Math.min(...p) : null;
}

/** Live price for one selection, or null when Shopify has no matching variant (page falls back to its data file). */
function liveShopifyPrice(handle, wanted) {
  const v = findShopifyVariant(handle, wanted);
  return v ? v.price : null;
}

function buildCheckoutUrl(variantId, attributes = {}) {
  let url = `https://${ADORNME_SHOPIFY.domain}/cart/${variantId}:1`;
  const params = new URLSearchParams();
  for (const [k, val] of Object.entries(attributes)) {
    if (val && String(val).trim()) params.append(`attributes[${k}]`, val);
  }
  const qs = params.toString();
  if (qs) url += `?${qs}`;
  return url;
}

/**
 * config = {
 *   productId,                       // Shopify handle (= PRODUCTS id)
 *   options: { Metal, Drop?, Length? },
 *   size, goldColor, initial, engraving, giftNote, notes,  // order notes
 *   attributes: { "Client design": "...", ... }           // extra order notes
 * }
 */
function addToShopifyCart(config) {
  const checkoutTab = window.open("about:blank", "_blank");
  if (checkoutTab) {
    try {
      checkoutTab.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Preparing your checkout — Adornme</title><style>body{margin:0;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#FAF6F0;color:#2D4D58;font-family:'Cormorant Garamond','Times New Roman',serif;text-align:center;padding:20px}.brand{font-weight:500;font-size:22px;letter-spacing:.22em;margin-bottom:8px}.tag{font-style:italic;color:#5B7480;font-size:14px;margin-bottom:40px}.status{font-size:18px;font-style:italic}.dot{display:inline-block;width:4px;height:4px;border-radius:50%;background:#C9A961;margin:0 3px;animation:pulse 1.4s ease-in-out infinite}.dot:nth-child(2){animation-delay:.2s}.dot:nth-child(3){animation-delay:.4s}@keyframes pulse{0%,80%,100%{opacity:.3}40%{opacity:1}}</style></head><body><div class="brand">ADORNME</div><div class="tag">A love story you can wear</div><div class="status">Preparing your checkout<span class="dot"></span><span class="dot"></span><span class="dot"></span></div></body></html>`);
      checkoutTab.document.close();
    } catch (e) { console.warn("[Adornme] Could not write loading page:", e); }
  }
  completeCheckoutAsync(checkoutTab, config);
}

async function completeCheckoutAsync(checkoutTab, config) {
  try {
    if (!ADORNME_SHOPIFY.ready) await ADORNME_SHOPIFY.readyPromise;
    const variant = findShopifyVariant(config.productId, config.options || {});
    if (!variant) {
      console.error("[Adornme] Variant not found for:", config);
      if (checkoutTab && !checkoutTab.closed) checkoutTab.close();
      alert("Sorry — this combination isn't available right now. Please try a different option, or email mira@adornme.ai for assistance.");
      return;
    }
    const attributes = {};
    if (config.size)      attributes["Size"]      = config.size;
    if (config.goldColor) attributes["Gold Color"] = config.goldColor;
    if (config.initial && config.initial !== "—") attributes["Initial"] = config.initial;
    if (config.engraving) attributes["Engraving"] = config.engraving;
    if (config.giftNote)  attributes["Gift note"] = config.giftNote;
    if (config.notes)     attributes["Notes"]     = config.notes;
    for (const [k, v] of Object.entries(config.attributes || {})) if (v) attributes[k] = v;   // e.g. Client design, Gallery design

    const url = buildCheckoutUrl(variant.id, attributes);
    if (checkoutTab && !checkoutTab.closed) checkoutTab.location.href = url;
    else window.location.href = url;
  } catch (err) {
    console.error("[Adornme] Checkout error:", err);
    if (checkoutTab && !checkoutTab.closed) checkoutTab.close();
    alert("Sorry — something went wrong preparing your checkout. Please email mira@adornme.ai for assistance.");
  }
}

(function init() {
  ADORNME_SHOPIFY.readyPromise = fetchShopifyProducts().catch((err) => {
    console.error("[Adornme] Failed to load Shopify product data:", err);
  });
})();

window.AdornmeShopify = {
  addToCart: addToShopifyCart,
  getProductPricing: getProductPricing,
  findVariant: findShopifyVariant,
  livePrice: liveShopifyPrice,
  liveMetalFrom: liveMetalFrom,
};
