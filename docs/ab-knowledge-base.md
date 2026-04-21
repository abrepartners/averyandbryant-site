# Avery & Bryant — Knowledge Base

**Source of truth for AI agents (GHL chatbot / Voice AI / StudioAI
support) and for Jarvis.** This doc is the one place we write down
"what A&B does, how it works, what to say." Sync changes here first,
then feed into the GHL knowledge base and any AI prompt contexts.

**How to use this:**
- New info we want any agent to know → add to the right section below
- Info that should feed the GHL AI chatbot → copy the section into
  GHL → Conversations → AI Agent → Knowledge Base
- Policies that change (weather, reschedule, etc.) → edit once here,
  update everywhere else

**Last touched:** 2026-04-21 · Owner: Thomas / Jarvis

---

## 1) The Basics

- **Business Name:** Avery & Bryant
- **Primary Email:** book@averyandbryant.com
- **Phone:** (501) 502-2925
- **Address:** 12521 Kanis Rd, Little Rock, AR 72211
- **Website:** averyandbryant.com
- **Service Area:** All of Arkansas (Little Rock metro, NWA, Central AR,
  Hot Springs, Conway, Benton primary). Travel fees may apply beyond
  a 45-mile radius from Little Rock.
- **Founded:** 2018
- **Studios (The Spot):** Same address. Multi-room creative studio for
  podcasts, brand shoots, and video production.

**Hours:**
- TODO — fill in exact business hours
- TODO — studio (The Spot) booking hours

---

## 2) What We Do (Services)

Two parent businesses, one ownership:

### A) Real Estate Media (flagship)
HDR photography, cinematic video, drone aerials, 3D virtual tours,
floor plans, virtual staging, reels. Seven verticals:

- **Real Estate** (primary residential listings)
- **Airbnb / Short-Term Rentals**
- **Multi-Family & Apartment Communities**
- **Commercial** (dealerships, offices, retail, hospitality, industrial)
- **Lot & Land** (aerial-focused)
- **Builders & Construction** (progress programs + model homes)
- **Agent Branding** (headshots, brand content, content days)

Each vertical has its own pricing matrix — see [may-1-pricing-update.md](./may-1-pricing-update.md).

### B) The Spot (creative studios)
Multi-room rental studio at 12521 Kanis Rd:
- Podcast Room ($85/hr, flagship)
- Set A (Black Room), Set B (Neutral Room), Intimate Set — all $150/hr
- Garage — $150/hr
- Multi-Set Day Pass — $1,495

Memberships: Creator Lite ($60/mo), Creator ($100/mo), Pro ($180/mo) —
tiered 10-30% discount on studio time + add-on credits.

### C) Products (AI tools)
- **StudioAI** — AI virtual staging for real estate listings. Free trial, then paid plans.
- **Answr** — AI voice agent for inbound calls (concierge / appointment setting).

---

## 3) How Booking Works

- **Real estate media bookings** → Aryeo order forms (homes.averyandbryant.com)
- **Studio bookings** → Pay-first flow: Stripe Payment Link → email
  with personalized calendar link → pick time slot
- **Free consultations** → GHL calendar widget at
  `api.leadconnectorhq.com/widget/booking/FYjHtkIcX1ebCSfCxQVc`

Standard turnaround: 24 hours for real estate photos, 48 hours for
branding, 72 hours for commercial.

---

## 4) Pricing Summary (as of May 1, 2026)

See [may-1-pricing-update.md](./may-1-pricing-update.md) for the full
price sheet. Key reference points for agents:

- Real Estate starts at $249 (BASE · small listing)
- Most popular package: Real Estate PRO at $395
- Drone is included in most packages; standalone drone is $149
- Virtual staging $49/image, virtual twilight $49/image
- Rush delivery 6hr +$100

---

## 5) Common FAQs

### Q: Do you do drone photography as a standalone service?
A: Yes. Drone photos + video is $149 as a standalone, or included with
PRO and PRO+ real estate packages. All pilots are FAA Part 107 certified
with commercial insurance.

### Q: What's your weather policy?
A: TODO — migrate from old Squarespace /implement-weather-policy page.
Basic framework:
- We monitor the forecast the evening before every shoot
- If conditions are unsafe for drones or produce unusable stills, we
  proactively reschedule at no charge
- Light rain / overcast interior shoots still go forward
- Reschedules due to weather don't count against any prepaid bookings
- TODO: specific wind/rain thresholds for drone flight

### Q: Can I get agent branding photos done at your studio?
A: Yes. Agent branding (headshots, lifestyle content, content days)
can be done at The Spot studios or on-location. See /branding for
packages. Typical agent branding session uses Set A (Black Room) or
Set B (Neutral Room).

### Q: I booked a shoot — what do I need to do to prepare?
A: TODO — pre-shoot prep checklist:
- Access (key code / lockbox / meet-on-site)
- Staging done before we arrive
- Lights on, blinds open
- Any vehicles out of the driveway (unless they're props)
- TODO: expand into a real checklist

### Q: What areas do you serve?
A: All of Arkansas. Primary markets: Little Rock, Benton, Conway,
Hot Springs, Bentonville/Fayetteville (NWA). Travel fees beyond 45
miles from Little Rock — typically $1/mile one-way.

### Q: How do I become a Spot studio member?
A: Pick a tier on /studio (Creator Lite / Creator / Pro), check out
via Stripe, and your member discount applies at checkout on future
studio bookings. Add-on credits reset monthly on your billing date.

### Q: How do I refer someone?
A: See /referral. Current program: you get a credit toward your next
A&B order when a referral converts. Track referrals via GHL contact
custom field `contact.referral_source` / `contact.referral_name`.

---

## 6) Policies (agent-facing)

### Reschedule / cancellation
- TODO: fill in exact terms
- Weather reschedules: free (see weather policy above)
- Customer-initiated reschedules within 24 hours of shoot: TODO (fee?)
- No-call-no-show: TODO

### Payment
- Real estate media: invoiced via Aryeo after delivery, typical net-7
- Studio rental: pay-first via Stripe (checkout before slot is held)
- Memberships: monthly subscription via Stripe, cancel anytime

### Delivery & revisions
- Photos: 24 hours standard, 6hr rush +$100
- Video: 72 hours standard
- Revisions: one round of photo revisions included; additional rounds $X — TODO
- Rejected shots / reshoots: handled case-by-case; weather-related
  reshoots are free

---

## 7) Internal Tools Agents Should Know

When someone asks about logistics, these are the links / tools:

- **Live schedule of shoots:** Aryeo dashboard (homes.averyandbryant.com)
- **Client portal for media delivery:** homes.averyandbryant.com/portal
- **Member account / billing:** /members
- **Studio booking:** /studio (routes through Stripe Payment Links)
- **Frame.io:** used for video review rounds — clients get a share link
  via email after their video shoot delivers

---

## 8) Tone + Style (for AI agents replying on our behalf)

- Direct, plain, no marketing fluff
- Never guess on pricing — if unsure, offer a free 30-min consult
- Always spell out the service area if asked (Arkansas, statewide)
- For technical questions (drone specs, file formats), route to Thomas
- Sign off: "— Avery & Bryant" not "— The A&B Team"

---

## 9) URL Migrations / Redirects

Old Squarespace URLs and where they should go on the new site once DNS
flips. Keep this current so GHL's knowledge base crawler re-indexes
correctly:

| Old URL | New URL |
|---|---|
| /home-nwa | / (serve statewide) |
| /home-ca | / |
| /implement-weather-policy | /#weather-policy (FAQ section, this doc) |
| /drone-photos | /real-estate |
| /book-services | /book |
| /book-services-1 | /book |
| /Gallery | /gallery |
| /services-pricing | / (packages on each vertical) |
| /branding | /branding (unchanged) |
| /agent-branding-faq | /branding#faq |

---

## 10) TODOs

Things to fill in as A&B answers come back:

- [ ] Business hours (office + studio)
- [ ] Weather policy specifics (wind/rain thresholds)
- [ ] Cancellation + reschedule fees
- [ ] Pre-shoot prep checklist
- [ ] Revisions included / additional round cost
- [ ] Travel fee formula (exact $/mile, free radius)
- [ ] Migrate /agent-branding-faq Squarespace content into section 5
- [ ] Hours of operation per day of week
- [ ] Team bios (Thomas, Jarvis, any shooters/editors)
- [ ] Partnership info (brokerages with bulk agreements)
