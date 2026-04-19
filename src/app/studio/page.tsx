import Image from "next/image";

export const metadata = {
  title: "The Spot — Creative Studios | Little Rock | Avery & Bryant",
  description:
    "Rent The Spot: a 400 sqft controlled-light studio in Little Rock for podcasts, video content, interviews, and branded shoots. $75–$95/hr.",
};

const PEERSPACE_URL =
  "https://www.peerspace.com/pages/listings/673a4251deb5e4e5704eb25b";

const useCases = [
  {
    title: "Podcasts",
    description:
      "Video + audio podcast production. Pre-configured lighting and a clean, controlled backdrop built for talking-head capture.",
  },
  {
    title: "Video Content",
    description:
      "Talking-head, creator, and branded video. Bring your team, your gear, or rent ours — the room is ready.",
  },
  {
    title: "Interviews",
    description:
      "Sit down with clients, team members, or guests. Quiet, controlled acoustics and a dressing room on-site.",
  },
  {
    title: "Small-Team Shoots",
    description:
      "Solo creators and teams up to 7. Natural light, street-level access, and room to work without the chaos of shared coworking space.",
  },
];

const amenities = [
  "Controlled-light environment",
  "Natural light available",
  "Pre-configured lighting",
  "Dressing room",
  "On-site restrooms",
  "Street-level access",
  "400 sqft · fits 7 comfortably",
  "Flexible cancellation policy",
];

const pricing = [
  {
    name: "Studio Rental",
    rate: "$75–$95/hr",
    description: "Base rate, 1-hour minimum. Studio only.",
    highlight: true,
  },
  {
    name: "Audio Podcast Production",
    rate: "+$40/hr",
    description: "Podcast mics, engineer support, recorded and delivered.",
  },
  {
    name: "Full Video Production",
    rate: "+$150/hr",
    description: "Full crew: camera op, lighting, audio, editing.",
  },
  {
    name: "Alternate Room Set",
    rate: "+$150/hr each",
    description: "Change the set between shoots without leaving the studio.",
  },
];

const hours = [
  { day: "Mon – Fri", time: "9:00 AM – 5:30 PM" },
  { day: "Sat – Sun", time: "7:00 AM – 8:00 PM" },
];

export default function StudioPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        aria-label="The Spot Creative Studios hero"
        className="relative isolate overflow-hidden border-b border-white/5 bg-[#0a0a0a]"
      >
        <div className="pointer-events-none absolute -left-32 top-1/3 h-[600px] w-[600px] rounded-full bg-amber-400/6 blur-[200px]" />
        <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-crimson/6 blur-[180px]" />

        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:px-12 md:py-32 lg:gap-20">
          {/* Left — copy */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/5 px-4 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-300" />
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-amber-200/90">
                Studio Rental · Little Rock
              </span>
            </div>

            <h1 className="mt-8 font-display text-[clamp(40px,7vw,84px)] font-extralight leading-[0.98] tracking-tight text-white-90">
              The Spot
              <br />
              <span className="text-white-40 italic">
                Creative Studios.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
              A modern, controlled-light studio in Gibraltar Heights built for
              podcasts, video content, interviews, and professional media.
              Street-level access, pre-configured lighting, and room for up to
              7. Book by the hour — bring your gear or add ours.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-crimson" />
                <span>$75–$95/hr</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-crimson" />
                <span>400 sqft</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-crimson" />
                <span>Fits 7</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-crimson" />
                <span>1 hr minimum</span>
              </span>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={PEERSPACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
              >
                Book on Peerspace
              </a>
              <a
                href="mailto:hello@averyandbryant.com?subject=The%20Spot%20Studio%20Inquiry"
                className="inline-flex items-center justify-center rounded border border-white/20 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white-70 transition-all hover:border-white/40 hover:text-white"
              >
                Email for Custom Quote
              </a>
            </div>
          </div>

          {/* Right — hero image */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-[0_40px_80px_rgba(0,0,0,0.4)]">
              <Image
                src="/images/portfolio-interior-2.jpg"
                alt="The Spot creative studio — placeholder; swap with real studio photo"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />

              {/* Floating location card */}
              <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/10 bg-black/50 p-4 backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-[0.25em] text-amber-200/70">
                  Gibraltar Heights · Little Rock
                </p>
                <p className="mt-1 text-sm font-medium text-white-90">
                  Controlled-light studio · Pre-configured lighting
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Built For
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Creator-grade production.{" "}
            <span className="text-white-40">Without the studio build-out.</span>
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {useCases.map((u) => (
              <div
                key={u.title}
                className="rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 transition-all duration-500 hover:border-crimson/20 hover:bg-[rgba(17,17,17,0.8)] md:p-10"
              >
                <h3 className="font-display text-xl font-medium text-white-90">
                  {u.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {u.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AMENITIES ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            What&apos;s Included
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Everything you need.{" "}
            <span className="text-white-40">Walk in, shoot, walk out.</span>
          </h2>

          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {amenities.map((a) => (
              <div
                key={a}
                className="flex items-start gap-3 rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-5 transition-colors hover:border-crimson/20"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                <span className="text-sm text-white/70">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Pricing
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Studio-only or fully produced.{" "}
            <span className="text-white-40">Your call.</span>
          </h2>

          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {pricing.map((p) => (
              <div
                key={p.name}
                className={`rounded border p-8 transition-all duration-500 md:p-10 ${
                  p.highlight
                    ? "border-crimson/30 bg-[rgba(196,18,48,0.05)]"
                    : "border-white/5 bg-[rgba(17,17,17,0.5)] hover:border-crimson/20"
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl font-medium text-white-90">
                    {p.name}
                  </h3>
                  <span className="font-display text-2xl font-light text-crimson">
                    {p.rate}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {p.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-white/35">
            Base studio rental booked through Peerspace. Production add-ons
            booked directly with A&B — we&apos;ll coordinate with your
            Peerspace reservation.
          </p>
        </div>
      </section>

      {/* ── HOURS ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
              Hours
            </p>
            <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
              Weekends go late.
            </h2>
          </div>

          <dl className="mx-auto mt-12 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
            {hours.map((h) => (
              <div
                key={h.day}
                className="flex items-baseline justify-between rounded border border-white/5 bg-[rgba(17,17,17,0.5)] px-6 py-4"
              >
                <dt className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                  {h.day}
                </dt>
                <dd className="font-display text-base text-white-90">
                  {h.time}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-white/40">
            Need outside-of-hours access for a specific shoot?{" "}
            <a
              href="mailto:hello@averyandbryant.com?subject=The%20Spot%20After-Hours"
              className="text-crimson transition-colors hover:text-white"
            >
              Ask and we&apos;ll work it out.
            </a>
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12 md:py-32">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Get Started
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Ready to hit record?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/40 md:text-lg">
            Book the studio by the hour on Peerspace, or send us a note if you
            want us to run the whole production.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={PEERSPACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Book on Peerspace
            </a>
            <a
              href="tel:+15015022925"
              className="inline-flex items-center justify-center rounded border border-white/20 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white-70 transition-all hover:border-white/40 hover:text-white"
            >
              Call (501) 502-2925
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
