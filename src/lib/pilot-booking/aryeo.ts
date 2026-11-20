import "server-only";
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import {
  TIMEZONE,
  SLOT_INTERVAL,
  catalogFromProducts,
  customerFromSearch,
  dateWindow,
  teamIdsByName,
  type AryeoCustomer,
  type AryeoProduct,
  type CustomerMatch,
  type PilotCatalog,
  type Slot,
  type TeamIds,
  type TeamMember,
} from "./core";

/**
 * Aryeo READS for the booking pilot (GET only). Writes go through
 * executeCreatePlan in core.ts, behind PILOT_LIVE_CREATE.
 */

export const ARYEO_BASE_URL = process.env.ARYEO_API_BASE_URL ?? "https://api.aryeo.com/v1";

// Aryeo sits behind Cloudflare, which rejects non-browser user agents (error
// 1010) with a 403 that looks like a dead key.
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36";

/**
 * ARYEO_API_KEY from the environment. On a local machine only (never on
 * Vercel or in a production build), fall back to the key file the local
 * Aryeo tools use, parsed the same way and never logged.
 */
function apiKey(): string | null {
  const fromEnv = process.env.ARYEO_API_KEY?.trim();
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL || process.env.NODE_ENV === "production") return null;
  const file = process.env.ARYEO_KEY_FILE ?? join(homedir(), "autohdr-bridge", ".env");
  try {
    const m = readFileSync(file, "utf8").match(/^ARYEO_API_KEY\s*=\s*["']?([^"'\r\n]+)/m);
    return m ? m[1].trim() : null;
  } catch {
    return null;
  }
}

export function hasAryeoKey(): boolean {
  return apiKey() !== null;
}

/** Headers for a server-side Aryeo call. Never send these to the browser. */
export function aryeoHeaders(): Record<string, string> {
  const key = apiKey();
  if (!key) throw new Error("Aryeo key is not available on this server.");
  return { Authorization: `Bearer ${key}`, Accept: "application/json", "User-Agent": USER_AGENT };
}

type Page<T> = { data?: T[]; links?: { next?: string | null }; meta?: { last_page?: number } };

async function aryeoGet<T>(path: string, query: Record<string, string | number>): Promise<T> {
  const qs = new URLSearchParams(Object.entries(query).map(([k, v]) => [k, String(v)])).toString();
  const res = await fetch(`${ARYEO_BASE_URL}${path}?${qs}`, {
    method: "GET",
    headers: aryeoHeaders(),
    cache: "no-store",
  });
  if (!res.ok) {
    console.error("[pilot-booking] Aryeo GET failed", path, res.status);
    throw new Error(`Aryeo ${path} returned ${res.status}`);
  }
  return (await res.json()) as T;
}

export async function readCatalog(): Promise<PilotCatalog | null> {
  const all: AryeoProduct[] = [];
  for (let page = 1; page <= 5; page++) {
    const body = await aryeoGet<Page<AryeoProduct>>("/products", { per_page: 100, page });
    all.push(...(body.data ?? []));
    if (!body.links?.next) break;
  }
  return catalogFromProducts(all);
}

export async function readTeam(): Promise<TeamIds> {
  const body = await aryeoGet<Page<TeamMember>>("/company-team-members", { per_page: 50 });
  return teamIdsByName(body.data ?? []);
}

export async function findCustomer(email: string): Promise<CustomerMatch> {
  if (!email.trim()) return null;
  const body = await aryeoGet<Page<AryeoCustomer>>("/customers", {
    "filter[search]": email.trim(),
    per_page: 25,
  });
  return customerFromSearch(body.data ?? [], email);
}

export async function availableDates(userId: string, fromYmd: string, days: number, duration: number): Promise<string[]> {
  const w = dateWindow(fromYmd, days);
  const body = await aryeoGet<Page<{ date: string; is_available?: boolean }>>("/scheduling/available-dates", {
    duration,
    interval: SLOT_INTERVAL,
    timezone: TIMEZONE,
    "filter[start_at]": w.start,
    "filter[end_at]": w.end,
    "filter[user_ids][]": userId,
  });
  return (body.data ?? []).filter((d) => d.is_available !== false).map((d) => d.date);
}

/** Every slot for one shooter on one day (paginated). No order id: no drive time yet. */
export async function availableSlots(userId: string, date: string, duration: number): Promise<Slot[]> {
  const out: Slot[] = [];
  for (let page = 1; page <= 10; page++) {
    const body = await aryeoGet<Page<Slot>>("/scheduling/available-timeslots", {
      date,
      duration,
      interval: SLOT_INTERVAL,
      timezone: TIMEZONE,
      "filter[user_ids][]": userId,
      per_page: 100,
      page,
    });
    out.push(...(body.data ?? []));
    if (page >= (body.meta?.last_page ?? 1)) break;
  }
  return out;
}
