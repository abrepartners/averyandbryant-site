import Link from "next/link";
import type { Metadata } from "next";
import { CalendarEmbed } from "@/components/calendar-embed";
import { BUILDER_CALL } from "@/lib/consult";

/**
 * The builder call: every "Book a builder call" and "Book this shoot" button
 * on the builders page lands here. The page is ours; the calendar inside it
 * is the CRM's. ?for=shoot is sent by the Market Your Build card.
 */
export const metadata: Metadata = {
  title: "Book a Builder Call | Avery & Bryant",
  description:
    "Pick a time to talk through your builds with Avery & Bryant. We ask what you are building, recommend the shoot or plan that fits, and give you a price on the call.",
  alternates: { canonical: "/builders/call" },
  robots: { index: false, follow: true },
};

const STEPS = [
  {
    n: "01",
    title: "You tell us what you are building",
    body: "Custom, spec or a community, how many homes are going up, and what you want the work to do for you.",
  },
  {
    n: "02",
    title: "We recommend the shoot or the plan",
    body: "One shoot, visits through the build, or film with you on camera. You hear which one fits and why.",
  },
  {
    n: "03",
    title: "You leave with a price",
    body: "A real number on the call. If it is one shoot, we set the home and the date before we hang up.",
  },
];

export default async function BuilderCallPage({
  searchParams,
}: {
  searchParams: Promise<{ for?: string }>;
}) {
  const shoot = (await searchParams).for === "shoot";

  return (
    <section data-page="builder-call" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 md:px-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          <Link
            href="/builders"
            className="flex min-h-[44px] w-fit items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-fg-secondary transition-colors duration-200 hover:text-fg"
          >
            <span aria-hidden="true">&larr;</span> Builders
          </Link>

          <div className="mt-4 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-amber-consult" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-amber-consult">
              Builder call, {BUILDER_CALL.minutes} minutes, free
            </span>
          </div>

          <h1 className="mt-5 font-display text-[clamp(32px,6vw,56px)] font-light leading-[1.04] tracking-[-0.025em] text-fg">
            {shoot ? "Book your Market Your Build shoot." : "Tell us what you are building."}
          </h1>
          <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-fg-strong">
            {shoot
              ? "Pick a time below. On a short call we confirm the home, the date and the shots that show your work, then we put the shoot on the calendar."
              : "Pick a time below. It is a short call with the person who plans your shoots, not a sales pitch."}
          </p>
        </div>

        <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="overflow-hidden rounded border border-white/10 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <CalendarEmbed
              calendarId={BUILDER_CALL.id}
              interest={shoot ? "builders-market-your-build" : "builders"}
              title="Pick a time for your builder call"
            />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-fg-secondary">
            Times are shown in your own time zone. You get a confirmation by
            email as soon as you book.
          </p>
        </div>

        <div className="min-w-0 lg:col-start-1 lg:row-start-2">
          <ol className="border-t border-white/10">
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="flex gap-5 border-b border-white/5 py-5"
              >
                <span className="pt-0.5 font-mono text-[11px] tracking-[0.2em] text-fg-secondary">
                  {s.n}
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] text-fg">{s.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-fg-secondary">
                    {s.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-8 text-sm leading-relaxed text-fg-secondary">
            Would you sooner see a number first?{" "}
            <Link
              href="/builders#quote"
              className="text-fg-strong underline decoration-white/30 underline-offset-4 transition-colors duration-200 hover:text-fg"
            >
              Answer four questions for a price range
            </Link>
            .
          </p>
        </div>

      </div>
    </section>
  );
}
