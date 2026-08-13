import { HeroAirbnbRentals } from "@/components/heroes/hero-airbnb-rentals";
import { OrderLink } from "@/components/order-link";
import { ConsultCTA } from "@/components/consult-cta";
import { FaqSection } from "@/components/faq-section";
import { PackageCard } from "@/components/pricing/package-card";
import { AddOnsGrid } from "@/components/pricing/add-ons-grid";
import { GuaranteeBadge } from "@/components/pricing/guarantee-badge";
import { airbnbPricing } from "@/lib/pricing";

export const metadata = {
  alternates: { canonical: "/airbnb-rentals" },
  title:
    "Airbnb & Rental Media — Revenue Ready Kit, Boost System & 5-Star Showcase | Avery & Bryant",
  description:
    "Professional photography, video tours, drone, and twilight media for Airbnb and short-term rental properties across Arkansas. Packages from $449 with a satisfaction reshoot guarantee.",
};

const sellingPoints = [
  {
    title: "More Bookings, Proven",
    description:
      "Airbnb's own 2024–25 study of 14,700+ listings found professional photography drove ~19% more bookings and ~21% higher host earnings over the following year.",
  },
  {
    title: "Amenity Showcase",
    description:
      "We highlight the details guests search for — hot tubs, kitchens, outdoor spaces, unique decor, and views.",
  },
  {
    title: "Interior Styling Guidance",
    description:
      "We advise on simple staging tweaks that photograph well and help your listing compete at higher nightly rates.",
  },
  {
    title: "Fast Turnaround",
    description:
      "Photos delivered within 48 hours. Your listing goes live faster, and you start earning sooner.",
  },
];

const steps = [
  {
    number: "01",
    title: "Book Online",
    description: "Pick your date and services in under 2 minutes.",
  },
  {
    number: "02",
    title: "We Shoot",
    description: "Our team arrives on time and captures everything.",
  },
  {
    number: "03",
    title: "Get Your Media",
    description: "Edited photos and video delivered within 48 hours.",
  },
];

const faqs = [
  {
    question: "How much does Airbnb photography cost in Arkansas?",
    answer:
      "Pricing depends on the size of the property and the package you choose. Every package and add-on is listed on this page, and you can compare pricing across all property types on our pricing page. You will see your exact total when you book online.",
  },
  {
    question: "How fast do we get our media?",
    answer:
      "Standard delivery is within 48 hours of the shoot, and most rental shoots arrive sooner. Need your listing live for the weekend? Rush delivery is available as an add-on.",
  },
  {
    question:
      "Do you photograph short term rentals in Little Rock and Central Arkansas?",
    answer:
      "Yes. We're based in Little Rock at (501) 502-2925 and cover Central Arkansas, including Little Rock, Benton, Conway, Hot Springs, and surrounding areas.",
  },
  {
    question: "Do you offer drone photos for short term rentals?",
    answer:
      "Yes. Aerial photos and video are available on rental packages, and every flight is operated by an FAA Part 107 certified pilot with full insurance coverage.",
  },
  {
    question:
      "Does professional photography actually increase Airbnb bookings?",
    answer:
      "Airbnb's own study of more than 14,700 listings found that professional photography drove roughly 19 percent more bookings and 21 percent higher host earnings over the following year. That is why booking-optimized photography is the core of every rental package we offer.",
  },
  {
    question: "What if I am not happy with the photos?",
    answer:
      "Every shoot is backed by our Satisfaction Reshoot Guarantee. Report an issue with our work within 7 days of delivery and we will reshoot it free.",
  },
];

export default function AirbnbRentalsPage() {
  const { packages, addOns, guarantee } = airbnbPricing;

  return (
    <>
      <HeroAirbnbRentals />

      {/* ── PACKAGES ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Packages
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Everything your rental needs.{" "}
            <span className="text-fg-secondary">One shoot.</span>
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} vertical="airbnb-rentals" />
            ))}
          </div>

          <div className="mt-12">
            <GuaranteeBadge guarantee={guarantee} />
          </div>
        </div>
      </section>

      {/* ── À LA CARTE ── */}
      <AddOnsGrid addOns={addOns} vertical="airbnb-rentals" />

      {/* ── WHY A&B ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Why Avery & Bryant
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Your listing is your storefront.{" "}
            <span className="text-fg-secondary">Make it count.</span>
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {sellingPoints.map((point) => (
              <div key={point.title} className="flex gap-6">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-crimson" />
                <div>
                  <h3 className="font-display text-lg font-medium text-fg">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
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
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Three steps. <span className="text-fg-secondary">That&apos;s it.</span>
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 transition-all duration-500 hover:border-crimson/20"
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

          <p className="mt-12 text-center text-sm text-fg-secondary">
            Serving Arkansas short-term rental hosts.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FaqSection faqs={faqs} />

      <ConsultCTA
        interest="airbnb-rentals"
        headline="Running multiple rentals or a whole portfolio?"
        subhead="One property is easy — ten is a content program. Free 30-min call to talk batch shoots, seasonal refreshes, and recurring rates."
      />

      {/* ── CTA ── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12 md:py-32">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Get Started
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Ready to fill your calendar?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-fg-secondary md:text-lg">
            Book a shoot in under 2 minutes. Professional media that pays for
            itself in one booking.
          </p>
          <div className="mt-10">
            <OrderLink
              vertical="airbnb-rentals"
              className="inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Book Now
            </OrderLink>
          </div>
        </div>
      </section>
    </>
  );
}
