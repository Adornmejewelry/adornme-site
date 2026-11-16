/**
 * Adornme — Client Designs (v1.0, Nov 16 2026)
 * Designs created by customers on the Customize page and added to the Gallery's
 * "Designed by Our Clients" section after the studio reviews them.
 *
 * Designer Royalty: 5% of what another customer pays for the design (after discounts,
 * before tax and shipping), up to $150 per order, paid after the 14-day return window.
 *
 * To add a design, append an entry:
 *   { id: "CD-001", name: "Sunday Pearl", credit: "Sara M.",
 *     piece: "engravable-necklace", metal: "gold14", drop: "pearl", initial: "S", goldColor: "yellow",
 *     story: "Optional one line from the designer." }
 * piece = a PRODUCTS id; metal = silver | plated | gold14 | gold18; drop = synthetic | pearl | diamond (optional);
 * initial = A–Z (optional); goldColor = yellow | white | rose (gold only).
 */
const CLIENT_DESIGNS = [];

const ROYALTY = { rate: 5, cap: 150 };          // Designer Royalty
const AMBASSADOR = { rate: 5, cap: 150 };       // Sales reps and creators (Shopify Collabs)
const AMBASSADOR_APPLY_URL = "";                // Shopify Collabs application page (set once the program is live)

function adornmeClientDesign(id) {
  return CLIENT_DESIGNS.find((d) => d.id === id) || null;
}
function adornmeClientDesignUrl(d) {
  const q = new URLSearchParams({ id: d.piece, metal: d.metal, design: d.id });
  if (d.drop) q.set("drop", d.drop);
  if (d.initial) q.set("initial", d.initial);
  if (d.goldColor) q.set("gold", d.goldColor);
  return `product.html?${q.toString()}`;
}

if (typeof window !== "undefined") {
  Object.assign(window, { CLIENT_DESIGNS, ROYALTY, AMBASSADOR, AMBASSADOR_APPLY_URL, adornmeClientDesign, adornmeClientDesignUrl });
}
