import type { VideoSample } from "@/components/video-samples";

// 30 second web cuts of delivered films and reels, picked by Thomas on
// 2026-10-23. Every cut was read frame by frame for street addresses and
// house numbers; filenames and alt text name the style and city only.

const film = (slug: string, alt: string): VideoSample => ({ src: `/videos/${slug}.mp4`, poster: `/videos/${slug}.jpg`, alt });

export const films = {
  villa: film("film-modern-villa-pool", "Cinematic film of a white modern villa with a pool and glass rail, Little Rock"),
  glassHouse: film("film-glass-house-woods", "Cinematic film of a glass walled house in the woods, Little Rock"),
  modernSunset: film("film-modern-build-sunset", "Cinematic film of a modern new build at sunset, Little Rock"),
  sculptedModern: film("film-sculpted-modern-golf", "Cinematic film of a modern home with a sculpted feature wall on a golf course, Cabot"),
  riverAcreage: film("film-river-valley-acreage", "Cinematic film of a river valley acreage estate, Little Rock"),
  greekRevival: film("film-greek-revival-mansion", "Cinematic film of a Greek Revival mansion, Little Rock"),
  farmhouseAcreage: film("film-farmhouse-acreage-golden-hour", "Cinematic film of a modern farmhouse on acreage at golden hour, Alexander"),
  whiteFarmhouse: film("film-white-modern-farmhouse", "Cinematic film of a white modern farmhouse new build, Alexander"),
  craftsman: film("film-modern-craftsman", "Cinematic film of a modern craftsman new build, Alexander"),
  apartments: film("film-apartment-community", "Cinematic film of an apartment community with an amenity pool, Little Rock"),
  lakeHome: film("film-lake-home-dock", "Cinematic film of a lake home with a dock and pavilion, Hot Springs Village"),
  lakePavilion: film("film-lake-pavilion-dock", "Cinematic film of a lake pavilion and dock, Hot Springs Village"),
  twilightEstate: film("film-twilight-estate", "Cinematic film of an estate at twilight with a sunset drone shot, Little Rock"),
  poolEstate: film("film-pool-house-estate", "Cinematic film of an estate with a pool house, hosted by the listing agent, Little Rock"),
  stoneModern: film("film-stone-modern-overhang", "Cinematic film of a stone modern home with a deep overhang and hot tub, Little Rock"),
  craftsmanTrees: film("film-craftsman-in-the-trees", "Cinematic film of a craftsman home in the trees, Benton"),
  whiteColonial: film("film-white-colonial", "Cinematic film of a white colonial home, hosted by the listing agent, Little Rock"),
  farmland: film("film-farmland-ponds", "Drone film of farmland with ponds, Cabot"),
  pasture: film("film-pasture-timber", "Drone film of pasture and timber with a pond, Austin"),
  lakeLand: film("film-lake-shoreline-land", "Drone film of wooded lake shoreline land, Malvern"),
  renderedBuild: film("film-rendered-build-lot", "Drone film of a cleared commercial lot with a rendered building preview, Benton"),
  commercialBuilding: film("film-modern-commercial-building", "Drone film of a modern four story commercial building, North Little Rock"),
  commercialAcreage: film("film-commercial-acreage-interchange", "Drone film of commercial acreage at an interstate interchange, Little Rock"),
  salonSuites: film("film-salon-suites", "Film of a salon suites interior with tenants at work, North Little Rock"),
};

export const reels = {
  cabin: film("reel-cabin-on-stilts", "Listing reel of a modern cabin on stilts at dusk, Little Rock"),
  lakeModern: film("reel-glass-modern-lake", "Listing reel of a glass modern home over the lake, Hot Springs"),
  greekRevival: film("reel-greek-revival-mansion", "Listing reel of a Greek Revival mansion, Little Rock"),
  townhomes: film("reel-townhome-community", "Listing reel of a golf course townhome community with a pool, Little Rock"),
  poolReveal: film("reel-pool-home-reveal", "Listing reel of a pool home, Little Rock"),
  neighborhood: film("reel-neighborhood-wood-ceilings", "Listing reel of a neighborhood from the air and wood ceilings inside, Little Rock"),
  whiteFarmhouse: film("reel-white-modern-farmhouse", "Listing reel of a white modern farmhouse new build, Alexander"),
  craftsman: film("reel-modern-craftsman", "Listing reel of a modern craftsman new build, Alexander"),
  historicHome: film("reel-historic-home-pool", "Listing reel of a historic home with a pool, Little Rock"),
  threeStoryModern: film("reel-three-story-modern", "Listing reel of a three story modern new build, hosted by the agent, Little Rock"),
};

export type PortfolioVertical = "real-estate" | "builders" | "lot-land" | "commercial" | "airbnb-rentals" | "zillow-showcase";

export const portfolioVideos: Record<PortfolioVertical, { eyebrow: string; title: string; subtitle: string; films: VideoSample[]; reels: VideoSample[]; note?: string }> = {
  "real-estate": {
    eyebrow: "Listing Films",
    title: "Films and reels from homes we delivered.",
    subtitle: "Real Arkansas listings.",
    films: [films.villa, films.glassHouse, films.modernSunset, films.sculptedModern, films.riverAcreage, films.greekRevival, films.poolEstate, films.stoneModern, films.craftsmanTrees, films.whiteColonial],
    reels: [reels.lakeModern, reels.greekRevival, reels.poolReveal, reels.neighborhood, reels.historicHome],
  },
  builders: {
    eyebrow: "Builder Films",
    title: "New construction, on film.",
    subtitle: "Delivered for Arkansas builders.",
    films: [films.modernSunset, films.farmhouseAcreage, films.whiteFarmhouse, films.craftsman],
    reels: [reels.neighborhood, reels.whiteFarmhouse, reels.craftsman, reels.threeStoryModern],
  },
  "lot-land": {
    eyebrow: "Land Films",
    title: "Raw land, from the air.",
    subtitle: "Farms, acreage and lots we flew.",
    films: [films.farmland, films.pasture, films.lakeLand, films.renderedBuild],
    reels: [],
    note: "The last film adds a rendered building to a cleared lot to show buyers what the site can hold. The building is a preview, not a finished structure.",
  },
  commercial: {
    eyebrow: "Commercial Films",
    title: "Commercial property, on film.",
    subtitle: "Buildings, land and tenant spaces.",
    films: [films.commercialBuilding, films.commercialAcreage, films.salonSuites],
    reels: [],
  },
  "airbnb-rentals": {
    eyebrow: "Rental Films",
    title: "Stays worth booking.",
    subtitle: "Cabins, lake homes and glass houses.",
    films: [films.glassHouse, films.lakeHome, films.lakePavilion],
    reels: [reels.cabin, reels.lakeModern],
  },
  "zillow-showcase": {
    eyebrow: "Showcase Film",
    title: "A film made for a Showcase listing.",
    subtitle: "Twilight exterior, sunset drone.",
    films: [films.twilightEstate],
    reels: [],
  },
};

/** Booking page and home page sets: the hangar film stays, plus the two picked films and three picked reels. */
export const bookingFilms: VideoSample[] = [
  { src: "/images/services/video-tours/tour-1.mp4", poster: "/images/services/video-tours/tour-1-poster.jpg", alt: "Cinematic film of a hangar home, Clinton" },
  films.villa,
  films.glassHouse,
];
export const bookingReels: VideoSample[] = [reels.cabin, reels.lakeModern, reels.greekRevival];

/** Multi-family Community Portfolio. */
export const multiFamilyVideos = { films: [films.apartments], reels: [reels.townhomes] };
