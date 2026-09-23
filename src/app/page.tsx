import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/hero";
import { GoogleReviews } from "@/components/google-reviews";
import { ServiceCard, type Service } from "@/components/service-card";
import { WorkingOn } from "@/components/working-on";
import { PackageCard } from "@/components/pricing/package-card";
import { realEstatePricing } from "@/lib/pricing";
import { consultUrl } from "@/lib/consult";
import featured from "../../data/featured-homes.json";
import drone from "../../data/drone-showcase.json";
import type { FeaturedHome } from "@/components/featured-homes";

// Canonical must be declared per-page, never in layout.tsx (a layout-level
// canonical would be inherited by every route and point them all at "/").
// Without this, Google indexed http:// and https:// as two separate homepages.
export const metadata = {
  alternates: { canonical: "/" },
};

/**
 * Every "See Examples" modal shows only that tile's media type. Photos and
 * Drone draw from the same by-eye verified data the gallery uses: the cover
 * (front exterior, first frame) of six different featured homes, and the
 * first frame of six different land listings in the drone showcase.
 */
const PHOTO_SAMPLE_HOMES = [
  "019f19ab-f680-7349-8b50-e93d097513c5", // 8812 Ranch Blvd, Little Rock
  "019ed64d-6180-718e-9168-622cbc0a5331", // 3428 McCord Dr, North Little Rock
  "019ef1f2-e928-70f0-89f8-c38010069c38", // 8 Woodsong Dr, Roland
  "019a0345-4270-72f9-b9ca-3835df1c8b63", // 4 N Cres Dr, Mount Ida
  "019cf8dd-b7b0-72fa-ab19-449c95431dac", // 68 Wellington Pl, Cabot
  "019e2934-7038-71a1-8ce9-70ff2e77659a", // 106 W End St, Beebe
];

const homes = featured as FeaturedHome[];

const photoSamples = PHOTO_SAMPLE_HOMES.flatMap((id) => {
  const home = homes.find((h) => h.id === id);
  const cover = home?.images[0];
  if (!home || !cover) return [];
  return [
    {
      src: cover.medium ?? cover.url,
      label: `${home.label}, ${home.city}`,
      alt: `Front exterior of ${home.street ? `${home.street}, ` : ""}${home.city}, Arkansas, photographed for the listing`,
    },
  ];
});

type DroneShot = { url: string; thumb: string; city: string; label: string };

const droneSamples = (() => {
  const seen = new Set<string>();
  const out: { src: string; label: string; alt: string }[] = [];
  for (const shot of drone as DroneShot[]) {
    // One frame per listing: the listing slug is the path segment after /listings/.
    const listing = shot.url.split("/listings/")[1]?.split("/")[0] ?? shot.url;
    if (seen.has(listing)) continue;
    seen.add(listing);
    out.push({
      src: shot.url,
      label: `Aerial, ${shot.city}`,
      alt: `Aerial drone frame over ${shot.label.toLowerCase()} in ${shot.city}, Arkansas`,
    });
    if (out.length === 6) break;
  }
  return out;
})();

const services: Service[] = [
  {
    title: "Photos",
    price: "From $185",
    useWhen:
      "Every listing. Coverage (25, 40 or 55 photos) is the choice: more photos for larger homes and more rooms worth showing.",
    includedIn: "every listing package; the photo count sets the tier.",
    description:
      "HDR photography calibrated for MLS, print, and social. 25, 40, or 55 photo shoots. Delivered within 48 hours.",
    image: "/images/services/photos/great-room-beams-little-rock.jpg",
    imageAlt:
      "Beamed great room with a vaulted ceiling in a Little Rock home, photographed for the listing",
    preview: {
      kind: "images",
      items: photoSamples,
    },
  },
  {
    title: "Reels Pack",
    price: "$595",
    useWhen:
      "When the listing needs to travel on Instagram, TikTok and Facebook, or the agent wants to be on camera.",
    includedIn:
      "Market Takeover Blueprint (4 reels); one reel in Listing Domination; add to any package.",
    description:
      "4 platform-native reels: listing walkthrough, viral hook, cinematic trailer, teaser. Shot and edited in one visit. Single reels are $195.",
    image: "/images/services/reels/reel-frame-aerial-beebe.jpg",
    imageAlt:
      "Aerial frame from a listing reel, showing a brick ranch home with a covered back porch on a wide mown lawn, a concrete drive with a pickup and an SUV, and a road along the treeline in Beebe, Arkansas",
    preview: {
      kind: "videos",
      orientation: "vertical",
      items: [
        {
          src: "/images/services/reels/reel-1.mp4",
          poster: "/images/services/reels/reel-1-poster.jpg",
          label: "Listing Reel, Bryant",
        },
        {
          src: "/images/services/reels/reel-2.mp4",
          poster: "/images/services/reels/reel-2-poster.jpg",
          label: "Listing Reel, Bryant",
        },
        {
          src: "/images/services/reels/reel-3.mp4",
          poster: "/images/services/reels/reel-3-poster.jpg",
          label: "Listing Reel, Hot Springs",
        },
      ],
    },
  },
  {
    title: "Drone",
    price: "$150",
    useWhen:
      "When the lot, the setting, the water or the neighborhood is part of the story.",
    includedIn: "Listing Domination and above; add to the Launch Kit.",
    description:
      "FAA-licensed aerials. Property context, neighborhood scale, lot boundaries. Photos and video in one flight.",
    image: "/images/services/drone/lakefront-home-aerial-hot-springs.jpg",
    imageAlt:
      "Aerial view of a lakefront home in Hot Springs, Arkansas, with the water and ridgeline behind it",
    preview: {
      kind: "images",
      items: droneSamples,
    },
  },
  {
    title: "Video Tours",
    price: "From $295",
    useWhen:
      "When the property has a flow worth walking, or the price point expects a film, not just photos.",
    includedIn: "Market Takeover Blueprint; add to any package.",
    description:
      "Cinematic walkthrough video with music, pacing, and branded intro. 60 seconds at $295, 90 to 120 seconds at $395.",
    image: "/images/services/video-tours/cover.jpg",
    imageAlt:
      "Modern home with stone and dark vertical siding, a two car garage, and a wide concrete driveway, framed by trees",
    preview: {
      kind: "videos",
      orientation: "horizontal",
      items: [
        {
          src: "/images/services/video-tours/tour-1.mp4",
          poster: "/images/services/video-tours/tour-1-poster.jpg",
          label: "Cinematic Tour, Clinton",
        },
        {
          src: "/images/services/video-tours/tour-2.mp4",
          poster: "/images/services/video-tours/tour-2-poster.jpg",
          label: "Cinematic Tour, Hot Springs",
        },
        {
          src: "/images/services/video-tours/tour-3.mp4",
          poster: "/images/services/video-tours/tour-3-poster.jpg",
          label: "Cinematic Tour, Hot Springs Village",
        },
      ],
    },
  },
  {
    title: "3D Tours",
    price: "From $149",
    useWhen:
      "When out-of-town buyers or busy schedules mean the first showing happens on a phone.",
    includedIn: "Listing Domination and above; add to the Launch Kit.",
    description:
      "Interactive 3D walkthrough. Buyers explore the home remotely, room by room. Zillow 3D with floor plan at $149, 3D walkthrough tour at $299.",
    image: "/images/portfolio-interior-2.jpg",
    imageAlt:
      "Kitchen with dark gray cabinets, a stone island, and pendant chandeliers, opening to an empty dining area with wood floors",
    preview: {
      kind: "videos",
      orientation: "horizontal",
      items: [
        {
          src: "/images/services/3d-tours/tour3d-1.mp4",
          poster: "/images/services/3d-tours/tour3d-1-poster.jpg",
          label: "Walk Through Room to Room",
        },
        {
          src: "/images/services/3d-tours/tour3d-2.mp4",
          poster: "/images/services/3d-tours/tour3d-2-poster.jpg",
          label: "Explore Every Space",
        },
        {
          src: "/images/services/3d-tours/tour3d-3.mp4",
          poster: "/images/services/3d-tours/tour3d-3-poster.jpg",
          label: "Self-Guided Walkthrough",
        },
      ],
    },
  },
  {
    title: "Virtual Staging",
    price: "$49/room",
    useWhen:
      "When rooms are empty or dated and buyers need help seeing the layout furnished. Always labeled as virtually staged.",
    includedIn:
      "Market Takeover Blueprint (3 rooms); add per room to any package.",
    description:
      "AI-powered staging. 12+ interior styles. Empty rooms to styled spaces in under 48 hours. Virtual twilight is $39 per image.",
    image: "/images/showcase-staging-after.jpg",
    imageAlt:
      "Primary bedroom after virtual staging, furnished with a bed, a gray sofa, a jute rug, and framed art",
    preview: {
      kind: "images",
      items: [
        {
          src: "/images/showcase-staging-before.jpg",
          label: "Before",
          alt: "Primary bedroom photographed empty before virtual staging",
        },
        {
          src: "/images/showcase-staging-after.jpg",
          label: "After",
          alt: "The same primary bedroom after virtual staging, furnished and styled",
        },
      ],
    },
  },
];

// Brokerages whose agents have shot with us. These are marks of firms we have
// done work for, not partners or endorsers, so the row stays deliberately quiet
// and the copy above it claims nothing beyond "their agents book us".
// Heights are set per mark because the artwork ranges from a tall square badge
// to a very wide wordmark; a single uniform height would make them read unevenly.
const brokerageMarks = [
  {
    src: "/images/brokerages/coldwell-banker.png",
    width: 569,
    height: 160,
    name: "Coldwell Banker",
    className: "h-[22px] md:h-[18px]",
  },
  {
    src: "/images/brokerages/century-21.png",
    width: 126,
    height: 160,
    name: "Century 21",
    className: "h-9 md:h-8",
  },
  {
    src: "/images/brokerages/keller-williams.png",
    width: 350,
    height: 160,
    name: "Keller Williams",
    className: "h-8 md:h-7",
  },
  {
    src: "/images/brokerages/crye-leike.png",
    width: 582,
    height: 160,
    name: "Crye-Leike",
    className: "h-[22px] md:h-[18px]",
  },
  {
    src: "/images/brokerages/engel-voelkers.png",
    width: 595,
    height: 160,
    name: "Engel and Voelkers",
    className: "h-[22px] md:h-[18px]",
  },
  {
    src: "/images/brokerages/irealty-arkansas.png",
    width: 565,
    height: 160,
    name: "iRealty Arkansas",
    className: "h-[22px] md:h-5",
  },
  {
    src: "/images/brokerages/the-property-group.png",
    width: 304,
    height: 160,
    name: "The Property Group",
    className: "h-8 md:h-7",
  },
  {
    src: "/images/brokerages/back-porch-realty.png",
    width: 417,
    height: 160,
    name: "Back Porch Realty",
    className: "h-8 md:h-7",
  },
];

// One real listing, its delivered media, and the job each asset does. All
// three frames are from the same property (164 Blue Heron Drive, Hot Springs)
// and already ship on the Real Estate page. Reels, tours and plans are shown
// by service in the section below rather than attributed to this listing.
const oneProject = {
  address: "164 Blue Heron Drive, Hot Springs",
  assets: [
    {
      src: "/images/real-estate/164-blue-heron-dr-hot-springs-pool-over-lake.jpg",
      alt: "Pool overlooking the lake at a waterfront home listing in Hot Springs, Arkansas",
      job: "Get attention",
      note: "The cover photo. The one frame that earns the click on Zillow, the MLS and social.",
    },
    {
      src: "/images/real-estate/164-blue-heron-dr-hot-springs-two-story-great-room.jpg",
      alt: "Two story great room with lake facing windows in a waterfront home listing in Hot Springs, Arkansas",
      job: "Explain the layout",
      note: "Interior HDR photos, and on larger packages a floor plan and 3D tour, answer how the house lives.",
    },
    {
      src: "/images/real-estate/164-blue-heron-dr-hot-springs-lakefront-aerial.jpg",
      alt: "Aerial photo of a lakefront estate listing at 164 Blue Heron Drive in Hot Springs, Arkansas, with the mountains behind it",
      job: "Show the context",
      note: "Drone aerials put the lot, the water and the neighborhood in one frame.",
    },
  ],
};

const threeWays = [
  {
    title: "Done for you",
    blurb:
      "Our team shoots, edits and delivers property media, brand content and video. You book, we handle the rest.",
    example:
      "A listing shoot with photos, drone and a reel, delivered in 48 hours.",
    href: "/pricing",
    cta: "See packages",
  },
  {
    title: "Space and production at The Spot",
    blurb:
      "Rent the podcast studio by the hour, or book a produced episode with an engineer on the desk.",
    example: "A weekly show recorded in a finished room, clips cut for social.",
    href: "/studio",
    cta: "See The Spot",
  },
  {
    title: "Do it yourself with our tools",
    blurb:
      "Vellum edits and stages your own listing photos. Answr handles inquiries so calls are not missed.",
    example: "Upload a photo, get a virtually staged version back in minutes.",
    href: "/vellum",
    cta: "See Vellum",
  },
];

const nextSteps = [
  {
    num: "01",
    title: "Scope and select",
    description:
      "Pick a package online, or take a free 30-minute call for commercial, multi-family and monthly programs.",
  },
  {
    num: "02",
    title: "Capture",
    description:
      "One visit. Photos, drone, video and tours are shot together so the media matches.",
  },
  {
    num: "03",
    title: "Produce and review",
    description:
      "Editing, staging and reels are produced in-house. Reshoots on our work are free within 7 days.",
  },
  {
    num: "04",
    title: "Deliver and use",
    description:
      "Listing photos and media within 48 hours of the shoot (commercial within 72). Branded gallery, MLS exports, social crops.",
  },
];

const capabilities = [
  {
    name: "Vellum",
    job: "Edit and stage your own listing photos",
    who: "Agents and small teams who want to do the editing themselves",
    scope:
      "Virtual staging, cleanup, day to dusk and sky replacement. Separate from our shoots; free plan to start.",
    href: "/vellum",
    cta: "See how Vellum works",
    image: {
      before: "/images/showcase-staging-before.jpg",
      after: "/images/showcase-staging-after.jpg",
    },
  },
  {
    name: "The Spot",
    job: "A podcast and video studio in Little Rock",
    who: "Podcasters, agents and businesses recording their own show",
    scope:
      "Rent the room by the hour, or book a produced episode. Memberships are separate from media packages.",
    href: "/studio",
    cta: "See rooms and rates",
    image: { single: "/images/studio/spot-1.jpg" },
  },
  {
    name: "Answr",
    job: "Answer and route inquiries when you cannot",
    who: "Agents and offices that miss calls and messages",
    scope:
      "Voice and chat handling with human handoff. Priced separately from media; availability is confirmed on request.",
    href: "/answr",
    cta: "Learn about Answr",
  },
];

export default function HomePage() {
  const listingPackages = realEstatePricing.packages;

  return (
    <>
      {/* 1. HERO */}
      <Hero
        tag="Real estate media, Central Arkansas"
        title="Media that markets your property."
        titleAccent="Content that builds your business."
        subtitle="Property media, brand content, studio production and self-service software, from one Little Rock team."
        primaryCta={{ label: "Find the right service", href: "/get-started" }}
        secondaryCta={{ label: "Book a shoot", href: "/book" }}
        backgroundImage="/images/staging-twilight.jpg"
      />

      {/* 2. TRUST STRIP */}
      <section className="border-y border-white/5 bg-[rgba(17,17,17,0.3)]">
        <div className="mx-auto max-w-[1280px] px-6 py-8 md:px-12 md:py-10">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            <p className="shrink-0 text-center text-[11px] uppercase tracking-[0.25em] text-fg-secondary md:text-left">
              Little Rock, Arkansas
              <span className="mx-3 text-fg-secondary">|</span>
              <span className="text-fg-strong">200+</span> Arkansas agents
              <span className="mx-3 text-fg-secondary">|</span>
              48-hour delivery
            </p>

            <div className="flex shrink-0 items-center gap-6">
              <span className="rounded border border-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-fg-secondary">
                BBB A+
              </span>
              {process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ? (
                <a
                  href={process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] items-center gap-1.5 text-[11px] text-fg-secondary transition-colors hover:text-fg-strong"
                >
                  <span className="text-crimson">
                    &#9733;&#9733;&#9733;&#9733;&#9733;
                  </span>
                  <span>Google</span>
                </a>
              ) : null}
            </div>
          </div>

          <div className="mt-8 border-t border-white/5 pt-8">
            <p className="text-center text-[10px] uppercase tracking-[0.25em] text-fg-secondary">
              Agents from these brokerages shoot with us
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12">
              {brokerageMarks.map((mark) => (
                <Image
                  key={mark.src}
                  src={mark.src}
                  alt={`${mark.name} logo`}
                  width={mark.width}
                  height={mark.height}
                  className={`w-auto opacity-65 transition-opacity duration-500 hover:opacity-70 md:opacity-40 ${mark.className}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT ARE YOU WORKING ON */}
      <section id="start" className="py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Start here
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            What are you working on?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-secondary">
            Pick the job and we take you to the right place. No product names to
            decode first.
          </p>
          <div className="mt-12">
            <WorkingOn />
          </div>
        </div>
      </section>

      {/* 4. SEE WHAT ONE PROJECT BECOMES */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            One project
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            See what one listing becomes.{" "}
            <span className="text-fg-secondary">{oneProject.address}.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-secondary">
            Every asset from a shoot has a job. Here are three from one
            waterfront listing we delivered, and what each one does.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {oneProject.assets.map((asset) => (
              <figure key={asset.src}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/5 bg-[#111]">
                  <Image
                    src={asset.src}
                    alt={asset.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-4">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-crimson/80">
                    {asset.job}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-fg-secondary">
                    {asset.note}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/real-estate"
              className="inline-flex min-h-[44px] items-center justify-center rounded border border-crimson/30 px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-crimson/90 transition-colors hover:border-crimson/60 hover:text-white"
            >
              See the full listing kit
            </Link>
            <Link
              href="/gallery"
              className="inline-flex min-h-[44px] items-center justify-center px-2 text-[11px] uppercase tracking-[0.2em] text-fg-secondary transition-colors hover:text-fg-strong"
            >
              More delivered work &rarr;
            </Link>
          </div>
          <p className="mt-4 text-xs text-fg-secondary">
            Reels, 3D tours and floor plans are shown by service below. Not
            every asset is standard in every package; each card says what it
            carries.
          </p>
        </div>
      </section>

      {/* 5. THREE WAYS A&B HELPS */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Three ways we help
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Hire the team, use the studio,{" "}
            <span className="text-fg-secondary">or do it yourself.</span>
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {threeWays.map((way) => (
              <div
                key={way.title}
                className="flex flex-col rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 transition-all duration-500 hover:border-crimson/20"
              >
                <h3 className="font-display text-lg font-medium text-fg">
                  {way.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-secondary">
                  {way.blurb}
                </p>
                <p className="mt-4 text-[13px] leading-relaxed text-fg-secondary">
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-amber-200/80">
                    Example
                  </span>{" "}
                  {way.example}
                </p>
                <Link
                  href={way.href}
                  className="mt-6 inline-flex min-h-[44px] items-center text-[11px] uppercase tracking-[0.2em] text-crimson transition-colors hover:text-white"
                >
                  {way.cta} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. UNDERSTAND THE MEDIA */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Understand the media
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            What each asset does,{" "}
            <span className="text-fg-secondary">
              and when it changes your choice.
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-secondary">
            Listing packages are flat prices. Commercial and multi-family
            photography is sized to your square footage on a call. Prices shown
            are the a la carte starting points.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. CHOOSE COVERAGE */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Choose coverage
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            A starting point for a home listing.{" "}
            <span className="text-fg-secondary">
              Other property types have their own.
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-secondary">
            These three are the residential listing packages. Rentals,
            communities, land, builders and commercial each have fit-led options
            on their pages.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {listingPackages.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} vertical="real-estate" />
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/get-started"
              className="inline-flex min-h-[44px] items-center justify-center rounded border border-crimson/30 px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-crimson/90 transition-colors hover:border-crimson/60 hover:text-white"
            >
              Help me choose
            </Link>
            <Link
              href="/pricing"
              className="inline-flex min-h-[44px] items-center justify-center px-2 text-[11px] uppercase tracking-[0.2em] text-fg-secondary transition-colors hover:text-fg-strong"
            >
              Every property type and a la carte &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 8. WHAT HAPPENS NEXT */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            What happens next
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Choose what you need.{" "}
            <span className="text-fg-secondary">
              We capture it, prepare the right assets, and deliver them ready
              for your channels.
            </span>
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {nextSteps.map((step, i) => (
              <div key={step.num} className="relative">
                {i < nextSteps.length - 1 && (
                  <div className="absolute right-0 top-4 hidden h-px w-8 translate-x-full bg-gradient-to-r from-crimson/30 to-transparent md:block" />
                )}
                <span className="font-display text-3xl font-extralight text-crimson">
                  {step.num}
                </span>
                <h3 className="mt-3 font-display text-base font-medium text-fg">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 max-w-2xl text-sm leading-relaxed text-fg-secondary">
            Add virtual staging, a studio session or self-service editing when
            your project calls for it. None of them are bundled by default; each
            package card says what it carries.
          </p>
        </div>
      </section>

      {/* 9. CONNECTED CAPABILITIES */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Connected capabilities
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Three tools, each with one job.
          </h2>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {capabilities.map((cap) => (
              <div
                key={cap.name}
                className="flex flex-col overflow-hidden rounded border border-white/5 bg-[rgba(17,17,17,0.5)] transition-all duration-500 hover:border-crimson/20"
              >
                {cap.image?.before && cap.image.after ? (
                  <div className="grid grid-cols-2 gap-px bg-white/5">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={cap.image.before}
                        alt="Primary bedroom photographed empty before virtual staging"
                        fill
                        sizes="(min-width: 1024px) 200px, 50vw"
                        className="object-cover"
                      />
                      <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[9px] uppercase tracking-[0.15em] text-fg-strong">
                        Before
                      </span>
                    </div>
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={cap.image.after}
                        alt="The same primary bedroom after virtual staging, furnished and styled"
                        fill
                        sizes="(min-width: 1024px) 200px, 50vw"
                        className="object-cover"
                      />
                      <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[9px] uppercase tracking-[0.15em] text-fg-strong">
                        After, virtually staged
                      </span>
                    </div>
                  </div>
                ) : cap.image?.single ? (
                  <div className="relative aspect-[2/1]">
                    <Image
                      src={cap.image.single}
                      alt="The Spot podcast studio room in Little Rock, Arkansas"
                      fill
                      sizes="(min-width: 1024px) 400px, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[2/1] items-center justify-center border-b border-white/5 bg-[rgba(10,10,10,0.6)]">
                    <span className="font-display text-3xl font-extralight text-crimson">
                      {cap.name}
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-8">
                  <span className="inline-block w-fit rounded-full border border-crimson/30 bg-crimson/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-crimson">
                    {cap.name}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-light text-fg">
                    {cap.job}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-secondary">
                    <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-amber-200/80">
                      For
                    </span>{" "}
                    {cap.who}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
                    {cap.scope}
                  </p>
                  <Link
                    href={cap.href}
                    className="mt-6 inline-flex min-h-[44px] items-center text-[11px] uppercase tracking-[0.2em] text-crimson transition-colors hover:text-white"
                  >
                    {cap.cta} &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOOGLE REVIEWS */}
      <GoogleReviews />

      {/* 10. FINAL DECISION */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12 md:py-32">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Ready when you are
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Book the shoot, or let us point you to the right one.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-fg-secondary md:text-lg">
            Listing shoots book online in under 2 minutes. Complex or ongoing
            projects start with a free 30-minute call.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex min-h-[44px] items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Book a shoot
            </Link>
            <Link
              href="/get-started"
              className="inline-flex min-h-[44px] items-center justify-center rounded border border-white/10 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-fg-strong transition-all hover:border-white/30 hover:text-white"
            >
              Find the right service
            </Link>
            <a
              href={consultUrl("home")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center rounded border border-amber-400/30 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-amber-200/90 transition-all hover:border-amber-400/60 hover:text-white"
            >
              Request scoping (free call)
            </a>
          </div>
          <p className="mt-10 text-xs text-fg-secondary">
            Know an agent who should shoot with us?{" "}
            <Link
              href="/referral"
              className="underline transition-colors hover:text-white"
            >
              Our referral program pays cash.
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
