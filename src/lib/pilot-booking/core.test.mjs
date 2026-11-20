// Unit tests for the booking pilot. Run: node --test src/lib/pilot-booking/
// No packages: Node strips the types from core.ts itself.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  PILOT_PRODUCT_IDS,
  catalogFromProducts,
  selectionToItems,
  shootDuration,
  depositSplit,
  rule40,
  closestDates,
  eligibleDates,
  customerFromSearch,
  teamIdsByName,
  buildCreatePlan,
  buildInternalNotes,
  executeCreatePlan,
  isLiveCreate,
  pilotEnabled,
  cleanTitle,
  validateAnswers,
  dateWindow,
} from "./core.ts";

const slot = (h) => ({ start_at: `2026-11-24T${h}:00Z`, end_at: `2026-11-24T${h}:00Z` });

const PRODUCTS = [
  { id: PILOT_PRODUCT_IDS.main, title: "2026 \u2014 Market Your Build", active: true,
    variants: [{ id: "v-main", title: null, price: 18500, price_amount: 18500, duration: 60 }] },
  { id: PILOT_PRODUCT_IDS.addons[0], title: "2026 \u2014 Aerial Drone Photos + Video", active: true,
    variants: [{ id: "v-drone", title: null, price_amount: 15000, duration: 0 }] },
  { id: PILOT_PRODUCT_IDS.addons[2], title: "2026 \u2014 Cinematic Property Video", active: true,
    variants: [
      { id: "v-film60", title: "60 seconds", price_amount: 29500, duration: 0 },
      { id: "v-film120", title: "90\u2013120 seconds", price_amount: 39500, duration: 0 },
    ] },
  { id: "not-ours", title: "Something else", active: true, variants: [{ id: "x", price_amount: 1 }] },
];

const ANSWERS = {
  street: "700 Kamak Dr", city: "Beebe", state: "ar", zip: "72012", sqft: "2,400",
  siteContactName: "Sam Site", siteContactPhone: "501-555-0101", company: "Test Homes LLC",
  buildStage: "Finished", bookerName: "Pat Builder", bookerEmail: "pat@example.com", bookerPhone: "501-555-0102",
};

// ── Rule 40 ──
test("rule 40: restricted customer gets Thomas only, even when Cayden is open", () => {
  const r = rule40({ restricted: true, date: "2026-11-24", cayden: [slot("15:30")], thomas: [slot("16:00")] });
  assert.equal(r.shooter, "thomas");
  assert.deepEqual(r.slots, [slot("16:00")]);
});

test("rule 40: Cayden has slots, so only Cayden's are shown", () => {
  const r = rule40({ restricted: false, date: "2026-11-24", cayden: [slot("15:30")], thomas: [slot("16:00"), slot("17:00")] });
  assert.equal(r.shooter, "cayden");
  assert.deepEqual(r.slots, [slot("15:30")]);
});

test("rule 40: Cayden empty that day, so Thomas", () => {
  const r = rule40({ restricted: false, date: "2026-11-24", cayden: [], thomas: [slot("16:00")] });
  assert.equal(r.shooter, "thomas");
  assert.equal(r.slots.length, 1);
});

test("rule 40: both empty gives no times and the closest other days", () => {
  const r = rule40({
    restricted: false, date: "2026-11-24", cayden: [], thomas: [],
    caydenDates: ["2026-11-23", "2026-11-30"], thomasDates: ["2026-11-25", "2026-12-04", "2026-11-24"],
  });
  assert.equal(r.shooter, null);
  assert.deepEqual(r.slots, []);
  assert.deepEqual(r.suggestions, ["2026-11-23", "2026-11-25", "2026-11-30"]);
});

test("rule 40: restricted and Thomas empty suggests Thomas's days only", () => {
  const r = rule40({
    restricted: true, date: "2026-11-24", cayden: [slot("15:30")], thomas: [],
    caydenDates: ["2026-11-25"], thomasDates: ["2026-12-01"],
  });
  assert.equal(r.shooter, null);
  assert.deepEqual(r.suggestions, ["2026-12-01"]);
});

test("eligible dates and closest dates", () => {
  assert.deepEqual(eligibleDates({ restricted: false, caydenDates: ["2026-11-25", "2026-11-23"], thomasDates: ["2026-11-23"] }), ["2026-11-23", "2026-11-25"]);
  assert.deepEqual(closestDates("2026-11-24", ["2026-11-20", "2026-11-26", "2026-11-23"], 2), ["2026-11-23", "2026-11-26"]);
  assert.deepEqual(dateWindow("2026-11-21", 21), { start: "2026-11-21T06:00:00Z", end: "2026-12-12T06:00:00Z" });
});

// ── Deposit ──
test("deposit: 50 percent of $185 is $92.50", () => {
  assert.deepEqual(depositSplit(18500), { total: 18500, dueToday: 9250, balance: 9250 });
});

test("deposit: odd cents round, and the two halves always add up", () => {
  for (const t of [18501, 33333, 1, 0, 99999]) {
    const d = depositSplit(t);
    assert.equal(d.dueToday + d.balance, t);
    assert.ok(Number.isInteger(d.dueToday));
    assert.ok(Math.abs(d.dueToday - d.balance) <= 1);
  }
  assert.equal(depositSplit(18501).dueToday, 9251);
});

// ── Catalog ──
test("catalog: picks our products, cleans titles, prices from Aryeo", () => {
  const c = catalogFromProducts(PRODUCTS);
  assert.equal(c.main.name, "Market Your Build");
  assert.equal(c.main.price, 18500);
  assert.equal(c.addons.length, 3);
  assert.equal(c.addons[2].option, "90 to 120 seconds");
  assert.equal(catalogFromProducts(PRODUCTS.slice(1)), null);
  assert.equal(cleanTitle("2026 \u2014 Social Reel (single)"), "Social Reel (single)");
});

test("selection: one option per product, unknown ids dropped, duration floor", () => {
  const c = catalogFromProducts(PRODUCTS);
  const items = selectionToItems(c, ["v-film60", "v-film120", "v-drone", "forged"]);
  assert.deepEqual(items.map((i) => i.variantId), ["v-main", "v-film60", "v-drone"]);
  assert.equal(shootDuration(items), 60);
});

// ── Lookups ──
test("customer lookup: exact email only, restricted flag carried", () => {
  const list = [
    { id: "a", email: "other@example.com", has_restricted_photographers: true },
    { id: "b", email: "PAT@example.com", has_restricted_photographers: false },
    { id: "c", email: "pat@example.com", has_restricted_photographers: true },
  ];
  assert.deepEqual(customerFromSearch(list, "pat@example.com"), { id: "b", restricted: true });
  assert.equal(customerFromSearch(list, "nobody@example.com"), null);
});

test("team ids are read by name", () => {
  const ids = teamIdsByName([
    { id: "t1", customer_display_name: "Thomas Brown" },
    { id: "c1", customer_display_name: "Cayden Cooke" },
  ]);
  assert.deepEqual(ids, { cayden: "c1", thomas: "t1" });
});

test("answers validation", () => {
  assert.deepEqual(validateAnswers(ANSWERS), []);
  assert.ok(validateAnswers({ ...ANSWERS, zip: "7201", bookerEmail: "x", buildStage: "Roof" }).includes("zip"));
  assert.ok(validateAnswers({ ...ANSWERS, bookerPhone: "555" }).includes("bookerPhone"));
});

// ── Payload builder ──
function plan(customer = null) {
  const c = catalogFromProducts(PRODUCTS);
  const items = selectionToItems(c, ["v-drone"]);
  return buildCreatePlan({
    answers: ANSWERS, items, slot: slot("15:30"), date: "2026-11-24",
    shooterId: "c1", shooterName: "Cayden Cooke", customer, today: "2026-11-20",
  });
}

test("payload: answers land in internal_notes, product ids come from the catalog", () => {
  const p = plan();
  const order = p.find((r) => r.path === "/orders");
  assert.deepEqual(order.body.product_items, [
    { variant_id: "v-main", quantity: 1 },
    { variant_id: "v-drone", quantity: 1 },
  ]);
  const notes = order.body.internal_notes;
  for (const s of ["Test Homes LLC", "2,400", "Finished", "Sam Site", "501-555-0101", "Cayden Cooke", "$167.50 of $335"]) {
    assert.ok(notes.includes(s), `notes missing ${s}`);
  }
  assert.equal(notes, buildInternalNotes(ANSWERS, { shooterName: "Cayden Cooke", deposit: "$167.50", total: "$335" }));
});

test("payload: notify flags false, shooter assigned, deposit recorded as STRIPE in cents", () => {
  const p = plan();
  assert.equal(p.find((r) => r.path === "/orders").body.notify, false);
  const appt = p.find((r) => r.path === "/appointments/store");
  assert.equal(appt.body.notifyCustomer, false);
  assert.equal(appt.body.notifyCompany, false);
  assert.deepEqual(appt.body.company_team_member_ids, ["c1"]);
  const pay = p.find((r) => r.path === "/orders/{order_id}/payments");
  assert.deepEqual(pay.body, { amount: 16750, currency: "USD", collection_source: "STRIPE", date: "2026-11-20" });
  assert.equal(p[0].step, "Create customer");
  assert.equal(p.find((r) => r.verifyStartAt).query["filter[user_ids][]"], "c1");
});

test("payload: an existing customer is reused, not created", () => {
  const p = plan({ id: "cust-9", restricted: false });
  assert.equal(p[0].method, "GET");
  assert.equal(p.find((r) => r.path === "/orders").body.customer_id, "cust-9");
  assert.ok(!p.some((r) => r.method === "POST" && r.path === "/customers"));
});

// ── Guard ──
test("guard: with PILOT_LIVE_CREATE unset the create step sends nothing", async () => {
  const calls = [];
  const fakeFetch = async (url, init) => {
    calls.push({ url, method: init.method });
    return { ok: true, status: 200, json: async () => ({ data: { id: "x" } }) };
  };
  const env = {}; // the switch is unset
  assert.equal(isLiveCreate(env), false);
  const res = await executeCreatePlan(plan(), {
    live: isLiveCreate(env), fetchImpl: fakeFetch, baseUrl: "https://example.invalid", headers: {},
  });
  assert.equal(res.mode, "DRY_RUN");
  assert.equal(res.sent, 0);
  assert.equal(calls.filter((c) => c.method !== "GET").length, 0);
  assert.equal(calls.length, 0);
  assert.ok(res.results.every((r) => r.status === "not sent"));
});

test("guard: only an explicit 1 or true turns the switch on; production hides the page", () => {
  for (const v of [undefined, "", "0", "false", "no", "yes"]) assert.equal(isLiveCreate({ PILOT_LIVE_CREATE: v }), false);
  assert.equal(isLiveCreate({ PILOT_LIVE_CREATE: "1" }), true);
  assert.equal(pilotEnabled({ VERCEL_ENV: "production" }), false);
  assert.equal(pilotEnabled({ VERCEL_ENV: "preview" }), true);
  assert.equal(pilotEnabled({}), true);
});

test("live path (fake fetch only): stops at the Stripe stub, before any payment", async () => {
  const calls = [];
  const fakeFetch = async (url, init) => {
    calls.push({ url, method: init.method });
    if (url.includes("available-timeslots")) return { ok: true, status: 200, json: async () => ({ data: [slot("15:30")] }) };
    return { ok: true, status: 200, json: async () => ({ data: { id: `id${calls.length}` } }) };
  };
  const res = await executeCreatePlan(plan(), { live: true, fetchImpl: fakeFetch, baseUrl: "https://example.invalid", headers: {} });
  assert.equal(res.ok, false);
  assert.ok(!calls.some((c) => c.url.includes("/payments")));
  assert.ok(calls.some((c) => c.url.includes("/orders/") === false && c.url.includes("order_id=id3")));
});

test("live path (fake fetch only): a slot lost to drive time stops before the appointment", async () => {
  const calls = [];
  const fakeFetch = async (url, init) => {
    calls.push({ url, method: init.method });
    if (url.includes("available-timeslots")) return { ok: true, status: 200, json: async () => ({ data: [] }) };
    return { ok: true, status: 200, json: async () => ({ data: { id: "z" } }) };
  };
  const res = await executeCreatePlan(plan(), { live: true, fetchImpl: fakeFetch, baseUrl: "https://example.invalid", headers: {} });
  assert.equal(res.ok, false);
  assert.ok(!calls.some((c) => c.url.includes("/appointments")));
});
