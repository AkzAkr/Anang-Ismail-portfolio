import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ENVIRONMENT — burung melintasi langit.
 * Semua scrub (terikat scroll) + idle halus. Hanya transform/opacity.
 */
export function initEnvironment(worldEl: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    // Burung: terbang horizontal melintasi dunia mengikuti scroll + flap
    gsap.utils.toArray<HTMLElement>("[data-flock-id]").forEach((el) => {
      const dir = parseInt(el.dataset.dir || "1", 10);

      gsap.fromTo(
        el,
        { x: () => window.innerWidth * -0.15 * dir },
        {
          x: () => window.innerWidth * 0.55 * dir,
          ease: "none",
          scrollTrigger: {
            trigger: worldEl,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    // Kepak sayap: cross-fade 2 frame, steps terasa pixel (bukan tween halus)
    gsap.utils.toArray<HTMLElement>("[data-bird]").forEach((bird, i) => {
      const up = bird.querySelector(".bird-frame-up");
      const down = bird.querySelector(".bird-frame-down");
      if (!up || !down) return;

      const tl = gsap.timeline({
        repeat: -1,
        delay: (i % 5) * 0.18,
      });
      tl.to(up, { opacity: 0, duration: 0.16, ease: "steps(1)" })
        .to(down, { opacity: 1, duration: 0.16, ease: "steps(1)" }, "<")
        .to(down, { opacity: 0, duration: 0.16, ease: "steps(1)" }, "+=0.16")
        .to(up, { opacity: 1, duration: 0.16, ease: "steps(1)" }, "<");
    });
  });

  return () => mm.revert();
}
