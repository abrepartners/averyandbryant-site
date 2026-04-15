import { Hero } from "@/components/hero";

export const metadata = {
  title: "Book a Consultation | Avery & Bryant",
  description:
    "Schedule a free consultation to discuss your real estate media, AI, or branding needs.",
};

export default function BookPage() {
  return (
    <>
      <Hero
        tag="Let's Talk"
        title="Book a Free Consultation"
        subtitle="Tell us about your project and we'll build a custom plan. No commitment, no pressure."
      />
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-[800px] px-6 text-center md:px-12">
          <p className="text-sm text-white-50">
            Calendar booking widget will be embedded here.
          </p>
          <div className="mt-8 rounded border border-border bg-card p-12">
            <p className="text-white-40">
              GHL Calendar Embed Placeholder
            </p>
            <a
              href="https://go.averyandbryant.com/book"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark"
            >
              Book on Our Calendar
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
