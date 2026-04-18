"use client";

import Link from "next/link";
import Image from "next/image";

const chips = ["Headshots", "Personal brand", "Content days"];

export function HeroBranding() {
  return (
    <section
      aria-label="Personal Branding Media hero"
      className="relative overflow-hidden border-b border-white/5 bg-[#0a0a0a]"
    >
      {/* Warm rim lighting — feels like a portrait studio */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[600px] w-[600px] rounded-full bg-rose-500/8 blur-[200px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-amber-400/6 blur-[180px]" />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-[1fr_1.05fr] md:gap-16 md:px-12 md:py-32 lg:gap-20">
        {/* LEFT — portrait, hero of the hero */}
        <div className="relative order-2 md:order-1">
          <div className="relative overflow-hidden rounded border border-white/10 bg-[#111] aspect-[4/5]">
            <Image
              src="/images/portfolio-headshot-1.jpg"
              alt="Portrait — personal branding shoot sample"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
            {/* Warm glow inside the frame */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-rose-500/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 via-transparent to-transparent" />

            {/* Studio badge */}
            <div className="absolute left-6 top-6 rounded-full border border-white/15 bg-black/40 px-3 py-1 backdrop-blur-md">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white-70">
                ☀︎ Studio · Little Rock
              </span>
            </div>

            {/* Name card — personifies the portrait */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                  Sample session
                </p>
                <p className="mt-1 font-display text-lg text-white-90">
                  Agent headshot · natural light
                </p>
              </div>
            </div>
          </div>

          {/* Small secondary thumb, offset — editorial layering */}
          <div className="absolute -bottom-8 -right-4 hidden h-40 w-32 overflow-hidden rounded border border-white/10 bg-[#111] shadow-[0_20px_40px_rgba(0,0,0,0.4)] md:block">
            <Image
              src="/images/portfolio-headshot-2.jpg"
              alt="Second portrait sample"
              fill
              sizes="8rem"
              className="object-cover"
            />
          </div>
        </div>

        {/* RIGHT — typography */}
        <div className="order-1 flex flex-col justify-center md:order-2">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-rose-400/30 bg-rose-400/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-300" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-rose-200/90">
              Personal Branding
            </span>
          </div>

          <h1 className="mt-10 font-display text-[clamp(40px,6.5vw,76px)] font-extralight leading-[0.98] tracking-tight text-white-90">
            Your face is{" "}
            <span className="italic text-rose-200/70">the brand.</span>
            <br />
            Look like you mean it.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
            Professional headshots and personal brand content for agents,
            founders, speakers, and teams. Little Rock studio + on-location
            across Arkansas.
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
            <Link
              href="/order/branding"
              className="inline-flex items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Book a Session
            </Link>
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
      </div>
    </section>
  );
}
