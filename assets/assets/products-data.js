// ============================================================
// ADORNME — Central product data (v40.0, Oct 28 2026)
// Launch pricing: Sterling Silver + 18K Gold Plated on every page.
// 14K / 18K solid gold and lab diamond (drop or heart; silver or solid gold): "Request a quote" on the Customize page.
// Shopify is the source of truth for prices; the prices below are the
// fallback and MUST match the Shopify import file (Adornme_Shopify_Import_v40.csv).
// ============================================================

// ---- Metals ----
// `shopify` = the exact Option1 ("Metal") value in Shopify.
const METALS = {
  silver: { label: "Sterling Silver",  short: "Silver",      shopify: "Sterling Silver", dot: ["#C9CDCF", "#999999"] },
  plated: { label: "18K Gold Plated",  short: "Gold Plated", shopify: "Gold Plated",     dot: ["#E2BA62", "#B08A2E"] },
  gold14: { label: "14K Solid Gold",   short: "14K Gold",    quote: true,                dot: ["#E9C66B", "#B98C24"] },
  gold18: { label: "18K Solid Gold",   short: "18K Gold",    quote: true,                dot: ["#E8B84B", "#A87A18"] },
};
const SHOP_METALS = ["silver", "plated"];                        // Gallery, Home, product pages, For Him
const CUSTOMIZE_METALS = ["silver", "plated", "gold14", "gold18"]; // gold = request a quote
const METAL_LABELS = Object.fromEntries(Object.entries(METALS).map(([k, v]) => [k, v.label]));

// ---- Drops ----
// `shopify` = the exact Option2 ("Drop") value in Shopify.
const DROPS = {
  synthetic: { label: "Synthetic Stone",  shopify: "Synthetic Stone" },
  pearl:     { label: "Freshwater Pearl", shopify: "Freshwater Pearl" },
  diamond:   { label: "Lab Diamond",      shopify: null },   // quote only (silver or solid gold)
};
const GOLD_QUOTE_DROPS = ["pearl", "diamond"];               // drop choices for a 14K / 18K quote
const HEART_STONES = {                                       // Stone pieces
  synthetic: "Synthetic Pink Heart",
  diamond:   "Pink Lab Diamond Heart",                       // quote only (silver or solid gold)
};
const GOLD_COLORS = [
  { id: "yellow", label: "Yellow Gold", dot: ["#E9C66B", "#B98C24"] },
  { id: "white",  label: "White Gold",  dot: ["#E8E9EB", "#AABBBB"] },
  { id: "rose",   label: "Rose Gold",   dot: ["#E7B7A3", "#C98A72"] },
];
const QUOTE_EMAIL = "mira@adornme.ai";

const NECKLACE_LENGTHS = ["16″", "18″", "24″"];
const RING_SIZES = ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9"];
const SHIP = "2–3 weeks";
const GOLD_NOTE = "14K and 18K solid gold available by request.";

// prices[metal][drop]  — drop key is "synthetic" / "pearl"; pieces without a drop use "none";
// the Adornme Chain uses its length ("16″", "18″", "24″") instead of a drop.
const PRODUCTS = [
  {
    id: "engravable-necklace", title: "The Bleeding Heart Engravable Necklace",
    collection: "bleeding-heart", category: "necklaces",
    drops: ["synthetic", "pearl"],
    prices: { silver: { synthetic: 105, pearl: 110 }, plated: { synthetic: 115, pearl: 120 } },
    image: "assets/products/engravable-necklace.jpeg", imageInitial: "assets/products/engravable-necklace.jpeg",
    sizes: NECKLACE_LENGTHS, defaultSize: "18″",
    canHaveInitial: true, canEngrave: true, shipDays: SHIP,
    lede: "Our engravable 17mm signature heart on a fine chain.",
    materials: "Sterling silver or 18K gold plated sterling silver. A synthetic stone or freshwater pearl drop. Fine cable chain in 16″, 18″, or 24″.",
  },
  {
    id: "engravable-pendant", title: "The Bleeding Heart Engravable Pendant",
    collection: "bleeding-heart", category: "pendants",
    drops: ["synthetic", "pearl"],
    prices: { silver: { synthetic: 99, pearl: 105 }, plated: { synthetic: 110, pearl: 115 } },
    image: "assets/products/engravable-pendant.jpeg", imageInitial: "assets/products/engravable-pendant.jpeg",
    sizes: null, canHaveInitial: true, canEngrave: true, shipDays: SHIP,
    lede: "The engravable 17mm heart, pendant only — a flatter face made to hold your engraving.",
    materials: "Sterling silver or 18K gold plated sterling silver. A synthetic stone or freshwater pearl drop. Pendant bail; chain sold separately.",
  },
  {
    id: "classic-pendant", title: "The Bleeding Heart Classic Pendant",
    collection: "bleeding-heart", category: "pendants",
    drops: ["synthetic", "pearl"],
    prices: { silver: { synthetic: 85, pearl: 90 }, plated: { synthetic: 95, pearl: 100 } },
    image: "assets/products/classic-pendant.jpeg", imageInitial: "assets/products/classic-pendant.jpeg",
    sizes: null, canHaveInitial: false, canEngrave: false, shipDays: SHIP,
    lede: "The original rounded Bleeding Heart — soft, dimensional, worn as the pure bloom. 15mm.",
    materials: "Sterling silver or 18K gold plated sterling silver. A synthetic stone or freshwater pearl drop. Pendant bail; chain sold separately.",
  },
  {
    id: "stone-pendant", title: "The Bleeding Heart Stone Pendant",
    collection: "bleeding-heart", category: "pendants",
    drops: ["synthetic"], stoneHeart: true,
    prices: { silver: { synthetic: 95 }, plated: { synthetic: 105 } },
    image: "assets/products/stone-pendant.jpeg", imageInitial: "assets/products/stone-pendant.jpeg",
    sizes: null, canHaveInitial: false, canEngrave: false, shipDays: SHIP,
    lede: "A carved 10mm pink heart stone, set as a pendant with a sparkling drop.",
    materials: "Sterling silver or 18K gold plated sterling silver. Carved 10mm synthetic pink heart stone and synthetic stone drop. Pendant bail; chain sold separately.",
  },
  {
    id: "engravable-ring", title: "The Bleeding Heart Engravable Ring",
    collection: "bleeding-heart", category: "rings",
    drops: ["synthetic", "pearl"],
    prices: { silver: { synthetic: 95, pearl: 100 }, plated: { synthetic: 105, pearl: 110 } },
    image: "assets/products/engravable-ring.jpeg", imageInitial: "assets/products/engravable-ring.jpeg",
    sizes: RING_SIZES, defaultSize: "6",
    canHaveInitial: true, canEngrave: true, shipDays: SHIP,
    lede: "The engravable heart on a slim band — 12mm.",
    materials: "Sterling silver or 18K gold plated sterling silver. A synthetic stone or freshwater pearl drop.",
  },
  {
    id: "stone-ring", title: "The Bleeding Heart Stone Ring",
    collection: "bleeding-heart", category: "rings",
    drops: ["synthetic"], stoneHeart: true,
    prices: { silver: { synthetic: 95 }, plated: { synthetic: 105 } },
    image: "assets/products/stone-ring.jpeg", imageInitial: "assets/products/stone-ring.jpeg",
    sizes: RING_SIZES, defaultSize: "6",
    canHaveInitial: false, canEngrave: false, shipDays: SHIP,
    lede: "A carved 10mm pink heart stone on a slim band.",
    materials: "Sterling silver or 18K gold plated sterling silver. Carved 10mm synthetic pink heart stone and synthetic stone drop.",
  },
  {
    id: "engravable-stud", title: "The Bleeding Heart Engravable Stud Earrings",
    collection: "bleeding-heart", category: "earrings",
    drops: ["synthetic", "pearl"],
    prices: { silver: { synthetic: 135, pearl: 140 }, plated: { synthetic: 145, pearl: 150 } },
    image: "assets/products/engravable-stud.jpeg", imageInitial: "assets/products/engravable-stud.jpeg",
    sizes: null, canHaveInitial: true, canEngrave: true, shipDays: SHIP,
    lede: "A pair of engravable 12mm heart studs, each with a drop.",
    materials: "Sterling silver or 18K gold plated sterling silver. Two synthetic stone or freshwater pearl drops. Posts and backings.",
  },
  {
    id: "engravable-chain-ear", title: "The Bleeding Heart Engravable Chain Earrings",
    collection: "bleeding-heart", category: "earrings",
    drops: ["synthetic", "pearl"],
    prices: { silver: { synthetic: 145, pearl: 150 }, plated: { synthetic: 155, pearl: 160 } },
    image: "assets/products/engravable-chain-ear.jpeg", imageInitial: "assets/products/engravable-chain-ear.jpeg",
    sizes: null, canHaveInitial: true, canEngrave: true, shipDays: SHIP,
    lede: "Engravable 12mm heart drop earrings on delicate chain.",
    materials: "Sterling silver or 18K gold plated sterling silver. Two synthetic stone or freshwater pearl drops. Chain and backings.",
  },
  {
    id: "stone-stud", title: "The Bleeding Heart Stone Stud Earrings",
    collection: "bleeding-heart", category: "earrings",
    drops: ["synthetic"], stoneHeart: true,
    prices: { silver: { synthetic: 125 }, plated: { synthetic: 135 } },
    image: "assets/products/stone-stud.jpeg", imageInitial: "assets/products/stone-stud.jpeg",
    sizes: null, canHaveInitial: false, canEngrave: false, shipDays: SHIP,
    lede: "Carved 8mm pink heart stone studs — kept light for the ears.",
    materials: "Sterling silver or 18K gold plated sterling silver. Two carved 8mm synthetic pink heart stones and synthetic stone drops. Posts and backings.",
  },
  {
    id: "stone-hook", title: "The Bleeding Heart Stone Hook Earrings",
    collection: "bleeding-heart", category: "earrings",
    drops: ["synthetic"], stoneHeart: true,
    prices: { silver: { synthetic: 125 }, plated: { synthetic: 135 } },
    image: "assets/products/stone-hook.jpeg", imageInitial: "assets/products/stone-hook.jpeg",
    sizes: null, canHaveInitial: false, canEngrave: false, shipDays: SHIP,
    lede: "Carved 10mm pink heart stones on easy hook earrings.",
    materials: "Sterling silver or 18K gold plated sterling silver. Two carved 10mm synthetic pink heart stones and synthetic stone drops. Ear hooks.",
  },
  {
    id: "stone-chain-ear", title: "The Bleeding Heart Stone Chain Earrings",
    collection: "bleeding-heart", category: "earrings",
    drops: ["synthetic"], stoneHeart: true,
    prices: { silver: { synthetic: 135 }, plated: { synthetic: 145 } },
    image: "assets/products/stone-chain-ear.jpeg", imageInitial: "assets/products/stone-chain-ear.jpeg",
    sizes: null, canHaveInitial: false, canEngrave: false, shipDays: SHIP,
    lede: "Carved 10mm pink heart stone drop earrings on chain.",
    materials: "Sterling silver or 18K gold plated sterling silver. Two carved 10mm synthetic pink heart stones and synthetic stone drops. Chain and backings.",
  },
  {
    id: "classic-chain-ear", title: "The Bleeding Heart Classic Chain Earrings",
    collection: "bleeding-heart", category: "earrings",
    drops: ["synthetic", "pearl"],
    prices: { silver: { synthetic: 115, pearl: 120 }, plated: { synthetic: 125, pearl: 130 } },
    image: "assets/products/classic-chain-ear.jpeg", imageInitial: "assets/products/classic-chain-ear.jpeg",
    sizes: null, canHaveInitial: false, canEngrave: false, shipDays: SHIP,
    lede: "The rounded 15mm Classic heart as chain drop earrings.",
    materials: "Sterling silver or 18K gold plated sterling silver. Two synthetic stone or freshwater pearl drops. Chain and backings.",
  },
  {
    id: "flower-cross", title: "Flower Cross",
    collection: "devotion", category: "necklaces",
    drops: ["pearl"],
    prices: { silver: { pearl: 95 }, plated: { pearl: 105 } },
    image: "assets/products/flower-cross.jpeg", imageInitial: "assets/products/flower-cross.jpeg",
    sizes: NECKLACE_LENGTHS, defaultSize: "18″",
    canHaveInitial: false, canEngrave: true, shipDays: SHIP,
    lede: "A cross softened by a flowering bloom and a pearl drop.",
    materials: "Sterling silver or 18K gold plated sterling silver. Enamel bloom. Freshwater pearl drop. Fine chain in 16″, 18″, or 24″.",
  },
  {
    id: "heart-cross", title: "Heart Cross",
    collection: "devotion", category: "necklaces",
    drops: ["pearl"],
    prices: { silver: { pearl: 85 }, plated: { pearl: 95 } },
    image: "assets/products/heart-cross.jpeg", imageInitial: "assets/products/heart-cross.jpeg",
    sizes: NECKLACE_LENGTHS, defaultSize: "18″",
    canHaveInitial: false, canEngrave: true, shipDays: SHIP,
    lede: "A cross holding a heart at its center, with a pearl drop below.",
    materials: "Sterling silver or 18K gold plated sterling silver. Red synthetic ruby accent. Freshwater pearl drop. Fine chain in 16″, 18″, or 24″.",
  },
  {
    id: "christ-risen", title: "Christ Risen",
    collection: "devotion", category: "necklaces",
    drops: ["pearl"],
    prices: { silver: { pearl: 105 }, plated: { pearl: 115 } },
    image: "assets/products/christ-risen.jpeg", imageInitial: "assets/products/christ-risen.jpeg",
    sizes: NECKLACE_LENGTHS, defaultSize: "18″",
    canHaveInitial: false, canEngrave: true, shipDays: SHIP,
    lede: "Christ rising in triumph, arms raised, heart held below.",
    materials: "Sterling silver or 18K gold plated sterling silver. Red synthetic ruby accent. Freshwater pearl drop. Fine chain in 16″, 18″, or 24″.",
  },
  {
    id: "adornme-chain", title: "The Adornme Chain",
    collection: "chain", category: "chains",
    drops: [], lengthPricing: true,
    prices: { silver: { "16″": 15, "18″": 20, "24″": 20 }, plated: { "16″": 25, "18″": 30, "24″": 30 } },
    image: "assets/products/adornme-chain.png", imageInitial: "assets/products/adornme-chain.png",
    sizes: NECKLACE_LENGTHS, defaultSize: "18″",
    canHaveInitial: false, canEngrave: false, shipDays: SHIP,
    lede: "Sold separately, in three lengths — ready for any Adornme pendant.",
    materials: "Sterling silver or 18K gold plated sterling silver. Fine cable-link in 16″, 18″, or 24″.",
  },
  {
    id: "pearl-bracelet", title: "The Bleeding Heart Pearl Bracelet",
    collection: "bleeding-heart", category: "bracelets",
    drops: ["pearl"],
    prices: { silver: { pearl: 125 }, plated: { pearl: 135 } },
    image: "assets/products/pearl-bracelet.jpeg", imageInitial: "assets/products/pearl-bracelet.jpeg",
    sizes: ["6.5–7″", "7–7.5″"], defaultSize: "7–7.5″",
    canHaveInitial: true, canEngrave: true, shipDays: SHIP,
    lede: "Little engravable hearts along a fine chain, each with a pearl — a bracelet of initials, dates, or names.",
    materials: "Sterling silver or 18K gold plated sterling silver. Engravable hearts, each with a freshwater pearl drop. Fine chain.",
  },
  {
    id: "open-heart", title: "The Open Heart Pendant",
    collection: "bleeding-heart", category: "pendants",
    drops: ["synthetic", "pearl"],
    prices: { silver: { synthetic: 110, pearl: 115 }, plated: { synthetic: 120, pearl: 125 } },
    image: "assets/products/open-heart.jpeg", imageInitial: "assets/products/open-heart.jpeg",
    sizes: NECKLACE_LENGTHS, defaultSize: "18″",
    canHaveInitial: true, initialRequired: true, canEngrave: false, shipDays: SHIP,
    lede: "An open 21mm heart with your initial suspended within — framed by leaves set with pink and yellow stones.",
    materials: "Sterling silver or 18K gold plated sterling silver. Open heart with a dangling initial. Leaves set with small pink and yellow synthetic stones. A synthetic stone or freshwater pearl drop. Fine chain in 16″, 18″, or 24″.",
  },
  {
    id: "mens-christ-pendant", title: "Christ Risen Pendant for Men",
    collection: "for-him", category: "pendants",
    drops: [],
    prices: { silver: { none: 150 }, plated: { none: 160 } },
    image: "assets/products/christ-risen-mens-pendant.jpeg", imageInitial: "assets/products/christ-risen-mens-pendant.jpeg",
    sizes: ["18″", "24″"], defaultSize: "24″",
    canHaveInitial: false, canEngrave: true, shipDays: SHIP,
    lede: "Christ rising in triumph, arms open, a small golden heart-stone at his center — designed for him.",
    materials: "Sterling silver or 18K gold plated sterling silver. Small yellow synthetic center stone. A larger, bolder figure. Chain in 18″ or 24″.",
  },
  {
    id: "mens-christ-ring", title: "Christ Risen Ring for Men",
    collection: "for-him", category: "rings",
    drops: [],
    prices: { silver: { none: 175 }, plated: { none: 185 } },
    image: "assets/products/christ-risen-mens-ring.jpeg", imageInitial: "assets/products/christ-risen-mens-ring.jpeg",
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"], defaultSize: "10",
    canHaveInitial: false, canEngrave: true, shipDays: SHIP,
    lede: "A bold, substantial ring carrying the risen Christ — a statement of faith you can feel.",
    materials: "Sterling silver or 18K gold plated sterling silver. Small yellow synthetic center stone. A heavy, substantial band.",
  },
];

// Hidden for now (not shown anywhere, not in Shopify). Kept so it can come back later.
const HIDDEN_PRODUCTS = [
  { id: "cuff", title: "The Bleeding Heart Cuff in Mother-of-Pearl", collection: "bleeding-heart", category: "bracelets",
    image: "assets/products/cuff.jpeg", note: "Hidden Oct 28 2026 until overseas production." },
];

// ---- Helpers ----
// Price key for a selection: the drop id, "none", or the chain length.
function adornmePriceKey(product, drop, size) {
  if (product.lengthPricing) return size || product.defaultSize;
  if (product.drops && product.drops.length) return drop || product.drops[0];
  return "none";
}
// Local (fallback) price for one selection. Gold metals have no price (quote only).
function adornmeGetMetalPrice(product, metal, drop, size) {
  const table = product.prices && product.prices[metal];
  if (!table) return null;
  const v = table[adornmePriceKey(product, drop, size)];
  return typeof v === "number" ? v : null;
}
// Lowest price across the shop metals (Silver, Gold Plated).
function adornmeGetFromPrice(product) {
  const all = [];
  for (const m of SHOP_METALS) {
    const t = product.prices && product.prices[m];
    if (t) all.push(...Object.values(t).filter((x) => typeof x === "number"));
  }
  return all.length ? Math.min(...all) : null;
}
// Option values Shopify expects for a selection (names match the CSV option names).
function adornmeShopifyOptions(product, metal, drop, size) {
  const opts = { Metal: METALS[metal] && METALS[metal].shopify };
  if (product.lengthPricing) opts.Length = size || product.defaultSize;
  else if (product.drops && product.drops.length) opts.Drop = DROPS[drop || product.drops[0]].shopify;
  return opts;
}
// Mail link for a quote request (solid gold or lab diamond).
function adornmeQuoteMailto(lines, pieceTitle) {
  const subject = `Quote request: ${pieceTitle}`;
  const body = `Hi Mira,\n\nI'd love a quote for this piece:\n\n${lines.join("\n")}\n\nThank you!`;
  return `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

if (typeof window !== "undefined") {
  Object.assign(window, {
    METALS, SHOP_METALS, CUSTOMIZE_METALS, METAL_LABELS, DROPS, GOLD_QUOTE_DROPS, HEART_STONES, GOLD_COLORS,
    QUOTE_EMAIL, GOLD_NOTE, PRODUCTS, HIDDEN_PRODUCTS,
    adornmePriceKey, adornmeGetMetalPrice, adornmeGetFromPrice, adornmeShopifyOptions, adornmeQuoteMailto,
  });
  window.ADORNME_METAL_LABELS = METAL_LABELS;
}
