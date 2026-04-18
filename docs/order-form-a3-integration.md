# A3: Native Order Form → Aryeo Integration

**Status:** Scaffolded and deployed to `averyandbryant-site.vercel.app`. Not yet end-to-end tested (blocked on `ARYEO_API_KEY`).

**Owners:** Avery & Bryant (marketing site), Aryeo (orders system of record), GHL (CRM / chat / nurture).

---

## What this is

A native booking form on `averyandbryant.com/order/<vertical>` that captures contact + address, then hands off to Aryeo's prefilled order form to finish scheduling and payment. Orders land **natively in Aryeo** — no double-entry into GHL.

## Why A3 (not A1 or A2)

| Option | How | Why we rejected |
| --- | --- | --- |
| **A1** — Native GHL form on site | Submit form → write to GHL, sales team re-enters into Aryeo | Double-entry, missed orders, broken pipeline when Aryeo is source of truth |
| **A2** — Pure external link to Aryeo | CTA just opens `homes.averyandbryant.com` | Jarring — user leaves our brand. No first-touch attribution. No prefill. |
| **A3** — Hybrid (this doc) | Native-feeling form → server calls Aryeo `/order-form-sessions` → redirects to prefilled Aryeo form | Keeps brand on our side for the start, Aryeo's precision on the back half, single system of record |

## User flow

```
Click "Book Now" on any vertical page (e.g. /real-estate)
  │
  ▼
Lands on /order/<vertical>   (native dark-themed form on our domain)
  │
  ├─ Fields: first/last name, email*, phone, street #, street name, city, state, ZIP
  │
  ▼
Submits form
  │
  ▼
Server Action POSTs to Aryeo  POST https://api.aryeo.com/v1/order-form-sessions
  │  Body: { order_form_id, customer_data, address_data }
  │
  ▼
Aryeo returns  { data: { url: "..." } }
  │
  ▼
redirect(url)  — user lands on Aryeo's prefilled form for that vertical
  │
  ▼
User finishes scheduling + payment in Aryeo
  │
  ▼
Order lands in Aryeo natively.
```

*Email is the only required field.*

## File map

| File | Role |
| --- | --- |
| `src/app/order/[vertical]/page.tsx` | Dynamic route per vertical. Renders form + per-vertical heading/subtitle. 404 on unknown vertical. `generateStaticParams` pre-renders all 5. |
| `src/app/order/[vertical]/actions.ts` | Server Action `submitOrder`. Validates, calls Aryeo, redirects to returned URL. Returns `{ error }` on failure. |
| `src/components/order-form.tsx` | Client form UI. Uses `useActionState`. Disables fields while pending. Renders error alert. |
| `src/lib/aryeo.ts` | Server-only helper. `createOrderFormSession({ vertical, customer, address, successUrl })` → returns Aryeo URL. Throws `AryeoApiError` with status+body on failure. |
| `src/lib/order-forms.ts` | Single source of truth: vertical name → Aryeo form UUID. |
| `src/components/order-link.tsx` | Every vertical page's "Book Now" button. Renders `<a href="/order/<vertical>">` enriched with UTMs + source tag. |
| `src/components/utm-capture.tsx` | Mounted in layout. Captures `utm_*`/`gclid`/`fbclid` on first page view, stores in sessionStorage. `enrichHref` reads it back when building order links. |

## Aryeo API shape

**Endpoint:** `POST https://api.aryeo.com/v1/order-form-sessions`
**Auth:** `Authorization: Bearer ${ARYEO_API_KEY}`

**Request body (what we send):**
```json
{
  "order_form_id": "01918da6-2d38-7375-8fe1-96d7d74f812a",
  "customer_data": {
    "email": "agent@example.com",
    "first_name": "Jane",
    "last_name": "Agent",
    "phone": "+15015551234"
  },
  "address_data": {
    "street_number": "123",
    "street_name": "Main St",
    "city": "Little Rock",
    "state_or_province": "AR",
    "postal_code": "72211"
  }
}
```

**Response (201):**
```json
{
  "data": {
    "url": "https://homes.averyandbryant.com/order-form-sessions/<session-uuid>"
  }
}
```

We redirect the browser to `data.url`. Aryeo's form loads with everything prefilled.

**Fields available but NOT currently sent** (from Aryeo schema):
- `address_id` / `customer_id` (UUIDs to reuse existing records)
- `customer_group_id`
- `coupon_ids: []`
- `step_visibility: { show_address_step, show_customer_step }`  ← could hide the steps Aryeo already has from our form
- `success_url` ← where Aryeo sends the user after they complete the Aryeo flow (e.g. back to averyandbryant.com/thank-you)

## Vertical → Aryeo form UUID map

Source of truth: `src/lib/order-forms.ts`.

| Vertical | Aryeo form UUID |
| --- | --- |
| `real-estate` | `01918da6-2d38-7375-8fe1-96d7d74f812a` |
| `builders` | `01914ab4-8713-72aa-b503-63ed6d4a11a5` |
| `airbnb-rentals` | `01918dcc-0824-72a8-abbe-61a9c9d9edb1` |
| `lot-land` | `d6f632d8-1b59-4163-a63a-aeff8decce83` |
| `multi-family` | `01914ab7-5488-710c-b2c9-62a929eed936` |
| `branding` | **missing — decision needed** |

## Form field strategy (native side)

**Default: keep the native form generic. Let Aryeo collect vertical-specific info.**

The native form asks for 5 things: name, email (required), phone, address. That's identity + where. Everything else — square footage tiers, acreage, unit count, drone yes/no, twilight shoot, add-ons, conditional pricing — lives in the Aryeo form for each vertical. Aryeo is the source of truth for what a given vertical actually needs.

**Why we don't ask more on our side:**
1. Avoids double-asking (user types address here, then again in Aryeo if prefill fails).
2. Avoids re-implementing Aryeo's pricing/conditional logic on the marketing side — that logic changes and should live in one place.
3. Keeps the A3 value prop intact: native start, Aryeo precision on the back half.

**Where per-vertical tweaks COULD make sense (deferred until evidence):**
- **Lot & Land** — raw land often has no street address yet. Could swap "Street #/name" for "County + approximate location." *Defer: Aryeo's form handles this today.*
- **Multi-Family** — "address" is usually a property name ("The Heights at Cantrell"), not a unit. Could add "Property name" as a first-class field. *Defer: same reason.*
- **Branding** — personal branding shoots don't need an address at all. *If branding joins the order flow, strip the address fieldset for this vertical.*

**Heuristic for changes:** if the Aryeo form already asks for it well, don't duplicate it on our side. Only add fields to the native form when **(a)** it affects which Aryeo form UUID we route to, **(b)** we need it for routing/analytics, or **(c)** Aryeo can't ask it cleanly.

## Attribution (UTM / source)

- `src/components/utm-capture.tsx` runs on mount in the root layout. Captures `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `fbclid` from the URL on first page load and stores them in `sessionStorage` under `ab_attribution_v1` (first-touch — won't overwrite).
- `src/lib/utm.ts → enrichHref()` reads that bucket back and appends the params to any order link so Aryeo's form session carries the attribution forward (currently visible via query string only — not piped into Aryeo's customer record).
- `OrderLink` always adds `source=averyandbryant.com&vertical=<name>` so we can tell marketing-site sessions apart from direct-to-Aryeo sessions in analytics.

**Future enhancement:** pipe UTMs into Aryeo `customer_data` as custom fields, or into `success_url` params, so the full attribution lands on the order record.

## Environment variables

| Name | Scope | Required? | Purpose |
| --- | --- | --- | --- |
| `ARYEO_API_KEY` | server | **required** | Bearer token for Aryeo API. Form errors visibly without it. |
| `ARYEO_API_BASE_URL` | server | optional | Defaults to `https://api.aryeo.com/v1`. Override for staging/sandbox. |
| `NEXT_PUBLIC_GHL_WIDGET_ID` | public | required for chat | GHL chat/voice widget. No widget renders without it. |
| `NEXT_PUBLIC_GTM_ID` | public | optional | Google Tag Manager. |
| `NEXT_PUBLIC_GA4_ID` | public | optional | Google Analytics 4. |
| `NEXT_PUBLIC_META_PIXEL_ID` | public | optional | Meta / Facebook Pixel. |
| `GOOGLE_PLACES_API_KEY` | server | optional | Pulls Google reviews onto home page. Section hides if unset. |
| `GOOGLE_PLACE_ID` | server | optional | Paired with above. |
| `NEXT_PUBLIC_GOOGLE_REVIEW_URL` | public | optional | "Leave a review" link in trust bar. Link hides if unset. |

Template in `.env.example`.

## Error handling

- **Missing `ARYEO_API_KEY`:** server throws `"ARYEO_API_KEY is not set"`. User sees *"We couldn't start your order. Please try again or call (501) 502-2925."*
- **Aryeo 4xx/5xx:** `AryeoApiError` logged server-side with status + response body. Same user-facing message.
- **Unexpected error:** generic message, full error logged server-side.
- **Unknown vertical in URL:** `/order/<bad>` returns 404 via `notFound()`.

## Deploy state

- `main` branch: merged, pushed (commit `64a154f`).
- Vercel deploy: `READY` on `averyandbryant-site.vercel.app`.
- Custom domain `averyandbryant.com`: **not yet pointed** at this Vercel project (`project.live === false`).
- Env vars in Vercel: **none set**. Must set at least `ARYEO_API_KEY` before the order flow works.

## Open decisions

1. **`branding` vertical — add or drop?** Currently no Aryeo form UUID. `/branding` page exists but has no `OrderLink` wired to `/order/<vertical>` (so nothing is broken). Two paths:
   - **Add:** create a branding form in Aryeo, paste UUID into `ORDER_FORMS` in `src/lib/order-forms.ts`, drop address fieldset for this vertical in the native form.
   - **Drop:** accept that branding doesn't route through the order flow. Keep CTAs on `/branding` pointing to a contact form or phone.

2. **Per-vertical native field tweaks** — deferred until we see real submission data. Revisit after 30 days of live traffic.

3. **Success page** — after the Aryeo form completes, do we bounce the user back to `averyandbryant.com/thank-you`? If yes, build `/thank-you` and pass `success_url` in the Aryeo request.

4. **Pipe UTMs into Aryeo customer record** — today UTMs ride in query string only. Consider mapping them to Aryeo customer custom fields so attribution survives on the order object.

## Testing checklist (pre-DNS-flip)

- [ ] Add `ARYEO_API_KEY` to Vercel env (production + preview).
- [ ] Trigger redeploy (any push to `main`, or `vercel --prod`).
- [ ] Visit `averyandbryant-site.vercel.app/order/real-estate`.
- [ ] Submit with a test email.
- [ ] Confirm redirect lands on a prefilled Aryeo form with email/name/address filled in.
- [ ] Repeat for each vertical.
- [ ] Confirm test orders appear in Aryeo dashboard.
- [ ] Confirm no duplicate in GHL (the whole point of A3).
- [ ] Add `NEXT_PUBLIC_GHL_WIDGET_ID` and verify chat widget loads on every page.
- [ ] (Optional) Set `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID` and verify reviews render on home page.
- [ ] Only then: flip DNS for `averyandbryant.com` to this Vercel project.
