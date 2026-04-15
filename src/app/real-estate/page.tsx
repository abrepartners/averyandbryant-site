import { Hero } from "@/components/hero";

export const metadata = {
  title: "Real Estate Media | Avery & Bryant",
  description:
    "Professional HDR photography, cinematic video tours, aerial drone, 3D virtual tours, and floor plans for real estate listings across Arkansas.",
};

export default function RealEstatePage() {
  return (
    <Hero
      tag="Core Service"
      title="Real Estate Media"
      titleAccent="that closes deals."
      subtitle="HDR photography, cinematic video tours, aerial drone, 3D virtual tours, and floor plans. Everything your listing needs to stand out."
      primaryCta={{ label: "Book a Shoot", href: "/book" }}
      secondaryCta={{ label: "View Gallery", href: "https://homes.averyandbryant.com" }}
      backgroundImage="/images/hero-drone.jpg"
    />
  );
}
