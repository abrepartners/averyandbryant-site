# Avery & Bryant - GHL Referral Program Workflow Specification

**GHL Location ID:** `yVbHA1nN5OxYyVheIBbv`
**Last Updated:** 2026-04-14
**Owner:** Thomas (Avery & Bryant)

---

## Prerequisites

### Custom Fields to Create in GHL

Create these under **Settings > Custom Fields** before building any workflows.

| Field Name               | Field Key              | Type     | Applied To       | Notes                                       |
|--------------------------|------------------------|----------|------------------|----------------------------------------------|
| Referred By              | `referred_by`          | Text     | Contact (Client) | Stores the referrer's full name              |
| Referrer Contact ID      | `referrer_contact_id`  | Text     | Contact (Client) | Stores GHL contact ID of the matched referrer|
| Total Referrals          | `total_referrals`      | Number   | Contact (Referrer)| Lifetime count of completed referrals        |
| Total Referral Earnings  | `total_referral_earnings`| Currency| Contact (Referrer)| Lifetime payout total                        |
| Referral Status          | `referral_status`      | Dropdown | Contact (Referrer)| Options: Active, Payout Pending, Paid        |

### Tags to Create

Create these under **Settings > Tags** (or they will auto-create when first applied).

| Tag               | Purpose                                         |
|--------------------|------------------------------------------------|
| `referred-client`  | Applied to clients who were referred            |
| `active-referrer`  | Applied to contacts who have referred someone   |
| `needs-info`       | Referrer was not in GHL; needs payment details  |
| `payout-pending`   | Referral delivered, payout not yet sent          |

### Pipeline (Optional)

Create a pipeline named **Referral Pipeline** under **Opportunities > Pipelines**.

| Stage           | Order |
|-----------------|-------|
| New Referral    | 1     |
| Shoot Booked    | 2     |
| Shoot Complete  | 3     |
| Payout Sent     | 4     |

---

## Workflow 1: New Referral Received

**Purpose:** When a new Aryeo order comes in and the client indicated they were referred, tag the client, identify the referrer, and notify them.

### Trigger

- **Type:** Workflow Trigger > Contact Tag Added
- **Tag:** Use the tag that your Aryeo-to-GHL webhook applies when the "How'd you hear about us?" field equals "Referral." If the Aryeo webhook sets a custom field instead of a tag, use **Custom Field Changed** as the trigger with the condition: `how_heard_about_us` equals `Referral`.

> **Implementation Note:** The Aryeo webhook currently creates contacts/opportunities in GHL. You need to confirm that the "How'd you hear about us?" value maps to a GHL custom field. If it does not, add a step in your Aryeo webhook handler (the Vercel bridge) to set a custom field or apply a tag when the value is "Referral."

### Step-by-Step Actions

#### Step 1: Tag the New Client

- **Action Type:** Add Tag
- **Tag:** `referred-client`
- **Applied To:** Trigger contact (the new client)

#### Step 2: Set the "Referred By" Custom Field

- **Action Type:** Update Contact Field
- **Field:** `referred_by`
- **Value:** `{{contact.custom_field.referral_name}}` (the free-text field from Aryeo: "If referred by an agent or 'other', share their name...")

> **Note:** The exact custom field key depends on how the Aryeo webhook maps this field into GHL. Confirm the field key in your GHL custom fields list.

#### Step 3: Internal Notification - Referral Received

- **Action Type:** Internal Notification (Email or GHL notification)
- **Send To:** Thomas
- **Message:**
  ```
  New referral received.
  Client: {{contact.first_name}} {{contact.last_name}}
  Referred by: {{contact.custom_field.referred_by}}
  Order Date: {{contact.date_created}}
  ```

#### Step 4: If/Else Branch - Does the Referrer Exist?

- **Action Type:** If/Else Condition
- **Condition:** Search contacts where `contact.name` contains `{{contact.custom_field.referred_by}}`

> **GHL Limitation:** GHL workflows do not have a native "search contacts by name" action. Use one of these workarounds:
>
> **Option A (Recommended):** Use a **Custom Webhook** action to call the GHL API:
> ```
> GET https://services.leadconnectorhq.com/contacts/
> Query params: query={{contact.custom_field.referred_by}}&locationId=yVbHA1nN5OxYyVheIBbv
> Header: Authorization: Bearer {{your_api_key}}
> ```
> Parse the response. If results > 0, proceed to the "Referrer Found" branch. If results = 0, proceed to "Referrer Not Found."
>
> **Option B:** Use a Zapier/Make intermediary to search GHL contacts and return the result.

---

### Branch A: Referrer Found

#### Step 4a-1: Tag the Referrer

- **Action Type:** Add Tag (via API or sub-workflow triggered on the referrer contact)
- **Tag:** `active-referrer`
- **Applied To:** The referrer's contact

#### Step 4a-2: Add Note to Referrer Contact

- **Action Type:** Add Contact Note (via API)
- **Note Text:**
  ```
  Referred {{contact.first_name}} {{contact.last_name}} on {{current_date}}. Order pending.
  ```

#### Step 4a-3: Store Referrer Contact ID on Client

- **Action Type:** Update Contact Field
- **Field:** `referrer_contact_id`
- **Value:** The referrer's GHL contact ID (from the API search response)

#### Step 4a-4: Send Referrer SMS

- **Action Type:** Send SMS
- **To:** Referrer's phone number
- **Message:**
  ```
  Hey {{referrer.first_name}}! Someone you referred just booked a shoot with us. We'll let you know when it's complete so we can get you paid. - A&B Team
  ```

#### Step 4a-5: Update Referral Pipeline (Optional)

- **Action Type:** Create/Update Opportunity
- **Pipeline:** Referral Pipeline
- **Stage:** New Referral
- **Opportunity Name:** `Referral: {{referrer.name}} > {{client.name}}`

---

### Branch B: Referrer Not Found

#### Step 4b-1: Create New Contact for Referrer

- **Action Type:** Create Contact (via API or webhook)
- **First Name:** Parsed from `{{contact.custom_field.referred_by}}` (first word)
- **Last Name:** Parsed from `{{contact.custom_field.referred_by}}` (remaining words)
- **Tags:** `active-referrer`, `needs-info`

#### Step 4b-2: Store Referrer Contact ID on Client

- **Action Type:** Update Contact Field
- **Field:** `referrer_contact_id`
- **Value:** The newly created referrer's GHL contact ID

#### Step 4b-3: Send Internal Notification to Thomas

- **Action Type:** Internal Notification
- **Send To:** Thomas
- **Channel:** SMS or GHL notification
- **Message:**
  ```
  New referral from unknown contact: {{contact.custom_field.referred_by}}. They referred {{contact.first_name}} {{contact.last_name}}. Need their phone number and payment info to complete the referral setup.
  ```

---

## Workflow 2: Referral Payout Trigger

**Purpose:** When a referred client's order is delivered, notify the referrer and create a payout task.

### Trigger

- **Type:** Opportunity Stage Changed
- **Pipeline:** (Your main Aryeo orders pipeline)
- **Stage moved to:** Delivered
- **Filter:** Contact has tag `referred-client`

### Step-by-Step Actions

#### Step 1: Look Up the Referrer

- **Action Type:** Custom Webhook (GHL API)
- **Endpoint:** `GET https://services.leadconnectorhq.com/contacts/{{contact.custom_field.referrer_contact_id}}`
- **Purpose:** Retrieve the referrer's name, phone, and email for the notification steps below.

#### Step 2: Send Referrer SMS

- **Action Type:** Send SMS
- **To:** Referrer's phone number
- **Message:**
  ```
  Great news, {{referrer.first_name}}! The shoot for {{contact.first_name}} {{contact.last_name}} is complete and delivered. Your referral payout is being processed. Thanks for trusting us with your people. - A&B Team
  ```

#### Step 3: Send Referrer Email

- **Action Type:** Send Email
- **To:** Referrer's email
- **Subject:** Your Referral Payout Is Being Processed
- **Body:**
  ```
  Hey {{referrer.first_name}},

  Great news -- the shoot you referred is complete and delivered.

  Here are the details:

  Client: {{contact.first_name}} {{contact.last_name}}
  Order Value: ${{opportunity.monetary_value}}
  Your Referral Payout: Being processed

  We appreciate you sending people our way. Every referral you make earns you cash, and there is no cap on how much you can earn.

  Keep them coming.

  -- The A&B Team
  Avery & Bryant
  averyandbryant.com
  ```

#### Step 4: Create Task for Thomas

- **Action Type:** Create Task
- **Title:** `Process referral payout for {{referrer.first_name}} {{referrer.last_name}}`
- **Description:**
  ```
  Referrer: {{referrer.first_name}} {{referrer.last_name}}
  Referred Client: {{contact.first_name}} {{contact.last_name}}
  Order Value: ${{opportunity.monetary_value}}
  
  Action: Send referral payout, then trigger Workflow 3 (Referral Payout Completed) on the referrer's contact.
  ```
- **Assigned To:** Thomas
- **Due Date:** 3 business days from now

#### Step 5: Tag Referrer

- **Action Type:** Add Tag (via API on referrer contact)
- **Tag:** `payout-pending`

#### Step 6: Update Referrer Status

- **Action Type:** Update Contact Field (via API on referrer contact)
- **Field:** `referral_status`
- **Value:** `Payout Pending`

#### Step 7: Update Referral Pipeline (Optional)

- **Action Type:** Update Opportunity
- **Pipeline:** Referral Pipeline
- **Stage:** Shoot Complete

---

## Workflow 3: Referral Payout Completed

**Purpose:** After Thomas sends the payout, this workflow updates records and notifies the referrer.

### Trigger

- **Type:** Manual Action (Thomas triggers this on the referrer's contact)
- **Method:** Either:
  - A **Manual Trigger** button in the workflow (Thomas opens the referrer's contact, clicks "Trigger Workflow," and selects this one), OR
  - Tag-based: Thomas adds tag `payout-just-sent` to the referrer, which triggers this workflow. The workflow removes the tag after running.

### Step-by-Step Actions

#### Step 1: Remove "payout-pending" Tag

- **Action Type:** Remove Tag
- **Tag:** `payout-pending`

#### Step 2: Add Date-Stamped Payout Tag

- **Action Type:** Add Tag
- **Tag:** `payout-completed-{{current_date}}` (e.g., `payout-completed-2026-04-14`)

#### Step 3: Update Referral Status

- **Action Type:** Update Contact Field
- **Field:** `referral_status`
- **Value:** `Paid`

#### Step 4: Increment Total Referrals

- **Action Type:** Math Operation / Update Contact Field
- **Field:** `total_referrals`
- **Value:** `{{contact.custom_field.total_referrals}} + 1`

> **GHL Note:** GHL does not natively support math operations on custom fields in workflows. Use a **Custom Webhook** to call the GHL API and update the value:
> ```
> PUT https://services.leadconnectorhq.com/contacts/{{contact.id}}
> Body: { "customFields": [{ "key": "total_referrals", "value": {{current_value + 1}} }] }
> ```
> Alternatively, use a Zapier/Make step to handle the increment.

#### Step 5: Increment Total Referral Earnings

- **Action Type:** Math Operation / Update Contact Field
- **Field:** `total_referral_earnings`
- **Value:** `{{contact.custom_field.total_referral_earnings}} + {{payout_amount}}`

> **Note:** The payout amount needs to be passed into this workflow. If using the manual trigger method, add a custom field `last_payout_amount` that Thomas fills in before triggering the workflow.

#### Step 6: Send Referrer SMS

- **Action Type:** Send SMS
- **To:** Contact's phone number (the referrer)
- **Message:**
  ```
  Your referral payout has been sent! Thanks for spreading the word. Remember, there is no cap -- keep them coming. - A&B Team
  ```

#### Step 7: Remove Trigger Tag (if using tag-based trigger)

- **Action Type:** Remove Tag
- **Tag:** `payout-just-sent`

---

## Workflow 4: Quarterly Referral Recap

**Purpose:** Every quarter, send referrers a recap of their earnings or a re-engagement nudge.

### Trigger

- **Type:** Date/Schedule
- **Schedule:** First Monday of January, April, July, October
- **Time:** 10:00 AM CT

> **GHL Note:** GHL does not have a native "first Monday of month" cron. Set this up as a **recurring workflow** that runs on the 1st of Jan/Apr/Jul/Oct, or use an external scheduler (Zapier/Make/cron job) to trigger the workflow via webhook on the correct dates.

### Step-by-Step Actions

#### Step 1: Find All Active Referrers

- **Action Type:** Custom Webhook (GHL API)
- **Endpoint:** `GET https://services.leadconnectorhq.com/contacts/?locationId=yVbHA1nN5OxYyVheIBbv&tags=active-referrer`
- **Purpose:** Retrieve all contacts with the `active-referrer` tag.

> **Alternative:** Create a GHL Smart List filtered by tag `active-referrer`, then use the Smart List as the workflow enrollment trigger.

#### Step 2: If/Else Branch - Referrals This Quarter?

- **Condition:** `total_referrals` changed this quarter (compare against a `referrals_last_quarter` snapshot field, or check for `payout-completed-*` tags dated within the current quarter)

---

### Branch A: Had Referrals This Quarter

#### Step 2a: Send Quarterly Recap Email

- **Action Type:** Send Email
- **Subject:** Your Q{{quarter}} Referral Recap
- **Body:**
  ```
  Hey {{contact.first_name}},

  Here is your referral recap for this quarter:

  Total Referrals (Lifetime): {{contact.custom_field.total_referrals}}
  Total Earnings (Lifetime): ${{contact.custom_field.total_referral_earnings}}

  Every person you send our way puts money in your pocket. There is no limit to what you can earn.

  Thanks for being part of the A&B network.

  -- The A&B Team
  Avery & Bryant
  averyandbryant.com
  ```

---

### Branch B: No Referrals This Quarter

#### Step 2b: Send Re-Engagement Email

- **Action Type:** Send Email
- **Subject:** We Miss You (and Your Referrals)
- **Body:**
  ```
  Hey {{contact.first_name}},

  It has been a minute! Just a reminder that every agent or property owner you send our way earns you cash. No cap, no expiration.

  All they have to do is mention your name when they book at homes.averyandbryant.com.

  Let us make you some money.

  -- The A&B Team
  Avery & Bryant
  averyandbryant.com
  ```

---

## Workflow 5: Referral Welcome Drip

**Purpose:** When someone becomes a referrer for the first time, onboard them with a short drip sequence explaining the program.

### Trigger

- **Type:** Tag Added
- **Tag:** `active-referrer`
- **Filter:** `total_referrals` is empty or equals 0 (ensures this only fires for first-time referrers)

### Step-by-Step Actions

#### Step 1: Wait

- **Action Type:** Wait
- **Duration:** 1 day

#### Step 2: Send Welcome Email

- **Action Type:** Send Email
- **Subject:** Welcome to the A&B Referral Program
- **Body:**
  ```
  Hey {{contact.first_name}},

  Thanks for referring someone our way. That means a lot, and we do not take it lightly.

  Here is how the referral program works:

  1. You refer an agent, investor, or property owner to Avery & Bryant.
  2. They mention your name when they book a shoot at homes.averyandbryant.com.
  3. Once the shoot is delivered, we process your referral payout.

  That is it. No forms, no tracking links, no hoops. Just have them drop your name.

  There is no cap on referrals. The more you send, the more you earn.

  Thanks for being part of the network.

  -- The A&B Team
  Avery & Bryant
  averyandbryant.com
  ```

#### Step 3: Wait

- **Action Type:** Wait
- **Duration:** 7 days

#### Step 4: Send Reminder SMS

- **Action Type:** Send SMS
- **Message:**
  ```
  Quick reminder -- every agent or property owner you send our way earns you cash. Just have them mention your name when they book. Easy money. - A&B Team
  ```

---

## Implementation Checklist

Use this checklist when building in GHL. Complete items in order.

### Phase 1: Setup

- [ ] Create all 4 custom fields (Referred By, Total Referrals, Total Referral Earnings, Referral Status)
- [ ] Create the `referrer_contact_id` custom field on client contacts
- [ ] Create all 4 tags (referred-client, active-referrer, needs-info, payout-pending)
- [ ] Create the Referral Pipeline with 4 stages (optional)
- [ ] Confirm that Aryeo webhook maps "How'd you hear about us?" and the free-text referral name field to GHL custom fields
- [ ] Note the exact custom field keys that Aryeo populates (update the field references in these workflows accordingly)

### Phase 2: Build Workflows

- [ ] Build Workflow 5 first (Welcome Drip) -- simplest, tag-triggered, no API calls
- [ ] Build Workflow 1 (New Referral Received) -- requires API integration for contact search
- [ ] Build Workflow 3 (Payout Completed) -- manual trigger, moderate complexity
- [ ] Build Workflow 2 (Payout Trigger) -- depends on opportunity stage change and API calls
- [ ] Build Workflow 4 (Quarterly Recap) -- scheduled, requires Smart List or API

### Phase 3: Test

- [ ] Test Workflow 1 by creating a test Aryeo order with referral fields filled in
- [ ] Test both branches: referrer exists in GHL and referrer does not exist
- [ ] Test Workflow 2 by moving a tagged opportunity to "Delivered" stage
- [ ] Test Workflow 3 by manually triggering on a test referrer contact
- [ ] Test Workflow 5 by adding the `active-referrer` tag to a fresh test contact
- [ ] Verify all SMS messages send correctly
- [ ] Verify all emails render correctly
- [ ] Verify custom fields increment properly
- [ ] Verify internal notifications reach Thomas

### Phase 4: Go Live

- [ ] Remove test data and tags from test contacts
- [ ] Activate all 5 workflows
- [ ] Monitor first 3-5 real referrals end-to-end
- [ ] Set a calendar reminder for the first quarterly recap date

---

## Technical Notes

### Aryeo-to-GHL Field Mapping

The Aryeo webhook integration (live on Vercel) needs to pass these fields into GHL when creating a contact/opportunity:

| Aryeo Field                                      | GHL Custom Field Key     |
|--------------------------------------------------|--------------------------|
| "How'd you hear about us?" dropdown value         | `how_heard_about_us`     |
| "If referred by an agent or 'other', share their name..." | `referral_name`  |

If these are not currently mapped, update the Vercel bridge (`Aryeo > GHL` integration) to include them in the contact creation payload.

### GHL API Authentication

All API calls in these workflows use the GHL API v2. You need:

- **API Key** or **OAuth token** with scopes: `contacts.readonly`, `contacts.write`, `opportunities.write`
- **Location ID:** `yVbHA1nN5OxYyVheIBbv`
- **Base URL:** `https://services.leadconnectorhq.com`

### SMS Character Limits

All SMS messages in this spec are under 160 characters where possible. Messages over 160 characters will be sent as MMS or split into multiple segments, which may affect cost. Review carrier charges if volume is high.

### Error Handling

For API-based steps (contact search, contact create, field updates):

- Add a **fallback branch** that sends Thomas an internal notification if the API call fails.
- Include the error details and the client/referrer name so it can be handled manually.
- Suggested notification: "Referral workflow error: [step name] failed for [contact name]. Manual intervention needed."
