import Link from "next/link";
import Image from "next/image";
import { FaqSection } from "@/components/faq-section";

export const metadata = {
  alternates: { canonical: "/zillow-showcase" },
  title:
    "Zillow Showcase Listings in Arkansas | Avery & Bryant, Zillow Media Expert",
  description:
    "Avery & Bryant is a Zillow Media Expert producing Showcase-ready listing media in Central Arkansas: interactive floor plans, immersive galleries, and aerial.",
};

const heroFrame = {
  src: "/images/zillow-showcase/69-mountain-brook-little-rock-marble-island-kitchen.jpg",
  alt: "Wide kitchen with a stone topped island, grey cabinets and a wood range hood in a finished home listing at 69 Mountain Brook in Little Rock, Arkansas",
  caption: "69 Mountain Brook, Little Rock",
};

const showcaseGallery = [
  {
    src: "/images/zillow-showcase/69-mountain-brook-little-rock-bath-vanity.jpg",
    alt: "Bathroom with a grey vanity, brushed gold fixtures, a framed mirror and a tiled tub and shower surround at 69 Mountain Brook in Little Rock, Arkansas",
    caption: "Bath, Little Rock",
  },
  {
    src: "/images/zillow-showcase/69-mountain-brook-little-rock-brick-front.jpg",
    alt: "Finished brick and board and batten front elevation at 69 Mountain Brook in Little Rock, Arkansas, with a covered porch, an arched front door and new sod",
    caption: "Front elevation, Little Rock",
  },
  {
    src: "/images/zillow-showcase/18-lefever-ln-little-rock-beamed-great-room.jpg",
    alt: "Designer furnished great room with exposed beams in a single family listing at 18 Lefever Lane in Little Rock, Arkansas",
    caption: "Beamed great room, Little Rock",
  },
  {
    src: "/images/zillow-showcase/18-lefever-ln-little-rock-white-kitchen.jpg",
    alt: "Kitchen range wall with white subway tile, white upper cabinets, grey lower cabinets and a stainless range and hood at 18 Lefever Lane in Little Rock, Arkansas",
    caption: "Kitchen, Little Rock",
  },
];

// Ruling (Thomas, 2026-09-21): every Zillow performance number on the site
// carries the attribution "per Zillow, via Aryeo's Zillow Media Advantage" or
// comes off. The only figures with that named source are the HD-photo saves
// and shares comparison below. The Showcase page-view / sale-price figures
// that used to sit here had no verifiable source in hand, so they are removed.
// TODO(catalog): restore Showcase-specific figures only with a dated Zillow
// source URL on file.
const stats = [
  { value: "+11%", label: "saves vs similar listings without HD photos" },
  { value: "+12%", label: "shares vs similar listings without HD photos" },
];
const statsSource =
  "Per Zillow, via Aryeo's Zillow Media Advantage. Aggregate platform comparison; results vary by market and property.";

const steps = [
  {
    number: "01",
    title: "Book the shoot",
    description:
      "Pick your date. We handle the full Showcase media capture in one visit: HDR photography, aerial, and the assets Zillow needs.",
  },
  {
    number: "02",
    title: "We produce it",
    description:
      "As a Zillow Media Expert, we build the interactive floor plan, immersive gallery, and virtual tour that qualify your listing for Showcase.",
  },
  {
    number: "03",
    title: "Your listing goes Showcase",
    description:
      "Your listing gets the Showcase badge and elevated placement on Zillow. Delivered fast, ready to publish.",
  },
];

const faqs = [
  {
    question: "What is a Zillow Showcase listing?",
    answer:
      "Zillow Showcase is a premium listing experience on Zillow with an interactive floor plan, an immersive high-resolution gallery, virtual tour, and elevated placement in search. Showcase listings carry a Showcase badge that helps them stand out. The media has to be produced by a Zillow Media Expert.",
  },
  {
    question: "Is Avery & Bryant a Zillow Media Expert?",
    answer:
      "Yes. Avery & Bryant is a Zillow Media Expert, which means we are qualified to produce the interactive floor plans, immersive galleries, and media that make a listing eligible for Zillow Showcase.",
  },
  {
    question: "Does better listing media actually perform better on Zillow?",
    answer:
      "Per Zillow, via Aryeo's Zillow Media Advantage, listings with HD photos see about 11% more saves and 12% more shares than similar listings without them. That is an aggregate platform comparison, not a promise about any one listing, and results vary by market and property.",
  },
  {
    question: "Do you produce Showcase media across Central Arkansas?",
    answer:
      "Yes. We are based in Little Rock at (501) 502-2925 and produce Showcase-ready listing media across Central Arkansas, including Little Rock, Benton, Conway, Hot Springs, and surrounding areas.",
  },
];

export default function ZillowShowcasePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson/5 blur-[160px]" />
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 py-24 md:px-12 md:py-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-crimson/30 bg-crimson/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson" />
            <a
              href="https://www.zillow.com/agents/media-experts/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-medium uppercase tracking-[0.25em] text-crimson transition-colors hover:text-white"
            >
              Zillow Media Expert
            </a>
          </div>

          <h1 className="mt-8 max-w-3xl font-display text-[clamp(34px,6vw,72px)] font-extralight leading-[1.05] tracking-tight text-fg">
            Zillow Showcase,
            <br />
            <span className="text-fg-secondary">produced in Arkansas.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-secondary md:text-lg">
            Showcase is Zillow&apos;s premium listing experience, and the media
            behind it has to come from a Zillow Media Expert. That&apos;s us. We
            produce the interactive floor plans, immersive galleries, and aerial
            that make your listing stand out.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Book a Showcase Shoot
            </Link>
            <Link
              href="/real-estate"
              className="inline-flex items-center justify-center rounded border border-white/15 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-fg-strong transition-all hover:border-white/40 hover:text-white"
            >
              See Our Listing Media
            </Link>
          </div>
        </div>
      </section>

      {/* Recent listing media (real delivered work) */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/70">
            The media behind it
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(24px,4vw,44px)] font-extralight tracking-tight text-fg">
            Recent Central Arkansas listings we photographed.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-fg-secondary">
            Showcase assets are built from captures like these: full HDR
            interiors and exteriors from a single visit.
          </p>

          <figure className="mt-10">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-white/5 bg-[#111]">
              <Image
                src={heroFrame.src}
                alt={heroFrame.alt}
                fill
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[10px] uppercase tracking-[0.2em] text-fg-secondary">
              {heroFrame.caption}
            </figcaption>
          </figure>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {showcaseGallery.map((shot) => (
              <figure key={shot.src}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/5 bg-[#111]">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(min-width: 640px) 600px, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-[10px] uppercase tracking-[0.2em] text-fg-secondary">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/70">
            Why it matters
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(24px,4vw,44px)] font-extralight tracking-tight text-fg">
            Better listing media gets more attention on Zillow.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-white/5 bg-card p-6 md:p-8"
              >
                <div className="font-display text-4xl font-extralight text-crimson md:text-5xl">
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-fg-secondary">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-fg-secondary">{statsSource}</p>
        </div>
      </section>

      {/* Why A&B */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-6 md:grid-cols-2 md:px-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/70">
              The requirement
            </p>
            <h2 className="mt-3 font-display text-[clamp(24px,4vw,40px)] font-extralight tracking-tight text-fg">
              Only a Zillow Media Expert can make a listing Showcase-eligible.
            </h2>
          </div>
          <div className="space-y-5 text-fg-secondary">
            <p className="leading-relaxed">
              Zillow Showcase isn&apos;t a filter you turn on. The interactive
              floor plan, the immersive gallery, and the virtual tour all have
              to be produced to Zillow&apos;s spec by a qualified Media Expert.
            </p>
            <p className="leading-relaxed">
              Avery &amp; Bryant is a Zillow Media Expert. We shoot the
              property, build the Showcase assets, and deliver a listing
              that&apos;s ready to publish with the Showcase badge. One shoot,
              the full package.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/70">
            How it works
          </p>
          <h2 className="mt-3 font-display text-[clamp(24px,4vw,40px)] font-extralight tracking-tight text-fg">
            Three steps to a Showcase listing.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-lg border border-white/5 bg-card p-8 transition-colors hover:border-crimson/20"
              >
                <span className="font-display text-4xl font-extralight text-crimson">
                  {step.number}
                </span>
                <h3 className="mt-4 font-display text-lg font-medium text-fg">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} />

      {/* CTA */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center md:px-12">
          <h2 className="font-display text-[clamp(24px,4vw,48px)] font-extralight tracking-tight text-fg">
            Give your next listing the Showcase edge.
          </h2>
          <Link
            href="/book"
            className="mt-8 inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
          >
            Book a Showcase Shoot
          </Link>
        </div>
      </section>
    </>
  );
}
