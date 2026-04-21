# DNS Cutover Runbook — Squarespace → Vercel

Step-by-step for flipping `averyandbryant.com` from the current
Squarespace site to the Next.js site on Vercel. Follow top-to-bottom;
don't skip the verification steps.

---

## Pre-reqs — check before scheduling the cutover

- [ ] Vercel project `averyandbryant-site` is healthy (last deploy READY,
  no build errors)
- [ ] All production env vars are set in Vercel:
  - `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
  - `GHL_API_TOKEN`, `GHL_LOCATION_ID`
  - `ARYEO_API_KEY`
  - `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID`
  - `NEXT_PUBLIC_STRIPE_PORTAL_URL`
  - `NEXT_PUBLIC_GHL_WIDGET_ID` (task #16 — pending)
- [ ] The Vercel URL serves all key pages correctly:
  - https://averyandbryant-site.vercel.app/ (home)
  - /real-estate /airbnb-rentals /multi-family /commercial /lot-land
    /builders /branding /studio /studioai /answr
  - /book /members /referral /gallery
- [ ] Stripe webhook endpoint is set to
  `https://averyandbryant.com/api/stripe/webhook` (will start working
  after DNS flip; set now to avoid touching it later)
- [ ] 301 redirects for old Squarespace URLs added to `next.config.ts`
  (see `ab-knowledge-base.md` section 9 for the map)

## Schedule

- Do this during **low-traffic hours** (evenings, weekend morning)
- **Budget:** 30 min active work + 1-6 hour DNS propagation wait
- Let Jarvis / Thomas know before starting so they don't panic at a
  "site is down" for propagation blips

---

## Step 1 — Add the custom domain in Vercel

If not already done:

```bash
npx vercel domains add averyandbryant.com --scope thomas-projects-85dbd8dc
```

Or via UI: Vercel → Project → Settings → Domains → Add → `averyandbryant.com`
(and `www.averyandbryant.com`).

Vercel will show the DNS records required. Note them.

## Step 2 — Capture current Squarespace DNS

Screenshot the current DNS config in whatever registrar holds
`averyandbryant.com` (likely Squarespace itself or a separate
registrar — Google Domains, GoDaddy, Namecheap). Save to
`/Users/camillebrown/Desktop/dns-before-cutover.png` or similar.

This is your rollback reference.

## Step 3 — Flip the DNS records

At the registrar, replace Squarespace records with Vercel records:

**For the apex (averyandbryant.com):**
- Remove: Squarespace A records (likely 4 IPs like 198.185.159.144)
- Add: A record pointing to `76.76.21.21` (Vercel's apex alias)

**For www subdomain:**
- Remove: CNAME pointing to Squarespace (`ext-cust.squarespace.com`)
- Add: CNAME → `cname.vercel-dns.com`

Save changes.

**Do NOT touch these subdomains:**
- `homes.averyandbryant.com` → Aryeo (client portal, order forms)
- `pay.averyandbryant.com` → Stripe (payment links)
- `link.averyandbryant.com` → GHL (tracking, widgets)
- `api.leadconnectorhq.com` → GHL (calendars, webhooks)

## Step 4 — Watch propagation

DNS takes 5 min to ~6 hours depending on your registrar's TTL.

```bash
# Poll the domain every 30 seconds until it resolves to Vercel
dig averyandbryant.com +short
# Expected: 76.76.21.21 (or a Vercel edge IP)
```

Or: https://dnschecker.org/#A/averyandbryant.com

When most servers resolve to Vercel, Vercel automatically provisions
the Let's Encrypt SSL certificate. Verify with:

```bash
curl -sI https://averyandbryant.com | head -1
# Expected: HTTP/2 200
```

If you see 301/302 to `averyandbryant-site-*.vercel.app` — the domain
is working. If you see `Server: Squarespace` — DNS hasn't propagated to
your DNS resolver yet. Wait and retry.

## Step 5 — Update GHL custom values (logo URLs)

Once the domain resolves to Vercel, the images at
`averyandbryant.com/images/brand/*` start working. The brand custom
values in GHL already point at these URLs — no change needed.

Verify: open any recent GHL email preview (Settings → Email Builder →
any AB template). The logo should render.

If you want to belt-and-suspenders the logo display during propagation
wobble, you can temporarily point custom values at the GHL CDN URLs:
- Brand Logo Raster URL → `https://assets.cdn.filesafe.space/iXhH37718q9nZnf4tkgF/media/d5b6484d-296a-4be3-a22b-91310354409a.png`
- Brand Logo White Raster URL → `.../f2bbe4d4-9381-4451-bdb9-f0d100f0684f.png`

Then switch back to `averyandbryant.com/*` URLs once propagation settles.

## Step 6 — Trigger GHL knowledge base re-crawl

The GHL AI agent's knowledge base was crawling the old Squarespace
URLs (see list in `ab-knowledge-base.md` section 9). After the flip:

1. GHL → Sites (or Conversations → AI Agent) → Knowledge Base
2. Click the site entry → "Refresh" or "Re-crawl"
3. Wait for crawl to complete (usually 10-30 min for our URL count)
4. Delete any crawled pages that are now 404 (the 4 "drop" URLs: `/home-nwa`,
   `/home-ca`, `/implement-weather-policy`, `/services-pricing` — unless
   you've set up 301 redirects, in which case they'll auto-route)

## Step 7 — Verify everything that depends on the domain

**Site pages:**
- [ ] https://averyandbryant.com/ loads (home, not Squarespace)
- [ ] /real-estate renders (check real content, not generic)
- [ ] /studio renders with podcast carousel
- [ ] /book renders and "Book Now" in nav works
- [ ] Favicon is the A&B crimson square (not Squarespace default)

**Email (most important — customer-facing):**
- [ ] Send a test payment through a $0 Stripe Payment Link
- [ ] Receive the "Payment received — pick your time slot" email
- [ ] Logo renders in the header (browser email preview + Gmail app + Apple Mail if possible)
- [ ] Footer links work (phone, email, website)

**Forms / order hand-off:**
- [ ] Click "Book Now" on /real-estate → Aryeo order form loads with
  vertical pre-populated
- [ ] Click "Book Free Consult" on any ConsultCTA → GHL calendar widget loads

**Tracking:**
- [ ] DevTools → Network → refresh home page → verify
  `link.averyandbryant.com/js/external-tracking.js` loads
- [ ] Verify no CORS errors or mixed-content warnings

**Stripe webhook:**
- [ ] Trigger a test payment (real or sandbox)
- [ ] `npx vercel logs --prod | grep stripe-webhook` shows the upsert +
  enrollment lines
- [ ] Contact appears in GHL with the right tags

## Step 8 — Clean up

- [ ] Cancel Squarespace subscription (after 48hr grace period to make
  sure no traffic still needs the old site)
- [ ] Export any Squarespace content we want to preserve (blog posts,
  images) before cancellation
- [ ] If `www.` was the canonical before and `apex` is canonical now (or
  vice versa), verify redirects work correctly

---

## Rollback plan

If something is badly broken and needs to revert:

1. **Revert DNS:** flip A records back to Squarespace IPs (use the
   screenshot from Step 2)
2. DNS propagation: same 5 min to 6 hours
3. The Squarespace site will resume serving
4. Keep the Vercel deploy live — it stays on `averyandbryant-site.vercel.app`
5. Diagnose the issue, fix, re-attempt the cutover

**Things that stay working even during a full rollback:**
- `homes.averyandbryant.com` (Aryeo)
- `pay.averyandbryant.com` (Stripe)
- All GHL calendars / emails / workflows
- The Stripe → GHL webhook (webhook URL points at the apex but Vercel
  CDN serves it via Vercel internally; only client-side UI breaks)

## Post-cutover monitoring

For 48 hours after the flip:

- [ ] Check Vercel analytics for 4xx / 5xx spikes
- [ ] Monitor Stripe webhook delivery rate in Stripe dashboard → Developers → Webhooks
- [ ] Watch for customer reports of "can't find X" — old Squarespace URL that needs a redirect added
- [ ] Check Google Search Console for crawl errors on the next crawl cycle

## Ongoing

After the cutover, any new URL changes (new pages, removed pages) need
the same treatment:
- Update `ab-knowledge-base.md` section 9 with the redirect mapping
- Add the redirect in `next.config.ts`
- Re-trigger GHL knowledge base crawl if the content changed significantly
