"use client";

import { useEffect } from "react";
import { CLOUD_WIPES, type CloudWipeDef } from "@/data/worldObjects";
import { initCloudWipes } from "@/animations/wipes";

/**
 * Bentuk awan pixel (dua tonjolan) — konsisten dengan kosakata visual
 * preloader, dibesarkan untuk foreground.
 */
const WIPE_CLOUD_GRID = [
  "000111100000",
  "001111111100",
  "011111111111",
  "111111111110",
  "011111111100",
  "001111110000",
  "000111100000",
];

function WipeCloudSprite({
  cloud,
  index,
}: {
  cloud: { w: number; opacity: number };
  index: number;
}) {
  const cell = 12;
  const cols = WIPE_CLOUD_GRID[0].length;
  const rows = WIPE_CLOUD_GRID.length;
  return (
    <svg
      aria-hidden="true"
      data-wipe-cloud={`${index}`}
      className="absolute pointer-events-none will-change-transform"
      style={{
        width: cloud.w,
        left: 0,
        top: 0,
        opacity: cloud.opacity,
        shapeRendering: "crispEdges",
      }}
      viewBox={`0 0 ${cols * cell} ${rows * cell}`}
    >
      {WIPE_CLOUD_GRID.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "1" ? (
            <rect
              key={`${x}-${y}`}
              x={x * cell}
              y={y * cell}
              width={cell}
              height={cell}
              fill="var(--color-paper)"
            />
          ) : null
        )
      )}
    </svg>
  );
}

function WipeLayer({ wipe }: { wipe: CloudWipeDef }) {
  return (
    <div
      id={wipe.id}
      data-wipe-layer
      role="presentation"
      className="cloud-wipe pointer-events-none fixed inset-0 z-[60]"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      {wipe.clouds.map((c, i) => (
        <div
          key={i}
          className={`wipe-cloud wipe-cloud-${i} absolute`}
          style={{ left: `${c.x}%`, top: `${c.y}vh` }}
        >
          <WipeCloudSprite cloud={c} index={i} />
        </div>
      ))}
    </div>
  );
}

/**
 * Awan foreground menyapu antar zone besar — dirender di atas konten
 * (z-60, di bawah nav z-70) agar terasa "di depan kamera".
 */
export function CloudWipe() {
  useEffect(() => initCloudWipes(), []);
  return (
    <>
      {CLOUD_WIPES.map((wipe) => (
        <WipeLayer key={wipe.id} wipe={wipe} />
      ))}
    </>
  );
}