import { FaqSection } from "@/components/faq-section";
import { buildersPricing } from "@/lib/pricing";
import { consultUrl } from "@/lib/consult";
import { ProcessFilm } from "@/components/builders/process-film";
import { ProofSlots } from "@/components/builders/proof-slots";
import { BuilderOffers } from "@/components/builders/builder-offers";
import { OfferTerms } from "@/components/builders/offer-terms";
import { StickyCta } from "@/components/builders/sticky-cta";
import {
  BuildersClose,
  builderFaqs,
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
    "Photography, film and build documentation that show Central Arkansas what your company can build. Marketing shoots from $185, progress visits, builder films and finished-home packages from $1,395. Answer a few questions for a price range, or book a call.",
};

export default function BuildersPage() {
  const { packages, guarantee } = buildersPricing;
  const consultHref = consultUrl("builders");

  return (
    <div data-page="builders">
      <ProcessFilm consultHref={consultHref} packages={packages} />

      <ProofSlots />

      {/* The carry calculator was taken off this page on 2026-11-16: it argues
          for selling one house faster, and this page is about being known for
          the work. The component is still in the folder. */}
      <BuilderOffers packages={packages} consultHref={consultHref} />

      <OfferTerms guarantee={guarantee} />

      <FaqSection faqs={builderFaqs} heading="Straight answers." />

      <BuildersClose consultHref={consultHref} />

      <StickyCta consultHref={consultHref} />
    </div>
  );
}
