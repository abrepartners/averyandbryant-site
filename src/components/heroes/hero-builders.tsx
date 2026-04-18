"use client";

import Link from "next/link";
import Image from "next/image";

const progress = [
  {
    stage: "01 / Foundation",
    src: "/images/portfolio-exterior-1.jpg",
    label: "Document the build",
  },
  {
    stage: "02 / Build",
    src: "/images/portfolio-interior-1.jpg",
    label: "Mid-construction",
  },
  {
    stage: "03 / Model Launch",
    src: "/images/staging-twilight.jpg",
    label: "Market the result",
  },
];

const stats = [
  { value: "Monthly", label: "Progress programs" },
  { value: "1-day", label: "Model launches" },
  { value: "4K", label: "Drone video" },
];

export function HeroBuilders() {
  return (
    <section
      aria-label="Builder Media hero"
      className="relative overflow-hidden border-b border-white/5 bg-[#0a0a0a]"
    >
      {/* Warm earth-tone glow (not crimson) — fits construction/builder aesthetic */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-amber-500/5 blur-[180px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-crimson/6 blur-[160px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16 lg:gap-20">
          {/* LEFT — typography */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/5 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-amber-200/90">
                Builder Media
              </span>
            </div>

            <h1 className="mt-10 font-display text-[clamp(40px,6.5vw,80px)] font-extralight leading-[0.95] tracking-tight text-white-90">
              Document the build.
              <br />
              <span className="text-white-40 italic">Market the result.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
              Progress photography, drone aerials, and cinematic marketing media
              for builders, developers, and construction companies across
              Arkansas. From foundation to final walkthrough.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/order/builders"
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

          {/* RIGHT — progress timeline */}
          <div className="flex flex-col gap-4">
            {progress.map((item, i) => (
              <div
                key={item.stage}
                className="group relative flex items-center gap-4 overflow-hidden rounded border border-white/10 bg-[#111] p-3 transition-colors hover:border-amber-500/30 md:gap-6 md:p-4"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="relative aspect-[4/3] h-24 w-32 shrink-0 overflow-hidden rounded md:h-32 md:w-44">
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    sizes="(max-width: 768px) 8rem, 11rem"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-400/70">
                    {item.stage}
                  </p>
                  <p className="mt-2 font-display text-lg font-light text-white-90 md:text-xl">
                    {item.label}
                  </p>
                </div>
                <div className="hidden h-full items-center pr-4 md:flex">
                  <span
                    aria-hidden
                    className="h-[1px] w-10 bg-gradient-to-r from-white/20 to-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
