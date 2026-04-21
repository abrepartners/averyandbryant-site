# GHL Client Onboarding Playbook

The exact moves to replicate everything we did on the A&B sub-account when
onboarding a new GHL sub-account (for our own clients, or for any future
A&B location). Ordered by dependency — do them top-to-bottom.

---

## 0) Before you start

Grab these from the new sub-account (Settings → My Staff → Private
Integrations → create new token, or use an agency-level PIT):

- **Location ID** — Settings → Business Profile URL shows it
- **API Token (PIT)** with at minimum these scopes:
  - `locations.write` (for the Business Profile update in step 2)
  - `locations/customValues.write`
  - `locations/customFields.write`
  - `emails.write` / `emails/builder.write`
  - `medias.write`
  - `contacts.write`
  - `calendars.write`

Export both as env vars before running anything:

```bash
export GHL_LOCATION_ID=<location-id>
export GHL_API_TOKEN=pit-<token>
```

---

## 1) Upload brand assets to GHL media library

Upload once, reference forever. Use multipart POST to `/medias/upload-file`.

Files to upload (three at minimum):
- `logo-mark-2500.png` — crimson mark, transparent
- `logo-mark-white-2500.png` — white mark, transparent (dark-bg emails)
- `logo-with-wordmark.png` — mark + "AVERY & BRYANT" wordmark

Each upload returns a CDN URL of the form:
`https://assets.cdn.filesafe.space/<locationId>/media/<uuid>.png`

Save those URLs — you'll paste them into the custom values in the next step.
The CDN URLs are also DNS-independent so emails work even before domain
cutover.

## 2) Update Location Business Profile

**PIT must have `locations.write` scope** — this fails otherwise.

```bash
curl -X PUT \
  -H "Authorization: Bearer $GHL_API_TOKEN" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "<Business Name>",
    "logoUrl": "<hosted logo URL>",
    "email": "<primary business email>",
    "postalCode": "<zip>"
  }' \
  "https://services.leadconnectorhq.com/locations/$GHL_LOCATION_ID"
```

This `logoUrl` field feeds into GHL's default/system emails (calendar
confirmations, appointment reminders, etc.).

## 3) Create Brand Custom Values

Location-level variables for logo URLs, contact info, social links. Edit
once, every branded email updates. 15 in total for A&B — adapt names/values
per client.

```bash
# Via MCP: mcp__ghl-mcp__create_custom_value (name, value)
# Or direct API: POST /locations/{id}/customValues  body: {name, value}
```

Create these 15 (rename as needed):

| Name | Example value | Purpose |
|---|---|---|
| Brand Business Name | `Avery & Bryant` | Email header + footer |
| Brand Email | `book@averyandbryant.com` | Footer email, mailto hrefs |
| Brand Phone | `(501) 502-2925` | Footer phone display |
| Brand Address | `12521 Kanis Rd, Little Rock, AR 72211` | Footer address |
| Brand Website URL | `https://averyandbryant.com` | Links (href value) |
| Brand Website Display | `averyandbryant.com` | Links (display text, no protocol) |
| Brand Primary Color | `#C41230` | Hex color for reference |
| Brand Logo URL | SVG URL (mark, color) | Logo (web, primary) |
| Brand Logo White URL | SVG URL (mark, white) | Logo (web, inverse) |
| Brand Logo Raster URL | PNG URL (mark, color) | Email logo (color) |
| Brand Logo White Raster URL | PNG URL (mark, white) | Email logo (dark-bg emails) |
| Brand Logo With Wordmark URL | PNG URL | Large hero-style composite |
| Brand Instagram URL | full URL | Social footer |
| Brand Facebook URL | full URL | Social footer |
| Brand YouTube URL | full URL | Social footer |

**Fieldkey pattern**: GHL normalizes names to snake_case. "Brand Email" →
`{{ custom_values.brand_email }}`.

## 4) Create Per-Contact Custom Fields

Contact-level properties for storing flow-specific data. Create what the
client's flows actually need. For A&B we use:

| Field key | Type | Purpose |
|---|---|---|
| `contact.studio_schedule_url` | TEXT | Calendar widget URL written by Stripe webhook post-payment |
| `contact.frameio_review_url` | TEXT | Frame.io share link for file-review emails |

Plus the Aryeo and referral fields already in the system (if the client
uses those integrations).

```bash
curl -X POST \
  -H "Authorization: Bearer $GHL_API_TOKEN" \
  -H "Version: 2021-04-15" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Studio Schedule URL",
    "dataType": "TEXT",
    "placeholder": "GHL calendar widget URL for the slot they bought"
  }' \
  "https://services.leadconnectorhq.com/locations/$GHL_LOCATION_ID/customFields"
```

Don't assume GHL will keep your exact `fieldKey` — it normalizes (e.g.
`frame_io` becomes `frameio` without the underscore). Always verify the
key by re-fetching the field after creation and using the actual returned
`fieldKey` in email merge tags.

## 5) Rebrand Default Email Templates

GHL ships a handful of pre-built templates that auto-fire on events
(invoice paid, abandoned cart, estimate received, document sent, etc.).
These NEED to be rebranded — customers see them. Plus any stock marketing
templates that came with the sub-account.

We wrote a reusable refactor script:

```bash
node scripts/ghl/rebrand-templates.mjs
```

It fetches each template's HTML via the Firebase preview URL, runs regex
replacements to swap hardcoded logos + contact info for `{{ custom_values.*
}}` merge tags, and PUTs back via `POST /emails/builder/data`.

Points the script at specific template IDs — update `TEMPLATE_IDS` in the
script per client. The regex patterns handle two common template
structures we've seen:

1. **AB-Studio style** — custom-built templates with the "A&B" crimson
   text badge in the header and a three-line footer (addr / phone+email /
   website)
2. **GHL stock / marketing style** — centered `<p>AVERY & BRYANT</p>`
   wordmark header, pipe-separated or br-separated footer

After running, verify one template in GHL UI renders correctly. If a new
template structure is encountered, add a new regex pair and re-run (the
script is idempotent).

### Update endpoint

```
POST https://services.leadconnectorhq.com/emails/builder/data
Body: {
  "locationId": "<loc>",
  "templateId": "<tid>",
  "html": "<full html>",
  "editorType": "html",
  "updatedBy": "<user-id>"   // real GHL user ID required
}
```

Get the `updatedBy` user ID from `mcp__ghl-mcp__get_users` — pick the
business owner's user ID.

## 6) Delete or Archive Unused Stock Templates

GHL ships templates for services we don't offer (e.g. "Content Marketing",
"SEO" agency boilerplate). Two options:

- **Keep them rebranded** — they're now A&B-safe, available as starting
  points for future campaigns
- **Delete** — `mcp__ghl-mcp__delete_email_template(template_id)`

For A&B we kept them rebranded. Cleaner option for simpler accounts: delete.

## 7) Install Visitor Tracking Script

If the client's website is separate from GHL-hosted funnels, drop in the
GHL external tracking script so anonymous visits stitch to contacts once
they identify themselves (form submit, booking, login).

Get the script snippet from GHL: Settings → Sites → Tracking Code, or
Advanced Features → External Tracking.

Paste into the site's root layout (Next.js: `src/app/layout.tsx`, use
`next/script` with `strategy="afterInteractive"`). We did this on A&B with:

```tsx
<Script
  id="ghl-tracking"
  src="https://link.averyandbryant.com/js/external-tracking.js"
  data-tracking-id="tk_5a641e0f012240c7bedc21fba0692d75"
  strategy="afterInteractive"
/>
```

## 8) Verification Checklist

Before marking the onboarding done, verify:

- [ ] Business Profile has the logo (check Settings → Business Profile)
- [ ] All 15 brand custom values exist and are populated
- [ ] All required custom fields exist (`contact.studio_schedule_url` etc.)
- [ ] At least one template rendered correctly in GHL preview (check header
  logo loads + footer contact matches custom values)
- [ ] A test email actually sends with the right branding (send to yourself)
- [ ] Tracking script loads on the public site (check DevTools → Network
  for the external-tracking.js request)
- [ ] `{{ custom_values.* }}` merge tags resolve, not shown literally —
  GHL does this at send time only, not in preview

## 9) Token rotation + cleanup

- After onboarding, store the PIT token in the client's password manager
  / secrets vault — not in a repo
- If the PIT token was created just for onboarding and won't be used
  going forward (runtime code uses a different, narrower token), delete
  the onboarding PIT to avoid leaked-credential risk
- Runtime tokens (for webhooks, etc.) should be narrower — only the
  scopes the runtime code actually uses

---

## References

- Live example of everything above: `scripts/ghl/rebrand-templates.mjs`
  and `src/app/api/stripe/webhook/route.ts`
- MCP tools used: `mcp__ghl-mcp__create_custom_value`, `*_custom_field`,
  `*_email_template`, `get_users`
- A&B specific values: see git history for brand custom values commit
  (`a00f317` — rebrand templates) and the full content of this file
