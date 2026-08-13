"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "/images/airbnb-rentals/bedroom-styled.jpg",
    alt: "Bedroom styled for short-term rental guests",
  },
  {
    src: "/images/airbnb-rentals/bedroom-suite.jpg",
    alt: "Guest suite with natural light",
  },
  {
    src: "/images/airbnb-rentals/exterior-hero.jpg",
    alt: "Historic brick exterior — rental property",
  },
];

export function HeroAirbnbRentals() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      4500,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section
      aria-label="Short-term rental media hero"
      className="relative overflow-hidden border-b border-white/5 bg-[#0a0a0a]"
    >
      {/* Crimson ambient glows (brand accent) */}
      <div className="pointer-events-none absolute -right-20 top-0 h-[700px] w-[700px] rounded-full bg-crimson/10 blur-[200px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-crimson/8 blur-[160px]" />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 py-24 md:grid-cols-[1fr_1fr] md:items-center md:gap-16 md:px-12 md:py-32 lg:gap-20">
        {/* LEFT — typography + revenue stat */}
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-crimson/30 bg-crimson/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-crimson/90">
              Short-Term Rental Media
            </span>
          </div>

          <h1 className="mt-10 font-display text-[clamp(44px,7vw,84px)] font-extralight leading-[0.95] tracking-tight text-white-90">
            More bookings
            <br />
            start with{" "}
            <span className="italic text-crimson/70">better photos.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-fg-strong md:text-lg">
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
          <div className="mt-12 flex max-w-md items-center gap-6 rounded border border-crimson/20 bg-crimson/[0.03] p-6">
            <div className="shrink-0">
              <p className="font-display text-5xl font-light leading-none text-crimson">
                19%
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-crimson/60">
                More bookings
              </p>
            </div>
            <p className="text-sm leading-relaxed text-fg-secondary">
              Airbnb&apos;s own 2024&ndash;25 study of 14,700+ listings found
              professional photography drove ~19% more bookings and ~21% higher
              earnings over the next year. Your photos pay for themselves.
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
                    Your rental, booking-ready
                  </p>
                  <p className="mt-1 text-xs text-fg-secondary">
                    Photos · Video · Drone · Twilight
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-crimson">
                    Airbnb · VRBO
                  </p>
                  <p className="mt-1 text-xs text-fg-secondary">Direct booking</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1">
                {slides.map((_, i) => (
                  <span
                    key={i}
                    aria-hidden
                    className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${
                      i === active ? "bg-crimson" : "bg-white/15"
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
