import Link from "next/link";
import { Hero } from "@/components/hero";

export const metadata = {
  title: "Airbnb & Rental Property Photography | Arkansas | Avery & Bryant",
  description:
    "Professional photography, video tours, drone, and twilight media for Airbnb and short-term rental properties across Arkansas. More bookings start with better photos.",
};

const services = [
  {
    title: "Photos",
    price: "$162",
    description:
      "Professional HDR photography that highlights every room, amenity, and detail guests care about.",
  },
  {
    title: "Video Tours",
    price: "$250",
    description:
      "Cinematic walkthrough videos that let guests experience your property before they book.",
  },
  {
    title: "Drone / Aerial",
    price: "$80",
    description:
      "Aerial shots showcasing your property's location, outdoor spaces, and surrounding area.",
  },
  {
    title: "Twilight Exteriors",
    price: "$60",
    description:
      "Day-to-dusk conversions that make your property glow and stand out in search results.",
  },
];

const sellingPoints = [
  {
    title: "40% More Bookings",
    description:
      "Properties with professional photography consistently see 40% more bookings than those with phone photos.",
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
      "Photos delivered within 24 hours. Your listing goes live faster, and you start earning sooner.",
  },
];

const steps = [
  { number: "01", title: "Book Online", description: "Pick your date and services in under 2 minutes." },
  { number: "02", title: "We Shoot", description: "Our team arrives on time and captures everything." },
  { number: "03", title: "Get Your Media", description: "Edited photos and video delivered within 24 hours." },
];

export default function AirbnbRentalsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <Hero
        tag="Short-Term Rental Media"
        title="More bookings start"
        titleAccent="with better photos."
        subtitle="Professional photography, video tours, drone, and twilight media that turn browsers into guests. Built for Airbnb, VRBO, and short-term rental hosts."
        primaryCta={{ label: "Book Now", href: "/book" }}
        secondaryCta={{ label: "View Portfolio", href: "https://homes.averyandbryant.com", external: true }}
        backgroundImage="/images/portfolio-interior-1.jpg"
      />

      {/* ── SERVICES & PRICING ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Services & Pricing
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Everything your rental needs.{" "}
            <span className="text-white-40">One shoot.</span>
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
            Your listing is your storefront.{" "}
            <span className="text-white-40">Make it count.</span>
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
            Serving Arkansas short-term rental hosts since 2018.
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
            Ready to fill your calendar?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/40 md:text-lg">
            Book a shoot in under 2 minutes. Professional media that pays for itself in one booking.
          </p>
          <div className="mt-10">
            <Link
              href="/book"
              className="inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
