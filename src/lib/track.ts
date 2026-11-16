/**
 * Events to Google Analytics and the Meta pixel from the page's own code.
 *
 * Both are loaded by the Tag Manager container (src/components/analytics.tsx),
 * which on 2026-11-16 carried only the Google tag and the pixel's page view:
 * no click triggers and no lead events. So events are sent from here and
 * nothing in Tag Manager should also fire on them, or they count twice.
 *
 * Never pass anything a visitor typed (name, phone, email, notes).
 */

type Params = Record<string, string | number | undefined>;

type TrackWindow = Window & {
  dataLayer?: unknown[];
  fbq?: (...args: unknown[]) => void;
  google_tag_manager?: Record<string, unknown>;
};

export function track(
  event: string,
  params: Params = {},
  /** A Meta standard event name (for example "Lead"). Custom otherwise. */
  meta?: { standard?: string; custom?: string },
) {
  if (typeof window === "undefined") return;
  const w = window as TrackWindow;

  try {
    w.dataLayer = w.dataLayer || [];
    const layer = w.dataLayer;
    // The Google tag only reads commands pushed as an arguments object, the
    // way its own gtag() helper pushes them. A plain array is ignored.
    const gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      layer.push(arguments);
    } as unknown as (...args: unknown[]) => void;
    // The Google tag is loaded by Tag Manager, not by a gtag config call, so
    // an event with no send_to goes nowhere (tested 2026-11-16). Name the
    // Analytics property the container loaded.
    const ids = Object.keys(w.google_tag_manager ?? {}).filter((k) =>
      k.startsWith("G-"),
    );
    if (ids.length) gtag("event", event, { ...params, send_to: ids });
  } catch {
    // Tracking never breaks the page.
  }

  try {
    if (typeof w.fbq === "function") {
      if (meta?.standard) w.fbq("track", meta.standard, params);
      else w.fbq("trackCustom", meta?.custom ?? "CtaClick", params);
    }
  } catch {
    // Same.
  }
}
