import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/hero";
import { GoogleReviews } from "@/components/google-reviews";

const services = [
  {
    title: "Photos",
    price: "$162+",
    description:
      "HDR photography calibrated for MLS, print, and social. Delivered same-day or next-day.",
    image: "/images/portfolio-interior-1.jpg",
  },
  {
    title: "Reels Pack",
    price: "$450",
    description:
      "4 platform-native reels: listing walkthrough, viral hook, cinematic trailer, teaser. Shot and edited in one visit.",
    image: "/images/staging-twilight.jpg",
  },
  {
    title: "Drone",
    price: "$80+",
    description:
      "FAA-licensed aerials. Property context, neighborhood scale, lot boundaries.",
    image: "/images/portfolio-drone-3.jpg",
  },
  {
    title: "Video Tours",
    price: "$250",
    description:
      "Cinematic walkthrough video with music, pacing, and branded intro. MLS and social-ready.",
    image: "/images/portfolio-exterior-1.jpg",
  },
  {
    title: "3D Tours",
    price: "$150",
    description:
      "Interactive 3D walkthrough. Buyers explore the home remotely, room by room.",
    image: "/images/portfolio-interior-2.jpg",
  },
  {
    title: "Virtual Staging",
    price: "$65/image",
    description:
      "AI-powered staging. 12+ interior styles. Empty rooms to styled spaces in under 24 hours.",
    image: "/images/showcase-staging-after.jpg",
  },
];

const systemSteps = [
  {
    num: "01",
    title: "Professional Shoot",
    description:
      "HDR photography, cinematic video, drone aerials, and 3D tours captured on-site. One visit. Everything your listing needs.",
  },
  {
    num: "02",
    title: "StudioAI Post-Production",
    description:
      "AI-powered color grading, sky replacement, and twilight conversion. Magazine-quality edits in hours, not days.",
  },
  {
    num: "03",
    title: "Virtual Staging",
    description:
      "Empty rooms transformed into styled interiors. 12+ design styles. Ready overnight.",
  },
  {
    num: "04",
    title: "Delivery & MLS-Ready Assets",
    description:
      "Branded gallery, downloadable files, social-ready crops, and MLS-formatted exports. Everything organized.",
  },
  {
    num: "05",
    title: "Answr Lead Capture",
    description:
      "AI voice and chat agents answer buyer calls 24/7. Every inquiry routed and qualified automatically.",
  },
];

const verticals = [
  {
    title: "Real Estate Listings",
    description:
      "Residential resale. Photography, video, drone, staging, and 3D tours from one shoot.",
    href: "/real-estate",
  },
  {
    title: "Airbnb & Rentals",
    description:
      "Short-term rental media that drives bookings. Optimized for Airbnb, VRBO, and direct booking sites.",
    href: "/airbnb-rentals",
  },
  {
    title: "Multi-Family",
    description:
      "Apartment complexes, student housing, and multi-unit communities. Amenity-focused production.",
    href: "/multi-family",
  },
  {
    title: "Lot & Land",
    description:
      "Aerial boundary surveys, topography context, and development-ready visuals for undeveloped parcels.",
    href: "/lot-land",
  },
  {
    title: "Builders",
    description:
      "Progress documentation, model home media, and development marketing for builders and GCs.",
    href: "/builders",
  },
  {
    title: "Commercial",
    description:
      "Office, retail, industrial, and dealership media. Built for commercial listing platforms and investor decks.",
    href: "/commercial",
  },
  {
    title: "Personal Branding",
    description:
      "Professional headshots, team photos, and social content for agents building a personal brand.",
    href: "/branding",
  },
];

const brokerages = [
  "Coldwell Banker",
  "Century 21",
  "Keller Williams",
  "Crye-Leike",
  "Engel & Volkers",
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <Hero
        tag="The ALYT System"
        title="Shoot Today."
        titleAccent="Market Tomorrow."
        subtitle="Professional photography, cinematic video, drone, AI editing, virtual staging, and lead capture. One system. One company. The fastest path from signed listing to live marketing in Arkansas."
        primaryCta={{ label: "Book a Shoot", href: "/book" }}
        secondaryCta={{ label: "See How It Works", href: "#system" }}
        backgroundImage="/images/staging-twilight.jpg"
      />

      {/* ── TRUST BAR ── */}
      <section className="border-y border-white/5 bg-[rgba(17,17,17,0.3)]">
        <div className="mx-auto max-w-[1280px] px-6 py-8 md:px-12 md:py-10">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            <p className="shrink-0 text-[11px] uppercase tracking-[0.25em] text-white/40">
              <span className="text-white/70">200+</span> Arkansas agents
              <span className="mx-3 text-white/10">|</span>
              48-hour avg. delivery
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              {brokerages.map((name) => (
                <span
                  key={name}
                  className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/20 transition-colors hover:text-white/40"
                >
                  {name}
                </span>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-6">
              <span className="rounded border border-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
                BBB A+
              </span>
              {process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ? (
                <a
                  href={process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[11px] text-white/40 transition-colors hover:text-white/60"
                >
                  <span className="text-crimson">★★★★★</span>
                  <span>Google</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* ── THE ALYT SYSTEM ── */}
      <section id="system" className="py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            How It Works
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            From Shoot to Market{" "}
            <span className="text-white-40">in 48 Hours.</span>
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-5">
            {systemSteps.map((step, i) => (
              <div key={step.num} className="relative">
                {i < systemSteps.length - 1 && (
                  <div className="absolute right-0 top-4 hidden h-px w-8 translate-x-full bg-gradient-to-r from-crimson/30 to-transparent md:block" />
                )}
                <span className="font-display text-3xl font-extralight text-crimson/20">
                  {step.num}
                </span>
                <h3 className="mt-3 font-display text-base font-medium text-white-90">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/40">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/book"
              className="inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Book a Shoot
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Services & Pricing
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            One Shoot. Every Asset.{" "}
            <span className="text-white-40">Priced by the Square Foot.</span>
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="pricing-card group overflow-hidden rounded border border-white/5 bg-[rgba(17,17,17,0.5)] transition-all duration-500 hover:border-white/10"
              >
                <div className="image-loading relative h-48 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`Avery & Bryant ${service.title} — Arkansas real estate media`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-lg font-medium text-white-90">
                      {service.title}
                    </h3>
                    <span className="pricing-price text-sm font-semibold text-crimson">
                      {service.price}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/40">
                    {service.description}
                  </p>
                  <Link
                    href="/book"
                    className="mt-4 inline-block text-[11px] uppercase tracking-[0.2em] text-crimson transition-colors hover:text-white"
                  >
                    Book Now &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center">
            <a
              href="https://homes.averyandbryant.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-[0.2em] text-white/30 transition-colors hover:text-white/60"
            >
              See Our Work &rarr;
            </a>
          </p>
        </div>
      </section>

      {/* ── AI INFRASTRUCTURE ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            AI Infrastructure
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Your Listings Keep Working{" "}
            <span className="text-white-40">After You Leave.</span>
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <div className="group rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 transition-all duration-500 hover:border-crimson/20 hover:bg-[rgba(17,17,17,0.8)] md:p-10">
              <span className="inline-block rounded-full border border-crimson/30 bg-crimson/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-crimson">
                StudioAI
              </span>
              <h3 className="mt-6 font-display text-2xl font-light text-white-90">
                Edit Your Own Listing Photos. Instantly.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/40">
                Virtual staging, twilight conversion, sky replacement, and
                object removal. Upload a photo, get a finished asset. No design
                skills. No waiting on editors.
              </p>
              <Link
                href="https://studioai.averyandbryant.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded bg-crimson px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
              >
                Try Free
              </Link>
            </div>

            <div className="group rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 transition-all duration-500 hover:border-crimson/20 hover:bg-[rgba(17,17,17,0.8)] md:p-10">
              <span className="inline-block rounded-full border border-crimson/30 bg-crimson/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-crimson">
                Answr
              </span>
              <h3 className="mt-6 font-display text-2xl font-light text-white-90">
                Every Call Answered. Every Lead Qualified.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/40">
                AI voice and chat agents that pick up every call, answer listing
                questions, qualify buyer intent, and book showings. Running 24/7
                so you don't have to.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <Link
                  href="/answr"
                  className="inline-block rounded bg-crimson px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
                >
                  Start Trial
                </Link>
                <span className="text-[11px] uppercase tracking-[0.15em] text-white/30">
                  From $147/mo
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VERTICALS ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Property Verticals
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Built for Every Property Type{" "}
            <span className="text-white-40">in Arkansas.</span>
          </h2>

          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {verticals.map((vertical) => (
              <Link
                key={vertical.title}
                href={vertical.href}
                className="group rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 transition-all duration-500 hover:border-crimson/20 hover:bg-[rgba(17,17,17,0.8)] md:p-10"
              >
                <h3 className="font-display text-lg font-medium text-white-90 transition-colors group-hover:text-crimson">
                  {vertical.title}
                </h3>
                <p className="mt-2 text-sm text-white/40">
                  {vertical.description}
                </p>
                <span className="mt-4 inline-block text-[11px] uppercase tracking-[0.2em] text-white/20 transition-colors group-hover:text-crimson">
                  Learn More &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOOGLE REVIEWS ── */}
      <GoogleReviews />

      {/* ── REFERRAL PROGRAM ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="rounded-lg border border-crimson/10 bg-gradient-to-br from-crimson/5 to-transparent p-10 md:p-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
                Referral Program
              </p>
              <h2 className="mt-4 font-display text-[clamp(24px,4vw,40px)] font-light tracking-tight text-white-90">
                Refer an Agent. Get Paid.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/40">
                Every agent you refer who books a shoot earns you cash. Not a
                gift card. Not a thank-you email. Real money for real referrals.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href="tel:+15015022925"
                  className="inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
                >
                  Call to Learn More
                </a>
                <a
                  href="mailto:book@averyandbryant.com?subject=Referral%20Program"
                  className="inline-block rounded border border-white/10 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white-60 transition-all hover:border-white/30 hover:text-white"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12 md:py-32">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Get Started
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Your Next Listing Deserves the ALYT System.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/40 md:text-lg">
            Book online in under 2 minutes. We handle the rest.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/book"
              className="inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Book a Shoot
            </Link>
            <a
              href="tel:+15015022925"
              className="inline-block rounded border border-white/10 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white-60 transition-all hover:border-white/30 hover:text-white"
            >
              Call Us: (501) 502-2925
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
