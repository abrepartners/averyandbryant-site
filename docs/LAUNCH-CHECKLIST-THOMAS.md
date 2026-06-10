# A&B Site — Launch Checklist (Thomas only)

**Generated:** 2026-06-10 · Branch: `feature/launch-readiness-images-qa`
**Scope:** Everything below needs _your_ judgment, accounts, real assets, or a business decision. Everything Jarvis could safely auto-fix is already done (see bottom).

> Build is green (`npm run build` exit 0, all 27 routes). Nothing here blocks compiling — these block _launching honestly_.

---

## 🔴 BLOCKERS — fix before DNS cutover

1. **Studio membership tier names mismatch across 3 files** → new subscribers silently fail to tag/enroll.
   `src/lib/pricing.ts` vs `src/app/api/stripe/webhook/route.ts` (`TIER_TAGS`) vs `src/app/studio/page.tsx`. Pick ONE canonical tier-id set, confirm it matches what each Stripe Payment Link sends in metadata/`success_url`. _(I didn't auto-fix — the canonical truth is in your Stripe dashboard, not the code.)_
2. **Members billing portal = Stripe TEST placeholder.** `NEXT_PUBLIC_STRIPE_PORTAL_URL` is unset → falls back to a test URL. Set the live Customer Portal login link in Vercel env.
3. **`/pricing` is `robots: noindex`.** Intentional for now? A transparent pricing page is high-intent SEO. Decide: flip to indexable for launch, or keep hidden.
4. **DNS cutover** (from the project note, still open): bare `averyandbryant.com` SSL cert conflict; `link.averyandbryant.com` Cloudflare 403 (GHL widget). Resolve before pointing `www` off Squarespace.

---

## 🟠 CONTENT TRUTH / LEGAL — verify or pull (these are claims, not code)

These are stated as fact on the live-bound site. If any isn't true/substantiable, it's a legal + trust risk:

- **Fabricated social proof:** named mock properties — "The Riverhouse · Little Rock" (Airbnb hero, Superhost ★4.9), "The Grove · Little Rock" (multi-family hero, "Lease-up"). Either make them real or remove.
- **Hardcoded Google rating:** `layout.tsx` LocalBusiness schema asserts `aggregateRating 5.0 / 24 reviews` site-wide, while the homepage widget pulls the _live_ count. Mismatched/static ratings violate Google structured-data policy. Drive it from the live Places value or remove it.
- **Brokerage logos** (Coldwell Banker, Century 21, KW, Crye-Leike, Engel & Völkers) styled as endorsements on the homepage trust bar. Confirm you've actually shot for agents at each — or switch to neutral "Trusted by agents across Arkansas." Trademark/false-association risk.
- **Performance stats:** "40% More Bookings" (airbnb, ×3), "50+ Properties" (multi-family), "200+ Arkansas agents", "48-hour avg. delivery". Substantiate or soften.
- **Tenure claim "Serving Arkansas … since 2018"** appears on airbnb, multi-family, lot-land, builders, branding. Confirm the founding year + that you served each vertical that long.
- **Reshoot/engagement guarantees** per vertical ("more online engagement than your last listing," "more tour requests within 30 days," "more saves than the average land listing"). Confirm you can honor + track each, or reword to something measurable.
- **"BBB A+"** — confirm active accreditation.
- **FAA Part 107 "fully insured"** (lot-land) — confirm.

---

## 🟡 REAL MEDIA TO SUPPLY (I wired real Aryeo photos where they existed — these still need you)

- **Commercial hero** — reverted to generic on purpose. Aryeo has no real commercial imagery (the "Builders & Business" bucket resolved mostly _residential_: Mountain Brook, Wellington Pl, etc.). Send real dealership / office / industrial / hospitality exteriors and I'll wire them to the 4 mosaic tiles.
- **Branding page** — thin in Aryeo (only ~13 headshots). The hero reel currently plays the same `demo-video.mp4` 3× and the marquee uses property photos. Send real headshot/brand-session stills + a branding clip. _(You said you'd give me more options — drop them and I'll swap.)_
- **`demo-video.mp4`** — one generic clip is reused as the hero video on real-estate, lot-land, branding, studioai. Ideally a distinct real clip per vertical; at minimum a real estate one.
- **Studio "The Spot" room photos** — the JPGs are placeholders and the labels don't match the photos (flagship "Podcast Room" shows a pink velvet lounge; "Neutral Room" shows green podcast chairs). Send the real room-by-room photos (your `THE SPOT IMAGES` folder is blocked by macOS permissions, so I can't reach it — AirDrop/Dropbox them).
- **Reels Pack card** (homepage) + per-vertical **OG/social share images** — currently the twilight-staging still stands in everywhere.

---

## 🟢 DECISIONS (quick calls, no work on your end)

- "See Our Work" / gallery → currently sends traffic _off-site_ to `homes.averyandbryant.com` instead of the on-site `/gallery` (which 308-redirects there anyway). Keep external (loses on-site tracking) or build a real on-site gallery?
- `/book` CTA points to the generic Aryeo order root, not a vertical-specific form. Want it to route smarter?
- Studio pay-as-you-go rates vs membership discount math are inconsistent between the page and `pricing.ts` (e.g. Creator 10% / Pro / Command 30%). Lock the base rate (Stripe link = source of truth) and I'll reconcile the copy.

---

## ✅ ALREADY DONE (Jarvis, this pass — verified, committed)

- **Real Aryeo listing images wired** into real-estate, airbnb-rentals, multi-family, lot-land, builders heroes (sourced via `order_form ⋈ listing` join — listing `type` is unreliable). _Resolves the "generic reused hero image" QA findings for those 5 verticals._
- **Dead `/services` link → `/pricing`** (was a 404 on every vertical via ConsultCTA).
- **Build-breaking prop bug** on `/pricing` fixed (`ConsultCTA`/`OrderLink` — was failing `tsc`/`build`).
- **Studio:** removed "placeholder" alt text; added `id="sets"` so the members "Browse Rooms" deep-link resolves.
- **Homepage:** descriptive service-card alt text.
- **Verified:** all 8 Studio Stripe payment links resolve HTTP 200.
- **New:** guided "Find your package" selector (`/get-started`) — 3 questions → recommended package → right Aryeo form. Entry points on homepage + `/pricing`. In sitemap.
