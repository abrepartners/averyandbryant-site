"use client";

import Link from "next/link";
import Image from "next/image";

const tiles = [
  {
    src: "/images/portfolio-exterior-1.jpg",
    label: "Dealerships",
    meta: "Inventory · drone · brand",
  },
  {
    src: "/images/portfolio-interior-1.jpg",
    label: "Offices & Retail",
    meta: "Exterior · interior · team",
  },
  {
    src: "/images/portfolio-drone-3.jpg",
    label: "Industrial",
    meta: "Aerial · facility tours",
  },
  {
    src: "/images/staging-twilight.jpg",
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
      {/* Slate/steel palette — reads "commercial" not "residential warm" */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-sky-500/5 blur-[200px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-crimson/6 blur-[160px]" />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-[0.95fr_1.05fr] md:gap-16 md:px-12 md:py-32 lg:gap-20">
        {/* LEFT — typography */}
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-sky-200/90">
              Commercial Media
            </span>
          </div>

          <h1 className="mt-10 font-display text-[clamp(40px,6.8vw,84px)] font-extralight leading-[0.96] tracking-tight text-white-90">
            Media for everything
            <br />
            <span className="text-white-40 italic">that isn&apos;t a home.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
            Commercial real estate listings, dealerships, office parks, retail,
            restaurants, industrial, and hospitality. Custom-scope photography,
            drone, video, and ongoing content programs for commercial brokers,
            owners, and operators across Arkansas.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:hello@averyandbryant.com?subject=Commercial%20Media%20Quote"
              className="inline-flex items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Request a Quote
            </a>
            <a
              href="tel:+15015022925"
              className="inline-flex items-center justify-center rounded border border-white/20 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white-70 transition-all hover:border-white/40 hover:text-white"
            >
              Call (501) 502-2925
            </a>
          </div>

          <p className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.25em] text-white/30">
            <span>☰ Custom scope</span>
            <span aria-hidden>·</span>
            <span>Recurring programs</span>
            <span aria-hidden>·</span>
            <span>Fully insured</span>
          </p>
        </div>

        {/* RIGHT — 2x2 mosaic */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {tiles.map((t, i) => (
            <div
              key={t.label}
              className={`group relative overflow-hidden rounded border border-white/10 bg-[#111] ${
                i % 3 === 0 ? "aspect-[4/5]" : "aspect-square"
              }`}
            >
              <Image
                src={t.src}
                alt={t.label}
                fill
                sizes="(max-width: 768px) 45vw, 22vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-display text-lg font-medium text-white-90">
                  {t.label}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {t.meta}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
