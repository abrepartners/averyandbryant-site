# Builders page redesign: handoff and experience upgrade assessment

Date: 2026-11-14 (America/Chicago). Status: local review candidate, not pushed, not merged.
Release owner: Thomas. Nothing here authorizes a merge, deploy, send or spend.

## Where things stand

| Item | State |
|---|---|
| Live page | `main` de3cd5b. Photo hero, 12 real photos, 4 films, 4 reels, packages. |
| Overnight redesign | Branch `builders-redesign`, commit 0c90188, pushed, Vercel preview exists. Built by another Claude session from Thomas's 11/14 brief. Scroll story with a hand drawn canvas house, carry calculator, stage picker, offer terms. Zero real photos or video (placeholders by request). |
| This candidate | Branch `builders-redesign-proof`, one commit on top of 0c90188, local only, in `~/worktrees/averyandbryant-site-builders-proof-20261114`. |
| Collision | The overnight session still owns `builders-redesign` and is waiting on Thomas for four offer answers. This work sits on a sibling branch so neither overwrites the other. |

## What this candidate changes (2 files)

1. `src/components/builders/plan-to-sold.tsx`: the first screen is now a real delivered photo of a complete home (the Bryant farmhouse, already the live builders hero). On scroll the photo hands off to the drawn floor plan, then the existing build story runs to Sold. Hint text reads "Scroll back to the plan". The second text link hides on short phones so nothing overlaps.
2. `src/components/builders/proof-slots.tsx`: the proof section now leads with six real finished home photos and the four real films and four reels (all already live on the current page). Build progress photos and the before and after video stay as drawn frames, each labeled Placeholder, because that footage does not exist yet.

To swap the opening home: edit `HERO_HOME` at the top of `plan-to-sold.tsx`. Use a wide photo with the whole house centered (phones crop the sides). To swap proof photos: edit `DELIVERED_PHOTOS` in `proof-slots.tsx`. Films come from the `builders` entry in `src/lib/portfolio-videos.ts`. CTA target comes from `consultUrl("builders")` in `src/lib/consult.ts`.

## Acceptance evidence (headless Chromium, local production build, 2026-11-14)

| Area | Result |
|---|---|
| Clarity | First screen: real home, audience line, headline, one crimson button. Pass by inspection; not yet tested on a nontechnical reviewer. |
| Asset fidelity | Opening photo, six photos, films and reels are real A&B deliveries already published. Drawn frames are labeled Placeholder. The drawn house is an illustration, not a model of any real home. |
| Interaction | Scroll forward and back works; hero button and calculator fields reachable by keyboard and labeled; no console errors. |
| Mobile | 390x844 and 390x664 (iPhone Safari visible height): no horizontal overflow, no clipped text, sticky button bar visible. The 664 overlap found in testing was fixed. |
| Desktop | 1440x900: no overflow; photo sits where the model appears. |
| Reduced motion | Tested 11/14 with reduced motion emulated at 390x844: photo, plan and stage follow the scroll forward and back, no errors. |
| Performance | Overnight preview measured 625 KB transfer, 59 requests, load 3.9 s on desktop class headless. This candidate adds one priority hero image and six lazy photos; video loads on tap. Not measured on a real phone or throttled network: unverified. |
| Conversion path | Buttons go to the existing Free Consultation calendar with `interest=builders`, `/order/builders` with the package name, and the office phone. No form was submitted. Calendar booking receipt not tested. |
| Checks run | `tsc --noEmit` clean, `eslint` clean on the builders folders, `next build` succeeds. |
| Not done | Physical iPhone, slow network, Safari, screen reader pass. |

Rollback: delete the branch or drop the top commit. `main` and `builders-redesign` are untouched.

## Three upgrade options, ranked

1. **Flagship builders page (pick).** Already built. Needs Thomas's eyes, his yes or no on the four invented offers, then real progress footage as it is shot. No generation spend needed.
2. **Coordinated listing launch content.** Reuse the same home and message for one vertical piece and one carousel through the installed live-carousel and HyperFrames skills. Start only after the page survives review. Measure the second run.
3. **Client review and handoff.** Small wording and instruction fixes inside the existing Aryeo and Frame.io delivery. No new portal. Inspect current friction first.

## Capability matrix

| Capability | Evidence today |
|---|---|
| Real image plus coded motion on the site | Tested in this candidate. |
| Canvas drawn 3D style house, zero dependencies | Tested (overnight commit). |
| Real films and reels on tap | Tested, existing component. |
| Higgsfield generation | Documented, account connected, vault note last updated 2026-05-31 and stale on pricing. Not used, not needed for this pilot. |
| Property morph reel (video-morph-engine) | Installed, documented July pilot. Not re-run. |
| HyperFrames and live-carousel | Installed. Not re-run today. |
| Blender or live browser 3D | Not installed, not justified. |
| Fable 5.2 included usage | Unverified. One session's model switch printed "Draws from usage credits". Check Settings, Usage. |

## Competitor check (2026-11-14, three sites, read only)

- 3wire Photography, 3wirephotography.com: names 12 custom builders on its About page, builder titled videos; agent pricing only, phone or email to book, no builder page.
- Arkansas REM, arkansasrem.com: public prices and an online package picker; homepage overflowed at phone width in a headless browser; no builder page.
- American Real Estate Media, Little Rock page: national brand, agent focused Book Now; commercial page says under construction; no builder content.

The bar: public pricing with a working phone order flow, and named builder proof. The gap: nobody has a builder specific offer, progress program, builder pricing or builder booking path. Three sites, not a census; no traffic or conversion claims.

## Architecture brief

- Objective: a builder understands what A&B does for them at each build stage and books a call or a package.
- Audience: custom and spec builders in Central Arkansas.
- Scope: `/builders` only. Non-goals: site wide redesign, new offers going live, live 3D, new funnels, CRM changes.
- Inputs: published builder photos and films, `buildersPricing`, the consult calendar link.
- Output: one branch with a preview link for Thomas.
- Allowed effects: local commits, branch push for preview once Thomas says yes. Never main.
- Dependencies: none added.
- Cost: no generation spend. Effort so far is one overnight build plus this pass.
- Stop condition: Thomas approves or rejects the preview; the four offers are answered; then flags come off and it goes to him for release.

## Storyboard

1. Complete home. Real photo, "From plan to sold.", Book a builder call.
2. Rewind. Photo hands off to the floor plan on the blueprint grid.
3. Foundation, framing, rough-in, finished, sold. Each stage names the media captured there.
4. The carry. Calculator with the builder's own numbers.
5. The work. Real homes and films first, labeled placeholders for progress footage.
6. Packages by stage, terms and guarantee, free review offer (proposal), FAQ, close.

## Offer decisions (Thomas, 2026-11-14)

- Approved and live on the page: "Late on our end, and that shoot is free."
- Declined and removed: Sitting Spec Review (section, link and text or email buttons), Priority Launch Slot, published site cap. No "Proposal" tags remain.

## Open items

- Real build progress photos and a before and after video do not exist yet; the two slots stay labeled Placeholder.
- Not yet checked on a physical iPhone or a slow connection.
- Release is Thomas's call. This branch is for preview only.
- Review evidence (15 second phone scroll recording, terms screenshot): `~/ab/notes/builders-review-evidence/`.
