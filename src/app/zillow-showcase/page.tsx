import Link from "next/link";
import { FaqSection } from "@/components/faq-section";
import { ZillowTourEmbed } from "@/components/zillow-tour";
import { FEATURED_LIVE_TOUR } from "@/lib/live-tours";
import { Eyebrow } from "@/components/eyebrow";
import { ScrollSteps, type ScrollStep } from "@/components/scroll-steps";

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
      "/images/zillow-showcase/little-rock-kitchen-2.jpg",
    ],
  },
};

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

// The four parts of a Showcase listing, in the order a buyer meets them.
// Media rules: Aryeo Showcase photographer resource center and Zillow's
// Showcase pages, checked 2026-10-09. The floor plan is Zillow's, from the
// same Benton home as the live tour, cropped so no street prints.
const showcaseSteps: ScrollStep[] = [
  {
    number: "01",
    title: "Listing photos",
    body: "Zillow asks for at least 10 photos showing at least 3 distinct interior rooms. We shoot them in the same visit as the tour, so furniture and finishes match everywhere.",
    media: {
      kind: "gallery",
      caption: "One home, one visit",
      photos: [
        { src: "/images/zillow-showcase/little-rock-front-exterior.jpg", alt: "Front exterior of a Little Rock home photographed by Avery & Bryant" },
        { src: "/images/zillow-showcase/little-rock-living-room.jpg", alt: "Living room with exposed wood beams and a view into the kitchen" },
        { src: "/images/zillow-showcase/little-rock-kitchen.jpg", alt: "Kitchen in the same Little Rock home" },
        { src: "/images/zillow-showcase/little-rock-kitchen-2.jpg", alt: "Second angle of the same kitchen" },
        { src: "/images/zillow-showcase/little-rock-bathroom.jpg", alt: "Bathroom in the same Little Rock home" },
      ],
    },
  },
  {
    number: "02",
    title: "A Zillow 3D Home tour",
    body: "Captured in the Zillow 3D Home app with a 360 camera. Matterport and other tours do not count toward Showcase.",
    media: {
      kind: "video",
      src: "/images/services/3d-tours/tour3d-2.mp4",
      poster: "/images/services/3d-tours/tour3d-2-poster.jpg",
      alt: "Moving through a Zillow 3D Home tour captured by Avery & Bryant",
      framed: true,
    },
  },
  {
    number: "03",
    title: "An interactive floor plan",
    body: "Zillow builds it from our 3D Home capture, room by room with dimensions. Floor plans from other tools do not count toward Showcase.",
    media: {
      kind: "image",
      src: "/images/zillow-showcase/benton-floor-plan.jpg",
      alt: "Zillow floor plan with room dimensions for a new construction home in Benton, Arkansas",
      fit: "contain",
    },
  },
  {
    number: "04",
    title: "Booked right inside Zillow",
    body: `This is the agent's side. After buying Showcase for a listing, the agent picks Avery & Bryant as the photographer and orders "${SHOWCASE_PRODUCT_NAME}" right there. Or book it with us here.`,
    media: {
      kind: "path",
      label: "What the agent does",
      items: [
        "Buys Showcase for the listing from Zillow",
        "Picks Avery & Bryant as the photographer",
        `Orders "${SHOWCASE_PRODUCT_NAME}"`,
        "We shoot and upload. Showcase goes live with the MLS listing",
      ],
    },
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
            Photos, a Zillow 3D tour and the floor plan in one visit. Book us
            right inside Zillow.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/book/home"
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

      {/* What Showcase needs: pinned media beside scrolling steps */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/70">
            The requirement
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(24px,4vw,44px)] font-extralight tracking-tight text-fg">
            What a Showcase listing needs, from one visit.
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-fg-secondary">
            The listing agent buys Showcase from Zillow. Zillow asks the
            photographer for the media, and agents choose who captures it.
          </p>
          <div className="mt-12 md:mt-4">
            <ScrollSteps steps={showcaseSteps} />
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
                href="/book/home"
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
                The same tour and floor plan, for any listing.
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
            New construction in Benton. Tap to load, then drag to look around.
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
            Zillow averages vs. similar nearby listings without Showcase, July
            2026. Source:{" "}
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
            Zillow averages vs. similar nearby listings without one, July 2026.
            Source:{" "}
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
            href="/book/home"
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
