import Link from "next/link";
import { Hero } from "@/components/hero";

export const metadata = {
  title: "Agent Headshots & Personal Branding | Arkansas | Avery & Bryant",
  description:
    "Professional headshots, lifestyle branding, team photos, and content creation for real estate agents and businesses across Arkansas.",
};

const services = [
  {
    title: "Headshots",
    price: "$200",
    description:
      "In-studio, 3 final images, backdrop selection.",
  },
  {
    title: "Lifestyle Brand",
    price: "$350",
    description:
      "On-location, personal brand content, social-ready.",
  },
  {
    title: "Team Package",
    price: "$500+",
    description:
      "Group headshots + brand content.",
  },
  {
    title: "Content Retainer",
    price: "Custom",
    description:
      "Monthly brand content creation.",
  },
];

const sellingPoints = [
  {
    title: "Professional Headshots",
    description:
      "First impressions happen online. A professional headshot builds trust before you ever shake hands.",
  },
  {
    title: "Lifestyle Brand Content",
    description:
      "Photos that show you doing what you do best — not just standing in front of a backdrop. Authentic and on-brand.",
  },
  {
    title: "Social Media Assets",
    description:
      "Every session includes images formatted for Instagram, Facebook, LinkedIn, and your website. Ready to post.",
  },
  {
    title: "Consistent Brand Identity",
    description:
      "We match your brand's look and feel across every photo. Your visual identity stays cohesive everywhere you show up.",
  },
];

const steps = [
  { number: "01", title: "Book Online", description: "Pick your date and session type in under 2 minutes." },
  { number: "02", title: "We Shoot", description: "Relaxed, guided session — we handle the posing and lighting." },
  { number: "03", title: "Get Your Media", description: "Retouched images delivered within 48 hours." },
];

export default function BrandingPage() {
  return (
    <>
      {/* ── HERO ── */}
      <Hero
        tag="Personal Branding"
        title="Your brand is"
        titleAccent="your business card."
        subtitle="Professional headshots, lifestyle branding, team photos, and content creation for agents and businesses across Arkansas."
        primaryCta={{ label: "Book a Session", href: "/book" }}
        secondaryCta={{ label: "View Portfolio", href: "https://homes.averyandbryant.com", external: true }}
        backgroundImage="/images/portfolio-headshot-1.jpg"
      />

      {/* ── SERVICES & PRICING ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Services & Pricing
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Your image matters.{" "}
            <span className="text-white-40">Invest in it.</span>
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 transition-all duration-500 hover:border-crimson/20 hover:bg-[rgba(17,17,17,0.8)]"
              >
                <span className="font-display text-3xl font-light text-crimson">
                  {service.price}
                </span>
                <h3 className="mt-4 font-display text-lg font-medium text-white-90">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/40">
                  {service.description}
                </p>
                <Link
                  href="/book"
                  className="mt-6 inline-block text-[11px] uppercase tracking-[0.2em] text-crimson transition-colors hover:text-white"
                >
                  Book Now &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY A&B ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Why Avery & Bryant
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            People hire people.{" "}
            <span className="text-white-40">Look the part.</span>
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {sellingPoints.map((point) => (
              <div key={point.title} className="flex gap-6">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-crimson" />
                <div>
                  <h3 className="font-display text-lg font-medium text-white-90">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/40">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            How It Works
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Three steps.{" "}
            <span className="text-white-40">That&apos;s it.</span>
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 transition-all duration-500 hover:border-crimson/20"
              >
                <span className="font-display text-4xl font-extralight text-crimson/30">
                  {step.number}
                </span>
                <h3 className="mt-4 font-display text-lg font-medium text-white-90">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/40">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-white/30">
            Serving Arkansas agents and businesses since 2018.
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
            Ready to level up your brand?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/40 md:text-lg">
            Book a session in under 2 minutes. Professional branding that sets you apart from every other agent.
          </p>
          <div className="mt-10">
            <Link
              href="/book"
              className="inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Book a Session
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
