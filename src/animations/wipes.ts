import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CLOUD_WIPES } from "@/data/worldObjects";
import { DEBUG } from "./debug";

gsap.registerPlugin(ScrollTrigger);

/**
 * CLOUD WIPE (B — wajib): gugus awan pixel foreground menyapu layar saat
 * melewati batas antar zona besar (Skills→Projects, Projects→Experience).
 * Terikat scroll (scrub) → gerakan terasa seperti bagian dari perjalanan
 * kamera, bukan animasi lepas. Hanya transform/opacity, marker DEBUG untuk dev.
 */
export function initCloudWipes() {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    CLOUD_WIPES.forEach((wipe) => {
      const layer = document.getElementById(wipe.id);
      const clouds = layer
        ? gsap.utils.toArray<HTMLElement>("[data-wipe-cloud]", layer)
        : [];
      if (!layer || !clouds.length) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: wipe.trigger,
            start: wipe.start,
            end: wipe.end,
            scrub: 1,
            invalidateOnRefresh: true,
            markers: DEBUG,
          },
          defaults: { ease: "none" },
        })
        // Lapisan pudar-muncul cepat → menyapu → pudar-hilang.
        .fromTo(layer, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.06 }, 0)
        .fromTo(
          clouds,
          { x: -280, rotation: (i: number) => (i % 2 ? 2 : -2) },
          {
            x: () => window.innerWidth + 280,
            rotation: 0,
            duration: 1,
            stagger: 0.1,
          },
          0
        )
        .to(layer, { autoAlpha: 0, duration: 0.14 }, 0.84);
    });
  });

  return () => mm.revert();
}