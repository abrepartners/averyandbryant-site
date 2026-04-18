# Aryeo Order Form Field Specs (with GHL Mapping)

Source-of-truth for rebuilding the 7 Aryeo order forms so they capture what GHL needs for nurture, pipeline routing, and reporting.

Captured from live GHL state on 2026-04-18.

---

## Architecture

```
averyandbryant.com/order/<vertical>
        │  (native form: name, email, phone)
        ▼
Aryeo /order-form-sessions  ──► customer_data prefilled
        │
        ▼
Aryeo native form (the one we're speccing here)
        │  (collects everything below)
        ▼
Aryeo creates Order + Customer
        │
        ▼
Aryeo webhook ──► aryeo-ghl-bridge (Vercel project) ──► GHL
        │
        ▼
GHL Contact created/updated
        │  + custom fields populated
        │  + tags applied (vertical, service type, source)
        │  + Opportunity created in "Listing Media (Aryeo-driven)" pipeline
        │  + Workflow fires (confirmation, reminder, post-shoot, review request, upsell)
        ▼
Nurture sequences run
```

**The form fields = the GHL contact data.** Whatever the form doesn't ask, the bridge can't sync.

---

## What Already Exists in GHL (don't recreate)

### Pipelines
- **`2. Listing Media (Aryeo-driven)`** (id: `WC8hqLpx5l0WbzIpPG8F`) — every Aryeo order creates an Opportunity here
  - Stages: Shoot Scheduled → Shot Completed → Editing → Delivered → Paid → Close
- **`4. Recurring / Monthly Clients`** — for ongoing programs (commercial dealerships, multi-family content retainers)
- **`1. Sales Pipeline (ALL new money)`** — for new prospects pre-Aryeo (commercial RFQs, branding inquiries)

### Custom Fields (Aryeo bridge already writes these)
| Field | Type | Populated by |
| --- | --- | --- |
| `Aryeo Customer ID` | text | bridge — links contact ↔ Aryeo |
| `Aryeo Last Order` | date | bridge — most recent order timestamp |
| `Aryeo Order Count` | numerical | bridge — lifetime order count |
| `Aryeo Total Spend` | numerical | bridge — lifetime $ |
| `Aryeo Products` | large text | bridge — order line items |

### Custom Fields (general, can be reused)
- `property_type` (large text) — keyKey is oddly `contact.purpose`, watch out
- `service_notes`, `service_needed`
- `address_notes`, `Gate Code`, `preferred_appointment_time`
- `Referral Source`, `Contact Source (I)` (single-options dropdown)
- `urgency_level`, `lead_status`, `decision_maker`, `budget_range`, `project_timeline`

### Tags
- Aryeo: `aryeo`, `aryeo-client`, `aryeo-booking`, `aryeo order created`, `aryeo delivered`, `aryeo-synced`
- Service: `svc listing`, `svc branding`, `svc saas`, `svc studio`
- Lifecycle: `new-lead`, `shoot-scheduled`, `media-delivered`, `needs-payment`, `repeat-client`
- Modifier: `drone`, `twilight`, `service-type:drone`, `listing-media-drone`, etc.

---

## What's Missing in GHL (CREATE THESE FIRST)

### Vertical tags (one per vertical — used for segmentation)
- [ ] `vertical:real-estate`
- [ ] `vertical:multi-family`
- [ ] `vertical:lot-land`
- [ ] `vertical:builders`
- [ ] `vertical:commercial`
- [ ] `vertical:airbnb-rental`
- [ ] `vertical:branding`

### Universal custom fields (every form should populate)
- [ ] **`Listing Address`** (text) — the property being shot, distinct from contact mailing address
- [ ] **`UTM Source`** (text) — first-touch source from URL params
- [ ] **`UTM Medium`** (text)
- [ ] **`UTM Campaign`** (text)
- [ ] **`First Touch Source`** (text) — `averyandbryant.com` vs. direct Aryeo entry
- [ ] **`Preferred Shoot Date`** (date)
- [ ] **`Special Instructions`** (large text) — gate codes, lockboxes, pet warnings, etc.

### Per-vertical custom fields (see each section below for exact list)

---

## Universal Form Fields (every Aryeo form)

These should appear on every vertical's form. Aryeo's Step 4 (Customer Info) handles most natively.

| Form field | Required? | GHL destination | Notes |
| --- | --- | --- | --- |
| First name | ✅ | standard `firstName` | Prefilled by our native form |
| Last name | ✅ | standard `lastName` | Prefilled by our native form |
| Email | ✅ | standard `email` | Prefilled by our native form |
| Phone | optional | standard `phone` | Prefilled by our native form |
| Listing/property address | ✅ | `Listing Address` (custom) + Aryeo address | Aryeo collects this on Step 1 |
| Preferred shoot date | optional | `Preferred Shoot Date` (custom) + Aryeo schedule step | |
| Special instructions | optional | `Special Instructions` (custom) | gate codes, lockbox, pets, occupancy |
| Referral source | optional | `Referral Source` (existing) | "How'd you hear about us?" |

Plus the bridge auto-populates:
- `Aryeo Customer ID`, `Aryeo Last Order`, `Aryeo Order Count`, `Aryeo Total Spend`, `Aryeo Products`
- Tag: `aryeo-client`, `vertical:<x>`, `svc listing` (or `svc branding`)
- Opportunity in `Listing Media (Aryeo-driven)` pipeline at stage `Shoot Scheduled`

---

## 1 · Real Estate Listing Form

**Tag on submission:** `vertical:real-estate`, `svc listing`, plus modifier tags based on selection (`drone`, `twilight`)

### Form-specific fields
| Field | Type | Required? | Why GHL needs it |
| --- | --- | --- | --- |
| **Square footage** | number | ✅ | Drives package pricing AND segmentation (luxury vs standard) |
| **Property type** | dropdown | ✅ | single family / condo / townhome / luxury / new construction |
| **Listing price (range)** | dropdown | optional | $0–250k / $250–500k / $500k–1M / $1M+ — for `tier-silver` / `tier-bronze` / luxury tagging |
| **Listing brokerage** | text | optional | Track which brokerages refer most |
| **MLS # / Listing URL** | text | optional | Link to the live listing for our team's reference |
| **Is property occupied?** | yes/no | optional | Affects shoot prep (decluttering, scheduling around tenants) |
| **Drone needed?** | yes/no | optional | Tag `drone` if yes |
| **Twilight needed?** | yes/no | optional | Tag `twilight` if yes |

### New GHL custom fields to create
- [ ] `Listing Sqft` (numerical)
- [ ] `Listing Price Range` (single-options: $0–250k, $250–500k, $500k–1M, $1M+)
- [ ] `Property Type` (single-options) — *consider renaming the existing `property_type` field for clarity*
- [ ] `Listing Brokerage` (text)
- [ ] `MLS or Listing URL` (text)
- [ ] `Property Occupied` (single-options: Vacant, Occupied, Unsure)

### Workflow triggers
- New order → confirmation SMS + email
- 24h before shoot → reminder SMS w/ photographer name + special instructions
- Post-shoot (T+1 day) → "Editing in progress" email
- Delivery → review request (Google) + upsell: drone, twilight, virtual staging
- Repeat-client tag triggers → reduce nurture friction, fast-path scheduling

---

## 2 · Lot & Land Form

**Tag on submission:** `vertical:lot-land`, `svc listing`, `drone` (always), `service-type:drone`

### Form-specific fields
| Field | Type | Required? | Why |
| --- | --- | --- | --- |
| **Acreage** | number | ✅ | Drives package pricing + flight planning |
| **Lot type** | dropdown | ✅ | Raw land / Subdivided lot / Development site / Hunting/Recreation |
| **Boundary overlays needed?** | yes/no | optional | Tag with overlay add-on; affects pricing |
| **Listing URL or coords** | text | optional | We need GPS coords for the flight if no street address |
| **Use case** | dropdown | optional | Listing / Subdivision pitch / Personal |

### New GHL custom fields
- [ ] `Acreage` (numerical)
- [ ] `Lot Type` (single-options)
- [ ] `Boundary Overlays Needed` (single-options: Yes, No)
- [ ] `Land Use Case` (single-options)

### Workflow triggers
- Same as real estate, plus:
- Add to `4. Recurring / Monthly Clients` pipeline if user opts into a developer retainer

---

## 3 · Multi-Family Form

**Tag on submission:** `vertical:multi-family`, `svc listing`, `b2b`

### Form-specific fields
| Field | Type | Required? | Why |
| --- | --- | --- | --- |
| **Property name** | text | ✅ | Multi-family identifies by name, not address ("The Grove" vs "123 Main") |
| **Number of units** | number | ✅ | Drives shoot scope and pricing |
| **Number of unit types** | number | optional | One floor plan vs four = different shoot day |
| **Property management company** | text | optional | Important for upsell — many PMs have multiple properties |
| **Stage** | dropdown | ✅ | Lease-up / Refresh / Repositioning / Renovation reveal |
| **Amenities to capture** | multi-select | optional | Pool, gym, clubhouse, dog park, business center, etc. (drives shot list) |
| **Interested in recurring program?** | yes/no | optional | If yes → tag `client monthly`, push to recurring pipeline |

### New GHL custom fields
- [ ] `Property Name` (text)
- [ ] `Number of Units` (numerical)
- [ ] `Number of Unit Types` (numerical)
- [ ] `Property Management Company` (text)
- [ ] `MF Stage` (single-options: Lease-up, Refresh, Repositioning, Renovation reveal)
- [ ] `Amenities Selected` (multiple-options or large text)

### Workflow triggers
- New order → confirmation, reminder, post-shoot — same as real estate
- "Interested in recurring program" = yes → tag `client monthly`, create opportunity in Pipeline 4 ("Recurring / Monthly Clients") at "Onboarding"

---

## 4 · Builders Form

**Tag on submission:** `vertical:builders`, `svc listing`, `b2b`

### Form-specific fields
| Field | Type | Required? | Why |
| --- | --- | --- | --- |
| **Project type** | dropdown | ✅ | Custom home / Model home / Spec / Development / Commercial build |
| **Project stage** | dropdown | ✅ | Foundation / Framing / Drywall / Finishing / Complete |
| **Number of properties** | number | optional | Single home vs entire neighborhood |
| **Recurring program interest?** | yes/no | optional | Monthly progress = tag `client monthly` |
| **Builder/company name** | text | optional | Track which builders order most |
| **Brand assets needed?** | multi-select | optional | Logo overlays, watermarks, brand color grading |

### New GHL custom fields
- [ ] `Project Type` (single-options)
- [ ] `Project Stage` (single-options)
- [ ] `Number of Properties` (numerical)
- [ ] `Recurring Program Interest` (single-options: Yes, No, Maybe)
- [ ] `Builder Company Name` (text)

### Workflow triggers
- New order → confirmation, reminder, etc.
- Recurring interest = Yes → push to Pipeline 4 + start onboarding sequence

---

## 5 · Commercial Form *(new — needs Aryeo form)*

**Tag on submission:** `vertical:commercial`, `svc listing`, `b2b`

### Form-specific fields
| Field | Type | Required? | Why |
| --- | --- | --- | --- |
| **Commercial subtype** | dropdown | ✅ | CRE Listing / Dealership / Office / Retail / Hospitality / Industrial |
| **Listing or owner-marketing?** | dropdown | ✅ | Drives whether this is one-time or potential recurring |
| **Property size (sqft or acres)** | number | optional | Pricing input |
| **Brokerage or company name** | text | optional | For brokers — track repeat business |
| **Recurring program interest?** | yes/no | optional | Big deal — dealerships are usually monthly |
| **Brand consistency required?** | yes/no | optional | Some clients have brand standards we need to match |

### New GHL custom fields
- [ ] `Commercial Subtype` (single-options: CRE Listing, Dealership, Office, Retail, Hospitality, Industrial)
- [ ] `Commercial Use Type` (single-options: Listing, Owner Marketing, Both)
- [ ] `Property Size` (numerical)
- [ ] `Brand Consistency Required` (single-options: Yes, No)

### Workflow triggers
- All commercial inquiries also create an Opportunity in `1. Sales Pipeline` at `New Inquiry` (these are usually higher-touch sales conversations)
- Recurring program interest = Yes → also create in Pipeline 4 at `Onboarding`

---

## 6 · Airbnb & Short-Term Rentals Form

**Tag on submission:** `vertical:airbnb-rental`, `svc listing`

### Form-specific fields
| Field | Type | Required? | Why |
| --- | --- | --- | --- |
| **Property type** | dropdown | ✅ | Entire home / Private room / Cabin / Condo / Multiple units |
| **Sleeps (occupancy)** | number | optional | Helps frame the shoot |
| **Active listing platforms** | multi-select | optional | Airbnb / VRBO / Booking.com / Direct site — drives image format presets |
| **Listing URL(s)** | text | optional | We can review existing photos before shoot |
| **Hot tub/pool/special amenity?** | yes/no + text | optional | Hero amenity = priority shot |
| **Drone needed?** | yes/no | optional | |
| **Twilight needed?** | yes/no | optional | |
| **Virtual staging needed?** | yes/no | optional | |

### New GHL custom fields
- [ ] `STR Property Type` (single-options)
- [ ] `Sleeps` (numerical)
- [ ] `STR Listing Platforms` (multiple-options)
- [ ] `STR Listing URL` (text)
- [ ] `Hero Amenity` (text)

### Workflow triggers
- Same as real estate, plus:
- Post-delivery → "Update your listing photos" email with hosting tips
- 30 days post-delivery → check-in: "Bookings up?" — for testimonial collection

---

## 7 · Personal Branding Form *(new — needs Aryeo form)*

**Tag on submission:** `vertical:branding`, `svc branding`

### Form-specific fields
| Field | Type | Required? | Why |
| --- | --- | --- | --- |
| **Session type** | dropdown | ✅ | Headshots only / Lifestyle brand / Content day / Team session |
| **Solo or team?** | dropdown | ✅ | Solo / 2-3 people / 4+ |
| **Use case** | dropdown | optional | Real estate agent / Founder / Speaker / Consultant / Team marketing |
| **Studio or on-location?** | dropdown | ✅ | Drives logistics |
| **Wardrobe / outfit changes** | number | optional | Affects shoot duration |
| **Brand style preference** | dropdown | optional | Warm / Editorial / Formal / Casual |
| **Reels needed?** | yes/no | optional | Tag `branding` + add reel-specific custom field |
| **Photos only or full content?** | dropdown | optional | Photos / Photos + reels / Full content day |

### New GHL custom fields
- [ ] `Branding Session Type` (single-options)
- [ ] `Solo or Team` (single-options)
- [ ] `Branding Use Case` (single-options)
- [ ] `Studio or Location` (single-options)
- [ ] `Wardrobe Count` (numerical)
- [ ] `Brand Style Preference` (single-options)
- [ ] `Reels Included` (single-options: Yes, No)

### Workflow triggers
- New order → confirmation + "What to wear" prep email + Pinterest mood board link
- 24h before → reminder
- Post-delivery → review request + upsell: monthly content retainer (tags `client monthly`, pushes to Pipeline 4)

---

## Field-Sharing Logic (don't ask twice)

If a contact already exists in GHL (matched by email or phone), the bridge should:
1. **Update** the contact instead of creating duplicate
2. **Append** order to `Aryeo Order Count` and `Aryeo Total Spend`
3. **Apply** new tags additively (don't remove existing)
4. **Add tag** `repeat-client` if `Aryeo Order Count` ≥ 2
5. **Add tag** `vip customer` and `top-20-client` based on `Aryeo Total Spend` thresholds (define thresholds)

---

## Pipeline Routing Rules

| Form vertical | Primary pipeline | Stage | Secondary pipeline (if recurring opt-in) |
| --- | --- | --- | --- |
| Real Estate | Listing Media | Shoot Scheduled | — |
| Lot & Land | Listing Media | Shoot Scheduled | Recurring (developer retainers) |
| Multi-Family | Listing Media | Shoot Scheduled | Recurring (PM retainers) |
| Builders | Listing Media | Shoot Scheduled | Recurring (progress programs) |
| Commercial | Sales Pipeline (ALL new money) | New Inquiry | Recurring (dealerships, etc.) |
| Airbnb & Rentals | Listing Media | Shoot Scheduled | — |
| Branding | One-Off Fulfillment | Awaiting Kickoff | Recurring (content retainers) |

Note: Commercial routes to **Sales Pipeline** (not Listing Media) because they're usually higher-touch. Once a quote is accepted and an Aryeo order is placed, *then* it moves to Listing Media.

---

## Workflows to Build (or verify exist)

GHL workflows that should fire based on Aryeo events:

1. **`aryeo-order-created`** — webhook: order.created
   - Tag contact, create Opportunity, send confirmation SMS + email
2. **`aryeo-shoot-day-1`** — 24h before scheduled shoot
   - Reminder SMS with photographer name, gate code, special instructions
3. **`aryeo-shoot-completed`** — webhook: order.completed (post-shoot)
   - Move Opportunity to "Shot Completed", send "editing in progress" email
4. **`aryeo-media-delivered`** — webhook: media delivered
   - Move to "Delivered", send delivery email with download link
   - Trigger upsell sequence based on vertical
5. **`aryeo-review-request`** — T+3 days after delivery
   - Google review request via SMS + email
6. **`aryeo-repeat-client-detection`** — when `Aryeo Order Count` updates
   - If ≥ 2: tag `repeat-client`, fast-path future scheduling
   - If ≥ 10: tag `vip customer`, manual outreach trigger
7. **`recurring-program-interest`** — when "Recurring Program Interest" custom field = Yes
   - Tag `client monthly`, create Opportunity in Pipeline 4

---

## Action Checklist (in order)

### In GHL (one-time setup)
- [ ] Create the 7 vertical tags
- [ ] Create universal custom fields (`Listing Address`, `UTM *`, `First Touch Source`, `Preferred Shoot Date`, `Special Instructions`)
- [ ] Create per-vertical custom fields (see each section above)
- [ ] Create the 7 workflows above (or verify existing ones cover them)
- [ ] Verify pipeline routing rules in workflow logic

### In Aryeo (per vertical, one-time setup)
- [ ] Build/rebuild each form with the field structure specified above
- [ ] Configure each form's webhook to fire on submission, completion, delivery
- [ ] Map Aryeo field names → GHL custom field names in the bridge config

### In aryeo-ghl-bridge (Vercel project)
- [ ] Update field mapping config to include all new custom fields
- [ ] Update tag application logic (vertical tags, modifier tags)
- [ ] Verify pipeline routing logic matches the table above
- [ ] Update existing-contact handling (additive, not destructive)

### In our Next.js code
- [ ] When new Aryeo form UUIDs are ready, update `src/lib/order-forms.ts` (single commit)
- [ ] Add Commercial + Branding to `ORDER_FORMS` map
- [ ] Switch their site CTAs from contact (mailto/tel) to `/order/<vertical>`

---

## Open Questions

1. **VIP/tier thresholds** — what `Aryeo Total Spend` values trigger `vip customer` vs `top-20-client`? Need numbers.
2. **Speed-to-lead** — there's a `speed-to-lead-sent` tag in GHL. Should the bridge auto-fire a "we got your order" SMS within X seconds? What's the SLA?
3. **Photographer assignment** — do shoots get assigned to a specific photographer (custom field for "Assigned Photographer"), or always team-pool?
4. **Branding pipeline placement** — currently routing to "One-Off Fulfillment" but it could arguably live in "Listing Media" since it follows the same shoot → edit → deliver flow. Decide once.
5. **Commercial first-touch** — should new commercial inquiries land in Sales Pipeline OR jump straight to Listing Media if they pay through the order form? Confirm.
