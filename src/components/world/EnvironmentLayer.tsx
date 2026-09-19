"use client";

import { flocks } from "@/data/environment";
import { PixelBird } from "./PixelSprites";

/** Layer 4: burung melintasi langit. z di bawah konten teks tapi di atas awan jauh. */
export function EnvironmentLayer() {
  return (
    <>
      {flocks.map((f) => (
        <div
          key={f.id}
          className="pointer-events-none absolute flex gap-3"
          data-flock-id={f.id}
          data-depth={f.depth}
          data-dir={f.dir}
          style={{
            left: `${f.x}%`,
            top: `${f.y}px`,
            width: 34 * f.scale * f.count,
            height: 26 * f.scale,
            zIndex: Math.round(16 + f.depth * 20),
            opacity: 0.85,
          }}
        >
          {Array.from({ length: f.count }).map((_, i) => (
            <div
              key={i}
              data-bird
              className="h-full flex-1"
              style={{ transform: `translateY(${(i % 2) * 8}px)` }}
            >
              <PixelBird />
            </div>
          ))}
        </div>
      ))}
    </>
  );
}