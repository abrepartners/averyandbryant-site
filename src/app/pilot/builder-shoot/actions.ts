"use server";

import {
  TEAM_NAMES,
  TIMEZONE,
  addDays,
  buildCreatePlan,
  depositSplit,
  eligibleDates,
  executeCreatePlan,
  isLiveCreate,
  itemsTotal,
  pilotEnabled,
  rule40,
  selectionToItems,
  shootDuration,
  validateAnswers,
  type Answers,
  type CreateResult,
  type Shooter,
  type Slot,
} from "@/lib/pilot-booking/core";
import {
  ARYEO_BASE_URL,
  aryeoHeaders,
  availableDates,
  availableSlots,
  findCustomer,
  readCatalog,
  readTeam,
} from "@/lib/pilot-booking/aryeo";

/**
 * Server actions for the booking pilot. Reads only, unless the server switch
 * PILOT_LIVE_CREATE is on (it is not). Every action refuses to run on Vercel
 * production, the same as the page.
 */

const WINDOW_DAYS = 21;
const FAIL = "We could not read the schedule just now. Please try again.";

function todayCentral(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIMEZONE }).format(new Date());
}

function guard() {
  if (!pilotEnabled(process.env)) throw new Error("Not found");
}

async function context(email: string, variantIds: string[]) {
  const [catalog, team, customer] = await Promise.all([readCatalog(), readTeam(), findCustomer(email)]);
  if (!catalog) throw new Error("catalog");
  if (!team.cayden || !team.thomas) throw new Error("team");
  const items = selectionToItems(catalog, variantIds);
  return { catalog, team: team as Record<Shooter, string>, customer, items, duration: shootDuration(items) };
}

export type DatesResult = { ok: true; dates: string[] } | { ok: false; error: string };

export async function loadDates(input: { email: string; variantIds: string[] }): Promise<DatesResult> {
  guard();
  try {
    const { team, customer, duration } = await context(input.email, input.variantIds);
    const from = addDays(todayCentral(), 1);
    const restricted = customer?.restricted === true;
    const [caydenDates, thomasDates] = await Promise.all([
      restricted ? Promise.resolve([]) : availableDates(team.cayden, from, WINDOW_DAYS, duration),
      availableDates(team.thomas, from, WINDOW_DAYS, duration),
    ]);
    return { ok: true, dates: eligibleDates({ restricted, caydenDates, thomasDates }) };
  } catch (err) {
    console.error("[pilot-booking] loadDates", (err as Error).message);
    return { ok: false, error: FAIL };
  }
}

export type DayResult =
  | {
      ok: true;
      shooter: Shooter | null;
      shooterName: string | null;
      slots: Slot[];
      reason: string;
      suggestions: string[];
    }
  | { ok: false; error: string };

async function pickDay(team: Record<Shooter, string>, restricted: boolean, date: string, duration: number) {
  const [cayden, thomas] = await Promise.all([
    restricted ? Promise.resolve([] as Slot[]) : availableSlots(team.cayden, date, duration),
    availableSlots(team.thomas, date, duration),
  ]);
  let pick = rule40({ restricted, date, cayden, thomas });
  if (pick.shooter === null) {
    const from = addDays(todayCentral(), 1);
    const [caydenDates, thomasDates] = await Promise.all([
      restricted ? Promise.resolve([]) : availableDates(team.cayden, from, WINDOW_DAYS, duration),
      availableDates(team.thomas, from, WINDOW_DAYS, duration),
    ]);
    pick = rule40({ restricted, date, cayden, thomas, caydenDates, thomasDates });
  }
  return pick;
}

export async function loadDay(input: { email: string; variantIds: string[]; date: string }): Promise<DayResult> {
  guard();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) return { ok: false, error: "Pick a date." };
  try {
    const { team, customer, duration } = await context(input.email, input.variantIds);
    const pick = await pickDay(team, customer?.restricted === true, input.date, duration);
    return {
      ok: true,
      shooter: pick.shooter,
      shooterName: pick.shooter ? TEAM_NAMES[pick.shooter] : null,
      slots: pick.slots,
      reason: pick.reason,
      suggestions: pick.suggestions,
    };
  } catch (err) {
    console.error("[pilot-booking] loadDay", (err as Error).message);
    return { ok: false, error: FAIL };
  }
}

export type PrepareResult =
  | {
      ok: true;
      mode: CreateResult["mode"];
      sent: number;
      runOk: boolean;
      shooterName: string;
      total: number;
      dueToday: number;
      balance: number;
      results: CreateResult["results"];
    }
  | { ok: false; error: string };

/** Nominatim lookup for the address coordinates Aryeo requires. Used by a live run only. */
async function geocode(body: Record<string, unknown>): Promise<Record<string, unknown>> {
  const q = [
    `${body.street_number ?? ""} ${body.street_name ?? ""}`.trim(),
    body.city,
    body.state_or_province,
    body.postal_code,
  ].join(", ");
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?${new URLSearchParams({ q, format: "json", countrycodes: "us", limit: "1" })}`,
    { headers: { "User-Agent": "AveryBryant-BookingPilot/1.0" }, cache: "no-store" },
  );
  const hits = (await res.json()) as { lat: string; lon: string }[];
  if (!hits[0]) throw new Error("Address not found on the map.");
  return { ...body, latitude: Number(hits[0].lat), longitude: Number(hits[0].lon) };
}

export async function prepareBooking(input: {
  answers: Answers;
  variantIds: string[];
  date: string;
  startAt: string;
}): Promise<PrepareResult> {
  guard();
  const bad = validateAnswers(input.answers);
  if (bad.length) return { ok: false, error: "Some answers are missing. Go back to step 2." };
  try {
    const { team, customer, items, duration } = await context(input.answers.bookerEmail, input.variantIds);

    // Re-read the day so the chosen time is checked against Aryeo right now.
    const pick = await pickDay(team, customer?.restricted === true, input.date, duration);
    const slot = pick.slots.find((s) => s.start_at === input.startAt);
    if (!pick.shooter || !slot) {
      return { ok: false, error: "That time was just taken. Go back and pick another." };
    }

    const plan = buildCreatePlan({
      answers: input.answers,
      items,
      slot,
      date: input.date,
      shooterId: team[pick.shooter],
      shooterName: TEAM_NAMES[pick.shooter],
      customer,
      today: todayCentral(),
    });

    const live = isLiveCreate(process.env);
    const run = await executeCreatePlan(plan, {
      live,
      fetchImpl: fetch,
      baseUrl: ARYEO_BASE_URL,
      headers: live ? aryeoHeaders() : {},
      geocode: live ? geocode : undefined,
    });
    const split = depositSplit(itemsTotal(items));
    return {
      ok: true,
      mode: run.mode,
      sent: run.sent,
      runOk: run.ok,
      shooterName: TEAM_NAMES[pick.shooter],
      ...split,
      results: run.results,
    };
  } catch (err) {
    console.error("[pilot-booking] prepareBooking", (err as Error).message);
    return { ok: false, error: FAIL };
  }
}
