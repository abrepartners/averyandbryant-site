# Aryeo Catalog Plan

**Approach (revised 2026-04-18): build new, don't update existing.**

To avoid disturbing live orders and brokerage-specific deals, we are NOT modifying any existing Aryeo product. Instead, we're creating **new `2026 —` prefixed products** in parallel. They start life **non-orderable** (not attached to any order form) and become live only when we manually flip them onto new/updated order forms.

When the flip happens, the existing products can be archived or deprecated. Until then, nothing changes for current clients.

This doc is now the **blueprint** for those new products. The executable is `scripts/aryeo/create-products.mjs` with the manifest at `scripts/aryeo/new-products.json`.

**Snapshot taken:** 2026-04-18
**Total products in Aryeo:** 47 (counted live via `GET /products`)

Pairs with:
- [`pricing-matrix.md`](./pricing-matrix.md) — market research + recommended prices
- [`order-form-field-specs.md`](./order-form-field-specs.md) — form fields + GHL mapping

---

## Findings Summary

1. **Aryeo and the website are out of sync** on prices. Customers see higher prices on the website than Aryeo actually charges. This is a revenue leak (underbilling), a trust risk (bait-and-switch perception), or both.
2. **Aryeo has no dedicated packages for Multi-Family, Commercial, or Builders**. All three currently route to generic residential BASE/PRO/PRO+ products. This is why the vertical pages read generic and why per-vertical pricing doesn't exist yet.
3. **10 brokerage-specific packages are live** (McGraw Realtors, Back Porch Realtors, Clark & Co, Rackley Team, PorchLight Realty, CJC/Charlotte John, Sumbles Team, Hines Homes, CounterTop World, Clark & Co New Agent). **Do not touch these.** They are negotiated deals. Keep their own pricing, their own names, their own product IDs.
4. **Some products exist as both MAIN and ADDON versions** (Drone, 2D Floor Plan) with different prices. This is intentional — ADDON version is the discount-when-bundled price. Good pattern; keep it.
5. **$0 products** — 3 CJC products are priced at $0 (probably included in a retainer). Verify with user but don't change.

---

## 1 · Website ≠ Aryeo Reconciliation

The website advertises prices that differ from Aryeo's live prices. **Fix by updating the site to match Aryeo** (or update Aryeo if you want the higher prices to stick). Decide per row.

| Product | Website shows | Aryeo actual | Difference | Recommended fix |
| --- | --- | --- | --- | --- |
| PRO Media Package | From $325 | **$300** | website +$25 | Raise Aryeo to $325 (or lower website — suggest raise) |
| PRO+ Media Package | From $695 | **$675** | website +$20 | Raise Aryeo to $695 |
| 3D Floor Plan | $125 | **$115** | website +$10 | Raise Aryeo to $125 |
| Speed Ramp Reel | $100 | **$80** | website +$20 | Raise Aryeo to $100 |
| Virtual Staging | $65/image | **$40** | website +$25 | Raise Aryeo to $49 or $65 |
| Headshots ("In-Studio Headshot Sessions") | $200 | **$80** | website +$120 | Raise Aryeo significantly (see §4 — proposed $249) |
| Lifestyle Portraits | $350 | **$225** | website +$125 | Raise Aryeo to $449 (see §4) |
| BASE Lot/Land Package | $175 | **$150** | website +$25 | Raise Aryeo to $199 |
| PRO Lot/Land Package | $275 | **$175** | website +$100 | Raise Aryeo to $349 (big gap — verify deliverables support it) |
| PRO+ Lot/Land Package | $450 | **$375** | website +$75 | Raise Aryeo to $549 |
| Builders Single Visit | $400 | not in Aryeo | — | Create package (see §3) |
| Builders Progress Program | $599/mo | not in Aryeo | — | Create package, but at $325/mo per research (see §3) |
| Builders Marketing Package | $950 | not in Aryeo | — | Create at $1,195 (see §3) |
| Airbnb Starter | $275 | not in Aryeo | — | Create at $399 (see §3) |
| Multi-Family Leasing Essentials | $650 | not in Aryeo | — | Create at $895 (see §3) |

**Recommendation:** until Aryeo is updated, the website is misrepresenting prices for several products. Either (a) update Aryeo to match website pricing, or (b) update website to match Aryeo. The live site sets client expectations, so *Aryeo is the mismatch that needs to move.*

---

## 2 · Current Live Packages (deliverables audit)

Here's what's actually in Aryeo with deliverables pulled from the live product descriptions. Use this as the source of truth for "what you currently offer."

### Residential/Commercial packages

**BASE Media Package — $230 · 35 min**
- ✓ 25 photos
- ✓ Schematic floor plan with room measurements

**PRO Media Package — $300 · 55 min**
- ✓ 40 MLS photos
- ✓ Schematic floor plan with room measurements
- ✓ Drone photos

**PRO+ Media Package — $675 · 120 min**
- ✓ 40 MLS photos
- ✓ Cinematic listing video
- ✓ Social media listing reel
- ✓ Schematic floor plan with room measurements
- ✓ Drone photo OR video
- *Note: allow up to 48hr for video delivery*

### Lot & Land packages

**BASE Lot/Land — $150 · 15 min**
- 6 aerial photos

**PRO Lot/Land — $175 · 20 min**
- 8 edited aerial photos
- 2 land boundary edits

**PRO+ Lot/Land — $375 · 30 min**
- 10 aerial photos
- 30-second drone video
- 2 land boundary edits
- Location stamping

### Standalone services (MAIN products)

| Product | Price | Duration | Deliverables |
| --- | --- | --- | --- |
| Interior & Exterior Photos | $162 | 45 min | Photos at a variety of angles, next-day delivery |
| Cinematic Listing Video | $250 | 60 min | 1-2 min movie |
| Social Media Listing Reel | $125 | 30 min | <60 sec vertical video for IG/TikTok |
| Drone Photos | $120 | 10 min | Aerial stills |
| Drone Video | $125 | 15 min | Aerial footage |
| Zillow 3D Home® | $125 | 30 min | Interactive 3D walkthrough + floor plans |
| 2D Floor Plan Standalone | $135 | 10 min | Walls, layout, doors, windows |
| Lifestyle Portraits | $225 | 60 min | Headshots + team + brand content |
| In-Studio Headshot Sessions | $80 | 20 min | 3 photos, backdrop selection |

### Add-ons

| Product | Price | Notes |
| --- | --- | --- |
| Cinematic Listing Video (save $50) — ADDON | $200 | Discount when bundled |
| Social Media Video Edit (<30 sec) | $50 | Short version of full video |
| Upgrade to 40 Photos | $15 | Photo count upsell |
| Twilight Photos (real) | $190 | 4 photos (2 front, 2 rear) |
| Virtual Twilight | $90 | 4 photos, day-to-dusk conversion, no separate appointment |
| Drone Photos (add-on) | $80 | Bundle discount |
| Drone Video (add-on) | $80 | Bundle discount |
| 2D Floor Plan (add-on) | $70 | Bundle discount |
| 3D Floor Plan | $115 | Rendered version |
| Virtual Staging | $40 | Per room or flat? Needs clarification |
| Speed Ramp Reel | $80 | Dynamic edit |
| Standard Listing Intro & Outro | $50 | Agent branding on video |
| Land Boundary | $50 | Aerial boundary overlay (requires drone service) |
| Proximity Highlights | $30 | Local landmarks (requires drone service) |
| Rush Delivery (6hr) | $100 | Shoot before 11 AM |

### Brokerage-specific (negotiated — leave alone)

| Product | Price | Owner |
| --- | --- | --- |
| Clark & Co. New Agent Package | $250 | Clark & Co. |
| PRO+ Media (Clark & Co.) | $675 | Clark & Co. |
| PRO Media (Clark & Co.) | $300 | Clark & Co. |
| BASE Media (Clark & Co.) | $230 | Clark & Co. |
| Cinematic Video (w/Agent) | $275 | Clark & Co. |
| Social Reel (w/Agent) | $150 | Clark & Co. |
| McGraw Realtors — In-Studio Headshot | $80 | McGraw |
| Rackley Special | $572 | Rackley Team |
| BPR Package A (<$400K) | $575 | Back Porch Realtors |
| BPR Package B (>$400K) | $425 | Back Porch Realtors |
| The PorchLight Special | $412 | PorchLight Cabot |
| The Sumbles Team SPECIAL | $155 | Sumbles Team |
| Package A — Standard Build | $300 | Hines Homes |
| "Do Ya Thang" | $375 | CounterTop World |
| PHOTOGRAPHY | $90 | CounterTop World |
| PHOTOGRAPHY & VIDEOGRAPHY | $175 | CounterTop World |
| Main Package | $249.99 | generic |
| FULL KIT — CJC Branded Content | $0 | Charlotte John (retainer) |
| PHOTOGRAPHY ONLY — CJC | $0 | Charlotte John (retainer) |
| VIDEOGRAPHY ONLY — CJC | $0 | Charlotte John (retainer) |

**Do not modify any of the above without explicit sign-off.** These are relationship deals.

---

## 3 · Gaps — Packages Aryeo Needs (create these)

Aryeo currently has **no dedicated packages** for Multi-Family, Commercial, Builders (non-brokerage), or Airbnb/STR as distinct offerings. They all route to the generic Residential BASE/PRO/PRO+ today. Create these as new products:

### Multi-Family (category: create "Multi-Family")

**Leasing Essentials — $895 · ~90 min**
- ✓ Model unit interior + exterior photos (25–30 images)
- ✓ Drone aerial of complex
- ✓ Amenity coverage (pool / clubhouse / gym / dog park — up to 5 amenity zones)
- ✓ 3D virtual tour of the model unit
- *24-hour delivery for photos, 48 hours for 3D tour*

**Full Property — $1,495 · ~180 min**
- ✓ 40+ MLS-grade photos
- ✓ Drone video (60-90 sec)
- ✓ 3D virtual tour (model unit)
- ✓ Floor plan per unit type (up to 3 unit types)
- ✓ 4-reel social pack (listing / virality / trailer / teaser)

**Marketing Suite — Custom, starting $2,495**
- ✓ Everything in Full Property
- ✓ Ongoing monthly content
- ✓ Multiple model units
- ✓ Full amenity showcase video
- ✓ Community lifestyle shoot
- *Priced individually per property*

### Commercial (category: create "Commercial")

**CRE Listing Base — $895 · ~75 min**
- ✓ Facade + signage photos
- ✓ Interior walkthrough (up to 15 images)
- ✓ Drone aerial (exterior + context)
- ✓ Twilight hero shot (virtual)
- *For commercial brokers listing office, retail, industrial, etc.*

**CRE Listing Pro — $1,495 · ~150 min**
- ✓ Photos: facade, interior, amenities (30+ images)
- ✓ Drone video (60 sec)
- ✓ Interior walkthrough video
- ✓ 2D floor plan
- ✓ Real twilight shoot
- ✓ Proximity highlights

**Dealership Monthly Retainer — $895/mo · 1 visit/mo**
- ✓ Monthly lot drone overview
- ✓ Inventory photography (up to 30 vehicles)
- ✓ Showroom + service bay interior refresh
- ✓ 1 social reel per month
- *12-month commitment, cancellable after 6*

**Hospitality Package — $1,295 · ~120 min**
- ✓ Photos: interior ambience, food/beverage, exterior (30+ images)
- ✓ Cinematic video (60-90 sec)
- ✓ Twilight exterior shoot
- ✓ 2-reel pack (lifestyle + food highlight)
- *For restaurants, venues, hotels, churches*

**Industrial / Custom — Quote-based, from $1,495**
- *Scope-dependent*

### Builders (non-brokerage — separate from Hines/Clark deals)

**Single Visit — $295 · ~60 min**
- ✓ Progress photos (15-20 images)
- ✓ Drone aerial (site overview)
- *For one-time documentation — investor updates, warranty records*

**Monthly Progress Program — $325/mo · 1 visit/mo**
- ✓ Monthly photo documentation (15 images)
- ✓ Quarterly drone aerial
- *12-month commitment*

**Marketing Package — $1,195 · ~150 min**
- ✓ HDR photos (25 images)
- ✓ Drone video (60 sec)
- ✓ 4-reel social pack
- *For completed model homes or builder marketing campaigns*

**Model Home Launch — $1,495+ · ~180 min**
- ✓ Everything in Marketing Package
- ✓ Twilight shoot
- ✓ 3D virtual tour
- ✓ Floor plan

### Airbnb / Short-Term Rentals (category: already exists)

**Starter — $399 · ~60 min**
- ✓ 25 HDR photos
- ✓ 2D floor plan
- *For hosts going live*

**Revenue Boost — $595 · ~90 min**
- ✓ 40 HDR photos
- ✓ Drone aerial
- ✓ 1 social reel
- ✓ 2D floor plan

**Full Showcase — $995 · ~150 min**
- ✓ 40 HDR photos
- ✓ Drone aerial + video
- ✓ Cinematic video tour
- ✓ 4-reel social pack
- ✓ 2D floor plan
- ✓ Virtual staging (3 rooms)

### Personal Branding (category: already exists as "Agent Branding")

**Headshot Essentials — $249 · 30 min** *(replaces current $80 Headshot product)*
- ✓ 30-min studio session
- ✓ Backdrop selection
- ✓ 3-5 final retouched images
- ✓ Review on-camera during session

**Brand Session — $449 · 60 min** *(replaces current $225 Lifestyle Portraits)*
- ✓ 1-hour session (studio OR on-location)
- ✓ 1 look / wardrobe
- ✓ 10 final retouched images
- ✓ Delivered within 48hr

**Content Day — $1,495 · half day** *(NEW — missing tier)*
- ✓ On-location, half-day shoot
- ✓ Headshots + lifestyle + reels
- ✓ 20+ retouched images
- ✓ 4 social reels
- ✓ Multiple wardrobe/outfit changes

**Team Day — $1,995+ · full day** *(NEW — replaces Team $500+)*
- ✓ Full-day on-location
- ✓ Solo headshots for entire team
- ✓ Group shots + brand content
- ✓ Scales with team size ($1,995 base up to 5 people, +$250 per person)

**Content Retainer — $895/mo** *(NEW — replaces "Custom")*
- ✓ Monthly half-day content day
- ✓ 20+ photos + 4 reels per month
- ✓ Brand consistency across every delivery

---

## 3.5 · Running the creator

```bash
# Dry-run (default) — prints what would be created, doesn't touch Aryeo
node scripts/aryeo/create-products.mjs

# Actually create in Aryeo
ARYEO_API_KEY='...' node scripts/aryeo/create-products.mjs --execute
```

- Dedupes by product title (rerun-safe)
- Creates the 3 missing categories (Multi-Family, Commercial, Builders) first
- Creates 20 products (4 Airbnb-dedicated, 3 Multi-Family, 5 Commercial, 4 Builders, 5 Branding)
- Leaves everything **unattached** to any order form — so they can't be ordered until we explicitly wire them up
- Stores product IDs in Aryeo; we reference them when we build the new forms

### 🚧 Blocker — token needs write scope (2026-04-19)

First `--execute` attempt failed:

```
POST /product-categories → HTTP 401 Unauthorized
POST /products           → HTTP 401 Unauthorized
GET  /me                 → HTTP 200 (valid, returns book@averyandbryant.com)
GET  /products           → HTTP 200 (reads fine)
```

The supplied token is valid but has **read-only scope**. Aryeo's public API rejects writes without explicit write permission (or they may require a different partner/admin API path).

**To unblock, pick one:**

1. **Regenerate the token with write scope** — Aryeo Dashboard → Settings → Integrations → API. Look for "products: write" / "categories: write" (or equivalent) when creating a new token. Paste the new token and rerun `create-products.mjs --execute`.
2. **Ask Aryeo support** whether POST /products and POST /product-categories are available on the public API tier, or if they require partner-tier access.
3. **Manual entry in Aryeo UI** — the manifest in `scripts/aryeo/new-products.json` has every title, description, price, and duration. Use it as a copy-paste checklist while clicking through the dashboard.

Keep this note until the products are created. Once they're live, delete this subsection.

---

## 4 · Existing Packages — Updates (DEFERRED — may not happen)

Changes that need to happen to products that already exist in Aryeo. The migration strategy from [`pricing-matrix.md`](./pricing-matrix.md) staggers these across 90 days.

### Residential/Commercial

| Product | Current | Phase 1 | Phase 2/3 | Deliverable update |
| --- | --- | --- | --- | --- |
| BASE Media | $230 | **$249** | hold | Keep 25 photos + floor plan |
| PRO Media | $300 | **$325** | **$395** | Add 3D tour to bundle |
| PRO+ Media | $675 | **$695** | **$749** | Keep bundle, clarify drone IS both photo AND video (not OR) |
| Interior & Exterior Photos | $162 | **$199** | **$249–549 sqft-tiered** | Move to sqft tiering (under 2k / 2-3k / 3-4k / 4-5k / 5k+) |
| Cinematic Listing Video | $250 | **$495** | **$695** | Clarify 60-90s, licensed music, color-graded, 48hr delivery |
| Social Media Listing Reel | $125 | **$149** | **$195** | Clarify vertical 9:16, <60 sec, licensed music |
| Drone Photos (MAIN) | $120 | **$149** | **$199** | Clarify 6-10 edited stills, 1080p+, FAA Part 107 |
| Drone Video (MAIN) | $125 | **$149** | **$199** | Clarify 30-60 sec, color-graded, 4K |
| Zillow 3D Home | $125 | hold | hold | Keep positioned as free-to-client alternative option |
| 2D Floor Plan Standalone | $135 | **$99** | **$79** | Commoditized; ease toward market |
| 3D Floor Plan | $115 | **$149** | hold | Match website price, clarify 48hr delivery |
| Lifestyle Portraits | $225 | **$349** | **$449** | Rebrand as "Brand Session" |
| In-Studio Headshot | $80 | **$199** | **$249** | Rebrand as "Headshot Essentials" — upgrade deliverables: 5 final images (from 3), 45-min session, on-camera review |

### Lot & Land

| Product | Current | Phase 1 | Phase 2/3 | Deliverable update |
| --- | --- | --- | --- | --- |
| BASE Lot/Land | $150 | **$175** | **$199** | Keep 6 aerial photos |
| PRO Lot/Land | $175 | **$275** | **$349** | Website charges $275, Aryeo has $175 — align on Phase 1 then raise |
| PRO+ Lot/Land | $375 | **$450** | **$549** | Match website then raise |

### Add-ons

| Product | Current | Phase 1 | Phase 2/3 | Deliverable update |
| --- | --- | --- | --- | --- |
| Twilight Photos (real) | $190 | **$249** | **$295** | Keep 4 photos, clarify on-site twilight trip |
| Virtual Twilight | $90 | **$59** | **$49** | Commoditized; retail at 3-4× wholesale cost |
| Virtual Staging | $40 | **$49/image** | hold | Charge per image (not flat), clarify "designer-level, 24hr delivery" |
| Drone Photos (addon) | $80 | **$99** | **$129** | Modest bump — still discount vs. standalone |
| Drone Video (addon) | $80 | **$99** | **$129** | Same |
| Speed Ramp Reel | $80 | **$100** | hold | Match website |
| Land Boundary | $50 | **$75** | **$99** | 2 overlays included, up-charge beyond |
| Proximity Highlights | $30 | **$39** | hold | Keep |
| Rush Delivery | $100 | hold | hold | Good as-is |

---

## 5 · Action Checklist

### In Aryeo — Create new (via `scripts/aryeo/create-products.mjs --execute`)
- [ ] 3 new categories (Multi-Family, Commercial, Builders)
- [ ] 20 new `2026 —` products (all verticals)
- [ ] Verify none are attached to an order form yet (= non-orderable, as intended)
- [ ] Record the new product IDs for form wiring later

### In Aryeo — Existing products
- [ ] **Do not modify.** Phase-1 price updates described in §4 are deferred until new products are in place and working.
- [ ] Existing brokerage-specific packages (BPR, Clark & Co, McGraw, CJC, Rackley, PorchLight, Hines, Sumbles, CounterTop) stay as-is permanently.

### In the bridge (aryeo-ghl-bridge)
- [ ] When Aryeo product categories map to GHL `vertical:*` tags, update the mapping
- [ ] Ensure every new product's category sets the correct vertical tag + pipeline routing

### On the website
- [ ] Update vertical pages with Phase 1 prices (match Aryeo after the Aryeo updates land)
- [ ] Add à-la-carte sections to Multi-Family, Commercial, Builders, Airbnb pages once pricing is set
- [ ] Verify every package price shown matches Aryeo within 24hr of each Aryeo price change

### Ongoing
- [ ] Weekly price diff report: website vs. Aryeo. I can automate this with a script that hits `GET /products` and compares to the prices hardcoded in each vertical page
- [ ] 30/60/90 day conversion-rate review after each price phase
