# GHL Manual Setup Brief

Hand this document to someone with GHL admin access (or an AI browser agent with that access) to set up the tags and custom fields the Aryeo → GHL bridge needs when new orders flow through. All GHL API writes for per-contact custom fields have to go through the UI — the public API doesn't expose a create-custom-field endpoint.

---

## Context

Avery & Bryant is rebuilding its Aryeo catalog (see `docs/aryeo-catalog-plan.md`) so that every vertical has its own products, with form submissions flowing Aryeo → `aryeo-ghl-bridge` → GHL. The bridge can only populate fields that already exist in GHL.

Reference documents in the repo:
- **Full field specs + GHL mapping:** `docs/order-form-field-specs.md`
- **Pricing matrix:** `docs/pricing-matrix.md`
- **Aryeo catalog plan:** `docs/aryeo-catalog-plan.md`

---

## Pre-requisites

1. **GHL admin access** to sub-account `iXhH37718q9nZnf4tkgF` (the A&B location).
2. Logged-in browser session at `https://app.gohighlevel.com/` or equivalent.
3. Screenshot capability for audit.

---

## Goal

Create in the GHL dashboard, in this order:

1. **~17 new custom fields** (universal + per-vertical)
2. Note tag naming conventions (tags auto-create; no action needed in GHL — reference only)
3. Confirm pipeline routing rules for the Aryeo bridge

**Hard rules:**
- Do not modify, rename, or delete any existing custom field
- Do not touch any brokerage-specific or legacy fields (Roofing, HVAC, etc. — those are from other client setups or past uses)
- Every new field should be flagged as standard per-contact custom field (not "account-wide custom value")

---

## Step 1 — Create Custom Fields

Navigate to: **Settings → Custom Fields** (or the equivalent "Field & Trigger Management" area in GHL)

For each field below, click "Create Custom Field" and enter exactly:

### A · Universal fields (apply to every Aryeo form submission)

| # | Field Name | Type | Picklist Options (if applicable) |
| --- | --- | --- | --- |
| 1 | `Listing Address` | Text | — |
| 2 | `UTM Source` | Text | — |
| 3 | `UTM Medium` | Text | — |
| 4 | `UTM Campaign` | Text | — |
| 5 | `First Touch Source` | Text | — |
| 6 | `Preferred Shoot Date` | Date | — |
| 7 | `Special Instructions` | Large Text | — |
| 8 | `Services Selected` | Multiple Options | `Photos`, `Video`, `Reels`, `Drone`, `3D Tour`, `Floor Plan`, `Virtual Staging`, `Twilight`, `Headshots`, `Content Day` |

### B · Real Estate vertical

| # | Field Name | Type | Picklist Options |
| --- | --- | --- | --- |
| 9 | `Listing Sqft` | Numerical | — |
| 10 | `Listing Price Range` | Single Options | `$0-250k`, `$250-500k`, `$500k-1M`, `$1M+` |
| 11 | `Listing Brokerage` | Text | — |
| 12 | `MLS or Listing URL` | Text | — |
| 13 | `Property Occupied` | Single Options | `Vacant`, `Occupied`, `Unsure` |

### C · Lot & Land vertical

| # | Field Name | Type | Picklist Options |
| --- | --- | --- | --- |
| 14 | `Acreage` | Numerical | — |
| 15 | `Lot Type` | Single Options | `Raw land`, `Subdivided lot`, `Development site`, `Hunting/Recreation` |
| 16 | `Boundary Overlays Needed` | Single Options | `Yes`, `No` |
| 17 | `Land Use Case` | Single Options | `Listing`, `Subdivision pitch`, `Personal` |

### D · Multi-Family vertical

| # | Field Name | Type | Picklist Options |
| --- | --- | --- | --- |
| 18 | `Property Name` | Text | — |
| 19 | `Number of Units` | Numerical | — |
| 20 | `Number of Unit Types` | Numerical | — |
| 21 | `Property Management Company` | Text | — |
| 22 | `MF Stage` | Single Options | `Lease-up`, `Refresh`, `Repositioning`, `Renovation reveal` |
| 23 | `Amenities Selected` | Large Text | — |

### E · Builders vertical

| # | Field Name | Type | Picklist Options |
| --- | --- | --- | --- |
| 24 | `Project Type` | Single Options | `Custom home`, `Model home`, `Spec`, `Development`, `Commercial build` |
| 25 | `Project Stage` | Single Options | `Foundation`, `Framing`, `Drywall`, `Finishing`, `Complete` |
| 26 | `Number of Properties` | Numerical | — |
| 27 | `Recurring Program Interest` | Single Options | `Yes`, `No`, `Maybe` |
| 28 | `Builder Company Name` | Text | — |

### F · Commercial vertical

| # | Field Name | Type | Picklist Options |
| --- | --- | --- | --- |
| 29 | `Commercial Subtype` | Single Options | `CRE Listing`, `Dealership`, `Office`, `Retail`, `Hospitality`, `Industrial` |
| 30 | `Commercial Use Type` | Single Options | `Listing`, `Owner Marketing`, `Both` |
| 31 | `Property Size` | Numerical | — |
| 32 | `Brand Consistency Required` | Single Options | `Yes`, `No` |

### G · Airbnb & Rentals vertical

| # | Field Name | Type | Picklist Options |
| --- | --- | --- | --- |
| 33 | `STR Property Type` | Single Options | `Entire home`, `Private room`, `Cabin`, `Condo`, `Multiple units` |
| 34 | `Sleeps` | Numerical | — |
| 35 | `STR Listing Platforms` | Multiple Options | `Airbnb`, `VRBO`, `Booking.com`, `Direct site` |
| 36 | `STR Listing URL` | Text | — |
| 37 | `Hero Amenity` | Text | — |

### H · Personal Branding vertical

| # | Field Name | Type | Picklist Options |
| --- | --- | --- | --- |
| 38 | `Branding Session Type` | Single Options | `Headshots only`, `Lifestyle brand`, `Content day`, `Team session` |
| 39 | `Solo or Team` | Single Options | `Solo`, `2-3 people`, `4+` |
| 40 | `Branding Use Case` | Single Options | `Real estate agent`, `Founder`, `Speaker`, `Consultant`, `Team marketing` |
| 41 | `Studio or Location` | Single Options | `Studio`, `On-location` |
| 42 | `Wardrobe Count` | Numerical | — |
| 43 | `Brand Style Preference` | Single Options | `Warm`, `Editorial`, `Formal`, `Casual` |
| 44 | `Reels Included` | Single Options | `Yes`, `No` |

Total: **44 custom fields.** Skip #9-13 if A&B already has real-estate-specific custom fields in place — cross-check against the live GHL inventory before duplicating.

### Existing fields — DON'T re-create

These already exist in GHL and should be used as-is (don't recreate):
- `Referral Source`, `Contact Source (I)` — use for attribution
- `Aryeo Customer ID`, `Aryeo Last Order`, `Aryeo Order Count`, `Aryeo Total Spend`, `Aryeo Products` — populated by bridge
- `property_type` (odd keyKey `contact.purpose`) — generic, can reuse or deprecate in favor of more specific vertical fields
- `service_notes`, `service_needed`, `Gate Code`, `preferred_appointment_time`, `budget_range`, `estimate_value`, `project_timeline`

---

## Step 2 — Tag Naming Conventions (reference only — tags auto-create)

GHL tags auto-create when first applied to a contact. No action needed in the UI — but document these names so workflows use them consistently.

### Vertical tags (applied when an order comes from a specific vertical)
- `vertical:real-estate`
- `vertical:multi-family`
- `vertical:lot-land`
- `vertical:builders`
- `vertical:commercial`
- `vertical:airbnb-rental`
- `vertical:branding`

### Service tags (applied based on line items in the order, additive)
- `service:photos`
- `service:video`
- `service:reels`
- `service:drone` *(also `drone` already exists — decide which to standardize on)*
- `service:3d-tour`
- `service:floor-plan`
- `service:virtual-staging`
- `service:twilight` *(also `twilight` already exists)*
- `service:headshots`
- `service:content-day`

### Lifecycle tags (apply based on funnel state)
- `new-lead` (already exists)
- `shoot-scheduled` (already exists)
- `media-delivered` (already exists)
- `needs-payment` (already exists)
- `repeat-client` (already exists) — apply when `Aryeo Order Count` ≥ 2
- `vip customer` (already exists) — apply when `Aryeo Total Spend` ≥ (threshold TBD)

The bridge config will handle applying these tags — they do NOT need to be manually created in advance.

---

## Step 3 — Pipeline Routing (verify, don't rebuild)

Pipelines that already exist and should handle Aryeo-bridge opportunities:

1. **`Listing Media (Aryeo-driven)`** (id: `WC8hqLpx5l0WbzIpPG8F`)
   - Stages: Shoot Scheduled → Shot Completed → Editing → Delivered → Paid → Close
   - Route here from: Real Estate, Lot & Land, Multi-Family, Builders, Airbnb orders

2. **`Sales Pipeline (ALL new money)`** (id: `W9QBMyrXp3KdznZNZkk6`)
   - Stages: New Inquiry → Qualified → Discovery Scheduled → Discovery Completed → Proposal Sent → Proposal Pending → Nurture / Follow Up → Won → Lost
   - Route here from: Commercial (initial inquiry lands here, then moves to Listing Media when order is placed)

3. **`Recurring / Monthly Clients`** (id: `FSiFeNx1R2dJ1s2FnAvR`)
   - Stages: Onboarding → Strategy → Content Production → Review / Approval → Posting / Live → Active Retainer → Monthly Reporting → Renewal Decision → Paused → Canceled
   - Route here when: "Recurring Program Interest" custom field = Yes (Builders, Multi-Family, Commercial dealerships, Branding Content Retainer)

4. **`One-Off Fulfillment`** (id: `pOVRFW9Ev4HmXhoHkeJy`)
   - Stages: Awaiting Kickoff → Kickoff Scheduled → In Production → Internal Review → Delivered → Paid → Upsell / Rebook
   - Route here from: Branding non-retainer sessions (currently — open question whether Branding should live here or in Listing Media)

No new pipelines needed.

---

## Step 4 — Verification

After all fields are created, verify:

1. **Custom fields list** — navigate to Settings → Custom Fields. Filter / search for each new field name. Confirm all 44 exist (minus any that were already present).
2. **Test contact** — create a test contact (`ghl-setup-test@example.com`), manually apply 5-10 of the new fields with sample values. Confirm each saves without error.
3. **Pipeline confirmation** — navigate to Opportunities → each of the 4 pipelines above. Confirm the stages match the names in Step 3. If any stage is missing or renamed, note it.
4. **Delete the test contact** after verification.

---

## Guardrails (DO NOT DO)

- Do not modify existing custom fields (especially the Aryeo-bridge-populated ones)
- Do not rename existing pipelines or stages
- Do not delete existing tags
- Do not create a "vertical" tag manually — tags auto-create on first use via the bridge
- Do not add custom fields to any contact outside of the test contact step

---

## Error / Blocker Protocol

If you hit any of these, stop and report:

1. **Permission denied** on creating custom fields — sub-account user lacks admin rights. Pause and escalate.
2. **Field type not available** (e.g., "Multiple Options" is labeled differently in this GHL tenant) — use the closest equivalent and flag it.
3. **Duplicate name** error — field already exists. Skip it and note for audit.
4. **Picklist option limit** — GHL may have a ceiling on picklist options. If hit, use "Large Text" as fallback and note.

---

## Completion Signal

When done, report:

1. **Fields created:** count + list of names
2. **Fields skipped:** any that already existed + reason
3. **Test contact:** created + deleted, plus screenshot of one field being edited successfully
4. **Pipeline confirmation:** all 4 pipelines exist with stages as documented
5. **Timestamp** of completion
6. **Any flags or improvisations** during the work

The next task after this completes is bridge config work (in `aryeo-ghl-bridge` Vercel project) to map new Aryeo product/order data → these GHL fields. That's a separate task for the main developer.
