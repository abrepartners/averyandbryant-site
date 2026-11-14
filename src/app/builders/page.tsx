import { FaqSection } from "@/components/faq-section";
import { buildersPricing } from "@/lib/pricing";
import { consultUrl } from "@/lib/consult";
import { PlanToSold } from "@/components/builders/plan-to-sold";
import { CarryCalculator } from "@/components/builders/carry-calculator";
import { ProofSlots } from "@/components/builders/proof-slots";
import { StagePackages } from "@/components/builders/stage-packages";
import { OfferTerms, SpecReview } from "@/components/builders/offer-terms";
import { StickyCta } from "@/components/builders/sticky-cta";

export const metadata = {
  alternates: { canonical: "/builders" },
  title:
    "Builder & Construction Media: Build Tracker, Marketing System & Model Home Launch | Avery & Bryant",
  description:
    "Professional photography, drone aerials, and video tours for builders, construction projects, and model homes across Arkansas. Finished-home packages from $1,395; monthly progress documentation from $325 per month, set up on a call.",
};

const faqs = [
  {
    question: "When in the build should we start?",
    answer:
      "As early as the foundation. Build Tracker is a monthly program that documents the home from the first pour, and it is set up on a free 30 minute call. If the home is already finished, Builder Marketing System covers it in one shoot.",
  },
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

/** "$1,395" to 1395. */
function dollars(price: string) {
  return Number(price.replace(/[^0-9.]/g, ""));
}

export default function BuildersPage() {
  const { packages, guarantee } = buildersPricing;
  const consultHref = consultUrl("builders");
  // The finished-home package the calculator weighs the carry against.
  const launch = packages.find((p) => p.recommended) ?? packages[1];

  return (
    <div data-page="builders">
      <PlanToSold consultHref={consultHref} />

      <CarryCalculator
        packageName={launch.name}
        packagePrice={dollars(launch.price)}
      />

      <ProofSlots />

      <StagePackages packages={packages} />

      <OfferTerms guarantee={guarantee} />

      <SpecReview />

      <FaqSection faqs={faqs} heading="Straight answers." />

      {/* ── CLOSE ── */}
      <section id="builders-close" className="border-t border-white/5">
        <div className="mx-auto max-w-[1280px] px-6 py-28 md:px-12 md:py-40">
          <div className="inline-flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-crimson" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-fg-strong">
              Next step
            </span>
          </div>
          <h2 className="mt-5 max-w-[14ch] font-display text-[clamp(40px,8vw,96px)] font-light leading-[1] tracking-[-0.035em] text-fg">
            What is the next home on your schedule?
          </h2>
          <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-fg-strong md:text-lg">
            Bring the address and the stage. In 30 minutes you will know what
            to shoot, when, and what it costs.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={consultHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center rounded bg-crimson px-9 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Book a builder call
            </a>
            <a
              href="#packages"
              className="inline-flex min-h-[52px] items-center justify-center rounded border border-white/15 px-9 text-[11px] font-medium uppercase tracking-[0.2em] text-fg transition-colors duration-300 hover:border-white/40"
            >
              Pick a package
            </a>
            <a
              href="tel:+15015022925"
              className="inline-flex min-h-[44px] items-center justify-center px-2 text-sm text-fg-strong transition-colors hover:text-white sm:ml-3"
            >
              or call (501) 502-2925
            </a>
          </div>
        </div>
      </section>

      <StickyCta consultHref={consultHref} />
    </div>
  );
}
