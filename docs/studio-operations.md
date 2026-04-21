# The Spot — Studio Operations

Physical + booking operations for Avery & Bryant's multi-room studio.
If Jarvis or a new studio host takes over, this is the doc they work
from.

**Location:** 12521 Kanis Rd, Little Rock, AR 72211
**Peerspace listing:** https://www.peerspace.com/pages/listings/673a4251deb5e4e5704eb25b
**Direct booking URL:** https://averyandbryant.com/studio

---

## 1) Physical Access

- **Address:** 12521 Kanis Rd, Little Rock, AR 72211
- **Parking:** TODO — on-site / street / lot details + guest count supported
- **Key code / lockbox:** TODO — how clients get in (code vs. host meets them)
- **Hours available for booking:** TODO — earliest / latest slots
- **After-hours / overnight:** TODO — allowed? Extra fee? Security?

---

## 2) Rooms

| Room | Slug | Size | Best For | Stripe product |
|---|---|---|---|---|
| The Podcast Room | `podcast-room` | 400 sqft · flagship | Video podcasts, talking-head, branded interviews | 1hr/$85 · 2hr/$170 · 4hr/$340 |
| Set A · The Black Room | `set-a` | ~150 sqft (13'3" × 11'2") | Lifestyle, brand content, product photography | $150/hr |
| Set B · The Neutral Room | `set-b` | ~135 sqft (11'9" × 11'5") | Editorial, fashion, headshot variation | $150/hr |
| Intimate Set | `intimate` | ~75 sqft (7'3" × 10'6") | Solo headshots, 1-on-1 interviews | $150/hr |
| The Garage | `garage` | ~245 sqft (14'5" × 17') | Vehicle shoots, industrial, music video, fashion editorial | $150/hr |
| Multi-Set Day Pass | — | All rooms, 8hr | Full-day production | $1,495 |

### What's included in every room rental
- TODO — confirm per-room: basic lighting kit, seamless paper, backdrops available, tripod/C-stands, power outlets count, WiFi
- TODO — any equipment that's rental-only vs. included

### Equipment inventory
TODO — master list of what's on-site:
- [ ] Cameras (if any A&B gear stays on-premises)
- [ ] Lights (Aputure / Godox / etc — model numbers + quantity)
- [ ] Audio (SM7B mics, Rodecaster, boom mics, lavs)
- [ ] Backdrops (colors, materials)
- [ ] Monitors / playback displays
- [ ] Seating / furniture (podcast chairs, stools, sofa)
- [ ] Kitchen / green room amenities

---

## 3) Booking Flow

### Pay-first flow (via site)
1. Customer clicks "Reserve & pay" on /studio for their room of choice
2. Stripe Payment Link → checkout (Stripe-hosted)
3. On payment success, webhook at `/api/stripe/webhook` fires:
   - Upserts GHL contact (email, name, phone, studio tags)
   - Sets `contact.studio_schedule_url` to the matching room's calendar widget URL
   - Enrolls in the "Aryeo → New Booking" workflow
4. Workflow sends "Payment received — pick your time slot" email
5. Customer clicks the CTA (which pulls their personalized calendar URL)
6. GHL calendar widget → pick slot → appointment created
7. Day-before reminder + post-shoot follow-up emails auto-fire from workflow

See [webhook-flow.md](./webhook-flow.md) for the full technical trace.

### Peerspace bookings
- Peerspace hosts the Podcast Room (flagship) — it's a separate
  discovery / booking channel
- We honor Peerspace bookings like any other, but the Peerspace
  commission (20-35% depending on tier) means member pricing doesn't apply
- Peerspace bookings land in our email, not GHL — TODO: decide if we
  want to manually create the GHL contact or let them stay in Peerspace only

### Memberships
- Creator Lite / Creator / Pro tiers at $60 / $100 / $180 per month
- Stripe subscriptions on pay.averyandbryant.com
- Member discount applies automatically at checkout on studio rental
  Payment Links (10% / 20% / 30% respectively)
- Add-on credits reset monthly on billing date
- Add-ons that consume credits: edits, engineer assist, equipment access,
  extra 30-min blocks, rush delivery

---

## 4) Client Experience

### Before they arrive
- TODO — what do they get in the "day-before" email? (access info,
  parking, what to bring, house rules)
- TODO — who does A&B send to — a host to greet them, or self-access?

### On arrival
- TODO — who lets them in
- TODO — where they park, unload, bring gear
- TODO — orientation / safety walkthrough? (emergency exit, restroom,
  fire extinguisher)

### During the shoot
- TODO — self-serve or hosted? Is Thomas/A&B onsite for every booking?
- TODO — tech support: who helps if a light doesn't work

### After
- TODO — cleanup expectations
- TODO — post-shoot email (currently handled by the "AB · Studio —
  Post-Shoot Follow-Up" template)

---

## 5) Policies

### Cancellation / Reschedule
- TODO — full policy (current: "Flexible cancellation on every booking"
  as marketed — what does that mean exactly?)
- Inside 24 hours: TODO
- Inside 4 hours: TODO
- No-call-no-show: TODO

### Damage / Missing Equipment
- TODO — deposit required? Credit card hold?
- TODO — who signs off before they leave

### Minors / Pets
- TODO — allowed? Liability?

### Overtime
- TODO — how is it handled if a booking runs over? Billed at the same
  hourly rate? Flat fee?

---

## 6) Add-On Services

Live on /studio pricing cards — these are the extras that credits can
be redeemed against:

- Audio Podcast Production — +$40/hr
- Video Podcast Production — +$X/hr — TODO fill in
- Engineer Assist — $X/hr — TODO
- Equipment Access (lighting kit / mic upgrade / etc.) — $X — TODO
- Extra 30-min Block — $X — TODO
- Rush Delivery (6-hour turnaround on recorded footage) — +$100

## 7) Member Redemption

When a Pro-tier member wants to redeem credits toward add-ons:
1. They email book@averyandbryant.com (currently manual until automated)
2. Thomas confirms credit balance, applies discount, sends updated invoice
3. Tracked via TODO — where are member credit balances stored? Custom
   field? Spreadsheet? GHL contact note?

> This is a current manual gap. Automation is a later phase.

---

## 8) External Integrations

- **Peerspace** — listing management at peerspace.com/host; payouts monthly
- **Stripe Dashboard** — pay.averyandbryant.com for bookings; billing.stripe.com
  for member subscriptions
- **GHL** — studio contact management; email workflows;
  `contact.studio_schedule_url` custom field for per-room calendar routing
- **Google Calendar** — TODO — are studio bookings mirrored to a
  shared Google Calendar? If not, consider it for at-a-glance daily view

---

## 9) Routine Checks

Daily:
- [ ] TODO — physical walk-through before first booking
- [ ] TODO — check Stripe dashboard for new bookings that need handoff
- [ ] TODO — clear previous day's trash / reset rooms

Weekly:
- [ ] Peerspace inquiries response time audit
- [ ] Check GHL for any pending Studio Schedule URL contacts that haven't
  booked a slot yet (they paid but didn't pick a time — follow up)
- [ ] Add-on credit reconciliation for any Pro members

Monthly:
- [ ] Member subscriber count + churn review in Stripe
- [ ] Peerspace payout reconciliation
- [ ] Equipment inventory check / restock

---

## 10) TODOs (operational gaps)

- [ ] Fill in all TODOs above as answers come from Thomas
- [ ] Photograph the actual equipment inventory + write an up-to-date
  list clients can request specifically at booking
- [ ] Decide whether to mirror studio bookings to a shared Google
  Calendar for team visibility
- [ ] Consider a short "What's included" per-room page linked from the
  /studio cards
- [ ] Build member-credit tracking automation (currently manual email
  workflow — see section 7)
