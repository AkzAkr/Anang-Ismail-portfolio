export type CloudLayerKind = "far" | "mid" | "hero";

export interface WorldCloud {
  id: string;
  pattern: number;
  /** x dalam % dari lebar dunia */
  x: number;
  /** y dalam px dari atas dunia (world coords) */
  y: number;
  /** z dalam 3D space (negatif = lebih jauh dari camera) */
  z: number;
  /** 0 = jauh (lambat), 1 = dekat (cepat). Lihat CONTEXT #6. */
  depth: number;
  scale: number;
  base: string;
  shade: string;
  opacity: number;
  kind: CloudLayerKind;
}

const FAR_BASE = "#ffffff";
const FAR_SHADE = "#cfe6ec";
const MID_BASE = "#f7f7f2";
const MID_SHADE = "#cfcfc4";

/** 23 clouds tersebar di seluruh dunia, semuanya 3D via ThreeCloudCanvas. */
export const worldObjects: WorldCloud[] = [
  // ---- far, slow (z = -18 to -12) ----
  { id: "c1", pattern: 0, x: 8, y: 60, z: -16, depth: 0.08, scale: 1.6, base: FAR_BASE, shade: FAR_SHADE, opacity: 0.55, kind: "far" },
  { id: "c2", pattern: 2, x: 60, y: 220, z: -18, depth: 0.06, scale: 2.0, base: FAR_BASE, shade: FAR_SHADE, opacity: 0.4, kind: "far" },
  { id: "c3", pattern: 1, x: 20, y: 520, z: -12, depth: 0.1, scale: 1.3, base: FAR_BASE, shade: FAR_SHADE, opacity: 0.5, kind: "far" },
  { id: "c4", pattern: 0, x: 70, y: 900, z: -14, depth: 0.09, scale: 1.8, base: FAR_BASE, shade: FAR_SHADE, opacity: 0.45, kind: "far" },
  { id: "c5", pattern: 2, x: 10, y: 1400, z: -17, depth: 0.07, scale: 2.2, base: FAR_BASE, shade: FAR_SHADE, opacity: 0.4, kind: "far" },
  { id: "c6", pattern: 1, x: 65, y: 1900, z: -14, depth: 0.09, scale: 1.5, base: FAR_BASE, shade: FAR_SHADE, opacity: 0.5, kind: "far" },
  { id: "c7", pattern: 0, x: 15, y: 2500, z: -16, depth: 0.08, scale: 1.7, base: FAR_BASE, shade: FAR_SHADE, opacity: 0.45, kind: "far" },
  { id: "c8", pattern: 2, x: 55, y: 3200, z: -18, depth: 0.06, scale: 2.1, base: FAR_BASE, shade: FAR_SHADE, opacity: 0.4, kind: "far" },
  { id: "c9", pattern: 1, x: 25, y: 4000, z: -14, depth: 0.09, scale: 1.4, base: FAR_BASE, shade: FAR_SHADE, opacity: 0.5, kind: "far" },
  { id: "c10", pattern: 0, x: 68, y: 4800, z: -17, depth: 0.07, scale: 1.9, base: FAR_BASE, shade: FAR_SHADE, opacity: 0.45, kind: "far" },
  { id: "c11", pattern: 2, x: 12, y: 5600, z: -16, depth: 0.08, scale: 2.0, base: FAR_BASE, shade: FAR_SHADE, opacity: 0.4, kind: "far" },
  { id: "c12", pattern: 1, x: 60, y: 6400, z: -14, depth: 0.09, scale: 1.6, base: FAR_BASE, shade: FAR_SHADE, opacity: 0.5, kind: "far" },

  // ---- mid, sedikit lebih cepat (z = -8 to -5) ----
  { id: "m1", pattern: 1, x: 2, y: 180, z: -7, depth: 0.28, scale: 1.2, base: MID_BASE, shade: MID_SHADE, opacity: 0.85, kind: "mid" },
  { id: "m2", pattern: 0, x: 75, y: 650, z: -6, depth: 0.32, scale: 0.9, base: MID_BASE, shade: MID_SHADE, opacity: 0.9, kind: "mid" },
  { id: "m3", pattern: 2, x: 5, y: 1150, z: -6.5, depth: 0.3, scale: 1.1, base: MID_BASE, shade: MID_SHADE, opacity: 0.85, kind: "mid" },
  { id: "m4", pattern: 1, x: 80, y: 1650, z: -5.5, depth: 0.34, scale: 0.85, base: MID_BASE, shade: MID_SHADE, opacity: 0.9, kind: "mid" },
  { id: "m5", pattern: 0, x: 8, y: 2200, z: -7, depth: 0.29, scale: 1.0, base: MID_BASE, shade: MID_SHADE, opacity: 0.85, kind: "mid" },
  { id: "m6", pattern: 2, x: 72, y: 2800, z: -5.5, depth: 0.33, scale: 1.15, base: MID_BASE, shade: MID_SHADE, opacity: 0.9, kind: "mid" },
  { id: "m7", pattern: 1, x: 6, y: 3500, z: -6.5, depth: 0.31, scale: 0.95, base: MID_BASE, shade: MID_SHADE, opacity: 0.85, kind: "mid" },
  { id: "m8", pattern: 0, x: 78, y: 4300, z: -6, depth: 0.3, scale: 1.05, base: MID_BASE, shade: MID_SHADE, opacity: 0.9, kind: "mid" },
  { id: "m9", pattern: 2, x: 10, y: 5100, z: -6, depth: 0.32, scale: 1.1, base: MID_BASE, shade: MID_SHADE, opacity: 0.85, kind: "mid" },
  { id: "m10", pattern: 1, x: 74, y: 5900, z: -7, depth: 0.29, scale: 0.9, base: MID_BASE, shade: MID_SHADE, opacity: 0.9, kind: "mid" },
  { id: "m11", pattern: 0, x: 14, y: 6700, z: -5.5, depth: 0.33, scale: 1.0, base: MID_BASE, shade: MID_SHADE, opacity: 0.85, kind: "mid" },

  // ---- hero continuity cloud: menemani Hero -> About -> Skills lalu memudar (z = -3) ----
  { id: "hero-cloud", pattern: 2, x: 38, y: 40, z: -3, depth: 0.55, scale: 2.6, base: "#ffffff", shade: "#cfe6ec", opacity: 0.98, kind: "hero" },
];

export interface CloudWipeCloud {
  /** x dalam % dari lebar viewport */
  x: number;
  /** y dalam vh dari atas viewport */
  y: number;
  /** lebar sprite (px) */
  w: number;
  opacity: number;
}

export interface CloudWipeDef {
  id: string;
  /** selector section pembatas — wipe berlangsung saat section ini masuk */
  trigger: string;
  start: string;
  end: string;
  clouds: CloudWipeCloud[];
}

/** Awan foreground menyapu antar zona besar (kontinuitas dunia). */
export const CLOUD_WIPES: CloudWipeDef[] = [
  {
    id: "wipe-projects",
    trigger: "#projects",
    start: "top 88%",
    end: "top 20%",
    clouds: [
      { x: 28, y: 6, w: 240, opacity: 0.95 },
      { x: 6, y: 24, w: 320, opacity: 0.7 },
      { x: 58, y: 16, w: 180, opacity: 0.55 },
    ],
  },
  {
    id: "wipe-experience",
    trigger: "#experience",
    start: "top 90%",
    end: "top 25%",
    clouds: [
      { x: 62, y: 12, w: 300, opacity: 0.9 },
      { x: 88, y: 32, w: 200, opacity: 0.6 },
      { x: 18, y: 44, w: 260, opacity: 0.5 },
    ],
  },
];

export const SECTIONS = [
  "hero",
  "about",
  "skills",
  "projects",
  "experience",
  "contact",
] as const;
