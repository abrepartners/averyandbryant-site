# Aryeo Manual Product Creation — AI Agent Brief

Hand this document to a browser-automation AI agent (Claude in Chrome, Operator, etc.) to create the 20 new products + 3 categories in the Aryeo dashboard UI. All data is in this file or linked from it. Agent needs browser-use tools and an authenticated Aryeo session.

---

## Context

A&B (Avery & Bryant) is restructuring its Aryeo product catalog. Because Aryeo's public API doesn't allow product/category creation, every new product has to be entered manually through the dashboard. We've researched the full catalog and prepared 20 new products across 5 verticals. This task is the data-entry execution.

Reference documents in the repo:
- **Source-of-truth manifest:** `scripts/aryeo/new-products.json` (structured JSON)
- **Background + deliverables:** `docs/aryeo-catalog-plan.md`
- **Pricing rationale:** `docs/pricing-matrix.md`

---

## Pre-requisites

1. **Aryeo dashboard access** as `book@averyandbryant.com` (account owner Thomas Brown).
2. **User is already logged in** to the Aryeo dashboard in the browser before the agent starts, OR the agent has credentials to log in. The dashboard URL is typically `https://app.aryeo.com` or similar — confirm by reading the browser's current tab.
3. **Screenshot capability** for audit / troubleshooting.
4. **Ability to copy/paste multi-line text** (descriptions contain newlines).

---

## Goal

Create the following in the Aryeo dashboard, in this order:

1. **3 new product categories** (so products can be assigned to them)
2. **20 new products** with exact titles, descriptions, prices, durations, and category assignments

**Hard rule:** Do not modify, rename, re-price, or delete any existing product. Every new product's title starts with `2026 —` to make them visually distinct.

**Non-orderability is automatic:** we are NOT attaching these products to any order form in this task. That keeps them non-orderable until someone explicitly wires them up later.

---

## Step 1 — Create 3 New Categories

Navigate to: `Settings → Products → Categories` (or wherever product categories are managed in the current Aryeo UI — it may be labeled "Product Categories" or "Taxonomies"). If you can't find it, search the Aryeo help docs for "product category" or "create category".

For each of the 3 categories below, click "Create" / "New Category" / equivalent and enter:

| # | Name (exact title) | Type |
|---|---|---|
| 1 | `Multi-Family` | product |
| 2 | `Commercial` | product |
| 3 | `Builders` | product |

Verify each category appears in the category list after creation. Note each category's ID if visible — you'll need to select it when creating products.

**Do NOT create categories with any other name.** Existing categories that already cover this work: `Residential/Commercial`, `Airbnb & Rentals`, `Land/Vacant Lot`, `Agent Branding`. Use those for the respective products without creating duplicates.

---

## Step 2 — Create 20 New Products

Navigate to: `Products` section of the dashboard (main sidebar item, usually just labeled "Products" or "Catalog").

For each product below, click "Create Product" / "New Product" / equivalent and enter the fields exactly as specified. Do one at a time; verify creation before moving to the next.

### Common fields (same defaults for all 20)

- **Type:** `Main Product` (also may be labeled "Package" or "Service" — pick the option that represents a customer-facing primary product, not an add-on)
- **Publicly Visible:** `No` / `Draft` / `Hidden` — whatever the Aryeo UI offers as the "not orderable" toggle. If there's no such toggle, leave it in whatever state means "exists but not attached to a form."
- **Attached to Order Form:** **No / none** — do NOT attach any of these products to an order form.
- **Tax settings:** use existing default / leave blank
- **Base currency:** USD

### Per-product fields — create each one

Prices are in dollars (e.g. `$895.00`). Descriptions are exact — copy-paste preserving newlines and the ✓ checkmark character. Duration is in minutes.

---

#### 2026 — Multi-Family Leasing Essentials
- **Title:** `2026 — Multi-Family Leasing Essentials`
- **Category:** `Multi-Family` (new category created in Step 1)
- **Price:** `$895.00`
- **Duration:** `90` minutes
- **Description:**
```
For lease-up and refresh shoots. Includes:
✓ 25-30 photos of one model unit (interior + exterior)
✓ Drone aerial of complex
✓ Amenity coverage — up to 5 amenity zones (pool, clubhouse, gym, etc.)
✓ 3D virtual tour of the model unit

24-hour photo delivery. 48-hour 3D tour delivery.
```

#### 2026 — Multi-Family Full Property
- **Title:** `2026 — Multi-Family Full Property`
- **Category:** `Multi-Family`
- **Price:** `$1,495.00`
- **Duration:** `180`
- **Description:**
```
For complete property marketing. Includes:
✓ 40+ MLS-grade photos
✓ Drone video (60-90 sec)
✓ 3D virtual tour (model unit)
✓ Floor plan per unit type (up to 3 unit types)
✓ 4-reel social pack (Listing / Virality / Trailer / Teaser)
```

#### 2026 — Multi-Family Marketing Suite
- **Title:** `2026 — Multi-Family Marketing Suite`
- **Category:** `Multi-Family`
- **Price:** `$2,495.00`
- **Duration:** `240`
- **Description:**
```
Custom scope for ongoing content. Includes:
✓ Everything in Full Property
✓ Ongoing monthly content
✓ Multiple model units
✓ Full amenity showcase video
✓ Community lifestyle shoot

Priced individually per property. Starts at $2,495.
```

#### 2026 — CRE Listing Base
- **Title:** `2026 — CRE Listing Base`
- **Category:** `Commercial` (new)
- **Price:** `$895.00`
- **Duration:** `75`
- **Description:**
```
For commercial brokers listing office, retail, industrial, etc. Includes:
✓ Facade + signage photos
✓ Interior walkthrough (up to 15 images)
✓ Drone aerial (exterior + context)
✓ Virtual twilight hero shot
```

#### 2026 — CRE Listing Pro
- **Title:** `2026 — CRE Listing Pro`
- **Category:** `Commercial`
- **Price:** `$1,495.00`
- **Duration:** `150`
- **Description:**
```
Full commercial listing package. Includes:
✓ 30+ photos: facade, interior, amenities
✓ Drone video (60 sec)
✓ Interior walkthrough video
✓ 2D floor plan
✓ Real twilight shoot
✓ Proximity highlights
```

#### 2026 — Dealership Monthly Retainer
- **Title:** `2026 — Dealership Monthly Retainer`
- **Category:** `Commercial`
- **Price:** `$895.00`
- **Duration:** `90`
- **Description:**
```
One visit per month for dealerships. Includes:
✓ Monthly lot drone overview
✓ Inventory photography (up to 30 vehicles)
✓ Showroom + service bay interior refresh
✓ 1 social reel per month

12-month commitment, cancellable after 6.
```

#### 2026 — Hospitality Package
- **Title:** `2026 — Hospitality Package`
- **Category:** `Commercial`
- **Price:** `$1,295.00`
- **Duration:** `120`
- **Description:**
```
For restaurants, venues, hotels, churches. Includes:
✓ 30+ photos: interior ambience, food/beverage, exterior
✓ Cinematic video (60-90 sec)
✓ Twilight exterior shoot
✓ 2-reel pack (lifestyle + food highlight)
```

#### 2026 — Industrial / Custom Commercial
- **Title:** `2026 — Industrial / Custom Commercial`
- **Category:** `Commercial`
- **Price:** `$1,495.00`
- **Duration:** `180`
- **Description:**
```
Scope-dependent for warehouses, facilities, and specialty commercial. Starting at $1,495.

Deliverables defined per quote — typically includes facility aerial tours, equipment photography, compliance documentation, and custom media.
```

#### 2026 — Builders Single Visit
- **Title:** `2026 — Builders Single Visit`
- **Category:** `Builders` (new)
- **Price:** `$295.00`
- **Duration:** `60`
- **Description:**
```
One-time documentation for investor updates, warranty records, or marketing. Includes:
✓ Progress photos (15-20 images)
✓ Drone aerial (site overview)
```

#### 2026 — Builders Monthly Progress Program
- **Title:** `2026 — Builders Monthly Progress Program`
- **Category:** `Builders`
- **Price:** `$325.00`
- **Duration:** `60`
- **Description:**
```
Track the build over time. Includes:
✓ Monthly photo documentation (15 images)
✓ Quarterly drone aerial

12-month commitment. Same photographer every visit where possible.
```

#### 2026 — Builders Marketing Package
- **Title:** `2026 — Builders Marketing Package`
- **Category:** `Builders`
- **Price:** `$1,195.00`
- **Duration:** `150`
- **Description:**
```
For completed model homes or builder marketing campaigns. Includes:
✓ HDR photos (25 images)
✓ Drone video (60 sec)
✓ 4-reel social pack
```

#### 2026 — Builders Model Home Launch
- **Title:** `2026 — Builders Model Home Launch`
- **Category:** `Builders`
- **Price:** `$1,495.00`
- **Duration:** `180`
- **Description:**
```
Full media for a model home launch. Includes:
✓ Everything in Marketing Package
✓ Twilight shoot
✓ 3D virtual tour
✓ Floor plan
```

#### 2026 — Airbnb Starter
- **Title:** `2026 — Airbnb Starter`
- **Category:** `Airbnb & Rentals` (EXISTING — do not create)
- **Price:** `$399.00`
- **Duration:** `60`
- **Description:**
```
For STR hosts going live. Includes:
✓ 25 HDR photos
✓ 2D floor plan

Optimized for Airbnb, VRBO, Booking.com.
```

#### 2026 — Airbnb Revenue Boost
- **Title:** `2026 — Airbnb Revenue Boost`
- **Category:** `Airbnb & Rentals`
- **Price:** `$595.00`
- **Duration:** `90`
- **Description:**
```
For hosts ready to compete at higher nightly rates. Includes:
✓ 40 HDR photos
✓ Drone aerial
✓ 1 social reel
✓ 2D floor plan
```

#### 2026 — Airbnb Full Showcase
- **Title:** `2026 — Airbnb Full Showcase`
- **Category:** `Airbnb & Rentals`
- **Price:** `$995.00`
- **Duration:** `150`
- **Description:**
```
Maximum occupancy package. Includes:
✓ 40 HDR photos
✓ Drone aerial + video
✓ Cinematic video tour
✓ 4-reel social pack
✓ 2D floor plan
✓ Virtual staging (3 rooms)
```

#### 2026 — Headshot Essentials
- **Title:** `2026 — Headshot Essentials`
- **Category:** `Agent Branding` (EXISTING — do not create)
- **Price:** `$249.00`
- **Duration:** `45`
- **Description:**
```
Studio headshot session. Includes:
✓ 30-min studio session
✓ Backdrop selection
✓ 5 final retouched images
✓ Review on-camera during session
```

#### 2026 — Brand Session
- **Title:** `2026 — Brand Session`
- **Category:** `Agent Branding`
- **Price:** `$449.00`
- **Duration:** `60`
- **Description:**
```
Single-look brand portraits. Includes:
✓ 1-hour session (studio OR on-location)
✓ 1 look / wardrobe
✓ 10 final retouched images
✓ Delivered within 48 hours
```

#### 2026 — Content Day
- **Title:** `2026 — Content Day`
- **Category:** `Agent Branding`
- **Price:** `$1,495.00`
- **Duration:** `240`
- **Description:**
```
Half-day shoot built for a month of content. Includes:
✓ On-location, half-day shoot
✓ Headshots + lifestyle + reels
✓ 20+ retouched images
✓ 4 social reels
✓ Multiple wardrobe / outfit changes
```

#### 2026 — Team Day
- **Title:** `2026 — Team Day`
- **Category:** `Agent Branding`
- **Price:** `$1,995.00`
- **Duration:** `480`
- **Description:**
```
Full-day team branding shoot. Includes:
✓ Full-day on-location
✓ Solo headshots for entire team
✓ Group shots + brand content

Scales with team size — $1,995 base up to 5 people, +$250 per additional person.
```

#### 2026 — Content Retainer
- **Title:** `2026 — Content Retainer`
- **Category:** `Agent Branding`
- **Price:** `$895.00`
- **Duration:** `240`
- **Description:**
```
Monthly half-day content day. Includes:
✓ One half-day shoot per month
✓ 20+ photos + 4 reels per month
✓ Brand consistency across every delivery
```

---

## Step 3 — Verification

After creation is complete, verify:

1. **Categories:** Navigate to the categories list. Confirm all 3 new categories exist and are spelled exactly: `Multi-Family`, `Commercial`, `Builders`.
2. **Products:** Navigate to the full product list. Use the search filter with `2026 —` as the query. Confirm exactly **20 results**.
3. **Spot-check 3 products** at random. Click each and verify:
   - Title matches exactly
   - Price matches (both listed and after any taxes/modifiers)
   - Duration matches (in minutes)
   - Description renders correctly (preserve checkmarks and newlines)
   - Category assignment is correct
4. **Verify non-orderability:** Navigate to Order Forms. Confirm NONE of the `2026 —` products appear on any form. They should be created but unattached.

---

## Guardrails (DO NOT DO)

- **Do not rename, re-price, or delete any existing product.** Especially not the brokerage-specific ones (Back Porch Realtors, Clark & Co, McGraw, CJC/Charlotte John, Rackley, PorchLight, Hines Homes, CounterTop World, Sumbles Team). These are negotiated client deals.
- **Do not attach new products to any order form.** Non-orderability is intentional until we explicitly wire them up.
- **Do not create categories with names that already exist** (`Residential/Commercial`, `Airbnb & Rentals`, `Land/Vacant Lot`, `Agent Branding`). Use the existing ones.
- **Do not skip the `2026 —` prefix** on titles. It's the marker that distinguishes new from live.
- **Do not approximate prices or durations.** Exact values from the tables above.

---

## Error / Blocker Protocol

If you hit any of these, stop and report:

1. **Login required** — the dashboard redirects to a login screen. Pause and ask the user to log in, or provide credentials.
2. **UI path unclear** — if you can't find "Create Category" or "Create Product", take a screenshot of the current dashboard view and describe what's visible.
3. **Field name mismatch** — if a field is labeled differently than `Title` / `Description` / `Price` / `Duration`, describe what's there and guess-map to the closest equivalent; flag it in the report.
4. **Price format** — if Aryeo expects cents (e.g. 89500 instead of $895.00), convert accordingly. Most dashboards use dollar-decimal for display input.
5. **Duplicate title error** — if Aryeo rejects a product because the title already exists, skip it and note it in the report (the `2026 —` prefix should prevent this; flag any conflict).
6. **Required field we didn't specify** — if the form has additional required fields (tax class, SKU, supplier, etc.), use the dashboard's defaults or leave blank unless obviously business-critical; note what was defaulted.

---

## Completion Signal

When done, report back with:

1. **Categories created:** list of 3 with their Aryeo IDs if visible
2. **Products created:** list of 20 with Aryeo IDs
3. **Products skipped/failed:** any that didn't go through, with reason
4. **Any guardrails triggered:** anything you had to improvise on (defaulted fields, renamed buttons, etc.)
5. **Timestamp** of completion
6. **Screenshots** of the final product list showing all 20 `2026 —` entries

The main developer will then wire these new products into new Aryeo order forms as a separate task — that's not your responsibility here.
