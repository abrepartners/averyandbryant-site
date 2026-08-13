"use client";

import Link from "next/link";
import Image from "next/image";

const thumbs = [
  "/images/multi-family/thumb-exterior-1.jpg",
  "/images/multi-family/thumb-exterior-2.jpg",
  "/images/multi-family/thumb-interior-1.jpg",
];

const stats = [
  { value: "48hr", label: "Turnaround" },
  { value: "Drone", label: "Aerials included" },
  { value: "ILS", label: "Platform-ready" },
];

export function HeroMultiFamily() {
  return (
    <section
      aria-label="Multi-Family Media hero"
      className="relative overflow-hidden border-b border-white/5 bg-[#0a0a0a]"
    >
      <div className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-crimson/8 blur-[180px]" />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 py-24 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:px-12 md:py-32 lg:gap-20">
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-crimson/30 bg-crimson/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-crimson">
              Multi-Family Media
            </span>
          </div>

          <h1 className="mt-10 font-display text-[clamp(44px,7vw,88px)] font-extralight leading-[0.95] tracking-tight text-white-90">
            Fill vacancies
            <span
              aria-hidden
              className="ml-3 inline-block h-[2px] w-16 translate-y-[-12px] bg-crimson"
            />
            <br />
            faster
            <br />
            <span className="text-white-40 italic">with premium media.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-fg-strong md:text-lg">
            Professional photography, aerial drone, video tours, and
            leasing-ready assets for apartment complexes across Arkansas. Built
            for property managers who can&apos;t afford a slow lease-up.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/order/multi-family"
              className="inline-flex items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Book a Shoot
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center rounded border border-white/20 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white-70 transition-all hover:border-white/40 hover:text-white"
            >
              View Portfolio
            </Link>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="order-2 text-[10px] uppercase tracking-[0.25em] text-fg-secondary">
                  {s.label}
                </dt>
                <dd className="order-1 font-display text-2xl font-light text-white-90">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative overflow-hidden rounded border border-white/10 bg-[#111] aspect-[4/5] md:aspect-[3/4]">
            <Image
              src="/images/multi-family/hero-exterior.jpg"
              alt="Multi-family property aerial — Avery & Bryant"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
              className="hero-mf-kenburns object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-fg-secondary">
                  Multi-Family Media
                </p>
                <p className="mt-1 text-sm text-white-80">
                  Communities · Apartments · Student Housing
                </p>
              </div>
              <span className="rounded border border-white/20 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white-70">
                Lease-up ready
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {thumbs.map((src, i) => (
              <div
                key={src}
                className="relative aspect-square overflow-hidden rounded border border-white/10 bg-[#111]"
              >
                <Image
                  src={src}
                  alt={`Amenity thumbnail ${i + 1}`}
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
        @keyframes heroMfKen {
          0%   { transform: scale(1.0); }
          100% { transform: scale(1.08); }
        }
        .hero-mf-kenburns {
          animation: heroMfKen 24s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  );
}
