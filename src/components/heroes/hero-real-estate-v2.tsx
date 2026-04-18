"use client";

import Link from "next/link";
import Image from "next/image";

const thumbs = [
  "/images/portfolio-interior-2.jpg",
  "/images/portfolio-drone-3.jpg",
  "/images/portfolio-exterior-1.jpg",
];

const stats = [
  { value: "200+", label: "Arkansas agents" },
  { value: "5.0★", label: "Google rating" },
  { value: "BBB", label: "A+ accredited" },
];

export function HeroRealEstateV2() {
  return (
    <section
      aria-label="Real Estate Media hero"
      className="relative overflow-hidden border-b border-white/5 bg-[#0a0a0a]"
    >
      <div className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-crimson/8 blur-[180px]" />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 py-24 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:px-12 md:py-32 lg:gap-20">
        {/* LEFT — editorial type + stats */}
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-crimson/30 bg-crimson/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-crimson">
              Core Service
            </span>
          </div>

          <h1 className="mt-10 font-display text-[clamp(44px,7vw,88px)] font-extralight leading-[0.95] tracking-tight text-white-90">
            Real Estate
            <br />
            Media
            <span aria-hidden className="ml-3 inline-block h-[2px] w-16 translate-y-[-12px] bg-crimson" />
            <br />
            <span className="text-white-40 italic">that closes deals.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
            HDR photography, cinematic video tours, aerial drone, 3D virtual
            tours, and floor plans. Built by photographers who understand
            listings — not just shutters.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/order/real-estate"
              className="inline-flex items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Book a Shoot
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center rounded border border-white/20 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white-70 transition-all hover:border-white/40 hover:text-white"
            >
              View Gallery
            </Link>
          </div>

          {/* Stats row */}
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="order-2 text-[10px] uppercase tracking-[0.25em] text-white/40">
                  {s.label}
                </dt>
                <dd className="order-1 font-display text-2xl font-light text-white-90">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* RIGHT — image frame with Ken Burns + thumb strip */}
        <div className="flex flex-col gap-4">
          <div className="relative overflow-hidden rounded border border-white/10 bg-[#111] aspect-[4/5] md:aspect-[3/4]">
            <Image
              src="/images/staging-twilight.jpg"
              alt="Twilight exterior — Avery & Bryant"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
              className="hero-v2-kenburns object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                  Featured Listing
                </p>
                <p className="mt-1 text-sm text-white-80">
                  Twilight · Little Rock, AR
                </p>
              </div>
              <span className="rounded border border-white/20 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white-70">
                Case study
              </span>
            </div>
          </div>

          {/* Thumb strip */}
          <div className="grid grid-cols-3 gap-4">
            {thumbs.map((src, i) => (
              <div
                key={src}
                className="relative aspect-square overflow-hidden rounded border border-white/10 bg-[#111]"
              >
                <Image
                  src={src}
                  alt={`Portfolio thumbnail ${i + 1}`}
                  fill
                  sizes="15vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroV2Ken {
          0%   { transform: scale(1.0); }
          100% { transform: scale(1.08); }
        }
        .hero-v2-kenburns {
          animation: heroV2Ken 24s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  );
}
