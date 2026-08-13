import Link from "next/link";
import Image from "next/image";
import { HeroBranding } from "@/components/heroes/hero-branding";
import { ConsultCTA } from "@/components/consult-cta";
import { FaqSection } from "@/components/faq-section";
import { PackageCard } from "@/components/pricing/package-card";
import { GuaranteeBadge } from "@/components/pricing/guarantee-badge";
import {
  brandingPackages,
  brandingTeamPackages,
  brandingGuarantee,
} from "@/lib/pricing";

export const metadata = {
  alternates: { canonical: "/branding" },
  title:
    "Branding & Headshots — First Impression Kit, Brand Identity System & Content Command | Avery & Bryant",
  description:
    "Professional headshots, lifestyle branding, team photos, and content creation for real estate agents and businesses across Arkansas. Packages from $299 with compliment guarantee.",
};

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
  {
    number: "01",
    title: "Book Online",
    description: "Pick your date and session type in under 2 minutes.",
  },
  {
    number: "02",
    title: "We Shoot",
    description: "Relaxed, guided session — we handle the posing and lighting.",
  },
  {
    number: "03",
    title: "Get Your Media",
    description: "Retouched images delivered within 48 hours.",
  },
];

const reelThumbs = [
  "/images/portfolio-headshot-1.jpg",
  "/images/staging-twilight.jpg",
  "/images/portfolio-interior-1.jpg",
  "/images/portfolio-headshot-2.jpg",
  "/images/showcase-staging-after.jpg",
  "/images/portfolio-twilight-2.jpg",
  "/images/thomas-headshot.jpg",
  "/images/portfolio-interior-2.jpg",
  "/images/showcase-dusk-after.jpg",
  "/images/staging-interior.jpg",
];

const faqs = [
  {
    question: "How much do professional headshots cost in Arkansas?",
    answer:
      "It depends on whether you need a quick headshot refresh, a full brand session, or a recurring content day. Every individual and team package is listed on this page, and you can compare across services on our pricing page.",
  },
  {
    question: "How fast do we get our media?",
    answer:
      "Retouched images are delivered within 48 hours of your session, formatted and ready to post.",
  },
  {
    question:
      "Do you shoot branding sessions in Little Rock and Central Arkansas?",
    answer:
      "Yes. We're based in Little Rock at (501) 502-2925 and cover Central Arkansas, including Little Rock, Benton, Conway, Hot Springs, and surrounding areas.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes. Avery & Bryant carries full insurance coverage, holds an A+ rating with the Better Business Bureau, and our drone pilots are FAA Part 107 certified for any session that calls for aerial footage.",
  },
  {
    question: "What is included in an agent branding session?",
    answer:
      "Professional headshots, lifestyle brand content that shows you doing what you do best, and social media assets formatted for Instagram, Facebook, LinkedIn, and your website. More than 200 Arkansas agents have trusted us with their image.",
  },
  {
    question: "What if I am not happy with my photos?",
    answer:
      "Every session is backed by our Satisfaction Reshoot Guarantee. Report an issue with our work within 7 days of delivery and we will reshoot it free.",
  },
];

export default function BrandingPage() {
  return (
    <>
      <HeroBranding />

      {/* ── REEL MARQUEE ── */}
      <section className="relative border-t border-white/5 bg-[#0a0a0a] py-16 md:py-20">
        <div className="mx-auto mb-10 max-w-[1280px] px-6 md:mb-14 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            What a content day produces
          </p>
          <h2 className="mt-3 font-display text-[clamp(22px,3.5vw,38px)] font-light tracking-tight text-fg">
            One shoot.{" "}
            <span className="text-fg-secondary">A month of content to post.</span>
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent md:w-40"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent md:w-40"
          />

          <div className="reel-marquee flex gap-4 px-6 md:gap-5 md:px-12">
            {reelThumbs.concat(reelThumbs).map((src, i) => (
              <div
                key={i}
                className="relative aspect-[9/16] w-[150px] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#111] md:w-[180px]"
              >
                <Image
                  src={src}
                  alt=""
                  aria-hidden
                  fill
                  sizes="180px"
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2 py-1 backdrop-blur-sm">
                  <span className="h-1 w-1 rounded-full bg-crimson" />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-fg-strong">
                    Reel
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-[1280px] px-6 md:px-12">
          <Link
            href="/book"
            className="text-[11px] uppercase tracking-[0.2em] text-crimson transition-colors hover:text-white"
          >
            Book your content day &rarr;
          </Link>
        </div>

        <style>{`
          .reel-marquee {
            width: max-content;
            animation: reelMarquee 55s linear infinite;
          }
          section:hover .reel-marquee {
            animation-play-state: paused;
          }
          @keyframes reelMarquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          @media (prefers-reduced-motion: reduce) {
            .reel-marquee { animation: none; }
          }
        `}</style>
      </section>

      {/* ── INDIVIDUAL PACKAGES ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Packages
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Your image matters.{" "}
            <span className="text-fg-secondary">Invest in it.</span>
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {brandingPackages.map((pkg) => (
              <PackageCard
                key={pkg.name}
                pkg={pkg}
                ctaHref="/book"
                ctaLabel="Book a Session"
              />
            ))}
          </div>

          <div className="mt-12">
            <GuaranteeBadge guarantee={brandingGuarantee} />
          </div>
        </div>
      </section>

      {/* ── TEAM & RETAINER ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Teams & Ongoing
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Bring the whole team.{" "}
            <span className="text-fg-secondary">Or show up every month.</span>
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {brandingTeamPackages.map((pkg) => (
              <PackageCard
                key={pkg.name}
                pkg={pkg}
                ctaHref="/book"
                ctaLabel="Book a Session"
              />
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
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            People hire people.{" "}
            <span className="text-fg-secondary">Look the part.</span>
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
            Serving Arkansas agents and businesses.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FaqSection faqs={faqs} />

      <ConsultCTA
        interest="branding"
        headline="Personal brand shoot or full brand system?"
        subhead="Headshots are one thing. Brand kits, content days, and ongoing shoots are another. Free 30-min call to figure out what you actually need."
      />

      {/* ── CTA ── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12 md:py-32">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Get Started
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Ready to level up your brand?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-fg-secondary md:text-lg">
            Book a session in under 2 minutes. Professional branding that sets
            you apart from every other agent.
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
