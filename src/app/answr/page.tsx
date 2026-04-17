import Link from "next/link";

export const metadata = {
  title: "Answr | AI Voice & Chat Agents | Avery & Bryant",
  description:
    "AI answering service with Voice AI and Conversation AI. 24/7 call answering, SMS, web chat, lead qualification, and appointment booking.",
};

const products = [
  {
    title: "Voice AI",
    description:
      "Handles inbound calls 24/7. Books appointments, transcribes conversations, and transfers urgent calls to your team instantly.",
  },
  {
    title: "Conversation AI",
    description:
      "SMS, web chat, Facebook, Instagram, and Google Messages in one inbox. Qualifies leads and books appointments automatically.",
  },
  {
    title: "Agent Studio",
    description:
      "Custom agents trained on your business data. Deploy across voice, chat, and social channels with multi-channel intelligence.",
  },
];

const pricingPlans = [
  {
    name: "Conversation AI",
    price: "$147",
    period: "/mo",
    features: [
      "Multi-channel messaging",
      "Lead qualification",
      "Appointment booking",
      "Nurture sequences",
      "Human handoff",
      "Custom voice",
    ],
    featured: false,
  },
  {
    name: "The Full Suite",
    price: "$397",
    period: "/mo",
    savings: "Save $194",
    features: [
      "Everything in Voice + Conversation",
      "Agent Studio",
      "Cross-channel intelligence",
      "Custom training",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Voice AI",
    price: "$197",
    period: "/mo",
    features: [
      "24/7 call answering",
      "Appointment booking",
      "Transcription",
      "Urgent call transfer",
      "Custom voice",
      "Workflow triggers",
    ],
    featured: false,
  },
];

const faqs = [
  {
    question: "How long does setup take?",
    answer:
      "48 hours or less. We handle the entire setup, training, and deployment for you.",
  },
  {
    question: "Can callers tell it's AI?",
    answer:
      "Most can't. Answr uses advanced natural language processing for human-like conversations with natural pacing and tone.",
  },
  {
    question: "What about urgent calls?",
    answer:
      "Answr detects urgency in real time and immediately transfers the call to your team or designated emergency contact.",
  },
  {
    question: "Do I need any technical knowledge?",
    answer:
      "Zero. This is a completely done-for-you service. We build, train, and maintain your AI agents.",
  },
  {
    question: "What if I want to cancel?",
    answer:
      "No contracts, no commitments. Cancel anytime with a single click.",
  },
];

export default function AnswrPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson/5 blur-[150px]" />
        <div className="absolute left-8 top-24 h-20 w-20 border-l border-t border-crimson/20" />
        <div className="absolute bottom-24 right-8 h-20 w-20 border-b border-r border-crimson/20" />

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center md:px-12">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-crimson/30 bg-crimson/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-crimson">
              AI Answering Service
            </span>
          </div>

          <h1 className="font-display text-[clamp(32px,6vw,72px)] font-extralight leading-[1.1] tracking-tight text-white-90">
            Every call answered.
            <br />
            <span className="text-white-40">Every message handled.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white-50 md:text-lg">
            24/7 AI-powered voice and chat agents that answer calls, qualify
            leads, and book appointments while you focus on closing deals.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/book"
              className="inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Start 7 Day Free Trial
            </Link>
            <Link
              href="/book"
              className="inline-block rounded border border-white/10 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white-60 transition-all hover:border-white/30 hover:text-white"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Three Products */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.title}
                className="rounded-lg border border-white/5 bg-card p-8 transition-all hover:border-crimson/20"
              >
                <h3 className="text-lg font-medium text-white-90">
                  {product.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white-50">
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="mb-12 text-center">
            <h2 className="font-display text-[clamp(24px,4vw,48px)] font-extralight tracking-tight text-white-90">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-sm text-white-40">
              All plans include a 7-day free trial. No credit card required.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-lg border p-8 ${
                  plan.featured
                    ? "border-crimson/40 bg-crimson/5"
                    : "border-white/5 bg-card"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-crimson px-3 py-0.5 text-[10px] uppercase tracking-widest text-white">
                    Best Value
                  </div>
                )}
                <h3 className="text-lg font-medium text-white-90">
                  {plan.name}
                </h3>
                <div className="mt-4">
                  <span className="text-4xl font-extralight text-white-90">
                    {plan.price}
                  </span>
                  <span className="text-white-40">{plan.period}</span>
                </div>
                {plan.savings && (
                  <p className="mt-1 text-xs text-crimson">{plan.savings}</p>
                )}
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-white-50"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/book"
                  className={`mt-8 block w-full rounded py-3 text-center text-[11px] uppercase tracking-[0.2em] transition-all ${
                    plan.featured
                      ? "bg-crimson text-white hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
                      : "border border-white/10 text-white-60 hover:border-white/30 hover:text-white"
                  }`}
                >
                  Start Free Trial
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-[800px] px-6 md:px-12">
          <div className="mb-12 text-center">
            <h2 className="font-display text-[clamp(24px,4vw,48px)] font-extralight tracking-tight text-white-90">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-lg border border-white/5 bg-card"
              >
                <summary className="cursor-pointer px-6 py-4 text-sm font-medium text-white-90 transition-colors hover:text-crimson [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between">
                    {faq.question}
                    <span className="ml-4 text-white-30 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <div className="px-6 pb-4 text-sm leading-relaxed text-white-50">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center md:px-12">
          <h2 className="font-display text-[clamp(24px,4vw,48px)] font-extralight tracking-tight text-white-90">
            Stop losing leads to your voicemail.
          </h2>
          <Link
            href="/book"
            className="mt-8 inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
          >
            Start Free Trial
          </Link>
        </div>
      </section>
    </>
  );
}
