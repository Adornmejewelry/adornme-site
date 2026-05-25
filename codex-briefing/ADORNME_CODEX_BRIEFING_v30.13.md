# ADORNME — CODEX BRIEFING

**Version:** v30.13
**Date:** May 25, 2026
**Prepared for:** Codex (Adornme's design and image generation assistant)
**Founder:** Dr. Mira "Mehraein" Mokhberi

---

## HOW TO USE THIS DOCUMENT

This is the **single source of truth** for the Adornme prototype as it exists right now. Any future work you do for Adornme — generating new images, designing new pieces, suggesting copy changes, building new pages — must align with the architecture described below.

When in doubt, defer to this document. When this document contradicts an earlier instruction, this document wins.

---

## 1. BRAND ARCHITECTURE — LOCKED

**Tagline (used in nav and across the site):**
> A love story you can wear

**Three brand pillars (the Adornme vocabulary, in this order):**
1. **Heart** — Divine love, and every love that flows from it
2. **Flower** — Nature, and the divine love painted on earth
3. **Devotion** — Christ, the cross, and any sacred symbol of devotion returning to their divine source

**Important pillar notes:**
- "Heart" appears first — divine love is the source from which everything else flows
- Use "any sacred symbol of devotion" (NOT "every symbol of devotion" — the universal phrasing is locked across all pages)
- Use "their divine source" (NOT "its divine source")
- These three pillars appear on the home page, on Our Story, and on Journal — phrasing must match in all three places

**Personalization is universal, not a pillar.** Every piece can optionally have:
- An engraved initial (on the front of the design)
- A hand engraving on the back (up to 25 characters)
- A custom note printed on a cream gift card tucked inside the box

**Location line — use exactly this wording, in this exact order, on every page footer:**
> Designed in Newport Beach · Made in Downtown Los Angeles

**Giving partner:** Postpartum Support International (PSI). $1 from every piece sold.

**Color palette (CSS variables — DO NOT change these):**
- `--ink` / `--aegean`: `#2D4D58` (deep teal, primary text and dark backgrounds)
- `--aegean-deep`: `#3F7E99`
- `--buttercup`: `#F4D770` (accent yellow)
- `--antique-gold`: `#C9A961` (decorative accent, eyebrow text, hover states)
- `--cream`: `#F0E7D2`
- `--ivory`: `#FAF6F0` (default page background)
- `--paper`: `#F6EFDE` (product card image backdrop)
- `--rule`: `rgba(45,77,88,0.14)` (subtle borders)

**Typography:**
- Serif: `Cormorant Garamond` (all headings, eyebrow accents, italic emphasis, body of editorial pages)
- Sans: `Inter` (UI labels, navigation, filter chips, body of e-commerce surfaces)

---

## 2. LAUNCH COLLECTION — 17 PRODUCTS

### **The Bleeding Heart Collection** (9 pieces — the signature collection)

| ID | Title | Price | Category |
|---|---|---|---|
| `necklace` | The Bleeding Heart Necklace | $145 | necklaces |
| `pendant` | The Bleeding Heart Pendant | $105 | pendants (pendant only — chain sold separately) |
| `bracelet` | The Bleeding Heart Bracelet | $125 | bracelets (5 motifs on chain) |
| `pearl-bracelet` | The Bleeding Heart Pearl Bracelet | $185 | bracelets (5 motifs on pearl strand) |
| `bangle` | The Bleeding Heart Bangle | $205 | bracelets (hinged) |
| `cuff` | The Bleeding Heart Cuff in Mother-of-Pearl | $265 | bracelets (open cuff, MOP inlay) |
| `earrings` | The Bleeding Heart Earrings | $89 | earrings |
| `ring` | The Bleeding Heart Ring | $165 | rings |
| `open-heart` | The Open Heart | $155 | necklaces (with cursive initial inside) |

### **The Devotion Collection** (5 pieces)

| ID | Title | Price | Category |
|---|---|---|---|
| `bleeding-heart-christ` | Bleeding Heart Christ | $225 | necklaces |
| `christ-risen` | Christ Risen | $225 | necklaces |
| `flower-cross` | Flower Cross | $195 | necklaces |
| `heart-cross` | Heart Cross | $175 | necklaces |
| `devoted-heart` | The Devoted Heart | $165 | necklaces |

**Important:** All 5 Devotion pieces are currently necklaces. Future Devotion rings, earrings, and bracelets are planned but NOT YET LAUNCHED.

### **For Him (Signet Collection)** (2 pieces)

| ID | Title | Price | Category |
|---|---|---|---|
| `signet-pendant` | The Signet Pendant | $185 | pendants |
| `signet-ring` | The Signet Ring | $245 | rings |

**Note:** Names are placeholder. Mira will refine later with more poetic naming.

### **The Adornme Chain** (modular, sold separately)

| ID | Title | Price | Category |
|---|---|---|---|
| `adornme-chain` | The Adornme Chain | $45 | chains |

Three lengths: 16″ (choker) · 18″ (standard) · 20″ (layering). Three metals: silver / vermeil / gold.

### **TOTAL: 17 products at launch.**

---

## 3. METAL PRICING & AVAILABILITY

Three metals with standard pricing multipliers:

| Metal | Multiplier | Color Dot (HEX) | Border (HEX) |
|---|---|---|---|
| Sterling Silver | 1.0× | `#C9CDCF` | `#999` |
| Gold Vermeil | 1.25× | `#D9A856` | `#B07D2D` |
| Solid 14k Gold | 3.1× | `#E9C66B` | `#B98C24` |

**Availability by piece:**
- **All three metals (silver/vermeil/gold):** Necklace, Pendant, Bracelet, Earrings, Ring, Open Heart, Devoted Heart, Chain, Signet Pendant, Signet Ring
- **Vermeil + Gold only (no silver):** Pearl Bracelet, Bangle, Cuff (Mother-of-Pearl), Bleeding Heart Christ, Christ Risen, Flower Cross, Heart Cross

---

## 4. SIZE / LENGTH OPTIONS

| Category | Options | Default |
|---|---|---|
| Necklace lengths | 14–16″ · 16–18″ · 20–22″ | 16–18″ |
| Bracelet (chain) lengths | 6–6.5″ · 6.5–7″ · 7.5–8″ | 6.5–7″ |
| Pearl bracelet lengths | 6.5–7″ · 7–7.5″ | 7–7.5″ |
| Bangle / Cuff sizes | Small · Medium · Large | Medium |
| Ring sizes (women's) | 4 through 9 (half sizes) | 6 |
| Ring sizes (For Him signet) | 8 through 13 | 9 |
| Adornme Chain lengths | 16″ · 18″ · 20″ | 18″ |

---

## 5. PERSONALIZATION RULES

**Initial engraving (cursive on front of design):**
- AVAILABLE: Necklace, Pendant, Bracelet, Pearl Bracelet, Bangle, Ring, Open Heart, Signet Pendant, Signet Ring
- NOT AVAILABLE: Earrings, Cuff (Mother-of-Pearl), all 5 Devotion pieces, Chain
- The Open Heart REQUIRES an initial (the design is built around the letter; default "M" if customer doesn't pick)

**Back engraving (up to 25 hand-engraved characters):**
- AVAILABLE: Necklace, Pendant, Bracelet, Pearl Bracelet, Bangle, Ring, Open Heart, Signet Pendant, Signet Ring, all 5 Devotion pieces
- NOT AVAILABLE: Earrings, Cuff (Mother-of-Pearl), Chain

---

## 6. PHOTOGRAPHY DESIGN PRINCIPLES — LOCKED

These rules apply to EVERY product rendering, every piece, every metal:

**Composition:**
- Soft cream/ivory silk backdrop, slightly draped
- Slight overhead angle, gentle perspective
- Warm soft lighting that highlights gold without harsh reflections
- **NO human elements in frame** (no hands, no models, no skin) — every product photo is the piece alone on silk
- Square aspect ratio (1:1) at minimum 1242×1242px
- PNG format preferred

**Design language — the "leaves" detail:**
- The two small leaf-like forms beneath the heart are **smooth, simple, and minimal** — no surface veins, no pointed tips, no fine engraved detail
- These represent the soft outer petals of *Lamprocapnos spectabilis* (the bleeding heart flower) — not rose leaves
- Visual reference standard: `bleeding-heart-bangle-no-initial.png` — match this leaf treatment on all other pieces
- When rendering or re-rendering any piece, default to the simpler leaf form

**Initial placement (on pieces that can have an initial):**
- The initial sits on the front of the heart, centered, cursive lowercase
- Use letter "M" as the default initial in renders unless instructed otherwise

**Mother-of-Pearl Cuff specifically:**
- Open cuff design (gap at the wrist)
- Two facing hearts in mother-of-pearl inlay, both pointing DOWN (point of heart toward the bottom)
- Pearl drop falling from beneath each heart (gravity-correct, both dropping downward)
- Both hearts symmetric mirror-images of each other
- NO hand in frame
- Visual reference: the current `bleeding-heart-cuff-mother-of-pearl.png` (the version without hands)

**Adornme Chain:**
- Fine cable-link chain construction
- Spring-ring clasp on one end, small jump ring on the other
- Solo shots for each length show the chain laid in a graceful curve
- The "three lengths side-by-side" shot is the signature image (left to right: 16″, 18″, 20″)

---

## 7. IMAGE FILES — STRICT FILENAME CONVENTIONS

All product images live in `assets/products/` with these exact filenames:

### **Bleeding Heart Collection — no-initial versions (gallery-grade signature shots):**
- `bleeding-heart-necklace-no-initial.png`
- `bleeding-heart-pendant-no-initial.png`
- `bleeding-heart-bracelet-five-motifs.png`
- `pearl-bracelet-no-initial.png`
- `bleeding-heart-bangle-no-initial.png`
- `bleeding-heart-cuff-mother-of-pearl.png`
- `bleeding-heart-earrings-no-initial.png`
- `bleeding-heart-ring-no-initial.png`
- `open-heart.jpg` *(initial is part of the design here)*

### **Bleeding Heart Collection — with-initial versions (for Customize page initial swap):**
- `bleeding-heart-necklace-with-initial.jpg`
- `bleeding-heart-bracelet-with-initial.jpg`
- `bleeding-heart-earrings-with-initial.jpg`
- `bleeding-heart-ring-with-initial.jpg`
- `pearl-bracelet-with-initial.png`
- `bleeding-heart-bangle-with-initial.png`

### **Devotion Collection:**
- `bleeding-heart-cross-study-figure.jpg` *(= Bleeding Heart Christ)*
- `christ-risen.jpeg`
- `flower-cross-new.jpg`
- `heart-cross-new.jpg`
- `devoted-heart.jpeg`

### **For Him (Signet):**
- `for-him-signet-pendant-silver.png`
- `for-him-signet-pendant-clarence-silver.png` *(with engraved letter)*
- `for-him-signet-pendant-cj-silver.png` *(alternate engraving)*
- `for-him-signet-ring-silver.png`
- `for-him-signet-ring-clarence-silver.png`
- `for-him-signet-ring-cj-silver.png`

### **Adornme Chain:**
- `adornme-chain-three-lengths.png` *(the money shot — three lengths side-by-side)*
- `adornme-chain-18-inch.png`
- `adornme-chain-20-inch.png`
- *(MISSING: `adornme-chain-16-inch.png` — needs to be rendered)*

### **Founder & brand:**
- `assets/mira-founder-portrait.jpg` *(square circular crop of Mira)*
- `assets/adornme-symbol-mark-adornme.png` *(footer flower-heart symbol mark)*

---

## 8. PAGE-BY-PAGE STATE

### **index.html (Home page)**

**Hero section:** Three-line headline emphasizing brand pillars. Hero image: `bleeding-heart-necklace-no-initial.png`.

**Three Pillars section:** Icon-driven, three columns. Heart, Flower, Devotion. Each with poetic one-liner. The Devotion pillar line reads exactly: *"Christ, the cross, and any sacred symbol of devotion returning to their divine source."*

**Bleeding Heart Collection grid:** 9 product cards in a clean 3×3 grid on desktop. All cards click through to `product.html?id=X`. Order:
- Row 1: Necklace · Pendant · Bracelet
- Row 2: Pearl Bracelet · Bangle · Cuff (Mother-of-Pearl)
- Row 3: Earrings · Ring · Open Heart

**Adornme Chain section:** Two-column layout. Side-by-side three-lengths image on left, length options + price + "Shop the chain →" link on right.

**Devotion Collection grid:** 5 product cards in 3+2 layout on desktop. All click through to `product.html?id=X`.

**Gift section:** Two cards (For Her / For Him). Aspirational.

**Founder section:** Two-column layout. Mira's portrait on left, founder copy + signoff on right.

**Pre-order block + PSI promise. Standard footer.**

### **trinity-collection.html (Gallery)**

**This is the shop page — Mejuri-style clean grid.**

**Hero:** Compact title strip *"The Gallery"* with tagline.

**Filter bar (sticky):** Single horizontal row with chips:
> All · Necklaces (7) · Pendants (2) · Bracelets (4) · Earrings (1) · Rings (2) · Chains (1) | The Bleeding Heart Collection (9) · The Devotion Collection (5) · For Him (2)

Visual divider between piece-type filters and collection filters. Each click is EXCLUSIVE (no intersection). Clicking "All" resets.

**Grid:** 4-column on desktop, 3 on tablet, 2 on mobile, 1 on phone. Each card: square product image, title, "From $X" price, metal swatch dots.

**Important:** The Gallery sources its data from `assets/products-data.js`. Adding a new product to that file makes it appear in the Gallery automatically — no Gallery HTML edits needed.

### **product.html (Universal product detail page)**

**One page template that renders ALL 17 products** based on `?id=X` URL parameter.

Structure: breadcrumb → two-column layout (large image left, controls right) → metal selector → size selector → initial selector (when applicable) → engraving field → Add to bag + Customize this piece → product details → related products grid.

**Important:** This page reads from `assets/products-data.js`. No per-product HTML editing needed.

### **jewelry-designer/index.html (Customize)**

Interactive configurator with:
- Collection selector (Bleeding Heart / Devotion / Chain)
- Piece selector (filters based on collection)
- Metal switcher with color dots
- Initial selector (no-initial + 26 letters) — only shown for pieces that can have one
- Live preview image that swaps based on initial choice
- Length/size selector
- Engraving text overlay with live preview
- Gift note field
- "Anything else?" notes field for studio
- Pre-order CTA with calculated price

URL parameters supported: `?piece=`, `?design=`, `?metal=`, `?initial=`, `?size=`. Used by "Customize this piece" links from product detail pages.

### **our-story.html**

**Page title:** *"A love story / written more than once"*

**Lede:** *"Adornme was born from a woman's lived faith, resilience, and deepening connection to Divine Love."*
(Note: NO "and Christ" at the end of this lede — the lede is universal religious language for accessibility. Christ appears specifically in the Devotion pillar definition below.)

**Founder portrait** at the top of the hero section: circular crop of Mira with antique-gold border.

**Body:** Founder narrative. Persian heritage, immigration to US in 2013 with son, USC EdD + 8 years admissions + consulting business, 2025 layoff and business closure, Divine Love throughline, "Adornme emerged from that journey," then a highlighted "three forms" block (Heart / Flower / Devotion) with antique-gold accent border.

**The narrative is locked. Do not regenerate or alter copy unless explicitly instructed.**

### **journal.html**

Five editorial articles:
1. *Why a flower whose blossoms are heart-shaped* — explains the Bleeding Heart
2. *For those who carry faith alongside their love story* — The Devotion Collection (5 pieces)
3. *The name I was born with* — Mehraein meaning
4. *Designed in Newport Beach · Made in Downtown LA* — manufacturing/location story
5. *$1 from every order* — PSI promise

### **for-him.html**

Aspirational landing page for the men's line. The two Signet pieces are now in the catalog (Signet Pendant + Signet Ring) but this page is currently editorial-only. Has its own hero, philosophy, and editorial content. **Do not put "Coming Soon" labels anywhere on this page.**

### **customize.html**

Just a redirect/wrapper. Do not edit.

---

## 9. CENTRAL DATA FILE — `assets/products-data.js`

**This is the most important architectural file in the prototype.** It defines all 17 products in a single JavaScript array. Both the Gallery and the Product Detail page read from this file.

**Each product object contains:**

```javascript
{
  id: "necklace",                    // unique URL-safe identifier
  title: "The Bleeding Heart Necklace",
  collection: "bleeding-heart",      // bleeding-heart | devotion | for-him | chain
  category: "necklaces",             // necklaces | pendants | bracelets | earrings | rings | chains
  price: 145,                        // base price (silver tier)
  image: "assets/products/...",      // primary "no initial" image
  imageInitial: "assets/products/...", // with-initial image (or same as image)
  metals: ["silver", "vermeil", "gold"], // available metals for this piece
  sizes: ["14–16″", "16–18″", "20–22″"], // or null if no size options
  defaultSize: "16–18″",             // initial size selection
  canHaveInitial: true,              // is initial engraving available
  canEngrave: true,                  // is back engraving available
  initialRequired: false,            // does the piece REQUIRE an initial (Open Heart only)
  shipDays: "7–14",                  // ship time string
  tag: "Pendant only",               // optional overlay tag (or omit)
  lede: "A heart-shaped pendant...",  // short product description
  longDesc: "Our signature design...", // longer marketing copy
  materials: "14k solid gold..."     // materials specification
}
```

**Adding a new product:** append a new object to the `PRODUCTS` array in this file. The new piece will automatically appear in:
- The Gallery (in the correct category and collection filters)
- The product detail page (accessible at `product.html?id=NEW_ID`)
- Related products on similar pieces' detail pages

**It does NOT automatically appear in:**
- The home page (which is hand-curated — Bleeding Heart 9 cards + Devotion 5 cards)
- The Customize page (which has its own product list — pending future refactor)

---

## 10. PENDING WORK (FOR CODEX)

These are the things still needed:

### **A) Metal variations for existing pieces**

Currently every piece has only its gold version rendered. Silver and vermeil renders are needed for the Gallery's metal swatch dots to mean something.

Naming convention: append `-silver.png` or `-vermeil.png` to the existing filename stem. Examples:
- `bleeding-heart-necklace-no-initial-silver.png`
- `bleeding-heart-necklace-no-initial-vermeil.png`
- `bleeding-heart-ring-no-initial-silver.png`
- (etc. for every piece that offers that metal)

**Metal finish guidance:**
- **Sterling silver:** bright, cool, soft polished luster, faintly blue-grey undertones. Warm enough to feel like real silver, never industrial steel-grey.
- **Gold vermeil:** visually similar to solid 14k gold but slightly brighter/lighter yellow, slightly more polished surface.
- **Solid 14k gold:** warm, deep, rich yellow with slightly mellow tone — premium feel.

**Priority order for rendering:**
1. Silver Necklace (most-clicked piece)
2. Silver Ring
3. Silver Earrings
4. Silver Bracelet
5. Silver Open Heart
6. Vermeil versions of all of the above
7. Vermeil Bangle, Pearl Bracelet, Cuff, Devotion pieces

### **B) The missing 16″ Adornme Chain solo shot**

`adornme-chain-16-inch.png` — fine cable chain in 14k gold, in a tighter curve than the 18″ version, on the same cream silk backdrop. Match `adornme-chain-18-inch.png` style exactly.

### **C) Future Bleeding Heart pieces (POST-LAUNCH, do not render yet)**

Mira may commission additional pieces for the Bleeding Heart Collection later:
- Additional necklace variations (layered, with stones, etc.)
- Earring variations beyond the studs
- Ring variations (stacking rings, band styles)
- Heirloom-tier pieces in solid 14k

These are **Phase 2** — only render when explicitly commissioned with new sketches.

### **D) Devotion Collection expansion (POST-LAUNCH, do not render yet)**

Future Devotion pieces planned but not yet designed:
- Devotion rings (e.g. Cross Ring, Heart Cross Ring)
- Devotion earrings (e.g. Cross Studs, Devoted Heart drops)
- Devotion bracelets

Wait for sketches and explicit instruction.

### **E) Christ Heart (HELD for Season 2)**

A figural Christ design with arms outstretched along heart curves (crucified posture). Reference image already rendered. **Held back from launch.** Saved for a future Lent / Good Friday capsule.

### **F) Stone Story expansion (POST-LAUNCH, do not render yet)**

The Mother-of-Pearl Cuff introduces the brand's "Stone Story" — same Bleeding Heart silhouettes with stone-inlay variations. Future stones planned:
- Malachite (deep green with banding) — likely fall 2026 drop
- Onyx, Lapis Lazuli, Carnelian, Turquoise — future seasons
- Diamond pavé — top-tier hero piece, future

Do not render stone variations now beyond what's already in the launch.

### **G) Future "Plumeria-style Flower Cross"**

Held for a Hawaii / wedding-season capsule. Do not render now.

---

## 11. THINGS NOT TO DO

- **Do not** rename pieces or change collection structure without explicit confirmation from Mira
- **Do not** re-render existing images with new aesthetics (e.g. adding more detail to leaves, changing pearl shapes) without explicit instruction
- **Do not** include hands, models, or any human element in product photography
- **Do not** include initials on Devotion Collection pieces (the figural designs already say enough)
- **Do not** revive the old "Flower / Heart / Initial" vocabulary anywhere — superseded by "Heart / Flower / Devotion"
- **Do not** revive the old "Bleeding Heart Cross" collection name — that's now "The Devotion Collection"
- **Do not** use "Made in Downtown Los Angeles" without the "Designed in Newport Beach ·" prefix
- **Do not** depict copyrighted or branded patterns (no Van Cleef clover shapes, no Cartier panther, no Tiffany heart-tag silhouettes — Adornme uses its own iconography)
- **Do not** add "Coming Soon" labels anywhere on the prototype
- **Do not** put initials, engravings, or any text overlay on AI-generated reference images for new pieces (the personalization layer is handled by the website, not by the renders)
- **Do not** change `assets/products-data.js` schema without confirming first — the Gallery and product detail page depend on the exact field names

---

## 12. CURRENT FILE INVENTORY

Top-level pages:
- `index.html` — Home
- `trinity-collection.html` — Gallery (shop grid)
- `product.html` — Universal product detail
- `our-story.html` — Founder narrative
- `journal.html` — Editorial articles
- `for-him.html` — Men's landing page
- `customize.html` — Redirect to `jewelry-designer/index.html`
- `jewelry-designer/index.html` — Customize configurator

Critical asset files:
- `assets/products-data.js` — Central product database (17 products)
- `assets/home-gallery-v24.css` — Shared CSS used by home, gallery, product pages
- `assets/products/` — All product images
- `assets/mira-founder-portrait.jpg` — Founder portrait
- `assets/adornme-symbol-mark-adornme.png` — Brand symbol

---

## 13. CURRENT VERSION HISTORY

| Version | Notable changes |
|---|---|
| v30.9 | Adornme Chain product + section added |
| v30.10 | Customize page rebuilt with discrete images |
| v30.11 | Gallery rebuilt as Mejuri-style shop grid; product.html template created; products-data.js central database |
| v30.12 | Open Heart re-categorized to Necklaces; founder portrait added to Our Story; dual-filter Gallery experiment |
| v30.13 | **Current.** Single-row filter Gallery (replaced dual filter); For Him collection added with 2 signet products; Devotion pieces now categorized as necklaces; Our Story narrative finalized by Mira; all Devotion phrasing unified across pages |

---

**End of brief.** When Codex starts new work, read this document first. Refer back when in doubt.

— Adornme prototype state as of v30.13, May 25, 2026
