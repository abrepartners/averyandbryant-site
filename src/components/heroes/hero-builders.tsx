"use client";

import Link from "next/link";

const progress = [
  {
    stage: "01",
    title: "Foundation",
    label:
      "Break ground on the record. Slab, framing, and site progress documented from day one.",
  },
  {
    stage: "02",
    title: "Vertical Build",
    label:
      "Structure, systems, and finishes tracked through every phase of construction.",
  },
  {
    stage: "03",
    title: "Model Launch",
    label:
      "Finished-home photography, drone, and cinematic video to market the result.",
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
      {/* Crimson ambient glow (brand accent) */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-crimson/5 blur-[180px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-crimson/6 blur-[160px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16 lg:gap-20">
          {/* LEFT — typography */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-crimson/30 bg-crimson/5 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-crimson/90">
                Builder Media
              </span>
            </div>

            <h1 className="mt-10 font-display text-[clamp(40px,6.5vw,80px)] font-extralight leading-[0.95] tracking-tight text-white-90">
              Document the build.
              <br />
              <span className="text-white-40 italic">Market the result.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-fg-strong md:text-lg">
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

          {/* RIGHT — blueprint progress ladder (photos swap in per stage as builds are shot) */}
          <div className="flex flex-col gap-4">
            {progress.map((item) => (
              <div
                key={item.stage}
                className="group relative overflow-hidden rounded border border-white/10 bg-[#0d0d0d] p-6 transition-colors hover:border-crimson/30 md:p-7"
              >
                {/* Blueprint grid motif */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                  }}
                />
                {/* Ghost stage number */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -top-6 font-display text-[110px] font-extralight leading-none text-white/[0.04] md:text-[130px]"
                >
                  {item.stage}
                </span>

                <div className="relative flex items-start gap-5">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded border border-crimson/30 font-mono text-xs text-crimson/90">
                    {item.stage}
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-xl font-light text-white-90 md:text-2xl">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
                      {item.label}
                    </p>
                  </div>
                </div>

                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-crimson/60 to-transparent transition-all duration-700 group-hover:w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
