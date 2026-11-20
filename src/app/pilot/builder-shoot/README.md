# Booking pilot: builder one-off shoot (option C). Preview only

Design: `~/ab/notes/booking-c-tests-2026-11-20/PILOT-DESIGN.md`. Branch
`pilot/booking-builder-shoot`, never merged.

## Where it runs
- Route `/pilot/builder-shoot`. `noindex, nofollow`, linked from nowhere.
- 404 on Vercel production (`VERCEL_ENV === "production"`), in the page and in
  every server action, so even an accidental merge shows nothing live.

## The switch
- `PILOT_LIVE_CREATE` (server only) gates every Aryeo write and any Stripe
  call. It is unset everywhere. Only `1` or `true` turns it on.
- Unset: step 5 shows the exact requests a booking would send (method, path,
  body) and sends none. `executeCreatePlan` in `src/lib/pilot-booking/core.ts`
  returns before touching fetch; a unit test proves it with a fake fetch.
- Reads (products, team members, customer lookup, availability) always run.

## Drive time: the main thing the supervised live test must prove
Aryeo only applies drive time when the availability call carries an order
with an address. The dry run cannot create a draft order, so it reads
availability WITHOUT an order and the time step says "Preview: times not yet
address-checked". With the switch on, the flow creates the order first, then
re-reads `/scheduling/available-timeslots` with `order_id` for the assigned
shooter and stops before the appointment if the chosen time is gone. That
re-check is the step the live test has to watch. If it fails, an order exists
with no appointment and needs cleanup by hand.

## Rule 40 (one pure function, `rule40` in core.ts)
a. Customer found by exact email with `has_restricted_photographers`: Thomas's times only.
b. Otherwise Cayden's times; if he has any that day, only his are shown.
c. Only if Cayden has none that day, Thomas's.
Both empty: no times plus the closest other open days. Team member ids are
read by name from `/company-team-members` at runtime.

## Known gaps, flagged
- Tax: the Aryeo API gives no tax figure before an order exists, so the review
  step shows "Arkansas sales tax: added at confirmation". The deposit is 50
  percent of the pre-tax total.
- Stripe: there is no `STRIPE_TEST_SECRET_KEY` locally, so deposit collection
  is a clearly marked STUB. A live run stops at the stub, after the
  appointment and before `POST /orders/{id}/payments`. No Stripe key is read.
- `POST /customers` body (name, email, phone) is not yet proven against
  Aryeo; the other write shapes match the verified ones.
- Address coordinates: a live run geocodes through OpenStreetMap Nominatim
  (as the local Aryeo tools do); the dry run shows placeholders.
- No Google Places key is wired for the browser, so the address is plain fields.
- Product ids are pinned to the 2026 line on the Builders form
  (`PILOT_PRODUCT_IDS`); names, prices and durations are read live.

## Tests
`node --test src/lib/pilot-booking/core.test.mjs` (Node 22.18 or newer strips
the types itself; no packages).

## Local run
`npm run dev`. With no `ARYEO_API_KEY` in the environment, a local dev server
reads the key from the file the local Aryeo tools use (`ARYEO_KEY_FILE`,
default `~/autohdr-bridge/.env`). Never on Vercel, never in a production build,
never logged.
