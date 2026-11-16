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

## Film hero (2026-11-14, later the same day)

Thomas's call: the drawn floor plan looked cheap. The opening scene is now one continuous film of a home going from layout lines on bare dirt to sold, scrubbed by the scroll. This sits on `builders-redesign`, which now contains both commits from `builders-redesign-proof` plus the film.

- How it was made: a Blender blockout fixed the house, lot, sun and camera for six stages; Nano Banana 2.1 turned each blockout frame into a photoreal still; Kling 3.0 made five clips with the start and end frame pinned, each starting on the real last frame of the one before. Run through Replicate, because this machine had no Higgsfield login. Source, prompts, clips and a receipt of every generation: `~/ab/tools/plan-to-sold-film/` (see `RECEIPT.md`).
- In the site: `src/components/builders/film-scrub.tsx` (canvas player), `film-data.ts` (frame counts, stage key frames, scroll timing), frames in `public/builders/film/v1/` (landscape 1280x720 and phone 608x1080, 12 frames per second of film, WebP). `next.config.ts` caches that folder for a year; a new cut goes in `v2`.
- The drawn house (`house-model.ts`, `house-canvas.tsx`) is removed. The stage picker and the two not-yet-shot proof slots use stills from the film.
- Honesty rule kept: the film and every still from it are labeled "Illustration". The real photos and films in the proof section are unchanged.
- Removed in this pass: the real photo that opened the page in the proof candidate. The film now opens it. To bring the photo back, restore `HERO_HOME` from commit 8c7e184.
- To re-cut: `~/ab/tools/plan-to-sold-film/scripts/encode.sh`, then paste the printed counts and keys into `film-data.ts`.

## Two cuts side by side (2026-11-14, evening)

Thomas asked for a blueprint opening and a page that follows the build, kept switchable against the first film cut so both can be looked at.

- `/builders` is cut A: unchanged. Opens on the lot, stage picker lower down.
- `/builders/process` is cut B: opens on a rolled blueprint that unrolls, lies flat and turns into the lot with its lines in the same place, then the same build film. Eight stages. Each stage names what we shoot there and the package that covers it with its price (from `src/lib/pricing.ts`). After the film: carry calculator, real work, packages in build order (`phase-packages.tsx`, no picker), terms, questions, close. Not indexed.
- A small "A / B" switch sits under the header on both pages (`VersionSwitch` in `page-shared.tsx`). It never renders when `VERCEL_ENV` is `production`.
- `film-data.ts` now holds two film definitions, `FILM_A` and `FILM_B`. B plays `public/builders/film/v2/{169,916}/p0000..p0119.webp` (the opening) and then the v1 frames, so the build frames are not duplicated.
- No new offers or prices. The two new stage panels (Plan, Lot) only restate the free 30 minute call and that Build Tracker starts at the foundation.

When Thomas picks one: delete the other page, `VersionSwitch`, and whichever of `plan-to-sold.tsx` + `stage-packages.tsx` picker or `process-film.tsx` + `phase-packages.tsx` is not used (keep `PackageCard`). If B wins, move it to `/builders`.

## B picked, real work added (2026-11-16)

Thomas picked cut B. Cut A, the `/builders/process` route and the A / B switch are deleted; B is now `/builders`. `stage-packages.tsx` became `builder-package-card.tsx` (card and `displayPrice` only) and `film-data.ts` holds one film, `FILM`.

The work section (`src/components/builders/proof-slots.tsx`) no longer has placeholders. Everything in it is real delivered media Thomas pointed to on 2026-11-16:

- 01 Build progress photos: one Benton home, exterior, kitchen and great room on three visits (`public/images/builders/progress/benton-*`).
- 02 Framing to finished: one Cabot home, four frames (`progress/cabot-*`).
- 03 Progress reels: three vertical reels of the Benton home (`public/videos/reel-build-progress-early`, `reel-build-progress-visits`, `reel-new-build-finished`).
- 04 One builder's film series, six films (`public/videos/film-builder-*`). These carry the builder's own logo and the community name on screen; that is how they were delivered. No street address appears.
- 05 Renovations: two Little Rock homes, exterior drag to compare plus kitchen pairs (`renovation/`). The house number was painted out of both "after" exteriors.
- 06 Previews: our photo beside an AI preview made from it (`preview/`). The preview half always carries a crimson "Preview, AI" label.
- 07 and 08: the finished home photos and films that were already there.

Rules followed: no street, house number or home name in any file name, caption or alt text. Every film was read at 4 frames a second for on-screen text and every exported photo was read once; the only text found is the builder's branding, tool and material brands, and newspaper clippings inside the family film.

Source files, picks and scripts: `~/ab/tools/builders-content/` (`scripts/export.sh` lists every photo picked by gallery position and re-makes the web files). Films are full length at 960x540, about 54 MB in `public/videos` for the nine new files. Not moving video and film frames to file storage (decided 2026-11-16): main already serves about 250 MB of media from `public/` the same way, visitors get the same CDN speed either way, and a storage bucket would add a second service and a cross-origin hop on the hero. Revisit only if the repo nears GitHub's size guidance.

Not done: check on a physical iPhone. The reels from the two renovations and a finished-home reel from Cabot were not used (the Cabot reel opens on a street address title).

## Tabs, builder-first framing, speed (2026-11-16, second pass)

Thomas's notes after the phone review: too much scrolling, show what a builder is capable of (not listing media), drop the crossed-out finished films and reels, use four more projects.

- The work section is now five tabs (`proof-slots.tsx`): The build, You on camera, The craft, Renovations, Previews. Only the open tab renders, so the section is about a third of its old height on a phone. Heading is now "Be known for how you build."
- Removed: all four finished-home reels and two of the four finished-home films (`builders` entry in `src/lib/portfolio-videos.ts`). The old finished-home photo grid is replaced by eight detail frames from two custom homes (`public/images/builders/craft/`).
- Added films: a builder presenting his latest build (`film-builder-walks-the-home`), a renovation walked before and shown after (`film-renovation-told-on-site`, house number on the porch blurred from 32.9s to 36.0s), and our Instagram reel of a builder explaining a bathroom mid build (`reel-renovation-builder-on-site`, with a link to the reel).
- Framing to finished is now two matched pairs from one Cabot home: entry hall and the view from the drive.
- Scroll film: 760svh down to 660svh. The first frame now ships as a plain image in the HTML and the canvas fades in over it; frames beyond the playhead wait until the visitor scrolls or the page has been idle 3.5 seconds (`film-scrub.tsx`).
- Speed test (Lighthouse, local production build): desktop 100 performance, 100 accessibility. Phone 71 performance, 97 accessibility before the contrast fix; first paint 0.9 s, speed index 1.3 s, blocking time 230 ms (was 1,010 ms). The phone "largest paint" number is not meaningful on this page: Chrome ignores a full-screen image and a canvas, so it reports no candidate. Remaining phone cost is mostly the site-wide tracking scripts.
- Not changed: the hero and carry calculator still speak to selling the finished home. Package and positioning proposals went to Thomas in chat; nothing new is priced or published.

## Top of the page reframed (2026-11-16, third pass)

Thomas said yes to reframing around being known rather than selling one house.

- Hero: "Be known for how you build." with "See the work" as the second link (was "From plan to sold." and the carry link). Headline size capped at 80px so it stays on two lines.
- The carry calculator moved below the packages and is labeled "For spec homes". Its math is unchanged.
- Work section heading is now "The work that makes the case."
- Page order: film, work (five tabs), packages, spec home calculator, terms, questions, close.

## Two ways in, quote questions, flipping headline word (2026-11-16, fourth pass)

Thomas's direction: two main things on the page (one shoot a builder can book
without a long talk, and a quote path that asks one question at a time), keep
the rest consultative, make the last word of the headline flip in its own
window, and decide whether the calculator belongs.

- `builder-offers.tsx` replaces `phase-packages.tsx`. Left card: Market Your
  Build (name and shot list are proposals). It is priced only from live Aryeo
  products: the 25 image photo set ($185) with the regular add-ons. No new
  price was invented and nothing was added to Aryeo. Its button books a call
  until Thomas puts a builder product on the order form.
- Right card: `quote-wizard.tsx` with data in `quote-data.ts`. Purpose,
  services (pre-checked from the purpose), homes, how often, then a range that
  is the live list prices added up (read from Aryeo 2026-11-16). The request
  posts to the existing `/api/lead` route with no change to that route: the
  contact is saved in the CRM with tag `quote-request` and a note listing what
  they picked, the range they saw and which of our programs fits ("Our fit").
  Tested with the network call stubbed; no test contact was created.
- The three fixed packages are folded under one row (`#fixed-packages`). Film
  stage links and the selling path in the quote open it.
- `rotating-word.tsx`: build, plan, frame, finish, deliver. Plain "build" on
  first paint and for reduced motion. Headline max size is 72px so it stays on
  two lines at desktop width.
- The carry calculator is off the page (recommendation: it argues for selling
  one house faster, the page is about being known for the work, and the same
  idea already lives in the CARRY carousel). `carry-calculator.tsx` is still
  in the folder in case Thomas wants it back.
- Before release: Thomas confirms the Market Your Build name and price basis,
  and confirms the request reaches him (a CRM notification on the
  `quote-request` tag).

## Folded quote, fitted headline word, builder tag (2026-11-16, fifth pass)

Thomas's notes on the fourth pass, all applied on the preview branch.

- **Get a quote is folded on a phone.** Below the `lg` breakpoint the quote card shows a short teaser and one button ("Start my quote"). Tapping it, the sticky "Get a quote" button, or any link to `#quote` opens the questions in place. On a wide screen the questions are always open beside Market Your Build.
- **The builder shot list is a dropdown on a phone** (closed by default, "9 shots"). Always open on a wide screen.
- **The headline word window fits the word.** `rotating-word.tsx` measures each word once (in em, again after the font loads) and animates the window's width to the current word. First render is still the plain word "build".
- **Scroll cue is amber.** `Scroll to build` uses `amber-consult` with a down arrow. Thomas made this a kit rule on 2026-11-16: amber is allowed for one scroll cue per page. The design system artifact, `globals.css` and the vault summary carry it.
- **The "Illustration" label is gone** from the hero, phone and desktop, on Thomas's instruction. The film is still an AI-made illustration, not a client build.
- **Lead route (`src/app/api/lead/route.ts`).** Three changes, no change to the request or response shape other than one new optional field:
  - New optional `origin`. `origin: "builders"` adds the tag `builder-quote` beside `quote-request` and sets the source to `site-builders-quote`. Any other value changes nothing. The form cannot name its own tags.
  - Tags are no longer sent on the upsert. The CRM's upsert replaces every tag a contact already has (its API docs say so), so tags are now added with the add-tags call after the contact is saved. If that call fails the visitor sees the error line, because the tag is what starts the alert.
  - The quote summary is also written to a contact field with the key `site_quote_summary`, so a workflow can put it in an alert email (a workflow cannot read a note). The field has to be created in the CRM; until then that one write fails quietly and the note still carries the text.
- **Not changed, flagged:** `src/app/api/stripe/webhook/route.ts` still sends tags on its upsert, so by the same docs a returning buyer's tags are replaced. It is billing code, left alone here.
- **CRM side still to build (not in this repo):** no workflow listens for `quote-request` or `builder-quote` today. The alert workflow and the summary field are a CRM job.
- **Checked against the live CRM (2026-11-16)** with `scripts/test-lead-local.sh`, which runs the built site locally with the CRM keys and posts one request as the Inspector Brown test contact: status 200, the contact's four existing tags were kept, `quote-request` and `builder-quote` were added, the source became `site-builders-quote`, the note landed, and the summary field write returned OK even though the field does not exist yet (the CRM accepts an unknown key without an error). Test tags were removed afterward; the note is marked TEST.
- **Preview deployments cannot save a quote.** `GHL_LOCATION_ID` is not set for the Preview environment in Vercel (runtime log, 2026-11-16), so the form shows its error line on any preview link. Production is where it will work.

## Release candidate (2026-11-16, afternoon)

- Thomas approved the look on his phone and confirmed the five headline words (build, plan, frame, finish, deliver).
- Main (0d9406b, token removal in setup scripts) merged into the branch; tsc, eslint and build pass.
- Not released. Thomas's go is needed for the exact revision before any merge to main.
- After release: send one quote as the test contact from the live page, confirm the alert email, clean up the test contact's tags.
