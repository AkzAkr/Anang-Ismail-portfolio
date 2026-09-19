"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SkyBackground } from "./SkyBackground";
import { ThreeCloudCanvas } from "./ThreeCloudCanvas";
import { EnvironmentLayer } from "./EnvironmentLayer";
import { ParticleLayer } from "./ParticleLayer";
import { initSmoothScroll, initSkyTransition } from "@/animations/world";
import { initCelestials } from "@/animations/celestials";
import { initEnvironment } from "@/animations/environment";
import {
  initHeroEntrance,
  initHeroExit,
  initSectionReveals,
  initMaskedHeadings,
  initProjectsScene,
} from "@/animations/sections";
import { initMicroParallax } from "@/animations/micro";
import { initDebugOverlay } from "@/animations/debug";
import { setLenis } from "@/animations/lenis-store";
import { CloudWipe } from "./CloudWipe";

gsap.registerPlugin(ScrollTrigger);

export function SkyWorld({ children }: { children: React.ReactNode }) {
  const worldRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const worldEl = worldRef.current;
    if (!worldEl) return;

    const ctx = gsap.context(() => {
      const lenis = initSmoothScroll();
      setLenis(lenis);

const cleanups = [
        initSkyTransition(worldEl),
        initCelestials(worldEl),
        initEnvironment(worldEl),
        initHeroExit(),
        // Adegan Projects di-inisialisasi SEBELUM section reveals agar
        // kartunya ditandai data-batch-skip sebelum batch lama menanyakannya.
        initProjectsScene(),
        initSectionReveals(),
        initHeroEntrance(),
      ];
      initMaskedHeadings();
      const microCleanup = initMicroParallax();
      const debugCleanup = initDebugOverlay();

      const onLoad = () => ScrollTrigger.refresh();
      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("load", onLoad);
        window.removeEventListener("resize", onResize);
        cleanups.forEach((fn) => fn());
        debugCleanup();
        microCleanup();
        lenis?.destroy();
        setLenis(null);
      };
    }, worldRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={worldRef} id="world" className="relative w-full">
      <SkyBackground />

      {/* 3D Cloud Canvas — fixed, behind content */}
      <ThreeCloudCanvas />

      {/* Dunia: absolute mengisi tinggi konten, bukan fixed 7200px */}
      <div id="worldLayers" className="absolute inset-0 overflow-hidden">
        <EnvironmentLayer />
        <ParticleLayer count={26} />
      </div>

      {/* Konten portfolio hidup DI DALAM dunia */}
      <div className="relative z-50">{children}</div>

      {/* Awan foreground menyapu antar zone besar — di depan konten, di bawah nav */}
      <CloudWipe />
    </main>
  );
}
