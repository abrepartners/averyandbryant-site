import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/hero";

const services = [
  {
    title: "Photos",
    price: "$162+",
    description: "Professional HDR photography. Priced by square footage.",
    image: "/images/portfolio-interior-1.jpg",
  },
  {
    title: "Reels Pack",
    price: "$450",
    description: "4 reels: Listing, Virality, Trailer, Teaser",
    image: "/images/staging-twilight.jpg",
  },
  {
    title: "Drone",
    price: "$80+",
    description: "FAA-licensed aerial photography",
    image: "/images/portfolio-drone-3.jpg",
  },
  {
    title: "Video Tours",
    price: "$250",
    description: "Cinematic walkthrough videos",
    image: "/images/portfolio-exterior-1.jpg",
  },
  {
    title: "3D Tours",
    price: "$150",
    description: "Interactive virtual walkthroughs",
    image: "/images/portfolio-interior-2.jpg",
  },
  {
    title: "Virtual Staging",
    price: "$65/image",
    description: "AI-powered staging via StudioAI. 12+ styles.",
    image: "/images/showcase-staging-after.jpg",
  },
];

const verticals = [
  {
    title: "Real Estate Listings",
    description: "Our bread and butter",
    href: "/real-estate",
  },
  {
    title: "Airbnb & Rentals",
    description: "Showcase your rental",
    href: "/airbnb-rentals",
  },
  {
    title: "Multi-Family",
    description: "Apartments & complexes",
    href: "/multi-family",
  },
  {
    title: "Lot & Land",
    description: "Aerial & boundary",
    href: "/lot-land",
  },
  {
    title: "Builders & Businesses",
    description: "Construction & commercial",
    href: "/builders",
  },
  {
    title: "Personal Branding",
    description: "Headshots & content",
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
        tag="Arkansas Real Estate Media Co."
        title="Premium Listing Media"
        titleAccent="for Arkansas Real Estate"
        subtitle="Professional photography, cinematic video tours, aerial drone, twilight exteriors, and virtual staging. Serving Central Arkansas."
        primaryCta={{ label: "Book a Shoot", href: "/book" }}
        secondaryCta={{
          label: "View Portfolio",
          href: "https://homes.averyandbryant.com",
          external: true,
        }}
        backgroundImage="/images/staging-twilight.jpg"
      />

      {/* ── TRUST BAR ── */}
      <section className="border-y border-white/5 bg-[rgba(17,17,17,0.3)]">
        <div className="mx-auto max-w-[1280px] px-6 py-8 md:px-12 md:py-10">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            {/* Stat */}
            <p className="shrink-0 text-[11px] uppercase tracking-[0.25em] text-white/40">
              Trusted by <span className="text-white/70">200+</span> Arkansas
              agents
            </p>

            {/* Brokerage logos */}
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

            {/* Ratings */}
            <div className="flex shrink-0 items-center gap-6">
              <span className="rounded border border-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
                BBB A+
              </span>
              <a
                href="https://g.page/r/CQxxxxxxxxxx/review"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] text-white/40 transition-colors hover:text-white/60"
              >
                <span className="text-crimson">★★★★★</span>
                <span>Google (24)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            What We Shoot
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Everything your listing needs.{" "}
            <span className="text-white-40">One company.</span>
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="pricing-card group overflow-hidden rounded border border-white/5 bg-[rgba(17,17,17,0.5)] transition-all duration-500 hover:border-white/10"
              >
                {/* Image area */}
                <div className="image-loading relative h-48 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                </div>

                {/* Content */}
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
        </div>
      </section>

      {/* ── VERTICALS ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Property Verticals
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            We Shoot More Than Listings
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

      {/* ── AI PRODUCTS TEASER ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Beyond the Shoot
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            AI-powered tools{" "}
            <span className="text-white-40">for modern agents.</span>
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {/* StudioAI */}
            <div className="group rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 transition-all duration-500 hover:border-crimson/20 hover:bg-[rgba(17,17,17,0.8)] md:p-10">
              <span className="inline-block rounded-full border border-crimson/30 bg-crimson/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-crimson">
                StudioAI
              </span>
              <h3 className="mt-6 font-display text-2xl font-light text-white-90">
                AI photo editing for your listings.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/40">
                Stage, clean, convert to twilight — in seconds. No Photoshop
                required. Built for agents who move fast.
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

            {/* Answr */}
            <div className="group rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 transition-all duration-500 hover:border-crimson/20 hover:bg-[rgba(17,17,17,0.8)] md:p-10">
              <span className="inline-block rounded-full border border-crimson/30 bg-crimson/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-crimson">
                Answr
              </span>
              <h3 className="mt-6 font-display text-2xl font-light text-white-90">
                Never miss another lead.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/40">
                AI voice &amp; chat agents that answer 24/7. Book appointments,
                qualify leads, and route calls — even at 2 AM.
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

      {/* ── REFERRAL PROGRAM ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="rounded-lg border border-crimson/10 bg-gradient-to-br from-crimson/5 to-transparent p-10 md:p-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
                Referral Program
              </p>
              <h2 className="mt-4 font-display text-[clamp(24px,4vw,40px)] font-light tracking-tight text-white-90">
                Know an agent? Get paid.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/40">
                Every agent you refer who books a shoot earns you cash. Not a gift card. Not a thank you email. Actual money. We believe in thanking with more than just words.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href="tel:+15015022925"
                  className="inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
                >
                  Call to Learn More
                </a>
                <a
                  href="mailto:hello@averyandbryant.com?subject=Referral%20Program"
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
            Ready to elevate your listings?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/40 md:text-lg">
            Book a shoot in under 2 minutes. Choose your area to get started.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/book"
              className="inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Central Arkansas
            </Link>
            <Link
              href="/book"
              className="inline-block rounded border border-white/10 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white-60 transition-all hover:border-white/30 hover:text-white"
            >
              Call Us: (501) 502-2925
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
