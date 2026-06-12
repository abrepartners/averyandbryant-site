# Aryeo Order Form Build-Sheet

**Purpose:** the single buildable spec for rebuilding all 7 Aryeo order forms — what each form's products, add-ons, and intake fields should be, at **current (Grand Slam) pricing**.

**Built:** 2026-06-02. Reconciles three sources:

- `src/lib/pricing.ts` — **live Grand Slam pricing (2026-05-20) = source of truth** for package names + prices
- `docs/pricing-matrix.md` — April research (rationale + à-la-carte standalone rates)
- `docs/order-form-field-specs.md` — intake field spec + GHL mapping

**Live form state confirmed 2026-06-02** (read from each form's Inertia payload):

| Form             | Territory | Upfront | Intake fields live | Verdict                                  |
| ---------------- | :-------: | :-----: | :----------------: | ---------------------------------------- |
| Real Estate      |    ✅     |   50%   |         13         | ✅ strongest (add sqft/type/price-range) |
| Airbnb & Rentals |    ❌     |   0%    |         8          | 🟡 moderate                              |
| Builders         |    ❌     |   0%    |    6 (generic)     | 🔴 rebuild                               |
| Multi-Family     |    ❌     |   0%    |    6 (generic)     | 🔴 rebuild                               |
| Lot & Land       |    ❌     |   0%    |         0          | 🔴 build from zero                       |
| Branding         |     —     |    —    |      no form       | build or keep consult CTA                |
| Commercial       |     —     |    —    |      no form       | build or keep consult CTA                |

> **Products NOT verifiable read-only** — RE gates products behind an address (territory); the other four resolve products via a product-filter at a later step. The product/price layer below comes from `pricing.ts`, not from reading the live form catalog. Confirm against Aryeo product catalog during build.

---

## DECISIONS LOCKED (2026-06-03)

| #   | Decision               | Resolution                                                                                      |
| --- | ---------------------- | ----------------------------------------------------------------------------------------------- |
| 1   | RE photo sqft tiers    | **LOCKED** — standalone photos start **$162** (0–1,500 sqft) → $195/$235/$285/$350. See ladder. |
| 2   | Upfront deposit policy | **50% on ALL forms** — applies to all 6 forms being built.                                      |
| 3   | 3D Virtual Tour        | **Keep** on all verticals (baked into popular packages).                                        |
| 4   | Branding form          | **BUILD** a real Aryeo form (self-serve).                                                       |
| 5   | Commercial form        | **Keep consult CTA** → Sales Pipeline. Not building a form now.                                 |

**Net scope: build/fix 6 forms** (Real Estate, Lot & Land, Builders, Multi-Family, Airbnb, **Branding**). Commercial stays on `/book` consult CTA.

### RE photo sqft tiers — PROPOSED (confirm or adjust prices)

| Square footage | Photo price |
| -------------- | ----------- |
| 0 – 1,500      | **$162**    |
| 1,501 – 2,500  | **$195**    |
| 2,501 – 3,500  | **$235**    |
| 3,501 – 4,500  | **$285**    |
| 4,500+         | **$350**    |

Per Thomas (2026-06-03): start at **$162** and go up. These are A&B's actual current standalone-photo prices ($162/$195/$235/$285/$350). This is the **à-la-carte standalone photo** rate — it sits _below_ the bundled "Listing Launch Kit (From $299)" package on purpose. Aryeo's **Square Footage** intake field drives product selection.

---

## PART A — À-la-carte Service × Vertical Matrix (current pricing)

Prices are exact from `pricing.ts` add-on arrays. Italic/flagged cells are filled from the April matrix where `pricing.ts` doesn't expose a standalone rate — **confirm before publishing.** `—` = not offered in that vertical.

| Service                     | Real Estate                    | Multi-Family        | Lot & Land     | Builders       | Commercial               | Airbnb        |
| --------------------------- | ------------------------------ | ------------------- | -------------- | -------------- | ------------------------ | ------------- |
| **Photos (standalone)**     | **$162–$350** by sqft (ladder) | _$595_ (model unit) | —              | **$295**/visit | _$695_ sm / _$1,095_ mid | From **$399** |
| **Cinematic Video**         | **$695**                       | **$595**            | _$595_ flyover | **$795**       | _$1,295_                 | **$549**      |
| **Social Reel (single)**    | **$195**                       | **$195**            | _$195_         | **$195**       | _$245_                   | **$195**      |
| **Reels Pack (4)**          | **$595**                       | **$595**            | —              | **$595**       | _$695_                   | _$595_        |
| **Drone (photos+video)**    | **$199**                       | **$249**            | incl. in pkgs  | **$249**       | **$299**                 | **$199**      |
| **3D Virtual Tour**         | From **$299**                  | **$449**/unit       | —              | **$449**       | **$549**                 | **$349**      |
| **2D Floor Plan**           | **$99**                        | **$99**/type        | —              | **$99**        | _$149_                   | **$79**       |
| **3D Floor Plan**           | **$149**                       | _$179_/type         | —              | _$149_         | _$199_                   | _$149_        |
| **Virtual Staging**         | **$49**/room                   | **$49**/room        | —              | **$49**/room   | —                        | **$49**/room  |
| **Real Twilight**           | **$295**                       | _$395_              | _$295_ rare    | **$395**       | _$395_                   | _$295_        |
| **Virtual Twilight**        | **$49**/img                    | _$49_/img           | **$49**/img    | _$49_/img      | _$49_/img                | _$49_/img     |
| **Boundary Overlays**       | —                              | —                   | **$99** (≤2)   | —              | —                        | —             |
| **Proximity Map**           | **$39**                        | _$39_               | **$39**        | _$39_          | _$49_                    | —             |
| **AI Rendering (StudioAI)** | —                              | —                   | **$295**       | —              | —                        | —             |
| **Additional Unit Type**    | —                              | **$395**            | —              | —              | —                        | —             |
| **Rush Delivery (6hr)**     | **$100**                       | _$100_              | _$100_         | _$100_         | _$100_                   | _$100_        |

**✅ Pricing decisions RESOLVED (2026-06-03):**

1. **RE photo sqft tiers** — standalone photos start **$162** (0–1,500 sqft) → $195 / $235 / $285 / $350. See ladder above.
2. **Upfront payment** — **50% on all 6 forms.**
3. **3D Tour** — **kept** on all verticals.

_Remaining italic cells in the matrix are à-la-carte rates inferred from the April research where `pricing.ts` has no standalone price — confirm against the Aryeo product catalog during build._

---

## PART B — Per-Form Build-Sheet

Each form gets: **packages** (main products) · **add-ons** · **intake fields** (✅ live / ➕ add / ✏️ change) · **GHL tags**. Full GHL custom-field list per vertical lives in `order-form-field-specs.md` — referenced, not duplicated.

### Universal (apply to every form)

- **Main contact step** (Aryeo native): first/last/email/phone — prefilled from site native form.
- **Universal intake:** "How'd you hear about us?" (✅ live on all), Referral name (✅ live on most), Special Instructions / "anything else" (✅ live on most), Preferred shoot date (Aryeo schedule step).
- **UTM passthrough:** site native form → Aryeo `order-form-session` → bridge → GHL `UTM Source/Medium/Campaign` + `First Touch Source`. Verify the session passthrough during build.
- **Webhook:** each form fires `order.created` → `aryeo-ghl-bridge`. ⚠️ **Webhooks are NOT registered yet** — register during build, do not assume live.

---

### 1 · Real Estate — "Real Estate Listings" `01918da6…`

**Status:** strongest form. Keep all 13 fields; add pricing/segmentation fields.

**Packages (main):**

- Listing Launch Kit — **From $299**
- Listing Domination System — **From $499** _(recommended)_
- Market Takeover Blueprint — **From $849**

**Enhancement packs (offer at add-on step):** Visual Impact $249 · Social Domination $695 · Full Tour Experience $399 · Twilight Upgrade $349

**Add-ons:** per Part A column (video $695, drone $199, 3D tour from $299, 2D $99, 3D plan $149, staging $49/rm, twilight $295, virtual twilight $49/img, proximity $39, rush $100)

**Intake fields:**

- ✅ Live (keep): entry contact, # bedrooms, # full baths, # half baths, vacant/occupied, new construction, gated code, scheduling flexible, waitlist, maps pin, notes+music, how-heard, referral
- ➕ **Add:** **Square Footage** (number, required — drives photo tier) · Property Type (select: single-family/condo/townhome/luxury/new-construction) · Listing Price Range (select: <$250k/$250–500k/$500k–1M/$1M+) · Listing Brokerage (text) · MLS # or Listing URL (text)

**GHL tags:** `vertical:real-estate`, `svc listing` + modifiers `drone`/`twilight` by selection → Pipeline _Listing Media_ / Shoot Scheduled.

---

### 2 · Lot & Land — "Lot & Land Listings" `d6f632d8…`

**Status:** 🔴 EMPTY (0 fields). Build from zero. Highest urgency.

**Packages (main):**

- Aerial Survey Kit — **$249**
- Land Marketing System — **$399** _(recommended)_
- Vision Blueprint — **$649**
- Dream Home Vision — **$995** (StudioAI rendering)

**Add-ons:** Boundary Overlays $99 · Drone Flyover Video $195 · AI Home Rendering $295 · Proximity Map $39 · Virtual Twilight $49/img

**Intake fields (all ➕ new):**

- **Acreage** (number, required — drives pricing + flight plan)
- **Lot Type** (select: Raw land / Subdivided lot / Development site / Hunting-Recreation, required)
- **Boundary overlays needed?** (yes/no)
- **Use case** (select: Listing / Subdivision pitch / Personal)
- **Listing URL or GPS coords** (text — needed when no street address)
- How-heard + Referral + Special instructions (universal)

**GHL tags:** `vertical:lot-land`, `svc listing`, `drone` (always) → Listing Media; if developer-retainer opt-in → also Recurring pipeline.

---

### 3 · Builders — "Builders & Business Marketing" `01914ab4…`

**Status:** 🔴 generic 6 fields. Replace with B2B fields.

**Packages (main):**

- Build Tracker — **$325/mo** (ongoing)
- Builder Marketing System — **$1,395** _(recommended)_
- Model Home Launch Blueprint — **$1,895**

**Add-ons:** Single Visit $295 · Cinematic Video $795 · 3D Tour $449 · Staging $49/rm · Real Twilight $395 · Social Reel $195

**Intake fields:**

- ✅ Keep: how-heard, referral, who's present, entry code, anything-else
- ➕ **Add:** Project Type (select: Custom home / Model home / Spec / Development / Commercial build) · Project Stage (select: Foundation / Framing / Drywall / Finishing / Complete) · Number of properties (number) · **Recurring program interest?** (yes/no/maybe — routes to retainer) · Builder/Company name (text) · Brand assets needed? (multi: logo overlay / watermark / brand color grade)

**GHL tags:** `vertical:builders`, `svc listing`, `b2b` → Listing Media; recurring=yes → Recurring pipeline + onboarding.

---

### 4 · Multi-Family — "Multi-Family Properties" `01914ab7…`

**Status:** 🔴 generic 6 fields (same template as Builders). Rebuild.

**Packages (main):**

- Leasing Launch Kit — **$995**
- Full Property Command — **$1,695** _(recommended)_
- Leasing Domination Suite — **From $2,995**

**Add-ons:** Additional Unit Type $395 · Cinematic Video $595 · 3D Tour $449/unit · Social Reel $195 · Floor Plan $99/type · Staging $49/rm

**Intake fields:**

- ✅ Keep: how-heard, referral, who's present, entry code, anything-else
- ➕ **Add:** Property Name (text, required — MF identifies by name) · Number of units (number, required) · Number of unit types (number) · Property management company (text — upsell signal) · Stage (select: Lease-up / Refresh / Repositioning / Renovation reveal, required) · Amenities to capture (multi: pool/gym/clubhouse/dog park/business center) · Recurring program interest? (yes/no)

**GHL tags:** `vertical:multi-family`, `svc listing`, `b2b` → Listing Media; recurring=yes → Recurring pipeline.

---

### 5 · Airbnb & Rentals — "Airbnb & Rentals Order Form" `01918dcc…`

**Status:** 🟡 moderate (8 fields). Top up with STR-specifics.

**Packages (main):**

- Revenue Ready Kit — **From $449**
- Revenue Boost System — **$695** _(recommended)_
- 5-Star Showcase Blueprint — **$1,095**

**Add-ons:** Cinematic Video Tour $549 · Social Reel $195 · Drone $199 · 3D Tour $349 · Staging $49/rm · 2D Floor Plan $79

**Intake fields:**

- ✅ Keep: how-heard, referral, Property Type, who's meeting, access code, vacant/occupied, highlight focus areas, custom requests
- ➕ **Add:** Sleeps/occupancy (number) · Active listing platforms (multi: Airbnb/VRBO/Booking.com/Direct) · Listing URL(s) (text) · Hero amenity (text — hot tub/pool/view)

**GHL tags:** `vertical:airbnb-rental`, `svc listing` → Listing Media. Post-delivery → "bookings up?" check-in for testimonials.

---

### 6 · Branding _(✅ BUILD — confirmed 2026-06-03)_

Building a real Aryeo form (self-serve revenue path). New form → capture UUID → add to `ORDER_FORMS["branding"]` → switch `/branding` CTA from `/book` to `/order/branding`.

**Packages (main):** First Impression Kit $299 · Brand Identity System $549 _(recommended)_ · Content Command Day $1,695
**Team packages:** Team Brand Blueprint From $2,195 · Content Retainer $995/mo

**Intake fields (new):** Session type (Headshots / Lifestyle brand / Content day / Team) · Solo or team (Solo / 2-3 / 4+) · Use case (Agent / Founder / Speaker / Consultant / Team) · Studio or on-location · Wardrobe / outfit changes (number) · Brand style (Warm / Editorial / Formal / Casual) · Reels needed? · Photos-only or full content?

**Upfront:** 50% deposit (per locked policy).
**GHL tags:** `vertical:branding`, `svc branding` → One-Off Fulfillment / Awaiting Kickoff; retainer interest → Recurring.

---

### 7 · Commercial _(✅ KEEP CONSULT CTA — confirmed 2026-06-03)_

**Not building a form now.** Commercial is higher-touch / custom-scope → stays on `/book` consult CTA, routes to Sales Pipeline. Revisit only if dealership/CRE self-serve volume appears. Spec below retained for future reference.

**If built later — packages:** CRE Launch $995 · CRE Command System $1,695 _(recommended)_ · Lot Command $995/mo (dealership) · Guest Experience $1,495 (hospitality)
**Intake fields:** Commercial subtype (CRE / Dealership / Office / Retail / Hospitality / Industrial) · Listing vs owner-marketing · Property size · Company/brokerage · Recurring interest? · Brand consistency required?
**GHL routing:** `vertical:commercial`, `b2b` → **Sales Pipeline / New Inquiry** (not Listing Media until a paid order lands).

---

## PART C — Build order & dependencies

0. ✅ **Pricing decisions locked** (see Decisions Locked block) — à-la-carte step unblocked.
1. **GHL setup** (via GHL MCP, drafts/structure only): create 7 vertical tags, 10 service tags, universal + per-vertical custom fields (`order-form-field-specs.md` has the exact list). Workflows are GHL-UI builds. Set the 50% deposit policy on all 6 forms.
2. **Aryeo rebuild** (web UI — no API for forms): Lot & Land → Multi-Family → Builders → Airbnb top-up → Real Estate fields (+ sqft tiers) → Branding (new form). Chrome-MCP automation or manual click-through from this sheet.
3. **Bridge mapping** (`aryeo-ghl-bridge`): map new Aryeo field names → GHL custom fields; additive tag logic; pipeline routing per table.
4. **Site code:** update `ORDER_FORMS` with the new Branding UUID + any recreated form UUIDs; switch `/branding` CTA to `/order/branding`; add à-la-carte sections to non-RE vertical pages (only `/real-estate` has one today). Commercial stays on `/book`.
5. **Register Aryeo webhooks** + smoke test end-to-end (test client: Inspector Brown).

**All 5 pre-build decisions resolved 2026-06-03.** Only open confirm: the proposed à-la-carte rates in italic matrix cells (verify vs Aryeo product catalog during build).

---

## PART D — GHL Field Registry (created 2026-06-03)

Location: `ALYT - Avery & Bryant` (`iXhH37718q9nZnf4tkgF`). Resolve by name in the bridge — IDs change if a field is deleted/recreated. **36 new fields created via `ghl-mcp`, 0 duplicates (verified).** Select-style fields created as TEXT (MCP can't set picklist options) — upgrade to SINGLE/MULTIPLE_OPTIONS in the GHL UI if manual dropdown filtering is wanted.

### New fields

| Field                       | ID                     | Type       | Used by                    |
| --------------------------- | ---------------------- | ---------- | -------------------------- |
| Listing Address             | `f2xqX60btfelHqDiBL55` | TEXT       | all                        |
| Listing URL                 | `31pI6mySwhbxOCkmXOie` | TEXT       | RE / Airbnb / Lot (coords) |
| Property Occupied           | `Dv6DGvkPyaDMOrjTXUZX` | TEXT       | RE / Airbnb                |
| UTM Source                  | `tAdB1pAdR9zCux9TfMxL` | TEXT       | all                        |
| UTM Medium                  | `Y14vM0mHmP5WsRvErO7n` | TEXT       | all                        |
| UTM Campaign                | `hsGH9QRPoIvFVPmqCHYz` | TEXT       | all                        |
| First Touch Source          | `TP4tz1iVEVx8bocpBX8R` | TEXT       | all                        |
| Recurring Program Interest  | `yQe5peeQdghjPcyLfGRo` | TEXT       | MF / Builders              |
| Listing Sqft                | `r6EhimwfbeNH1eRlVPxx` | NUMERICAL  | RE (drives photo tier)     |
| Listing Price Range         | `svjcQC4EmPCFfhAp5JVZ` | TEXT       | RE                         |
| Listing Brokerage           | `O2MXCcmo6eXn8fWXB9LC` | TEXT       | RE                         |
| MLS Number                  | `ITqqdxIbQt8EHOxFke1h` | TEXT       | RE                         |
| Acreage                     | `VpVC1ddAtJfYw2Maqah5` | NUMERICAL  | Lot & Land                 |
| Lot Type                    | `D87hqTwHMbjpVGQ28767` | TEXT       | Lot & Land                 |
| Boundary Overlays Needed    | `AUUdOEemIzI58bdka67H` | TEXT       | Lot & Land                 |
| Land Use Case               | `01Dl35ReU4WBquDEOT1D` | TEXT       | Lot & Land                 |
| Property Name               | `tkMzOhoBOwS8U9TlOOvn` | TEXT       | Multi-Family               |
| Number of Units             | `SMjf4OMmEkmMjW23jnhg` | NUMERICAL  | Multi-Family               |
| Number of Unit Types        | `1BZQz2PJdPUIh4JtyMHQ` | NUMERICAL  | Multi-Family               |
| Property Management Company | `sQkO9ZuHDyldYwotajWZ` | TEXT       | Multi-Family               |
| MF Stage                    | `AJ9gCcVgztDA0Vb1u4nu` | TEXT       | Multi-Family               |
| Amenities Selected          | `O99LjdqsxKtTWOuDRUNe` | LARGE_TEXT | Multi-Family               |
| Project Type                | `SPHVUOdsYD2ORdp9caas` | TEXT       | Builders                   |
| Project Stage               | `AKpZgYymgmPBvRZiDBQd` | TEXT       | Builders                   |
| Number of Properties        | `ilZvyTBK4LoTwvByC7o9` | NUMERICAL  | Builders                   |
| Builder Company Name        | `ZRfwCpHISxiPJhVsKQyx` | TEXT       | Builders                   |
| Branding Session Type       | `rlLyeb0GVptgkxFfpBbx` | TEXT       | Branding                   |
| Solo or Team                | `fNFyF8C8jwdVeHgxfVv6` | TEXT       | Branding                   |
| Branding Use Case           | `yXCFZGbEbt9TBwXcENTv` | TEXT       | Branding                   |
| Studio or Location          | `a0T2d9of01w5l8bL3C1O` | TEXT       | Branding                   |
| Wardrobe Count              | `1dVEQG1Ig7CTqha8crEg` | NUMERICAL  | Branding                   |
| Brand Style Preference      | `WtSrkGWIqLOqG6Kkuzbw` | TEXT       | Branding                   |
| Reels Included              | `qpOkQG6SFsSHGoJvsuLa` | TEXT       | Branding                   |
| Sleeps                      | `hAJaersy8GLRc4Vgqb2a` | NUMERICAL  | Airbnb                     |
| STR Listing Platforms       | `YgKhS9A7yKBruSftl73b` | TEXT       | Airbnb                     |
| Hero Amenity                | `FEGNuTJzeM9k2P8BmrjC` | TEXT       | Airbnb                     |

### Reused existing fields (do NOT recreate)

| Field             | ID                     | Type       | Maps from                                       |
| ----------------- | ---------------------- | ---------- | ----------------------------------------------- |
| property_type     | `OZy6Gqsmolyj7XkPUb6V` | LARGE_TEXT | RE/Airbnb/Lot property-type select              |
| Referral Source   | `6rQ1j4havEqJRnVc5e1Q` | TEXT       | "How'd you hear about us?"                      |
| referral_name     | `diezwouMBydifcuymZKy` | TEXT       | referral name field                             |
| Gate Code         | `k51l9x4zBZyg6hc9IWVN` | TEXT       | gated/entry code                                |
| service_notes     | `SxLP3A3D2Wp0vH5H5CqQ` | LARGE_TEXT | "anything else" / notes+music / custom requests |
| Aryeo Customer ID | `e2M1mvega4cimkBbaOQP` | TEXT       | bridge                                          |
| Aryeo Last Order  | `HX5wMaXsNuCZXkbkwfdm` | DATE       | bridge                                          |
| Aryeo Order Count | `T1jJT7LEZAUfYNQkfsuB` | NUMERICAL  | bridge                                          |
| Aryeo Total Spend | `MbsX0wDjjLuoDOJFAzCy` | NUMERICAL  | bridge                                          |
| Aryeo Products    | `gTt7bYymCZvjQzno1L9B` | LARGE_TEXT | bridge                                          |

### Tags (auto-create on first bridge application — no MCP create_tag)

- **Vertical tags to apply:** `vertical:real-estate`, `vertical:lot-land`, `vertical:builders`, `vertical:multi-family`, `vertical:airbnb-rental`, `vertical:branding` (none exist yet — materialize when the bridge first applies them).
- **Reuse existing service/modifier tags:** `drone`, `twilight`, `svc listing`, `svc branding`, `listing-media-photos/video/drone`, `repeat-client`, `vip customer`, `shoot-scheduled`, `media-delivered`, `client monthly`. ⚠️ Existing taxonomy has 3 drone variants (`drone`, `service-type:drone`, `listing-media-drone`) — standardize on `drone` in bridge logic; cleanup deferred.
