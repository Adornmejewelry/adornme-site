/**
 * Adornme — Shopify Storefront API Integration (v32.0)
 * Shopify = source of truth for prices.
 *
 * Variant option model (must match the product CSV):
 *   - Non-stone pieces: Option1 = Metal, Option2 = Drop
 *   - Stone pieces:     Option1 = Metal, Option2 = Drop, Option3 = Stone
 *   Gold Color / Size / Heart Size / Initial / Engraving = line-item PROPERTIES (no price change)
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
            id
            handle
            title
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price { amount currencyCode }
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
  for (const productEdge of data.data.products.edges) {
    const node = productEdge.node;
    const variants = [];
    for (const vEdge of node.variants.edges) {
      const v = vEdge.node;
      const opts = {};
      for (const o of v.selectedOptions) opts[o.name] = o.value;
      variants.push({
        options: opts,                     // { Metal, Drop, Stone? }
        price: Math.round(parseFloat(v.price.amount)),
        id: v.id.split("/").pop(),
        available: v.availableForSale,
      });
    }
    const prices = variants.map((x) => x.price).filter((n) => !isNaN(n));
    productMap.set(node.handle, { variants, from: prices.length ? Math.min(...prices) : null });
  }
  ADORNME_SHOPIFY.productMap = productMap;
  ADORNME_SHOPIFY.ready = true;
  return productMap;
}

/**
 * Live pricing for a product.
 * index keyed by "Metal|Drop" (non-stone) or "Metal|Drop|Stone" (stone).
 */
async function getProductPricing(handle) {
  if (!ADORNME_SHOPIFY.ready) await ADORNME_SHOPIFY.readyPromise;
  const entry = ADORNME_SHOPIFY.productMap && ADORNME_SHOPIFY.productMap.get(handle);
  if (!entry) return null;
  const index = new Map();
  for (const v of entry.variants) {
    const parts = [ v.options.Metal || "" ];
    if (v.options.Drop) parts.push(v.options.Drop);
    if (v.options.Stone) parts.push(v.options.Stone);
    index.set(parts.join("|"), { price: v.price, variantId: v.id, available: v.available });
  }
  return { index, from: entry.from };
}

/** Find a variant by metal + drop + optional stone. */
function findShopifyVariant(handle, metalLabel, dropLabel, stoneLabel) {
  const entry = ADORNME_SHOPIFY.productMap && ADORNME_SHOPIFY.productMap.get(handle);
  if (!entry) return null;
  return entry.variants.find((v) => {
    if ((v.options.Metal || "") !== metalLabel) return false;
    if (dropLabel)  { if ((v.options.Drop  || "") !== dropLabel)  return false; }
    if (stoneLabel) { if ((v.options.Stone || "") !== stoneLabel) return false; }
    return true;
  }) || null;
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
    const variant = findShopifyVariant(config.productId, config.metalLabel, config.dropLabel || "", config.stoneLabel || "");
    if (!variant) {
      console.error("[Adornme] Variant not found for:", config);
      if (checkoutTab && !checkoutTab.closed) checkoutTab.close();
      alert("Sorry — this combination isn't available right now. Please try a different option, or email mira@adornme.ai for assistance.");
      return;
    }
    const attributes = {};
    if (config.goldColor)  attributes["Gold Color"]  = config.goldColor;
    if (config.heartSize)  attributes["Heart Size"]  = config.heartSize;
    if (config.size)       attributes["Size"]        = config.size;
    if (config.initial && config.initial !== "—") attributes["Initial"] = config.initial;
    if (config.engraving)  attributes["Engraving"]   = config.engraving;
    if (config.giftNote)   attributes["Gift note"]   = config.giftNote;

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
};
