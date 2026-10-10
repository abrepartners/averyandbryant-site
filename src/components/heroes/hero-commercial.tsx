import { EditorialHero } from "@/components/editorial-hero";

export function HeroCommercial() {
  return (
    <EditorialHero
      label="Commercial Media hero"
      eyebrow="Commercial Media"
      title={
        <>
          Media for everything
          <br />
          <span className="text-fg-secondary italic">that isn&apos;t a home.</span>
        </>
      }
      sub="Photos, drone and video for listings, retail, restaurants and offices across Central Arkansas."
      image="/images/commercial/north-little-rock-skyline-aerial.jpg"
      alt="Aerial photo over North Little Rock looking across the Arkansas River to the Little Rock skyline, by Avery & Bryant"
      objectPosition="center 45%"
      primary={{
        label: "Request a Quote",
        href: "mailto:book@averyandbryant.com?subject=Commercial%20Media%20Quote",
      }}
      secondary={{ label: "See commercial work", href: "/gallery/commercial" }}
    />
  );
}
