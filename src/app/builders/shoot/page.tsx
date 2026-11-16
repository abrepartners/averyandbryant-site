import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { OrderForm } from "@/components/order-form";
import { BUILDER_CALL_PATH } from "@/lib/consult";
import {
  SHOOT_BOOKS_ON_ARYEO,
  SHOOT_PRICE,
  SHOOT_STACK,
  money,
} from "@/components/builders/quote-data";

/**
 * The booking step for Market Your Build: "Book this shoot" on the builders
 * page lands here. One short set of questions (who is booking), then the
 * visitor is handed to the Aryeo builders order form with their details
 * filled in, where they pick the home, the date and any add-ons and pay.
 * A shoot is an order, so it goes to Aryeo. The call calendar is for calls.
 */
export const metadata: Metadata = {
  title: "Book a Market Your Build Shoot | Avery & Bryant",
  description:
    "Book one shoot of a home you just finished: 25 marketing photos of the rooms and details that show your work, back within 48 hours.",
  alternates: { canonical: "/builders/shoot" },
  robots: { index: false, follow: true },
};

const STEPS = [
  {
    n: "01",
    title: "Tell us who is booking",
    body: "Your name, email and phone, so the booking form is filled in for you.",
  },
  {
    n: "02",
    title: "Pick the home and the date",
    body: "On the booking form you enter the address and a few details about the build, choose a time and add anything extra. You see the full price before you pay.",
  },
  {
    n: "03",
    title: "Photos back within 48 hours",
    body: "25 finished images of the rooms and details that show your work, wide for your site or tall for social.",
  },
];

export default function BuilderShootPage() {
  // Off until the Aryeo builders form can sell this shoot (see quote-data).
  if (!SHOOT_BOOKS_ON_ARYEO) redirect(`${BUILDER_CALL_PATH}?for=shoot`);

  return (
    <section data-page="builder-shoot" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 md:px-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          <Link
            href="/builders"
            className="flex min-h-[44px] w-fit items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-fg-secondary transition-colors duration-200 hover:text-fg"
          >
            <span aria-hidden="true">&larr;</span> Builders
          </Link>

          <div className="mt-4 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-crimson" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-fg-strong">
              Market Your Build, {money(SHOOT_PRICE)} per shoot
            </span>
          </div>

          <h1 className="mt-5 font-display text-[clamp(32px,6vw,56px)] font-light leading-[1.04] tracking-[-0.025em] text-fg">
            Book your shoot.
          </h1>
          <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-fg-strong">
            One home you just finished, shot for your marketing. Tell us who is
            booking and the next step is the home and the date.
          </p>
        </div>

        <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div
            id="book-shoot"
            className="rounded border border-white/10 bg-[rgba(17,17,17,0.85)] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:p-8"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-fg-secondary">
              What you are booking
            </p>
            <ul className="mt-3 border-t border-white/10">
              {SHOOT_STACK.map((item) => (
                <li
                  key={item.label}
                  className="flex items-baseline justify-between gap-4 border-b border-white/5 py-2.5 text-[13px]"
                >
                  <span className="min-w-0 text-fg-strong">
                    {item.add && (
                      <span className="mr-2 text-[10px] font-medium uppercase tracking-[0.18em] text-amber-200/80">
                        Add
                      </span>
                    )}
                    {item.label}
                  </span>
                  <span className="shrink-0 font-mono tabular-nums text-fg-secondary">
                    {item.add ? `+${money(item.price)}` : money(item.price)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-fg-secondary">
              You choose the add-ons on the booking form, at these prices.
            </p>

            <div className="mt-8">
              <OrderForm vertical="builders" />
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-fg-secondary">
            Scheduling and payment happen on the next step.
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
            Want more than one shoot, or not sure this is the one?{" "}
            <Link
              href={BUILDER_CALL_PATH}
              className="text-fg-strong underline decoration-white/30 underline-offset-4 transition-colors duration-200 hover:text-fg"
            >
              Book a builder call
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
