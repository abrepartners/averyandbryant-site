import Image from "next/image";
import { HeroAirbnbRentals } from "@/components/heroes/hero-airbnb-rentals";
import { OrderLink } from "@/components/order-link";
import { ConsultCTA } from "@/components/consult-cta";
import { FaqSection } from "@/components/faq-section";
import { PackageCard } from "@/components/pricing/package-card";
import { AddOnsGrid } from "@/components/pricing/add-ons-grid";
import { GuaranteeBadge } from "@/components/pricing/guarantee-badge";
import { airbnbPricing } from "@/lib/pricing";

export const metadata = {
  alternates: { canonical: "/airbnb-rentals" },
  title:
    "Airbnb & Rental Media: Revenue Ready Kit, Boost System & 5-Star Showcase | Avery & Bryant",
  description:
    "Professional photography, video tours, drone, and twilight media for Airbnb and short-term rental properties across Arkansas. Packages from $449 with a satisfaction reshoot guarantee.",
};

const heroFrame = {
  src: "/images/airbnb-rentals/326-houston-dr-hot-springs-cabin-living-room.jpg",
  alt: "Styled living room with a wood plank ceiling, a sectional sofa and a wall of windows onto the deck in a short term rental cabin at 326 Houston Drive in Hot Springs, Arkansas",
  caption: "326 Houston Drive, Hot Springs",
};

type RentalShot = { src: string; alt: string; caption: string };
type RentalGroup = { label: string; note: string; shots: RentalShot[] };

/**
 * Grouped by look, not by property, because the sets are not uniform: one
 * property has no exterior at all and another was shot in a single room. The
 * column count follows the item count so a short band never leaves a hole.
 */
function galleryGridClass(count: number) {
  if (count === 1) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
}

const rentalGroups: RentalGroup[] = [
  {
    label: "Lake cabin",
    note: "Timber, bunks and a covered deck, plus the aerial that sells the water.",
    shots: [
      {
        src: "/images/airbnb-rentals/326-houston-dr-hot-springs-bunk-room.jpg",
        alt: "Bunk room with log beds in a short term rental lake cabin in Hot Springs, Arkansas",
        caption: "Sleeps more, Hot Springs",
      },
      {
        src: "/images/airbnb-rentals/326-houston-dr-hot-springs-lakeside-deck-dining.jpg",
        alt: "Covered deck with wood chairs and a table under a timber ceiling at a short term rental cabin in Hot Springs, Arkansas",
        caption: "Covered deck, Hot Springs",
      },
      {
        src: "/images/airbnb-rentals/326-houston-dr-hot-springs-lake-cabin-aerial.jpg",
        alt: "Aerial photo of a wooded lakefront lined with covered boat docks in Hot Springs, Arkansas, with the mountains on the horizon",
        caption: "Lakefront aerial, Hot Springs",
      },
    ],
  },
  {
    label: "City rental",
    note: "Hotel clean, shot tight, for a guest comparing listings on a phone.",
    shots: [
      {
        src: "/images/airbnb-rentals/3714-idlewild-ave-north-little-rock-guest-bedroom.jpg",
        alt: "Guest bedroom made up with white hotel bedding in a short term rental at 3714 Idlewild Avenue in North Little Rock, Arkansas",
        caption: "Guest bedroom, North Little Rock",
      },
      {
        src: "/images/airbnb-rentals/3714-idlewild-ave-north-little-rock-marble-shower.jpg",
        alt: "Marble shower with a folded towel niche in a short term rental in North Little Rock, Arkansas",
        caption: "Bath detail, North Little Rock",
      },
    ],
  },
  {
    label: "Neutral luxe interiors",
    note: "Cream, cane and brass, photographed room by room.",
    shots: [
      {
        src: "/images/airbnb-rentals/neutral-luxe-rental-primary-bedroom-canopy-bed.jpg",
        alt: "Primary bedroom in a short term rental, with a whitewashed cane four poster canopy bed under layered cream and champagne bedding, a lit glass lamp and white tulips on a pale carved dresser, a spotted rug, and a sliding glass balcony door behind full length cream drapes",
        caption: "Primary bedroom",
      },
      {
        src: "/images/airbnb-rentals/neutral-luxe-rental-living-room-sectional.jpg",
        alt: "Living room in a short term rental, with a cream sectional and metallic pillows under a large gold framed abstract canvas, a round fluted white coffee table holding a white horse sculpture and a brass candelabra, and a lit lamp beside a glass balcony door",
        caption: "Living space",
      },
      {
        src: "/images/airbnb-rentals/neutral-luxe-rental-two-tone-kitchen.jpg",
        alt: "Kitchen in a short term rental, with cream upper cabinets over stained oak lower cabinets, white subway tile, light quartz counters, a stainless range and hood, and a gold bowl and white flowers staged on the counter",
        caption: "Kitchen",
      },
    ],
  },
  {
    label: "Glass sunroom in the woods",
    note: "One room, three ways: the wall of glass, the wood stove, the table.",
    shots: [
      {
        src: "/images/airbnb-rentals/glass-sunroom-rental-living-area-fall-woods.jpg",
        alt: "Glass walled sunroom in a short term rental, with black steel window frames on three sides, a pine cathedral ceiling and black ceiling fan, a tan leather channel sofa and two emerald velvet swivel chairs around a studded black drum table, and autumn woods outside every window",
        caption: "Sunroom, autumn woods",
      },
      {
        src: "/images/airbnb-rentals/glass-sunroom-rental-wood-stove-green-tile.jpg",
        alt: "Emerald velvet chairs beside a black wood stove with a fire burning behind its glass door, set against a glossy green tile chimney wall with split firewood stacked next to it, under a pine ceiling with a skylight",
        caption: "Wood stove and green tile",
      },
      {
        src: "/images/airbnb-rentals/glass-sunroom-rental-dining-table-glass-wall.jpg",
        alt: "Dining end of the same glass walled sunroom, with a black table and amber acrylic chairs against a full height glass wall onto the fall woods, the emerald velvet chairs in the foreground and the lit wood stove at the right edge",
        caption: "Dining, glass wall",
      },
    ],
  },
  {
    label: "Modern cabin on stilts",
    note: "Exterior, deck and interior, all at peak fall colour.",
    shots: [
      {
        src: "/images/airbnb-rentals/stilt-cabin-rental-exterior-fire-pit.jpg",
        alt: "Modern cabin raised on black steel stilts in an oak forest at peak fall colour, with vertical cedar toned siding, a dark metal shed roof over a lit clerestory window band, a black cable rail deck and open stair, and a dry stacked stone fire pit ring on the gravel below",
        caption: "Cabin on stilts",
      },
      {
        src: "/images/airbnb-rentals/stilt-cabin-rental-deck-lounge-fall-canopy.jpg",
        alt: "Deck of the stilt cabin, with a rope daybed under white cushions, black and white striped outdoor seating and a small round side table on a jute rug over dark decking, behind black cable railing with a wall of orange and gold fall foliage beyond",
        caption: "Deck, fall canopy",
      },
      {
        src: "/images/airbnb-rentals/stilt-cabin-rental-bedroom-open-deck-doors.jpg",
        alt: "Open plan interior of the stilt cabin, with a king bed in olive bedding and a caramel knit throw at right, a curved olive sofa on a zebra print rug beside pale oak built in shelving at left, and wide black framed sliding doors standing open onto the deck and the autumn trees",
        caption: "Bed, sofa, open doors",
      },
    ],
  },
];

const sellingPoints = [
  {
    title: "More Bookings, Proven",
    description:
      "Airbnb's own 2024 to 2025 study of 14,700+ listings found professional photography drove ~19% more bookings and ~21% higher host earnings over the following year.",
  },
  {
    title: "Amenity Showcase",
    description:
      "We highlight the details guests search for: hot tubs, kitchens, outdoor spaces, unique decor, and views.",
  },
  {
    title: "Interior Styling Guidance",
    description:
      "We advise on simple staging tweaks that photograph well and help your listing compete at higher nightly rates.",
  },
  {
    title: "Fast Turnaround",
    description:
      "Photos delivered within 48 hours. Your listing goes live faster, and you start earning sooner.",
  },
];

const steps = [
  {
    number: "01",
    title: "Book Online",
    description: "Pick your date and services in under 2 minutes.",
  },
  {
    number: "02",
    title: "We Shoot",
    description: "Our team arrives on time and captures everything.",
  },
  {
    number: "03",
    title: "Get Your Media",
    description: "Edited photos and video delivered within 48 hours.",
  },
];

const faqs = [
  {
    question: "How much does Airbnb photography cost in Arkansas?",
    answer:
      "Pricing depends on the size of the property and the package you choose. Every package and add-on is listed on this page, and you can compare pricing across all property types on our pricing page. You will see your exact total when you book online.",
  },
  {
    question: "How fast do we get our media?",
    answer:
      "Standard delivery is within 48 hours of the shoot, and most rental shoots arrive sooner. Need your listing live for the weekend? Rush delivery is available as an add-on.",
  },
  {
    question:
      "Do you photograph short term rentals in Little Rock and Central Arkansas?",
    answer:
      "Yes. We're based in Little Rock at (501) 502-2925 and cover Central Arkansas, including Little Rock, Benton, Conway, Hot Springs, and surrounding areas.",
  },
  {
    question: "Do you offer drone photos for short term rentals?",
    answer:
      "Yes. Aerial photos and video are available on rental packages, and every flight is operated by an FAA Part 107 certified pilot with full insurance coverage.",
  },
  {
    question:
      "Does professional photography actually increase Airbnb bookings?",
    answer:
      "Airbnb's own study of more than 14,700 listings found that professional photography drove roughly 19 percent more bookings and 21 percent higher host earnings over the following year. That is why booking-optimized photography is the core of every rental package we offer.",
  },
  {
    question: "What if I am not happy with the photos?",
    answer:
      "Every shoot is backed by our Satisfaction Reshoot Guarantee. Report an issue with our work within 7 days of delivery and we will reshoot it free.",
  },
];

export default function AirbnbRentalsPage() {
  const { packages, addOns, guarantee } = airbnbPricing;

  return (
    <>
      <HeroAirbnbRentals />

      {/* ── RECENT RENTALS (REAL DELIVERED WORK) ── */}
      <section className="border-b border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Recent Rentals
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Rentals we have already shot.{" "}
            <span className="text-fg-secondary">
              Five properties. Five different looks.
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-secondary">
            A lake cabin, a city rental, a neutral luxe interior, a glass
            sunroom in the woods, and a cabin on steel stilts. Same team, same
            standard, five very different properties to sell.
          </p>

          <figure className="mt-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-white/5 bg-[#111]">
              <Image
                src={heroFrame.src}
                alt={heroFrame.alt}
                fill
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[10px] uppercase tracking-[0.2em] text-fg-secondary">
              {heroFrame.caption}
            </figcaption>
          </figure>

          <div className="mt-16 space-y-16">
            {rentalGroups.map((group) => (
              <div key={group.label}>
                <h3 className="font-display text-lg font-medium text-fg">
                  {group.label}
                </h3>
                <p className="mt-1 text-sm text-fg-secondary">{group.note}</p>
                <div
                  className={`mt-6 grid gap-6 ${galleryGridClass(
                    group.shots.length,
                  )}`}
                >
                  {group.shots.map((shot) => (
                    <figure key={shot.src}>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/5 bg-[#111]">
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          fill
                          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="mt-3 text-[10px] uppercase tracking-[0.2em] text-fg-secondary">
                        {shot.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Packages
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Everything your rental needs.{" "}
            <span className="text-fg-secondary">One shoot.</span>
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} vertical="airbnb-rentals" />
            ))}
          </div>

          <div className="mt-12">
            <GuaranteeBadge guarantee={guarantee} />
          </div>
        </div>
      </section>

      {/* ── À LA CARTE ── */}
      <AddOnsGrid addOns={addOns} vertical="airbnb-rentals" />

      {/* ── WHY A&B ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Why Avery & Bryant
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Your listing is your storefront.{" "}
            <span className="text-fg-secondary">Make it count.</span>
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {sellingPoints.map((point) => (
              <div key={point.title} className="flex gap-6">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-crimson" />
                <div>
                  <h3 className="font-display text-lg font-medium text-fg">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            How It Works
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Three steps. <span className="text-fg-secondary">That&apos;s it.</span>
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 transition-all duration-500 hover:border-crimson/20"
              >
                <span className="font-display text-4xl font-extralight text-crimson">
                  {step.number}
                </span>
                <h3 className="mt-4 font-display text-lg font-medium text-fg">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-fg-secondary">
            Serving Arkansas short-term rental hosts.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FaqSection faqs={faqs} />

      <ConsultCTA
        interest="airbnb-rentals"
        headline="Running multiple rentals or a whole portfolio?"
        subhead="One property is easy, ten is a content program. Free 30-min call to talk batch shoots, seasonal refreshes, and recurring rates."
      />

      {/* ── CTA ── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12 md:py-32">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Get Started
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Ready to fill your calendar?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-fg-secondary md:text-lg">
            Book a shoot in under 2 minutes. Professional media that pays for
            itself in one booking.
          </p>
          <div className="mt-10">
            <OrderLink
              vertical="airbnb-rentals"
              className="inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Book Now
            </OrderLink>
          </div>
        </div>
      </section>
    </>
  );
}
