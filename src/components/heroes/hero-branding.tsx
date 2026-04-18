"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

const chips = ["Headshots", "Reels & short-form", "Content days"];

// Each phone frame loads the same video but starts at a different offset,
// so the three reels feel like distinct content. Swap these for real
// vertical reels once they're shot.
const reels = [
  { src: "/images/demo-video.mp4", start: 0.4, offsetClass: "md:mt-0" },
  { src: "/images/demo-video.mp4", start: 3.2, offsetClass: "md:mt-10" },
  { src: "/images/demo-video.mp4", start: 6.8, offsetClass: "md:mt-20" },
];

function ReelPhone({
  src,
  start,
  eager = false,
}: {
  src: string;
  start: number;
  eager?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const seed = () => {
      try {
        v.currentTime = start;
        v.play().catch(() => {});
      } catch {
        /* ignore */
      }
    };
    if (v.readyState >= 1) seed();
    else v.addEventListener("loadedmetadata", seed, { once: true });
  }, [start]);

  return (
    <div className="relative aspect-[9/16] overflow-hidden rounded-[28px] border border-white/15 bg-black shadow-[0_30px_60px_rgba(0,0,0,0.55)]">
      {/* Notch */}
      <div className="absolute left-1/2 top-2 z-20 h-4 w-16 -translate-x-1/2 rounded-full bg-black/80" />
      {/* Subtle inner frame highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[28px] ring-1 ring-inset ring-white/5"
      />
      <video
        ref={ref}
        autoPlay
        loop
        muted
        playsInline
        preload={eager ? "auto" : "metadata"}
        poster="/images/portfolio-headshot-1.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

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
              href="mailto:hello@averyandbryant.com?subject=Personal%20Branding%20Session"
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

        {/* RIGHT — reel stack (desktop: 3-phone cascade, mobile: single) */}
        <div className="relative">
          {/* Mobile: single phone */}
          <div className="mx-auto w-[240px] md:hidden">
            <ReelPhone src={reels[1].src} start={reels[1].start} eager />
          </div>

          {/* Desktop: 3-phone cascade */}
          <div className="hidden grid-cols-3 gap-4 md:grid">
            {reels.map((reel, i) => (
              <div key={i} className={reel.offsetClass}>
                <ReelPhone
                  src={reel.src}
                  start={reel.start}
                  eager={i === 1}
                />
              </div>
            ))}
          </div>

          {/* Floating spec sticker */}
          <div className="absolute -bottom-6 left-1/2 z-30 hidden -translate-x-1/2 rounded-full border border-white/15 bg-black/70 px-5 py-2 backdrop-blur-md md:block">
            <span className="text-[10px] uppercase tracking-[0.25em] text-rose-200/80">
              1-day shoot · 4 reels + 20 photos
            </span>
          </div>

          {/* Decorative fallback portrait tucked behind on very large screens */}
          <div className="pointer-events-none absolute -top-10 left-0 hidden h-24 w-20 overflow-hidden rounded border border-white/10 bg-[#111] opacity-70 shadow-lg lg:block">
            <Image
              src="/images/portfolio-headshot-2.jpg"
              alt="Headshot sample"
              fill
              sizes="5rem"
              className="object-cover grayscale"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
