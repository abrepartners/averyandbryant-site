import { Hero } from "@/components/hero";

export const metadata = {
  title: "Multi-Family Property Media | Avery & Bryant",
  description:
    "Professional media for apartments, duplexes, and multi-family properties. Photography, video tours, and drone coverage.",
};

export default function MultiFamilyPage() {
  return (
    <Hero
      tag="Specialty Vertical"
      title="Multi-Family Media"
      titleAccent="at scale."
      subtitle="Apartments, duplexes, and multi-unit properties need a different approach. We shoot faster, deliver more, and make every unit look its best."
      primaryCta={{ label: "Get a Quote", href: "/book" }}
      backgroundImage="/images/hero-drone-2.jpg"
    />
  );
}
