import { Hero } from "@/components/hero";

export default function HomePage() {
  return (
    <>
      <Hero
        tag="Arkansas Real Estate Media"
        title="The media company"
        titleAccent="that moves properties."
        subtitle="Professional photography, cinematic video, AI-powered staging, and intelligent answering systems. Two locations serving all of Arkansas."
        primaryCta={{ label: "Book a Shoot", href: "/book" }}
        secondaryCta={{ label: "View Gallery", href: "https://homes.averyandbryant.com" }}
      />

      {/* Services overview section - coming next */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            What We Do
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-extralight tracking-tight text-white-90">
            Media that sells. <span className="text-white-40">AI that scales.</span>
          </h2>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Listing Media",
                description:
                  "HDR photography, cinematic video tours, aerial drone, 3D virtual tours, and floor plans.",
              },
              {
                title: "Virtual Staging",
                description:
                  "AI-powered staging that transforms empty rooms into buyer-ready spaces in minutes.",
              },
              {
                title: "Answr Voice AI",
                description:
                  "24/7 AI answering service. Never miss a lead. Appointment booking and call routing included.",
              },
              {
                title: "StudioAI",
                description:
                  "AI listing media platform with smart cleanup, style advisor, and quality scoring.",
              },
              {
                title: "Brand & Content",
                description:
                  "Identity systems, social media frameworks, and web development for real estate professionals.",
              },
              {
                title: "Specialty Verticals",
                description:
                  "Dedicated media packages for Airbnb, multi-family, lot & land, and new construction.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="group rounded border border-border bg-card p-8 transition-all duration-500 hover:border-crimson/20 hover:bg-[rgba(17,17,17,0.8)] md:p-10"
              >
                <h3 className="font-display text-lg font-medium text-white-90">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white-40">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
