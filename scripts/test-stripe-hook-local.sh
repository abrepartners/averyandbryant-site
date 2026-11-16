#!/bin/bash
# End to end check of /api/stripe/webhook against the live CRM, using the
# Inspector Brown test contact only. Runs the built site locally with the CRM
# keys loaded by name from ~/.config/ghl/alyt.env and a throwaway local
# signing secret (no real Stripe key is read or needed). The fake checkout
# has no tier and no product, so it adds the two fallback studio tags and
# enrolls in no workflow. Prints statuses, never values.
# Usage: npm run build && bash scripts/test-stripe-hook-local.sh
set -uo pipefail
ENVF="$HOME/.config/ghl/alyt.env"
[ -f "$ENVF" ] || { echo "missing key file"; exit 1; }
set -a; . "$ENVF"; set +a
export GHL_API_TOKEN="${GHL_ALYT_TOKEN:?}" GHL_LOCATION_ID="${GHL_ALYT_LOCATION_ID:?}"
export STRIPE_SECRET_KEY="sk_test_local_placeholder"
export STRIPE_WEBHOOK_SECRET="whsec_local_test_only"
PORT=3459
LOG="$(mktemp)"
cd "$(dirname "$0")/.."
npx next start -p "$PORT" >"$LOG" 2>&1 &
PID=$!
trap 'kill $PID 2>/dev/null; rm -f "$LOG"' EXIT
sleep 6
node -e '
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const payload = JSON.stringify({
  id: "evt_local_test", object: "event", type: "checkout.session.completed",
  data: { object: { id: "cs_local_test", object: "checkout.session",
    customer_details: { email: "inspectorb@averyandbryant.com", name: "Inspector Brown" },
    metadata: {} } },
});
const header = stripe.webhooks.generateTestHeaderString({ payload, secret: process.env.STRIPE_WEBHOOK_SECRET });
fetch("http://localhost:'"$PORT"'/api/stripe/webhook", { method: "POST", headers: { "stripe-signature": header, "content-type": "application/json" }, body: payload })
  .then(async (r) => console.log("hook_status=" + r.status, (await r.text()).slice(0, 80)))
  .catch((e) => console.log("hook_request_failed", e.message));
'
sleep 1
for marker in "GHL upsert failed" "GHL add tags failed" "upsert returned no contact id" "added tags"; do
  if grep -q "$marker" "$LOG"; then echo "$marker: yes"; else echo "$marker: no"; fi
done
