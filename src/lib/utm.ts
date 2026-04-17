const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

const STORAGE_KEY = "ab_attribution_v1";

type Attribution = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export function captureUtms(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const incoming: Attribution = {};
    for (const key of UTM_KEYS) {
      const val = params.get(key);
      if (val) incoming[key] = val;
    }
    if (Object.keys(incoming).length === 0) return;
    const existing = readAttribution();
    if (Object.keys(existing).length > 0) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(incoming));
  } catch {
    // sessionStorage can throw in private mode or sandboxed contexts.
  }
}

function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

export function enrichHref(
  baseHref: string,
  extra: Record<string, string>,
): string {
  try {
    const isRelative = baseHref.startsWith("/");
    const origin =
      typeof window !== "undefined" ? window.location.origin : "http://local";
    const url = new URL(baseHref, origin);
    const merged = { ...readAttribution(), ...extra };
    for (const [k, v] of Object.entries(merged)) {
      if (v && !url.searchParams.has(k)) url.searchParams.set(k, v);
    }
    return isRelative ? `${url.pathname}${url.search}${url.hash}` : url.toString();
  } catch {
    return baseHref;
  }
}
