# Avery & Bryant - Referral Tracking & Monitoring System

**GHL Location ID:** `yVbHA1nN5OxYyVheIBbv`
**Last Updated:** 2026-04-14
**Owner:** Thomas (Avery & Bryant)
**Depends On:** [GHL Referral Workflow Spec](./referral-program-ghl-workflow.md) (Workflows 1-5), Aryeo-to-GHL Vercel bridge

---

## The Problem

Referrals are currently tracked by a free-text field on Aryeo order forms ("If referred by an agent, share their name"). This creates multiple failure points:

- Names get misspelled ("Sara Smith" vs "Sarah Smythe") and the referrer never gets matched
- Clients forget to fill out the field entirely
- No centralized view of who is referring, how often, or how much they have earned
- No way to identify top referrers, dormant referrers, or program ROI
- Thomas has to manually track payouts in his head or in a spreadsheet
- Referrers have no visibility into their own stats

This spec replaces free-text name matching with a referral code system and builds a full tracking dashboard in GHL.

---

## Part 1: GHL Custom Fields Setup

### Referrer Contact Fields

Create these under **Settings > Custom Fields > Contact**. Apply to contacts who refer others.

| # | Field Name | Field Key | Type | Dropdown Options | Default | Notes |
|---|-----------|-----------|------|-----------------|---------|-------|
| 1 | Referral Status | `referral_status` | Dropdown | Active, Inactive, VIP | Active | Set to Active when first referral is made. Inactive after 180+ days dormant. VIP is manual override by Thomas. |
| 2 | Total Referrals | `total_referrals` | Number | -- | 0 | Lifetime count of completed referral bookings (incremented in Workflow 3). |
| 3 | Total Referral Earnings | `total_referral_earnings` | Currency | -- | 0 | Lifetime cash paid out to this referrer. |
| 4 | Pending Payouts | `pending_payouts` | Currency | -- | 0 | Sum of unpaid referral earnings. Incremented when shoot completes, decremented when payout is sent. |
| 5 | Last Referral Date | `last_referral_date` | Date | -- | -- | Updated each time a new referral booking is confirmed. Used for dormancy checks. |
| 6 | Referral Tier | `referral_tier` | Dropdown | Bronze, Silver, Gold | Bronze | Auto-assigned based on total_referrals. See Part 4. |
| 7 | Referral Code | `referral_code` | Text | -- | -- | Unique code like JONES25, SMITH42. Assigned when someone joins the referral program. |
| 8 | Referrals This Month | `referrals_this_month` | Number | -- | 0 | Reset to 0 on the 1st of each month by the monthly reporting workflow. |
| 9 | Referrals This Quarter | `referrals_this_quarter` | Number | -- | 0 | Reset to 0 on the 1st of Jan/Apr/Jul/Oct by the quarterly workflow. |

### Referred Client Contact Fields

These go on the contact record of the person who was referred (the client).

| # | Field Name | Field Key | Type | Notes |
|---|-----------|-----------|------|-------|
| 1 | Referred By | `referred_by` | Text | Referrer's full name (kept for human readability). |
| 2 | Referred By Contact ID | `referred_by_contact_id` | Text | GHL contact ID of the referrer. Used for automated lookups. |
| 3 | Referral Code Used | `referral_code_used` | Text | The code the client entered (e.g., JONES25). Used to match referrer. |

### Setup Steps

1. Go to **Settings > Custom Fields** in GHL
2. Click **Add Field** for each field above
3. Set the field type exactly as specified (dropdown, number, currency, date, text)
4. For dropdown fields, add all option values listed
5. Save each field and note the auto-generated field key -- update the references in this doc if GHL generates different keys

---

## Part 2: Tags

Create or confirm these tags exist under **Settings > Tags**.

| Tag | Applied To | Purpose |
|-----|-----------|---------|
| `active-referrer` | Referrer contacts | Anyone who has made at least one referral |
| `inactive-referrer` | Referrer contacts | No referral in 90+ days (applied by dormancy workflow) |
| `vip-referrer` | Referrer contacts | Manual designation by Thomas for top-tier partners |
| `payout-pending` | Referrer contacts | At least one unpaid referral earning |
| `payout-just-sent` | Referrer contacts | Trigger tag for Workflow 3 (Payout Completed). Removed after workflow runs. |
| `referred-client` | Client contacts | This client was referred by someone |
| `needs-info` | Referrer contacts | Referrer exists but missing payment info (phone, Venmo, etc.) |
| `tier-bronze` | Referrer contacts | 1-3 lifetime referrals |
| `tier-silver` | Referrer contacts | 4-9 lifetime referrals |
| `tier-gold` | Referrer contacts | 10+ lifetime referrals |
| `referral-code-assigned` | Referrer contacts | Has been issued a unique referral code |

---

## Part 3: Smart Lists

Create these under **Contacts > Smart Lists** in GHL.

### Smart List 1: All Active Referrers

- **Name:** All Active Referrers
- **Filters:**
  - Tag contains `active-referrer`
  - Tag does NOT contain `inactive-referrer`
- **Columns to display:** Name, Phone, Email, Referral Code, Total Referrals, Total Referral Earnings, Referral Tier, Last Referral Date
- **Sort:** Total Referrals descending

### Smart List 2: Payouts Pending

- **Name:** Payouts Pending
- **Filters:**
  - Tag contains `payout-pending`
- **Columns to display:** Name, Phone, Email, Pending Payouts, Total Referrals, Total Referral Earnings
- **Sort:** Date modified descending (most recent payout-pending tag first)

### Smart List 3: Top Referrers

- **Name:** Top Referrers
- **Filters:**
  - Tag contains `active-referrer`
  - Custom Field `total_referrals` >= 5
- **Columns to display:** Name, Total Referrals, Total Referral Earnings, Referral Tier, Last Referral Date, Referral Code
- **Sort:** Total Referrals descending

### Smart List 4: VIP Referrers

- **Name:** VIP Referrers
- **Filters:**
  - Custom Field `total_referrals` >= 10
- **Columns to display:** Name, Total Referrals, Total Referral Earnings, Pending Payouts, Last Referral Date, Referral Tier
- **Sort:** Total Referrals descending

### Smart List 5: Dormant Referrers

- **Name:** Dormant Referrers
- **Filters:**
  - Tag contains `active-referrer`
  - Custom Field `last_referral_date` is before [90 days ago]
- **Columns to display:** Name, Total Referrals, Last Referral Date, Referral Code, Phone, Email
- **Sort:** Last Referral Date ascending (longest dormant first)

> **GHL Note:** The "90 days ago" filter uses a relative date. In GHL Smart List filters, select "Last Referral Date" > "is before" > "90 days ago" (relative date option). If GHL does not support relative dates natively in Smart List filters, use "is before" with a manually set date and update it monthly, or use a workflow to apply/remove the `inactive-referrer` tag based on date math.

### Smart List 6: Referred Clients

- **Name:** Referred Clients
- **Filters:**
  - Tag contains `referred-client`
- **Columns to display:** Name, Referred By, Referral Code Used, Date Created, Phone, Email
- **Sort:** Date Created descending

---

## Part 4: Referral Code System

### The Change

Instead of relying on free text ("share their name"), every referrer gets a unique code. This eliminates misspellings and makes lookups instant.

### Code Format

- Pattern: `LASTNAME` + 2-digit number (e.g., `JONES25`, `SMITH42`, `GARCIA07`)
- All caps, no spaces, no special characters
- The number prevents collisions when two referrers share a last name
- Codes are stored in the `referral_code` custom field on the referrer's contact

### How to Assign a Code

**Step-by-step for Thomas:**

1. Open the referrer's contact in GHL
2. Go to their custom fields
3. In the `referral_code` field, type their code (e.g., `JONES25`)
4. Add the tag `referral-code-assigned`
5. Send them their code via SMS:
   ```
   Hey {{contact.first_name}}, your A&B referral code is {{contact.custom_field.referral_code}}. Give this to anyone you refer -- they enter it when they book and we track everything automatically. No more hoping they remember your name. - A&B Team
   ```

**Workflow option (semi-automated):**
- Create a GHL workflow triggered by tag `referral-code-assigned`
- Action: Send the SMS above with the code
- This way Thomas just fills in the code and adds the tag, and the SMS goes out automatically

### Aryeo Order Form Update

**Current state:** The Aryeo order form has a free-text field: "If referred by an agent, share their name."

**Required change:** Add a second field (or replace the existing one):
- **Field label:** "Referral Code (if you have one)"
- **Field type:** Text input, optional
- **Placeholder text:** "e.g., JONES25"
- **Help text:** "Your referrer will have given you their code. If you don't have one, leave this blank."

> **Important:** Keep the existing free-text "referred by name" field as a fallback for the transition period. Some referrers will not have codes yet. Once all active referrers have codes (target: 60 days after launch), the name field can be removed.

### Aryeo-to-GHL Webhook Update

Update the Vercel bridge to map the new field:

| Aryeo Field | GHL Custom Field Key |
|-------------|---------------------|
| "Referral Code (if you have one)" | `referral_code_used` |
| "If referred by an agent, share their name" (existing) | `referral_name` |

### GHL Workflow: Code-Based Referrer Lookup

**Replace the name-based contact search in Workflow 1** with a code-based lookup:

**Current (unreliable):**
```
GET /contacts/?query={{contact.custom_field.referral_name}}&locationId=yVbHA1nN5OxYyVheIBbv
```

**New (reliable):**
```
GET /contacts/search
Query: locationId=yVbHA1nN5OxYyVheIBbv
Body: {
  "filters": [{
    "field": "referral_code",
    "operator": "eq",
    "value": "{{contact.custom_field.referral_code_used}}"
  }]
}
```

This returns an exact match. No more fuzzy name matching.

**Workflow 1 updated logic:**

```
IF referral_code_used is not empty:
  -> Search contacts by referral_code = referral_code_used
  -> IF match found: proceed to Branch A (Referrer Found)
  -> IF no match: send Thomas a notification ("Code {{code}} used but no match found")
ELSE IF referral_name is not empty:
  -> Fall back to name-based search (legacy behavior)
  -> Send Thomas a notification to assign the referrer a code
ELSE:
  -> No referral, exit workflow
```

### Website Updates

**On /referral page, add a section after "How It Works":**

Add a new card or section with this content:
- Heading: "Already have a referral code?"
- Body: "Share your code with anyone you refer. They enter it when they book and we track everything automatically -- no more hoping they remember your name."
- Subtext: "Don't have a code yet? Call us at (501) 502-2925 or email hello@averyandbryant.com and we'll set you up."

**On /book page (or wherever the booking CTA lives):**

Add a note near the booking form or CTA:
- "Have a referral code? Enter it when you book so your referrer gets credit."

**Update the referral page step 2 copy:**

Current:
> "When they place their order, they mention your name. That's it. No codes, no tracking links, no hoops."

New:
> "When they place their order, they enter your referral code. That's it. One field, instant tracking, no misspellings."

---

## Part 5: GHL Reporting Dashboard

Create a new dashboard in GHL under **Reporting > Dashboards > Create Dashboard**.

**Dashboard name:** Referral Program

### Widget 1: Referral Program Overview

- **Type:** Number/Stats widget
- **Layout:** 4 tiles in a row

| Tile | Data Source | Filter |
|------|-----------|--------|
| Total Active Referrers | Contact count | Tag = `active-referrer` AND tag != `inactive-referrer` |
| Total Referrals This Month | Sum of `referrals_this_month` across all active referrers | Tag = `active-referrer` |
| Total Referrals This Quarter | Sum of `referrals_this_quarter` across all active referrers | Tag = `active-referrer` |
| Total Payouts This Month | Sum of payouts processed this month | Tag = `payout-completed-YYYY-MM-*` for current month |

> **GHL Limitation:** GHL dashboards cannot natively sum custom fields across contacts. Two workarounds:
>
> **Option A (recommended):** Create a "master" contact or use a GHL custom value/variable at the location level to store running totals. Update these via workflow each time a referral or payout is processed.
>
> **Option B:** Use the GHL Reporting API to build a custom dashboard widget via iframe:
> ```
> GET /contacts/?locationId=yVbHA1nN5OxYyVheIBbv&tags=active-referrer&limit=100
> ```
> Sum the `total_referrals` and `total_referral_earnings` fields client-side.
>
> **Option C:** Track these as GHL Custom Values (location-level variables):
> - `rv_active_referrers_count` (number)
> - `rv_referrals_this_month` (number)
> - `rv_referrals_this_quarter` (number)
> - `rv_payouts_this_month` (currency)
>
> Update these via workflow actions whenever a referral or payout event fires.

### Widget 2: Top Referrers Leaderboard

- **Type:** Table widget
- **Data source:** Smart List "Top Referrers"
- **Columns:**

| Column | Source | Sort |
|--------|--------|------|
| Name | contact.name | -- |
| Total Referrals | contact.custom_field.total_referrals | Primary, descending |
| Total Earnings | contact.custom_field.total_referral_earnings | -- |
| Last Referral Date | contact.custom_field.last_referral_date | -- |
| Tier | contact.custom_field.referral_tier | -- |

- **Row limit:** Top 10
- **Refresh:** Real-time (on dashboard load)

> **GHL Setup:** Go to Reporting > Dashboard > Add Widget > Table. Select the Smart List "Top Referrers" as the data source. Configure columns to show the fields listed above. Set row limit to 10.

### Widget 3: Pending Payouts

- **Type:** Table widget
- **Data source:** Smart List "Payouts Pending"
- **Columns:**

| Column | Source |
|--------|--------|
| Referrer Name | contact.name |
| Pending Payout Amount | contact.custom_field.pending_payouts |
| Total Referrals | contact.custom_field.total_referrals |
| Phone | contact.phone |

- **Action:** Thomas clicks a referrer's name to open their contact, reviews the payout, sends payment, then triggers Workflow 3 (Payout Completed)

### Widget 4: Referral Revenue Attribution

- **Type:** Number/Stats widget
- **Layout:** 4 tiles in a row

| Tile | Calculation | Notes |
|------|------------|-------|
| Referred Revenue This Month | Sum of opportunity monetary values where contact tag = `referred-client` AND opportunity created this month | Use Opportunities report filtered by tag |
| Referred Revenue This Quarter | Same filter, quarter date range | |
| Avg Order Value (Referrals) | Referred revenue / count of referred opportunities this quarter | Compare against overall AOV to measure referral quality |
| Program ROI | (Referred revenue this quarter) - (Total payouts this quarter) | Net profit attributable to the referral program |

> **Implementation:** These metrics require opportunity data cross-referenced with contact tags. GHL's built-in reporting can filter opportunities by contact tags. Go to **Reporting > Opportunities** and create saved reports with these filters. Pin them to the dashboard.

### Widget 5: Referral Funnel

- **Type:** Pipeline view widget
- **Data source:** Referral Pipeline
- **Stages and expected data:**

| Stage | What It Shows |
|-------|--------------|
| New Referral | Client booked, referrer identified, shoot not yet completed |
| Shoot Booked | Shoot is scheduled |
| Shoot Complete | Media delivered, payout ready to process |
| Payout Sent | Referrer has been paid |

- **Display:** Count of opportunities at each stage
- **Setup:** Add a Pipeline widget to the dashboard, select "Referral Pipeline"

---

## Part 6: Automated Tier System

### Tier Definitions

| Tier | Referral Count | Payout Rate | Perks |
|------|---------------|-------------|-------|
| Bronze | 1-3 referrals | Base rate | Standard payout per booking |
| Silver | 4-9 referrals | Higher rate | Increased payout + quarterly bonus |
| Gold | 10+ referrals | Highest rate | Highest payout + quarterly bonus + priority scheduling for the referrer's own shoots |

> **Note:** Specific dollar amounts for each tier are set by Thomas. This spec does not hardcode payout amounts -- they are business decisions that may change.

### Workflow 6: Tier Upgrade Automation

**Name:** Referral Tier Check
**Purpose:** After every payout, check if the referrer qualifies for a tier upgrade.

#### Trigger

- **Type:** Custom Field Changed
- **Field:** `total_referrals`
- **Applied to:** Contact with tag `active-referrer`

> **Alternative trigger:** Fire this workflow as a sub-step at the end of Workflow 3 (Payout Completed), right after incrementing `total_referrals`.

#### Step 1: If/Else - Check for Gold

- **Condition:** `total_referrals` >= 10
- **True branch:** Go to Step 2 (Gold upgrade)
- **False branch:** Go to Step 4 (Check for Silver)

#### Step 2: Set Tier to Gold

- **Action:** Update Contact Field
- **Field:** `referral_tier` = `Gold`
- **Action:** Remove Tag `tier-bronze`
- **Action:** Remove Tag `tier-silver`
- **Action:** Add Tag `tier-gold`

#### Step 3: Send Gold Congratulations

- **Action:** Send SMS
- **Message:**
  ```
  {{contact.first_name}}, you just hit Gold status in our referral program. 10+ referrals. You are officially in the top tier -- highest payouts, quarterly bonuses, and priority scheduling for your own shoots. We appreciate you. - A&B Team
  ```
- **Action:** Send Email
- **Subject:** You Hit Gold Status
- **Body:**
  ```
  Hey {{contact.first_name}},

  You just reached Gold tier in the A&B referral program.

  That means:
  - Highest referral payout rate
  - Quarterly bonus
  - Priority scheduling for your own shoots

  You have referred {{contact.custom_field.total_referrals}} people to us. That kind of trust does not go unnoticed.

  Thanks for being one of our top partners.

  -- The A&B Team
  Avery & Bryant
  averyandbryant.com
  ```
- **Action:** Internal notification to Thomas: "{{contact.name}} just hit Gold tier with {{contact.custom_field.total_referrals}} referrals."
- **Exit workflow.**

#### Step 4: If/Else - Check for Silver

- **Condition:** `total_referrals` >= 4
- **True branch:** Go to Step 5 (Silver upgrade)
- **False branch:** Go to Step 7 (Set/confirm Bronze)

#### Step 5: Set Tier to Silver

- **Action:** Update Contact Field
- **Field:** `referral_tier` = `Silver`
- **Action:** Remove Tag `tier-bronze`
- **Action:** Add Tag `tier-silver`

#### Step 6: Send Silver Congratulations

- **Action:** Send SMS
- **Message:**
  ```
  {{contact.first_name}}, you just moved up to Silver in our referral program. That means higher payouts and a quarterly bonus. Keep them coming. - A&B Team
  ```
- **Exit workflow.**

#### Step 7: Set/Confirm Bronze

- **Action:** Update Contact Field
- **Field:** `referral_tier` = `Bronze`
- **Action:** Add Tag `tier-bronze`
- **Exit workflow.**

---

## Part 7: Monthly Reporting Automation

### Workflow 7: Monthly Referral Report (Internal)

**Name:** Monthly Referral Report - Internal
**Purpose:** On the 1st of each month, send Thomas a summary of the previous month's referral activity.

#### Trigger

- **Type:** Date/Schedule
- **Schedule:** 1st of every month at 8:00 AM CT
- **Enrollment:** Single execution (not contact-based -- this is a location-level workflow)

> **GHL Note:** GHL does not have a native "location-level scheduled workflow." Workaround: Create a single "system" contact (e.g., "A&B System" with Thomas's email) and use a date-based trigger on that contact. Or use an external scheduler (cron job, Zapier) to hit a GHL webhook URL on the 1st of each month.

#### Step 1: Gather Data via API

- **Action:** Custom Webhook
- **Endpoint:** `GET /contacts/?locationId=yVbHA1nN5OxYyVheIBbv&tags=active-referrer&limit=100`
- **Purpose:** Pull all active referrers and their stats

#### Step 2: Send Internal Email to Thomas

- **Action:** Send Email
- **To:** Thomas's email
- **Subject:** Referral Program - Monthly Report - {{current_month}} {{current_year}}
- **Body:**

```
REFERRAL PROGRAM MONTHLY REPORT
{{previous_month}} {{current_year}}

--- SUMMARY ---

New Referrers This Month: {{new_referrer_count}}
Total Referrals This Month: {{month_referral_count}}
Total Payouts This Month: ${{month_payout_total}}
Active Referrers (all time): {{active_referrer_count}}

--- TOP 5 REFERRERS (THIS MONTH) ---

1. {{top1_name}} - {{top1_referrals_this_month}} referrals (${{top1_earnings_this_month}})
2. {{top2_name}} - {{top2_referrals_this_month}} referrals (${{top2_earnings_this_month}})
3. {{top3_name}} - {{top3_referrals_this_month}} referrals (${{top3_earnings_this_month}})
4. {{top4_name}} - {{top4_referrals_this_month}} referrals (${{top4_earnings_this_month}})
5. {{top5_name}} - {{top5_referrals_this_month}} referrals (${{top5_earnings_this_month}})

--- DORMANT REFERRERS (90+ DAYS) ---

{{dormant_list}}

--- PROGRAM ROI ---

Revenue from referred clients this month: ${{referred_revenue_month}}
Payouts this month: ${{month_payout_total}}
Net referral profit: ${{referred_revenue_month - month_payout_total}}
```

> **Implementation Note:** GHL workflows cannot natively aggregate data across contacts into a single email. You have two practical options:
>
> **Option A (recommended):** Build a simple API endpoint on the Vercel bridge that queries GHL contacts via API, aggregates the numbers, and sends the email via GHL or SendGrid. Trigger it via a cron job or GHL webhook.
>
> **Option B:** Maintain location-level custom values (see Widget 1 notes) that get updated by each referral/payout workflow. The monthly email workflow reads those values directly.

#### Step 3: Reset Monthly Counters

- **Action:** Custom Webhook (loop through active referrers)
- **For each contact with tag `active-referrer`:**
  - Set `referrals_this_month` = 0

### Workflow 8: Monthly Referrer Recap (External)

**Name:** Monthly Referral Recap - Referrers
**Purpose:** Send each active referrer their personal monthly stats.

#### Trigger

- **Type:** Date/Schedule
- **Schedule:** 1st of every month at 10:00 AM CT (2 hours after internal report)
- **Enrollment:** All contacts with tag `active-referrer`

#### Step 1: If/Else - Had Referrals This Month?

- **Condition:** `referrals_this_month` > 0
- **True branch:** Send active recap (Step 2)
- **False branch:** Send encouragement (Step 3)

#### Step 2: Send Active Recap SMS + Email

**SMS:**
```
{{contact.first_name}}, your monthly referral recap: You referred {{contact.custom_field.referrals_this_month}} people last month. Total earnings: ${{contact.custom_field.total_referral_earnings}}. Tier: {{contact.custom_field.referral_tier}}. No cap -- keep them coming. - A&B Team
```

**Email:**
- **Subject:** Your Referral Recap - {{previous_month}}
- **Body:**
```
Hey {{contact.first_name}},

Here is your referral recap for last month:

Referrals this month: {{contact.custom_field.referrals_this_month}}
Total referrals (all time): {{contact.custom_field.total_referrals}}
Total earnings (all time): ${{contact.custom_field.total_referral_earnings}}
Your tier: {{contact.custom_field.referral_tier}}

There is no cap on what you can earn. Every booking counts.

Thanks for being part of the A&B network.

-- The A&B Team
Avery & Bryant
averyandbryant.com
```

**Exit workflow.**

#### Step 3: Send Encouragement (No Referrals This Month)

**SMS:**
```
Hey {{contact.first_name}}, just a reminder -- every agent or property owner you send our way earns you cash. Your code is {{contact.custom_field.referral_code}}. Share it anytime. - A&B Team
```

**Exit workflow.**

---

## Part 8: Integration Points

### Aryeo to GHL (Existing Webhook -- Updates Needed)

The Vercel bridge at `aryeo-ghl-bridge` currently creates contacts and opportunities in GHL when Aryeo orders come in.

**Required updates to the bridge:**

1. **Map the new referral code field:**
   - Aryeo field: "Referral Code" (new field to add to Aryeo order forms)
   - GHL custom field: `referral_code_used`

2. **Keep the existing name field mapping:**
   - Aryeo field: "If referred by an agent, share their name"
   - GHL custom field: `referral_name`

3. **Apply tag on referral detection:**
   - If `referral_code_used` is not empty OR `referral_name` is not empty:
     - Add tag `referred-client` to the new contact
   - This triggers Workflow 1 (New Referral Received)

4. **Pass the referral code in the opportunity custom fields too** (for revenue attribution):
   - Opportunity custom field: `referral_code_used`

### GHL to Payout (Manual Process with Workflow Support)

**Current process (stays manual for now):**

1. Thomas opens the "Payouts Pending" Smart List in GHL
2. Reviews each pending payout
3. Sends payment via Venmo, Zelle, or check
4. Goes to the referrer's contact in GHL
5. Adds the tag `payout-just-sent` (triggers Workflow 3: Payout Completed)
6. Workflow 3 handles: removing `payout-pending`, updating earnings, sending confirmation SMS

**Future automation (Phase 2):**

- Integrate Stripe Connect for automatic payouts
- Each referrer would onboard once (provide bank details via Stripe)
- When a shoot is marked complete, the payout is sent automatically
- Workflow 3 would trigger on Stripe webhook confirmation instead of manual tag

### GHL to Website (Phase 2 Enhancement)

**Referrer portal concept:**

- A page on averyandbryant.com/referral/dashboard (or similar)
- Referrer enters their code to see:
  - Total referrals
  - Total earnings
  - Current tier
  - Pending payouts
- Data pulled from GHL via API (read-only)
- This is a nice-to-have. The SMS/email recaps cover this need for now.

---

## Part 9: Anti-Fraud and Edge Cases

### Rules for Thomas

| Scenario | Ruling | Why |
|----------|--------|-----|
| Same referrer refers the same client for a different property | COUNTS | Each booking is a separate referral. A referrer who keeps bringing the same agent back deserves credit every time. |
| Client does not enter a referral code, but a referrer claims credit | THOMAS DECIDES | Thomas can manually add the `referred-client` tag and set the `referral_code_used` field on the client's contact. Use the "Manual Referral Attribution" workflow below. |
| Referrer refers themselves | DOES NOT COUNT | If `referred_by_contact_id` matches the client's own contact ID, the workflow should skip payout steps and notify Thomas. |
| Referred client cancels before the shoot happens | DOES NOT COUNT | Payout is only triggered when the opportunity reaches the "Delivered" stage (Workflow 2). If the shoot never happens, no payout. |
| Referred client cancels after the shoot but before delivery | DOES NOT COUNT | Same rule. Payout requires "Delivered" stage. |
| Referrer refers someone who is already an existing A&B client | COUNTS | As long as it is a new booking. Repeat business driven by a referrer is still valuable. |
| Two referrers claim credit for the same client | FIRST CODE WINS | The referral code entered on the order form is the one that gets credit. If no code was entered and two people claim it, Thomas decides. |
| Referral code entered but does not match any referrer | FLAG FOR THOMAS | Workflow sends internal notification. Possible typo -- Thomas investigates and either corrects or creates a new referrer contact. |

### Workflow 9: Manual Referral Attribution

**Purpose:** When Thomas needs to manually credit a referral that was not captured by the order form.

#### Trigger

- **Type:** Manual trigger on the client's contact
- **Method:** Thomas opens the client contact, clicks "Trigger Workflow," selects "Manual Referral Attribution"

#### Steps

1. **Prompt:** Thomas fills in the `referral_code_used` field on the client's contact before triggering
2. **Action:** Add tag `referred-client`
3. **Action:** Look up the referrer by `referral_code_used` (same API call as Workflow 1)
4. **Action:** Set `referred_by_contact_id` on the client
5. **Action:** Set `referred_by` on the client (referrer's name)
6. **Action:** Notify Thomas: "Manual referral attribution complete. {{client_name}} credited to {{referrer_name}}."
7. **Action:** Proceed with standard referral flow (notify referrer, update pipeline, etc.)

### Workflow 10: Self-Referral Detection

**Purpose:** Catch cases where someone tries to refer themselves.

#### Where to Add

Add this as a check step in Workflow 1 (New Referral Received), after the referrer is identified but before any notifications or payout setup:

```
IF referrer_contact_id == trigger_contact_id:
  -> Send internal notification to Thomas: "Self-referral detected. {{contact.name}} used their own referral code. No payout will be processed."
  -> Remove tag `referred-client`
  -> Exit workflow
ELSE:
  -> Continue with normal referral flow
```

---

## Part 10: Dormancy Management

### Workflow 11: Dormancy Check

**Name:** Referral Dormancy Check
**Purpose:** Identify referrers who have not generated a referral in 90+ days and flag them.

#### Trigger

- **Type:** Date/Schedule
- **Schedule:** Every Monday at 9:00 AM CT
- **Enrollment:** All contacts with tag `active-referrer`

#### Steps

1. **If/Else:** `last_referral_date` is more than 90 days ago
   - **True:** Add tag `inactive-referrer`, set `referral_status` = `Inactive`
   - **False:** Ensure `inactive-referrer` tag is removed, set `referral_status` = `Active`

2. **If inactive AND last_referral_date is between 90-97 days ago** (first week of dormancy):
   - Send re-engagement SMS:
     ```
     Hey {{contact.first_name}}, it has been a while since your last referral. Your code is still {{contact.custom_field.referral_code}} -- share it anytime. Every booking earns you cash. - A&B Team
     ```

3. **If inactive AND last_referral_date is more than 180 days ago:**
   - Send internal notification to Thomas: "{{contact.name}} has been dormant for 180+ days. Consider a personal outreach or removing from active program."

---

## Implementation Checklist

Complete in order. Check off each item as done.

### Phase 1: Custom Fields and Tags (Day 1)

- [ ] Create all 9 referrer custom fields (referral_status, total_referrals, total_referral_earnings, pending_payouts, last_referral_date, referral_tier, referral_code, referrals_this_month, referrals_this_quarter)
- [ ] Create all 3 referred client custom fields (referred_by, referred_by_contact_id, referral_code_used)
- [ ] Create all 11 tags listed in Part 2
- [ ] Verify field keys match this spec (update spec if GHL generates different keys)

### Phase 2: Smart Lists (Day 1-2)

- [ ] Create Smart List: All Active Referrers
- [ ] Create Smart List: Payouts Pending
- [ ] Create Smart List: Top Referrers
- [ ] Create Smart List: VIP Referrers
- [ ] Create Smart List: Dormant Referrers
- [ ] Create Smart List: Referred Clients
- [ ] Verify all filters work by adding test data

### Phase 3: Referral Code System (Day 2-3)

- [ ] Assign referral codes to all existing active referrers (open the "All Active Referrers" smart list and fill in codes one by one)
- [ ] Send each existing referrer an SMS with their code
- [ ] Add "Referral Code" field to Aryeo order forms
- [ ] Update the Aryeo-to-GHL Vercel bridge to map `referral_code_used`
- [ ] Test: Create a test Aryeo order with a referral code and verify it arrives in GHL

### Phase 4: Workflow Updates (Day 3-5)

- [ ] Update Workflow 1 (New Referral Received) to use code-based lookup with name fallback
- [ ] Add self-referral detection check to Workflow 1 (Workflow 10 logic)
- [ ] Update Workflow 3 (Payout Completed) to also update `pending_payouts`, `last_referral_date`, `referrals_this_month`, `referrals_this_quarter`
- [ ] Build Workflow 6: Tier Upgrade Automation
- [ ] Build Workflow 9: Manual Referral Attribution
- [ ] Build Workflow 11: Dormancy Check

### Phase 5: Reporting (Day 5-7)

- [ ] Create the Referral Program dashboard in GHL
- [ ] Add Widget 1: Referral Program Overview (set up location-level custom values if needed)
- [ ] Add Widget 2: Top Referrers Leaderboard
- [ ] Add Widget 3: Pending Payouts
- [ ] Add Widget 4: Referral Revenue Attribution
- [ ] Add Widget 5: Referral Funnel (pipeline view)
- [ ] Verify all widgets pull correct data

### Phase 6: Monthly Reporting (Day 7-8)

- [ ] Build Workflow 7: Monthly Referral Report (internal to Thomas)
- [ ] Build Workflow 8: Monthly Referrer Recap (external to each referrer)
- [ ] Set up the mechanism for resetting `referrals_this_month` on the 1st
- [ ] Test both workflows with test data

### Phase 7: Website Updates (Day 8-9)

- [ ] Update /referral page: Add referral code section with copy from Part 4
- [ ] Update /referral page: Change step 2 copy to mention codes instead of names
- [ ] Add referral code note to /book page or booking CTA area
- [ ] Deploy and verify

### Phase 8: Backfill and Go Live (Day 9-10)

- [ ] Backfill existing referrer contacts with accurate `total_referrals` and `total_referral_earnings` from Thomas's records
- [ ] Set correct `referral_tier` for each existing referrer based on their total
- [ ] Apply appropriate tier tags (tier-bronze, tier-silver, tier-gold)
- [ ] Set `last_referral_date` for each existing referrer
- [ ] Activate all new and updated workflows
- [ ] Remove test data
- [ ] Monitor first 5 real referrals end-to-end

### Phase 9: Future Enhancements (Backlog)

- [ ] Stripe Connect integration for automatic payouts
- [ ] Referrer dashboard page on averyandbryant.com
- [ ] Referral code QR codes / shareable links
- [ ] Quarterly bonus automation (auto-calculate and add to pending_payouts)
- [ ] Referrer-specific UTM tracking for website analytics

---

## GHL API Reference

All API calls use GHL API v2.

| Action | Method | Endpoint |
|--------|--------|----------|
| Search contacts by custom field | POST | `https://services.leadconnectorhq.com/contacts/search` |
| Get contact by ID | GET | `https://services.leadconnectorhq.com/contacts/{contactId}` |
| Update contact | PUT | `https://services.leadconnectorhq.com/contacts/{contactId}` |
| Create contact | POST | `https://services.leadconnectorhq.com/contacts/` |
| List contacts by tag | GET | `https://services.leadconnectorhq.com/contacts/?locationId={locationId}&tags={tag}` |
| Add tag | PUT | `https://services.leadconnectorhq.com/contacts/{contactId}` (body: `{ "tags": ["existing-tags", "new-tag"] }`) |
| Update custom field | PUT | `https://services.leadconnectorhq.com/contacts/{contactId}` (body: `{ "customFields": [{ "key": "field_key", "value": "new_value" }] }`) |
| Create opportunity | POST | `https://services.leadconnectorhq.com/opportunities/` |
| Update opportunity stage | PUT | `https://services.leadconnectorhq.com/opportunities/{opportunityId}` |

**Authentication:**
- Header: `Authorization: Bearer {api_key}`
- Header: `Version: 2021-07-28`
- Location ID: `yVbHA1nN5OxYyVheIBbv`

**Required API scopes:** `contacts.readonly`, `contacts.write`, `opportunities.readonly`, `opportunities.write`
