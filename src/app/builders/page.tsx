import Image from "next/image";
import { HeroBuilders } from "@/components/heroes/hero-builders";
import { RevealImage } from "@/components/reveal-image";
import { Eyebrow } from "@/components/eyebrow";
import { OrderLink } from "@/components/order-link";
import { ConsultCTA } from "@/components/consult-cta";
import { FaqSection } from "@/components/faq-section";
import { PackageCard } from "@/components/pricing/package-card";
import { AddOnsGrid } from "@/components/pricing/add-ons-grid";
import { GuaranteeBadge } from "@/components/pricing/guarantee-badge";
import { buildersPricing } from "@/lib/pricing";

export const metadata = {
  alternates: { canonical: "/builders" },
  title:
    "Builder & Construction Media: Build Tracker, Marketing System & Model Home Launch | Avery & Bryant",
  description:
    "Professional photography, drone aerials, and video tours for builders, construction projects, and model homes across Arkansas. Finished-home packages from $1,395; monthly progress documentation from $325 per month, set up on a call.",
};

const leadFrames = [
  {
    src: "/images/builders/little-rock-front-exterior-2.jpg",
    alt: "Stone and brick French country home in Little Rock, Arkansas, photographed in bright daylight under a blue sky, with finished beds, a green lawn and a curved concrete driveway",
  },
  {
    src: "/images/builders/little-rock-front-exterior-3.jpg",
    alt: "Finished brick and stone front elevation of a new construction home in Little Rock, Arkansas, with fresh sod, a young staked tree and a brown double garage door",
  },
];

const buildGallery = [
  {
    src: "/images/builders/little-rock-kitchen-2.jpg",
    alt: "Kitchen with marble counters and backsplash, a wood island and a wood clad range hood in a new construction home in Little Rock, Arkansas",
  },
  {
    src: "/images/builders/bryant-front-exterior.jpg",
    alt: "Board and batten farmhouse front elevation with a brick columned porch in Bryant, Arkansas",
  },
  {
    src: "/images/builders/bryant-kitchen.jpg",
    alt: "White oak kitchen with black windows in a new construction home in Bryant, Arkansas",
  },
  {
    src: "/images/builders/little-rock-front-exterior.jpg",
    alt: "Modern white brick front elevation with black windows on a new construction home in Little Rock, Arkansas",
  },
  {
    src: "/images/builders/little-rock-kitchen.jpg",
    alt: "Kitchen island with shaker drawer fronts opening to a great room with a linear fireplace in a new construction home in Little Rock, Arkansas",
  },
  {
    src: "/images/builders/benton-front-exterior.jpg",
    alt: "Acadian brick front elevation with dormers on a new construction home in Benton, Arkansas",
  },
  {
    src: "/images/builders/cabot-kitchen.jpg",
    alt: "Kitchen island with a sink, sage green cabinets and a veined stone backsplash in a new construction home in Cabot, Arkansas",
  },
  {
    src: "/images/builders/little-rock-closet.jpg",
    alt: "Walk in closet with white built in shelving, hanging rods and a stone topped island in a new construction home in Little Rock, Arkansas",
  },
  {
    src: "/images/builders/benton-pantry.jpg",
    alt: "Walk in pantry with white shelving and a stone counter in a new construction home in Benton, Arkansas",
  },
  {
    src: "/images/builders/cabot-front-exterior.jpg",
    alt: "Front elevation of a new construction home in Cabot, Arkansas, photographed in bright daylight, with a wide concrete driveway running up to the garage",
  },
  {
    src: "/images/builders/bryant-aerial.jpg",
    alt: "Aerial photo of a new construction home on a wooded lot in Bryant, Arkansas",
  },
  {
    src: "/images/builders/little-rock-development-aerial.jpg",
    alt: "Aerial photo of a residential development under construction in Little Rock, Arkansas, with graded lots beside a street of finished homes",
  },
];

const stages = [
  { n: "01", title: "Foundation", line: "Slab, framing and site work on the record from day one." },
  { n: "02", title: "Vertical build", line: "Structure, systems and finishes, phase by phase." },
  { n: "03", title: "Model launch", line: "Finished photos, drone and video to sell the result." },
];

const sellingPoints = [
  {
    title: "Construction Progress Tracking",
    description:
      "Consistent photo documentation at every stage. Use it for investor updates, warranty records, and marketing content.",
  },
  {
    title: "Model Home Marketing",
    description:
      "We shoot your model homes like luxury listings, because that is how buyers shop. Premium media that justifies premium pricing.",
  },
  {
    title: "Development Aerial Overviews",
    description:
      "Drone photography and video that show the full scope of your development: completed lots, infrastructure, and available parcels.",
  },
  {
    title: "Consistent Brand Quality",
    description:
      "Every home you build gets the same premium media treatment. Your brand looks professional from listing to listing.",
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
    description: "Our team arrives on site and captures everything.",
  },
  {
    number: "03",
    title: "Get Your Media",
    description: "Edited photos and video delivered within 48 hours.",
  },
];

const faqs = [
  {
    question: "How much does builder photography cost in Arkansas?",
    answer:
      "It depends on the scope. One-time model home shoots and monthly progress documentation are priced differently, so every builder package is listed on this page and you can compare across property types on our pricing page.",
  },
  {
    question: "How fast do we get our media?",
    answer:
      "Standard delivery is within 48 hours of the shoot. If a model home launch or investor meeting is on the calendar, rush delivery is available.",
  },
  {
    question: "Do you work with builders in Little Rock and Central Arkansas?",
    answer:
      "Yes. We're based in Little Rock at (501) 502-2925 and cover Central Arkansas, including Little Rock, Benton, Conway, Hot Springs, and surrounding areas. Builders working multiple communities get the same team and standard on every project.",
  },
  {
    question: "Are your drone pilots licensed for development aerials?",
    answer:
      "Yes. Every flight is operated by an FAA Part 107 certified pilot with full insurance coverage, so development overviews, lot inventory aerials, and progress flyovers are all handled by the book.",
  },
  {
    question: "Can you document construction progress every month?",
    answer:
      "Yes. Our Build Tracker program provides consistent photo documentation at every stage of construction. Builders use it for investor updates, warranty records, and marketing content.",
  },
  {
    question: "What if we are not happy with the media?",
    answer:
      "Every shoot is backed by our Satisfaction Reshoot Guarantee. Report an issue with our work within 7 days of delivery and we will reshoot it free.",
  },
];

export default function BuildersPage() {
  const { packages, addOns, guarantee } = buildersPricing;

  return (
    <>
      <HeroBuilders />

      {/* ── EVERY STAGE (REVEAL) ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <Eyebrow>Every stage</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            From graded lot to finished street.
          </h2>
          <div className="mt-12">
            <RevealImage
              src="/images/builders/little-rock-development-aerial.jpg"
              alt="Drone photo of a new residential development in Little Rock, Arkansas, with graded lots beside a street of finished homes"
            />
          </div>
          <ol className="mt-12 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-3">
            {stages.map((s) => (
              <li key={s.n}>
                <span className="font-mono text-xs text-fg-muted">{s.n}</span>
                <p className="mt-2 font-display text-xl font-light text-fg">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-secondary">{s.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── RECENT BUILDS (REAL DELIVERED WORK) ── */}
      <section className="border-b border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Recent Builds
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Homes we have already shot.{" "}
            <span className="text-fg-secondary">
              Real Arkansas builders, real deliveries.
            </span>
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {leadFrames.map((frame) => (
              <figure key={frame.src}>
                <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-white/5 bg-[#111]">
                  <Image
                    src={frame.src}
                    alt={frame.alt}
                    fill
                    sizes="(min-width: 768px) 600px, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </figure>
            ))}
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {buildGallery.map((shot) => (
              <figure key={shot.src}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/5 bg-[#111]">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Packages
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            From foundation to finished.{" "}
            <span className="text-fg-secondary">We cover every stage.</span>
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} vertical="builders" />
            ))}
          </div>

          <div className="mt-12">
            <GuaranteeBadge guarantee={guarantee} />
          </div>
        </div>
      </section>

      {/* ── À LA CARTE ── */}
      <AddOnsGrid addOns={addOns} vertical="builders" />

      {/* ── WHY A&B ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Why Avery & Bryant
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            You build great homes.{" "}
            <span className="text-fg-secondary">We make sure people see them.</span>
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
            Serving Arkansas builders and developers.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FaqSection faqs={faqs} />

      <ConsultCTA
        interest="builders"
        headline="Building a development, not just one home?"
        subhead="Single-build vs. progress program vs. full dev portfolio: each scopes differently. Free 30-min call to map what you actually need."
      />

      {/* ── CTA ── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12 md:py-32">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Get Started
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Ready to showcase your work?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-fg-secondary md:text-lg">
            Book a shoot in under 2 minutes. Professional media that sells homes
            before the sign goes up.
          </p>
          <div className="mt-10">
            <OrderLink
              vertical="builders"
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
