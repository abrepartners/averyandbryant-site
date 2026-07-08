# SEO Migration Checklist (Squarespace → Vercel)

**Created 2026-06-18. Source: Google Search Console baseline. Pairs with `dns-cutover-runbook.md` and `LAUNCH-CHECKLIST-THOMAS.md`.**

## Why this exists

Google Search Console is now connected. The current Squarespace site is already ranking and pulling clicks on specific URLs. If the Vercel cutover happens without a URL-by-URL 301 redirect map, those rankings die overnight — Google hits 404s where it used to find pages, and the new site restarts SEO from zero. This is the #1 way a rebuild quietly tanks organic traffic.

**Do these BEFORE DNS cutover, not after.**

## Baseline at handoff

28 days ending 2026-06-18, property `sc-domain:averyandbryant.com`:

| Metric       | Value |
| ------------ | ----- |
| Clicks       | 104   |
| Impressions  | 2,144 |
| CTR          | 4.85% |
| Avg position | 9.3   |

This is the number to beat. Re-pull post-launch to detect any drop.

## Currently-ranking URLs that MUST NOT 404 after cutover

Map each to its new equivalent or 301 it:

| Old URL (Squarespace)                           | Status                          | Action                                                                                           |
| ----------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------ |
| `www.averyandbryant.com/`                       | Homepage, pos 7–10, most clicks | Maps to new `/`                                                                                  |
| `www.averyandbryant.com/services-pricing`       | Has impressions                 | 301 → `/pricing`                                                                                 |
| `www.averyandbryant.com/photos`                 | Has impressions                 | 301 → new gallery/photos route                                                                   |
| `homes.averyandbryant.com/sites/*`, `/videos/*` | Aryeo-hosted, real impressions  | **Leave on Aryeo — do not touch.** Just confirm cutover doesn't break the `homes.` subdomain DNS |

> This is a partial list from the top-pages sample. Pull a full 90-day GSC page-level export before building the redirect map so the long tail isn't orphaned. (Ask the GSC-connected session: "pull the full GSC page export for the redirect map.")

## Launch-gating tasks

- [ ] **Canonical host** — pick ONE (`https://www` OR non-www), 301 all other variants to it. Set in `next.config.js` and/or `vercel.json`. The current live site splits authority across `http://` and `https://www` — fix it here in the build, not on the old site (which is being replaced).
- [ ] **301 redirect map** — every currently-ranking Squarespace URL → new equivalent. Implement in `vercel.json` `redirects` or Next.js `redirects()`. Cover the table above at minimum.
- [ ] **`/pricing` indexability** — currently `robots: noindex`. The old `/services-pricing` ranks, so the replacement MUST be indexable at cutover or that ranking is lost.
- [ ] **Submit new sitemap to GSC** on launch day. Domain property `sc-domain:averyandbryant.com` is DNS-verified so it should carry over.
- [ ] **Post-launch monitoring** — re-pull GSC at +3 days, +1 week, +1 month vs the baseline above. Watch for coverage errors in GSC.

## FULL Redirect Map — complete GSC export (pulled 2026-06-24, 90 days)

These are ALL 11 Squarespace URLs carrying SEO equity. Mapped to confirmed new-site routes. Nothing else on the old site ranks — this is the complete list.

| Old Squarespace path | Impr (90d) | Pos | New route | Confidence |
| -------------------- | ---------- | --- | --------- | ---------- |
| `/` | 2,165 | 7.9 | `/` | Canonical only (no path redirect — see below) |
| `/photos` | 690 | 7.3 | `/gallery` | High |
| `/book-services` | 626 | 11.7 | `/book` | High |
| `/videos` | 502 | 4.8 | `/gallery` | ⚠️ ranked well as standalone — see regression note |
| `/drone-photos` | 447 | 5.6 | `/real-estate` | ⚠️ regression risk |
| `/services-pricing` | 438 | 5.2 | `/pricing` | High |
| `/twilight-photography` | 289 | 5.1 | `/real-estate` | ⚠️ regression risk |
| `/virtual-staging` | 199 | 5.4 | `/real-estate` | ⚠️ regression risk |
| `/agent-branding` | 124 | 4.8 | `/branding` | High |
| `/Gallery` | 28 | 2.4 | `/gallery` | Case redirect |

### ⚠️ SEO regression decision needed (Thomas)

The old site had **standalone service pages ranking on page 1**: `/videos` (pos 4.8), `/twilight-photography` (5.1), `/virtual-staging` (5.4), `/drone-photos` (5.6). The new site folded these services into modals on `/` and `/real-estate` — there are no dedicated routes for them. Redirecting them to `/real-estate` preserves link equity but **loses the keyword-specific ranking** (a page literally about "twilight real estate photography" outranks a section of a broader page).

**Two options:**
1. **Redirect to `/real-estate`** (map above) — simplest, keeps equity, accepts some ranking loss on those service terms.
2. **Build dedicated service pages** (`/services/twilight`, `/services/drone`, `/services/virtual-staging`, `/services/video`) — fully preserves and can grow these rankings. More build work, but these terms drove ~1,400 impressions in 90 days.

Recommendation: option 1 for launch (don't block cutover), then build dedicated pages as a fast-follow since the ranking demand is proven.

### vercel.json implementation

```jsonc
{
  "redirects": [
    { "source": "/photos", "destination": "/gallery", "permanent": true },
    { "source": "/Gallery", "destination": "/gallery", "permanent": true },
    { "source": "/book-services", "destination": "/book", "permanent": true },
    { "source": "/services-pricing", "destination": "/pricing", "permanent": true },
    { "source": "/agent-branding", "destination": "/branding", "permanent": true },
    { "source": "/videos", "destination": "/gallery", "permanent": true },
    { "source": "/drone-photos", "destination": "/real-estate", "permanent": true },
    { "source": "/twilight-photography", "destination": "/real-estate", "permanent": true },
    { "source": "/virtual-staging", "destination": "/real-estate", "permanent": true }
  ]
}
```

### Canonical host

`/` itself needs no path redirect — but the host does. GSC shows `http://www` (171 clicks) and `https://www` (127 clicks) ranking as TWO separate homepages, splitting authority. Enforce ONE canonical host (recommend `https://www.averyandbryant.com`), 301 the other three variants (`http://www`, `http://`, `https://` non-www) to it. Cleanest in Next.js middleware or `next.config` `redirects()` with a host condition.

### homes.averyandbryant.com — leave alone

144 Aryeo-hosted URLs rank (listing sites + videos). These stay on Aryeo and are NOT part of this redirect map. Only confirm the cutover doesn't break the `homes.` subdomain DNS record.
