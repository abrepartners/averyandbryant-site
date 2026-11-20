import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLiveCreate, pilotEnabled, type PilotCatalog } from "@/lib/pilot-booking/core";
import { readCatalog } from "@/lib/pilot-booking/aryeo";
import { BookingFlow } from "./booking-flow";

/**
 * Booking pilot, option C: a builder books the Market Your Build shoot on our
 * own page. Preview only. Linked from nowhere, never indexed, and a 404 on
 * Vercel production. See README.md in this folder.
 */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book a builder shoot (preview) | Avery & Bryant",
  description: "Preview of the builder shoot booking page. Not live.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default async function PilotBuilderShootPage() {
  if (!pilotEnabled(process.env)) notFound();

  let catalog: PilotCatalog | null = null;
  try {
    catalog = await readCatalog();
  } catch (err) {
    console.error("[pilot-booking] catalog read failed", (err as Error).message);
  }

  return (
    <div className="min-h-screen bg-background pb-24 pt-28 md:pt-36">
      <div className="mx-auto w-full max-w-3xl px-4 md:px-8">
        <BookingFlow catalog={catalog} live={isLiveCreate(process.env)} />
      </div>
    </div>
  );
}
