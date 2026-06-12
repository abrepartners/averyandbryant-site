# Codex Task: Aryeo Pricing Update + New Order Forms

| Field | Value |
|-------|-------|
| Date | 2026-05-04 21:00 CT |
| Repo | /Users/camillebrown/averyandbryant-site |
| Branch | main |
| Handed off by | Claude Code |
| Handoff file | codex-handoff-aryeo-pricing-update.md |

---

## 1. Objective

Update all Aryeo product prices to the May 15, 2026 pricing and create ~20 new products for verticals that don't have them yet (Multi-Family, Commercial, Builders revamp, Airbnb revamp, Branding revamp). Then attach new products to their respective order forms in the Aryeo admin UI.

This is a TWO-PART task:
1. **API-based**: Run `scripts/aryeo/create-products.mjs --execute` to create new products (script already written, tested in dry-run)
2. **Browser-based**: Update existing product prices in the Aryeo admin panel + attach new products to the correct order forms

## 2. Business / System Context

Avery & Bryant is a real estate media company launching updated pricing on May 15, 2026. All bookings flow through Aryeo order forms embedded on averyandbryant.com. Prices are defined at the Aryeo product level — when a product price changes in Aryeo, the order form automatically shows the new price.

**What breaks if wrong:**
- Wrong prices mean clients book at incorrect rates (revenue loss or overcharge)
- Products not attached to forms means they're invisible to clients
- Commercial vertical currently has NO order form — it uses a consultation CTA. A new form may need to be created if Thomas decides to add one.

**Current state:**
- 6 order forms exist (Real Estate, Builders, Airbnb, Lot & Land, Multi-Family, Commercial — but Commercial has no form, uses consult CTA)
- Existing products have OLD prices (pre-May 15)
- New products defined in `scripts/aryeo/new-products.json` are NOT yet created in Aryeo
- The create script handles deduplication — safe to re-run

**Aryeo admin URL:** https://homes.averyandbryant.com (login required — use existing browser session)

## 3. Source-of-Truth Notes

- `~/averyandbryant-site/docs/pricing-matrix.md` — full recommended pricing with market research
- `~/averyandbryant-site/docs/may-1-pricing-update.md` — customer price sheet (actual launch is May 15)
- `~/averyandbryant-site/docs/order-form-field-specs.md` — form architecture + GHL mapping
- `~/averyandbryant-site/scripts/aryeo/new-products.json` — exact product definitions for API creation
- `~/averyandbryant-site/src/lib/order-forms.ts` — current form IDs
- `~/Documents/ABVault/60-Integrations/Aryeo.md` — integration state (Claude review only)
- `~/Documents/ABVault/20-Clients/Avery-Bryant/Pricing-Matrix.md` — vault pricing note (Claude review only)

## 4. Files Likely Involved

```
scripts/aryeo/new-products.json          — reference (read-only, already correct)
scripts/aryeo/create-products.mjs        — reference (read-only, already correct)
src/lib/order-forms.ts                   — modify (add commercial form ID if created)
docs/may-1-pricing-update.md             — modify (update status tracker checkboxes)
docs/launch-status.md                    — modify (mark Aryeo catalog rebuild complete)
```

## 5. Files Never to Touch

```
.env / .env.local / .env.production
settings.local.json
~/Documents/ABVault/**
~/.claude/**
~/.openclaw/**
```

Repo-specific exclusions:

```
src/app/api/stripe/webhook/route.ts   — Stripe webhook, unrelated
lib/ghl.ts                            — GHL client, unrelated
lib/aryeo.ts                          — server-side Aryeo client (no changes needed)
public/**                             — static assets, unrelated
```

## 6. Implementation Rules

- Do NOT modify the create-products script — it's already tested and correct
- The ARYEO_API_KEY env var must be set before running the script. Pull from Vercel: `npx vercel env pull .env.local`
- Products in Aryeo use prices in CENTS (e.g., 89500 = $895.00)
- When updating existing products in Aryeo browser UI, match prices from the "Customer price sheet" section of `docs/may-1-pricing-update.md`
- No new npm dependencies
- If a Commercial order form is created in Aryeo, update `src/lib/order-forms.ts` with the new form ID

### Existing product price updates (Phase 1 — all at once on May 15):

| Product | Old Price | New Price (cents) |
|---------|-----------|-------------------|
| RE Photos <2k sqft | $162 | 24900 |
| RE Photos 2-3k | $195 | 29900 |
| RE Photos 3-4k | $235 | 35900 |
| RE Photos 4-5k | $285 | 42900 |
| RE Photos 5k+ | $350 | 54900 |
| RE PRO package | $325 | 39500 |
| RE PRO+ package | $695 | 74900 |
| Cinematic Video | $250 | 49500 |
| Social Reel | $125 | 19500 |
| Drone add-on | $125 | 14900 |
| 2D Floor Plan | $135 | 9900 |
| Virtual Twilight | $90 | 4900 |
| Real Twilight | $190 | 29500 |
| Lot & Land BASE | $175 | 19900 |
| Lot & Land PRO | $275 | 34900 |
| Lot & Land PRO+ | $450 | 54900 |
| Builder Single Visit | $400 | 29500 |
| Builder Progress | $599/mo | 32500 |

## 7. Testing Rules

- Run `scripts/aryeo/create-products.mjs` (WITHOUT --execute) first to verify dry run output
- After --execute: verify created products appear in Aryeo admin
- Verify existing product prices updated correctly by browsing each order form
- No automated test suite for this task — verification is visual in the Aryeo UI
- Screenshot each updated form showing new prices as proof

## 8. Deployment Restrictions

- Do NOT run `vercel deploy`, `git push`, `npm publish`, or any command that ships code to production.
- Do NOT run database migrations.
- Do NOT modify Stripe products or GHL configuration.
- Do NOT commit unless all Aryeo changes are confirmed correct.
- **IMPORTANT:** Do NOT update prices in Aryeo before May 15 unless Thomas explicitly says to. The script creates products (they're hidden until attached to forms), but price updates on EXISTING products should wait. Check with Thomas first.

## 9. Expected Output

When finished, Codex should leave things in this state:

- [ ] `scripts/aryeo/create-products.mjs` dry-run output captured (showing what will be created)
- [ ] ~20 new products created in Aryeo via --execute (Multi-Family, Commercial, Builders, Airbnb, Branding)
- [ ] 3 new categories created in Aryeo (Multi-Family, Commercial, Builders)
- [ ] Screenshots of new products visible in Aryeo admin
- [ ] List of existing products identified in Aryeo that need price updates (with current vs target price)
- [ ] `src/lib/order-forms.ts` updated if a Commercial form was created
- [ ] `docs/may-1-pricing-update.md` status tracker updated (Aryeo catalog rebuild checkbox checked)
- [ ] Commit on branch `feat/aryeo-may15-pricing` with descriptive message

**HOLD for Thomas approval before:**
- Updating prices on existing products (do NOT change live prices without explicit go-ahead)
- Attaching new products to order forms (makes them visible to clients)

## 10. Claude Review Checklist

Claude will verify these after Codex completes. Do not remove items.

- [ ] **Scope compliance** — only files from section 4 were touched
- [ ] **Forbidden file check** — nothing from section 5 was modified
- [ ] **Acceptance criteria** — every box in section 9 is met
- [ ] **Tests pass** — dry-run output matches expected products
- [ ] **No new dependencies** — or dependencies were pre-approved in section 6
- [ ] **No hardcoded secrets** — no tokens, keys, passwords in code
- [ ] **Convention compliance** — code follows rules in section 6
- [ ] **Business logic match** — prices match may-1-pricing-update.md exactly

## 11. ABVault Capture

After Claude accepts the work, capture if any of these are true:

- [ ] Aryeo product catalog changed → update `60-Integrations/Aryeo.md`
- [ ] New order form created → update `60-Integrations/Aryeo.md` + `50-Reference/Aryeo-Order-Forms.md`
- [ ] Project milestone reached → update `10-Projects/Pricing-Restructure.md` (if exists) or daily note
- [ ] Pricing went live → update `20-Clients/Avery-Bryant/Pricing-Matrix.md`
