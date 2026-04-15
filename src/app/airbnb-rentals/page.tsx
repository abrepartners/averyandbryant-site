import { Hero } from "@/components/hero";

export const metadata = {
  title: "Airbnb & Short-Term Rental Media | Avery & Bryant",
  description:
    "Professional media for Airbnb and short-term rental properties. Photography, video, and virtual staging that drives bookings.",
};

export default function AirbnbRentalsPage() {
  return (
    <Hero
      tag="Specialty Vertical"
      title="Airbnb & Rental Media"
      titleAccent="that drives bookings."
      subtitle="Professional photography and video tailored for short-term rental platforms. Make every listing irresistible to guests."
      primaryCta={{ label: "Book a Shoot", href: "/book" }}
      backgroundImage="/images/staging-interior.jpg"
    />
  );
}
