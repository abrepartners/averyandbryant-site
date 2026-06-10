"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "/images/airbnb-rentals/interior-styled.jpg",
    alt: "Warm interior styled for short-term rental",
  },
  {
    src: "/images/airbnb-rentals/interior-living.jpg",
    alt: "Living room with natural light",
  },
  {
    src: "/images/airbnb-rentals/exterior-hero.jpg",
    alt: "Twilight exterior — rental property",
  },
];

export function HeroAirbnbRentals() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      aria-label="Short-term rental media hero"
      className="relative overflow-hidden border-b border-white/5 bg-[#0a0a0a]"
    >
      {/* Warm amber + peach glows — this is the "lifestyle" palette */}
      <div className="pointer-events-none absolute -right-20 top-0 h-[700px] w-[700px] rounded-full bg-amber-500/10 blur-[200px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-orange-400/8 blur-[160px]" />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 py-24 md:grid-cols-[1fr_1fr] md:items-center md:gap-16 md:px-12 md:py-32 lg:gap-20">
        {/* LEFT — typography + revenue stat */}
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-amber-200/90">
              Short-Term Rental Media
            </span>
          </div>

          <h1 className="mt-10 font-display text-[clamp(44px,7vw,84px)] font-extralight leading-[0.95] tracking-tight text-white-90">
            More bookings
            <br />
            start with{" "}
            <span className="italic text-amber-200/70">better photos.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
            Professional photos, drone, video tours, and twilight media for
            Airbnb, VRBO, and short-term rental hosts across Arkansas. Turn
            browsers into guests.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/order/airbnb-rentals"
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

          {/* Revenue callout — THE hook for STR hosts */}
          <div className="mt-12 flex max-w-md items-center gap-6 rounded border border-amber-400/20 bg-amber-400/[0.03] p-6">
            <div className="shrink-0">
              <p className="font-display text-5xl font-light leading-none text-amber-200">
                40%
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-amber-200/60">
                More bookings
              </p>
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              Listings with pro photography consistently outperform phone-shot
              listings. Your photos pay for themselves in a single booking.
            </p>
          </div>
        </div>

        {/* RIGHT — auto-rotating lifestyle carousel, shaped like an Airbnb listing card */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-[0_40px_80px_rgba(0,0,0,0.4)]">
            {slides.map((slide, i) => (
              <Image
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 45vw"
                className={`object-cover transition-opacity duration-1000 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent" />

            {/* Mock booking-card overlay — reinforces "this is a listing" */}
            <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/10 bg-black/50 p-4 backdrop-blur-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-white-90">
                    The Riverhouse · Little Rock
                  </p>
                  <p className="mt-1 text-xs text-white/50">
                    Entire home · Sleeps 6 · Superhost
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-amber-200">★ 4.96</p>
                  <p className="mt-1 text-xs text-white/40">142 reviews</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1">
                {slides.map((_, i) => (
                  <span
                    key={i}
                    aria-hidden
                    className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${
                      i === active ? "bg-amber-200" : "bg-white/15"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
