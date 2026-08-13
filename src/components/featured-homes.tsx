"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export type FeaturedHome = {
  id: string;
  city: string;
  label: string;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  images: { url: string; thumb: string; caption: string }[];
};

function stats(h: FeaturedHome) {
  const parts: string[] = [];
  if (h.beds) parts.push(`${h.beds} bd`);
  if (h.baths) parts.push(`${h.baths} ba`);
  if (h.sqft) parts.push(`${h.sqft.toLocaleString()} sqft`);
  return parts.join(" · ");
}

export function FeaturedHomes({ homes }: { homes: FeaturedHome[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [imgIdx, setImgIdx] = useState(0);

  const home = openIdx != null ? homes[openIdx] : null;
  const close = useCallback(() => setOpenIdx(null), []);
  const next = useCallback(() => {
    if (home) setImgIdx((i) => (i + 1) % home.images.length);
  }, [home]);
  const prev = useCallback(() => {
    if (home)
      setImgIdx((i) => (i - 1 + home.images.length) % home.images.length);
  }, [home]);

  const open = (i: number) => {
    setOpenIdx(i);
    setImgIdx(0);
  };

  useEffect(() => {
    if (openIdx == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIdx, close, next, prev]);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {homes.map((h, i) => (
          <button
            key={h.id}
            type="button"
            onClick={() => open(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/5 bg-[#111] text-left transition-all hover:border-crimson/40"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={h.images[0]?.url}
              alt={`${h.label} in ${h.city}, Arkansas — real estate media by Avery & Bryant`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <span className="absolute right-3 top-3 rounded bg-black/50 px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-fg-strong backdrop-blur-sm">
              {h.images.length} photos
            </span>
            <div className="absolute inset-x-4 bottom-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-crimson/80">
                {h.label}
              </p>
              <p className="mt-1 font-display text-lg font-light text-white">
                {h.city}
              </p>
              {stats(h) && (
                <p className="mt-0.5 text-xs text-fg-strong">{stats(h)}</p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {home && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${home.city} gallery`}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={close}
        >
          <div className="absolute inset-0 bg-black/92 backdrop-blur-sm" />
          <div
            className="relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0d0d0d]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between gap-4 border-b border-white/5 px-5 py-3">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-crimson/80">
                  {home.label}
                </span>
                <span className="ml-3 text-sm text-white-80">{home.city}</span>
                {stats(home) && (
                  <span className="ml-3 text-xs text-fg-secondary">
                    {stats(home)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-fg-secondary">
                  {imgIdx + 1} / {home.images.length}
                </span>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="rounded border border-white/15 px-3 py-1.5 text-xs text-fg-strong transition-colors hover:border-white/40 hover:text-white"
                >
                  Esc ✕
                </button>
              </div>
            </div>

            {/* Main image */}
            <div className="relative flex-1 bg-black">
              <div className="relative aspect-[3/2] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={home.images[imgIdx]?.url}
                  alt={
                    home.images[imgIdx]?.caption ||
                    `${home.label} in ${home.city}, Arkansas — Avery & Bryant`
                  }
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </div>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/50 px-3 py-3 text-fg-strong backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white"
              >
                &larr;
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/50 px-3 py-3 text-fg-strong backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white"
              >
                &rarr;
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-2 overflow-x-auto border-t border-white/5 px-4 py-3">
              {home.images.map((im, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setImgIdx(i)}
                  aria-label={`Photo ${i + 1}`}
                  className={`relative h-12 w-16 shrink-0 overflow-hidden rounded border transition-all ${
                    i === imgIdx
                      ? "border-crimson"
                      : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={im.thumb || im.url}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between gap-4 border-t border-white/5 px-5 py-3">
              <p className="text-xs text-fg-secondary">
                Real Arkansas listing, shot + delivered by Avery & Bryant.
              </p>
              <Link
                href="/book"
                className="inline-flex shrink-0 items-center rounded bg-crimson px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark"
              >
                Book a Shoot
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
