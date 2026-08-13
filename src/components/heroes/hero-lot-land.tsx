"use client";

import Link from "next/link";

const words = ["Sell", "the", "vision,"];

export function HeroLotLand() {
  return (
    <section
      aria-label="Lot & Land Media hero"
      className="relative isolate flex min-h-[85vh] items-center overflow-hidden md:min-h-screen"
    >
      {/* Aerial photo background — real A&B drone capture (1052 Stagecoach, Cabot AR) */}
      <div
        aria-hidden
        className="hero-ll-video absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/lot-land/hero-poster.jpg')" }}
      />

      {/* Heavier gradient — aerial needs the text to read cleanly even over bright sky */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/75 to-[#0a0a0a]/30" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0a0a0a]/70 via-transparent to-transparent" />

      {/* Scan line motif to evoke aerial/topographic feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 80px)",
        }}
      />

      <span
        aria-hidden
        className="absolute left-8 top-24 z-[3] h-20 w-20 border-l border-t border-crimson/25"
      />
      <span
        aria-hidden
        className="absolute bottom-24 right-8 z-[3] h-20 w-20 border-b border-r border-crimson/25"
      />

      <div className="relative z-[4] mx-auto w-full max-w-[1280px] px-6 py-24 md:px-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-crimson/30 bg-crimson/5 px-4 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson" />
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-crimson">
            Lot & Land Media
          </span>
        </div>

        <h1 className="mt-8 font-display text-[clamp(40px,8vw,96px)] font-extralight leading-[0.98] tracking-tight text-white-90">
          <span className="block overflow-hidden">
            {words.map((w, i) => (
              <span
                key={w}
                className="hero-ll-word mr-4 inline-block"
                style={{ animationDelay: `${i * 140}ms` }}
              >
                {w}
              </span>
            ))}
          </span>
          <span
            className="hero-ll-word mt-2 block text-white-40"
            style={{ animationDelay: `${words.length * 140 + 120}ms` }}
          >
            not just the dirt.
          </span>
        </h1>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-white-50 md:text-lg">
          FAA Part 107–licensed aerial drone, boundary overlays, proximity maps,
          and cinematic flyover video for land, lots, and development sites
          across Arkansas.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/order/lot-land"
            className="inline-flex items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
          >
            Book an Aerial
          </Link>
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center rounded border border-white/20 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white-70 transition-all hover:border-white/40 hover:text-white"
          >
            View Portfolio
          </Link>
        </div>

        {/* Trust line — aerial licensing matters for land agents */}
        <p className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.25em] text-fg-secondary">
          <span>★ FAA Part 107 licensed</span>
          <span aria-hidden>·</span>
          <span>Fully insured pilots</span>
          <span aria-hidden>·</span>
          <span>Boundary overlays available</span>
        </p>
      </div>

      <style>{`
        @keyframes heroLlWordIn {
          0%   { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .hero-ll-word {
          opacity: 0;
          animation: heroLlWordIn 900ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        /* Slower, subtler zoom — land photography wants stillness */
        @keyframes heroLlZoom {
          0%   { transform: scale(1.02); }
          100% { transform: scale(1.08); }
        }
        .hero-ll-video {
          animation: heroLlZoom 40s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  );
}
