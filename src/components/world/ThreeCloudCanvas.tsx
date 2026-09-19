"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Cloud3DScene } from "./Cloud3DScene";

const CAMERA_START_Z = 12;

/**
 * Fixed-position WebGL canvas containing all 3D clouds.
 * Sits between sky background (z-0) and content (z-50).
 * pointer-events: none so it doesn't block UI interaction.
 * Mobile (≤768px): DPR dikunci 1 agar GPU ringan.
 */
export function ThreeCloudCanvas() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return (
    <div
      className="fixed inset-0 z-[5] pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{
          position: [0, 0, CAMERA_START_Z],
          fov: 50,
          near: 0.1,
          far: 100,
        }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Cloud3DScene />
      </Canvas>
    </div>
  );
}
