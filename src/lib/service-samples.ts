import type { SingleService } from "./size-tiers";

export type SampleServiceKey = "photos" | "video" | "drone" | "zillow3d" | "floorPlan" | "reel" | "twilight";

export const serviceSamples: Record<SampleServiceKey, Pick<SingleService, "blurb" | "samples">> = {
  photos: {
    blurb: "Bright, true-to-life photos of every room and the outside, ready for the MLS, print and social.",
    samples: [
      { kind: "image", src: "/images/services/photos/great-room-beams-little-rock.jpg", alt: "Beamed great room with a vaulted ceiling in a Little Rock home, photographed for the listing" },
      { kind: "image", src: "/images/services/photos/white-kitchen-little-rock.jpg", alt: "White kitchen in a Little Rock home, photographed for the listing" },
      { kind: "image", src: "/images/services/photos/styled-bedroom.jpg", alt: "Styled bedroom photographed for a home listing" },
    ],
  },
  video: {
    blurb: "A walkthrough film with smooth camera moves and music, made for the MLS, YouTube and social.",
    samples: [
      { kind: "video", src: "/images/services/video-tours/tour-1.mp4", poster: "/images/services/video-tours/tour-1-poster.jpg", alt: "Cinematic Tour, Clinton" },
      { kind: "video", src: "/videos/film-modern-villa-pool.mp4", poster: "/videos/film-modern-villa-pool.jpg", alt: "Cinematic Tour, Little Rock" },
      { kind: "video", src: "/videos/film-glass-house-woods.mp4", poster: "/videos/film-glass-house-woods.jpg", alt: "Cinematic Tour with the agent, Little Rock" },
    ],
  },
  drone: {
    blurb: "Photos and video from above that show the lot, the roofline and what is nearby.",
    samples: [
      { kind: "image", src: "/images/services/drone/aerial-ranch.jpg", alt: "Aerial view of a ranch home and its surrounding lot" },
      { kind: "image", src: "/images/services/drone/lakefront-home-aerial-hot-springs.jpg", alt: "Aerial view of a lakefront home in Hot Springs, Arkansas, with the water and ridgeline behind it" },
    ],
  },
  zillow3d: {
    blurb: "Buyers walk the home room by room on Zillow, with a floor plan Zillow builds from the same scan.",
    samples: [
      { kind: "video", src: "/images/services/3d-tours/tour3d-1.mp4", poster: "/images/services/3d-tours/tour3d-1-poster.jpg", alt: "Walk Through Room to Room" },
      { kind: "image", src: "/images/zillow-showcase/benton-floor-plan.jpg", alt: "Zillow floor plan with room dimensions for a new construction home in Benton, Arkansas", contain: true },
    ],
  },
  floorPlan: {
    blurb: "A clean, measured layout of every room for the MLS and flyers.",
    samples: [
      { kind: "image", src: "/images/services/floor-plans/floor-plan-2d-single-story.jpg", alt: "2D floor plan of a single story home with room dimensions and total square footage", contain: true },
    ],
  },
  reel: {
    blurb: "A short vertical video made for Instagram, Facebook and TikTok.",
    samples: [
      { kind: "video", src: "/videos/reel-cabin-on-stilts.mp4", poster: "/videos/reel-cabin-on-stilts.jpg", alt: "Listing Reel, Little Rock", vertical: true },
      { kind: "video", src: "/videos/reel-glass-modern-lake.mp4", poster: "/videos/reel-glass-modern-lake.jpg", alt: "Listing Reel with the agent, Hot Springs", vertical: true },
      { kind: "video", src: "/videos/reel-greek-revival-mansion.mp4", poster: "/videos/reel-greek-revival-mansion.jpg", alt: "Listing Reel, historic Little Rock", vertical: true },
    ],
  },
  twilight: {
    blurb: "We shoot at dusk with the lights on, for the photo that stops the scroll.",
    samples: [
      { kind: "image", src: "/images/services/photos/twilight-exterior-little-rock.jpg", alt: "Twilight exterior of a Little Rock listing with the windows glowing" },
    ],
  },
};
