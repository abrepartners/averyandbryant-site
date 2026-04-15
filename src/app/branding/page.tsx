import { Hero } from "@/components/hero";

export const metadata = {
  title: "Branding & Creative Studio | Avery & Bryant",
  description:
    "Brand identity, content systems, social media frameworks, and web development for real estate professionals.",
};

export default function BrandingPage() {
  return (
    <Hero
      tag="Creative Studio"
      title="Brand & Content"
      titleAccent="that positions you as the authority."
      subtitle="Identity systems, social media frameworks, content strategy, and web development built specifically for real estate professionals."
      primaryCta={{ label: "Start a Project", href: "/book" }}
    />
  );
}
