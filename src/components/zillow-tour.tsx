"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Rotate3d } from "lucide-react";
import { type LiveTour, zillowUnbrandedTourUrl } from "@/lib/live-tours";

/**
 * Click-to-load Zillow 3D Home tour.
 *
 * The poster shows first; the iframe is only created after the visitor asks
 * for it. That keeps pages fast (each tour is a heavy WebGL viewer), avoids
 * Zillow's scroll-jump on load, and means a visitor only meets Zillow's bot
 * check after choosing to open the tour.
 *
 * The poster stays on top as a loading layer until the iframe reports load
 * (or a timeout passes), so the frame never changes size: no layout shift.
 */
export function ZillowTourEmbed({
  tour,
  autoLoad = false,
  fill = false,
  showCaption = true,
}: {
  tour: LiveTour;
  /** Create the iframe immediately (for a modal the visitor already opened). */
  autoLoad?: boolean;
  /** Fill the parent's height instead of using a fixed aspect ratio. */
  fill?: boolean;
  showCaption?: boolean;
}) {
  const [loaded, setLoaded] = useState(autoLoad);
  const [ready, setReady] = useState(false);
  const src = zillowUnbrandedTourUrl(tour.tourId);

  // If Zillow never fires load (blocked network, privacy tools), lift the
  // poster anyway so the visitor sees whatever the frame holds.
  useEffect(() => {
    if (!loaded || ready) return;
    const t = window.setTimeout(() => setReady(true), 12000);
    return () => window.clearTimeout(t);
  }, [loaded, ready]);

  return (
    <div className={fill ? "flex h-full min-h-0 flex-col" : undefined}>
      <div
        className={`relative overflow-hidden rounded-lg border border-white/5 bg-[#111] ${
          fill ? "min-h-0 flex-1" : "aspect-[4/5] sm:aspect-[16/10]"
        }`}
        data-tour-frame=""
      >
        {loaded && (
          <iframe
            src={src}
            title={`Live 3D tour: ${tour.label}`}
            allow="fullscreen; xr-spatial-tracking; accelerometer; gyroscope"
            allowFullScreen
            onLoad={() => setReady(true)}
            className="absolute inset-0 h-full w-full border-0"
          />
        )}

        {!ready && (
          <div className="absolute inset-0">
            <Image
              src={tour.poster}
              alt={tour.posterAlt}
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
            {!loaded ? (
              <button
                type="button"
                onClick={() => setLoaded(true)}
                className="group/tour absolute inset-0 flex items-center justify-center p-6"
                aria-label={`Load the live 3D tour: ${tour.label}`}
              >
                <span className="inline-flex items-center gap-3 rounded bg-crimson px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white shadow-[0_8px_32px_rgba(196,18,48,0.25)] transition-colors group-hover/tour:bg-crimson-dark">
                  <Rotate3d className="h-4 w-4" aria-hidden="true" />
                  Load the live 3D tour
                </span>
              </button>
            ) : (
              <div
                role="status"
                className="absolute inset-0 flex items-center justify-center p-6"
              >
                <span className="inline-flex items-center gap-3 rounded border border-white/20 bg-black/60 px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-fg-strong backdrop-blur-sm">
                  Loading the tour
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {showCaption && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-fg-secondary">
            {tour.label}
          </p>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center text-[10px] uppercase tracking-[0.2em] text-fg-secondary transition-colors hover:text-white"
          >
            Open full screen
          </a>
        </div>
      )}
    </div>
  );
}

/**
 * Full-screen layer holding one live tour. Opening it is the visitor's click,
 * so the iframe loads right away; closing it unmounts the iframe and stops the
 * viewer. Escape and the Close button both close it.
 *
 * Scroll lock keeps the scrollbar gutter, so the page behind does not shift
 * sideways when the layer opens.
 */
export function LiveTourModal({
  tour,
  open,
  onClose,
}: {
  tour: LiveTour;
  open: boolean;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);

    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    const prevGutter = root.style.scrollbarGutter;
    root.style.scrollbarGutter = "stable";
    root.style.overflow = "hidden";

    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
      root.style.scrollbarGutter = prevGutter;
      previouslyFocused?.focus?.();
    };
  }, [open, close]);

  if (!open) return null;

  const src = zillowUnbrandedTourUrl(tour.tourId);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Live 3D tour: ${tour.label}`}
      className="fixed inset-0 z-[100] flex flex-col md:p-8"
      onClick={close}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      <div
        className="relative mx-auto flex h-full w-full max-w-6xl flex-col bg-[#0d0d0d] p-3 md:rounded md:border md:border-white/10 md:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 pb-3 md:pb-5">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
              Live 3D tour
            </p>
            <h3 className="mt-1 truncate font-display text-lg font-light text-fg md:text-2xl">
              {tour.label}
            </h3>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-[44px] items-center text-[10px] uppercase tracking-[0.2em] text-fg-secondary transition-colors hover:text-white sm:inline-flex"
            >
              Open full screen
            </a>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close the live tour"
              className="min-h-[44px] rounded border border-white/15 px-4 text-xs text-fg-strong transition-colors hover:border-white/40 hover:text-white"
            >
              Close (Esc)
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1">
          <ZillowTourEmbed tour={tour} autoLoad fill showCaption={false} />
        </div>

        <p className="pt-3 text-xs text-fg-secondary md:pt-4">
          A Zillow 3D Home tour we captured. Drag to look around and move room
          to room.
        </p>
      </div>
    </div>
  );
}
