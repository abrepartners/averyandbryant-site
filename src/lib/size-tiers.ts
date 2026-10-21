// Shared by the server price reader and the booking page in the browser.

export type SizeTier = {
  /** Smallest home this price covers, in square feet. */
  min: number;
  /** Largest home this price covers, in square feet. */
  max: number;
  /** Price in cents. */
  price: number;
};

/** One way to buy a single service: a photo count, a video length, or one flat price. */
export type ServiceOption = { label: string; price: number };

export type SingleService = {
  key: string;
  label: string;
  blurb?: string;
  /** `contain` shows the whole image (floor plans), not a cropped frame. */
  samples?: { kind: "image" | "video"; src: string; poster?: string; alt: string; vertical?: boolean; contain?: boolean }[];
  /** Priced by home size when set; otherwise priced by `options`. */
  tiers: SizeTier[] | null;
  options: ServiceOption[];
  /** The package that already includes this service, offered as the better deal. */
  upgradeTo?: string;
};

const num = (s: string) => Number(s.replace(/,/g, ""));

/**
 * Reads a variant title into a size range. Titles are ours and follow two
 * shapes: "Up to 3,500 sq ft" and "3,501 to 5,500 sq ft" (older products use
 * an en dash in place of "to"). Titles without "sq ft" are not sizes
 * ("90 to 120 seconds" is a video length).
 */
export function parseTierTitle(title: string): { min: number; max: number } | null {
  if (!/sq\s*ft/i.test(title)) return null;
  const upTo = title.match(/^\s*up to\s+([\d,]+)/i);
  if (upTo) return { min: 0, max: num(upTo[1]) };
  const range = title.match(/^\s*([\d,]+)\s*(?:to|-|–)\s*([\d,]+)/i);
  if (range) return { min: num(range[1]), max: num(range[2]) };
  return null;
}

/** The tier for a home size, or null when the home is bigger than any tier. */
export function tierFor(tiers: SizeTier[] | undefined | null, sqft: number): SizeTier | null {
  if (!tiers) return null;
  return tiers.find((t) => sqft >= t.min && sqft <= t.max) ?? null;
}

export function dollars(cents: number): string {
  return `$${(cents / 100).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}
