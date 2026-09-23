import curated from "../../data/gallery-curated.json";
import featured from "../../data/featured-homes.json";
import type { GalleryItem } from "@/components/gallery-grid";
import type { FeaturedHome } from "@/components/featured-homes";

/**
 * One gallery per vertical. `cat` is the category field in
 * data/gallery-curated.json and data/featured-homes.json; `slug` is the route
 * under /gallery and matches the vertical page path.
 */
export type GalleryVertical = {
  slug: string;
  cat: string;
  name: string;
  /** Title-case name for headings and metadata. */
  title: string;
  blurb: string;
  /** The vertical's service page. */
  page: string;
  /** ?interest value for the consult calendar. */
  interest: string;
  /**
   * Tile image on the gallery index, verified by eye to read as the vertical
   * at thumbnail size. A featured listing id (its cover) or a site image.
   */
  tile: { featuredId?: string; src?: string; alt: string };
};

export const GALLERY_VERTICALS: GalleryVertical[] = [
  {
    slug: "real-estate",
    cat: "residential-listing",
    name: "real estate",
    title: "Real Estate",
    blurb: "Residential listings across Central Arkansas: photos, drone, video and floor plans.",
    page: "/real-estate",
    interest: "real-estate",
    tile: {
      featuredId: "019f19ab-f680-7349-8b50-e93d097513c5",
      alt: "Front exterior of a brick home on Ranch Boulevard in Little Rock, Arkansas",
    },
  },
  {
    slug: "airbnb-rentals",
    cat: "airbnb-str",
    name: "Airbnb / rental",
    title: "Airbnb / Rentals",
    blurb: "Short-term rentals shot to book: the setting, the rooms guests search for, the amenities.",
    page: "/airbnb-rentals",
    interest: "airbnb",
    tile: {
      featuredId: "019a0345-4270-72f9-b9ca-3835df1c8b63",
      alt: "Lake cabin rental among the pines in Mount Ida, Arkansas",
    },
  },
  {
    slug: "multi-family",
    cat: "multi-family",
    name: "multi-family",
    title: "Multi-Family",
    blurb: "Apartment communities, duplexes and unit interiors for leasing and sales.",
    page: "/multi-family",
    interest: "multi-family",
    tile: {
      featuredId: "0198ec33-a7a8-7362-b1e9-2b62ef5cafb5",
      alt: "Brick apartment building on Reservoir Road in Little Rock, Arkansas",
    },
  },
  {
    slug: "commercial",
    cat: "commercial",
    name: "commercial",
    title: "Commercial",
    blurb: "Retail centers, restaurants, offices and institutional buildings, ground level and aerial.",
    page: "/commercial",
    interest: "commercial",
    tile: {
      featuredId: "019b7197-4e20-73cd-b3ea-de174b503ac0",
      alt: "Front of a historic three-story brick office building on Scott Street in downtown Little Rock, Arkansas",
    },
  },
  {
    slug: "lot-land",
    cat: "lot-land",
    name: "lot and land",
    title: "Lot and Land",
    blurb: "Parcels, acreage and development sites from the air, with boundaries drawn where we have them.",
    page: "/lot-land",
    interest: "lot-land",
    tile: {
      featuredId: "019d91ea-1390-7090-92d8-adeae5cf6cb5",
      alt: "Low aerial of a golf course lot in Hot Springs, Arkansas, with the parcel outlined",
    },
  },
  {
    slug: "builders",
    cat: "builder-new-construction",
    name: "new construction",
    title: "Builders",
    blurb: "New construction and model homes for builders: the finished product, ready to sell.",
    page: "/builders",
    interest: "builders",
    tile: {
      featuredId: "019e2934-7038-71a1-8ce9-70ff2e77659a",
      alt: "Front exterior of a newly built brick home in Beebe, Arkansas",
    },
  },
];

const items = curated as GalleryItem[];
const homes = featured as FeaturedHome[];

export function galleryVertical(slug: string): GalleryVertical | undefined {
  return GALLERY_VERTICALS.find((v) => v.slug === slug);
}

export function projectsFor(cat: string): GalleryItem[] {
  return items.filter((i) => i.cat === cat);
}

export function featuredFor(cat: string): FeaturedHome[] {
  return homes.filter((h) => h.cat === cat);
}

export type TileImage = { src: string; srcSet?: string; alt: string };

export function tileFor(v: GalleryVertical): TileImage {
  if (v.tile.featuredId) {
    const home = homes.find((h) => h.id === v.tile.featuredId);
    const cover = home?.images[0];
    if (cover) {
      return {
        src: cover.medium ?? cover.url,
        srcSet: cover.medium
          ? `${cover.thumb} 300w, ${cover.medium} 1024w`
          : undefined,
        alt: v.tile.alt,
      };
    }
  }
  return { src: v.tile.src ?? "", alt: v.tile.alt };
}
