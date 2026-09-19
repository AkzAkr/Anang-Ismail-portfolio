/** Nilai global kegelapan malam (0 = siang, 1 = malam) — dibaca Cloud3D per-frame. */
export const nightDim = { value: 0 };

/** Smoothstep — transisi kontinu, bukan per-section (CONTEXT #25). */
export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}