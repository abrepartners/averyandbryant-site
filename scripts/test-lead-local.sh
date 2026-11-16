#!/bin/bash
# End to end check of /api/lead against the live CRM, using the Inspector
# Brown test contact only. Runs the built site locally with the CRM keys
# loaded by name from ~/.config/ghl/alyt.env. Prints statuses, never values.
# Usage: npm run build && bash scripts/test-lead-local.sh
set -uo pipefail
ENVF="$HOME/.config/ghl/alyt.env"
[ -f "$ENVF" ] || { echo "missing key file"; exit 1; }
set -a; . "$ENVF"; set +a
export GHL_API_TOKEN="${GHL_ALYT_TOKEN:?}" GHL_LOCATION_ID="${GHL_ALYT_LOCATION_ID:?}"
PORT=3458
LOG="$(mktemp)"
cd "$(dirname "$0")/.."
npx next start -p "$PORT" >"$LOG" 2>&1 &
PID=$!
trap 'kill $PID 2>/dev/null; rm -f "$LOG"' EXIT
sleep 6
code=$(curl -s -o /dev/null -w '%{http_code}' -X POST "http://localhost:$PORT/api/lead" \
  -H 'Content-Type: application/json' \
  -d '{"firstName":"Inspector","lastName":"Brown","email":"inspectorb@averyandbryant.com","origin":"builders","quote":{"vertical":"TEST by Jarvis, ignore","goal":"Route check","scope":"One home. One time. Picked: Marketing photos","package":"Our fit: test","price":"$185 at list prices (test)"}}')
echo "lead_status=$code"
sleep 1
for marker in "lead note failed" "lead summary field failed" "lead capture failed"; do
  if grep -q "$marker" "$LOG"; then
    echo "$marker: yes ($(grep -A1 "$marker" "$LOG" | grep -o '→ [0-9]*' | head -1))"
  else
    echo "$marker: no"
  fi
done
