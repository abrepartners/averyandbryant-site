import Image from "next/image";
import { PodcastCarousel } from "@/components/studio/podcast-carousel";
import { ConsultCTA } from "@/components/consult-cta";
import { PackageCard } from "@/components/pricing/package-card";
import { GuaranteeBadge } from "@/components/pricing/guarantee-badge";
import { studioMemberships, studioGuarantee } from "@/lib/pricing";
import studioPricing from "../../../data/studio-pricing.json";

export const metadata = {
  alternates: { canonical: "/studio" },
  title: "The Spot — Little Rock Creative Studio | Avery & Bryant",
  description:
    "Central Arkansas' creative studio: five sets for podcasts, video, brand and product shoots. Rent a set by the hour, or have our team produce it for you.",
};

// Pay-first flow: CTAs go to Stripe Payment Links. After payment, the webhook
// writes the matching GHL calendar widget URL onto the contact + sends the
// "Pick my time slot" email so they finish scheduling.
// 2026-07-12: moved to the $75/hr all-access model. All rental CTAs point to
// the single all-access rental link; per-item links live in data/studio-pricing.json.
const PAY_RENTAL = "https://pay.averyandbryant.com/b/6oU14n7ba4bC95x1j8bjW0t";
const PAY_PODCAST_1HR = PAY_RENTAL;
const PAY_ALTSET = PAY_RENTAL;
const PAY_GARAGE = PAY_RENTAL;

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
    note: "Our flagship room. Pre-configured lighting and controlled acoustics.",
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
  "studio-rental-1hr": "Studio Rental — 1 Hour",
  "studio-rental-half": "Studio Rental — Half Day",
  "studio-rental-full": "Studio Rental — Full Day",
  "audio-podcast": "Audio-Only Podcast",
  "video-podcast": "Video Podcast",
};

const SUBSCRIBED_LABELS: Record<string, string> = {
  "creator-lite": "Creator Lite",
  creator: "Creator",
  pro: "Pro",
  "creator-audio": "Creator Monthly · Audio",
  "creator-video": "Creator Monthly · Video",
  "studio-audio": "Studio Monthly · Audio",
  "studio-video": "Studio Monthly · Video",
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
                The creative studio · Little Rock
              </span>
            </div>

            <h1 className="mt-8 font-display text-[clamp(40px,7vw,84px)] font-extralight leading-[0.98] tracking-tight text-white-90">
              Real creators.
              <br />
              <span className="text-white-40 italic">Real content.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
              The Spot is Central Arkansas&apos; creative studio: podcasts,
              video, brand and product shoots. Five rentable sets, from a
              flagship podcast room and two styled sets to an intimate
              single-subject space and a garage bay big enough for a vehicle.
            </p>
            <p className="mt-3 max-w-xl text-sm text-white/35">
              How booking works:{" "}
              <span className="text-white/55">pay first</span>, then we email
              you a private calendar link to pick your time slot. Two minutes,
              both steps.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-crimson" />
                <span>$75/hr · all sets</span>
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
                href="#sets"
                className="inline-flex items-center justify-center rounded border border-white/20 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white-70 transition-all hover:border-white/40 hover:text-white"
              >
                Explore the sets
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
            looks. Book a single set, or unlock the whole studio for the day.
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
      <section id="pricing" className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Pricing
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Two ways in.{" "}
            <span className="text-white-40">Rent it, or we make it.</span>
          </h2>

          {/* Lane 1 — Rent the studio */}
          <div className="mt-16">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-xl text-white-90">
                Rent the studio
              </span>
              <span className="text-sm text-white/40">
                Self-serve. All five sets. Bring your own gear.
              </span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {studioPricing.rental.map((p) => (
                <div
                  key={p.name}
                  className={`rounded border p-8 transition-all duration-500 md:p-10 ${
                    p.featured
                      ? "border-crimson/30 bg-[rgba(196,18,48,0.05)]"
                      : "border-white/5 bg-[rgba(17,17,17,0.5)] hover:border-crimson/20"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-lg font-medium text-white-90">
                      {p.name}
                    </h3>
                    <span className="font-display text-2xl font-light text-crimson">
                      {p.price}
                      {p.name === "1 Hour" ? (
                        <span className="text-sm text-white/40">/hr</span>
                      ) : null}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">
                    {p.desc}
                  </p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-crimson transition-colors hover:text-white"
                  >
                    Pay &amp; Book <span aria-hidden>&rarr;</span>
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-white/45">
              <span className="text-crimson">
                {studioPricing.rentalAddOn.price}
              </span>{" "}
              {studioPricing.rentalAddOn.name}: {studioPricing.rentalAddOn.desc}
            </p>
          </div>

          {/* Lane 2 — We produce it */}
          <div className="mt-20">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-xl text-white-90">
                We produce it
              </span>
              <span className="text-sm text-white/40">
                Done-for-you. Record, edit, deliver.
              </span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {studioPricing.production.map((p) => (
                <div
                  key={p.name}
                  className={`rounded border p-8 transition-all duration-500 md:p-10 ${
                    p.featured
                      ? "border-crimson/30 bg-[rgba(196,18,48,0.05)]"
                      : "border-white/5 bg-[rgba(17,17,17,0.5)] hover:border-crimson/20"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-lg font-medium text-white-90">
                      {p.name}
                    </h3>
                    <span className="font-display text-2xl font-light text-crimson">
                      {p.price}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">
                    {p.desc}
                  </p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-crimson transition-colors hover:text-white"
                  >
                    Book &amp; Pay <span aria-hidden>&rarr;</span>
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/35">
                Add-ons
              </span>
              {studioPricing.productionAddOns.map((a) => (
                <span key={a.name} className="text-sm text-white/55">
                  <span className="text-crimson">{a.price}</span> {a.name}
                </span>
              ))}
            </div>

            {/* Monthly */}
            <p className="mt-12 text-[10px] uppercase tracking-[0.25em] text-white/35">
              Monthly, in bulk
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {studioPricing.monthly.map((m) => (
                <div
                  key={m.name}
                  className="rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 transition-colors hover:border-crimson/20"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-lg font-medium text-white-90">
                      {m.name}
                    </h3>
                    <span className="text-xs text-white/40">{m.cadence}</span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={m.audio.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded border border-white/15 px-4 py-2 text-[11px] uppercase tracking-[0.15em] text-white-70 transition-colors hover:border-white/40 hover:text-white"
                    >
                      Audio · {m.audio.price}
                    </a>
                    <a
                      href={m.video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded bg-crimson px-4 py-2 text-[11px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-crimson-dark"
                    >
                      Video · {m.video.price}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-12 text-center text-sm text-white/35">
            Everything books directly with Avery &amp; Bryant. Pay online, then
            pick your time slot. Regulars save with a membership above.
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
            Reserve a set online, or send a note if you want a multi-set day or
            a full production crew.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={PAY_PODCAST_1HR}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Reserve the Podcast Room
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
