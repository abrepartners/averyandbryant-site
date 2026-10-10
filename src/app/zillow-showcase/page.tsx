import Link from "next/link";
import { FaqSection } from "@/components/faq-section";
import { ZillowTourEmbed } from "@/components/zillow-tour";
import { FEATURED_LIVE_TOUR } from "@/lib/live-tours";
import { Eyebrow } from "@/components/eyebrow";

// Showcase package price, approved for display by Thomas 2026-10-09. Every
// mention on this page reads from this one constant.
// Source: Aryeo product "Main Package", designated in Showcase Select as
// "Photography and Zillow 3D Home Interactive Tour and Floor Plan".
// Do NOT confuse with the Aryeo "5-Star Showcase Blueprint" ($1,095): that is
// an Airbnb / rental package and has nothing to do with Zillow Showcase.
const SHOWCASE_PACKAGE_PRICE = "$249.99";

// Aryeo "2026, Zillow 3D Tour + Interactive Floor Plan". Already public on the
// homepage 3D Tours card.
const ZILLOW_3D_STANDALONE_PRICE = "$149";

// Name the package carries inside Zillow's Showcase ordering platform, so
// agents recognize it when they order there.
const SHOWCASE_PRODUCT_NAME =
  "Photography and Zillow 3D Home Interactive Tour and Floor Plan";

const SHOWCASE_FACTS_URL = "https://www.zillow.com/agents/showcase-facts/";
const ZILLOW_3D_HOME_URL = "https://www.zillow.com/3d-home/";

const title = "Zillow Showcase Photography in Arkansas | Avery & Bryant";
const description =
  "Showcase-ready listing media in Central Arkansas: photos plus a Zillow 3D Home tour and interactive floor plan. Agents can book us inside Zillow Showcase.";

export const metadata = {
  alternates: { canonical: "/zillow-showcase" },
  title,
  description,
  openGraph: {
    type: "website",
    title,
    description,
    url: "/zillow-showcase",
    siteName: "Avery & Bryant",
    images: [
      "/images/zillow-showcase/69-mountain-brook-little-rock-marble-island-kitchen.jpg",
    ],
  },
};

// Zillow's media requirements for a Showcase listing (Aryeo Showcase
// photographer resource center, checked 2026-10-09).
const requirements = [
  "At least 10 photos showing at least 3 distinct interior rooms.",
  "A Zillow 3D Home tour, captured in the Zillow 3D Home app.",
  "An interactive floor plan, which Zillow creates from that 3D Home capture.",
  "Matterport tours and other floor plans do not count toward Showcase.",
];

const packageIncludes = [
  "Listing photography that meets Zillow's Showcase minimum: at least 10 photos covering at least 3 interior rooms.",
  "A Zillow 3D Home tour, captured in the same visit as the photos.",
  "An interactive floor plan, created by Zillow from our 3D Home capture.",
];

// Every number below is Zillow's, quoted as published, with its source.
// Zillow Showcase Facts, page last updated July 8, 2026 (June 2026 data).
const showcaseStats = [
  { value: "84%", label: "more page views" },
  { value: "77%", label: "more saves" },
  { value: "93%", label: "more shares" },
  { value: "2%", label: "more at sale" },
];

// Zillow 3D Home page (June 2026 data, 12 month average).
const floorPlanStats = [
  { value: "43%", label: "more page views" },
  { value: "49%", label: "more saves" },
  { value: "47%", label: "more shares" },
];

const steps = [
  {
    number: "01",
    title: "The agent buys Showcase",
    description:
      "Showcase is purchased from Zillow by the listing agent, directly or through a brokerage agreement. Zillow sets that fee and bills the agent.",
  },
  {
    number: "02",
    title: "Book Avery & Bryant",
    description:
      "Order our Showcase package directly inside Zillow's Showcase ordering platform, or book it with us here. Either way, one visit covers it.",
  },
  {
    number: "03",
    title: "We capture and deliver",
    description:
      "We shoot the photos and the Zillow 3D Home tour in the same visit, Zillow creates the interactive floor plan from our capture, and we deliver the media for the Showcase listing.",
  },
];

const faqs = [
  {
    question: "What is a Zillow Showcase listing?",
    answer:
      "Zillow Showcase is a premium listing experience available only on Zillow. Zillow describes it as scrolling high resolution photography, a virtual tour and an interactive floor plan, with prioritized placement in personalized search results and dedicated emails to shoppers whose criteria match the home. The listing agent buys Showcase from Zillow.",
  },
  {
    question: "What media does a Showcase listing need?",
    answer:
      "Zillow requires at least 10 photos showing at least 3 distinct interior rooms, plus a Zillow 3D Home tour and interactive floor plan captured in the Zillow 3D Home app. Matterport tours and other floor plans are not accepted. Our Showcase package covers all of it in one visit.",
  },
  {
    question: "Can any photographer shoot Showcase media?",
    answer:
      "Agents are free to choose their own photographer for Showcase. What matters is the media: the photographer has to capture a Zillow 3D Home tour and interactive floor plan with a compatible 360 camera, along with the photos. We capture both in the same visit, so the furniture and finishes match across every photo and the tour.",
  },
  {
    question: "How do agents book Avery & Bryant for Showcase?",
    answer: `Two ways. Inside Zillow's Showcase ordering platform, find Avery & Bryant among the local photographers and order "${SHOWCASE_PRODUCT_NAME}". Or book with us directly on this site and tell us the listing is going Showcase.`,
  },
  {
    question: "What does Showcase cost, and what do you charge?",
    answer: `They are two separate costs. Zillow sets the Showcase fee, bills it to the listing agent and does not publish it. Our Showcase media package is ${SHOWCASE_PACKAGE_PRICE}: listing photography plus the Zillow 3D Home tour and interactive floor plan. Booking media with us does not activate Showcase; that purchase is made with Zillow.`,
  },
  {
    question: "Can I get a Zillow 3D Home tour without Showcase?",
    answer: `Yes. For listings that are not going Showcase, our Zillow 3D Tour + Interactive Floor Plan is ${ZILLOW_3D_STANDALONE_PRICE}. Per Zillow, listings with an interactive floor plan drew more page views, saves and shares on average than similar nearby listings without one.`,
  },
  {
    question: "Does Showcase guarantee more views or a higher price?",
    answer:
      "No. The figures on this page are Zillow's averages, comparing listings with similar nearby listings. They are not a promise for any one listing, and results vary by market and property.",
  },
  {
    question: "Do you shoot Showcase media across Central Arkansas?",
    answer:
      "Yes. We are based in Little Rock at (501) 502-2925 and capture Showcase media across Central Arkansas, including Little Rock, Benton, Conway, Hot Springs, and surrounding areas.",
  },
];

export default function ZillowShowcasePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson/5 blur-[160px]" />
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 py-24 md:px-12 md:py-32">
          <Eyebrow>Showcase-ready media</Eyebrow>

          <h1 className="mt-8 max-w-3xl font-display text-[clamp(34px,6vw,72px)] font-extralight leading-[1.05] tracking-tight text-fg">
            Zillow Showcase photography,
            <br />
            <span className="text-fg-secondary">
              captured in Central Arkansas.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-secondary md:text-lg">
            Showcase is the premium listing experience agents buy from Zillow.
            We produce the media it requires: listing photos plus a Zillow 3D
            Home tour and interactive floor plan, captured in one visit. Agents
            can book us directly inside Zillow&apos;s Showcase ordering
            platform.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Book Showcase Media
            </Link>
            <a
              href="#live-tour"
              className="inline-flex items-center justify-center rounded border border-white/15 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-fg-strong transition-all hover:border-white/40 hover:text-white"
            >
              See a Live 3D Tour
            </a>
          </div>
        </div>
      </section>

      {/* What Showcase requires */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-6 md:grid-cols-2 md:px-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/70">
              The requirement
            </p>
            <h2 className="mt-3 font-display text-[clamp(24px,4vw,40px)] font-extralight tracking-tight text-fg">
              What Zillow asks for in a Showcase listing.
            </h2>
            <p className="mt-5 leading-relaxed text-fg-secondary">
              The listing agent buys Showcase from Zillow. What Zillow asks of
              the photographer is the media, and agents are free to choose who
              captures it.
            </p>
          </div>
          <div className="space-y-5 text-fg-secondary">
            <ul className="space-y-3">
              {requirements.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-lg border border-white/5 bg-card p-5 text-sm leading-relaxed"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="leading-relaxed">
              We capture the photos and the 3D Home tour in the same visit, so
              furniture and finishes match across every image and the tour.
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
            Three steps to Showcase-ready media.
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

      {/* The package */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/70">
            The Showcase package
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(24px,4vw,44px)] font-extralight tracking-tight text-fg">
            Everything Showcase asks for, from one visit.
          </h2>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-lg border border-crimson/20 bg-card p-6 md:p-10">
              <p className="text-[10px] uppercase tracking-[0.25em] text-fg-secondary">
                For Showcase listings
              </p>
              <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h3 className="max-w-md font-display text-xl font-medium text-fg md:text-2xl">
                  Photography plus a Zillow 3D Home tour and interactive floor
                  plan
                </h3>
                <span className="font-display text-4xl font-extralight text-crimson">
                  {SHOWCASE_PACKAGE_PRICE}
                </span>
              </div>
              <ul className="mt-8 space-y-3">
                {packageIncludes.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-fg-secondary"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-white/5 pt-6 text-sm leading-relaxed text-fg-secondary">
                Ordering inside Zillow&apos;s Showcase platform? Look for{" "}
                <span className="text-fg-strong">
                  &ldquo;{SHOWCASE_PRODUCT_NAME}&rdquo;
                </span>{" "}
                from Avery &amp; Bryant.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-fg-secondary">
                This is our media price. Zillow bills the Showcase fee to the
                agent separately, and booking media with us does not activate
                Showcase.
              </p>
              <Link
                href="/book"
                className="mt-8 inline-flex items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
              >
                Book Showcase Media
              </Link>
            </div>

            <div className="flex flex-col rounded-lg border border-white/5 bg-card p-6 md:p-10">
              <p className="text-[10px] uppercase tracking-[0.25em] text-fg-secondary">
                Not going Showcase?
              </p>
              <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h3 className="font-display text-xl font-medium text-fg">
                  Zillow 3D Tour + Interactive Floor Plan
                </h3>
                <span className="font-display text-3xl font-extralight text-crimson">
                  {ZILLOW_3D_STANDALONE_PRICE}
                </span>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-fg-secondary">
                The same Zillow 3D Home tour and interactive floor plan for any
                listing, Showcase or not. Once the tour link is on the MLS,
                Zillow says it syndicates to most major real estate sites.
              </p>
              <Link
                href="/real-estate"
                className="mt-auto inline-flex min-h-[44px] items-center pt-6 text-[11px] uppercase tracking-[0.2em] text-crimson transition-colors hover:text-white"
              >
                See all listing packages &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live tour */}
      <section
        id="live-tour"
        className="scroll-mt-24 border-b border-border py-16 md:py-24"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/70">
            See it live
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(24px,4vw,44px)] font-extralight tracking-tight text-fg">
            Walk through a home we captured.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-fg-secondary">
            A Zillow 3D Home tour from a new construction listing we shot in
            Benton. Load it, then drag to look around and move room to room.
            The tour loads from Zillow when you open it.
          </p>
          <div className="mt-10">
            <ZillowTourEmbed tour={FEATURED_LIVE_TOUR} />
          </div>
        </div>
      </section>

      {/* Zillow's numbers */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/70">
            Why it matters
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(24px,4vw,44px)] font-extralight tracking-tight text-fg">
            What Zillow reports, as of July 2026.
          </h2>

          <h3 className="mt-12 font-display text-lg font-medium text-fg">
            Zillow Showcase listings
          </h3>
          <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {showcaseStats.map((s) => (
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
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-fg-secondary">
            Per Zillow, as of July 2026: active Showcase listings drove on
            average 84% more page views, 77% more saves and 93% more shares
            than similar nearby non-Showcase listings, and Showcase listings
            sold for 2% more than similar non-Showcase listings. Source:{" "}
            <a
              href={SHOWCASE_FACTS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-strong underline underline-offset-2 hover:text-white"
            >
              Zillow Showcase Facts
            </a>
            .
          </p>

          <h3 className="mt-12 font-display text-lg font-medium text-fg">
            Listings with an interactive floor plan
          </h3>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {floorPlanStats.map((s) => (
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
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-fg-secondary">
            Per Zillow, as of July 2026: active listings with a Zillow 3D Home
            interactive floor plan drove on average 43% more page views, 49%
            more saves and 47% more shares than similar nearby listings without
            one. This applies with or without Showcase. Source:{" "}
            <a
              href={ZILLOW_3D_HOME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-strong underline underline-offset-2 hover:text-white"
            >
              Zillow 3D Home
            </a>
            .
          </p>
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-fg-secondary">
            These are Zillow&apos;s averages, not a promise for any one
            listing. Results vary by market and property.
          </p>
        </div>
      </section>

      <FaqSection faqs={faqs} />

      {/* CTA */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center md:px-12">
          <h2 className="font-display text-[clamp(24px,4vw,48px)] font-extralight tracking-tight text-fg">
            Going Showcase? Book the media in one visit.
          </h2>
          <Link
            href="/book"
            className="mt-8 inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
          >
            Book Showcase Media
          </Link>
          <p className="mx-auto mt-12 max-w-2xl text-xs leading-relaxed text-fg-secondary">
            Zillow, Zillow Showcase and Zillow 3D Home are trademarks of Zillow,
            Inc. Avery &amp; Bryant is an independent real estate media
            company.
          </p>
        </div>
      </section>
    </>
  );
}
