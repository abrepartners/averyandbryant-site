/**
 * Booking pilot (option C), pure logic. Preview only.
 *
 * Everything here is free of imports and side effects so it runs under
 * `node --test` as well as inside Next. The network lives in aryeo.ts (reads)
 * and in executeCreatePlan below, which only sends when the server switch
 * PILOT_LIVE_CREATE is on. The switch is unset everywhere; do not set it
 * without Thomas's yes.
 */

// ── Catalog ────────────────────────────────────────────────────────────────

/**
 * Aryeo product ids for the builder shoot (the 2026 line on the Builders
 * form). Ids only: names, prices and durations are read live from Aryeo,
 * which is the source of truth for client pricing.
 */
export const PILOT_PRODUCT_IDS = {
  main: "01a1e577-813c-701e-8074-11ddaa3f8ec7", // 2026 Market Your Build
  addons: [
    "019f4d83-0a21-710a-8ae4-9b81d70e73a9", // 2026 Aerial Drone Photos + Video
    "019f4d93-ee14-70ea-b534-e3e1b82d9715", // 2026 Social Reel (single)
    "019f4d82-3860-7101-8525-5403640fb833", // 2026 Cinematic Property Video
    "019f4d85-8cd7-7389-b72f-401d9ee5cd9d", // 2026 Real Twilight Shoot
  ],
} as const;

export const TEAM_NAMES = { cayden: "Cayden Cooke", thomas: "Thomas Brown" } as const;
export const TIMEZONE = "America/Chicago";
export const SLOT_INTERVAL = 15;
export const DEFAULT_DURATION = 60;
export const BUILD_STAGES = [
  "Slab or foundation",
  "Framing",
  "Drywall",
  "Finished",
  "Staged",
] as const;

export type AryeoVariant = {
  id: string;
  title?: string | null;
  price?: number | null;
  price_amount?: number | null;
  duration?: number | null;
};
export type AryeoProduct = {
  id: string;
  title?: string | null;
  active?: boolean | null;
  variants?: AryeoVariant[] | null;
};

/** One bookable option. Price in cents, duration in minutes. */
export type CatalogItem = {
  productId: string;
  variantId: string;
  name: string;
  option: string | null;
  price: number;
  duration: number;
};
export type PilotCatalog = { main: CatalogItem; addons: CatalogItem[] };

/**
 * Display title without the catalog year prefix and without dashes:
 * "2026, dash, Market Your Build" -> "Market Your Build", "90, dash, 120 seconds" ->
 * "90 to 120 seconds".
 */
export function cleanTitle(raw: string | null | undefined): string {
  let s = (raw ?? "").trim();
  s = s.replace(/^\d{4}\s*[\u2014\u2013-]\s*/, "");
  s = s.replace(/(\d)\s*[\u2014\u2013]\s*(\d)/g, "$1 to $2");
  s = s.replace(/\s*[\u2014\u2013]\s*/g, ", ");
  return s.trim();
}

function toItem(p: AryeoProduct, v: AryeoVariant): CatalogItem | null {
  const price = typeof v.price_amount === "number" ? v.price_amount : v.price;
  if (typeof price !== "number") return null;
  return {
    productId: p.id,
    variantId: v.id,
    name: cleanTitle(p.title),
    option: v.title ? cleanTitle(v.title) : null,
    price,
    duration: typeof v.duration === "number" ? v.duration : 0,
  };
}

/** Pick the pilot's products out of an Aryeo /products read. Null if the main shoot is missing. */
export function catalogFromProducts(products: AryeoProduct[]): PilotCatalog | null {
  const byId = new Map(products.filter((p) => p.active !== false).map((p) => [p.id, p]));
  const mainProduct = byId.get(PILOT_PRODUCT_IDS.main);
  const mainVariant = mainProduct?.variants?.[0];
  const main = mainProduct && mainVariant ? toItem(mainProduct, mainVariant) : null;
  if (!main) return null;
  const addons: CatalogItem[] = [];
  for (const id of PILOT_PRODUCT_IDS.addons) {
    const p = byId.get(id);
    for (const v of p?.variants ?? []) {
      const item = p ? toItem(p, v) : null;
      if (item) addons.push(item);
    }
  }
  return { main, addons };
}

/**
 * The shoot plus the chosen add-ons, resolved against the catalog (never
 * against client-sent prices). Unknown ids are dropped; one option per product.
 */
export function selectionToItems(catalog: PilotCatalog, variantIds: string[]): CatalogItem[] {
  const items: CatalogItem[] = [catalog.main];
  const seen = new Set<string>([catalog.main.productId]);
  for (const id of variantIds) {
    const hit = catalog.addons.find((a) => a.variantId === id);
    if (hit && !seen.has(hit.productId)) {
      items.push(hit);
      seen.add(hit.productId);
    }
  }
  return items;
}

export function itemsTotal(items: CatalogItem[]): number {
  return items.reduce((sum, i) => sum + i.price, 0);
}

/** Minutes to ask Aryeo for: the sum of variant durations, at least the default. */
export function shootDuration(items: CatalogItem[]): number {
  const sum = items.reduce((s, i) => s + (i.duration > 0 ? i.duration : 0), 0);
  return Math.max(sum, DEFAULT_DURATION);
}

// ── Money ──────────────────────────────────────────────────────────────────

export function money(cents: number): string {
  const dollars = cents / 100;
  return dollars.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

/** 50 percent due today, rounded to the cent; the balance absorbs the odd cent. */
export function depositSplit(totalCents: number): { total: number; dueToday: number; balance: number } {
  const total = Math.max(0, Math.round(totalCents));
  const dueToday = Math.round(total / 2);
  return { total, dueToday, balance: total - dueToday };
}

// ── Team, customers, dates ─────────────────────────────────────────────────

export type Shooter = "cayden" | "thomas";
export type TeamMember = { id: string; customer_display_name?: string | null; name?: string | null };
export type TeamIds = Record<Shooter, string | null>;

export function teamIdsByName(members: TeamMember[]): TeamIds {
  const find = (name: string) =>
    members.find((m) => (m.customer_display_name ?? m.name ?? "").trim().toLowerCase() === name.toLowerCase())
      ?.id ?? null;
  return { cayden: find(TEAM_NAMES.cayden), thomas: find(TEAM_NAMES.thomas) };
}

export type AryeoCustomer = {
  id: string;
  email?: string | null;
  has_restricted_photographers?: boolean | null;
};
export type CustomerMatch = { id: string; restricted: boolean } | null;

/** Exact email match from a /customers search. Restricted if any matching record is. */
export function customerFromSearch(list: AryeoCustomer[], email: string): CustomerMatch {
  const want = email.trim().toLowerCase();
  if (!want) return null;
  const hits = list.filter((c) => (c.email ?? "").trim().toLowerCase() === want);
  if (hits.length === 0) return null;
  return { id: hits[0].id, restricted: hits.some((c) => c.has_restricted_photographers === true) };
}

/** YYYY-MM-DD plus n days, calendar math only. */
export function addDays(ymd: string, n: number): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return t.toISOString().slice(0, 10);
}

/**
 * Aryeo's available-dates window in its Y-m-d\TH:i:s\Z format. 06:00Z is
 * midnight Central in standard time; in daylight time the edges shift by an
 * hour, which only matters at the first and last day of the window.
 */
export function dateWindow(fromYmd: string, days: number): { start: string; end: string } {
  return { start: `${fromYmd}T06:00:00Z`, end: `${addDays(fromYmd, days)}T06:00:00Z` };
}

function dayDistance(a: string, b: string): number {
  return Math.abs(Date.parse(`${a}T00:00:00Z`) - Date.parse(`${b}T00:00:00Z`)) / 86_400_000;
}

/** The dates a customer may see in the strip. Restricted customers see Thomas's only. */
export function eligibleDates(args: {
  restricted: boolean;
  caydenDates: string[];
  thomasDates: string[];
}): string[] {
  const pool = args.restricted ? args.thomasDates : [...args.caydenDates, ...args.thomasDates];
  return [...new Set(pool)].sort();
}

/** Up to n eligible dates nearest the chosen one (not the chosen one itself). */
export function closestDates(target: string, dates: string[], n = 3): string[] {
  return [...new Set(dates)]
    .filter((d) => d !== target)
    .sort((a, b) => dayDistance(a, target) - dayDistance(b, target) || (a < b ? -1 : 1))
    .slice(0, n)
    .sort();
}

// ── Rule 40 ────────────────────────────────────────────────────────────────

export type Slot = { start_at: string; end_at: string };
export type DayPick = {
  shooter: Shooter | null;
  slots: Slot[];
  reason: string;
  suggestions: string[];
};

/**
 * Rule 40 shooter order for one day (vault 40-Ops):
 * a. a customer with restricted photographers gets Thomas's times only;
 * b. otherwise Cayden first: if he has any slot that day, show only his;
 * c. only if Cayden has none that day, show Thomas's.
 * Both empty: no times, plus the closest other eligible days.
 */
export function rule40(args: {
  restricted: boolean;
  date: string;
  cayden: Slot[];
  thomas: Slot[];
  caydenDates?: string[];
  thomasDates?: string[];
}): DayPick {
  const suggest = () =>
    closestDates(
      args.date,
      eligibleDates({
        restricted: args.restricted,
        caydenDates: args.caydenDates ?? [],
        thomasDates: args.thomasDates ?? [],
      }),
    );
  if (args.restricted) {
    if (args.thomas.length > 0) {
      return { shooter: "thomas", slots: args.thomas, reason: "restricted customer: Thomas only", suggestions: [] };
    }
    return { shooter: null, slots: [], reason: "restricted customer: Thomas has no times this day", suggestions: suggest() };
  }
  if (args.cayden.length > 0) {
    return { shooter: "cayden", slots: args.cayden, reason: "Cayden has times this day", suggestions: [] };
  }
  if (args.thomas.length > 0) {
    return { shooter: "thomas", slots: args.thomas, reason: "Cayden has no times this day; Thomas", suggestions: [] };
  }
  return { shooter: null, slots: [], reason: "no times this day", suggestions: suggest() };
}

// ── Payloads ───────────────────────────────────────────────────────────────

export type Answers = {
  street: string;
  city: string;
  state: string;
  zip: string;
  sqft: string;
  siteContactName: string;
  siteContactPhone: string;
  company: string;
  buildStage: string;
  bookerName: string;
  bookerEmail: string;
  bookerPhone: string;
};

/** Missing or invalid answers, as field names. Empty array means ready. */
export function validateAnswers(a: Partial<Answers>): (keyof Answers)[] {
  const bad: (keyof Answers)[] = [];
  const req: (keyof Answers)[] = [
    "street", "city", "state", "zip", "sqft", "siteContactName", "siteContactPhone",
    "company", "buildStage", "bookerName", "bookerEmail", "bookerPhone",
  ];
  for (const k of req) if (!(a[k] ?? "").toString().trim()) bad.push(k);
  if (a.zip && !/^\d{5}$/.test(a.zip.trim()) && !bad.includes("zip")) bad.push("zip");
  if (a.sqft && !/^\d[\d,]*$/.test(a.sqft.trim()) && !bad.includes("sqft")) bad.push("sqft");
  if (a.bookerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.bookerEmail.trim()) && !bad.includes("bookerEmail")) {
    bad.push("bookerEmail");
  }
  for (const k of ["siteContactPhone", "bookerPhone"] as const) {
    const digits = (a[k] ?? "").replace(/\D/g, "");
    if (a[k] && digits.length < 10 && !bad.includes(k)) bad.push(k);
  }
  if (a.buildStage && !(BUILD_STAGES as readonly string[]).includes(a.buildStage) && !bad.includes("buildStage")) {
    bad.push("buildStage");
  }
  return bad;
}

export function splitStreet(street: string): { street_number: string; street_name: string } {
  const m = street.trim().match(/^(\d+[A-Za-z]?)\s+(.+)$/);
  return m ? { street_number: m[1], street_name: m[2] } : { street_number: "", street_name: street.trim() };
}

/** The five answers (and who booked) as the team-only note on the order. */
export function buildInternalNotes(a: Answers, extra: { shooterName: string; deposit: string; total: string }): string {
  return [
    "Booked on the pilot page /pilot/builder-shoot.",
    `Builder or company: ${a.company.trim()}`,
    `Square footage: ${a.sqft.trim()}`,
    `Build stage: ${a.buildStage}`,
    `On-site contact: ${a.siteContactName.trim()}, ${a.siteContactPhone.trim()}`,
    `Booked by: ${a.bookerName.trim()}, ${a.bookerEmail.trim()}, ${a.bookerPhone.trim()}`,
    `Shooter by rule 40: ${extra.shooterName}`,
    `Deposit at booking: ${extra.deposit} of ${extra.total}`,
  ].join("\n");
}

export type PlannedRequest = {
  step: string;
  method: "GET" | "POST" | "STUB";
  path: string;
  query?: Record<string, string | number>;
  body?: Record<string, unknown>;
  note?: string;
  /** Live mode: keep data.id from the response under this name for later steps. */
  capture?: "customer_id" | "address_id" | "order_id";
  /** Live mode: this GET must return a slot starting at this time, or the run stops. */
  verifyStartAt?: string;
};

export type PlanInput = {
  answers: Answers;
  items: CatalogItem[];
  slot: Slot;
  date: string;
  shooterId: string;
  shooterName: string;
  customer: CustomerMatch;
  today: string;
};

/**
 * The ordered requests a confirmed booking sends. Placeholders in braces
 * ({customer_id}, {address_id}, {order_id}) are filled from earlier
 * responses in live mode. Notify flags are false for tests.
 */
export function buildCreatePlan(input: PlanInput): PlannedRequest[] {
  const { answers: a, items, slot, shooterId } = input;
  const { total, dueToday } = depositSplit(itemsTotal(items));
  const plan: PlannedRequest[] = [];

  if (input.customer) {
    plan.push({
      step: "Find customer",
      method: "GET",
      path: "/customers",
      query: { "filter[search]": a.bookerEmail.trim() },
      note: `Existing customer ${input.customer.id} is reused; nothing is created.`,
    });
  } else {
    plan.push({
      step: "Create customer",
      method: "POST",
      path: "/customers",
      body: {
        name: a.company.trim() || a.bookerName.trim(),
        email: a.bookerEmail.trim(),
        phone: a.bookerPhone.trim(),
      },
      capture: "customer_id",
      note: "No customer with this email, so one is created.",
    });
  }

  plan.push({
    step: "Create address",
    method: "POST",
    path: "/addresses",
    body: {
      ...splitStreet(a.street),
      city: a.city.trim(),
      state_or_province: a.state.trim().toUpperCase(),
      postal_code: a.zip.trim(),
      country: "US",
      latitude: "(geocoded when sent)",
      longitude: "(geocoded when sent)",
    },
    capture: "address_id",
  });

  plan.push({
    step: "Create order",
    method: "POST",
    path: "/orders",
    body: {
      customer_id: input.customer ? input.customer.id : "{customer_id}",
      address_id: "{address_id}",
      fulfillment_status: "UNFULFILLED",
      notify: false,
      product_items: items.map((i) => ({ variant_id: i.variantId, quantity: 1 })),
      internal_notes: buildInternalNotes(a, {
        shooterName: input.shooterName,
        deposit: money(dueToday),
        total: money(total),
      }),
    },
    capture: "order_id",
  });

  plan.push({
    step: "Re-check the slot with the address (drive time)",
    method: "GET",
    path: "/scheduling/available-timeslots",
    query: {
      date: input.date,
      duration: shootDuration(items),
      interval: SLOT_INTERVAL,
      timezone: TIMEZONE,
      "filter[user_ids][]": shooterId,
      order_id: "{order_id}",
      per_page: 100,
    },
    verifyStartAt: slot.start_at,
    note: "Stops here if the chosen time is no longer offered once drive time is applied.",
  });

  plan.push({
    step: "Create appointment",
    method: "POST",
    path: "/appointments/store",
    body: {
      order_id: "{order_id}",
      start_at: slot.start_at,
      end_at: slot.end_at,
      company_team_member_ids: [shooterId],
      notifyCustomer: false,
      notifyCompany: false,
    },
  });

  plan.push({
    step: "Charge the deposit (Stripe test mode)",
    method: "STUB",
    path: "stripe",
    body: { amount: dueToday, currency: "usd" },
    note: "STUB: deposit collection is not built. No Stripe key is used. A live run stops here.",
  });

  plan.push({
    step: "Record the deposit on the order",
    method: "POST",
    path: "/orders/{order_id}/payments",
    body: { amount: dueToday, currency: "USD", collection_source: "STRIPE", date: input.today },
  });

  return plan;
}

// ── The switch and the sender ──────────────────────────────────────────────

/** The one server switch for every Aryeo write and Stripe call. Unset = dry run. */
export function isLiveCreate(env: Record<string, string | undefined>): boolean {
  const v = (env.PILOT_LIVE_CREATE ?? "").trim().toLowerCase();
  return v === "1" || v === "true";
}

/** The pilot route exists everywhere except Vercel production. */
export function pilotEnabled(env: Record<string, string | undefined>): boolean {
  return env.VERCEL_ENV !== "production";
}

export type StepResult = PlannedRequest & { status: "not sent" | "sent" | "failed" | "stopped"; detail?: string };
export type CreateResult = { mode: "DRY_RUN" | "LIVE"; sent: number; ok: boolean; results: StepResult[] };

type FetchLike = (url: string, init: { method: string; headers: Record<string, string>; body?: string }) => Promise<{
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
}>;

function fill(s: string, ids: Record<string, string>): string {
  return s.replace(/\{(customer_id|address_id|order_id)\}/g, (m, k: string) => ids[k] ?? m);
}

/**
 * Send the plan. With live false (the switch unset) this returns the plan
 * marked "not sent" and never calls fetch at all.
 */
export async function executeCreatePlan(
  plan: PlannedRequest[],
  opts: {
    live: boolean;
    fetchImpl: FetchLike;
    baseUrl: string;
    headers: Record<string, string>;
    geocode?: (body: Record<string, unknown>) => Promise<Record<string, unknown>>;
  },
): Promise<CreateResult> {
  if (!opts.live) {
    return { mode: "DRY_RUN", sent: 0, ok: true, results: plan.map((p) => ({ ...p, status: "not sent" })) };
  }

  const ids: Record<string, string> = {};
  const results: StepResult[] = [];
  let sent = 0;
  for (let i = 0; i < plan.length; i++) {
    const req = plan[i];
    const stopRest = (detail: string, status: StepResult["status"]) => {
      results.push({ ...req, status, detail });
      for (const rest of plan.slice(i + 1)) results.push({ ...rest, status: "not sent" });
      return { mode: "LIVE" as const, sent, ok: false, results };
    };
    if (req.method === "STUB") return stopRest("Deposit collection is a stub; stopped before recording a payment.", "stopped");

    let body = req.body ? (JSON.parse(fill(JSON.stringify(req.body), ids)) as Record<string, unknown>) : undefined;
    if (req.path === "/addresses" && body && opts.geocode) body = await opts.geocode(body);
    const qs = req.query
      ? "?" + new URLSearchParams(Object.entries(req.query).map(([k, v]) => [k, fill(String(v), ids)])).toString()
      : "";
    const url = `${opts.baseUrl}${fill(req.path, ids)}${qs}`;
    const res = await opts.fetchImpl(url, {
      method: req.method,
      headers: { ...opts.headers, ...(body ? { "Content-Type": "application/json" } : {}) },
      body: body ? JSON.stringify(body) : undefined,
    });
    sent++;
    const json = (await res.json().catch(() => null)) as { data?: unknown } | null;
    if (!res.ok) return stopRest(`HTTP ${res.status}`, "failed");
    if (req.verifyStartAt) {
      const list = Array.isArray(json?.data) ? (json.data as Slot[]) : [];
      if (!list.some((s) => s.start_at === req.verifyStartAt)) {
        return stopRest("The chosen time is not offered once drive time is applied.", "stopped");
      }
    }
    if (req.capture) {
      const id = (json?.data as { id?: string } | undefined)?.id;
      if (!id) return stopRest("Response had no data.id.", "failed");
      ids[req.capture] = id;
    }
    results.push({ ...req, status: "sent" });
  }
  return { mode: "LIVE", sent, ok: true, results };
}
