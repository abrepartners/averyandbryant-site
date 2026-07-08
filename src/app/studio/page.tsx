import Image from "next/image";
import { PodcastCarousel } from "@/components/studio/podcast-carousel";
import { ConsultCTA } from "@/components/consult-cta";
import { PackageCard } from "@/components/pricing/package-card";
import { GuaranteeBadge } from "@/components/pricing/guarantee-badge";
import { studioMemberships, studioGuarantee } from "@/lib/pricing";

export const metadata = {
  title: "The Spot — Where Arkansas Records | Little Rock | Avery & Bryant",
  description:
    "Multi-room content studio in Little Rock where real podcasters record. Book the Podcast Room, alternate sets, or the Garage by the hour — direct booking via our calendar.",
};

const PEERSPACE_URL =
  "https://www.peerspace.com/pages/listings/673a4251deb5e4e5704eb25b";

// Pay-first flow: room CTAs go to Stripe Payment Links. After payment,
// the webhook writes the matching GHL calendar widget URL onto the contact
// + sends the "Pick my time slot" email so they finish scheduling.
const PAY_PODCAST_1HR =
  "https://pay.averyandbryant.com/b/dRmbJ1brq0Zq6Xp8LAbjW0m";
const PAY_PODCAST_2HR =
  "https://pay.averyandbryant.com/b/6oUaEX5326jKepRbXMbjW0n";
const PAY_PODCAST_HALF =
  "https://pay.averyandbryant.com/b/6oUaEX7ba37ydlN6DsbjW0o";
const PAY_ALTSET = "https://pay.averyandbryant.com/b/fZu9AT8fe6jK95xf9YbjW0p";
const PAY_GARAGE = PAY_ALTSET; // Same $150 price tier as alternate sets
const PAY_MULTI = "https://pay.averyandbryant.com/b/aFa7sL8fe0ZqbdF8LAbjW0q";

// All images are PLACEHOLDERS — swap with real Spot photos when assets are accessible.
// Source folder: ~/Desktop/THE SPOT IMAGES (currently blocked by macOS TCC).
type Room = {
  slug: string;
  name: string;
  size: string;
  bestFor: string[];
  note?: string;
  image: string;
  bookUrl: string;
  bookLabel: string;
  accentClass: string; // tailwind ring + chip color
  pillBg: string;
};

// Image mapping confirmed via Peerspace listing 2026-04-20:
// spot-1/2/3 = podcast action shots (used in hero carousel)
// spot-4 = mic close-up · spot-5 = Main Room lounge interior
// spot-6 = audio podcast setup · spot-7 = Black Room (alternate)
// spot-8 = Garage Room · spot-9 = Neutral Room (alternate)
// spot-10 = full production setup
const rooms: Room[] = [
  {
    slug: "podcast-room",
    name: "The Podcast Room",
    size: "400 sqft · flagship",
    bestFor: ["Video podcasts", "Talking-head", "Branded interviews"],
    note: "Our flagship room. Pre-configured lighting and controlled acoustics — the one on Peerspace.",
    image: "/images/studio/spot-5.jpg",
    bookUrl: PAY_PODCAST_1HR,
    bookLabel: "Reserve & pay — 1hr",
    accentClass: "border-crimson/30 hover:border-crimson/60",
    pillBg: "bg-crimson/10 text-crimson",
  },
  {
    slug: "set-a",
    name: "Set A · The Black Room",
    size: `13'3" × 11'2" · ~150 sqft`,
    bestFor: ["Lifestyle", "Brand content", "Product photography"],
    image: "/images/studio/spot-7.jpg",
    bookUrl: PAY_ALTSET,
    bookLabel: "Reserve & pay — Set A",
    accentClass: "border-amber-400/20 hover:border-amber-400/40",
    pillBg: "bg-amber-400/10 text-amber-200",
  },
  {
    slug: "set-b",
    name: "Set B · The Neutral Room",
    size: `11'9" × 11'5" · ~135 sqft`,
    bestFor: ["Editorial", "Fashion", "Headshot variation"],
    image: "/images/studio/spot-9.jpg",
    bookUrl: PAY_ALTSET,
    bookLabel: "Reserve & pay — Set B",
    accentClass: "border-rose-400/20 hover:border-rose-400/40",
    pillBg: "bg-rose-400/10 text-rose-200",
  },
  {
    slug: "intimate",
    name: "Intimate Set",
    size: `7'3" × 10'6" · ~75 sqft`,
    bestFor: ["Solo headshots", "1-on-1 interview", "Single subject"],
    image: "/images/studio/spot-6.jpg",
    bookUrl: PAY_ALTSET,
    bookLabel: "Reserve & pay — Intimate",
    accentClass: "border-rose-400/20 hover:border-rose-400/40",
    pillBg: "bg-rose-400/10 text-rose-200",
  },
  {
    slug: "garage",
    name: "The Garage",
    size: `14'5" × 17' · ~245 sqft`,
    bestFor: [
      "Vehicle shoots",
      "Industrial",
      "Music video",
      "Fashion editorial",
    ],
    note: "Roll-up door for natural light. Bring vehicles inside.",
    image: "/images/studio/spot-8.jpg",
    bookUrl: PAY_GARAGE,
    bookLabel: "Reserve & pay — Garage",
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

// Keys must match studioMemberships names in src/lib/pricing.ts.
// URLs are the LIVE Stripe payment links (verified 2026-07-08); each link's
// metadata.tier ("creator-lite" / "creator" / "pro") flows to the webhook's
// TIER_TAGS and redirects back here as ?subscribed=<tier>.
const membershipSubscribeUrls: Record<string, string> = {
  "Creator Lite": "https://pay.averyandbryant.com/b/5kQ00jgLK5fGdlNd1QbjW0j",
  Creator: "https://pay.averyandbryant.com/b/dRmdR9dzyaA02H94vkbjW0k",
  Pro: "https://pay.averyandbryant.com/b/3cI6oHbrq5fGchJbXMbjW0l",
};

// Pricing: "rate" = non-member retail. "memberRate" = best-tier (Pro 30% off) price.
const pricing = [
  {
    name: "Podcast Room — 1 Hour",
    rate: "$85",
    memberRate: "Members from $59.50",
    description: "Base studio rental. 1-hour minimum.",
    highlight: true,
    payUrl: "https://pay.averyandbryant.com/b/dRmbJ1brq0Zq6Xp8LAbjW0m",
  },
  {
    name: "Podcast Room — 2 Hour",
    rate: "$170",
    memberRate: "Members from $119",
    description: "Standard podcast block.",
    payUrl: "https://pay.averyandbryant.com/b/6oUaEX5326jKepRbXMbjW0n",
  },
  {
    name: "Podcast Room — Half Day (4 hr)",
    rate: "$340",
    memberRate: "Members from $238",
    description: "Multi-episode batch recording or extended interview.",
    payUrl: "https://pay.averyandbryant.com/b/6oUaEX7ba37ydlN6DsbjW0o",
  },
  {
    name: "Each Alternate Set / Garage — 1 Hour",
    rate: "$150",
    memberRate: "Members from $105",
    description: "Add Set A, Set B, Intimate Set, or the Garage to your day.",
    payUrl: "https://pay.averyandbryant.com/b/fZu9AT8fe6jK95xf9YbjW0p",
  },
  {
    name: "Multi-Set Day Pass (8 hr)",
    rate: "$1,495",
    memberRate: "Members from $1,046",
    description:
      "Full day, all rooms unlocked. Build a month of content without relocating.",
    payUrl: "https://pay.averyandbryant.com/b/aFa7sL8fe0ZqbdF8LAbjW0q",
  },
  {
    name: "Audio Podcast Production",
    rate: "+$40/hr",
    description:
      "Podcast mics, engineer support, recorded and delivered. Add-on credit eligible.",
  },
  {
    name: "Engineer Assist",
    rate: "+$40/hr",
    description:
      "Add an engineer for mixing, lighting, or camera op. Add-on credit eligible.",
  },
  {
    name: "Equipment Access",
    rate: "+$25/hr",
    description:
      "Full equipment suite — lighting, cameras, audio gear. Add-on credit eligible.",
  },
  {
    name: "Extra 30 Minutes",
    rate: "+$50",
    description:
      "Extend an active session without rebooking. Add-on credit eligible.",
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
  return `mailto:book@averyandbryant.com?subject=${encodeURIComponent(subject)}`;
}

const PAID_LABELS: Record<string, string> = {
  "podcast-1hr": "Podcast Room — 1 Hour",
  "podcast-2hr": "Podcast Room — 2 Hour",
  "podcast-half": "Podcast Room — Half Day",
  "alternate-set": "Alternate Set",
  "multi-set-day": "Multi-Set Day Pass",
};

const SUBSCRIBED_LABELS: Record<string, string> = {
  "creator-lite": "Creator Lite",
  creator: "Creator",
  pro: "Pro",
};

export default async function StudioPage({
  searchParams,
}: {
  searchParams: Promise<{ paid?: string; subscribed?: string }>;
}) {
  const sp = await searchParams;
  const paidLabel = sp.paid ? PAID_LABELS[sp.paid] : undefined;
  const subscribedLabel = sp.subscribed
    ? SUBSCRIBED_LABELS[sp.subscribed]
    : undefined;

  return (
    <>
      {/* ── POST-PAYMENT THANK YOU BANNER ── */}
      {paidLabel || subscribedLabel ? (
        <div
          role="status"
          className="border-b border-amber-400/20 bg-amber-400/[0.04] px-6 py-6 md:px-12 md:py-8"
        >
          <div className="mx-auto flex max-w-[1280px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-amber-200/90">
                {subscribedLabel ? "Subscription active" : "Payment received"}
              </p>
              <h2 className="mt-2 font-display text-xl font-light text-white-90 md:text-2xl">
                {subscribedLabel
                  ? `You're a ${subscribedLabel} member.`
                  : `${paidLabel} — paid in full.`}{" "}
                <span className="text-white/50">
                  {subscribedLabel
                    ? "Check your email for credit redemption details."
                    : "Now pick your time slot."}
                </span>
              </h2>
              <p className="mt-2 text-sm text-white/45">
                A confirmation email is on its way. Questions?{" "}
                <a
                  href={emailFor("Booking confirmation")}
                  className="text-crimson hover:text-white"
                >
                  Email us
                </a>{" "}
                or call (501) 502-2925.
              </p>
            </div>
            {paidLabel ? (
              <a
                href={emailFor(`Schedule my ${paidLabel}`)}
                className="inline-flex shrink-0 items-center justify-center rounded bg-crimson px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark"
              >
                Schedule my session
              </a>
            ) : null}
          </div>
        </div>
      ) : null}

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
                Where Arkansas records · Little Rock
              </span>
            </div>

            <h1 className="mt-8 font-display text-[clamp(40px,7vw,84px)] font-extralight leading-[0.98] tracking-tight text-white-90">
              Real podcasters.
              <br />
              <span className="text-white-40 italic">Real recordings.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
              The Spot is where Arkansas creators show up to record. Five
              rentable sets — a flagship podcast room, two alternate sets, an
              intimate single-subject space, and a garage bay big enough for a
              vehicle.
            </p>
            <p className="mt-3 max-w-xl text-sm text-white/35">
              How booking works:{" "}
              <span className="text-white/55">pay first</span>, then we email
              you a private calendar link to pick your time slot. Two minutes,
              both steps. Or browse on Peerspace if you prefer.
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
                href={PAY_PODCAST_1HR}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
              >
                Reserve the Podcast Room
              </a>
              <a
                href={PEERSPACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded border border-white/20 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white-70 transition-all hover:border-white/40 hover:text-white"
              >
                Or browse on Peerspace
              </a>
            </div>
          </div>

          {/* Hero — auto-rotating podcast action carousel */}
          <PodcastCarousel />
        </div>
      </section>

      {/* ── ROOMS GRID — the heart of the page ── */}
      <section id="sets" className="border-t border-white/5 py-24 md:py-32">
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
                    alt={`${room.name} at The Spot — Avery & Bryant content & podcast studio in Little Rock`}
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
                    href={room.bookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-between rounded border border-white/10 px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white/65 transition-all hover:border-crimson/40 hover:text-white"
                  >
                    <span>{room.bookLabel}</span>
                    <span aria-hidden>&rarr;</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIPS ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Memberships
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Use the studio every month?{" "}
            <span className="text-white-40">Memberships save you 50–80%.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/45">
            Two wins with every membership: a{" "}
            <span className="text-amber-200/80">member discount</span> on all
            studio time, plus monthly{" "}
            <span className="text-amber-200/80">add-on credits</span> you can
            spend on edits, engineer assist, equipment, extra 30-min blocks, or
            rush delivery.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {studioMemberships.map((pkg) => (
              <PackageCard
                key={pkg.name}
                pkg={pkg}
                ctaHref={membershipSubscribeUrls[pkg.name]}
                ctaLabel="Become a Member"
                ctaTarget="_blank"
              />
            ))}
          </div>

          <div className="mt-12">
            <GuaranteeBadge guarantee={studioGuarantee} />
          </div>

          <p className="mt-10 text-center text-sm text-white/35">
            Already a member?{" "}
            <a href="/members" className="text-crimson hover:text-white">
              Manage your account
            </a>
            . New here?{" "}
            <a
              href={emailFor("Membership question")}
              className="text-crimson hover:text-white"
            >
              Ask us anything
            </a>{" "}
            or scroll down for pay-as-you-go rates.
          </p>
        </div>
      </section>

      {/* ── AMENITIES ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            What&apos;s Included
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Walk in, shoot, <span className="text-white-40">walk out.</span>
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
            Pay-as-you-go.{" "}
            <span className="text-white-40">
              Or save with a membership above.
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/45">
            Non-member rates. Members pay nothing extra at booking — credits are
            redeemed at checkout.
          </p>

          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                {p.memberRate ? (
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-amber-200/70">
                    {p.memberRate}
                  </p>
                ) : null}
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {p.description}
                </p>
                {p.payUrl ? (
                  <a
                    href={p.payUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-crimson transition-colors hover:text-white"
                  >
                    Pay & Book <span aria-hidden>&rarr;</span>
                  </a>
                ) : null}
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

      <ConsultCTA
        interest="studio"
        headline="Not sure which room or package fits?"
        subhead="Podcast one-off vs. membership vs. full production day — each is a different fit. Free 30-min call to walk through your show or shoot and pick the right room."
      />

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
