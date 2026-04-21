# May 1 Launch — Status

_Last updated: 2026-04-21_

## Done

### Pricing migration
- **May 1 pricing cost summary doc** written (`docs/may-1-pricing-update.md`) — full matrix, rollout timeline, rollback plan
- **Website vertical pages** all updated to May 1 prices with ACRE-style price anchoring (strikethrough à-la-carte value + amber "Save $X" tag) across Real Estate, Lot & Land, Multi-Family, Builders, Commercial, Airbnb, Branding
- **Progress Program** cut 34% (was above market, killing deals)

### Studio infrastructure
- **Pay-first flow** live: Stripe Payment Links → webhook → GHL custom field `studio_schedule_url` → workflow email with personalized calendar link (zero manual reconciliation)
- **Real Peerspace photos** swapped into `/studio` — podcast carousel in hero, per-room action shots
- **GHL email templates** updated (Booking Confirmation + Scheduling Link) to use `{{contact.studio_schedule_url}}` merge tag
- **Stripe webhook** `src/app/api/stripe/webhook/route.ts` maps product → calendar URL per purchase

### Consultation CTA (this session)
- New `src/components/consult-cta.tsx` — amber pill, vertical-specific headline/subhead, link to GHL Free Consult calendar with `?interest=<slug>` prefill
- Embedded on all 7 verticals + `/studio`
- "Free Consult" link added to nav (desktop + mobile) as amber accent before "Book Now"
- Free Consultation calendar description updated in GHL to cover media + studio + AI tools

### Members + referrals
- `/members` scoped to Spot studio members only (Aryeo fallback link for accidental visitors)
- Stripe Customer Portal wired at pay.averyandbryant.com
- Referral page + nav entry + sitemap
- Email campaign library (18 campaigns, 40 emails) staged

## Pending (in priority order for May 1)

### Blocker: must happen before launch
- **[#11] Rebuild Aryeo catalog per May 1 pricing matrix** — site shows the prices but Aryeo is where orders actually route. Until Aryeo is updated, customer-facing prices won't match checkout
- **[#14] End-to-end Stripe test payment** — verify full studio pay-first chain: pay → webhook → GHL contact → custom field populated → workflow email sends with correct calendar link
- **[#10] Publish 4 draft GHL workflows** with new email templates (currently in draft state)

### Communication
- **[#13] Send existing clients a May 1 pricing-change notice** — draft client-facing email + schedule send before 2026-05-01

### Config
- **[#16] Set `NEXT_PUBLIC_GHL_WIDGET_ID` in Vercel** — user needs to provide ID, then set in env

### Uncommitted code (this session)
- ConsultCTA module + nav update + consult CTA on 8 pages — not yet committed or pushed
