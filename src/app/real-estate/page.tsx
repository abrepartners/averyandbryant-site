import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/hero";

export const metadata = {
  title:
    "Real Estate Photography & Video | Little Rock & NW Arkansas | Avery & Bryant",
  description:
    "Professional real estate photography, video tours, drone, twilight, and virtual staging in Arkansas. Starting at $162. Book online in under 2 minutes.",
};

const services = [
  {
    title: "Photos",
    price: "$162",
    unit: "",
    features: [
      "Professional HDR interior & exterior",
      "Varies by location",
      "24-48 hour turnaround",
      "MLS-ready delivery via Aryeo",
    ],
  },
  {
    title: "Twilight Photography",
    price: "$60",
    unit: "",
    features: [
      "Virtual day-to-dusk conversion",
      "Created from daytime photos (no separate appointment)",
      "Dramatic curb appeal",
    ],
  },
  {
    title: "Drone / Aerial",
    price: "$80",
    unit: "",
    features: [
      "6 aerial photos",
      "FAA-licensed pilots",
      "Showcases land, views, neighborhood",
    ],
  },
  {
    title: "Video Tours",
    price: "$250",
    unit: "",
    features: [
      "Cinematic walkthrough",
      "Smooth motion, ambient music",
      "Professional color grading",
    ],
  },
  {
    title: "3D Virtual Tours",
    price: "$150",
    unit: "",
    features: [
      "Interactive walkthrough",
      "Buyers explore every room remotely",
    ],
  },
  {
    title: "Virtual Staging",
    price: "$25",
    unit: "/room",
    features: [
      "AI-powered by StudioAI",
      "12+ design styles",
      "Photorealistic output",
    ],
  },
];

const portfolioImages = [
  { src: "/images/hero-drone.jpg", alt: "Aerial drone shot of residential property" },
  { src: "/images/hero-drone-2.jpg", alt: "Aerial view of neighborhood and lot" },
  { src: "/images/staging-twilight.jpg", alt: "Twilight exterior photography" },
  { src: "/images/staging-interior.jpg", alt: "Professional interior HDR photography" },
];

const steps = [
  {
    number: "01",
    title: "Book Online",
    description: "Schedule in under 2 minutes. Pick your date, services, and property details.",
  },
  {
    number: "02",
    title: "We Shoot",
    description: "On time, every time. Our team captures your listing with professional gear and technique.",
  },
  {
    number: "03",
    title: "Get Your Media",
    description: "24-48 hour delivery via Aryeo. MLS-ready photos, video, and tours in your inbox.",
  },
];

export default function RealEstatePage() {
  return (
    <>
      {/* HERO */}
      <Hero
        tag="Listing Media Services"
        title="Sell listings faster"
        titleAccent="with premium media."
        subtitle="Professional HDR photography, cinematic video tours, aerial drone, twilight exteriors, 3D tours, and virtual staging. Serving Central & Northwest Arkansas since 2018."
        primaryCta={{ label: "Book a Shoot", href: "/book" }}
        secondaryCta={{
          label: "View Portfolio",
          href: "https://homes.averyandbryant.com",
        }}
        backgroundImage="/images/hero-drone-2.jpg"
      />

      {/* SERVICES & PRICING */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            What&apos;s Included
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-extralight tracking-tight text-white-90">
            Services &amp; Pricing
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white-40">
            Everything your listing needs to stand out. Bundle services at
            booking for the best value.
          </p>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="group flex flex-col rounded border border-border bg-card p-8 transition-all duration-500 hover:border-crimson/20 hover:bg-[rgba(17,17,17,0.8)] md:p-10"
              >
                <h3 className="font-display text-lg font-medium text-white-90">
                  {service.title}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white-40">
                    Starting at
                  </span>
                </div>
                <div className="mt-1 flex items-baseline gap-0.5">
                  <span className="font-display text-4xl font-extralight tracking-tight text-crimson">
                    {service.price}
                  </span>
                  {service.unit && (
                    <span className="text-sm text-white-40">{service.unit}</span>
                  )}
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-relaxed text-white-50"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-crimson/40" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/book"
                  className="mt-8 inline-block rounded border border-crimson/30 bg-crimson/5 px-6 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-crimson transition-all hover:bg-crimson hover:text-white"
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SHOWCASE */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Portfolio
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-extralight tracking-tight text-white-90">
            Recent Work
          </h2>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {portfolioImages.map((img) => (
              <div
                key={img.src}
                className="group relative aspect-[16/10] overflow-hidden rounded border border-border"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="https://homes.averyandbryant.com"
              className="inline-block rounded border border-white/10 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white-60 transition-all hover:border-white/30 hover:text-white"
            >
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            The Process
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-extralight tracking-tight text-white-90">
            How It Works
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <span className="font-mono text-5xl font-extralight text-crimson/15">
                  {step.number}
                </span>
                <h3 className="mt-2 font-display text-xl font-medium text-white-90">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white-40">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST / SOCIAL PROOF */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Trusted Across Arkansas
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white-50 md:text-lg">
            Trusted by Coldwell Banker, Century 21, Keller Williams,
            Crye-Leike, and independent agents across Arkansas.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white-30">
                Little Rock
              </p>
              <a
                href="tel:5015022925"
                className="mt-2 block font-display text-lg font-medium text-white-70 transition-colors hover:text-crimson"
              >
                (501) 502-2925
              </a>
            </div>
            <div className="hidden h-8 w-px bg-border sm:block" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white-30">
                NW Arkansas
              </p>
              <a
                href="tel:4793645502"
                className="mt-2 block font-display text-lg font-medium text-white-70 transition-colors hover:text-crimson"
              >
                (479) 364-5502
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 text-center md:px-12">
          <h2 className="font-display text-[clamp(28px,5vw,48px)] font-extralight tracking-tight text-white-90">
            Ready to book?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white-40 md:text-lg">
            Book a shoot in under 2 minutes.
          </p>
          <div className="mt-10">
            <Link
              href="/book"
              className="inline-block rounded bg-crimson px-10 py-4 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
