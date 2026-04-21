# averyandbryant-site

Marketing site for **Avery & Bryant** — Arkansas real estate media + The
Spot creative studios. Built on Next.js 16 App Router, deployed on
Vercel.

**Live site:** https://averyandbryant.com (DNS still on Squarespace; Vercel
deploy at averyandbryant-site.vercel.app until DNS cutover)

---

## Tech

- **Next.js 16.2.3** (App Router, Turbopack)
- **React 19** · **TypeScript** · **Tailwind v4**
- **Vercel** — deploy + env management
- **Stripe** — studio payments + memberships
- **GHL (GoHighLevel)** — CRM, email, workflows, calendars
- **Aryeo** — real estate media orders + delivery
- **Frame.io** — video review rounds

## Dev

```bash
# One-time: Node 20+
nvm use 20

# Install
npm install

# Run dev (Turbopack, watches for changes)
npm run dev
# → http://localhost:3000

# Type-check + lint
npx tsc --noEmit
npx next lint

# Build production bundle
npm run build
```

### Environment variables

Copy `.env.example` → `.env.local` and fill in what you need. All secrets
are set in Vercel for preview + production:

```bash
npx vercel env pull .env.local --environment=development
```

Key groups:
- **`NEXT_PUBLIC_*`** — client-safe (widget IDs, public tracking)
- **`STRIPE_*`** — server-only, for the webhook handler
- **`GHL_*`** — server-only, for contact upsert + tag application
- **`ARYEO_*`** — server-only, for order-form session creation
- **`GOOGLE_*`** — server-only, for the Google Reviews section

## Deploy

- Push to `main` → Vercel builds + deploys to production automatically
- Preview deployments on any other branch or PR
- CLI: `npx vercel` (interactive) or `npx vercel --prod`

## Project layout

```
src/
  app/                    # App Router routes
    api/stripe/webhook/   # Stripe → GHL bridge
    order/[vertical]/     # Aryeo order-form hand-off
    real-estate/, studio/, ...  # Vertical + product pages
    layout.tsx            # Site shell (nav, footer, trackers)
  components/
    heroes/               # Per-vertical hero components
    nav.tsx · footer.tsx · consult-cta.tsx
  lib/
    ghl.ts                # Contact upsert + custom field helpers
    order-forms.ts        # Aryeo order-form base URLs
public/
  images/brand/           # Logo SVG + PNG variants + AI/EPS/PSD source
  images/studio/          # Peerspace photos
docs/                     # See table below
scripts/
  ghl/*.mjs               # GHL setup + refactor scripts
  aryeo/*.mjs             # Aryeo bulk product creation
```

## Docs

Everything operational lives in `docs/`. Here's the map:

| File | What it covers |
|---|---|
| [launch-status.md](./docs/launch-status.md) | Current blockers + done for May 1 launch |
| [ab-knowledge-base.md](./docs/ab-knowledge-base.md) | Source of truth for AI agents + Jarvis |
| [ghl-client-onboarding.md](./docs/ghl-client-onboarding.md) | Playbook for setting up a new GHL sub-account the A&B way |
| [studio-operations.md](./docs/studio-operations.md) | Physical + booking operations for The Spot |
| [webhook-flow.md](./docs/webhook-flow.md) | End-to-end trace of the Stripe → GHL payment flow |
| [dns-cutover-runbook.md](./docs/dns-cutover-runbook.md) | Squarespace → Vercel migration checklist |
| [may-1-pricing-update.md](./docs/may-1-pricing-update.md) | Full price sheet + migration timeline |
| [pricing-matrix.md](./docs/pricing-matrix.md) | Studio pricing + membership economics |
| [aryeo-catalog-plan.md](./docs/aryeo-catalog-plan.md) | Aryeo product catalog design |
| [aryeo-new-products.md](./docs/aryeo-new-products.md) | Products to add in Aryeo |
| [aryeo-manual-creation-brief.md](./docs/aryeo-manual-creation-brief.md) | Aryeo UI work when API falls short |
| [order-form-a3-integration.md](./docs/order-form-a3-integration.md) | A3 order-form session hand-off |
| [order-form-field-specs.md](./docs/order-form-field-specs.md) | Field-level spec for order forms |
| [ghl-manual-setup-brief.md](./docs/ghl-manual-setup-brief.md) | GHL steps that require the UI |
| [spot-calendars-stripe-brief.md](./docs/spot-calendars-stripe-brief.md) | Studio: 6 calendars + 9 Stripe prices |
| [spot-confirmation-emails-brief.md](./docs/spot-confirmation-emails-brief.md) | The 6 studio-booking email workflows |
| [frameio-review-workflow.md](./docs/frameio-review-workflow.md) | Video review via Frame.io |
| [email-campaigns.md](./docs/email-campaigns.md) | 18 campaigns / 40 emails library |
| [referral-program-ghl-workflow.md](./docs/referral-program-ghl-workflow.md) | Referral engine design |
| [referral-tracking-system.md](./docs/referral-tracking-system.md) | Referral monitoring + spec |
| [site-assets.md](./docs/site-assets.md) | Image / media source-of-truth map |

## Scripts

```bash
# Create the 6 branded AB Studio email templates (first-time setup)
node scripts/ghl/email-templates.mjs

# Refactor existing templates to reference brand custom values
# (run after editing regex rules inside the script)
unset GHL_API_TOKEN && node scripts/ghl/rebrand-templates.mjs

# Batch-create Aryeo products from scripts/aryeo/new-products.json
node scripts/aryeo/create-products.mjs
```

**Note on `unset GHL_API_TOKEN`:** the shell's env var holds a stale
token; the script falls back to a known-good one when unset. See
`~/.claude/.../memory/reference_ghl_api_tokens.md` for the current token
map.

## Common operations

- **Change brand logo, phone, email, etc.** → Edit the relevant custom
  value in GHL (Settings → Custom Values), not the email templates.
  Templates pull from custom values via merge tags.
- **Add a new service vertical** → Create `src/app/<vertical>/page.tsx`
  + `src/components/heroes/hero-<vertical>.tsx` + add to nav dropdown.
  Mirror an existing vertical's structure.
- **Update prices** → Edit the matching `packages` array on the vertical
  page. Update Aryeo catalog in parallel so site + checkout match.
- **Add an env var** → Add in Vercel (Development + Production), then
  `vercel env pull` locally to sync your `.env.local`.

## Branches

- `main` — production. All commits here deploy to production.
- Feature branches are rare — direct commits are the norm for solo/AI dev.
