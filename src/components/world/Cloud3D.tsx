"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { nightDim } from "./night";

interface Cloud3DProps {
  id: string;
  position: [number, number, number];
  scale: number;
  base: string;
  shade: string;
  opacity: number;
  kind: "far" | "mid" | "hero";
  index: number;
}

interface Bump {
  pos: [number, number, number];
  scl: [number, number, number];
  r: number;
}

/**
 * Single 3D cloud — abstract low-poly cumulus with per-bump shading.
 *
 * Shading logic:
 * - Each bump has a height factor (0=bottom, 1=top)
 * - Bottom bumps get shade color (darker, self-shadow)
 * - Middle bumps get base color
 * - Top bumps get highlight color (bright, sun-lit)
 * - This creates a natural top-lit cloud gradient without complex lighting.
 */
export function Cloud3D({
  position,
  scale,
  base,
  shade,
  opacity,
  kind,
  index,
}: Cloud3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  const drift = useMemo(
    () => ({
      speedX: 0.12 + (index % 5) * 0.04,
      ampX: 0.06 + (index % 3) * 0.025,
      speedY: 0.08 + (index % 4) * 0.03,
      ampY: 0.04 + (index % 3) * 0.015,
      phaseX: (index * 1.7) % (Math.PI * 2),
      phaseY: (index * 1.1) % (Math.PI * 2),
    }),
    [index]
  );

  const rotDrift = useMemo(
    () => ({
      speed: 0.015 + (index % 3) * 0.008,
      amp: 0.012 + (index % 4) * 0.004,
    }),
    [index]
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    groupRef.current.position.x =
      position[0] + Math.sin(t * drift.speedX + drift.phaseX) * drift.ampX;
    groupRef.current.position.y =
      position[1] + Math.sin(t * drift.speedY + drift.phaseY) * drift.ampY;

    groupRef.current.rotation.z =
      Math.sin(t * rotDrift.speed + index) * rotDrift.amp;

    // Night-dim: redupkan material secara kontinu sesuai scroll malam.
    const n = nightDim.value;
    if (n > 0.01) {
      groupRef.current.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh) return;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        const base = (mat.userData.baseOpacity as number) ?? opacity;
        mat.opacity = base * (1 - 0.35 * n);
        mat.emissiveIntensity = 0.3 * (1 - 0.6 * n);
      });
    }
  });

  const segments = kind === "far" ? 8 : kind === "mid" ? 10 : 12;

  const pr = useMemo(() => {
    const seed = index * 7 + 13;
    return (n: number) =>
      ((Math.sin(seed + n) * 43758.5453) % 1 + 1) % 1;
  }, [index]);

  // Pre-compute shading colors — simple 2-color: white top, shadow bottom
  const { topColor, botColor, emissiveColor } = useMemo(() => {
    const baseC = new THREE.Color(base);
    const shadeC = new THREE.Color(shade);

    // Top = pure white
    const top = new THREE.Color("#ffffff");
    // Bottom = shade
    const bot = shadeC;

    // Subtle emissive to keep shadows visible
    const emissive = baseC.clone().multiplyScalar(0.12);

    return { topColor: top, botColor: bot, emissiveColor: emissive };
  }, [base, shade]);

  // Cloud shape: 3-layer cumulus structure with height for shading
  const bumps = useMemo(() => {
    const r = pr;

    return [
      // ── Bottom row: flat base (y ≈ -0.08 to 0) — SHADOW ──
      { pos: [-0.9, -0.05, 0.05 * r(0)] as [number, number, number], scl: [1.3, 0.32, 0.9] as [number, number, number], r: 0.85 + r(1) * 0.15, hf: 0.0 },
      { pos: [0.0, -0.08, -0.03 * r(2)] as [number, number, number], scl: [1.5, 0.35, 1.0] as [number, number, number], r: 0.95 + r(3) * 0.1, hf: 0.0 },
      { pos: [1.0, -0.04, 0.04 * r(4)] as [number, number, number], scl: [1.2, 0.3, 0.85] as [number, number, number], r: 0.8 + r(5) * 0.12, hf: 0.05 },

      // ── Middle row: medium height (y ≈ 0.18-0.25) — MID TONE ──
      { pos: [-0.55, 0.2, -0.06 * r(6)] as [number, number, number], scl: [1.0, 0.5, 0.75] as [number, number, number], r: 0.7 + r(7) * 0.1, hf: 0.45 },
      { pos: [0.15, 0.25, 0.05 * r(8)] as [number, number, number], scl: [1.1, 0.55, 0.8] as [number, number, number], r: 0.75 + r(9) * 0.1, hf: 0.5 },
      { pos: [0.7, 0.18, -0.04 * r(10)] as [number, number, number], scl: [0.95, 0.48, 0.7] as [number, number, number], r: 0.65 + r(11) * 0.1, hf: 0.42 },

      // ── Top row: puffy crown (y ≈ 0.55-0.6) — HIGHLIGHT ──
      { pos: [-0.25, 0.55, 0.03 * r(12)] as [number, number, number], scl: [0.75, 0.6, 0.6] as [number, number, number], r: 0.5 + r(13) * 0.08, hf: 0.85 },
      { pos: [0.35, 0.6, -0.02 * r(14)] as [number, number, number], scl: [0.85, 0.65, 0.65] as [number, number, number], r: 0.55 + r(15) * 0.08, hf: 1.0 },

      // ── Far edges: small trailing wisps — MID-LOW ──
      { pos: [-1.5, 0.05, 0.02 * r(16)] as [number, number, number], scl: [0.6, 0.25, 0.45] as [number, number, number], r: 0.4 + r(17) * 0.06, hf: 0.2 },
      { pos: [1.45, 0.08, -0.03 * r(18)] as [number, number, number], scl: [0.55, 0.22, 0.4] as [number, number, number], r: 0.38 + r(19) * 0.05, hf: 0.25 },
    ];
  }, [pr]);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {bumps.map((bump, i) => {
        // Simple 2-color: bottom (hf < 0.3) = shadow, rest = white
        const color = bump.hf < 0.3 ? botColor : topColor;

        return (
          <mesh
            key={i}
            position={bump.pos}
            scale={bump.scl}
            frustumCulled={false}
          >
            <sphereGeometry args={[bump.r, segments, segments - 2]} />
            <meshStandardMaterial
              color={color}
              emissive={emissiveColor}
              emissiveIntensity={0.3}
              transparent
              opacity={opacity}
              flatShading
              roughness={0.9}
              metalness={0.0}
              userData={{ baseOpacity: opacity }}
            />
          </mesh>
        );
      })}
    </group>
  );
}
