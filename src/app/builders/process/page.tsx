import { FaqSection } from "@/components/faq-section";
import { buildersPricing } from "@/lib/pricing";
import { consultUrl } from "@/lib/consult";
import { ProcessFilm } from "@/components/builders/process-film";
import { CarryCalculator } from "@/components/builders/carry-calculator";
import { ProofSlots } from "@/components/builders/proof-slots";
import { PhasePackages } from "@/components/builders/phase-packages";
import { OfferTerms } from "@/components/builders/offer-terms";
import { StickyCta } from "@/components/builders/sticky-cta";
import {
  BuildersClose,
  VersionSwitch,
  builderFaqs,
  dollars,
} from "@/components/builders/page-shared";

/**
 * Cut B of the builders page, for review next to /builders (cut A).
 * The page follows the build: blueprint, lot, foundation, framing, rough-in,
 * finished, sold. Each stage in the film names what we shoot there and the
 * package that covers it; the sections after the film stay in that order.
 * Not indexed while it is a review copy.
 */
export const metadata = {
  alternates: { canonical: "/builders" },
  robots: { index: false, follow: false },
  title: "Builder & Construction Media, process cut | Avery & Bryant",
  description:
    "Review copy of the builders page: the build process from blueprint to sold, with the media captured at each stage.",
};

export default function BuildersProcessPage() {
  const { packages, guarantee } = buildersPricing;
  const consultHref = consultUrl("builders");
  // The finished-home package the calculator weighs the carry against.
  const launch = packages.find((p) => p.recommended) ?? packages[1];

  return (
    <div data-page="builders">
      <VersionSwitch current="b" />

      <ProcessFilm consultHref={consultHref} packages={packages} />

      <CarryCalculator
        packageName={launch.name}
        packagePrice={dollars(launch.price)}
      />

      <ProofSlots />

      <PhasePackages packages={packages} />

      <OfferTerms guarantee={guarantee} />

      <FaqSection faqs={builderFaqs} heading="Straight answers." />

      <BuildersClose consultHref={consultHref} />

      <StickyCta consultHref={consultHref} />
    </div>
  );
}
