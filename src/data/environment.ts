export interface BirdFlock {
  id: string;
  x: number;
  y: number;
  depth: number;
  scale: number;
  count: number;
  /** arah terbang: 1 = kiri->kanan, -1 = kanan->kiri */
  dir: 1 | -1;
}

/** Kawanan burung pixel — siluet jauh, melintasi langit. */
export const flocks: BirdFlock[] = [
  { id: "flock-1", x: 12, y: 780, depth: 0.35, scale: 1, count: 3, dir: 1 },
  { id: "flock-2", x: 70, y: 3050, depth: 0.32, scale: 1.2, count: 4, dir: -1 },
  { id: "flock-3", x: 20, y: 5300, depth: 0.36, scale: 0.9, count: 3, dir: 1 },
];