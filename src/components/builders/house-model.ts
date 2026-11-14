/**
 * Plan to sold: one house, drawn by hand on a 2D canvas.
 *
 * A single progress value (0 to 1) walks the home through six stages:
 * plan, foundation, framing, rough-in, finished, sold. There is no 3D
 * library here. The model is a few hundred points pushed through a small
 * projection, which keeps the page light and smooth on phones.
 *
 * Camera always sits front-right of the home, so faces are drawn in a fixed
 * back-to-front order instead of being depth sorted.
 */

export type HouseOpts = {
  /** 0 to 1. Draws the floor plan in, pen first. Default 1 (fully drawn). */
  intro?: number;
  /** Fixed camera in degrees. Overrides the scroll-driven camera. */
  view?: { yaw: number; pitch: number };
  /** Model center as a fraction of the canvas. Default 0.5 / 0.5. */
  originX?: number;
  originY?: number;
  zoom?: number;
  /** Plan dimensions and room labels. Default true. */
  annotate?: boolean;
  grid?: boolean;
  /** CSS font-family for canvas labels. */
  font?: string;
};

/** Progress value where each stage reads as complete. */
export const STAGE_AT = {
  plan: 0,
  foundation: 0.245,
  framing: 0.495,
  roughIn: 0.668,
  finished: 0.86,
  sold: 1,
} as const;

/** Progress value where each stage's caption takes over. */
export const STAGE_STARTS = [0, 0.11, 0.27, 0.5, 0.68, 0.87] as const;

export function stageIndex(p: number): number {
  let idx = 0;
  for (let i = 0; i < STAGE_STARTS.length; i++) {
    if (p >= STAGE_STARTS[i]) idx = i;
  }
  return idx;
}

// ── math ────────────────────────────────────────────────────────────────
const rad = (d: number) => (d * Math.PI) / 180;
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const sm = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
/** Staggered sub-progress: item at position u (0 to 1) of a sequence. */
const seq = (t: number, u: number, span = 0.35) =>
  clamp((t - u * (1 - span)) / span);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

type RGB = [number, number, number];
const rgba = (c: RGB, a = 1, k = 1) =>
  `rgba(${Math.round(c[0] * k)},${Math.round(c[1] * k)},${Math.round(c[2] * k)},${a})`;
const white = (a: number) => `rgba(255,255,255,${a})`;

// ── the house, in feet ──────────────────────────────────────────────────
const H = 10; // wall height
const SLOPE = 7 / 12;
const RIDGE = H + 12 * SLOPE; // main ridge
const SLAB = 0.9;
const OV = 0.9; // roof overhang
const EAVE_Y = H - OV * SLOPE;
const WING_C = -12; // wing ridge x
const WING_RIDGE = H + 8 * SLOPE;
const WING_J = (RIDGE - WING_RIDGE) / SLOPE; // where wing ridge meets main roof

type XZ = [number, number];

/** Footprint, clockwise from the back-left corner. */
const FOOT: XZ[] = [
  [-20, -12],
  [20, -12],
  [20, 12],
  [-4, 12],
  [-4, 24],
  [-20, 24],
];
const FOOT_IN: XZ[] = [
  [-19.3, -11.3],
  [19.3, -11.3],
  [19.3, 11.3],
  [-4.7, 11.3],
  [-4.7, 23.3],
  [-19.3, 23.3],
];
/** Interior partitions: x1, z1, x2, z2. */
const PARTITIONS: [number, number, number, number][] = [
  [-19.3, 11.3, -4.7, 11.3],
  [-4.7, -11.3, -4.7, 3],
  [-4.7, 6.5, -4.7, 11.3],
  [-19.3, 0, -4.7, 0],
  [9, 0, 19.3, 0],
  [9, 0, 9, 3.5],
  [9, 7, 9, 11.3],
  [14.2, 0, 14.2, 11.3],
  [11, -7.2, 16.5, -7.2],
  [16.5, -7.2, 16.5, -5],
  [16.5, -5, 11, -5],
  [11, -5, 11, -7.2],
];
const ROOMS: [string, number, number][] = [
  ["GARAGE", -12, 18],
  ["GREAT ROOM", 2.2, -3.5],
  ["KITCHEN", 13.8, -9.4],
  ["PRIMARY", -12, -6],
];

/** Wall runs for studs, in the order the framing goes up. */
const WALL_RUNS: [XZ, XZ][] = [
  [[-4, 12], [20, 12]],
  [[20, 12], [20, -12]],
  [[20, -12], [-20, -12]],
  [[-20, -12], [-20, 24]],
  [[-20, 24], [-4, 24]],
  [[-4, 24], [-4, 12]],
  [[-20, 12], [-4, 12]],
];
const STUDS: { x: number; z: number; u: number }[] = [];
{
  const all: XZ[] = [];
  for (const [a, b] of WALL_RUNS) {
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const n = Math.round(len / 2);
    for (let i = 0; i < n; i++) {
      all.push([lerp(a[0], b[0], i / n), lerp(a[1], b[1], i / n)]);
    }
  }
  all.forEach(([x, z], i) => STUDS.push({ x, z, u: i / (all.length - 1) }));
}

// ── drawing ─────────────────────────────────────────────────────────────
const WALL: RGB = [233, 231, 226];
const ROOF: RGB = [58, 58, 62];
const CONCRETE: RGB = [128, 126, 121];
const GLASS: RGB = [20, 22, 26];
const GLOW: RGB = [255, 233, 198];
const CRIMSON: RGB = [196, 18, 48];

export function drawHouse(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  p: number,
  o: HouseOpts = {},
) {
  ctx.clearRect(0, 0, w, h);
  if (w < 2 || h < 2) return;

  const intro = o.intro ?? 1;
  const font = o.font ?? "ui-monospace, monospace";

  // timeline
  const tilt = o.view ? 1 : sm(0.03, 0.15, p);
  const slabT = sm(0.1, 0.22, p);
  const studT = clamp((p - 0.27) / 0.13);
  const plateT = sm(0.385, 0.42, p);
  const trussT = clamp((p - 0.38) / 0.12);
  const sheathT = clamp((p - 0.5) / 0.115);
  const deckT = clamp((p - 0.575) / 0.095);
  const solidT = sm(0.68, 0.78, p);
  const detailT = sm(0.72, 0.84, p);
  const duskT = sm(0.875, 0.965, p);

  // camera
  const pitch = o.view ? rad(o.view.pitch) : lerp(Math.PI / 2, rad(24), tilt);
  const yaw = o.view
    ? rad(o.view.yaw)
    : rad(25) * tilt + rad(9) * sm(0.15, 1, p);
  const unit = Math.min(w / 62, h / 48) * (o.zoom ?? 1);
  const cx = w * (o.originX ?? 0.5);
  const cy = h * (o.originY ?? 0.5);
  const cyaw = Math.cos(yaw);
  const syaw = Math.sin(yaw);
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  const CAM = 240;

  const pr = (x: number, y: number, z: number): [number, number] => {
    const zc = z - 6;
    const yc = y - 6 * tilt;
    const x1 = x * cyaw - zc * syaw;
    const z1 = x * syaw + zc * cyaw;
    const y2 = yc * cp - z1 * sp;
    const z2 = yc * sp + z1 * cp;
    const s = unit * (CAM / (CAM - z2 * tilt));
    return [cx + x1 * s, cy - y2 * s];
  };
  /** Positive when a face with this normal points at the camera. */
  const facing = (nx: number, ny: number, nz: number) =>
    ny * sp + (nx * syaw + nz * cyaw) * cp;

  const seg = (
    x1: number,
    y1: number,
    z1: number,
    x2: number,
    y2: number,
    z2: number,
  ) => {
    const a = pr(x1, y1, z1);
    const b = pr(x2, y2, z2);
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
  };
  const path = (pts: number[][]) => {
    ctx.beginPath();
    for (let i = 0; i < pts.length; i++) {
      const s = pr(pts[i][0], pts[i][1], pts[i][2]);
      if (i) ctx.lineTo(s[0], s[1]);
      else ctx.moveTo(s[0], s[1]);
    }
    ctx.closePath();
  };
  const fill = (pts: number[][], style: string, stroke?: string) => {
    path(pts);
    ctx.fillStyle = style;
    ctx.fill();
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.stroke();
    }
  };

  ctx.lineWidth = 1;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  // ── blueprint grid on the ground ──────────────────────────────────────
  if (o.grid !== false) {
    const ga = lerp(1, 0.6, solidT);
    for (const major of [false, true]) {
      ctx.beginPath();
      for (let i = -72; i <= 84; i += 4) {
        if ((i % 16 === 0) !== major) continue;
        if (i <= 72) seg(i, 0, -66, i, 0, 84);
        seg(-72, 0, i, 72, 0, i);
      }
      ctx.strokeStyle = white((major ? 0.085 : 0.04) * ga);
      ctx.stroke();
    }
  }

  // ── lot, drive and walk ───────────────────────────────────────────────
  if (detailT > 0) {
    const a = detailT;
    fill(
      [
        [-18, 0, 24],
        [-6, 0, 24],
        [-6, 0, 46],
        [-18, 0, 46],
      ],
      white(0.07 * a),
      white(0.12 * a),
    );
    fill(
      [
        [0.8, 0, 12],
        [3.2, 0, 12],
        [3.2, 0, 46],
        [0.8, 0, 46],
      ],
      white(0.05 * a),
    );
    ctx.beginPath();
    seg(-72, 0, 46, 72, 0, 46);
    seg(-72, 0, 56, 72, 0, 56);
    ctx.strokeStyle = white(0.14 * a);
    ctx.stroke();
    ctx.save();
    ctx.setLineDash([4, 5]);
    path([
      [-32, 0, -24],
      [32, 0, -24],
      [32, 0, 46],
      [-32, 0, 46],
    ]);
    ctx.strokeStyle = white(0.16 * a);
    ctx.stroke();
    ctx.restore();
  }

  // ── slab ──────────────────────────────────────────────────────────────
  const base = SLAB * slabT;
  if (slabT > 0) {
    const sideA = 0.1 * slabT * (1 - solidT);
    const sides: [XZ, XZ, number][] = [
      [[20, -12], [20, 12], 0.72],
      [[-4, 12], [20, 12], 0.95],
      [[-4, 24], [-4, 12], 0.72],
      [[-20, 24], [-4, 24], 0.95],
    ];
    for (const [a, b, k] of sides) {
      const quad = [
        [a[0], 0, a[1]],
        [b[0], 0, b[1]],
        [b[0], base, b[1]],
        [a[0], base, a[1]],
      ];
      if (sideA > 0.002) fill(quad, white(sideA), white(0.3 * slabT * (1 - solidT)));
      if (solidT > 0) {
        fill(quad, rgba(CONCRETE, solidT, k * lerp(1, 0.45, duskT)));
      }
    }
    fill(
      FOOT.map(([x, z]) => [x, base, z]),
      white(0.045 * slabT * (1 - solidT)),
    );
  }

  // ── floor plan (the drafting) ─────────────────────────────────────────
  const planFade = 1 - sm(0.55, 0.7, p);
  let pen: [number, number] | null = null;
  const drawPartial = (pts: XZ[], t: number, closed: boolean) => {
    if (t <= 0) return;
    const ring = closed ? [...pts, pts[0]] : pts;
    let total = 0;
    for (let i = 1; i < ring.length; i++) {
      total += Math.hypot(ring[i][0] - ring[i - 1][0], ring[i][1] - ring[i - 1][1]);
    }
    let left = total * clamp(t);
    ctx.beginPath();
    const s0 = pr(ring[0][0], base, ring[0][1]);
    ctx.moveTo(s0[0], s0[1]);
    for (let i = 1; i < ring.length && left > 0; i++) {
      const len = Math.hypot(ring[i][0] - ring[i - 1][0], ring[i][1] - ring[i - 1][1]);
      const k = Math.min(1, left / len);
      const x = lerp(ring[i - 1][0], ring[i][0], k);
      const z = lerp(ring[i - 1][1], ring[i][1], k);
      const s = pr(x, base, z);
      ctx.lineTo(s[0], s[1]);
      left -= len;
      if (t < 1) pen = s;
    }
    ctx.stroke();
  };

  if (planFade > 0) {
    ctx.lineWidth = 1.4;
    ctx.strokeStyle = white(lerp(0.92, 0.55, sheathT) * planFade);
    drawPartial(FOOT, sm(0, 0.46, intro), true);
    ctx.lineWidth = 1;
    const innerA = 0.5 * planFade * (1 - sheathT);
    if (innerA > 0.003) {
      ctx.strokeStyle = white(innerA);
      drawPartial(FOOT_IN, sm(0.3, 0.68, intro), true);
      const partT = sm(0.55, 0.95, intro);
      ctx.strokeStyle = white(innerA * 0.8);
      PARTITIONS.forEach(([x1, z1, x2, z2], i) => {
        drawPartial(
          [
            [x1, z1],
            [x2, z2],
          ],
          seq(partT, i / (PARTITIONS.length - 1), 0.3),
          false,
        );
      });
      // door swings
      const arcA = innerA * sm(0.85, 1, intro);
      if (arcA > 0.003) {
        ctx.strokeStyle = white(arcA * 0.8);
        const arcs: [number, number, number, number, number][] = [
          [0.8, 11.3, 3, 180, 270],
          [-4.7, 6.5, 3.4, 90, 180],
        ];
        for (const [ax, az, r, d0, d1] of arcs) {
          ctx.beginPath();
          for (let i = 0; i <= 10; i++) {
            const t = rad(lerp(d0, d1, i / 10));
            const s = pr(ax - Math.cos(t) * r, base, az + Math.sin(t) * r);
            if (i) ctx.lineTo(s[0], s[1]);
            else ctx.moveTo(s[0], s[1]);
          }
          ctx.stroke();
        }
      }
    }
  }

  // ── framing: studs, plates, trusses ───────────────────────────────────
  const frameA = 1 - solidT;
  if (studT > 0 && frameA > 0.01) {
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (const s of STUDS) {
      const t = easeOut(seq(studT, s.u, 0.3));
      if (t <= 0) continue;
      seg(s.x, base, s.z, s.x, base + H * t, s.z);
    }
    ctx.strokeStyle = white(0.5 * frameA);
    ctx.stroke();

    if (plateT > 0) {
      ctx.lineWidth = 1.3;
      ctx.strokeStyle = white(0.8 * frameA * plateT);
      path(FOOT.map(([x, z]) => [x, base + H, z]));
      ctx.stroke();
      ctx.beginPath();
      seg(-20, base + H, 12, -4, base + H, 12);
      ctx.stroke();
      ctx.lineWidth = 1;
    }

    if (trussT > 0) {
      const top = base + H;
      const trusses: { main: boolean; at: number }[] = [];
      for (let x = -20; x <= 20; x += 4) trusses.push({ main: true, at: x });
      for (const z of [16, 20, 24]) trusses.push({ main: false, at: z });
      trusses.forEach((tr, i) => {
        const t = seq(trussT, i / (trusses.length - 1), 0.28);
        if (t <= 0) return;
        const e = easeOut(t);
        ctx.beginPath();
        if (tr.main) {
          const apex = top + 12 * SLOPE * e;
          seg(tr.at, top, -12, tr.at, apex, 0);
          seg(tr.at, apex, 0, tr.at, top, 12);
          seg(tr.at, top, 0, tr.at, apex, 0);
          seg(tr.at, top, -12, tr.at, top, 12);
        } else {
          const apex = top + 8 * SLOPE * e;
          seg(-20, top, tr.at, WING_C, apex, tr.at);
          seg(WING_C, apex, tr.at, -4, top, tr.at);
          seg(WING_C, top, tr.at, WING_C, apex, tr.at);
          seg(-20, top, tr.at, -4, top, tr.at);
        }
        ctx.strokeStyle = white(0.55 * t * frameA);
        ctx.stroke();
      });
      const ridgeA = sm(0.85, 1, trussT) * frameA;
      if (ridgeA > 0) {
        ctx.beginPath();
        seg(-20, base + RIDGE, 0, 20, base + RIDGE, 0);
        seg(WING_C, base + WING_RIDGE, WING_J, WING_C, base + WING_RIDGE, 24);
        ctx.strokeStyle = white(0.8 * ridgeA);
        ctx.lineWidth = 1.3;
        ctx.stroke();
        ctx.lineWidth = 1;
      }
    }
  }

  // ── faces: sheathing first, then the finished material ────────────────
  const b = base;
  const dayNight = lerp(1, 0.36, duskT);
  const roofNight = lerp(1, 0.6, duskT);
  const edge = `rgba(8,8,8,${0.4 * solidT})`;

  /** A wall run split into 4 ft panels that go up one at a time. */
  const wall = (
    a: XZ,
    c: XZ,
    n: [number, number, number],
    shade: number,
    order: number,
    gable?: number[],
  ) => {
    if (facing(n[0], n[1], n[2]) <= 0.01) return;
    const len = Math.hypot(c[0] - a[0], c[1] - a[1]);
    const count = Math.round(len / 4);
    if (sheathT > 0 && solidT < 1) {
      for (let i = 0; i < count; i++) {
        const t = seq(sheathT, (order + i / count) / 4.6, 0.22);
        if (t <= 0) continue;
        const x0 = lerp(a[0], c[0], i / count);
        const z0 = lerp(a[1], c[1], i / count);
        const x1 = lerp(a[0], c[0], (i + 1) / count);
        const z1 = lerp(a[1], c[1], (i + 1) / count);
        fill(
          [
            [x0, b, z0],
            [x1, b, z1],
            [x1, b + H * easeOut(t), z1],
            [x0, b + H * easeOut(t), z0],
          ],
          `rgba(34,34,36,${0.82 * t})`,
          white(0.26 * t * (1 - solidT)),
        );
      }
      if (gable) {
        const t = seq(sheathT, (order + 1) / 4.6, 0.22);
        if (t > 0) {
          fill(
            [
              [a[0], b + H, a[1]],
              [c[0], b + H, c[1]],
              [gable[0], b + gable[1], gable[2]],
            ],
            `rgba(34,34,36,${0.82 * t})`,
            white(0.26 * t * (1 - solidT)),
          );
        }
      }
    }
    if (solidT > 0) {
      const pts = [
        [a[0], b, a[1]],
        [c[0], b, c[1]],
        [c[0], b + H, c[1]],
      ];
      if (gable) pts.push([gable[0], b + gable[1], gable[2]]);
      pts.push([a[0], b + H, a[1]]);
      fill(pts, rgba(WALL, solidT, shade * dayNight), edge);
    }
  };

  /** A roof plane split into strips that deck over one at a time. */
  const roof = (
    strips: number[][][],
    n: [number, number, number],
    shade: number,
    order: number,
  ) => {
    if (facing(n[0], n[1], n[2]) <= 0.01) return;
    if (deckT > 0 && solidT < 1) {
      strips.forEach((q, i) => {
        const t = seq(deckT, (order + i / strips.length) / 2.4, 0.25);
        if (t <= 0) return;
        fill(q, `rgba(30,30,32,${0.86 * t})`, white(0.24 * t * (1 - solidT)));
      });
    }
    if (solidT > 0) {
      for (const q of strips) {
        fill(q, rgba(ROOF, solidT, shade * roofNight));
      }
      // one clean outline around the whole plane
      ctx.beginPath();
      const first = strips[0];
      const last = strips[strips.length - 1];
      const outline =
        last.length === 3
          ? [first[0], first[3] ?? first[2], last[2], last[1], last[0]]
          : [first[0], first[3], last[2], last[1]];
      outline.forEach((q, i) => {
        const s = pr(q[0], q[1], q[2]);
        if (i) ctx.lineTo(s[0], s[1]);
        else ctx.moveTo(s[0], s[1]);
      });
      ctx.closePath();
      ctx.strokeStyle = edge;
      ctx.stroke();
    }
  };

  if (sheathT > 0 || solidT > 0) {
    const cosA = 1 / Math.hypot(1, SLOPE);
    const sinA = SLOPE / Math.hypot(1, SLOPE);

    // main body
    wall([20, 12], [20, -12], [1, 0, 0], 0.74, 1, [20, RIDGE, 0]);
    wall([-4, 12], [20, 12], [0, 0, 1], 0.98, 0);

    const mainStrips = (zEave: number) => {
      const out: number[][][] = [];
      const x0 = -20 - OV;
      const x1 = 20 + OV;
      const n = 10;
      for (let i = 0; i < n; i++) {
        const xa = lerp(x0, x1, i / n);
        const xb = lerp(x0, x1, (i + 1) / n);
        out.push([
          [xa, b + EAVE_Y, zEave],
          [xb, b + EAVE_Y, zEave],
          [xb, b + RIDGE, 0],
          [xa, b + RIDGE, 0],
        ]);
      }
      return out;
    };
    roof(mainStrips(-12 - OV), [0, cosA, -sinA], 0.6, 1.4);
    roof(mainStrips(12 + OV), [0, cosA, sinA], 1, 0.6);

    // garage wing
    wall([-4, 24], [-4, 12], [1, 0, 0], 0.74, 2.6);
    wall([-20, 24], [-4, 24], [0, 0, 1], 0.98, 3.2, [WING_C, WING_RIDGE, 24]);

    const wingStrips = (xEave: number) => {
      const out: number[][][] = [];
      const zs = [24 + OV, 20, 16, 12 + OV];
      for (let i = 0; i < zs.length - 1; i++) {
        out.push([
          [xEave, b + EAVE_Y, zs[i]],
          [xEave, b + EAVE_Y, zs[i + 1]],
          [WING_C, b + WING_RIDGE, zs[i + 1]],
          [WING_C, b + WING_RIDGE, zs[i]],
        ]);
      }
      out.push([
        [xEave, b + EAVE_Y, 12 + OV],
        [WING_C, b + WING_RIDGE, WING_J],
        [WING_C, b + WING_RIDGE, 12 + OV],
      ]);
      return out;
    };
    roof(wingStrips(-20 - OV), [-sinA, cosA, 0], 1.12, 1.9);
    roof(wingStrips(-4 + OV), [sinA, cosA, 0], 0.8, 1.7);
  }

  // ── openings: windows, doors ──────────────────────────────────────────
  if (detailT > 0 || sheathT > 0.5) {
    const openA = Math.max(detailT, sm(0.5, 1, sheathT) * (1 - solidT) * 0.9);
    const lit = duskT;
    const win = (pts: number[][], glow = true) => {
      if (glow && lit > 0.01) {
        ctx.save();
        ctx.shadowColor = `rgba(255,214,160,${0.7 * lit})`;
        ctx.shadowBlur = unit * 2.6 * lit;
        fill(pts, rgba(GLOW, openA * lit));
        ctx.restore();
      }
      fill(
        pts,
        glow
          ? `rgba(${Math.round(lerp(GLASS[0], GLOW[0], lit))},${Math.round(lerp(GLASS[1], GLOW[1], lit))},${Math.round(lerp(GLASS[2], GLOW[2], lit))},${openA})`
          : rgba(GLASS, openA),
      );
      if (detailT > 0 && pts.length === 4) {
        // one mullion
        ctx.beginPath();
        seg(
          (pts[0][0] + pts[1][0]) / 2,
          pts[0][1],
          (pts[0][2] + pts[1][2]) / 2,
          (pts[2][0] + pts[3][0]) / 2,
          pts[2][1],
          (pts[2][2] + pts[3][2]) / 2,
        );
        ctx.strokeStyle = `rgba(${lit > 0.5 ? "60,40,20" : "255,255,255"},${0.28 * detailT})`;
        ctx.stroke();
      }
    };
    const frontRect = (x0: number, x1: number, y0: number, y1: number, z: number) => [
      [x0, b + y0, z],
      [x1, b + y0, z],
      [x1, b + y1, z],
      [x0, b + y1, z],
    ];
    const sideRect = (z0: number, z1: number, y0: number, y1: number, x: number) => [
      [x, b + y0, z0],
      [x, b + y0, z1],
      [x, b + y1, z1],
      [x, b + y1, z0],
    ];

    if (facing(1, 0, 0) > 0.01) {
      win(sideRect(8, 4, 3, 8, 20.03));
      win(sideRect(-4, -8, 3, 8, 20.03));
    }
    if (facing(0, 0, 1) > 0.01) {
      win(frontRect(8, 12, 3, 8, 12.03));
      win(frontRect(14, 18, 3, 8, 12.03));
      // front door: the one crimson object on the house
      const door = frontRect(0.6, 3.4, 0, 7.2, 12.03);
      if (detailT > 0) {
        fill(door, rgba(CRIMSON, detailT, lerp(1, 0.72, duskT)));
      } else {
        fill(door, rgba(GLASS, openA));
      }
    }
    if (facing(1, 0, 0) > 0.01) {
      win(sideRect(20, 16, 3.5, 8, -3.97));
    }
    if (facing(0, 0, 1) > 0.01) {
      // garage door and gable vent
      const gd = frontRect(-18, -6, 0, 7.6, 24.03);
      if (detailT > 0) {
        fill(gd, rgba(WALL, detailT, 0.84 * dayNight), `rgba(8,8,8,${0.35 * detailT})`);
        ctx.beginPath();
        for (const y of [1.9, 3.8, 5.7]) seg(-18, b + y, 24.03, -6, b + y, 24.03);
        ctx.strokeStyle = `rgba(8,8,8,${0.22 * detailT})`;
        ctx.stroke();
        fill(frontRect(-13, -11, 11, 12.4, 24.03), rgba(GLASS, detailT * 0.85));
      } else {
        fill(gd, rgba(GLASS, openA));
      }
    }
  }

  // ── the sign ──────────────────────────────────────────────────────────
  if (duskT > 0) {
    const t = easeOut(duskT);
    const foot = pr(13, 0, 37);
    const top = pr(13, 6.2 * t, 37);
    ctx.beginPath();
    ctx.moveTo(foot[0], foot[1]);
    ctx.lineTo(top[0], top[1]);
    ctx.strokeStyle = white(0.75 * duskT);
    ctx.lineWidth = Math.max(1.5, unit * 0.22);
    ctx.stroke();
    ctx.lineWidth = 1;
    const sw = unit * 6.4 * t;
    const sh = unit * 3 * t;
    ctx.fillStyle = rgba(CRIMSON, duskT);
    ctx.fillRect(top[0] - sw / 2, top[1] - sh * 0.15, sw, sh);
    if (t > 0.6) {
      ctx.fillStyle = white(sm(0.6, 1, t));
      ctx.font = `600 ${Math.max(8, unit * 1.55)}px ${font}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("SOLD", top[0], top[1] - sh * 0.15 + sh / 2 + 0.5);
    }
  }

  // ── plan annotations: dimensions and room names ───────────────────────
  if (o.annotate !== false && !o.view) {
    const a = (1 - sm(0.015, 0.075, p)) * sm(0.72, 1, intro);
    if (a > 0.01) {
      const size = clamp(unit * 1.45, 8.5, 12);
      ctx.font = `500 ${size}px ${font}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const dim = (x1: number, z1: number, x2: number, z2: number, label: string) => {
        const A = pr(x1, 0, z1);
        const B = pr(x2, 0, z2);
        ctx.beginPath();
        ctx.moveTo(A[0], A[1]);
        ctx.lineTo(B[0], B[1]);
        for (const q of [A, B]) {
          ctx.moveTo(q[0] - 3.5, q[1] + 3.5);
          ctx.lineTo(q[0] + 3.5, q[1] - 3.5);
        }
        ctx.strokeStyle = white(0.3 * a);
        ctx.stroke();
        const mx = (A[0] + B[0]) / 2;
        const my = (A[1] + B[1]) / 2;
        const tw = ctx.measureText(label).width + 10;
        ctx.fillStyle = "#0a0a0a";
        ctx.fillRect(mx - tw / 2, my - size * 0.75, tw, size * 1.5);
        ctx.fillStyle = white(0.5 * a);
        ctx.fillText(label, mx, my);
      };
      dim(-20, -16, 20, -16, "40'-0\"");
      dim(24, -12, 24, 12, "24'-0\"");
      dim(-20, 28, -4, 28, "16'-0\"");
      ctx.fillStyle = white(0.34 * a);
      ctx.font = `500 ${clamp(unit * 1.2, 7.5, 10)}px ${font}`;
      for (const [name, x, z] of ROOMS) {
        const s = pr(x, 0, z);
        ctx.fillText(name, s[0], s[1]);
      }
    }
  }

  // ── the pen ───────────────────────────────────────────────────────────
  if (intro < 1 && pen) {
    const [px, py] = pen as [number, number];
    ctx.save();
    ctx.shadowColor = "rgba(196,18,48,0.9)";
    ctx.shadowBlur = 14;
    ctx.fillStyle = "#c41230";
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
