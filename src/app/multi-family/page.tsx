import Image from "next/image";
import { HeroMultiFamily } from "@/components/heroes/hero-multi-family";
import { OrderLink } from "@/components/order-link";
import { ConsultCTA } from "@/components/consult-cta";
import { FaqSection } from "@/components/faq-section";
import { PackageCard } from "@/components/pricing/package-card";
import { AddOnsGrid } from "@/components/pricing/add-ons-grid";
import { GuaranteeBadge } from "@/components/pricing/guarantee-badge";
import { multiFamilyPricing } from "@/lib/pricing";
import { consultUrl } from "@/lib/consult";

export const metadata = {
  alternates: { canonical: "/multi-family" },
  title:
    "Multi-Family & Apartment Media: Leasing Launch Kit, Property Command & Domination Suite | Avery & Bryant",
  description:
    "Professional photography, drone aerials, video tours, and virtual staging for apartment complexes and multi-family properties across Arkansas. Community sets from $295 plus model units from $165, sized to your square footage; packages from $995.",
};

const sellingPoints = [
  {
    title: "Model Unit Showcase",
    description:
      "We photograph your best unit like it's a luxury listing, because to your next tenant, it is.",
  },
  {
    title: "Amenity Photography",
    description:
      "Pool, gym, dog park, clubhouse, laundry: every amenity gets dedicated coverage that sells the lifestyle.",
  },
  {
    title: "Aerial Complex Overview",
    description:
      "Drone shots that show the full property, proximity to highways, shopping, and schools. Context matters.",
  },
  {
    title: "Leasing-Ready Assets",
    description:
      "Every photo and video is formatted for ILS platforms, your website, social media, and print collateral.",
  },
];

const steps = [
  {
    number: "01",
    title: "Scope or Book",
    description:
      "Packages book online. One-off community and unit photography is sized to your square footage on a free call.",
  },
  {
    number: "02",
    title: "We Shoot",
    description:
      "Our team coordinates model unit and amenity access with your leasing office and captures everything in one visit.",
  },
  {
    number: "03",
    title: "Get Your Media",
    description: "Edited photos and video delivered within 48 hours.",
  },
];

const faqs = [
  {
    question: "How much does apartment photography cost in Arkansas?",
    answer:
      "One-off photography is sized to your square footage: community sets (exteriors, grounds, leasing office, amenities) start at $295 and each model unit starts at $165, and a free call produces the exact number. The one-time packages on this page are fixed prices. Ongoing monthly content is a program option, quoted on a call.",
  },
  {
    question: "How fast do we get our media?",
    answer:
      "Standard delivery is within 48 hours of the shoot. If your leasing team is working against a launch date, rush delivery is available.",
  },
  {
    question: "Do you serve Little Rock and Central Arkansas?",
    answer:
      "Yes. We're based in Little Rock at (501) 502-2925 and cover Central Arkansas, including Little Rock, Benton, Conway, Hot Springs, and surrounding areas.",
  },
  {
    question: "Can you fly drones over our apartment community?",
    answer:
      "Yes. Every aerial shoot is flown by an FAA Part 107 certified pilot with full insurance coverage, so campus overviews and amenity aerials are handled professionally and by the book.",
  },
  {
    question: "Do you photograph model units and amenities?",
    answer:
      "Yes. We shoot your model unit like a luxury listing and give every amenity dedicated coverage, from the pool to the clubhouse. Every asset is formatted for ILS platforms, your website, social media, and print.",
  },
  {
    question: "What if we are not happy with the media?",
    answer:
      "Every shoot is backed by our Satisfaction Reshoot Guarantee. Report an issue with our work within 7 days of delivery and we will reshoot it free.",
  },
];

// Real frames from a finished drone video we delivered for an Arkansas apartment
// community. Every caption and alt line below was written against the pixels,
// not the filename. Two frames, not four: the clip is one continuous push-in, so
// the middle frames were near duplicates that read identically at tile size. What
// is left is the high establishing shot and the low architectural shot.
const communityAerials = [
  {
    src: "/images/multi-family/parham-pointe-apartments-aerial-community-scale.jpg",
    alt: "High aerial over an Arkansas apartment community of three story buildings ringed by green tree canopy, with an interstate and a city skyline beyond",
    caption: "Community aerial, Arkansas",
  },
  {
    src: "/images/multi-family/parham-pointe-apartments-aerial-arched-breezeway.jpg",
    alt: "Low aerial of one Arkansas apartment building with white arched breezeways across its face, a curving drive and parked cars at left",
    caption: "Low aerial, building detail",
  },
];

export default function MultiFamilyPage() {
  const { packages, addOns, guarantee } = multiFamilyPricing;

  return (
    <>
      <HeroMultiFamily />

      {/* ── COMMUNITY PORTFOLIO (REAL DELIVERED WORK) ── */}
      <section className="border-b border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Community Portfolio
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Real communities.{" "}
            <span className="text-fg-secondary">Shot from the air.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-secondary">
            Aerial frames from a finished drone video we delivered for an
            Arkansas apartment community. Scale, site layout, and what sits
            around the property, in the shots a leasing team actually uses.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {communityAerials.map((shot) => (
              <figure key={shot.src}>
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-white/5 bg-[#111]">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-[10px] uppercase tracking-[0.2em] text-fg-secondary">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── ONE-OFF PHOTOGRAPHY, SIZED TO SQUARE FOOTAGE ── */}
      <section className="border-b border-white/5 py-20 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="grid items-center gap-8 rounded-lg border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 md:grid-cols-[1.4fr_auto] md:p-12">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
                Just need photos?
              </p>
              <h2 className="mt-4 font-display text-[clamp(24px,4vw,36px)] font-light tracking-tight text-fg">
                Community sets from $295 plus model units from $165, sized to
                your square footage.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-secondary">
                Exteriors, grounds, leasing office and amenities are one part;
                each model unit interior is the other. A free 30-minute call
                sizes both to your property and produces the exact quote.
              </p>
            </div>
            <a
              href={consultUrl("multi-family")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center rounded bg-crimson px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)] md:justify-self-end"
            >
              Book a free 30-min call
            </a>
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            One-time packages
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Media built for leasing teams.{" "}
            <span className="text-fg-secondary">Not just agents.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg-secondary">
            Each package is a one-time shoot at a fixed price. Ongoing monthly
            content and annual refreshes are program options, quoted on a call.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} vertical="multi-family" />
            ))}
          </div>

          <div className="mt-12">
            <GuaranteeBadge guarantee={guarantee} />
          </div>
        </div>
      </section>

      {/* ── À LA CARTE ── */}
      <AddOnsGrid addOns={addOns} vertical="multi-family" />

      {/* ── WHY A&B ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Why Avery & Bryant
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Your property is the product.{" "}
            <span className="text-fg-secondary">Market it like one.</span>
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
            Serving Arkansas property managers and leasing teams.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FaqSection faqs={faqs} />

      <ConsultCTA
        interest="multi-family"
        headline="Planning a lease-up or refresh?"
        subhead="Multi-family scope varies a lot by property size, amenity count, and timeline. A free 30-minute call right-sizes the shoot, quotes one-off photography by square footage, and covers monthly content programs."
      />

      {/* ── CTA ── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12 md:py-32">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Get Started
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Ready to reduce vacancy rates?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-fg-secondary md:text-lg">
            Book a shoot in under 2 minutes. Professional media that fills units
            faster.
          </p>
          <div className="mt-10">
            <OrderLink
              vertical="multi-family"
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
