# The Spot — GHL Calendars + Stripe Setup Brief

> **Status (2026-04-20): Mostly built. Calendars + Stripe prices created via API.**
> Remaining manual step: wire each calendar to its Stripe price in the GHL UI
> (calendar → Payments → Connect Price), then flip `isActive: true`.

## As-built — IDs

**GHL calendars** (location `iXhH37718q9nZnf4tkgF`, group `QSFoMT6VOSNZ288RBDz2 — The Spot — Studio Bookings`)

| Calendar | GHL ID | Slot | Stripe Price | Amount |
|---|---|---|---|---|
| Podcast Room (1 Hour) | `7ITuyoouCVIHPpd9g7BX` | 60 min | `price_1TOIOdH4bUQUJwBsF0RHvvis` | $85.00 |
| Podcast Room (2 Hour) | `9g4b8uFBR4KmJNWJwv9a` | 120 min | `price_1TOIOlH4bUQUJwBsXsxqCtN9` | $170.00 |
| Podcast Room (Half Day · 4hr) | `J0gqnGTQFA8eD4EoFHwl` | 240 min | `price_1TOIOmH4bUQUJwBsPS589uzc` | $340.00 |
| Alternate Set (1 Hour) | `gZIylqnwF2olLvPrqWqR` | 60 min | `price_1TOIOoH4bUQUJwBsJkWbIvyh` | $150.00 |
| The Garage (1 Hour) | `FVDXuUTLJLD4XKm6lPOp` | 60 min | `price_1TOIOoH4bUQUJwBsJkWbIvyh` | $150.00 (shared) |
| Multi-Set Day Pass | `oaOY7LqfIC87tAy881wE` | 480 min | `price_1TOIOpH4bUQUJwBsZxL2R8ja` | $1,495.00 |

All on the existing **Studio Rental (Hourly Rate)** product (`prod_TcjjVan3Yxljir`).

**Stripe add-on prices** (separate products):

| Add-on | Stripe Price | Product |
|---|---|---|
| Audio Production (per hour) — $40 | `price_1TOIOqH4bUQUJwBsrMmr5ZTx` | `prod_Tci8eyz1n5StQV` Podcast Recording \| Audio Only |
| Engineer Assist (per hour) — $40 | `price_1TOIOrH4bUQUJwBszxlT4e5m` | `prod_TgekiAJu35q5lG` Engineer Assist |
| Equipment Access (per hour) — $25 | `price_1TOIOtH4bUQUJwBsnf9Di3HN` | `prod_TgekKupcsOrhRA` Equipment Access |
| Extra 30 Minutes — $50 | `price_1TOIOuH4bUQUJwBsXQ5rNS3r` | `prod_TgejObY5dz9oj1` Extra 30 Minutes |

**Memberships** (already live, untouched):

| Tier | Stripe Product | Stripe Price | Monthly | Credits |
|---|---|---|---|---|
| Pro | `prod_Tgf4A4MsIgoTFL` | `price_1SjHjtH4bUQUJwBsHzwvW2EF` | $180/mo | 16 |
| Creator | `prod_Tgeu4MtyhEOLrZ` | `price_1SjHaHH4bUQUJwBsHiFZ2xnF` | $100/mo | 8 |
| Creator Lite | `prod_TgerQQpsz2ZJZ0` | `price_1SjHXuH4bUQUJwBsAkdakXgS` | $60/mo | 4 |

## Credit model

**1 credit = 1 hour** of any:
- Single-set studio time (Podcast Room, Set A/B, Intimate Set, Garage)
- Engineer assist
- Audio production
- Round of basic edits
- Equipment access

Half-credits available (Extra 30 Min = 0.5 credits). Multi-set day pass = 8 credits.

**Pricing arithmetic:**
- Pro: $180/mo ÷ 16 = $11.25/credit (84% off non-member $85 rate)
- Creator: $100/mo ÷ 8 = $12.50/credit (82% off)
- Creator Lite: $60/mo ÷ 4 = $15/credit (76% off)

## Stripe Payment Links (live, customer-clickable)

Created 2026-04-20. All on the `pay.averyandbryant.com` custom domain.

| What | Link | Stripe Plink ID |
|---|---|---|
| Membership · Creator Lite ($60/mo) | https://pay.averyandbryant.com/b/5kQ00jgLK5fGdlNd1QbjW0j | `plink_1TOIZVH4bUQUJwBsVyNa3EKK` |
| Membership · Creator ($100/mo) | https://pay.averyandbryant.com/b/dRmdR9dzyaA02H94vkbjW0k | `plink_1TOIZWH4bUQUJwBsMjg6Amnk` |
| Membership · Pro ($180/mo) | https://pay.averyandbryant.com/b/3cI6oHbrq5fGchJbXMbjW0l | `plink_1TOIZYH4bUQUJwBsPnbjPZ87` |
| Podcast Room · 1hr ($85) | https://pay.averyandbryant.com/b/dRmbJ1brq0Zq6Xp8LAbjW0m | `plink_1TOIZaH4bUQUJwBsRRpAzgpU` |
| Podcast Room · 2hr ($170) | https://pay.averyandbryant.com/b/6oUaEX5326jKepRbXMbjW0n | `plink_1TOIZcH4bUQUJwBs07J29qfN` |
| Podcast Room · Half Day ($340) | https://pay.averyandbryant.com/b/6oUaEX7ba37ydlN6DsbjW0o | `plink_1TOIZdH4bUQUJwBssYjvpHWH` |
| Alternate Set · 1hr ($150) | https://pay.averyandbryant.com/b/fZu9AT8fe6jK95xf9YbjW0p | `plink_1TOIZfH4bUQUJwBsspXstSfq` |
| Multi-Set Day Pass ($1,495) | https://pay.averyandbryant.com/b/aFa7sL8fe0ZqbdF8LAbjW0q | `plink_1TOIZhH4bUQUJwBsCjRdnUH4` |

After payment, customers redirect to `averyandbryant.com/studio?paid=<sku>` (or `?subscribed=<tier>` for memberships) — useful for analytics events / GTM tracking.

## Remaining manual steps

1. **Hook up GHL calendar payment integration** (GHL UI → each calendar → Payments → connect Stripe price). This is for the calendar-widget-direct-charge flow. Currently the studio page links to Stripe Payment Links instead, which works without this step — but if you want the calendar widget itself to charge on slot booking, do this.
2. **Activate the 6 calendars** (set `isActive: true`) once you've decided whether to use direct payment links (current setup, no calendar-payment integration needed) OR calendar widgets with embedded payment.
3. **(Optional) Build credit-redemption flow** — how members actually consume their monthly credits. Simplest path: create one-time-use Stripe coupon codes per credit value, distribute to active subscribers via GHL workflow when they sign up. **Out of scope for initial launch — members can pay full price and get reimbursed manually for now.**

---

(Original spec follows for reference.)

---

Hand to an admin or AI agent to set up the booking infrastructure for **The Spot Creative Studios**: 6 GHL service-booking calendars, each integrated with a Stripe product/price for direct in-calendar payment.

Pairs with `docs/aryeo-manual-creation-brief.md` and `docs/ghl-manual-setup-brief.md` — same execution pattern, different system.

---

## Context

The Spot is A&B's multi-room creative studio in Little Rock. Customers can discover it via Peerspace (existing channel) **or** book directly via the A&B website using GHL calendars with Stripe payment built in.

Why both Peerspace AND direct GHL bookings:
- **Peerspace** = top-of-funnel discovery (new customers find via marketplace)
- **GHL direct** = repeat customers, multi-set days, and lower-fee bookings (no Peerspace markup)
- **GHL multi-set day pass** = something Peerspace's single-room model can't represent cleanly

The studio page (`/studio`) currently CTAs to Peerspace. Once these calendars exist, we'll add a "Book Direct" secondary CTA on each room card that points to the calendar widget.

---

## Pre-requisites

1. **GHL admin access** to sub-account `iXhH37718q9nZnf4tkgF` (the A&B location)
2. **Stripe account** connected to GHL — verify under Settings → Payments → Integrations. If Stripe isn't connected, do that first (Settings → Payments → Connect Stripe).
3. **Stripe access** with permission to create Products + Prices (claude.ai Stripe MCP token currently expired — re-auth via the integration settings before running Stripe steps)

---

## Architecture

```
Customer visits averyandbryant.com/studio
        │
        ▼
Picks a room → clicks "Book Direct"
        │
        ▼
GHL calendar widget loads (per-room)
        │
        ▼
Customer picks date+time, fills contact info
        │
        ▼
Stripe checkout (in-calendar) charges the room rate
        │
        ▼
GHL creates appointment + contact record
        │
        ▼
Workflow fires: confirmation email/SMS,
               apply tags (vertical:studio, service:room-name),
               add to "Studio Bookings" pipeline (create if needed)
        │
        ▼
Day-before reminder, post-shoot follow-up
```

---

## Step 1 — Stripe Products + Prices

Create in Stripe (via dashboard or API, once re-authed). Each maps to one GHL calendar.

For each: Product name, then a Price object attached to it.

| # | Product Name | Price (USD) | Type | Notes |
| --- | --- | --- | --- | --- |
| 1 | The Spot — Podcast Room (1 Hour) | $85.00 | one-time | Base rate, midpoint of Peerspace $75-$95 range |
| 2 | The Spot — Podcast Room (2 Hour) | $170.00 | one-time | 2x hourly, no discount |
| 3 | The Spot — Podcast Room (Half Day · 4hr) | $340.00 | one-time | 4 hr block, no discount |
| 4 | The Spot — Alternate Set (1 Hour) | $150.00 | one-time | For Set A, Set B, or Intimate Set |
| 5 | The Spot — Garage (1 Hour) | $150.00 | one-time | Same as alternate set, separate SKU for tracking |
| 6 | The Spot — Multi-Set Day Pass | $1,495.00 | one-time | 8-hour block, all rooms |
| 7 | The Spot — Audio Production Add-On (1 Hour) | $40.00 | one-time | Add-on, paid at booking |
| 8 | The Spot — Full Video Production (1 Hour) | $150.00 | one-time | Add-on, paid at booking |

**Stripe metadata to apply on each Product** (so we can reconcile in reports later):
- `vertical`: `studio`
- `room`: e.g. `podcast-room`, `set-a`, `garage`, `multi-set`, `add-on`
- `unit`: `hour` or `block` or `day`

**Save the Price IDs** (e.g. `price_xxx`) — you'll plug them into the GHL calendar payment config in Step 2.

---

## Step 2 — Create GHL Calendars

Navigate to: **Calendars → Create Calendar** in GHL.

For each calendar below, select **Service Booking Calendar** type. Common settings unless noted:

- **Group:** Create a new group "The Spot — Studio Bookings" first; assign every calendar to it.
- **Team Members:** assign Thomas (or a "Studio" team member if there is one)
- **Event color:** `#C41230` (crimson) for podcast room calendars; `#F59E0B` (amber) for alternate sets; `#0EA5E9` (sky) for garage; `#A855F7` (purple) for multi-set day
- **Slot interval:** 30 min (lets bookings stack on the half-hour)
- **Slot buffer:** 15 min (cleanup time between bookings)
- **Pre-buffer:** 0 min
- **Allow booking after:** 4 hours from now
- **Allow booking for:** 60 days out
- **Open hours:**
  - Mon-Fri: 9:00 AM – 5:30 PM
  - Sat-Sun: 7:00 AM – 8:00 PM
- **Auto-confirm:** Yes
- **Allow reschedule:** Yes
- **Allow cancellation:** Yes (with policy: full refund 24hr+, 50% refund 24hr-2hr, no refund <2hr)
- **Stripe payment:** Required at booking — link to the corresponding Stripe Price ID from Step 1

### Calendar list

| # | Calendar Name | Slot Duration | Stripe Price | Description |
| --- | --- | --- | --- | --- |
| 1 | The Spot — Podcast Room (1 Hour) | 60 min | Price #1 | Solo podcast or short interview |
| 2 | The Spot — Podcast Room (2 Hour) | 120 min | Price #2 | Standard podcast episode block |
| 3 | The Spot — Podcast Room (Half Day) | 240 min | Price #3 | Multiple-episode batch recording |
| 4 | The Spot — Alternate Set (1 Hour) | 60 min | Price #4 | Set A, Set B, or Intimate Set — collect choice on form |
| 5 | The Spot — The Garage (1 Hour) | 60 min | Price #5 | Vehicle / industrial / fashion shoots |
| 6 | The Spot — Multi-Set Day Pass | 480 min | Price #6 | Full 8-hour day, all rooms unlocked |

**Pre-booking form fields to add** (universal to all 6 calendars):
- Standard contact fields (name, email, phone)
- Custom field: `Project Type` (Single Options: Podcast, Video, Photoshoot, Interview, Music Video, Vehicle Shoot, Other)
- Custom field: `Number of People` (Numerical)
- Custom field: `Equipment You're Bringing` (Large Text)
- Custom field: `Production Add-On` (Single Options: None, Audio Production, Full Video Production) — if not None, also charge the add-on Stripe price
- Custom field: `Set Selection` (Single Options: Set A, Set B, Intimate Set) — only on Calendar #4 ("Alternate Set")

These custom fields don't yet exist in GHL — see `docs/ghl-manual-setup-brief.md` for how to create them. Add to that brief if not already there.

### Notes (booking confirmation message)

Customize the booking notes per calendar. Example for Podcast Room:

```
Phone: {{contact.phone}}
Email: {{contact.email}}

You're booked for The Podcast Room at The Spot.

Address: 12521 Kanis Rd, Little Rock, AR 72211
Arrival: Please arrive 5 minutes early. Door access details will arrive
24 hours before your booking.

Equipment: Pre-configured lighting and seating included. Bring your own
mics, cameras, or use our Audio Production add-on.

Need to make a change?
Reschedule: {{reschedule_link}}
Cancel: {{cancellation_link}}
```

---

## Step 3 — Workflows (verify or build)

Workflows that should fire on Spot calendar bookings. Build in GHL UI (workflow creation is UI-only).

1. **`spot-booking-created`** — trigger: appointment created on any "The Spot —" calendar
   - Apply tags: `vertical:studio`, `service:room-rental`, room-specific (`spot:podcast-room`, `spot:set-a`, etc.)
   - Send confirmation SMS + email
   - Add to opportunity in pipeline (see Step 4)

2. **`spot-day-before`** — trigger: 24hr before appointment time
   - Send reminder SMS with door access code, arrival info, parking
   - Include cancellation/reschedule links

3. **`spot-post-shoot`** — trigger: appointment ended (auto-fires when slot end time passes)
   - Send "How was it?" follow-up + Google review request
   - If repeat customer (Aryeo Order Count ≥ 1 OR booking count ≥ 2): trigger upsell — multi-set day pass or content retainer

4. **`spot-multi-set-handoff`** — trigger: Multi-Set Day Pass booked
   - Notify Thomas (internal SMS) for prep coordination
   - Send customer a "what to plan" prep email with the floor plan attached

---

## Step 4 — Pipeline (create new)

Add a new pipeline in GHL for tracking Spot bookings (separate from existing media pipelines):

**Name:** `6. Studio Bookings (The Spot)`

**Stages:**
1. Booked (auto-entry on appointment creation)
2. Day Of
3. Completed
4. Reviewed (review left or skipped at T+7 days)
5. Repeat / Upsell (manual move when retainer or multi-set conversation starts)

**Note:** GHL pipelines are created in UI — see Settings → Pipelines → New Pipeline.

---

## Step 5 — Verification

After creation:

1. **Test booking** — book a slot on each calendar with a test email/phone. Verify Stripe charges (use Stripe test mode if available; otherwise refund the test).
2. **Check Stripe** — confirm each booking creates a Charge with the right Product reference + metadata.
3. **Check GHL** — confirm contact + appointment + opportunity were created. Tags applied correctly.
4. **Check workflows fired** — confirmation messages sent.
5. **Cancel test bookings** — clean up the calendar before going live.

---

## Step 6 — Wire to the Site

Once calendars exist, share the calendar widget URLs (each calendar has a public booking URL — find under the calendar's "Share" or "Embed" section in GHL).

The studio page at `/studio` currently CTAs to Peerspace. After calendars are live, we'll add per-room "Book Direct" links pointing to the calendar widget URLs. Tell the developer to update `src/app/studio/page.tsx` rooms array with these URLs and a `bookDirectUrl` field per room.

---

## Guardrails (DO NOT DO)

- Do not modify any existing GHL calendar (especially "Stealing from Friends — Podcast Guest Booking" — that's the active podcast guest calendar)
- Do not touch the existing pipelines (Sales, Listing Media, One-Off Fulfillment, Recurring, ALYT/SaaS)
- Do not delete any existing tags — `repeat-client`, `aryeo-client`, etc.
- Do not enable booking on any calendar before the test booking succeeds end-to-end with Stripe

---

## Completion Signal

When done, report:

1. **Stripe products created:** 8 with their Product IDs and Price IDs
2. **GHL calendars created:** 6 with their IDs and public booking URLs
3. **Pipeline created:** "6. Studio Bookings (The Spot)" with its ID
4. **Workflows created:** 4 with their IDs (or notes on which already existed)
5. **Test booking results:** screenshot of Stripe charge, GHL appointment, and workflow execution
6. **Timestamp** of completion

The developer will then wire the booking URLs into the `/studio` page as a separate task.
