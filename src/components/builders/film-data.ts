/**
 * The plan to sold film: one continuous shot of a home going from layout
 * lines on bare dirt to sold, cut into frames and scrubbed by the scroll.
 *
 * Eight stages: rolled blueprint, flat blueprint, lot, then the build.
 *
 * Frame files: public/builders/film/v1/{169,916}/f0000.webp and up (the
 * build), public/builders/film/v2/{169,916}/p0000.webp and up (the blueprint
 * opening). `keys` are the frame numbers where the picture holds for each
 * stage. Regenerate with ~/ab/tools/plan-to-sold-film/scripts/encode.sh and
 * encode-prelude.sh, which print the counts and keys to paste here.
 */

/** How the picture sits in the frame: zoom over cover-fit, and which side of
 * the overflow to keep (0 = left/top, 1 = right/bottom). */
export type Fit = { zoom: number; ax: number; ay: number };

export type FilmCut = {
  count: number;
  keys: readonly number[];
  url: (i: number) => string;
};

export type Film = {
  landscape: FilmCut;
  portrait: FilmCut;
  /** [scroll progress, stage] pairs. Flat steps are where the picture holds. */
  stops: readonly (readonly [number, number])[];
  /** Where each stage's caption takes over, in scroll progress. */
  starts: readonly number[];
  /** One entry per stage, used on phones. */
  fitPortrait: readonly Fit[];
  fitLandscape: Fit;
};

const BASE = "/builders/film/v1";
const BASE_B = "/builders/film/v2";
const pad = (i: number) => String(i).padStart(4, "0");

const BUILD_COUNT = 325;
const BUILD_KEYS = [0, 60, 132, 204, 264, 324] as const;

const FIT_BUILD: Fit[] = [
  { zoom: 1.3, ax: 0.86, ay: 1 },
  { zoom: 1.05, ax: 0.62, ay: 1 },
  { zoom: 1.04, ax: 0.45, ay: 1 },
  { zoom: 1.0, ax: 0.45, ay: 1 },
  { zoom: 1.0, ax: 0.75, ay: 1 },
  { zoom: 1.0, ax: 0.9, ay: 0.5 },
];

function buildCut(dir: string): FilmCut {
  return {
    count: BUILD_COUNT,
    keys: BUILD_KEYS,
    url: (i) => `${BASE}/${dir}/f${pad(i)}.webp`,
  };
}

/** The blueprint opening: frames before the build film starts. */
const PRELUDE = {
  "169": { count: 120, flat: 60 },
  "916": { count: 120, flat: 60 },
} as const;

function processCut(dir: "169" | "916"): FilmCut {
  const pre = PRELUDE[dir];
  return {
    count: pre.count + BUILD_COUNT,
    keys: [0, pre.flat, ...BUILD_KEYS.map((k) => k + pre.count)],
    url: (i) =>
      i < pre.count
        ? `${BASE_B}/${dir}/p${pad(i)}.webp`
        : `${BASE}/${dir}/f${pad(i - pre.count)}.webp`,
  };
}

export const FILM: Film = {
  landscape: processCut("169"),
  portrait: processCut("916"),
  stops: [
    [0, 0],
    [0.03, 0],
    [0.12, 1],
    [0.16, 1],
    [0.25, 2],
    [0.3, 2],
    [0.4, 3],
    [0.45, 3],
    [0.56, 4],
    [0.61, 4],
    [0.72, 5],
    [0.77, 5],
    [0.86, 6],
    [0.9, 6],
    [0.98, 7],
    [1, 7],
  ],
  starts: [0, 0.075, 0.205, 0.35, 0.505, 0.665, 0.815, 0.94],
  // The blueprint and the lot share one framing, so the lines never move.
  fitPortrait: [FIT_BUILD[0], FIT_BUILD[0], ...FIT_BUILD],
  fitLandscape: { zoom: 1, ax: 0.74, ay: 0.5 },
};

/** Which stage's caption is showing at this scroll progress. */
export function captionAt(film: Film, p: number) {
  let i = 0;
  for (let k = 0; k < film.starts.length; k++) if (p >= film.starts[k]) i = k;
  return i;
}

/** Scroll progress (0..1) to stage position (fractional mid-move). */
export function positionAt(film: Film, p: number) {
  const s = film.stops;
  if (p <= 0) return s[0][1];
  for (let i = 1; i < s.length; i++) {
    const [p1, s1] = s[i];
    if (p <= p1) {
      const [p0, s0] = s[i - 1];
      return s0 + ((s1 - s0) * (p - p0)) / (p1 - p0 || 1);
    }
  }
  return s[s.length - 1][1];
}

/** Stage position to a fractional frame number for one cut of the film. */
export function frameAt(stagePos: number, cut: FilmCut) {
  const i = Math.min(cut.keys.length - 2, Math.max(0, Math.floor(stagePos)));
  const t = Math.min(1, Math.max(0, stagePos - i));
  return cut.keys[i] + (cut.keys[i + 1] - cut.keys[i]) * t;
}

/** Stills of each stage, for the stage picker and the labeled slots. */
export const STAGE_STILLS = {
  foundation: `${BASE}/stage-foundation.webp`,
  framing: `${BASE}/stage-framing.webp`,
  roughIn: `${BASE}/stage-rough-in.webp`,
  finished: `${BASE}/stage-finished.webp`,
  framingMatched: `${BASE}/pair-framing.webp`,
} as const;
