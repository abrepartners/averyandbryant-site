import { Hero } from "@/components/hero";

export const metadata = {
  title: "Answr | AI Answering Service | Avery & Bryant",
  description:
    "AI answering service with Voice AI and Chat AI. 24/7 coverage, appointment booking, and call routing. Starting at $147/mo.",
};

export default function AnswrPage() {
  return (
    <Hero
      tag="AI Product"
      title="Answr"
      titleAccent="Never miss another lead."
      subtitle="AI answering service with Voice AI and Chat AI. 24/7 coverage, appointment booking, and intelligent call routing. Starting at $147/mo."
      primaryCta={{ label: "Get Answr", href: "/book" }}
    />
  );
}
