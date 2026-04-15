import { Hero } from "@/components/hero";

export const metadata = {
  title: "StudioAI | AI Listing Media Platform | Avery & Bryant",
  description:
    "AI-powered listing media platform with virtual staging, smart cleanup, style advisor, and quality scoring.",
};

export default function StudioAIPage() {
  return (
    <Hero
      tag="AI Product"
      title="StudioAI"
      titleAccent="Listing media, reimagined."
      subtitle="Virtual staging, smart cleanup, style advisor, and quality scoring. One platform for every listing photo you'll ever need."
      primaryCta={{ label: "Try StudioAI", href: "/book" }}
      secondaryCta={{ label: "See Examples", href: "https://homes.averyandbryant.com" }}
    />
  );
}
