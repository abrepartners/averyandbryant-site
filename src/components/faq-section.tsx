export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Shared FAQ section — visual pattern lifted from /referral and /answr
 * (eyebrow label, display heading, details/summary accordion cards).
 * Renders matching FAQPage JSON-LD from the SAME data array, so the
 * structured data always matches the visible Q&As exactly.
 */
export function FaqSection({
  faqs,
  heading = "Common questions.",
  headingAccent,
}: {
  faqs: FaqItem[];
  heading?: string;
  headingAccent?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="border-t border-white/5 py-24 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
          FAQ
        </p>
        <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
          {heading}
          {headingAccent && (
            <>
              {" "}
              <span className="text-white-40">{headingAccent}</span>
            </>
          )}
        </h2>

        <div className="mt-12 max-w-3xl space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded border border-white/5 bg-[rgba(17,17,17,0.5)] transition-all duration-500 hover:border-crimson/20 [&[open]]:border-crimson/20"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-sm font-medium text-white-90 transition-colors hover:text-white list-none [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span className="shrink-0 text-white-30 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 text-sm leading-relaxed text-white/50">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
