// ============================================================
// ADORNME — Central product data (v43.4, Nov 16 2026: 14K / 18K on the Engravable, Classic and Stone Chain Earrings; v43.3 Nov 16: engraved-initial photos A–Z + blank for 5 engravable pieces; v43.2 Nov 16: Stone Ring $175/$205, Engravable Chain Earrings $265/$295, Classic Chain Earrings $305/$335 (2x on estimated weights); v43.1 Nov 16: silver / gold plated below 2x cost raised to 2x (nothing lowered); v43.0 Nov 16: 14K / 18K solid gold priced + Add to bag on 12 pieces and the chain, lab diamond drop in gold; v42.3 Nov 16: Pearl Bracelet $395/$415, Pearl Necklace $595/$615; v42.2 Nov 11: one price per metal, synthetic = pearl; Engravable Necklace $215/$235, Engravable Pendant $195/$215; v42.1 Nov 9: Open Heart raised; v42.0 Nov 8: new price list, new Pearl Necklace)
// Sterling Silver + 18K Gold Plated on every piece. 14K / 18K solid gold (yellow, white or rose) with a price and
// Add to bag on the pieces that have `prices.gold14` / `prices.gold18`; in gold the drop can also be a lab diamond.
// Pieces without gold prices, a lab diamond in sterling silver, and the pink lab diamond heart stay "Request a quote" (Customize).
// Shopify is the source of truth for prices; the prices below are the
// fallback and MUST match the Shopify import file (Adornme_Shopify_Import_v42_full.csv).
// ============================================================

// ---- Metals ----
// `shopify` = the exact Option1 ("Metal") value in Shopify.
const METALS = {
  silver: { label: "Sterling Silver",  short: "Silver",      shopify: "Sterling Silver", dot: ["#C9CDCF", "#999999"] },
  plated: { label: "18K Gold Plated",  short: "Gold Plated", shopify: "Gold Plated",     dot: ["#E2BA62", "#B08A2E"] },
  gold14: { label: "14K Solid Gold",   short: "14K Gold",    shopify: "14K Gold", gold: true, dot: ["#E9C66B", "#B98C24"] },
  gold18: { label: "18K Solid Gold",   short: "18K Gold",    shopify: "18K Gold", gold: true, dot: ["#E8B84B", "#A87A18"] },
};
const SHOP_METALS = ["silver", "plated"];                        // every piece; "From $" prices come from these
const GOLD_METALS = ["gold14", "gold18"];                        // pieces with gold prices (see adornmeMetalsFor)
const CUSTOMIZE_METALS = ["silver", "plated", "gold14", "gold18"]; // gold without a price = request a quote
const METAL_LABELS = Object.fromEntries(Object.entries(METALS).map(([k, v]) => [k, v.label]));

// ---- Drops ----
// `shopify` = the exact Option2 ("Drop") value in Shopify.
const DROPS = {
  synthetic: { label: "Synthetic Stone",  shopify: "Synthetic Stone" },
  pearl:     { label: "Freshwater Pearl", shopify: "Freshwater Pearl" },
  diamond:   { label: "Lab Diamond",      shopify: "Lab Diamond" },   // priced in 14K / 18K gold; quote in sterling silver
};
const GOLD_QUOTE_DROPS = ["pearl", "diamond"];               // drop choices for a 14K / 18K quote (pieces without gold prices)
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
const GOLD_NOTE = "14K and 18K solid gold available by request.";
const GOLD_PENDANT_NOTE = "In 14K and 18K gold this piece is the pendant only. Add a gold Adornme Chain in your length.";

// prices[metal][drop]  — drop key is "synthetic" / "pearl"; pieces without a drop use "none";
// the Adornme Chain uses its length ("16″", "18″", "24″") instead of a drop.
const PRODUCTS = [
  {
    id: "engravable-necklace", title: "The Bleeding Heart Engravable Necklace",
    collection: "bleeding-heart", category: "necklaces",
    drops: ["synthetic", "pearl"],
    initialPhotos: "assets/products/initials/engravable-necklace/",   // blank.jpg + A.jpg … Z.jpg (the chosen letter engraved)
    prices: { silver: { synthetic: 215, pearl: 215 }, plated: { synthetic: 240, pearl: 240 }, gold14: { synthetic: 1680, pearl: 1680, diamond: 1880 }, gold18: { synthetic: 2310, pearl: 2310, diamond: 2510 } },
    goldDrops: ["synthetic", "pearl", "diamond"],
    image: "assets/products/engravable-necklace.jpeg", imageInitial: "assets/products/engravable-necklace.jpeg",
    sizes: NECKLACE_LENGTHS, defaultSize: "18″",
    canHaveInitial: true, canEngrave: true,
    lede: "Our engravable 17mm signature heart on a fine chain.",
    materials: "Sterling silver, 18K gold plated sterling silver, or 14K / 18K solid gold. A synthetic stone or freshwater pearl drop. Fine cable chain in 16″, 18″, or 24″.",
  },
  {
    id: "engravable-pendant", title: "The Bleeding Heart Engravable Pendant",
    collection: "bleeding-heart", category: "pendants",
    drops: ["synthetic", "pearl"],
    initialPhotos: "assets/products/initials/engravable-pendant/",   // blank.jpg + A.jpg … Z.jpg (the chosen letter engraved)
    prices: { silver: { synthetic: 195, pearl: 195 }, plated: { synthetic: 220, pearl: 220 }, gold14: { synthetic: 1140, pearl: 1140, diamond: 1340 }, gold18: { synthetic: 1530, pearl: 1530, diamond: 1730 } },
    goldDrops: ["synthetic", "pearl", "diamond"],
    image: "assets/products/engravable-pendant.jpeg", imageInitial: "assets/products/engravable-pendant.jpeg",
    sizes: null, canHaveInitial: true, canEngrave: true,
    lede: "The engravable 17mm heart, pendant only — a flatter face made to hold your engraving.",
    materials: "Sterling silver, 18K gold plated sterling silver, or 14K / 18K solid gold. A synthetic stone or freshwater pearl drop. Pendant bail; chain sold separately.",
  },
  {
    id: "classic-pendant", title: "The Bleeding Heart Classic Pendant",
    collection: "bleeding-heart", category: "pendants",
    drops: ["synthetic", "pearl"],
    prices: { silver: { synthetic: 180, pearl: 180 }, plated: { synthetic: 210, pearl: 210 }, gold14: { synthetic: 945, pearl: 945, diamond: 1145 }, gold18: { synthetic: 1285, pearl: 1285, diamond: 1485 } },
    goldDrops: ["synthetic", "pearl", "diamond"],
    image: "assets/products/classic-pendant.jpeg", imageInitial: "assets/products/classic-pendant.jpeg",
    sizes: null, canHaveInitial: false, canEngrave: false,
    lede: "The original rounded Bleeding Heart — soft, dimensional, worn as the pure bloom. 15mm.",
    materials: "Sterling silver, 18K gold plated sterling silver, or 14K / 18K solid gold. A synthetic stone or freshwater pearl drop. Pendant bail; chain sold separately.",
  },
  {
    id: "stone-pendant", title: "The Bleeding Heart Stone Pendant",
    collection: "bleeding-heart", category: "pendants",
    drops: ["synthetic"], stoneHeart: true,
    prices: { silver: { synthetic: 145 }, plated: { synthetic: 165 }, gold14: { synthetic: 410, diamond: 610 }, gold18: { synthetic: 490, diamond: 690 } },
    goldDrops: ["synthetic", "diamond"],
    image: "assets/products/stone-pendant.jpeg", imageInitial: "assets/products/stone-pendant.jpeg",
    sizes: null, canHaveInitial: false, canEngrave: false,
    lede: "A carved 10mm pink heart stone, set as a pendant with a sparkling drop.",
    materials: "Sterling silver, 18K gold plated sterling silver, or 14K / 18K solid gold. Carved 10mm synthetic pink heart stone and synthetic stone drop. Pendant bail; chain sold separately.",
  },
  {
    id: "engravable-ring", title: "The Bleeding Heart Engravable Ring",
    collection: "bleeding-heart", category: "rings",
    drops: ["synthetic", "pearl"],
    initialPhotos: "assets/products/initials/engravable-ring/",   // blank.jpg + A.jpg … Z.jpg (the chosen letter engraved)
    prices: { silver: { synthetic: 205, pearl: 205 }, plated: { synthetic: 235, pearl: 235 }, gold14: { synthetic: 1285, pearl: 1285, diamond: 1485 }, gold18: { synthetic: 1725, pearl: 1725, diamond: 1925 } },
    goldDrops: ["synthetic", "pearl", "diamond"],
    image: "assets/products/engravable-ring.jpeg", imageInitial: "assets/products/engravable-ring.jpeg",
    sizes: RING_SIZES, defaultSize: "6",
    canHaveInitial: true, canEngrave: true,
    lede: "The engravable heart on a slim band — 12mm.",
    materials: "Sterling silver, 18K gold plated sterling silver, or 14K / 18K solid gold. A synthetic stone or freshwater pearl drop.",
  },
  {
    id: "stone-ring", title: "The Bleeding Heart Stone Ring",
    collection: "bleeding-heart", category: "rings",
    drops: ["synthetic"], stoneHeart: true,
    prices: { silver: { synthetic: 175 }, plated: { synthetic: 205 } },
    image: "assets/products/stone-ring.jpeg", imageInitial: "assets/products/stone-ring.jpeg",
    sizes: RING_SIZES, defaultSize: "6",
    canHaveInitial: false, canEngrave: false,
    lede: "A carved 10mm pink heart stone on a slim band.",
    materials: "Sterling silver or 18K gold plated sterling silver. Carved 10mm synthetic pink heart stone and synthetic stone drop.",
  },
  {
    id: "engravable-stud", title: "The Bleeding Heart Engravable Stud Earrings",
    collection: "bleeding-heart", category: "earrings",
    drops: ["synthetic", "pearl"],
    initialPhotos: "assets/products/initials/engravable-stud/",   // blank.jpg + A.jpg … Z.jpg (the chosen letter engraved)
    prices: { silver: { synthetic: 245, pearl: 245 }, plated: { synthetic: 275, pearl: 275 }, gold14: { synthetic: 1090, pearl: 1090, diamond: 1490 }, gold18: { synthetic: 1590, pearl: 1590, diamond: 1990 } },
    goldDrops: ["synthetic", "pearl", "diamond"],
    image: "assets/products/engravable-stud.jpeg", imageInitial: "assets/products/engravable-stud.jpeg",
    sizes: null, canHaveInitial: true, canEngrave: true,
    lede: "A pair of engravable 12mm heart studs, each with a drop.",
    materials: "Sterling silver, 18K gold plated sterling silver, or 14K / 18K solid gold. Two synthetic stone or freshwater pearl drops. Posts and backings.",
  },
  {
    id: "engravable-chain-ear", title: "The Bleeding Heart Engravable Chain Earrings",
    collection: "bleeding-heart", category: "earrings",
    drops: ["synthetic", "pearl"],
    initialPhotos: "assets/products/initials/engravable-chain-ear/",   // blank.jpg + A.jpg … Z.jpg (the chosen letter engraved)
    prices: { silver: { synthetic: 265, pearl: 265 }, plated: { synthetic: 295, pearl: 295 }, gold14: { synthetic: 1245, pearl: 1245, diamond: 1645 }, gold18: { synthetic: 1805, pearl: 1805, diamond: 2205 } },
    goldDrops: ["synthetic", "pearl", "diamond"],
    image: "assets/products/engravable-chain-ear.jpeg", imageInitial: "assets/products/engravable-chain-ear.jpeg",
    sizes: null, canHaveInitial: true, canEngrave: true,
    lede: "Engravable 12mm heart drop earrings on delicate chain.",
    materials: "Sterling silver, 18K gold plated sterling silver, or 14K / 18K solid gold. Two synthetic stone or freshwater pearl drops. Chain and backings.",
  },
  {
    id: "stone-stud", title: "The Bleeding Heart Stone Stud Earrings",
    collection: "bleeding-heart", category: "earrings",
    drops: ["synthetic"], stoneHeart: true,
    prices: { silver: { synthetic: 205 }, plated: { synthetic: 225 } },
    image: "assets/products/stone-stud.jpeg", imageInitial: "assets/products/stone-stud.jpeg",
    sizes: null, canHaveInitial: false, canEngrave: false,
    lede: "Carved 8mm pink heart stone studs — kept light for the ears.",
    materials: "Sterling silver or 18K gold plated sterling silver. Two carved 8mm synthetic pink heart stones and synthetic stone drops. Posts and backings.",
  },
  {
    id: "stone-hook", title: "The Bleeding Heart Stone Hook Earrings",
    collection: "bleeding-heart", category: "earrings",
    drops: ["synthetic"], stoneHeart: true,
    prices: { silver: { synthetic: 215 }, plated: { synthetic: 235 } },
    image: "assets/products/stone-hook.jpeg", imageInitial: "assets/products/stone-hook.jpeg",
    sizes: null, canHaveInitial: false, canEngrave: false,
    lede: "Carved 10mm pink heart stones on easy hook earrings.",
    materials: "Sterling silver or 18K gold plated sterling silver. Two carved 10mm synthetic pink heart stones and synthetic stone drops. Ear hooks.",
  },
  {
    id: "stone-chain-ear", title: "The Bleeding Heart Stone Chain Earrings",
    collection: "bleeding-heart", category: "earrings",
    drops: ["synthetic"], stoneHeart: true,
    prices: { silver: { synthetic: 225 }, plated: { synthetic: 245 }, gold14: { synthetic: 760, diamond: 1160 }, gold18: { synthetic: 1020, diamond: 1420 } },
    goldDrops: ["synthetic", "diamond"],
    image: "assets/products/stone-chain-ear.jpeg", imageInitial: "assets/products/stone-chain-ear.jpeg",
    sizes: null, canHaveInitial: false, canEngrave: false,
    lede: "Carved 10mm pink heart stone drop earrings on chain.",
    materials: "Sterling silver, 18K gold plated sterling silver, or 14K / 18K solid gold. Two carved 10mm synthetic pink heart stones and synthetic stone drops. Chain and backings.",
  },
  {
    id: "classic-chain-ear", title: "The Bleeding Heart Classic Chain Earrings",
    collection: "bleeding-heart", category: "earrings",
    drops: ["synthetic", "pearl"],
    prices: { silver: { synthetic: 305, pearl: 305 }, plated: { synthetic: 335, pearl: 335 }, gold14: { synthetic: 2045, pearl: 2045, diamond: 2445 }, gold18: { synthetic: 2790, pearl: 2790, diamond: 3190 } },
    goldDrops: ["synthetic", "pearl", "diamond"],
    image: "assets/products/classic-chain-ear.jpeg", imageInitial: "assets/products/classic-chain-ear.jpeg",
    sizes: null, canHaveInitial: false, canEngrave: false,
    lede: "The rounded 15mm Classic heart as chain drop earrings.",
    materials: "Sterling silver, 18K gold plated sterling silver, or 14K / 18K solid gold. Two synthetic stone or freshwater pearl drops. Chain and backings.",
  },
  {
    id: "flower-cross", title: "Flower Cross",
    collection: "devotion", category: "necklaces",
    drops: ["pearl"],
    prices: { silver: { pearl: 150 }, plated: { pearl: 170 }, gold14: { pearl: 665 }, gold18: { pearl: 960 } },
    goldDrops: ["pearl"], goldPendantOnly: true,
    image: "assets/products/flower-cross.jpeg", imageInitial: "assets/products/flower-cross.jpeg",
    sizes: NECKLACE_LENGTHS, defaultSize: "18″",
    canHaveInitial: false, canEngrave: true,
    lede: "A cross softened by a flowering bloom and a pearl drop.",
    materials: "Sterling silver, 18K gold plated sterling silver, or 14K / 18K solid gold. Enamel bloom. Freshwater pearl drop. Fine chain in 16″, 18″, or 24″ with silver and gold plated; in solid gold, the pendant only.",
  },
  {
    id: "heart-cross", title: "Heart Cross",
    collection: "devotion", category: "necklaces",
    drops: ["pearl"],
    prices: { silver: { pearl: 155 }, plated: { pearl: 175 }, gold14: { pearl: 780 }, gold18: { pearl: 1065 } },
    goldDrops: ["pearl"], goldPendantOnly: true,
    image: "assets/products/heart-cross.jpeg", imageInitial: "assets/products/heart-cross.jpeg",
    sizes: NECKLACE_LENGTHS, defaultSize: "18″",
    canHaveInitial: false, canEngrave: true,
    lede: "A cross holding a heart at its center, with a pearl drop below.",
    materials: "Sterling silver, 18K gold plated sterling silver, or 14K / 18K solid gold. Red synthetic ruby accent. Freshwater pearl drop. Fine chain in 16″, 18″, or 24″ with silver and gold plated; in solid gold, the pendant only.",
  },
  {
    id: "christ-risen", title: "Christ Risen",
    collection: "devotion", category: "necklaces",
    drops: ["pearl"],
    prices: { silver: { pearl: 155 }, plated: { pearl: 175 }, gold14: { pearl: 750 }, gold18: { pearl: 1065 } },
    goldDrops: ["pearl"], goldPendantOnly: true,
    image: "assets/products/christ-risen.jpeg", imageInitial: "assets/products/christ-risen.jpeg",
    sizes: NECKLACE_LENGTHS, defaultSize: "18″",
    canHaveInitial: false, canEngrave: true,
    lede: "Christ rising in triumph, arms raised, heart held below.",
    materials: "Sterling silver, 18K gold plated sterling silver, or 14K / 18K solid gold. Red synthetic ruby accent. Freshwater pearl drop. Fine chain in 16″, 18″, or 24″ with silver and gold plated; in solid gold, the pendant only.",
  },
  {
    id: "adornme-chain", title: "The Adornme Chain",
    collection: "chain", category: "chains",
    drops: [], lengthPricing: true,
    prices: { silver: { "16″": 15, "18″": 20, "24″": 20 }, plated: { "16″": 25, "18″": 30, "24″": 30 }, gold14: { "16″": 235, "18″": 265, "24″": 350 }, gold18: { "16″": 330, "18″": 370, "24″": 490 } },
    image: "assets/products/adornme-chain.png", imageInitial: "assets/products/adornme-chain.png",
    sizes: NECKLACE_LENGTHS, defaultSize: "18″",
    canHaveInitial: false, canEngrave: false,
    lede: "Sold separately, in three lengths — ready for any Adornme pendant.",
    materials: "Sterling silver, 18K gold plated sterling silver, or 14K / 18K solid gold. Fine cable-link in 16″, 18″, or 24″.",
  },
  {
    id: "pearl-bracelet", title: "The Bleeding Heart Pearl Bracelet",
    collection: "bleeding-heart", category: "bracelets",
    drops: ["pearl"],
    prices: { silver: { pearl: 540 }, plated: { pearl: 570 }, gold14: { pearl: 1690 }, gold18: { pearl: 2335 } },
    goldDrops: ["pearl"],
    image: "assets/products/pearl-bracelet-six-hearts.jpg", imageInitial: "assets/products/pearl-bracelet-six-hearts.jpg",
    sizes: ["6.5–7″", "7–7.5″"], defaultSize: "7–7.5″",
    canHaveInitial: true, canEngrave: true,
    lede: "Six engravable hearts on a strand of freshwater pearls, each with a pearl drop — a bracelet of initials, dates, or names.",
    materials: "Sterling silver, 18K gold plated sterling silver, or 14K / 18K solid gold. Six engravable hearts, each with a freshwater pearl drop, on a strand of freshwater pearls.",
  },
  {
    id: "pearl-necklace", title: "The Bleeding Heart Pearl Necklace",
    collection: "bleeding-heart", category: "necklaces",
    drops: ["pearl"],
    prices: { silver: { pearl: 810 }, plated: { pearl: 840 }, gold14: { pearl: 2820 }, gold18: { pearl: 3895 } },
    goldDrops: ["pearl"],
    image: "assets/products/pearl-necklace.jpg", imageInitial: "assets/products/pearl-necklace.jpg",
    sizes: NECKLACE_LENGTHS, defaultSize: "18″",
    canHaveInitial: true, canEngrave: true,
    lede: "Ten engravable hearts on a strand of freshwater pearls, each with a pearl drop — a necklace of initials, dates, or names.",
    materials: "Sterling silver, 18K gold plated sterling silver, or 14K / 18K solid gold. Ten engravable hearts, each with a freshwater pearl drop, on a strand of freshwater pearls, in 16″, 18″, or 24″.",
  },
  {
    id: "open-heart", title: "The Open Heart Pendant",
    collection: "bleeding-heart", category: "pendants",
    drops: ["synthetic", "pearl"],
    prices: { silver: { synthetic: 230, pearl: 230 }, plated: { synthetic: 250, pearl: 250 }, gold14: { synthetic: 1340, pearl: 1340, diamond: 1540 }, gold18: { synthetic: 1805, pearl: 1805, diamond: 2005 } },
    goldDrops: ["synthetic", "pearl", "diamond"], goldPendantOnly: true,
    image: "assets/products/open-heart.jpeg", imageInitial: "assets/products/open-heart.jpeg",
    sizes: NECKLACE_LENGTHS, defaultSize: "18″",
    canHaveInitial: true, initialRequired: true, canEngrave: false,
    lede: "An open 21mm heart with your initial suspended within — framed by leaves set with pink and yellow stones.",
    materials: "Sterling silver, 18K gold plated sterling silver, or 14K / 18K solid gold. Open heart with a dangling initial. Leaves set with small pink and yellow synthetic stones. A synthetic stone or freshwater pearl drop. Fine chain in 16″, 18″, or 24″ with silver and gold plated; in solid gold, the pendant only.",
  },
  {
    id: "mens-christ-pendant", title: "Christ Risen Pendant for Men",
    collection: "for-him", category: "pendants",
    drops: [],
    prices: { silver: { none: 225 }, plated: { none: 245 } },
    image: "assets/products/christ-risen-mens-pendant.jpeg", imageInitial: "assets/products/christ-risen-mens-pendant.jpeg",
    sizes: ["18″", "24″"], defaultSize: "24″",
    canHaveInitial: false, canEngrave: true,
    lede: "Christ rising in triumph, arms open, a small golden heart-stone at his center — designed for him.",
    materials: "Sterling silver or 18K gold plated sterling silver. Small yellow synthetic center stone. A larger, bolder figure. Chain in 18″ or 24″.",
  },
  {
    id: "mens-christ-ring", title: "Christ Risen Ring for Men",
    collection: "for-him", category: "rings",
    drops: [],
    prices: { silver: { none: 295 }, plated: { none: 315 } },
    image: "assets/products/christ-risen-mens-ring.jpeg", imageInitial: "assets/products/christ-risen-mens-ring.jpeg",
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"], defaultSize: "10",
    canHaveInitial: false, canEngrave: true,
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
// Local (fallback) price for one selection. Gold on a piece without gold prices returns null (quote).
function adornmeGetMetalPrice(product, metal, drop, size) {
  const table = product.prices && product.prices[metal];
  if (!table) return null;
  const v = table[adornmePriceKey(product, drop, size)];
  return typeof v === "number" ? v : null;
}
// True when the piece has 14K / 18K gold prices (sold with Add to bag).
function adornmeHasGold(product) {
  return !!(product && product.prices && product.prices.gold14 && product.prices.gold18);
}
// Metals offered for a piece on the shop pages: Silver, Gold Plated, plus 14K / 18K when priced.
function adornmeMetalsFor(product) {
  return adornmeHasGold(product) ? [...SHOP_METALS, ...GOLD_METALS] : SHOP_METALS.slice();
}
// Drop choices for a piece in a metal. In gold: the piece's goldDrops (adds Lab Diamond where offered).
function adornmeDropsFor(product, metal) {
  if (METALS[metal] && METALS[metal].gold && adornmeHasGold(product) && product.goldDrops) return product.goldDrops;
  return product.drops || [];
}
// Lowest price in one metal (e.g. "14K from $…"), or null.
function adornmeMetalFrom(product, metal) {
  const t = product.prices && product.prices[metal];
  if (!t) return null;
  const v = Object.values(t).filter((x) => typeof x === "number");
  return v.length ? Math.min(...v) : null;
}
// Photo with the chosen initial engraved (pieces with `initialPhotos`), or null. "—" = the blank heart.
function adornmeInitialPhoto(product, initial) {
  if (!product || !product.initialPhotos) return null;
  return product.initialPhotos + (initial && /^[A-Z]$/.test(initial) ? initial : "blank") + ".jpg";
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
    METALS, SHOP_METALS, GOLD_METALS, CUSTOMIZE_METALS, METAL_LABELS, DROPS, GOLD_QUOTE_DROPS, HEART_STONES, GOLD_COLORS,
    QUOTE_EMAIL, GOLD_NOTE, GOLD_PENDANT_NOTE, PRODUCTS, HIDDEN_PRODUCTS,
    adornmePriceKey, adornmeGetMetalPrice, adornmeGetFromPrice, adornmeShopifyOptions, adornmeQuoteMailto,
    adornmeHasGold, adornmeMetalsFor, adornmeDropsFor, adornmeMetalFrom, adornmeInitialPhoto,
  });
  window.ADORNME_METAL_LABELS = METAL_LABELS;
}
