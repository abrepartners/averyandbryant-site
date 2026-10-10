import { EditorialHero } from "@/components/editorial-hero";

export function HeroBuilders() {
  return (
    <EditorialHero
      label="Builder Media hero"
      eyebrow="Builder Media"
      title={
        <>
          Document the build.
          <br />
          <span className="text-fg-secondary italic">Market the result.</span>
        </>
      }
      sub="Progress photos, drone and video, from foundation to final walkthrough."
      image="/images/builders/bryant-front-exterior.jpg"
      alt="New construction home on a wooded lot in Bryant, Arkansas, photographed by Avery & Bryant"
      objectPosition="center 40%"
      primary={{ label: "Book a Shoot", href: "/order/builders" }}
      secondary={{ label: "See new construction work", href: "/gallery/builders" }}
    />
  );
}
