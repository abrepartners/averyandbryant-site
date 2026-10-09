/**
 * Live Zillow 3D Home tours that Avery & Bryant captured and may show on the
 * site as portfolio. Zillow's 3D Home Guidelines license verified tours "in
 * materials marketing your professional real estate or photography services",
 * with no modifications and no branding added inside the viewer, so the tour
 * is embedded as-is.
 *
 * Always embed the UNBRANDED (MLS friendly) link: `wl=true` plus
 * `setAttribution=mls` hides Zillow and agent branding. Research and the full
 * list of candidate tours: ABVault/10-Projects/A&B-Zillow-3D-Tour-Embed-Findings.md.
 *
 * Label tours by city and property type only. Never print the street.
 */

export type LiveTour = {
  /** Zillow 3D Home tour id (the uuid in a view-imx link). */
  tourId: string;
  /** A&B photo of the same home, shown until the visitor loads the tour. */
  poster: string;
  posterAlt: string;
  /** Visitor-facing label: city and property type, never the street. */
  label: string;
};

export function zillowUnbrandedTourUrl(tourId: string) {
  return `https://www.zillow.com/view-imx/${tourId}?wl=true&setAttribution=mls&initialViewType=pano`;
}

/**
 * Aryeo order #3515, delivered 2026-05: vacant new build, tour public and
 * floor plan Published in Zillow as of 2026-10-09. If the tour is ever set to
 * private or deleted in the Zillow 3D Home dashboard, this embed breaks, so
 * keep it public (tours live under the book@ Zillow account).
 */
export const FEATURED_LIVE_TOUR: LiveTour = {
  tourId: "d3e60b36-072d-49a9-807a-9a59579a489e",
  poster: "/images/zillow-showcase/benton-new-build-front-porch.jpg",
  posterAlt:
    "Brick front porch with three arched wood double doors and lantern lights on a new construction home in Benton, Arkansas",
  label: "New construction, Benton",
};
