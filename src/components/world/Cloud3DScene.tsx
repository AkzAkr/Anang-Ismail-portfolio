"use client";

import { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cloud3D } from "./Cloud3D";
import { worldObjects } from "@/data/worldObjects";
import { nightDim, smoothstep } from "./night";
import { DEBUG } from "@/animations/debug";

gsap.registerPlugin(ScrollTrigger);

// World dimensions — maps page scroll to 3D space
const WORLD_HEIGHT = 7000; // matches max y in worldObjects (6700 + padding)
const VIEWPORT_WIDTH = 100; // maps 100% x to 3D units

/**
 * Scene orchestrator: renders all 3D clouds and controls camera
 * position via GSAP ScrollTrigger for cinematic parallax.
 */
export function Cloud3DScene() {
  const { camera, size } = useThree();
  const cloudGroupRef = useRef<THREE.Group>(null);
  const ambLight = useRef<THREE.AmbientLight>(null);
  const hemiLight = useRef<THREE.HemisphereLight>(null);
  const dirLight = useRef<THREE.DirectionalLight>(null);
  const dir2Light = useRef<THREE.DirectionalLight>(null);

  // Night-dim: cahaya dan warna awan meredup kontinu saat mendekati malam.
  // maxScroll di-cache (bukan dibaca tiap frame → tanpa forced reflow),
  // lampu hanya disentuh saat progress berubah.
  const scrollCache = useRef({ max: 1, lastY: -1, lastN: -1 });
  useEffect(() => {
    const sync = () => {
      scrollCache.current.max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
    };
    sync();
    window.addEventListener("resize", sync);
    // ScrollTrigger.refresh setelah font/layout stabil juga mengubah tinggi dunia.
    const t = setTimeout(sync, 2500);
    return () => {
      window.removeEventListener("resize", sync);
      clearTimeout(t);
    };
  }, []);
  useFrame(() => {
    const c = scrollCache.current;
    const y = window.scrollY;
    if (y === c.lastY) return;
    c.lastY = y;
    const p = Math.min(1, Math.max(0, y / c.max));
    const n = smoothstep(0.68, 0.9, p);
    if (n === c.lastN) return;
    c.lastN = n;
    nightDim.value = n;

    const dim = (l: THREE.Object3D | null, base: number, factor: number) => {
      if (l && "intensity" in l) (l as unknown as THREE.Light).intensity = base * (1 - factor * n);
    };
    dim(ambLight.current, 1.5, 0.6);
    dim(hemiLight.current, 0.8, 0.5);
    dim(dirLight.current, 1.5, 0.68);
    dim(dir2Light.current, 0.6, 0.45);
  });

  // Convert worldObjects data to 3D positions
  const clouds3D = useMemo(() => {
    return worldObjects.map((obj) => {
      // Map x% to 3D x: 0% -> -VIEWPORT_WIDTH/2, 100% -> +VIEWPORT_WIDTH/2
      const x3d = (obj.x / 100) * VIEWPORT_WIDTH - VIEWPORT_WIDTH / 2;
      // Map y px to 3D y: invert (page goes down = positive y in 3D)
      const y3d = -(obj.y / WORLD_HEIGHT) * 40;
      // z from data (negative = farther from camera)
      const z3d = obj.z;

      return {
        ...obj,
        position: [x3d, y3d, z3d] as [number, number, number],
      };
    });
  }, []);

  // GSAP: Camera scrolls down through the world as user scrolls page
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Camera Y travels through the world
      gsap.to(camera.position, {
        y: -35,
        ease: "none",
        scrollTrigger: {
          trigger: "#world",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
          invalidateOnRefresh: true,
          markers: DEBUG,
        },
      });

      // Subtle camera X drift for parallax feel
      gsap.to(camera.position, {
        x: 2,
        ease: "none",
        scrollTrigger: {
          trigger: "#world",
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
          markers: DEBUG,
        },
      });
    });

    return () => mm.revert();
  }, [camera]);

  // Update camera projection on resize
  useEffect(() => {
    const onResize = () => {
      const cam = camera as THREE.PerspectiveCamera;
      cam.aspect = size.width / size.height;
      cam.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [camera, size]);

  return (
    <>
      {/* Lighting — bright for cloud visibility with shading */}
      <ambientLight ref={ambLight} intensity={1.5} color="#ffffff" />
      <hemisphereLight
        ref={hemiLight}
        color="#e8f4ff"
        groundColor="#bfe9f0"
        intensity={0.8}
      />
      <directionalLight
        ref={dirLight}
        position={[5, 20, 10]}
        intensity={1.5}
        color="#ffffff"
      />
      <directionalLight
        ref={dir2Light}
        position={[-8, 8, -5]}
        intensity={0.6}
        color="#ddeeff"
      />

      {/* All clouds */}
      <group ref={cloudGroupRef}>
        {clouds3D.map((cloud, i) => (
          <Cloud3D
            key={cloud.id}
            id={cloud.id}
            position={cloud.position}
            scale={cloud.scale}
            base={cloud.base}
            shade={cloud.shade}
            opacity={cloud.opacity}
            kind={cloud.kind}
            index={i}
          />
        ))}
      </group>
    </>
  );
}
