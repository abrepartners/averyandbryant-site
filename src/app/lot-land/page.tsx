import { Hero } from "@/components/hero";

export const metadata = {
  title: "Lot & Land Media | Avery & Bryant",
  description:
    "Aerial drone photography, video, and mapping for vacant lots and land parcels across Arkansas.",
};

export default function LotLandPage() {
  return (
    <Hero
      tag="Specialty Vertical"
      title="Lot & Land Media"
      titleAccent="from every angle."
      subtitle="Aerial drone photography, cinematic flyovers, and mapping that helps buyers see the full potential of vacant land and development parcels."
      primaryCta={{ label: "Get a Quote", href: "/book" }}
      backgroundImage="/images/hero-drone.jpg"
    />
  );
}
