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
import { initSectionReveals, initMaskedHeadings } from "@/animations/sections";
import { initDebugOverlay } from "@/animations/debug";
import { initMicroParallax } from "@/animations/micro";
import { setLenis } from "@/animations/lenis-store";

gsap.registerPlugin(ScrollTrigger);

/**
 * World shell untuk halaman /projects — DUNIA YANG SAMA (langit, awan 3D,
 * burung, partikel) tanpa init hero/preloader. Menjaga kesan "satu dunia"
 * walau berpindah halaman. Sky transition & celestials tetap scrub penuh
 * terhadap tinggi dunia arsip.
 */
export function ArchiveWorld({ children }: { children: React.ReactNode }) {
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
        initSectionReveals(),
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

      {/* Dunia: absolute mengisi tinggi konten */}
      <div id="worldLayers" className="absolute inset-0 overflow-hidden">
        <EnvironmentLayer />
        <ParticleLayer count={20} />
      </div>

      {/* Konten arsip hidup DI DALAM dunia */}
      <div className="relative z-50">{children}</div>
    </main>
  );
}