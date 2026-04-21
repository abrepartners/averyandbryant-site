# Stripe → GHL Webhook Flow

End-to-end trace of what happens when a customer pays on `/studio`.
This doc exists so Thomas, Jarvis, or a future dev can debug the flow
without re-reading the code.

**Implementation:** `src/app/api/stripe/webhook/route.ts`
**Endpoint:** `POST /api/stripe/webhook`
**Trigger:** Stripe `checkout.session.completed` events

---

## 1) The happy path

```
User clicks "Reserve & pay — 1hr"  on /studio
          ↓
Stripe Payment Link (pay.averyandbryant.com/b/...)
          ↓
Customer enters email, name, phone, card → pays
          ↓
Stripe sends checkout.session.completed → our webhook
          ↓
/api/stripe/webhook verifies signature (STRIPE_WEBHOOK_SECRET)
          ↓
Read session.metadata.tier  OR  session.metadata.product
          ↓
Map to tags (TIER_TAGS / PRODUCT_TAGS constants in webhook route)
          ↓
upsertContact() in src/lib/ghl.ts:
  - POST /contacts/upsert  (dedupe by email)
  - applies vertical:* + studio:* tags
          ↓
setCustomField(contactId, STUDIO_SCHEDULE_URL_FIELD_ID, <room-specific URL>)
  - Only for one-time bookings (not memberships)
  - Routes to the GHL calendar widget for the exact room they paid for
          ↓
enrollInWorkflow(contactId, workflowId):
  - Memberships → TIER_WORKFLOWS[tier] (one of 3 "Assign Credits *" flows)
  - Bookings → BOOKING_WORKFLOW_ID ("Aryeo → New Booking")
          ↓
GHL workflow fires its first action — an email
          ↓
Email contains CTA: {{ contact.studio_schedule_url }}
          ↓
Customer clicks → opens GHL calendar widget → picks a slot
          ↓
GHL creates appointment → "day-before reminder" + "post-shoot follow-up"
workflows fire automatically from appointment events
```

## 2) Stripe metadata → GHL tag mapping

Defined at the top of `route.ts`. The tag-based design means GHL workflows
can be triggered on tag names without needing code changes when we add
a new product.

### Tier tags (memberships — recurring subscription)

| Stripe metadata.tier | Tags applied |
|---|---|
| `creator-lite` | `vertical:studio`, `studio:member`, `studio:tier-creator-lite` |
| `creator` | `vertical:studio`, `studio:member`, `studio:tier-creator` |
| `pro` | `vertical:studio`, `studio:member`, `studio:tier-pro` |

### Product tags (one-time bookings)

| Stripe metadata.product | Tags applied |
|---|---|
| `podcast-1hr` | `vertical:studio`, `studio:booking`, `studio:podcast-1hr` |
| `podcast-2hr` | `vertical:studio`, `studio:booking`, `studio:podcast-2hr` |
| `podcast-half-day` | `vertical:studio`, `studio:booking`, `studio:podcast-half` |
| `alternate-set` | `vertical:studio`, `studio:booking`, `studio:alternate-set` |
| `multi-set-day` | `vertical:studio`, `studio:booking`, `studio:multi-set-day` |

If metadata is missing entirely (shouldn't happen — all Payment Links are
created with metadata), contact still gets `vertical:studio`, `studio:other`.

## 3) Schedule URL routing

The `contact.studio_schedule_url` custom field (ID `MeyPRVtDcNwSFyoh89ma`)
gets populated from `PRODUCT_SCHEDULE_URL` in the webhook route:

| Product | Calendar widget URL written |
|---|---|
| `podcast-1hr` | `https://api.leadconnectorhq.com/widget/booking/7ITuyoouCVIHPpd9g7BX` |
| `podcast-2hr` | `.../widget/booking/9g4b8uFBR4KmJNWJwv9a` |
| `podcast-half-day` | `.../widget/booking/J0gqnGTQFA8eD4EoFHwl` |
| `alternate-set` | `.../widget/booking/gZIylqnwF2olLvPrqWqR` |
| `multi-set-day` | `.../widget/booking/oaOY7LqfIC87tAy881wE` |

The "Scheduling Link After Payment" email template embeds this via
`{{ contact.studio_schedule_url }}` — one template, dynamic per-product
destination. No branching required.

## 4) Workflow enrollment

Workflows in GHL must be **published** (not drafts) before enrollment
does anything. Enrolling a contact in an unpublished workflow
succeeds silently.

| Tier / Product | Workflow ID | Workflow name |
|---|---|---|
| `creator-lite` | `8185e8b3-b5a8-4501-a0b7-a3ca5f15dcff` | Assign Credits Creator Lite |
| `creator` | `f30f7796-155a-4667-88e6-34e471bcffa5` | Assign Credits Creator |
| `pro` | `bf3324aa-5189-4a1e-82db-fbef73da39e9` | Assign Credits Pro |
| any `product` (booking) | `5a1c01c0-8380-4790-8a3c-e405ac503a87` | Aryeo → New Booking |

⚠️ **Known gap:** the booking workflow is currently called "Aryeo → New
Booking" which was the Aryeo real-estate shoot flow repurposed for
studio bookings. When time allows, split into a dedicated "Studio →
New Booking" workflow.

## 5) Error paths + fallback behavior

| What fails | What happens |
|---|---|
| No `stripe-signature` header | 400, no processing |
| Signature verify fails | 400, logged |
| Event type isn't `checkout.session.completed` | 200 `{ignored: eventType}`, no processing |
| No email on session | 200 `{warning: "no email"}` — nothing to upsert |
| GHL `upsertContact` fails | 500, logged — Stripe will retry per its usual schedule |
| `setCustomField` fails | Logged, but not fatal — contact still created with tags |
| `enrollInWorkflow` fails | Logged, but not fatal — tags alone may still trigger downstream workflows |

Stripe retries failed webhook deliveries automatically. Our handler is
idempotent because `upsertContact` dedupes by email.

## 6) How to test end-to-end

1. Make sure `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `GHL_API_TOKEN`,
   `GHL_LOCATION_ID` are all set in Vercel Production env
2. Trigger a test checkout on the live site (use a real test Stripe
   card or a $0 Payment Link you temporarily create)
3. Watch Vercel logs:
   ```bash
   npx vercel logs --prod | grep stripe-webhook
   ```
   Expected lines:
   - `[stripe-webhook] upserted contact <id> tags <array>`
   - `[stripe-webhook] enrolled <id> in workflow <id>`
4. In GHL, find the contact and verify:
   - Tags applied (Contacts → search → Tags section)
   - `Studio Schedule URL` custom field populated with the correct URL
   - Workflow history shows the enrollment
5. Check their inbox for the branded email (should arrive within 1-2 min)
6. Click the CTA — calendar widget should load for the specific room

Task [#14 in TodoWrite](../docs/launch-status.md) tracks this end-to-end
test.

## 7) Key code locations

| Concern | Path |
|---|---|
| Route handler | `src/app/api/stripe/webhook/route.ts` |
| GHL helpers (upsert, tag, field, enroll) | `src/lib/ghl.ts` |
| Stripe Payment Link URLs used in /studio | `src/app/studio/page.tsx` (constants at top) |
| Tag → workflow mapping (docs) | this file, Section 4 |
| Custom field map | `src/app/api/stripe/webhook/route.ts` lines 51-58 |

## 8) Adding a new product

When a new Stripe Payment Link is created (e.g. a 6hr Podcast Room):

1. Add to `PRODUCT_TAGS` in the webhook route (slug → tag array)
2. Create the matching GHL calendar widget (or reuse existing), capture ID
3. Add to `PRODUCT_SCHEDULE_URL` (slug → widget URL)
4. If it needs its own workflow (not `BOOKING_WORKFLOW_ID`), add to a
   new mapping or extend the switch
5. Update /studio page with the new `<OrderLink>` + slug
6. Deploy

## 9) Adding a new membership tier

Similar to above, but the enrollment map is `TIER_WORKFLOWS`.

1. Stripe: create a recurring Price at the new rate
2. Create new Payment Link pointing at that Price, set `metadata.tier = <slug>`
3. Add the slug to `TIER_TAGS` + `TIER_WORKFLOWS` in the webhook route
4. Create the matching workflow in GHL (start: tag added, actions:
   initial welcome email, credit assignment, etc.)
5. Add the new tier card to `src/app/studio/page.tsx` memberships array
6. Deploy
