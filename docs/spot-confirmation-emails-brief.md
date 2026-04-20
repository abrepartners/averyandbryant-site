# The Spot — Email Confirmation & Follow-Up Setup

How customer payments connect to branded email follow-ups.

---

## The flow

```
Customer pays via Stripe Payment Link
        │
        ▼
Stripe sends built-in receipt email (automatic — already happens)
        │
        ▼
Stripe webhook fires → POST /api/stripe/webhook
        │
        ▼
Webhook reads metadata (tier or product), creates/updates GHL contact,
applies tags (vertical:studio + studio:<sku> + studio:tier-<x>)
        │
        ▼
GHL workflow triggered by tag fires:
  - Branded confirmation email
  - "Schedule your session" email with calendar link
  - Day-before reminder
  - Post-shoot follow-up + review request
```

The webhook code is at `src/app/api/stripe/webhook/route.ts`. Below is what each side needs.

---

## Stripe Dashboard — wire the webhook

1. **Stripe Dashboard → Developers → Webhooks → Add endpoint**
2. **Endpoint URL:** `https://averyandbryant-site.vercel.app/api/stripe/webhook` (until DNS flip; after that, `https://averyandbryant.com/api/stripe/webhook`)
3. **Events to listen for:** `checkout.session.completed`
   - That single event covers both one-time payments AND subscription start
   - Add `invoice.payment_succeeded` later if you want recurring renewal confirmations
4. **Copy the signing secret** (starts with `whsec_…`) — paste into Vercel env as `STRIPE_WEBHOOK_SECRET`
5. Test with **Send test event** in Stripe — should return 200, you'll see logs in Vercel runtime logs

---

## Vercel env vars to set

```bash
vercel env add STRIPE_SECRET_KEY production
# paste your sk_live_... key

vercel env add STRIPE_WEBHOOK_SECRET production
# paste the whsec_... from the webhook config above

vercel env add GHL_API_TOKEN production
# value: pit-99cf08f1-8dea-4fd9-a792-b8566961caf3 (already known)

vercel env add GHL_LOCATION_ID production
# value: iXhH37718q9nZnf4tkgF
```

Repeat for `preview` and `development` environments if desired.

---

## GHL Workflows to build (UI-only — workflows can't be created via API)

The webhook applies tags to GHL contacts. You build workflows that trigger on those tags. Recommended workflows:

### 1. `spot-membership-welcome` — triggers on tag `studio:member`
Single welcome message + onboarding instructions for new subscribers, regardless of tier.

**Trigger:** Tag added → `studio:member`
**Steps:**
- Wait 1 min (let other tags settle)
- Send branded email: "Welcome to The Spot — here's how to use your credits"
  - Include: how to book studio time, what credits cover, address, hours
- Add to opportunity in pipeline `4. Recurring / Monthly Clients` at stage `Onboarding`
- Send branded SMS: "Welcome to The Spot! Reply STUDIO to schedule your first session."

### 2. `spot-tier-creator-lite` — triggers on tag `studio:tier-creator-lite`
Tier-specific onboarding. Same pattern for `studio:tier-creator` and `studio:tier-pro`.

**Trigger:** Tag `studio:tier-creator-lite`
**Steps:**
- Wait 5 min
- Send tier-specific email with their credit count + redemption instructions
- (Optional) Generate one-time-use coupon codes equal to their credit count, send via email — manual until automated

### 3. `spot-booking-confirmation` — triggers on tag `studio:booking`
Hits when someone pays for a one-time studio rental.

**Trigger:** Tag added → `studio:booking`
**Steps:**
- Send branded confirmation email immediately:
  - "Payment received for [room]. Click here to schedule your time slot: [calendar URL]"
- Wait 12 hours
- If no scheduling-confirmation tag yet → send reminder
- Add to opportunity in pipeline `6. Studio Bookings (The Spot)` at stage `Booked`

### 4. Per-product follow-ups (optional, more granular)
If you want per-product nuance, build separate workflows triggered by:
- `studio:podcast-1hr` — short prep (mic check, what to bring)
- `studio:podcast-half` — long prep (multi-episode planning)
- `studio:multi-set-day` — comprehensive prep (treat like a film day)

### 5. `spot-shoot-day-1` — triggers 24hr before scheduled appointment
**Trigger:** Appointment time approaching (use GHL's "before appointment" trigger)
**Steps:**
- Send SMS + email: address, parking, gate code, what to bring, photographer/engineer name

### 6. `spot-post-shoot` — triggers when appointment ends
**Trigger:** Appointment ended
**Steps:**
- Send "How was it?" + Google review request
- Wait 7 days, if no upsell tag yet, send: "Want to save 80%? Check out memberships."

---

## Webhook payload reference (for building workflow conditions)

When a payment succeeds, the webhook applies these tags to the GHL contact:

| Stripe metadata | Tags applied |
|---|---|
| `tier=creator-lite` | `vertical:studio`, `studio:member`, `studio:tier-creator-lite` |
| `tier=creator` | `vertical:studio`, `studio:member`, `studio:tier-creator` |
| `tier=pro` | `vertical:studio`, `studio:member`, `studio:tier-pro` |
| `product=podcast-1hr` | `vertical:studio`, `studio:booking`, `studio:podcast-1hr` |
| `product=podcast-2hr` | `vertical:studio`, `studio:booking`, `studio:podcast-2hr` |
| `product=podcast-half-day` | `vertical:studio`, `studio:booking`, `studio:podcast-half` |
| `product=alternate-set` | `vertical:studio`, `studio:booking`, `studio:alternate-set` |
| `product=multi-set-day` | `vertical:studio`, `studio:booking`, `studio:multi-set-day` |
| (no metadata) | `vertical:studio`, `studio:other` (catch-all) |

Customer email + name + phone (if collected at checkout) are upserted via `POST /contacts/upsert`. Existing contacts are updated; new contacts are created.

---

## Verification checklist

Once env vars are set + webhook is configured + workflows built:

1. **Test end-to-end with a real payment** (use a test Stripe Payment Link, OR refund yourself after)
2. Confirm:
   - [ ] Stripe sends built-in receipt email
   - [ ] Webhook returns HTTP 200 (Vercel logs / Stripe dashboard webhook logs)
   - [ ] GHL contact created or updated with the right tags
   - [ ] Workflow fires and confirmation email arrives
3. **Then:** for each product/tier, run a sample payment to confirm the right workflow triggers

---

## Status (2026-04-20)

- ✅ Webhook route built (`src/app/api/stripe/webhook/route.ts`)
- ✅ GHL bridge helper built (`src/lib/ghl.ts`)
- ✅ Post-payment thank-you UI on `/studio?paid=...` and `?subscribed=...`
- ✅ All 4 env vars set in Vercel (production + development): `STRIPE_SECRET_KEY` (copied from studioai project), `STRIPE_WEBHOOK_SECRET`, `GHL_API_TOKEN`, `GHL_LOCATION_ID`
- ✅ Stripe webhook endpoint created via API — `we_1TOIvtH4bUQUJwBsIVwef1lC`, listening for `checkout.session.completed`, signing secret captured and stored in Vercel
- ✅ Production redeployed with new env vars
- ✅ Webhook verified (405 to GET, 400 to unsigned POST)
- ✅ **6 branded HTML email templates created in GHL** (dark theme, crimson accents, responsive, merge-tags wired):

  | # | Template | GHL Template ID |
  |---|---|---|
  | 1 | AB · Studio — Membership Welcome | `69e64018e5d1f80ec7255297` |
  | 2 | AB · Studio — Booking Confirmation (Pay First) | `69e6403673be3901eefae5bb` |
  | 3 | AB · Studio — Day-Before Reminder | `69e640489fa06c1c17d2e49e` |
  | 4 | AB · Studio — Post-Shoot Follow-Up | `69e64058ba2aaa590cc37195` |
  | 5 | AB · Studio — Credit Redemption Details | `69e6406bb81c38b59ea9a57d` |
  | 6 | AB · Studio — Scheduling Link After Payment | `69e6407db9bf9139fd4ad9e5` |

- ✅ **Webhook auto-enrolls contacts in existing GHL workflows**:

  | Purchase metadata | Enrolls in workflow | Workflow ID |
  |---|---|---|
  | `tier=creator-lite` | Assign Credits Creator Lite | `8185e8b3-b5a8-4501-a0b7-a3ca5f15dcff` |
  | `tier=creator` | Assign Credits Creator | `f30f7796-155a-4667-88e6-34e471bcffa5` |
  | `tier=pro` | Assign Credits Pro | `bf3324aa-5189-4a1e-82db-fbef73da39e9` |
  | Any one-time `product=*` | Aryeo → New Booking (shared booking flow) | `5a1c01c0-8380-4790-8a3c-e405ac503a87` |

## Final manual step — publish the workflows

All 4 workflows above are currently in **draft** status in GHL. Enrollment succeeds but no email sends until the workflow is published. In GHL UI:

1. Open each workflow
2. Wire the email steps to use the templates from the table above (match by name: Welcome → template 1, Booking Confirmation → template 2, etc.)
3. Toggle status to **Published**
4. Test with a live payment

Suggested mapping (workflow step → template):

**Assign Credits {tier} workflows** (Creator Lite / Creator / Pro):
- Step 1 (immediate): Send template `AB · Studio — Membership Welcome`
- Step 2 (wait 5 min, then send): `AB · Studio — Credit Redemption Details`
- Step 3 (update contact custom values: `membership_tier`, `monthly_credits`, `renewal_date`)

**Aryeo → New Booking** (repurposed for Spot one-time bookings):
- Step 1 (immediate): Send template `AB · Studio — Booking Confirmation (Pay First)`
- Step 2 (wait 5 min): Send template `AB · Studio — Scheduling Link After Payment`
- Step 3 (when appointment scheduled / 24hr before): Send `AB · Studio — Day-Before Reminder` (GHL appointment trigger)
- Step 4 (when appointment ends / 1hr after): Send `AB · Studio — Post-Shoot Follow-Up`
