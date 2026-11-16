/**
 * The builder quote questions. Every dollar figure here is a live Aryeo list
 * price, read from the catalog on 2026-11-16 (the same numbers the rest of
 * src/lib/pricing.ts carries). Nothing is discounted or invented: the range
 * a builder sees is those list prices added up, lowest size to largest.
 * If a price changes in Aryeo, change it here too.
 */

export type ServiceId =
  | "photos"
  | "aerial"
  | "reels"
  | "film"
  | "visits"
  | "twilight";

export type Service = {
  id: ServiceId;
  label: string;
  blurb: string;
  low: number;
  high: number;
  /** How the list price reads on the result. */
  priced: string;
};

export const SERVICES: Service[] = [
  {
    id: "photos",
    label: "Marketing photos",
    blurb: "The exterior, the signature rooms and the details. Wide or tall.",
    low: 185, // Listing Photography, 25 images
    high: 265, // Listing Photography, 55 images
    priced: "$185 to $265",
  },
  {
    id: "aerial",
    label: "Aerial photos and video",
    blurb: "The home, the lot and the street from the air.",
    low: 150, // Aerial Drone Photos + Video
    high: 150,
    priced: "$150",
  },
  {
    id: "reels",
    label: "Short reels",
    blurb: "Vertical clips made for Instagram and Facebook.",
    low: 195, // Social Reel (single)
    high: 595, // 4-Reel Social Pack
    priced: "$195 for one, $595 for four",
  },
  {
    id: "film",
    label: "A film with you on camera",
    blurb: "You or your crew explaining how you build.",
    low: 295, // Cinematic Property Video, 60 seconds
    high: 495, // Brand Video (60s)
    priced: "$295 to $495",
  },
  {
    id: "visits",
    label: "Progress visits",
    blurb: "Photos and drone at each stage, slab to keys.",
    low: 295, // Builders Single Visit
    high: 295,
    priced: "$295 a visit",
  },
  {
    id: "twilight",
    label: "Twilight exterior",
    blurb: "The home lit up at dusk.",
    low: 245, // Real Twilight Shoot
    high: 245,
    priced: "$245",
  },
];

const low = (id: ServiceId) => SERVICES.find((s) => s.id === id)?.low ?? 0;

/**
 * Market Your Build: the 25 image photo set with the regular add-ons, each
 * at its live list price. Shown on the builders page card and again on the
 * booking step (/builders/shoot) so the two never disagree.
 */
export const SHOOT_PRICE = low("photos");
export const SHOOT_STACK = [
  { label: "Marketing photo set, 25 finished images", price: low("photos"), add: false },
  { label: "Aerial photos and video", price: low("aerial"), add: true },
  { label: "A short reel", price: low("reels"), add: true },
  { label: "A 60 second film", price: low("film"), add: true },
  { label: "Twilight exterior", price: low("twilight"), add: true },
];

/**
 * The booking step for that shoot (/builders/shoot): who is booking, then
 * the Aryeo builders order form. It stays switched off until that Aryeo form
 * can sell the shoot. Checked 2026-11-16: the form still carries the old
 * catalog, "2026 Market Your Build" is inactive and on no form, and none of
 * the add-ons above are on it at these prices. While this is false, "Book
 * this shoot" goes to the builder call page and /builders/shoot sends
 * visitors there too. Turn it on only after the Aryeo form is fixed.
 */
export const SHOOT_BOOKS_ON_ARYEO = false;
export const BUILDER_SHOOT_PATH = "/builders/shoot";

export type PurposeId =
  | "showcase"
  | "progress"
  | "camera"
  | "portfolio"
  | "sell"
  | "unsure";

export type Purpose = {
  id: PurposeId;
  label: string;
  blurb: string;
  /** Checked for them on the next question. They can change it. */
  suggests: ServiceId[];
};

export const PURPOSES: Purpose[] = [
  {
    id: "showcase",
    label: "Show off a finished build",
    blurb: "Photos and film for your site, your social and your next bid.",
    suggests: ["photos", "aerial", "reels"],
  },
  {
    id: "progress",
    label: "Document a build in progress",
    blurb: "A record of the work, and content while it goes up.",
    suggests: ["visits"],
  },
  {
    id: "camera",
    label: "Put our team on camera",
    blurb: "Show people who builds the home and how you do it.",
    suggests: ["film", "reels"],
  },
  {
    id: "portfolio",
    label: "Build a portfolio for client meetings",
    blurb: "Trim, ceilings, cabinets and finishes you can show as options.",
    suggests: ["photos"],
  },
  {
    id: "sell",
    label: "Sell or lease a finished home",
    blurb: "Listing media for a spec or model home.",
    suggests: [],
  },
  {
    id: "unsure",
    label: "Not sure yet",
    blurb: "Tell us the goal and we will suggest the rest.",
    suggests: [],
  },
];

export const SITES = [
  { id: "one", label: "One home" },
  { id: "few", label: "2 or 3 homes" },
  { id: "many", label: "4 or more, or a community" },
] as const;

export const CADENCES = [
  { id: "once", label: "One time", unit: "per home" },
  { id: "monthly", label: "Every month", unit: "per month, per home" },
  { id: "milestone", label: "At each milestone", unit: "per visit" },
] as const;

export type SiteId = (typeof SITES)[number]["id"];
export type CadenceId = (typeof CADENCES)[number]["id"];

/** Build Tracker (Monthly), the live monthly price for progress visits. */
export const MONTHLY_VISIT = 325;

export function money(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

/** The list-price range for what they picked. */
export function rangeFor(picked: ServiceId[], cadence: CadenceId) {
  let low = 0;
  let high = 0;
  for (const s of SERVICES) {
    if (!picked.includes(s.id)) continue;
    if (s.id === "visits" && cadence === "monthly") {
      low += MONTHLY_VISIT;
      high += MONTHLY_VISIT;
    } else {
      low += s.low;
      high += s.high;
    }
  }
  return { low, high };
}

/**
 * A line for our own notes only (it lands on the contact in the CRM, the
 * builder never sees it): which of our programs fits what they picked.
 */
export function internalFit(
  purpose: PurposeId,
  picked: ServiceId[],
  cadence: CadenceId,
) {
  const video = picked.includes("film") || picked.includes("reels");
  if (purpose === "sell")
    return "Builder Marketing System or Model Home Launch Blueprint";
  if (cadence === "monthly" && video)
    return "Monthly series (progress visit plus on camera episode and reels)";
  if (cadence === "monthly") return "Build Tracker";
  if (purpose === "camera" || picked.includes("film"))
    return "Brand film (one shoot, long cut plus cutdowns)";
  if (purpose === "portfolio") return "Craft portfolio shoot (detail photos)";
  if (purpose === "progress") return "Builders Single Visit per milestone";
  return "Market Your Build shoot plus the add-ons they picked";
}
