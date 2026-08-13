import Link from "next/link";
import { FaqSection } from "@/components/faq-section";

export const metadata = {
  alternates: { canonical: "/zillow-showcase" },
  title:
    "Zillow Showcase Listings in Arkansas | Avery & Bryant — Zillow Media Expert",
  description:
    "Avery & Bryant is a Zillow Media Expert producing Showcase-ready listing media in Central Arkansas: interactive floor plans, immersive galleries, and aerial. Zillow Showcase listings sell for about 2% more.",
};

// Zillow's own published figures (Zillow Showcase Fast Facts / Zillow Research, 2025).
const stats = [
  { value: "79%", label: "more page views" },
  { value: "76%", label: "more saves" },
  { value: "91%", label: "more shares" },
  { value: "~2%", label: "higher sale price (about $7,000)" },
];

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
    question: "Do Zillow Showcase listings actually perform better?",
    answer:
      "According to Zillow, Showcase listings get roughly 79% more page views, 76% more saves, and 91% more shares than similar non-Showcase listings, and sell for about 2% more (around $7,000 on an average home). Agents who use Showcase on most of their listings win about 35% more listings.",
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
            that make your listing stand out and sell for more.
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

      {/* Stats */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/70">
            Why it matters
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(24px,4vw,44px)] font-extralight tracking-tight text-fg">
            Showcase listings don&apos;t just look better. They perform.
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
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
          <p className="mt-6 text-xs text-fg-secondary">
            Source: Zillow, comparing Showcase listings to similar non-Showcase
            listings (2025). Results vary by market and property.
          </p>
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
