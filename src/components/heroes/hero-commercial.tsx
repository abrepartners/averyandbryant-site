"use client";

import Link from "next/link";

const tiles = [
  {
    label: "Dealerships",
    meta: "Inventory · drone · brand",
  },
  {
    label: "Offices & Retail",
    meta: "Exterior · interior · team",
  },
  {
    label: "Industrial",
    meta: "Aerial · facility tours",
  },
  {
    label: "Hospitality",
    meta: "Restaurants · venues · hotels",
  },
];

export function HeroCommercial() {
  return (
    <section
      aria-label="Commercial Media hero"
      className="relative overflow-hidden border-b border-white/5 bg-[#0a0a0a]"
    >
      {/* Crimson ambient glows (brand accent) */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-crimson/5 blur-[200px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-crimson/6 blur-[160px]" />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-[0.95fr_1.05fr] md:gap-16 md:px-12 md:py-32 lg:gap-20">
        {/* LEFT — typography */}
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-crimson/30 bg-crimson/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-crimson/90">
              Commercial Media
            </span>
          </div>

          <h1 className="mt-10 font-display text-[clamp(40px,6.8vw,84px)] font-extralight leading-[0.96] tracking-tight text-fg">
            Media for everything
            <br />
            <span className="text-fg-secondary italic">
              that isn&apos;t a home.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-fg-strong md:text-lg">
            Commercial real estate listings, dealerships, office parks, retail,
            restaurants, industrial, and hospitality. Custom-scope photography,
            drone, video, and ongoing content programs for commercial brokers,
            owners, and operators across Arkansas.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:book@averyandbryant.com?subject=Commercial%20Media%20Quote"
              className="inline-flex items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Request a Quote
            </a>
            <a
              href="tel:+15015022925"
              className="inline-flex items-center justify-center rounded border border-white/20 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-fg-strong transition-all hover:border-white/40 hover:text-white"
            >
              Call (501) 502-2925
            </a>
          </div>

          <p className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.25em] text-fg-secondary">
            <span>☰ Custom scope</span>
            <span aria-hidden>·</span>
            <span>Recurring programs</span>
            <span aria-hidden>·</span>
            <span>Fully insured</span>
          </p>
        </div>

        {/* RIGHT — 2x2 category board (editorial cards; real commercial photos wire in as shot) */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {tiles.map((t, i) => (
            <div
              key={t.label}
              className={`group relative flex flex-col justify-between overflow-hidden rounded border border-white/10 bg-[#0d0d0d] p-5 transition-colors hover:border-crimson/30 md:p-6 ${
                i % 3 === 0 ? "aspect-[4/5]" : "aspect-square"
              }`}
            >
              {/* Technical grid motif */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute right-4 top-4 h-8 w-8 rounded-full border border-crimson/20"
              />

              <p className="relative font-mono text-[10px] uppercase tracking-[0.25em] text-crimson/60">
                {String(i + 1).padStart(2, "0")}
              </p>

              <div className="relative">
                <p className="font-display text-lg font-medium text-fg md:text-xl">
                  {t.label}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-fg-secondary">
                  {t.meta}
                </p>
              </div>

              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-crimson/60 to-transparent transition-all duration-700 group-hover:w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
