/**
 * Real commercial work already on the site (A&B's own photography under
 * public/images/commercial). Shared by /commercial and /gallery/commercial so
 * the commercial gallery shows commercial buildings, not a curated card that
 * happens to carry the category.
 */
export type PortfolioShot = { src: string; alt: string; caption: string };
export type PortfolioGroup = {
  label: string;
  /** Optional full-width frame that leads the group, for the strongest shot. */
  lead?: PortfolioShot;
  shots: PortfolioShot[];
};

// Rose City Center leads the portfolio: it is the strongest retail work we have,
// and the overhead site aerial and the pylon signage frame are both content types
// this page never had. The named tenants on the signage are tenants of the
// property we photographed, not clients of ours, so no copy here says otherwise.
export const commercialHeroFrame: PortfolioShot = {
  src: "/images/commercial/12401-maumelle-blvd-maumelle-restaurant-exterior.jpg",
  alt: "Exterior of a newly built quick service restaurant at 12401 Maumelle Boulevard in Maumelle, Arkansas",
  caption: "Quick service restaurant, Maumelle",
};

export const commercialGroups: PortfolioGroup[] = [
  {
    label: "Retail centers",
    lead: {
      src: "/images/commercial/rose-city-center-north-little-rock-grocery-anchor-exterior.jpg",
      alt: "Elevated three quarter view of the grocery anchor at Rose City Center in North Little Rock, Arkansas, with a tan stucco facade, green standing seam gables and a parking lot of cars and pickups under a blue sky",
      caption: "Grocery anchor, North Little Rock",
    },
    shots: [
      {
        src: "/images/commercial/rose-city-center-north-little-rock-overhead-site-aerial.jpg",
        alt: "Overhead drone photo of Rose City Center in North Little Rock, Arkansas, showing the white flat roofs of the strip and its grocery anchor, the full striped parking field, an out parcel building with a drive through lane, and a four lane highway along the bottom of the frame",
        caption: "Site aerial, North Little Rock",
      },
      {
        src: "/images/commercial/rose-city-center-north-little-rock-pylon-sign.jpg",
        alt: "Elevated view of the Rose City Center pylon sign in North Little Rock, Arkansas, with a rose logo above stacked tenant panels, beside a highway with route markers and grain silos on the horizon",
        caption: "Center signage, North Little Rock",
      },
      {
        src: "/images/commercial/rose-city-center-north-little-rock-tenant-storefront.jpg",
        alt: "Angled ground level view along the red metal awning of the in line shops at Rose City Center in North Little Rock, Arkansas, with glass storefronts, brick bulkheads and red steel canopy posts receding to the right under a blue sky",
        caption: "In line tenants, North Little Rock",
      },
    ],
  },
  {
    label: "Hospitality and restaurants",
    shots: [
      {
        src: "/images/commercial/10-anglers-way-little-rock-restaurant-bar.jpg",
        alt: "Restaurant bar with a pressed tin ceiling and warm lighting at 10 Anglers Way in Little Rock, Arkansas",
        caption: "Bar, Little Rock",
      },
      {
        src: "/images/commercial/10-anglers-way-little-rock-restaurant-dining-room.jpg",
        alt: "Bar with high stools, a pressed tin ceiling and framed memorabilia on exposed brick at 10 Anglers Way in Little Rock, Arkansas",
        caption: "Bar seating, Little Rock",
      },
      {
        src: "/images/commercial/10-anglers-way-little-rock-restaurant-entrance.jpg",
        alt: "Covered entry with wood double doors and steakhouse signage etched on the glass at 10 Anglers Way in Little Rock, Arkansas",
        caption: "Entrance, Little Rock",
      },
    ],
  },
  {
    label: "Quick service and small retail",
    shots: [
      {
        src: "/images/commercial/12401-maumelle-blvd-maumelle-restaurant-dining-room.jpg",
        alt: "Dining room with gold pendant lighting and booths inside a quick service restaurant in Maumelle, Arkansas",
        caption: "Interior, Maumelle",
      },
      {
        src: "/images/commercial/12401-maumelle-blvd-maumelle-drive-thru-exterior.jpg",
        alt: "Side elevation and channel letter signage on a newly built quick service restaurant at 12401 Maumelle Boulevard in Maumelle, Arkansas",
        caption: "Exterior signage, Maumelle",
      },
      {
        src: "/images/commercial/4109-e-broadway-north-little-rock-retail-storefronts.jpg",
        alt: "Low aerial of a row of retail storefronts and the parking lot at a shopping center on East Broadway in North Little Rock, Arkansas",
        caption: "Retail center, North Little Rock",
      },
    ],
  },
  {
    label: "Historic and institutional",
    shots: [
      {
        src: "/images/commercial/2400-w-31st-ave-pine-bluff-church-sanctuary.jpg",
        alt: "Church sanctuary with warm wood and pews at 2400 West 31st Avenue in Pine Bluff, Arkansas",
        caption: "Sanctuary, Pine Bluff",
      },
      {
        src: "/images/commercial/411-7th-st-little-rock-columned-portico.jpg",
        alt: "Columned portico and front lawn of a Greek Revival mansion at 411 7th Street in Little Rock, Arkansas",
        caption: "Greek Revival mansion, Little Rock",
      },
      {
        src: "/images/commercial/2400-w-31st-ave-pine-bluff-church-exterior.jpg",
        alt: "Brick church exterior photographed under a clear sky in Pine Bluff, Arkansas",
        caption: "Church exterior, Pine Bluff",
      },
    ],
  },
  {
    label: "Aerial and site context",
    shots: [
      {
        src: "/images/commercial/111-smarthouse-way-north-little-rock-skyline-aerial.jpg",
        alt: "Aerial photo over the Arkansas River showing the Little Rock skyline and its bridges, from a commercial shoot in North Little Rock, Arkansas",
        caption: "River and skyline, North Little Rock",
      },
      {
        src: "/images/commercial/4109-e-broadway-north-little-rock-retail-center-aerial.jpg",
        alt: "Aerial photo of a retail strip center and its parking field in North Little Rock, Arkansas",
        caption: "Retail center aerial, North Little Rock",
      },
      {
        src: "/images/commercial/411-7th-st-little-rock-mansion-and-skyline.jpg",
        alt: "Aerial photo over a historic Little Rock neighborhood with the downtown skyline behind it, from a shoot at 411 7th Street",
        caption: "Downtown aerial, Little Rock",
      },
    ],
  },
];

/** The frame that reads as commercial at tile size on the gallery index. */
export const commercialLead: PortfolioShot = commercialGroups[0].lead!;
