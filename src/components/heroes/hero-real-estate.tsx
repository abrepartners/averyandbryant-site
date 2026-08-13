"use client";

import Link from "next/link";

const words = ["Real", "Estate", "Media"];

export function HeroRealEstate() {
  return (
    <section
      aria-label="Real Estate Media hero"
      className="relative isolate flex min-h-[85vh] items-center overflow-hidden md:min-h-screen"
    >
      {/* Photo background — real A&B listing (1052 Stagecoach, Cabot AR) */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/real-estate/hero.jpg')" }}
      />

      {/* Dark gradient */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/40" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-transparent" />

      {/* Film grain */}
      <svg
        className="pointer-events-none absolute inset-0 z-[2] h-full w-full opacity-[0.07] mix-blend-overlay"
        aria-hidden
      >
        <filter id="hero-v1-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-v1-noise)" />
      </svg>

      {/* Corner brackets */}
      <span
        aria-hidden
        className="absolute left-8 top-24 z-[3] h-20 w-20 border-l border-t border-crimson/25"
      />
      <span
        aria-hidden
        className="absolute bottom-24 right-8 z-[3] h-20 w-20 border-b border-r border-crimson/25"
      />

      {/* Content */}
      <div className="relative z-[4] mx-auto w-full max-w-[1280px] px-6 py-24 md:px-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-crimson/30 bg-crimson/5 px-4 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson" />
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-crimson">
            Core Service
          </span>
        </div>

        <h1 className="mt-8 font-display text-[clamp(40px,8vw,96px)] font-extralight leading-[0.98] tracking-tight text-fg">
          <span className="block overflow-hidden">
            {words.map((w, i) => (
              <span
                key={w}
                className="hero-v1-word mr-4 inline-block"
                style={{ animationDelay: `${i * 140}ms` }}
              >
                {w}
              </span>
            ))}
          </span>
          <span
            className="hero-v1-word mt-2 block text-fg-secondary"
            style={{ animationDelay: `${words.length * 140 + 120}ms` }}
          >
            that closes deals.
          </span>
        </h1>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-fg-secondary md:text-lg">
          HDR photography, cinematic video tours, aerial drone, 3D virtual
          tours, and floor plans. Everything your listing needs to stand out.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/order/real-estate"
            className="inline-flex items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
          >
            Book a Shoot
          </Link>
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center rounded border border-white/20 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-fg-strong transition-all hover:border-white/40 hover:text-white"
          >
            View Gallery
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes heroV1WordIn {
          0%   { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .hero-v1-word {
          opacity: 0;
          animation: heroV1WordIn 900ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
      `}</style>
    </section>
  );
}
