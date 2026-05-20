import type { Vertical } from "./order-forms";

export type ValueItem = {
  label: string;
  value: string;
  isBonus?: boolean;
};

export type Package = {
  name: string;
  price: string;
  tag: string;
  recommended?: boolean;
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
    name: "Listing Performance Guarantee",
    text: "If your listing doesn't get more online engagement than your last listing shot on a phone or by another photographer, we reshoot it free — and give you a $100 credit toward your next order.",
  },
  scarcity:
    "We partner with 5 new agents per month to protect our 24-hour turnaround.",
  packages: [
    {
      name: "Listing Launch Kit",
      price: "From $299",
      tag: "Market-ready in 24 hours",
      valueItems: [
        { label: "25+ HDR Professional Photos", value: "$299" },
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
          label: "24-Hour Photo Delivery Guarantee",
          value: "$99",
          isBonus: true,
        },
        {
          label: "Weather Protection (free reschedule)",
          value: "$99",
          isBonus: true,
        },
      ],
      totalValue: "$820",
      savings: "Save $521",
    },
    {
      name: "Listing Domination System",
      price: "From $499",
      tag: "Most popular",
      recommended: true,
      valueItems: [
        { label: "Everything in Listing Launch Kit", value: "$820" },
        { label: "Upgrade to 40+ HDR Photos", value: "$150" },
        { label: "Aerial Drone Photos + Video", value: "$199" },
        { label: "3D Virtual Tour", value: "$299" },
        { label: "1 Social Reel (listing walkthrough)", value: "$195" },
        {
          label:
            "Seller Wow Report — branded PDF of all marketing for your seller",
          value: "$99",
          isBonus: true,
        },
      ],
      totalValue: "$1,762",
      savings: "Save $1,263",
    },
    {
      name: "Market Takeover Blueprint",
      price: "From $849",
      tag: "Every listing is an event",
      valueItems: [
        {
          label: "Everything in Listing Domination System",
          value: "$1,762",
        },
        { label: "Cinematic Property Video (60-90s)", value: "$695" },
        { label: "4-Reel Social Pack", value: "$595" },
        { label: "Virtual Staging — 3 rooms", value: "$147" },
        {
          label: "Single-Property Website",
          value: "$149",
          isBonus: true,
        },
        {
          label: "Agent Brand Boost — 2 listing presentation graphics",
          value: "$99",
          isBonus: true,
        },
      ],
      totalValue: "$3,447",
      savings: "Save $2,598",
    },
  ],
  enhancementPacks: [
    {
      name: "Visual Impact Pack",
      price: "$249",
      savedAmount: "$84",
      items: [
        "Virtual Staging — 3 rooms",
        "Virtual Twilight — 3 images",
        "Proximity Map",
      ],
      pairsWith: "Listing Launch Kit or Listing Domination System",
    },
    {
      name: "Social Domination Pack",
      price: "$695",
      savedAmount: "$149",
      items: [
        "4-Reel Social Pack",
        "3 Branded Social Graphics",
        "MLS-Ready Property Description",
      ],
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
      price: "$349",
      savedAmount: "$93",
      items: [
        "Real Twilight Shoot",
        "3 Virtual Twilight Images (additional angles)",
      ],
      pairsWith: "Any tier",
    },
  ],
  addOns: [
    { title: "Cinematic Video (60-90s)", price: "$695" },
    { title: "Social Reel (single)", price: "$195" },
    { title: "Reels Pack (4 reels)", price: "$595" },
    { title: "Drone Photos + Video", price: "$199" },
    { title: "3D Virtual Tour", price: "From $299" },
    { title: "2D Floor Plan", price: "$99" },
    { title: "3D Floor Plan", price: "$149" },
    { title: "Virtual Staging", price: "$49/room" },
    { title: "Real Twilight Shoot", price: "$295" },
    { title: "Virtual Twilight", price: "$49/image" },
    { title: "Proximity Map", price: "$39" },
    { title: "Rush Delivery (6hr)", price: "$100" },
  ],
};

// ─── Builders ────────────────────────────────────────────────
export const buildersPricing: VerticalPricing = {
  vertical: "builders",
  guarantee: {
    name: "Builder Media Guarantee",
    text: "If your model home media doesn't outperform your previous marketing materials in engagement, we reshoot free.",
  },
  packages: [
    {
      name: "Build Tracker",
      price: "$325/mo",
      tag: "Ongoing construction documentation",
      valueItems: [
        { label: "Monthly Progress Photo Set (drone + ground)", value: "$295" },
        { label: "Aerial Update Video (30s flyover)", value: "$195" },
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
      totalValue: "$713/mo",
      savings: "Save $388/mo",
    },
    {
      name: "Builder Marketing System",
      price: "$1,395",
      tag: "Most popular",
      recommended: true,
      valueItems: [
        { label: "40+ HDR Photos", value: "$359" },
        { label: "Aerial Drone Photos + Video", value: "$249" },
        { label: "Cinematic Video (60-90s)", value: "$795" },
        { label: "4-Reel Social Pack", value: "$595" },
        { label: "2D Floor Plan", value: "$99" },
        {
          label: "3 Social Graphics (Now Selling / Model Open / Feature)",
          value: "$149",
          isBonus: true,
        },
        {
          label: "Development Brochure Page — branded PDF",
          value: "$149",
          isBonus: true,
        },
        {
          label: "Builder Logo Watermark on All Images",
          value: "$49",
          isBonus: true,
        },
      ],
      totalValue: "$2,444",
      savings: "Save $1,049",
    },
    {
      name: "Model Home Launch Blueprint",
      price: "$1,895",
      tag: "The full launch experience",
      valueItems: [
        { label: "Everything in Builder Marketing System", value: "$2,444" },
        { label: "3D Virtual Tour", value: "$449" },
        { label: "Virtual Staging — 3 rooms", value: "$147" },
        { label: "Real Twilight Hero Shot", value: "$395" },
        {
          label: "Single-Property Website",
          value: "$149",
          isBonus: true,
        },
        {
          label: "Sales Center Presentation Kit — 5 slides",
          value: "$199",
          isBonus: true,
        },
      ],
      totalValue: "$3,783",
      savings: "Save $1,888",
    },
  ],
  addOns: [
    { title: "Single Visit (progress photos + drone)", price: "$295" },
    { title: "Cinematic Video", price: "$795" },
    { title: "3D Virtual Tour", price: "$449" },
    { title: "Virtual Staging", price: "$49/room" },
    { title: "Real Twilight Shoot", price: "$395" },
    { title: "Social Reel (single)", price: "$195" },
  ],
};

// ─── Airbnb / STR ────────────────────────────────────────────
export const airbnbPricing: VerticalPricing = {
  vertical: "airbnb-rentals",
  guarantee: {
    name: "Revenue Ready Guarantee",
    text: "If your listing doesn't see an increase in booking inquiries within 30 days of updating your photos, we reshoot one room of your choice free.",
  },
  packages: [
    {
      name: "Revenue Ready Kit",
      price: "From $449",
      tag: "Get booked faster",
      valueItems: [
        { label: "25-30 HDR Photos", value: "$399" },
        { label: "2D Floor Plan", value: "$79" },
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
      totalValue: "$801",
      savings: "Save $352",
    },
    {
      name: "Revenue Boost System",
      price: "$695",
      tag: "Most popular",
      recommended: true,
      valueItems: [
        { label: "Everything in Revenue Ready Kit", value: "$801" },
        { label: "Upgrade to 40 Photos", value: "$100" },
        { label: "Aerial Drone Photos + Video", value: "$199" },
        { label: "1 Social Reel (property walkthrough)", value: "$195" },
        {
          label: "Guest Experience Shot List — amenity highlights",
          value: "$99",
          isBonus: true,
        },
      ],
      totalValue: "$1,394",
      savings: "Save $699",
    },
    {
      name: "5-Star Showcase Blueprint",
      price: "$1,095",
      tag: "Maximum nightly rate",
      valueItems: [
        { label: "Everything in Revenue Boost System", value: "$1,394" },
        { label: "Cinematic Video Tour (60s)", value: "$549" },
        { label: "4-Reel Social Pack", value: "$595" },
        { label: "Virtual Staging — 3 rooms", value: "$147" },
        {
          label: "Superhost Marketing Kit — branded graphics",
          value: "$149",
          isBonus: true,
        },
        {
          label: "Property Guidebook Cover Photo",
          value: "$49",
          isBonus: true,
        },
      ],
      totalValue: "$2,883",
      savings: "Save $1,788",
    },
  ],
  addOns: [
    { title: "Cinematic Video Tour", price: "$549" },
    { title: "Social Reel (single)", price: "$195" },
    { title: "Drone Photos + Video", price: "$199" },
    { title: "3D Virtual Tour", price: "$349" },
    { title: "Virtual Staging", price: "$49/room" },
    { title: "2D Floor Plan", price: "$79" },
  ],
};

// ─── Lot & Land ──────────────────────────────────────────────
export const lotLandPricing: VerticalPricing = {
  vertical: "lot-land",
  guarantee: {
    name: "Visibility Guarantee",
    text: "If your listing photos don't get more saves than the average land listing in your MLS within 60 days, we reshoot free.",
  },
  packages: [
    {
      name: "Aerial Survey Kit",
      price: "$249",
      tag: "Essential aerial coverage",
      valueItems: [
        { label: "8 Aerial Drone Photos", value: "$199" },
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
      totalValue: "$362",
      savings: "Save $113",
    },
    {
      name: "Land Marketing System",
      price: "$399",
      tag: "Most popular",
      recommended: true,
      valueItems: [
        { label: "Everything in Aerial Survey Kit", value: "$362" },
        { label: "Upgrade to 10 Aerial + Ground Shots", value: "$75" },
        { label: "2 Boundary Overlays", value: "$99" },
        { label: "Drone Flyover Video (30s)", value: "$195" },
        {
          label: "2 Social Graphics (Just Listed / Acreage Feature)",
          value: "$99",
          isBonus: true,
        },
      ],
      totalValue: "$830",
      savings: "Save $431",
    },
    {
      name: "Vision Blueprint",
      price: "$649",
      tag: "Full aerial + video coverage",
      valueItems: [
        { label: "Everything in Land Marketing System", value: "$830" },
        { label: "Extended Drone Video (60s cinematic)", value: "$200" },
        {
          label: "Neighborhood Context Shots",
          value: "$99",
          isBonus: true,
        },
        {
          label: "Buyer Decision Kit — PDF with aerials + boundaries",
          value: "$99",
          isBonus: true,
        },
      ],
      totalValue: "$1,228",
      savings: "Save $579",
    },
    {
      name: "Dream Home Vision",
      price: "$995",
      tag: "AI-rendered home visualization",
      valueItems: [
        { label: "Everything in Vision Blueprint", value: "$1,228" },
        { label: "AI Rendering — Home on the Lot (StudioAI)", value: "$295" },
        { label: "2 Additional AI Rendering Angles", value: "$295" },
        {
          label: "Single-Property Website with Renderings",
          value: "$149",
          isBonus: true,
        },
        {
          label: "Developer Pitch Page — branded PDF",
          value: "$149",
          isBonus: true,
        },
      ],
      totalValue: "$2,116",
      savings: "Save $1,121",
    },
  ],
  addOns: [
    { title: "Boundary Overlays (up to 2)", price: "$99" },
    { title: "Drone Flyover Video", price: "$195" },
    { title: "AI Home Rendering (StudioAI)", price: "$295" },
    { title: "Proximity Map", price: "$39" },
    { title: "Virtual Twilight", price: "$49/image" },
  ],
};

// ─── Multi-Family ────────────────────────────────────────────
export const multiFamilyPricing: VerticalPricing = {
  vertical: "multi-family",
  guarantee: {
    name: "Leasing Launch Guarantee",
    text: "If your leasing team doesn't see more tour requests within 30 days of publishing new media, we reshoot your most-viewed unit free.",
  },
  packages: [
    {
      name: "Leasing Launch Kit",
      price: "$995",
      tag: "Essential leasing media",
      valueItems: [
        { label: "Model Unit Photography (25+ HDR)", value: "$595" },
        { label: "Amenity & Common Area Coverage", value: "$199" },
        { label: "Aerial Drone Photos + Video", value: "$249" },
        { label: "3D Virtual Tour (model unit)", value: "$449" },
        {
          label: "3 Social Graphics (Now Leasing / Open House / Tour CTA)",
          value: "$149",
          isBonus: true,
        },
        {
          label: "Leasing Agent Presentation — 5 slides",
          value: "$149",
          isBonus: true,
        },
        { label: "Unit Floor Plan", value: "$99", isBonus: true },
      ],
      totalValue: "$1,889",
      savings: "Save $894",
    },
    {
      name: "Full Property Command",
      price: "$1,695",
      tag: "Most popular",
      recommended: true,
      valueItems: [
        { label: "Everything in Leasing Launch Kit", value: "$1,889" },
        { label: "Multi-Unit Photography (up to 3 types)", value: "$395" },
        { label: "Cinematic Drone Video (60s)", value: "$595" },
        { label: "4-Reel Social Pack", value: "$595" },
        { label: "Floor Plans Per Unit Type", value: "$199" },
        {
          label: "Property Marketing Deck — 10-page branded PDF",
          value: "$299",
          isBonus: true,
        },
      ],
      totalValue: "$3,972",
      savings: "Save $2,277",
    },
    {
      name: "Leasing Domination Suite",
      price: "From $2,995",
      tag: "Full ongoing content program",
      valueItems: [
        { label: "Everything in Full Property Command", value: "$3,972" },
        {
          label: "Ongoing monthly content (reels + seasonal)",
          value: "Custom",
        },
        { label: "All unit types covered", value: "Custom" },
        { label: "Annual refresh included", value: "Custom" },
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
      totalValue: "$4,170+",
      savings: "Save $1,175+",
    },
  ],
  addOns: [
    { title: "Additional Unit Type Photography", price: "$395" },
    { title: "Cinematic Video", price: "$595" },
    { title: "3D Virtual Tour (per unit)", price: "$449" },
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
    valueItems: [
      { label: "30+ HDR Interior + Exterior Photos", value: "$695" },
      { label: "Aerial Drone Photos + Video", value: "$299" },
      { label: "Real Twilight Hero Shot", value: "$395" },
      {
        label: "Broker Presentation Kit — 3 slides for OM/pitch books",
        value: "$199",
        isBonus: true,
      },
      {
        label: "Property Brochure PDF",
        value: "$149",
        isBonus: true,
      },
    ],
    totalValue: "$1,737",
    savings: "Save $742",
  },
  {
    name: "CRE Command System",
    price: "$1,695",
    tag: "Full marketing suite",
    recommended: true,
    valueItems: [
      { label: "Everything in CRE Launch Package", value: "$1,737" },
      { label: "Cinematic Interior Walkthrough (60-90s)", value: "$695" },
      { label: "3D Virtual Tour", value: "$549" },
      { label: "2D Floor Plan", value: "$149" },
      {
        label: "Investment Highlight Reel — 30s LinkedIn cut",
        value: "$195",
        isBonus: true,
      },
    ],
    totalValue: "$3,325",
    savings: "Save $1,630",
  },
];

export const commercialSpecialty: Package[] = [
  {
    name: "Lot Command",
    price: "$995/mo",
    tag: "Dealership monthly program",
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
    valueItems: [
      { label: "Interior Photography (rooms, lobby, events)", value: "$695" },
      { label: "Food & Ambience Photography", value: "$395" },
      { label: "Exterior + Twilight Hero", value: "$395" },
      { label: "4-Reel Social Pack", value: "$595" },
      {
        label: "Review-Ready Photo Set — Google/Yelp/TripAdvisor optimized",
        value: "$99",
        isBonus: true,
      },
      {
        label: "Menu/Event Space One-Sheet PDF",
        value: "$99",
        isBonus: true,
      },
    ],
    totalValue: "$2,278",
    savings: "Save $783",
  },
];

export const commercialGuarantee: Guarantee = {
  name: "Commercial Standards Guarantee",
  text: "If the media doesn't meet your standards for any commercial listing, we reshoot — no questions asked.",
};

// ─── Branding ────────────────────────────────────────────────
export const brandingPackages: Package[] = [
  {
    name: "First Impression Kit",
    price: "$299",
    tag: "Professional headshots",
    valueItems: [
      { label: "30-Minute Studio Session", value: "$249" },
      { label: "3-5 Final Retouched Images", value: "Included" },
      {
        label: "LinkedIn + Social Profile Optimization Guide",
        value: "$49",
        isBonus: true,
      },
      {
        label: "2 Branded Social Graphics",
        value: "$99",
        isBonus: true,
      },
      {
        label: "Digital Delivery + Print-Ready Files",
        value: "$49",
        isBonus: true,
      },
    ],
    totalValue: "$446",
    savings: "Save $147",
  },
  {
    name: "Brand Identity System",
    price: "$549",
    tag: "Most popular",
    recommended: true,
    valueItems: [
      { label: "1-Hour Studio or On-Location Session", value: "$449" },
      { label: "10 Final Retouched Images, 1 Look", value: "Included" },
      {
        label: "Brand Color Palette Card",
        value: "$49",
        isBonus: true,
      },
      {
        label: "3 Branded Social Graphics",
        value: "$149",
        isBonus: true,
      },
      {
        label: "90-Day Content Calendar",
        value: "$99",
        isBonus: true,
      },
      { label: "LinkedIn Banner Image", value: "$49", isBonus: true },
    ],
    totalValue: "$795",
    savings: "Save $246",
  },
  {
    name: "Content Command Day",
    price: "$1,695",
    tag: "Half-day content production",
    valueItems: [
      { label: "Half-Day On-Location (4 hours)", value: "$1,495" },
      {
        label: "20+ Images — headshots + lifestyle + action",
        value: "Included",
      },
      { label: "4 Social Reels", value: "$595" },
      {
        label: "90-Day Content Calendar (populated)",
        value: "$149",
        isBonus: true,
      },
      {
        label: "5 Branded Social Graphics",
        value: "$249",
        isBonus: true,
      },
      {
        label: "Authority Page — branded one-sheet PDF",
        value: "$149",
        isBonus: true,
      },
    ],
    totalValue: "$2,637",
    savings: "Save $942",
  },
];

export const brandingTeamPackages: Package[] = [
  {
    name: "Team Brand Blueprint",
    price: "From $2,195",
    tag: "Full team + brand",
    valueItems: [
      {
        label: "Full-Day — Solo + Team Headshots + Brand Content",
        value: "$1,995",
      },
      { label: "Individual Headshots Per Team Member", value: "$249/person" },
      { label: "Team Group Shot", value: "Included" },
      { label: "Brand Video (60s)", value: "$495" },
      {
        label: "Team Bio Kit — branded graphics per person",
        value: "$99/person",
        isBonus: true,
      },
      {
        label: "Company LinkedIn Banner",
        value: "$49",
        isBonus: true,
      },
    ],
    totalValue: "$2,888+",
    savings: "Save $693+",
  },
  {
    name: "Content Retainer",
    price: "$995/mo",
    tag: "Monthly content production",
    valueItems: [
      { label: "Monthly Content Day (half-day)", value: "$1,495" },
      { label: "10+ Images + 4 Reels per month", value: "Included" },
      {
        label: "Monthly Content Calendar (populated)",
        value: "$149",
        isBonus: true,
      },
      {
        label: "Social Graphics Package (5/mo)",
        value: "$249",
        isBonus: true,
      },
      { label: "Priority Booking", value: "$99", isBonus: true },
    ],
    totalValue: "$1,992/mo",
    savings: "Save $997/mo",
  },
];

export const brandingGuarantee: Guarantee = {
  name: "First Impression Guarantee",
  text: "If you don't get at least one compliment on your new headshot within a week, we reshoot free.",
};

// ─── The Spot — Studio Membership ────────────────────────────
export const studioMemberships: Package[] = [
  {
    name: "Creator Pass",
    price: "$75/mo",
    tag: "Studio access + savings",
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
    savings: "Save $183+/mo",
  },
  {
    name: "Studio Pro Pass",
    price: "$125/mo",
    tag: "Most popular",
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
    savings: "Save $318+/mo",
  },
  {
    name: "Studio Command",
    price: "$199/mo",
    tag: "Priority + engineer support",
    valueItems: [
      {
        label: "30% Off All Studio Bookings + Priority Booking",
        value: "~$150-300/mo",
      },
      { label: "16 Add-On Credits / Month", value: "$240" },
      { label: "Everything in Studio Pro Pass", value: "Included" },
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
    totalValue: "$913+/mo",
    savings: "Save $714+/mo",
  },
];

export const studioGuarantee: Guarantee = {
  name: "First Month Guarantee",
  text: "Try it for 30 days. If you don't book at least one session, we refund your first month — no questions asked.",
};
