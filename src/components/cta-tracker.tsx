"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/**
 * Counts every button and link click on the site as a "cta_click" in Google
 * Analytics and a "CtaClick" on the Meta pixel, with the button's words, the
 * part of the page it sits in and where it leads. One listener for the whole
 * site, so a new button is counted without anyone remembering to wire it.
 *
 * Skipped: fold toggles (anything with aria-expanded) unless they carry a
 * data-cta name, and anything inside [data-no-track]. Only the button's own
 * words are sent, never what a visitor typed.
 */

function destination(el: HTMLElement): string {
  if (!(el instanceof HTMLAnchorElement)) return "";
  const raw = el.getAttribute("href") || "";
  if (raw.startsWith("#")) return raw;
  if (raw.startsWith("tel:")) return "tel";
  if (raw.startsWith("mailto:")) return "mailto";
  try {
    const u = new URL(raw, window.location.href);
    const local = u.host === window.location.host;
    // No query string: it can carry ids we do not want in analytics.
    return `${local ? "" : u.host}${u.pathname}${u.hash}`;
  } catch {
    return "";
  }
}

function place(el: HTMLElement): string {
  if (el.closest("nav")) return "nav";
  if (el.closest("footer")) return "footer";
  const marked = el.closest<HTMLElement>("[data-cta-area], section[id], [id]");
  return marked?.dataset.ctaArea || marked?.id || "page";
}

export function CtaTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest?.<HTMLElement>("a[href], button, [data-cta]");
      if (!el || el.closest("[data-no-track]")) return;
      const named = el.dataset.cta;
      if (!named && el.hasAttribute("aria-expanded")) return;
      const label = (named || el.getAttribute("aria-label") || el.textContent || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 80);
      if (!label) return;
      track("cta_click", {
        cta_label: label,
        cta_area: place(el),
        cta_destination: destination(el) || undefined,
        page_path: window.location.pathname,
      });
    };
    // Capture phase, so the click is counted before the page moves on.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
