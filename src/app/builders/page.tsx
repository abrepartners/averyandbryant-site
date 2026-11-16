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
  builderFaqs,
  dollars,
} from "@/components/builders/page-shared";

/**
 * The builders page follows the build: blueprint, lot, foundation, framing,
 * rough-in, finished, sold. Each stage in the film names what we shoot there
 * and the package that covers it; the sections after the film stay in that
 * order.
 */
export const metadata = {
  alternates: { canonical: "/builders" },
  title:
    "Builder & Construction Media: Build Tracker, Marketing System & Model Home Launch | Avery & Bryant",
  description:
    "Professional photography, drone aerials, and video tours for builders, construction projects, and model homes across Arkansas. Finished-home packages from $1,395; monthly progress documentation from $325 per month, set up on a call.",
};

export default function BuildersPage() {
  const { packages, guarantee } = buildersPricing;
  const consultHref = consultUrl("builders");
  // The finished-home package the calculator weighs the carry against.
  const launch = packages.find((p) => p.recommended) ?? packages[1];

  return (
    <div data-page="builders">
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
