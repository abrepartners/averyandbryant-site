import type { Vertical } from "./order-forms";

export type ValueItem = {
  label: string;
  value: string;
  isBonus?: boolean;
};

/** How a price is charged. Shown beside the price on every package card. */
export type PriceBasis =
  | "per shoot"
  | "one-time"
  | "starting at"
  | "per month"
  | "per person"
  | "per session";

export type Package = {
  name: string;
  price: string;
  tag: string;
  recommended?: boolean;
  /** Plain-language fit line shown above the package name. */
  bestFor?: string;
  /** Price basis shown beside the price. */
  priceBasis?: PriceBasis;
  /** Three or four decisive inclusions with their real totals. */
  keyInclusions?: string[];
  /** One line: the meaningful difference from the next smaller option. */
  stepUp?: string;
  /**
   * "call" sends the card's CTA to the consult calendar instead of the order
   * form. Every monthly or ongoing program is call-based, never self-serve.
   */
  ctaMode?: "order" | "call";
  ctaLabel?: string;
  valueItems: ValueItem[];
  totalValue: string;
  savings: string;
};

export type EnhancementPack = {
  name: string;
  price: string;
  savedAmount: string;
  items: string[];
  pairsWith: string;
  /** Shown under the items when inclusions are still being confirmed. */
  note?: string;
};

export type AddOn = {
  title: string;
  price: string;
};

export type Guarantee = {
  name: string;
  text: string;
};

export type VerticalPricing = {
  vertical: Vertical;
  packages: Package[];
  enhancementPacks?: EnhancementPack[];
  addOns: AddOn[];
  guarantee: Guarantee;
  scarcity?: string;
};

// ─── Real Estate ─────────────────────────────────────────────
export const realEstatePricing: VerticalPricing = {
  vertical: "real-estate",
  guarantee: {
    name: "Satisfaction Reshoot Guarantee",
    text: "Not happy with your media? Tell us within 7 days of delivery and we'll reshoot it free. “Not happy” means an issue with our work: exposure, color, composition, or a missed shot from your agreed shot list. It doesn't cover property condition, weather, or changes made to the home after the shoot.",
  },
  scarcity:
    "We partner with 5 new agents per month to protect our 48-hour turnaround.",
  packages: [
    {
      name: "Listing Launch Kit",
      price: "From $299",
      tag: "Market-ready in 48 hours",
      bestFor: "Getting a listing live with photos, a floor plan and the MLS extras",
      priceBasis: "starting at",
      keyInclusions: [
        "25+ HDR photos",
        "2D floor plan",
        "3 social graphics (Just Listed, Open House, Price Drop)",
        "MLS-ready property description",
      ],
      valueItems: [
        { label: "25+ HDR Professional Photos", value: "$185" },
        { label: "2D Floor Plan", value: "$99" },
        {
          label: "3 Social Graphics (Just Listed / Open House / Price Drop)",
          value: "$149",
          isBonus: true,
        },
        {
          label: "MLS-Ready Property Description",
          value: "$75",
          isBonus: true,
        },
        {
          label: "48-Hour Photo Delivery Guarantee",
          value: "$99",
          isBonus: true,
        },
        {
          label: "Weather Protection (free reschedule)",
          value: "$99",
          isBonus: true,
        },
      ],
      totalValue: "$706",
      savings: "Save $407",
    },
    {
      name: "Listing Domination System",
      price: "From $499",
      tag: "Most popular",
      recommended: true,
      bestFor:
        "Showing the whole property and its surroundings: aerials, a 3D tour and one reel",
      priceBasis: "starting at",
      keyInclusions: [
        "40+ HDR photos",
        "Aerial drone photos + video",
        "3D virtual tour",
        "1 Cinematic Listing Reel",
      ],
      stepUp:
        "Adds to the Launch Kit: 15 more photos, drone, the 3D tour, one reel and the Seller Wow Report.",
      valueItems: [
        { label: "Everything in Listing Launch Kit", value: "$706" },
        { label: "Upgrade to 40+ HDR Photos", value: "$30" },
        { label: "Aerial Drone Photos + Video", value: "$150" },
        { label: "3D Virtual Tour", value: "$299" },
        { label: "1 Cinematic Listing Reel", value: "$195" },
        {
          label:
            "Seller Wow Report, branded PDF of all marketing for your seller",
          value: "$99",
          isBonus: true,
        },
      ],
      totalValue: "$1,479",
      savings: "Save $980",
    },
    {
      name: "Market Takeover Blueprint",
      price: "From $849",
      tag: "Every listing is an event",
      bestFor:
        "Running a full launch campaign: cinematic video, four reels, staging and a property website",
      priceBasis: "starting at",
      keyInclusions: [
        "Cinematic property video (60 to 90s)",
        "4 reels total: Cinematic Listing, Trailer-style (:10 to :15), Viral-style (with the realtor), Lifestyle (neighborhood)",
        "Virtual staging (3 rooms)",
        "Single-property website",
      ],
      stepUp:
        "Adds to Domination: the cinematic video, three more reels (4 total), 3 staged rooms, a property website and 2 presentation graphics.",
      // Ruling (Thomas, 2026-09-21): Takeover carries exactly four reels. The
      // Cinematic Listing Reel is inherited from Domination; the other three
      // are listed here. Never present this as 5 reels.
      // TODO(catalog): the $595 value below is the 4-Reel Social Pack list
      // price. Domination's reel is already counted at $195, so totalValue and
      // savings may overstate by up to $195 until the catalog confirms.
      valueItems: [
        {
          label: "Everything in Listing Domination System",
          value: "$1,479",
        },
        { label: "Cinematic Property Video (60-90s)", value: "$295" },
        {
          label:
            "3 more reels: Trailer-style (:10 to :15), Viral-style (with the realtor), Lifestyle (neighborhood). 4 reels total with the Cinematic Listing Reel",
          value: "$595",
        },
        { label: "Virtual Staging (3 rooms)", value: "$147" },
        {
          label: "Single-Property Website",
          value: "$149",
          isBonus: true,
        },
        {
          label: "Agent Brand Boost: 2 listing presentation graphics",
          value: "$99",
          isBonus: true,
        },
      ],
      totalValue: "$2,764",
      savings: "Save $1,915",
    },
  ],
  enhancementPacks: [
    {
      name: "Visual Impact Pack",
      price: "$249",
      savedAmount: "$54",
      items: [
        "Virtual Staging (3 rooms)",
        "Virtual Twilight (3 images)",
        "Proximity Map",
      ],
      pairsWith: "Listing Launch Kit or Listing Domination System",
    },
    {
      // Ruling (Thomas, 2026-09-21): the pack stays at $695 and lists only what
      // it ADDS beyond the Listing Launch Kit. Launch already carries 3 social
      // graphics and the MLS-ready description, so those are not repeated.
      // TODO(catalog): confirm pack contents. The catalog listed "3 Branded
      // Social Graphics", which may or may not differ from the Launch set, so
      // the graphics line is held back behind a "confirming" note. The saved
      // amount is blank until the incremental scope is confirmed.
      name: "Social Domination Pack",
      price: "$695",
      savedAmount: "",
      items: ["4-Reel Social Pack (4 reels)"],
      note: "Confirming inclusions: the Launch Kit already includes 3 social graphics and a property description, so this pack lists only what it adds.",
      pairsWith: "Listing Launch Kit",
    },
    {
      name: "Full Tour Experience",
      price: "$399",
      savedAmount: "$49",
      items: ["3D Virtual Tour", "3D Rendered Floor Plan"],
      pairsWith: "Listing Launch Kit",
    },
    {
      name: "Twilight Upgrade",
      price: "$295",
      savedAmount: "$67",
      items: [
        "Real Twilight Shoot",
        "3 Virtual Twilight Images (additional angles)",
      ],
      pairsWith: "Any tier",
    },
  ],
  addOns: [
    { title: "Cinematic Property Video", price: "From $295" },
    { title: "Social Reel (single)", price: "$195" },
    { title: "Reels Pack (4 reels)", price: "$595" },
    { title: "Drone Photos + Video", price: "$150" },
    { title: "3D Virtual Tour", price: "$299" },
    { title: "2D Floor Plan", price: "$99" },
    { title: "3D Floor Plan", price: "$149" },
    { title: "Virtual Staging", price: "$49/room" },
    { title: "Real Twilight Shoot", price: "$245" },
    { title: "Virtual Twilight", price: "$39/image" },
    { title: "Proximity Map", price: "$39" },
    { title: "Rush Delivery (6hr)", price: "$100" },
  ],
};

// ─── Builders ────────────────────────────────────────────────
export const buildersPricing: VerticalPricing = {
  vertical: "builders",
  guarantee: {
    name: "Satisfaction Reshoot Guarantee",
    text: "Not happy with your media? Tell us within 7 days of delivery and we'll reshoot it free. “Not happy” means an issue with our work: exposure, color, composition, or a missed shot from your agreed shot list. It doesn't cover site conditions, weather, or changes made to the property after the shoot.",
  },
  packages: [
    {
      name: "Build Tracker",
      price: "$325/mo",
      tag: "Ongoing construction documentation",
      bestFor:
        "Builders who need consistent progress documentation on an active site, every month",
      priceBasis: "per month",
      keyInclusions: [
        "Monthly progress photo set (drone + ground)",
        "30-second aerial update video",
        "Monthly progress PDF report",
        "2 before/after comparison graphics",
      ],
      stepUp:
        "A monthly program, not a one-time shoot. Scope, sites and cadence are set on a call.",
      ctaMode: "call",
      ctaLabel: "Plan a program call",
      valueItems: [
        { label: "Monthly Progress Photo Set (drone + ground)", value: "$295" },
        { label: "Aerial Update Video (30s flyover)", value: "$150" },
        {
          label: "Monthly Progress PDF Report",
          value: "$99",
          isBonus: true,
        },
        {
          label: "2 Before/After Comparison Graphics",
          value: "$75",
          isBonus: true,
        },
        {
          label: "Construction Milestone Social Graphic",
          value: "$49",
          isBonus: true,
        },
      ],
      totalValue: "$668/mo",
      savings: "Save $343/mo",
    },
    {
      name: "Builder Marketing System",
      price: "$1,395",
      tag: "Most popular",
      recommended: true,
      bestFor:
        "Marketing one finished home or spec with photos, drone, video and reels",
      priceBasis: "per shoot",
      keyInclusions: [
        "40+ HDR photos",
        "Aerial drone photos + video",
        "Cinematic video (60 to 90s)",
        "4-reel social pack + 2D floor plan",
      ],
      stepUp:
        "A one-time finished-home shoot, separate from the monthly Build Tracker program.",
      valueItems: [
        { label: "40+ HDR Photos", value: "$215" },
        { label: "Aerial Drone Photos + Video", value: "$150" },
        { label: "Cinematic Video (60-90s)", value: "$295" },
        { label: "4-Reel Social Pack", value: "$595" },
        { label: "2D Floor Plan", value: "$99" },
        {
          label: "3 Social Graphics (Now Selling / Model Open / Feature)",
          value: "$149",
          isBonus: true,
        },
        {
          label: "Development Brochure Page, branded PDF",
          value: "$149",
          isBonus: true,
        },
        {
          label: "Builder Logo Watermark on All Images",
          value: "$49",
          isBonus: true,
        },
      ],
      totalValue: "$1,701",
      savings: "Save $306",
    },
    {
      name: "Model Home Launch Blueprint",
      price: "$1,895",
      tag: "The full launch experience",
      bestFor:
        "Launching a model home or development with a 3D tour, staging, twilight and a sales kit",
      priceBasis: "per shoot",
      keyInclusions: [
        "Everything in Builder Marketing System",
        "3D virtual tour",
        "Virtual staging (3 rooms)",
        "Real twilight hero shot",
      ],
      stepUp:
        "Adds to Builder Marketing System: the 3D tour, 3 staged rooms, twilight, a property website and a 5-slide sales kit.",
      valueItems: [
        { label: "Everything in Builder Marketing System", value: "$1,701" },
        { label: "3D Virtual Tour", value: "$299" },
        { label: "Virtual Staging (3 rooms)", value: "$147" },
        { label: "Real Twilight Hero Shot", value: "$245" },
        {
          label: "Single-Property Website",
          value: "$149",
          isBonus: true,
        },
        {
          label: "Sales Center Presentation Kit: 5 slides",
          value: "$199",
          isBonus: true,
        },
      ],
      totalValue: "$2,740",
      savings: "Save $845",
    },
  ],
  addOns: [
    { title: "Single Visit (progress photos + drone)", price: "$295" },
    { title: "Cinematic Property Video", price: "From $295" },
    { title: "3D Virtual Tour", price: "$299" },
    { title: "Virtual Staging", price: "$49/room" },
    { title: "Real Twilight Shoot", price: "$245" },
    { title: "Social Reel (single)", price: "$195" },
  ],
};

// ─── Airbnb / STR ────────────────────────────────────────────
export const airbnbPricing: VerticalPricing = {
  vertical: "airbnb-rentals",
  guarantee: {
    name: "Satisfaction Reshoot Guarantee",
    text: "Not happy with your media? Tell us within 7 days of delivery and we'll reshoot it free. “Not happy” means an issue with our work: exposure, color, composition, or a missed space from your agreed shot list. It doesn't cover property condition, weather, or changes made to the rental after the shoot.",
  },
  packages: [
    {
      name: "Revenue Ready Kit",
      price: "From $449",
      tag: "Get booked faster",
      bestFor: "Launching or refreshing one listing's photos",
      priceBasis: "starting at",
      keyInclusions: [
        "25 to 30 HDR photos",
        "2D floor plan",
        "Airbnb photo sequencing guide",
        "Listing description written for Airbnb search",
      ],
      valueItems: [
        { label: "25-30 HDR Photos", value: "$185" },
        { label: "2D Floor Plan", value: "$99" },
        {
          label: "Airbnb Photo Sequencing Guide",
          value: "$99",
          isBonus: true,
        },
        {
          label: "3 Social Graphics (Now Booking / Seasonal / Review)",
          value: "$149",
          isBonus: true,
        },
        {
          label: "Listing Description Written for Airbnb SEO",
          value: "$75",
          isBonus: true,
        },
        {
          label: "6-Month Seasonal Refresh Reminder",
          value: "Free",
          isBonus: true,
        },
      ],
      totalValue: "$607",
      savings: "Save $158",
    },
    {
      name: "Revenue Boost System",
      price: "$695",
      tag: "Most popular",
      recommended: true,
      bestFor:
        "Showing the amenities, the setting and the property from the air, plus one reel",
      priceBasis: "per shoot",
      keyInclusions: [
        "40 HDR photos",
        "Aerial drone photos + video",
        "1 social reel (property walkthrough)",
        "Guest experience shot list (amenity highlights)",
      ],
      stepUp:
        "Adds to Revenue Ready: 10 to 15 more photos, drone, one reel and the amenity shot list.",
      valueItems: [
        { label: "Everything in Revenue Ready Kit", value: "$607" },
        { label: "Upgrade to 40 Photos", value: "$30" },
        { label: "Aerial Drone Photos + Video", value: "$150" },
        { label: "1 Social Reel (property walkthrough)", value: "$195" },
        {
          label: "Guest Experience Shot List: amenity highlights",
          value: "$99",
          isBonus: true,
        },
      ],
      totalValue: "$1,081",
      savings: "Save $386",
    },
    {
      name: "5-Star Showcase Blueprint",
      price: "$1,095",
      tag: "Video and social content",
      bestFor:
        "Building video and social content for direct bookings, on top of the listing photos",
      priceBasis: "per shoot",
      keyInclusions: [
        "Cinematic video tour (60s)",
        "4-reel social pack",
        "Virtual staging (3 rooms)",
        "Superhost marketing kit graphics",
      ],
      // TODO(catalog): confirm the total reel count when the 4-reel pack sits
      // on top of Revenue Boost's single reel (4 or 5). Copy avoids a total.
      stepUp:
        "Adds to Revenue Boost: the cinematic tour, the 4-reel social pack, 3 staged rooms and the marketing kit.",
      valueItems: [
        { label: "Everything in Revenue Boost System", value: "$1,081" },
        { label: "Cinematic Video Tour (60s)", value: "$295" },
        { label: "4-Reel Social Pack", value: "$595" },
        { label: "Virtual Staging (3 rooms)", value: "$147" },
        {
          label: "Superhost Marketing Kit, branded graphics",
          value: "$149",
          isBonus: true,
        },
        {
          label: "Property Guidebook Cover Photo",
          value: "$49",
          isBonus: true,
        },
      ],
      totalValue: "$2,316",
      savings: "Save $1,221",
    },
  ],
  addOns: [
    { title: "Cinematic Video Tour", price: "From $295" },
    { title: "Social Reel (single)", price: "$195" },
    { title: "Drone Photos + Video", price: "$150" },
    { title: "3D Virtual Tour", price: "$299" },
    { title: "Virtual Staging", price: "$49/room" },
    { title: "2D Floor Plan", price: "$99" },
  ],
};

// ─── Lot & Land ──────────────────────────────────────────────
export const lotLandPricing: VerticalPricing = {
  vertical: "lot-land",
  guarantee: {
    name: "Satisfaction Reshoot Guarantee",
    text: "Not happy with your media? Tell us within 7 days of delivery and we'll reshoot it free. “Not happy” means an issue with our work: exposure, color, composition, or a missed angle from your agreed shot list. It doesn't cover land conditions, weather, or seasonal changes after the shoot.",
  },
  packages: [
    {
      // Renamed from the old survey-named kit (ruling 2026-09-21): this is marketing
      // media, not a survey. TODO(catalog): rename the matching Aryeo product.
      name: "Aerial Parcel Kit",
      price: "$249",
      tag: "Essential aerial coverage",
      bestFor: "Showing the parcel and its access from the air",
      priceBasis: "per shoot",
      keyInclusions: [
        "8 aerial drone photos",
        "Proximity map",
        "MLS-ready property description",
      ],
      valueItems: [
        { label: "8 Aerial Drone Photos", value: "$150" },
        { label: "Proximity Map", value: "$39", isBonus: true },
        {
          label: "Weather Protection (free reschedule)",
          value: "$49",
          isBonus: true,
        },
        {
          label: "MLS-Ready Property Description",
          value: "$75",
          isBonus: true,
        },
      ],
      totalValue: "$313",
      savings: "Save $64",
    },
    {
      name: "Land Marketing System",
      price: "$399",
      tag: "Most popular",
      recommended: true,
      bestFor:
        "Explaining boundaries and surroundings with overlays and a flyover",
      priceBasis: "per shoot",
      keyInclusions: [
        "10 aerial + ground shots",
        "2 boundary overlays (illustrative, from your boundary source)",
        "30-second drone flyover video",
        "2 social graphics",
      ],
      stepUp:
        "Adds to the Aerial Parcel Kit: ground shots, 2 boundary overlays, the flyover video and 2 graphics.",
      valueItems: [
        { label: "Everything in Aerial Parcel Kit", value: "$313" },
        { label: "Upgrade to 10 Aerial + Ground Shots", value: "$75" },
        { label: "2 Boundary Overlays", value: "$99" },
        { label: "Drone Flyover Video (30s)", value: "$150" },
        {
          label: "2 Social Graphics (Just Listed / Acreage Feature)",
          value: "$99",
          isBonus: true,
        },
      ],
      totalValue: "$736",
      savings: "Save $337",
    },
    {
      name: "Vision Blueprint",
      price: "$649",
      tag: "Full aerial + video coverage",
      bestFor:
        "Larger or scenic parcels that need a longer cinematic flyover and a buyer kit",
      priceBasis: "per shoot",
      keyInclusions: [
        "Everything in Land Marketing System",
        "60-second cinematic drone video",
        "Neighborhood context shots",
        "Buyer Decision Kit PDF (aerials + boundaries)",
      ],
      stepUp:
        "Adds to Land Marketing System: the 60-second cinematic flyover, context shots and the PDF kit.",
      valueItems: [
        { label: "Everything in Land Marketing System", value: "$736" },
        { label: "Extended Drone Video (60s cinematic)", value: "$200" },
        {
          label: "Neighborhood Context Shots",
          value: "$99",
          isBonus: true,
        },
        {
          label: "Buyer Decision Kit: PDF with aerials + boundaries",
          value: "$99",
          isBonus: true,
        },
      ],
      totalValue: "$1,134",
      savings: "Save $485",
    },
    {
      name: "Dream Home Vision",
      price: "$995",
      tag: "AI-rendered home visualization",
      bestFor:
        "Illustrating a possible home on the lot with clearly labeled concept renderings",
      priceBasis: "per shoot",
      keyInclusions: [
        "Everything in Vision Blueprint",
        "Concept rendering of a home on the lot (Vellum), labeled as a concept",
        "2 additional rendering angles",
        "Single-property website with the renderings",
      ],
      stepUp:
        "Adds to Vision Blueprint: 3 concept rendering angles, a website and a developer pitch page.",
      valueItems: [
        { label: "Everything in Vision Blueprint", value: "$1,134" },
        { label: "AI Rendering: Home on the Lot (Vellum)", value: "$295" },
        { label: "2 Additional AI Rendering Angles", value: "$295" },
        {
          label: "Single-Property Website with Renderings",
          value: "$149",
          isBonus: true,
        },
        {
          label: "Developer Pitch Page, branded PDF",
          value: "$149",
          isBonus: true,
        },
      ],
      totalValue: "$2,022",
      savings: "Save $1,027",
    },
  ],
  addOns: [
    { title: "Boundary Overlays (up to 2)", price: "$99" },
    { title: "Drone Flyover Video", price: "$150" },
    { title: "AI Home Rendering (Vellum)", price: "$295" },
    { title: "Proximity Map", price: "$39" },
    { title: "Virtual Twilight", price: "$39/image" },
  ],
};

// ─── Multi-Family ────────────────────────────────────────────
export const multiFamilyPricing: VerticalPricing = {
  vertical: "multi-family",
  guarantee: {
    name: "Satisfaction Reshoot Guarantee",
    text: "Not happy with your media? Tell us within 7 days of delivery and we'll reshoot it free. “Not happy” means an issue with our work: exposure, color, composition, or a missed unit or amenity from your agreed shot list. It doesn't cover property condition, weather, or changes made on-site after the shoot.",
  },
  packages: [
    {
      name: "Leasing Launch Kit",
      price: "$995",
      tag: "Essential leasing media",
      bestFor:
        "Refreshing one community: a model unit, the amenities, aerials and a 3D tour",
      priceBasis: "one-time",
      keyInclusions: [
        "Model unit photography (25+ HDR)",
        "Amenity and common area coverage",
        "Aerial drone photos + video",
        "3D virtual tour (model unit)",
      ],
      valueItems: [
        { label: "Model Unit Photography (25+ HDR)", value: "$185" },
        { label: "Amenity & Common Area Coverage", value: "$199" },
        { label: "Aerial Drone Photos + Video", value: "$150" },
        { label: "3D Virtual Tour (model unit)", value: "$299" },
        {
          label: "3 Social Graphics (Now Leasing / Open House / Tour CTA)",
          value: "$149",
          isBonus: true,
        },
        {
          label: "Leasing Agent Presentation: 5 slides",
          value: "$149",
          isBonus: true,
        },
        { label: "Unit Floor Plan", value: "$99", isBonus: true },
      ],
      totalValue: "$1,230",
      savings: "Save $235",
    },
    {
      name: "Full Property Command",
      price: "$1,695",
      tag: "Most popular",
      recommended: true,
      bestFor:
        "A lease-up or expansion with up to 3 unit types, cinematic drone video and reels",
      priceBasis: "one-time",
      keyInclusions: [
        "Everything in Leasing Launch Kit",
        "Multi-unit photography (up to 3 types)",
        "Cinematic drone video (60s)",
        "4-reel social pack + floor plans per unit type",
      ],
      stepUp:
        "Adds to Leasing Launch Kit: up to 3 unit types, cinematic drone video, 4 reels, per-type floor plans and a 10-page marketing deck.",
      valueItems: [
        { label: "Everything in Leasing Launch Kit", value: "$1,230" },
        { label: "Multi-Unit Photography (up to 3 types)", value: "$395" },
        { label: "Cinematic Drone Video (60s)", value: "$295" },
        { label: "4-Reel Social Pack", value: "$595" },
        { label: "Floor Plans Per Unit Type", value: "$199" },
        {
          label: "Property Marketing Deck: 10-page branded PDF",
          value: "$299",
          isBonus: true,
        },
      ],
      totalValue: "$3,013",
      savings: "Save $1,318",
    },
    {
      // Ruling (Thomas, 2026-09-21): $2,995 is a ONE-TIME services bundle, not
      // a monthly rate. Ongoing monthly content and an annual refresh are
      // program options quoted on a call, never a self-serve tier.
      name: "Leasing Domination Suite",
      price: "$2,995",
      tag: "Full community bundle",
      bestFor:
        "A full community launch that covers every unit type in one services bundle",
      priceBasis: "one-time",
      keyInclusions: [
        "Everything in Full Property Command",
        "All unit types covered",
        "Resident Spotlight template for social proof",
        "Google Business Profile photo optimization",
      ],
      stepUp:
        "Adds to Full Property Command: every unit type, the resident spotlight template and the Google profile set. Ongoing monthly content and an annual refresh are program options, quoted on a call.",
      // TODO(catalog): confirm the scope bound behind "All unit types covered"
      // (unit-type cap or custom-scope condition). Savings left blank until
      // the bundle scope is confirmed.
      valueItems: [
        { label: "Everything in Full Property Command", value: "$3,013" },
        { label: "All unit types covered", value: "Custom" },
        {
          label:
            "Program options, quoted on a call: ongoing monthly content (reels + seasonal), annual refresh",
          value: "Custom",
        },
        {
          label: "Resident Spotlight template for social proof",
          value: "$99",
          isBonus: true,
        },
        {
          label: "Google Business Profile photo optimization",
          value: "$99",
          isBonus: true,
        },
      ],
      totalValue: "$3,211+",
      savings: "",
    },
  ],
  addOns: [
    // Approved 2026-09-21: the flat $395 "Additional Unit Type Photography"
    // is retired in favor of unit pricing sized by square footage (from $165
    // per unit type). The call produces the exact number.
    {
      title: "Model Unit Photography (per unit type, sized by square footage)",
      price: "From $165",
    },
    { title: "Cinematic Property Video", price: "From $295" },
    { title: "3D Virtual Tour (per unit)", price: "$299" },
    { title: "Social Reel (single)", price: "$195" },
    { title: "Floor Plan (per type)", price: "$99" },
    { title: "Virtual Staging", price: "$49/room" },
  ],
};

// ─── Commercial ──────────────────────────────────────────────
export const commercialPackages: Package[] = [
  {
    name: "CRE Launch Package",
    price: "$995",
    tag: "Commercial listing essentials",
    bestFor:
      "Listing one commercial property with photos, aerials and a twilight hero",
    priceBasis: "one-time",
    keyInclusions: [
      "30+ HDR interior + exterior photos",
      "Aerial drone photos + video",
      "Real twilight hero shot",
      "Broker presentation kit (3 slides) + property brochure PDF",
    ],
    valueItems: [
      { label: "30+ HDR Interior + Exterior Photos", value: "$215" },
      { label: "Aerial Drone Photos + Video", value: "$150" },
      { label: "Real Twilight Hero Shot", value: "$245" },
      {
        label: "Broker Presentation Kit: 3 slides for OM/pitch books",
        value: "$199",
        isBonus: true,
      },
      {
        label: "Property Brochure PDF",
        value: "$149",
        isBonus: true,
      },
    ],
    totalValue: "$958",
    // At catalog prices the listed components total $958 against a $995
    // package price, so there is no bundle saving to state. Left blank
    // rather than printed, pending an owner ruling on the package price.
    savings: "",
  },
  {
    name: "CRE Command System",
    price: "$1,695",
    tag: "Full marketing suite",
    recommended: true,
    bestFor:
      "A full marketing suite with a walkthrough video, 3D tour, floor plan and a LinkedIn cut",
    priceBasis: "one-time",
    keyInclusions: [
      "Everything in CRE Launch Package",
      "Cinematic interior walkthrough (60 to 90s)",
      "3D virtual tour + 2D floor plan",
      "30-second investment highlight reel",
    ],
    stepUp:
      "Adds to CRE Launch: the walkthrough video, the 3D tour, the floor plan and the LinkedIn cut.",
    valueItems: [
      { label: "Everything in CRE Launch Package", value: "$958" },
      { label: "Cinematic Interior Walkthrough (60-90s)", value: "$295" },
      { label: "3D Virtual Tour", value: "$299" },
      { label: "2D Floor Plan", value: "$99" },
      {
        label: "Investment Highlight Reel: 30s LinkedIn cut",
        value: "$245",
        isBonus: true,
      },
    ],
    totalValue: "$1,896",
    savings: "Save $201",
  },
];

export const commercialSpecialty: Package[] = [
  {
    name: "Lot Command",
    price: "$995/mo",
    tag: "Dealership monthly program",
    bestFor:
      "Dealerships that need fresh lot, inventory and showroom content every month",
    priceBasis: "per month",
    keyInclusions: [
      "Monthly lot drone coverage",
      "Inventory photography (new arrivals)",
      "Showroom refresh photos",
      "Monthly social reel",
    ],
    stepUp:
      "A monthly program, not a one-time shoot. Inventory volume and cadence are set on a call.",
    ctaMode: "call",
    ctaLabel: "Plan a program call",
    valueItems: [
      { label: "Monthly Lot Drone Coverage", value: "$299" },
      { label: "Inventory Photography (new arrivals)", value: "$395" },
      { label: "Showroom Refresh Photos", value: "$199" },
      { label: "Monthly Social Reel", value: "$195" },
      {
        label: "2 Social Graphics (New Arrival / Sale Event)",
        value: "$99",
        isBonus: true,
      },
      {
        label: "Google Business Profile Photo Update",
        value: "$49",
        isBonus: true,
      },
    ],
    totalValue: "$1,236/mo",
    savings: "Save $241/mo",
  },
  {
    name: "Guest Experience Package",
    price: "$1,495",
    tag: "Hospitality & restaurants",
    bestFor:
      "Restaurants and hospitality that need rooms, food and ambience in one shoot",
    priceBasis: "one-time",
    keyInclusions: [
      "Interior photography (rooms, lobby, events)",
      "Food and ambience photography",
      "Exterior + twilight hero",
      "4-reel social pack",
    ],
    valueItems: [
      { label: "Interior Photography (rooms, lobby, events)", value: "$265" },
      { label: "Food & Ambience Photography", value: "$395" },
      { label: "Exterior + Twilight Hero", value: "$245" },
      { label: "4-Reel Social Pack", value: "$595" },
      {
        label: "Review-Ready Photo Set: Google/Yelp/TripAdvisor optimized",
        value: "$99",
        isBonus: true,
      },
      {
        label: "Menu/Event Space One-Sheet PDF",
        value: "$99",
        isBonus: true,
      },
    ],
    totalValue: "$1,698",
    savings: "Save $203",
  },
];

export const commercialGuarantee: Guarantee = {
  name: "Satisfaction Reshoot Guarantee",
  text: "Not happy with your media? Tell us within 7 days of delivery and we'll reshoot it free. “Not happy” means an issue with our work: exposure, color, composition, or a missed shot from your agreed shot list. It doesn't cover property condition, weather, or changes made to the site after the shoot.",
};

// ─── Branding ────────────────────────────────────────────────
// RULED 2026-09-17 by the owner: the branding page publishes exactly two
// prices. Headshot Session $95 (sold as batched studio days, $80 per person
// when 4 or more book the same block) and Brand Session $299 (the catalog's
// First Impression Kit renamed, same price, no new number invented).
// Content days, team days, retainers, brand video and on location work are
// consultations, not checkout buttons, so they carry no published price and
// live as plain-English explanations on src/app/branding/page.tsx.
// Do not reintroduce a branding price here without a new ruling.
export const brandingPackages: Package[] = [
  {
    name: "Headshot Session",
    price: "$95",
    tag: "On a scheduled headshot day",
    bestFor: "Refreshing one profile photo on a scheduled studio day",
    priceBasis: "per person",
    keyInclusions: [
      "30 minutes in the studio",
      "5 retouched images",
      "One clean studio backdrop",
      "$80 per person when 4 or more book the same block",
    ],
    valueItems: [
      { label: "30 minutes in the studio", value: "Included" },
      { label: "5 retouched images", value: "Included" },
      {
        label: "One clean studio backdrop, we walk you through the posing",
        value: "Included",
      },
      {
        label: "Files sized for your website, your profile, and social",
        value: "Included",
      },
      {
        label: "$80 per person when 4 or more book the same block",
        value: "Included",
      },
    ],
    totalValue: "",
    savings: "",
  },
  {
    name: "Brand Session",
    price: "$299",
    tag: "Several looks, several rooms",
    recommended: true,
    bestFor: "A varied image library you can post from for months",
    priceBasis: "per session",
    keyInclusions: [
      "60 to 75 minutes across The Spot and our office",
      "12 to 15 retouched images",
      "2 wardrobe looks",
      "Headshots plus working shots",
    ],
    stepUp:
      "Adds to the Headshot Session: more time, more rooms, a second look, and 12 to 15 images instead of 5.",
    valueItems: [
      { label: "60 to 75 minutes", value: "Included" },
      {
        label: "Shot across The Spot and the other areas of our office",
        value: "Included",
      },
      { label: "12 to 15 retouched images", value: "Included" },
      { label: "2 wardrobe looks", value: "Included" },
      {
        label: "Headshots plus working shots you can post from for months",
        value: "Included",
      },
    ],
    totalValue: "",
    savings: "",
  },
];

export const brandingGuarantee: Guarantee = {
  name: "Satisfaction Reshoot Guarantee",
  text: "Not happy with your headshots or brand media? Tell us within 7 days of delivery and we'll reshoot it free. “Not happy” means an issue with our work: exposure, color, retouching, or a missed look from your agreed shot list. It doesn't cover wardrobe, styling choices, or requests made after the session.",
};

// ─── The Spot, Studio Membership ────────────────────────────
// Tier names + prices mirror LIVE Stripe payment links (verified 2026-07-08):
//   Creator Lite $60/mo (metadata.tier "creator-lite"), Creator $100/mo
//   ("creator"), Pro $180/mo ("pro"). Names must match the
//   membershipSubscribeUrls keys in src/app/studio/page.tsx.
export const studioMemberships: Package[] = [
  {
    name: "Creator Lite",
    price: "$60/mo",
    tag: "Studio access + savings",
    priceBasis: "per month",
    valueItems: [
      { label: "10% Off All Studio Bookings", value: "~$50-100/mo" },
      { label: "4 Add-On Credits / Month", value: "$60" },
      {
        label: "Member-Only Late-Night Hours (9pm-midnight)",
        value: "$49",
        isBonus: true,
      },
      {
        label: "Basic Lighting Setup Consultation",
        value: "$99",
        isBonus: true,
      },
    ],
    totalValue: "$258+/mo",
    savings: "Save $198+/mo",
  },
  {
    name: "Creator",
    price: "$100/mo",
    tag: "Most popular",
    priceBasis: "per month",
    recommended: true,
    valueItems: [
      { label: "20% Off All Studio Bookings", value: "~$100-200/mo" },
      { label: "8 Add-On Credits / Month", value: "$120" },
      {
        label: "Member-Only Early + Late Hours",
        value: "$49",
        isBonus: true,
      },
      {
        label: "Monthly Creator Connect Networking Event",
        value: "$99",
        isBonus: true,
      },
      {
        label: "Equipment Access (lights, backdrops, audio)",
        value: "$75",
        isBonus: true,
      },
    ],
    totalValue: "$443+/mo",
    savings: "Save $343+/mo",
  },
  {
    name: "Pro",
    price: "$180/mo",
    tag: "Priority + engineer support",
    priceBasis: "per month",
    valueItems: [
      {
        label: "30% Off All Studio Bookings + Priority Booking",
        value: "~$150-300/mo",
      },
      { label: "16 Add-On Credits / Month", value: "$240" },
      { label: "Everything in Creator", value: "Included" },
      {
        label: "1 Free Engineer-Assisted Session / Month",
        value: "$149",
        isBonus: true,
      },
      {
        label: "Guest Pass (1/mo)",
        value: "$75",
        isBonus: true,
      },
    ],
    totalValue: "$614+/mo",
    savings: "Save $434+/mo",
  },
];

export const studioGuarantee: Guarantee = {
  name: "First Month Guarantee",
  text: "Try it for 30 days. If you don't book at least one session, we refund your first month, no questions asked.",
};
