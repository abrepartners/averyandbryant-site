"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PackageSelector } from "@/components/package-selector";

/**
 * Timed quote-helper popup. After a short delay on vertical/pricing pages,
 * shows a teaser pill; clicking opens the 3-question PackageSelector in a
 * modal with lead capture wired to GHL. Dismissal is remembered per session.
 */

const ACTIVE_PATHS = [
  "/real-estate",
  "/builders",
  "/airbnb-rentals",
  "/lot-land",
  "/multi-family",
  "/commercial",
  "/branding",
  "/pricing",
];

const STORAGE_KEY = "ab-quote-popup-dismissed";
const DELAY_MS = 7000;

export function QuotePopup() {
  const pathname = usePathname();
  const [teaser, setTeaser] = useState(false);
  const [open, setOpen] = useState(false);

  const active = ACTIVE_PATHS.includes(pathname ?? "");

  useEffect(() => {
    if (!active) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // storage unavailable — fail open, still show the teaser
    }
    const t = setTimeout(() => setTeaser(true), DELAY_MS);
    return () => clearTimeout(t);
  }, [active]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const dismiss = () => {
    setTeaser(false);
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  };

  if (!active) return null;

  return (
    <>
      {/* teaser pill */}
      {teaser && !open && (
        <div className="fixed bottom-6 right-6 z-50 flex max-w-[calc(100vw-3rem)] items-center gap-3 rounded-full border border-crimson/40 bg-[rgba(13,13,15,0.95)] py-2 pl-5 pr-2 shadow-2xl shadow-black/60 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-left text-sm text-white/85 transition-colors hover:text-white"
          >
            Not sure what you need?{" "}
            <span className="text-crimson">Get a quick quote &rarr;</span>
          </button>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white"
          >
            &#10005;
          </button>
        </div>
      )}

      {/* modal */}
      {open && (
        <div
          className="fixed inset-0 z-[60] overflow-y-auto bg-black/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) dismiss();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Get a quick quote"
        >
          <div className="mx-auto my-8 w-[min(960px,calc(100vw-2rem))] rounded-xl border border-white/10 bg-[#0d0d0f] p-6 md:p-10">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
                  Quick quote
                </p>
                <h2 className="mt-2 font-display text-2xl font-light tracking-tight text-white/90">
                  Three questions. Your number.
                </h2>
              </div>
              <button
                type="button"
                onClick={dismiss}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white"
              >
                &#10005;
              </button>
            </div>
            <PackageSelector leadCapture />
          </div>
        </div>
      )}
    </>
  );
}
