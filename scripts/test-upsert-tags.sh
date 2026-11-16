#!/bin/bash
# One question, answered on the Inspector Brown test contact only: does the
# CRM's contact upsert replace a contact's existing tags when a tags list is
# sent? Sends one upsert with a single marker tag. Prints the HTTP status
# only. Read the contact's tags before and after, then put them back.
set -uo pipefail
ENVF="$HOME/.config/ghl/alyt.env"
[ -f "$ENVF" ] || { echo "missing key file"; exit 1; }
set -a; . "$ENVF"; set +a
code=$(curl -s -o /dev/null -w '%{http_code}' -X POST "https://services.leadconnectorhq.com/contacts/upsert" \
  -H "Authorization: Bearer ${GHL_ALYT_TOKEN:?}" -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" -H "Accept: application/json" \
  -d "{\"locationId\":\"${GHL_ALYT_LOCATION_ID:?}\",\"email\":\"inspectorb@averyandbryant.com\",\"tags\":[\"zz-upsert-test\"]}")
echo "upsert_status=$code"
