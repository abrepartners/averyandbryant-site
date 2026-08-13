import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ORDER_FORMS, type Vertical } from "@/lib/order-forms";
import { OrderForm } from "@/components/order-form";

const VERTICAL_META: Record<
  Vertical,
  { heading: string; tag: string; description: string }
> = {
  "real-estate": {
    heading: "Start your real estate shoot.",
    tag: "Real Estate Media",
    description:
      "Tell us where and who — we'll line up the shoot and send a confirmation.",
  },
  builders: {
    heading: "Book your builder shoot.",
    tag: "Builder & Construction Media",
    description:
      "Progress docs, model homes, or marketing launch — let's get it scheduled.",
  },
  "airbnb-rentals": {
    heading: "Book your rental shoot.",
    tag: "Short-Term Rental Media",
    description:
      "Photos, video, drone, and twilight media that fill your calendar.",
  },
  "lot-land": {
    heading: "Book your land aerial.",
    tag: "Lot & Land Media",
    description:
      "Drone boundaries, proximity context, and development visuals.",
  },
  "multi-family": {
    heading: "Book your property shoot.",
    tag: "Multi-Family Media",
    description:
      "Model units, amenities, aerials, and leasing-ready media for your complex.",
  },
};

export function generateStaticParams() {
  return (Object.keys(ORDER_FORMS) as Vertical[]).map((vertical) => ({
    vertical,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ vertical: string }>;
}): Promise<Metadata> {
  const { vertical } = await params;
  if (!(vertical in ORDER_FORMS)) return {};
  const meta = VERTICAL_META[vertical as Vertical];
  return {
    title: `${meta.tag} — Book a Shoot | Avery & Bryant`,
    description: meta.description,
    alternates: { canonical: `/order/${vertical}` },
  };
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ vertical: string }>;
}) {
  const { vertical } = await params;
  if (!(vertical in ORDER_FORMS)) notFound();
  const v = vertical as Vertical;
  const meta = VERTICAL_META[v];

  return (
    <section className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-crimson/5 blur-[150px]" />
      <div className="relative mx-auto max-w-[720px] px-6 md:px-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
          {meta.tag}
        </p>
        <h1 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
          {meta.heading}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-white/50">
          {meta.description}
        </p>
        <div className="mt-12">
          <OrderForm vertical={v} />
        </div>
        <p className="mt-6 text-xs text-white/30">
          Final pricing, scheduling, and payment happen on the next step.
        </p>
      </div>
    </section>
  );
}
