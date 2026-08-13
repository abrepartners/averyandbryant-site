import type { Metadata } from "next";
import { PackageSelector } from "@/components/package-selector";

export const metadata: Metadata = {
  title: "Find Your Package | Avery & Bryant Real Estate Media",
  description:
    "Answer three quick questions and we'll recommend the right Arkansas real estate media package — and take you straight to booking. Photos, video, drone, staging, and more.",
  alternates: { canonical: "/get-started" },
  openGraph: {
    title: "Find Your Package | Avery & Bryant",
    description:
      "Three questions. The right package. Booked in minutes. Arkansas real estate media built around your listing.",
    url: "/get-started",
  },
};

export default function GetStartedPage() {
  return (
    <main className="min-h-screen">
      <section className="border-b border-white/5 py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Find your package
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(32px,6vw,64px)] font-light leading-[1.05] tracking-tight text-white-90">
            Not sure what you need?{" "}
            <span className="text-white-40">We&apos;ll point you to it.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-fg-strong">
            Three quick questions. We&apos;ll recommend the right package and
            take you straight to booking — no guesswork, no pressure.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <PackageSelector />
        </div>
      </section>
    </main>
  );
}
