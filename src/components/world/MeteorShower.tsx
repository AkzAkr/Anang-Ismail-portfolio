import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ShowerDef {
  left: string;
  top: string;
  w: string;
  dx: string;
  dy: string;
  dur: number;
  delay: number;
  repeatDelay: number;
}

/** Sprite statis (loop acak) — hanya kepalanya saja, trail tercipta dari gerak. */
function ShootingHead() {
  return (
    <svg
      viewBox="0 0 8 8"
      shapeRendering="crispEdges"
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <rect x={3} y={3} width={2} height={2} fill="#ffffff" />
      <rect x={2} y={3} width={1} height={1} fill="#d9f4ff" opacity={0.45} />
      <rect x={5} y={3} width={1} height={1} fill="#d9f4ff" opacity={0.45} />
      <rect x={3} y={2} width={1} height={1} fill="#d9f4ff" opacity={0.45} />
      <rect x={3} y={5} width={1} height={1} fill="#d9f4ff" opacity={0.45} />
    </svg>
  );
}

const SHOOTERS: ShowerDef[] = [
  { left: "62vw", top: "6vh",  w: "clamp(26px,3.2vw,44px)", dx: "36vw", dy: "34vh", dur: 1.6, delay: 0,    repeatDelay: 5.5 },
  { left: "18vw", top: "14vh", w: "clamp(20px,2.6vw,36px)", dx: "32vw", dy: "28vh", dur: 2.0, delay: 2.8,  repeatDelay: 7.2 },
  { left: "82vw", top: "22vh", w: "clamp(22px,2.8vw,38px)", dx: "-34vw", dy: "30vh", dur: 1.8, delay: 6.1,  repeatDelay: 6.4 },
];

/**
 * MeteorShower — stiker dinamis berulang (time-based, bukan scrub).
 * Muncul periodik di zona langit malam, cocok di atas/area Contact.
 * Respect reduced-motion: langsung sembunyi, tidak bikin timeline.
 */
export function MeteorShower() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-shower-meteor]"));
    const mm = gsap.matchMedia();

    mm.add(
      {
        motionOK: "(prefers-reduced-motion: no-preference)",
        motionReduce: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const { motionOK } = ctx.conditions as { motionOK: boolean };

        if (!motionOK) {
          gsap.set(els, { autoAlpha: 0 });
          return;
        }

        // Tween yang dibuat di callback mm terekam otomatis dan dibunuh
        // saat mm.revert() (termasuk repeat -1).
        els.forEach((el, i) => {
          const def = SHOOTERS[i];
          if (!def) return;

          gsap
            .timeline({
              repeat: -1,
              repeatDelay: def.repeatDelay,
              delay: def.delay,
              defaults: { ease: "power1.in" },
            })
            .set(el, { x: 0, y: 0, autoAlpha: 0 })
            .fromTo(
              el,
              { x: 0, y: 0, autoAlpha: 0 },
              { x: def.dx, y: def.dy, autoAlpha: 1, duration: def.dur }
            )
            .to(el, { autoAlpha: 0, duration: 0.35 });
        });
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0">
      {SHOOTERS.map((def, i) => (
        <div
          key={i}
          data-shower-meteor
          className="celestial-sprite absolute"
          style={{ left: def.left, top: def.top, width: def.w, opacity: 0 }}
        >
          <ShootingHead />
        </div>
      ))}
    </div>
  );
}