"use client";

import Link from "next/link";
import Image from "next/image";

const chips = ["Headshots", "Reels & short-form", "Content days"];

export function HeroBranding() {
  return (
    <section
      aria-label="Personal Branding Media hero"
      className="relative overflow-hidden border-b border-white/5 bg-[#0a0a0a]"
    >
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[600px] w-[600px] rounded-full bg-rose-500/8 blur-[200px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-amber-400/6 blur-[180px]" />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:px-12 md:py-32 lg:gap-20">
        {/* LEFT — typography */}
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-rose-400/30 bg-rose-400/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-300" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-rose-200/90">
              Headshots · Reels · Content Days
            </span>
          </div>

          <h1 className="mt-10 font-display text-[clamp(40px,6.5vw,76px)] font-extralight leading-[0.98] tracking-tight text-white-90">
            Your face is{" "}
            <span className="italic text-rose-200/70">the brand.</span>
            <br />
            Your content is the proof.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
            One-day shoots that build a month of content: headshots, reels,
            photos, and short-form video for agents, founders, speakers, and
            teams. Little Rock studio + on-location across Arkansas.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-white/60"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:book@averyandbryant.com?subject=Personal%20Branding%20Session"
              className="inline-flex items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Book a Session
            </a>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center rounded border border-white/20 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white-70 transition-all hover:border-white/40 hover:text-white"
            >
              See Packages
            </Link>
          </div>

          <p className="mt-10 text-[10px] uppercase tracking-[0.25em] text-white/30">
            ☆ Solo sessions · team days · editorial content
          </p>
        </div>

        {/* RIGHT — real personal-brand session portrait (Krystal Browning BTS + reels swap in when delivered) */}
        <div className="relative flex justify-center">
          <div className="relative w-[280px] md:w-[340px]">
            <div className="relative aspect-[2/3] overflow-hidden rounded-[24px] border border-white/15 bg-[#111] shadow-[0_30px_60px_rgba(0,0,0,0.55)]">
              <Image
                src="/images/thomas-headshot.jpg"
                alt="Avery & Bryant personal branding session"
                fill
                priority
                sizes="(max-width: 768px) 280px, 340px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/5"
              />
            </div>

            {/* Floating spec sticker */}
            <div className="absolute -bottom-5 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-black/70 px-5 py-2 backdrop-blur-md">
              <span className="text-[10px] uppercase tracking-[0.25em] text-rose-200/80">
                1-day shoot · 4 reels + 20 photos
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
