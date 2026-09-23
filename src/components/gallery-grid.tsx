"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type GalleryItem = {
  id: string;
  cat: string;
  label: string;
  /** Large rendition (2048px): lightbox only. */
  hero: string;
  /** Medium rendition (1024px) when the CDN has one: cards. */
  medium?: string;
  /** Thumbnail (300px). */
  thumb: string;
  city: string;
  street: string;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  count: number;
  tour: string;
};

const CARD_SIZES =
  "(min-width: 1024px) 300px, (min-width: 768px) 33vw, 50vw";

function stats(item: GalleryItem) {
  const parts: string[] = [];
  if (item.beds) parts.push(`${item.beds} bd`);
  if (item.baths) parts.push(`${item.baths} ba`);
  if (item.sqft) parts.push(`${item.sqft.toLocaleString()} sqft`);
  return parts.join(", ");
}

export function GalleryGrid({
  items,
  showFilter = true,
  priorityFirst = false,
}: {
  items: GalleryItem[];
  /** Category chips above the grid; off when the page is already one vertical. */
  showFilter?: boolean;
  /** Eager-load the first card: only for the page's first hero image. */
  priorityFirst?: boolean;
}) {
  const categories = useMemo(() => {
    const seen: { label: string; count: number }[] = [];
    for (const it of items) {
      const found = seen.find((s) => s.label === it.label);
      if (found) found.count += 1;
      else seen.push({ label: it.label, count: 1 });
    }
    return seen;
  }, [items]);

  const [active, setActive] = useState<string>("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const scrollY = useRef(0);

  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((i) => i.label === active)),
    [items, active],
  );

  const open = (item: GalleryItem) => {
    scrollY.current = window.scrollY;
    setLightbox(item);
  };
  const close = useCallback(() => setLightbox(null), []);

  // The filter is React state, so it survives the lightbox; the scroll
  // position is restored on close because iOS drops it with overflow hidden.
  useEffect(() => {
    if (!lightbox) return;
    const y = scrollY.current;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.scrollTo({ top: y });
    };
  }, [lightbox, close]);

  return (
    <>
      {/* Category filter */}
      {showFilter && (
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {[{ label: "All", count: items.length }, ...categories].map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={() => setActive(c.label)}
              className={`min-h-[44px] rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.15em] transition-colors ${
                active === c.label
                  ? "border-crimson bg-crimson/10 text-white"
                  : "border-white/10 text-fg-secondary hover:border-white/30 hover:text-white"
              }`}
            >
              {c.label}
              <span className="ml-2 text-fg-secondary">{c.count}</span>
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {filtered.map((item, i) => {
          const eager = priorityFirst && i === 0;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => open(item)}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-white/5 bg-[#111] text-left transition-all hover:border-crimson/30"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.medium ?? item.thumb}
                srcSet={
                  item.medium
                    ? `${item.thumb} 300w, ${item.medium} 1024w`
                    : undefined
                }
                sizes={CARD_SIZES}
                alt={`${item.label} real estate media${item.city ? ` in ${item.city}, Arkansas` : ""} by Avery & Bryant`}
                loading={eager ? "eager" : "lazy"}
                fetchPriority={eager ? "high" : "auto"}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
              <span className="absolute left-3 top-3 rounded bg-black/50 px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-fg-strong backdrop-blur-sm">
                {item.label}
              </span>
              <div className="absolute inset-x-3 bottom-3">
                <p className="truncate text-xs font-medium text-white">
                  {item.city || "Arkansas"}
                </p>
                {stats(item) && (
                  <p className="mt-0.5 truncate text-[10px] text-fg-strong">
                    {stats(item)}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${lightbox.city} listing`}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={close}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          <div
            className="relative max-h-full w-full max-w-5xl overflow-y-auto rounded-lg border border-white/10 bg-[#0d0d0d]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 min-h-[44px] rounded border border-white/15 bg-black/40 px-3 py-1.5 text-xs text-fg-strong backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white"
            >
              Close
            </button>
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-t-lg bg-[#111]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox.hero}
                alt={`${lightbox.label}, ${lightbox.street ? lightbox.street + ", " : ""}${lightbox.city}, Arkansas real estate media by Avery & Bryant`}
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
                  {lightbox.label}, real client listing
                </p>
                <h3 className="mt-2 font-display text-xl font-light text-fg">
                  {lightbox.street ? `${lightbox.street}, ` : ""}
                  {lightbox.city}
                </h3>
                {(stats(lightbox) || lightbox.count) && (
                  <p className="mt-1 text-sm text-fg-secondary">
                    {[stats(lightbox), `${lightbox.count} photos delivered`]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-4">
                {lightbox.tour && (
                  <a
                    href={lightbox.tour}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center rounded border border-white/15 px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-fg-strong transition-colors hover:border-white/40 hover:text-white"
                  >
                    Full property tour &rarr;
                  </a>
                )}
                <Link
                  href="/book"
                  className="inline-flex min-h-[44px] items-center rounded bg-crimson px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark"
                >
                  Book a shoot
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
