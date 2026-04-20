import Image from "next/image";

export const metadata = {
  title: "The Spot — Multi-Set Creative Studios | Little Rock | Avery & Bryant",
  description:
    "Multi-room content studio in Little Rock — podcast room, dedicated sets, and a garage bay. Book by the hour for podcasts, video, branded content, fashion, vehicle shoots, and more.",
};

const PEERSPACE_URL =
  "https://www.peerspace.com/pages/listings/673a4251deb5e4e5704eb25b";

// All images are PLACEHOLDERS — swap with real Spot photos when assets are accessible.
// Source folder: ~/Desktop/THE SPOT IMAGES (currently blocked by macOS TCC).
type Room = {
  slug: string;
  name: string;
  size: string;
  bestFor: string[];
  note?: string;
  image: string;
  accentClass: string; // tailwind ring + chip color
  pillBg: string;
};

const rooms: Room[] = [
  {
    slug: "podcast-room",
    name: "The Podcast Room",
    size: "400 sqft · flagship",
    bestFor: ["Video podcasts", "Talking-head", "Branded interviews"],
    note: "Our flagship room. Pre-configured lighting and controlled acoustics — the one on Peerspace.",
    image: "/images/portfolio-interior-2.jpg",
    accentClass: "border-crimson/30 hover:border-crimson/60",
    pillBg: "bg-crimson/10 text-crimson",
  },
  {
    slug: "set-a",
    name: "Set A",
    size: `13'3" × 11'2" · ~150 sqft`,
    bestFor: ["Lifestyle", "Brand content", "Product photography"],
    image: "/images/portfolio-interior-1.jpg",
    accentClass: "border-amber-400/20 hover:border-amber-400/40",
    pillBg: "bg-amber-400/10 text-amber-200",
  },
  {
    slug: "set-b",
    name: "Set B",
    size: `11'9" × 11'5" · ~135 sqft`,
    bestFor: ["Editorial", "Fashion", "Headshot variation"],
    image: "/images/staging-interior.jpg",
    accentClass: "border-rose-400/20 hover:border-rose-400/40",
    pillBg: "bg-rose-400/10 text-rose-200",
  },
  {
    slug: "intimate",
    name: "Intimate Set",
    size: `7'3" × 10'6" · ~75 sqft`,
    bestFor: ["Solo headshots", "1-on-1 interview", "Single subject"],
    image: "/images/portfolio-headshot-1.jpg",
    accentClass: "border-rose-400/20 hover:border-rose-400/40",
    pillBg: "bg-rose-400/10 text-rose-200",
  },
  {
    slug: "garage",
    name: "The Garage",
    size: `14'5" × 17' · ~245 sqft`,
    bestFor: ["Vehicle shoots", "Industrial", "Music video", "Fashion editorial"],
    note: "Roll-up door for natural light. Bring vehicles inside.",
    image: "/images/portfolio-exterior-1.jpg",
    accentClass: "border-sky-400/20 hover:border-sky-400/40",
    pillBg: "bg-sky-400/10 text-sky-200",
  },
];

const amenities = [
  "Controlled-light environment",
  "Natural light available",
  "Pre-configured lighting",
  "Dressing room",
  "On-site restrooms",
  "Street-level access",
  "Multiple rentable sets",
  "Flexible cancellation",
];

const pricing = [
  {
    name: "Podcast Room",
    rate: "$75–$95/hr",
    description: "Base studio rental. 1-hour minimum. Bookable on Peerspace.",
    highlight: true,
  },
  {
    name: "Each Alternate Set",
    rate: "+$150/hr",
    description:
      "Add Set A, Set B, the Intimate Set, or the Garage. Multi-set days mean you don't have to relocate between shots.",
  },
  {
    name: "Audio Podcast Production",
    rate: "+$40/hr",
    description: "Podcast mics, engineer support, recorded and delivered.",
  },
  {
    name: "Full Video Production",
    rate: "+$150/hr",
    description: "Camera op, lighting, audio, and editing — full crew.",
  },
];

const hours = [
  { day: "Mon – Fri", time: "9:00 AM – 5:30 PM" },
  { day: "Sat – Sun", time: "7:00 AM – 8:00 PM" },
];

function emailFor(room?: string) {
  const subject = room
    ? `The Spot Inquiry — ${room}`
    : "The Spot Studio Inquiry";
  return `mailto:hello@averyandbryant.com?subject=${encodeURIComponent(subject)}`;
}

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
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/5 px-4 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-300" />
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-amber-200/90">
                Multi-Set Studio · Little Rock
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
              Five rentable sets under one roof — a flagship podcast room,
              dedicated lifestyle and editorial sets, an intimate
              single-subject space, and a garage bay big enough for a vehicle.
              Book one room or the whole facility for a content day.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-crimson" />
                <span>$75–$95/hr base</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-crimson" />
                <span>5 sets</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-crimson" />
                <span>Gibraltar Heights</span>
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
                href={emailFor()}
                className="inline-flex items-center justify-center rounded border border-white/20 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white-70 transition-all hover:border-white/40 hover:text-white"
              >
                Email for Multi-Set Quote
              </a>
            </div>
          </div>

          {/* Hero image — placeholder, swap with real Spot hero photo */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-[0_40px_80px_rgba(0,0,0,0.4)]">
              <Image
                src="/images/portfolio-interior-2.jpg"
                alt="The Spot creative studio — placeholder; swap with real podcast room photo"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/10 bg-black/50 p-4 backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-[0.25em] text-amber-200/70">
                  Gibraltar Heights · Little Rock
                </p>
                <p className="mt-1 text-sm font-medium text-white-90">
                  Multi-room creative facility
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROOMS GRID — the heart of the page ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            The Sets
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Five rooms. One roof.{" "}
            <span className="text-white-40">Pick a room or rent them all.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-white/45">
            Multi-set content days mean you don&apos;t have to relocate between
            looks. Pricing combines: Peerspace base studio rental + $150/hr per
            additional set.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <article
                key={room.slug}
                className={`group relative flex flex-col overflow-hidden rounded-lg border bg-[rgba(17,17,17,0.5)] transition-all duration-500 ${room.accentClass}`}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={room.image}
                    alt={`${room.name} — placeholder`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/85 via-[#0a0a0a]/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/45">
                      {room.size}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-medium text-white-90">
                      {room.name}
                    </h3>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex flex-wrap gap-2">
                    {room.bestFor.map((b) => (
                      <span
                        key={b}
                        className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.15em] ${room.pillBg}`}
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  {room.note ? (
                    <p className="text-sm leading-relaxed text-white/45">
                      {room.note}
                    </p>
                  ) : null}

                  <a
                    href={emailFor(room.name)}
                    className="mt-auto inline-flex items-center justify-between rounded border border-white/10 px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white/65 transition-all hover:border-white/30 hover:text-white"
                  >
                    <span>Book this room</span>
                    <span aria-hidden>&rarr;</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLOOR PLAN PLACEHOLDER ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Plan the Day
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Map out your shoot.{" "}
            <span className="text-white-40">Then pick your sets.</span>
          </h2>

          <div className="mt-12 flex flex-col items-center justify-center rounded-lg border border-dashed border-white/10 bg-[rgba(17,17,17,0.4)] px-6 py-20 text-center">
            <span className="rounded-full border border-amber-400/30 bg-amber-400/5 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-amber-200/80">
              Floor plan coming
            </span>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/45">
              We&apos;ll publish the labeled floor plan here so you can pick
              which sets to combine before booking. Want it sooner?{" "}
              <a
                href={emailFor("floor plan request")}
                className="text-crimson transition-colors hover:text-white"
              >
                Email us and we&apos;ll send it.
              </a>
            </p>
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
            Walk in, shoot,{" "}
            <span className="text-white-40">walk out.</span>
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
            <span className="text-white-40">Stack sets as you need.</span>
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
            Base Podcast Room booked through Peerspace. Multi-set days +
            production booked directly with A&B — we coordinate around your
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
              href={emailFor("after-hours request")}
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
            Book the Podcast Room on Peerspace, or send a note if you want a
            multi-set day or full production crew.
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
