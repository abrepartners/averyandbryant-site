# Site Asset Checklist

Everything currently on the live site that's a **placeholder** and what to swap it with. Drop assets into `/public/images/` matching the suggested filename, then tell me they're in (or I'll grab them). Specs are minimums — bigger is fine, smaller will pixelate.

**Conventions**
- Videos: MP4 (H.264), no audio, ≤8MB if possible (Vercel will serve from edge), under 15 sec loop
- Images: JPG for photos, optimized (≤500KB ideal). Next/Image handles the rest
- Replace the file at the path listed and you're done — no code change needed

---

## 0 · Global / Site-Wide

### Logos & brand
- [ ] **Square 1080 logo** — `/public/images/logo-square.png` (1080×1080, transparent PNG)
- [ ] **Header logo** — `/public/images/logo-header.png` (≥800px wide, transparent PNG)
- [ ] **Favicon source** — `/public/favicon.ico` *(currently default Next.js — needs A&B mark)*
- *Source: `~/Library/CloudStorage/Dropbox-NuElementsMedia/Thomas Brown/website stuff/Avery & Bryant Logos/`*

### Brokerage strip on home page
Currently text-only ("Coldwell Banker · Century 21 · Keller Williams · Crye-Leike · Engel & Völkers"). If you want logo strip instead:
- [ ] 5 monochrome PNG logos at `/public/images/brokerages/{name}.png`, ~200px wide each, transparent

### Google reviews integration
- [ ] **Google Place ID** — for `GOOGLE_PLACE_ID` env var (find via Google Place ID Finder)
- [ ] **Google Places API key** — for `GOOGLE_PLACES_API_KEY` env var
- [ ] **"Leave a review" URL** — for `NEXT_PUBLIC_GOOGLE_REVIEW_URL` (your Google Business profile URL or g.page short link)

### Tracking
- [ ] **GHL widget ID** — for `NEXT_PUBLIC_GHL_WIDGET_ID` (chat won't render without it)
- [ ] *(optional)* GTM, GA4, Meta Pixel IDs

---

## 1 · Real Estate (`/real-estate`)

### Hero — Cinematic Drone
- [ ] **Background video** — `/public/images/hero-real-estate.mp4`
  - 10–15 sec looping aerial of a high-end Arkansas listing
  - 1920×1080 or higher, MP4, no audio
  - Bonus: slow push-in or pull-back motion (cinematic, not jerky)
  - *Currently using `demo-video.mp4` as fallback*
- [ ] **Poster image (fallback for slow connections)** — `/public/images/hero-drone.jpg`
  - Drone exterior of a premium home, dusk/golden hour preferred
  - Min 1920×1080

### In-page (already working — no swaps needed)
Pricing cards are real. Standalone services are real. Add-ons are real.

---

## 2 · Lot & Land (`/lot-land`)

### Hero — Aerial-Pushed Drone
- [ ] **Background video** — `/public/images/hero-lot-land.mp4`
  - Aerial flyover of acreage / undeveloped land showing horizon and property edges
  - 10–15 sec loop
  - Subject: emphasize *vastness* — wide land, water features, road access
- [ ] **Poster image** — `/public/images/hero-drone-2.jpg`
  - Aerial still of land / lot
  - Bonus: include obvious context (tree line, road, neighboring features) since "context sells land"

---

## 3 · Multi-Family (`/multi-family`)

### Hero — Editorial + Stats
- [ ] **Featured property image** — `/public/images/multi-family-featured.jpg`
  - Aspect: roughly 4:5 portrait
  - Best subject: drone aerial of an apartment complex you've shot
  - *Currently using `hero-drone-2.jpg`*
- [ ] **3 thumbnail strip images** (3:1 grid below featured):
  - `/public/images/multi-family-thumb-1.jpg` — drone overview
  - `/public/images/multi-family-thumb-2.jpg` — exterior facade or signage
  - `/public/images/multi-family-thumb-3.jpg` — amenity (pool, clubhouse, gym, dog park)

### Copy placeholders to confirm
- [ ] **"Featured Property" name**: currently *"The Grove · Little Rock"* — replace with a real property you've shot
- [ ] **Stats row**: currently *24hr · 50+ properties · ILS-ready* — confirm or send real numbers
- [ ] **Tag**: *"Lease-up"* on the featured card — could be the actual property status

---

## 4 · Builders (`/builders`)

### Hero — Documentary Timeline (3 stages)
- [ ] **Stage 01 — Foundation/early build** — `/public/images/builders-stage-1.jpg`
  - Aerial or ground shot of construction site, early phase
- [ ] **Stage 02 — Mid-construction** — `/public/images/builders-stage-2.jpg`
  - Framed/in-progress build, ideally same property as stage 1 if you have a sequence
- [ ] **Stage 03 — Model home / launch** — `/public/images/builders-stage-3.jpg`
  - Finished model home, twilight or hero shot

### Copy placeholders to confirm
- [ ] **Stats**: *Monthly programs · 1-day launches · 4K drone* — verify or replace

---

## 5 · Commercial (`/commercial`)

### Hero — 2x2 Mosaic
- [ ] **Tile 1: Dealerships** — `/public/images/commercial-dealership.jpg`
  - Best: drone of a car lot or dealership exterior with inventory visible
- [ ] **Tile 2: Offices & Retail** — `/public/images/commercial-office.jpg`
  - Office building exterior or retail center facade
- [ ] **Tile 3: Industrial / aerial** — `/public/images/commercial-industrial.jpg`
  - Aerial of warehouse, facility, or commercial campus
- [ ] **Tile 4: Hospitality** — `/public/images/commercial-hospitality.jpg`
  - Restaurant, venue, or hotel exterior — twilight or moody lighting

---

## 6 · Airbnb & Rentals (`/airbnb-rentals`)

### Hero — Lifestyle Warm
- [ ] **3 carousel images** (4:5 portrait, fade-rotate every 4.5s):
  - `/public/images/airbnb-slide-1.jpg` — warm interior, natural light, lifestyle styling
  - `/public/images/airbnb-slide-2.jpg` — exterior or twilight (high-impact)
  - `/public/images/airbnb-slide-3.jpg` — amenity that sells (hot tub, kitchen, view, deck)
  - All should feel "scroll-stopping on Airbnb" — *not* dry MLS photos

### Copy placeholders to confirm
- [ ] **Mock listing card overlay**: *"The Riverhouse · Little Rock · Entire home · Sleeps 6 · Superhost · ★ 4.96 · 142 reviews"* — replace with a real STR you've shot (with permission)
- [ ] **40% stat**: *"40% more bookings"* — confirm source / verify

---

## 7 · Personal Branding (`/branding`)

### Hero — 3 Phone Reel Cascade
- [ ] **3 vertical reel videos** — replace at `/public/images/`:
  - `/public/images/branding-reel-1.mp4` — vertical 9:16, MP4, no audio, 8–15 sec loop
  - `/public/images/branding-reel-2.mp4` — vertical 9:16, MP4, no audio
  - `/public/images/branding-reel-3.mp4` — vertical 9:16, MP4, no audio
  - Subjects: real personal-brand reels you've shot (agent walking, headshot rotation, on-location, etc)
  - *Currently all 3 use `demo-video.mp4` cropped — looks weird because it's landscape*
- [ ] **Decorative side thumbnail** — `/public/images/portfolio-headshot-2.jpg`
  - Small 9:16 secondary portrait peeking out

### Copy placeholders to confirm
- [ ] **Spec sticker**: *"1-day shoot · 4 reels + 20 photos"* — confirm offer or replace
- [ ] **Studio badge**: *"☀︎ Studio · Little Rock"* — confirm

### Reel marquee section (below hero)
- [ ] **10 reel thumbnail images** (9:16 portrait, ~180×320, JPG):
  - `/public/images/reel-1.jpg` through `/public/images/reel-10.jpg`
  - Best content: vertical reel cover frames from past sessions
  - Could also include polished portrait stills cropped to 9:16
  - *Currently reusing 10 existing portfolio images — they work but a real curated set would be much stronger*

---

## 8 · Order Forms (Aryeo)

These don't need images — just the new UUIDs once Aryeo forms are rebuilt:

- [ ] **Real Estate** form UUID
- [ ] **Lot & Land** form UUID
- [ ] **Multi-Family** form UUID
- [ ] **Builders** form UUID
- [ ] **Airbnb & Rentals** form UUID
- [ ] **Commercial** form UUID *(new — currently routes to contact CTAs)*
- [ ] **Branding** form UUID *(new — currently routes to contact CTAs)*

Once you have them, paste into chat and I'll update `src/lib/order-forms.ts` in one commit, and switch Commercial + Branding from contact CTAs to the native order flow.

---

## Quick wins (low-effort, high-impact)

If you can only ship a few things first, prioritize in this order:

1. **GHL widget ID** — chat is currently invisible to site visitors
2. **Real hero video for `/real-estate`** — biggest visual on the most important page
3. **3 vertical reels for `/branding`** — current state looks broken (landscape video in portrait phone frames)
4. **Featured-property image + name for `/multi-family`** — credibility hook for B2B prospects
5. **Brokerage logos** *(if you want them)* — biggest credibility lift on the home page

Everything else can roll in over time without breaking anything.
