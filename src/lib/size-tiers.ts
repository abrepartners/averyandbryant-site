// Shared by the server price reader and the booking page in the browser.

export type SizeTier = {
  /** Smallest home this price covers, in square feet. */
  min: number;
  /** Largest home this price covers, in square feet. */
  max: number;
  /** Price in cents. */
  price: number;
};

/** The tier for a home size, or null when the home is bigger than any tier. */
export function tierFor(tiers: SizeTier[] | undefined, sqft: number): SizeTier | null {
  if (!tiers) return null;
  return tiers.find((t) => sqft >= t.min && sqft <= t.max) ?? null;
}

export function dollars(cents: number): string {
  return `$${(cents / 100).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}
