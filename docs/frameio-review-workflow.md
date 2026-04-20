# Frame.io Review Workflow (Path A — manual)

How client file review works for The Spot video/podcast sessions.

Frame.io doesn't expose an API token from within its UI — V4 requires Adobe Developer Console OAuth setup (Path C, documented at the bottom). Path A is the zero-auth workflow that ships today.

---

## Why Frame.io here (and not Aryeo)

- **Aryeo Client Portal** → real estate media delivery (listing photos, drone stills, 3D tours). Agents + brokerages.
- **Frame.io** → video/podcast review + approval. Studio members + one-time studio bookings.

Two different customer types, two different portals. Clients don't need to bounce between them.

---

## One-time GHL setup — already done

Custom field created via API on 2026-04-20:

- **Name:** `Frame.io Review URL`
- **GHL ID:** `uNBduZNieAZmIKsXbqt7`
- **Field key:** `contact.frameio_review_url` *(GHL normalized — no underscore between frame + io)*
- **Type:** TEXT
- **Model:** contact

The "Files Ready to Review" email template reads from it via merge tag `{{contact.frameio_review_url}}`.

No manual GHL UI work needed unless you want to rename it.

### (Optional) Create the trigger tag

If you want the "Files Ready" email to fire automatically when you add a tag instead of sending manually:

- Create tag `studio:review-ready` (just apply it to one test contact to initialize — GHL auto-creates tags)
- Build a workflow that triggers on tag `studio:review-ready` → sends email template `AB · Studio — Files Ready to Review` (`69e65acd79eb79452b993ebd`)

---

## Per-customer workflow (after every studio session)

1. **Finish the edit.**
2. In Frame.io (next.frame.io):
   - Open your Projects
   - Create a new project OR folder. Naming convention suggestion: `{Last name} — {session type} — {YYYY-MM-DD}` (example: `Hollis — Podcast 2hr — 2026-04-21`)
   - Upload the edited files
3. **Generate a share link:**
   - Click the Share button on the project/folder
   - Set it to **Review** (comment + approve enabled)
   - Set expiration if you want — or leave open until they approve
   - Copy the URL (something like `https://next.frame.io/reviews/abc-123...`)
4. **Paste into GHL:**
   - Search for the contact in GHL (by email)
   - Scroll to Custom Fields → **Frame.io Review URL** → paste the link → save
5. **Trigger the email:**
   - Apply the tag `studio:review-ready` to the contact → workflow fires → email goes out
   - OR manually send the email template from the contact conversation view

---

## What the customer sees

- Receives "Your files are ready, {FirstName}" email
- Prominent crimson "Open my review space" CTA
- Lands on Frame.io's hosted review page (email gate, no account required)
- Plays clips, drops timestamped comments, approves what's final
- If they approve → they're done. If they request revisions → we see comments in Frame.io, bundle them for next pass.

---

## Path C (future, automated)

When volume justifies the setup work, swap Path A for full automation:

1. Create Adobe Developer Console project at `developer.adobe.com/console`
2. Add Frame.io API → configure OAuth Server-to-Server Credentials
3. Grab `IMS_CLIENT_ID`, `IMS_CLIENT_SECRET`, tech account details
4. Add these to Vercel env
5. I build `src/lib/frameio.ts` with IMS token-refresh + V4 API helpers
6. Hook into existing Stripe webhook:
   - On `checkout.session.completed` → auto-create Frame.io project + share link
   - Write the link back to contact's `frameio_review_url` custom field
7. Thomas's workflow shrinks to: upload edits → tag contact → done

Scoped as a ~45 min build once you have the Adobe credentials. Current code paths (webhook, email template, custom field) already assume this field gets populated — so the Path A → Path C upgrade is additive, not destructive.

---

## Status

- ✅ Email template created: `69e65acd79eb79452b993ebd` ("AB · Studio — Files Ready to Review") — uses merge tag `{{contact.frameio_review_url}}`
- ✅ Custom field created in GHL via API: `uNBduZNieAZmIKsXbqt7` / field key `contact.frameio_review_url`
- ✅ Source template script updated (`scripts/ghl/email-templates.mjs`) so regeneration is consistent
- ⏳ **You do once per session:** Upload to Frame.io → create share link → paste into GHL contact's "Frame.io Review URL" field → trigger email

Path A fully operational. Ready to use immediately on the next studio session.
