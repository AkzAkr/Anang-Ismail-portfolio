import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { DEBUG } from "./debug";

gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll(): Lenis | null {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }
  const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

/** Langit day -> dusk -> night via CSS vars. Murah: tanpa rebuild gradient string per-tick. */
export function initSkyTransition(worldEl: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add(
    {
      motionOK: "(prefers-reduced-motion: no-preference)",
      motionReduce: "(prefers-reduced-motion: reduce)",
    },
    (ctx) => {
      const { motionOK } = ctx.conditions as { motionOK: boolean };
      const stars = document.getElementById("stars");
      const sky = document.getElementById("skyBg");
      if (!sky) return;

      if (!motionOK) {
        sky.style.setProperty("--sky-top", "#6698de");
        sky.style.setProperty("--sky-bot", "#d97886");
        return;
      }

      gsap.set(sky, { "--sky-top": "#55c8ee", "--sky-bot": "#6698de" } as gsap.TweenVars);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: worldEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
          markers: DEBUG,
        },
      });

      // 0 -> 45%: day bertahan, 45% -> 75%: ke dusk, 75% -> 100%: ke night
      tl.to(sky, { "--sky-top": "#6698de", "--sky-bot": "#d97886", ease: "none", duration: 1 }, 0.35);
      tl.to(sky, { "--sky-top": "#3a2f68", "--sky-bot": "#10183f", ease: "none", duration: 1 }, 0.72);

      if (stars) {
        tl.fromTo(stars, { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.4 }, 0.6);
      }
    }
  );

  return () => mm.revert();
}
