import { Hero } from "@/components/hero";

export const metadata = {
  title: "Builder & New Construction Media | Avery & Bryant",
  description:
    "Professional media for home builders and new construction. Progress documentation, model home photography, and community showcases.",
};

export default function BuildersPage() {
  return (
    <Hero
      tag="Specialty Vertical"
      title="Builder Media"
      titleAccent="from foundation to finish."
      subtitle="Progress documentation, model home photography, community showcases, and marketing media for builders and developers."
      primaryCta={{ label: "Get a Quote", href: "/book" }}
      backgroundImage="/images/hero-drone-2.jpg"
    />
  );
}
