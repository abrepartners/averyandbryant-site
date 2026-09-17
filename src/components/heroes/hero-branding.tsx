"use client";

import Link from "next/link";
import Image from "next/image";

const chips = [
  "Headshot Session, $95",
  "Brand Session, $299",
  "Everything else, on a call",
];

export function HeroBranding() {
  return (
    <section
      aria-label="Headshots and brand sessions hero"
      className="relative overflow-hidden border-b border-white/5 bg-[#0a0a0a]"
    >
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[600px] w-[600px] rounded-full bg-crimson/8 blur-[200px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-crimson/6 blur-[180px]" />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-[1fr_1fr] md:gap-16 md:px-12 md:py-32 lg:gap-20">
        {/* LEFT, typography */}
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-crimson/30 bg-crimson/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-crimson/90">
              Headshots / Brand Sessions / Central Arkansas
            </span>
          </div>

          <h1 className="mt-10 font-display text-[clamp(40px,6.5vw,76px)] font-extralight leading-[0.98] tracking-tight text-fg">
            Your face is{" "}
            <span className="italic text-crimson/70">the brand.</span>
            <br />
            Let us make it look like it.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-fg-strong md:text-lg">
            Two sessions are simple enough to price on a page, so they are
            priced on this page: a $95 headshot and a $299 brand session, both
            shot in our Little Rock studio. Content days, team days and ongoing
            work get built around you on a free call, because a single printed
            number would be wrong for almost everyone who reads it.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-fg-strong"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Book a Session
            </Link>
            <Link
              href="#what-we-do"
              className="inline-flex items-center justify-center rounded border border-white/20 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-fg-strong transition-all hover:border-white/40 hover:text-white"
            >
              What each one is
            </Link>
          </div>

          <p className="mt-10 text-[10px] uppercase tracking-[0.25em] text-fg-secondary">
            Studio sessions / team blocks / on location across Central Arkansas
          </p>
        </div>

        {/* RIGHT, a real frame of the rooms we shoot in */}
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-[520px]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-white/15 bg-[#111] shadow-[0_30px_60px_rgba(0,0,0,0.55)]">
              <Image
                src="/images/studio/spot-10.jpg"
                alt="Two rose velvet chairs and microphones on boom arms in front of a sage green paneled wall, lit by a warm floor lamp"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 520px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/5"
              />
            </div>

            {/* Floating label */}
            <div className="absolute -bottom-5 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-black/70 px-5 py-2 backdrop-blur-md">
              <span className="text-[10px] uppercase tracking-[0.25em] text-crimson/80">
                Shot at The Spot, our Little Rock studio
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
