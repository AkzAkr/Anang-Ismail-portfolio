"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PRELOADER_DONE } from "@/animations/preloader";
import { prefersReducedMotion } from "@/animations/text";
import { SITE } from "@/data/data";

const SUN_GRID = [
  "0011000",
  "0111100",
  "1111110",
  "1111111",
  "0111110",
  "0011100",
  "0001000",
];

const CLOUD_GRID = [
  "001011100",
  "011111110",
  "111111111",
];

/** Matahari pixel kecil (dekorasi langit). */
function PxSun() {
  const cell = 8;
  return (
    <svg
      viewBox={`0 0 ${7 * cell} ${7 * cell}`}
      aria-hidden="true"
      className="pointer-events-none"
    >
      {SUN_GRID.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "1" ? (
            <rect
              key={`${x}-${y}`}
              x={x * cell}
              y={y * cell}
              width={cell}
              height={cell}
              fill="var(--color-accent-yellow)"
            />
          ) : null
        )
      )}
    </svg>
  );
}

/** Awan pixel sederhana. */
function PxCloud({ opacity = 1 }: { opacity?: number }) {
  const cell = 6;
  return (
    <svg
      viewBox={`0 0 ${CLOUD_GRID[0].length * cell} ${CLOUD_GRID.length * cell}`}
      aria-hidden="true"
      className="pointer-events-none"
      style={{ opacity }}
    >
      {CLOUD_GRID.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "1" ? (
            <rect
              key={`${x}-${y}`}
              x={x * cell}
              y={y * cell}
              width={cell}
              height={cell}
              fill="var(--color-paper)"
            />
          ) : null
        )
      )}
    </svg>
  );
}

/**
 * Preloader cinematic pixel: langit biru tersembunyi sejenak,
 * barang pixel (matahari & awan) melayang, bar terisi blok,
 * lalu overlay terangkat ke atas membuka dunia.
 */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const bar = el.querySelector<HTMLElement>("[data-pbar-fill]");
    const pct = el.querySelector<HTMLElement>("[data-pbar-pct]");

    const finish = () => {
      el.style.display = "none";
      window.dispatchEvent(new Event(PRELOADER_DONE));
    };

    // Reduced motion / tidak ada elemen bar: langsung buka, tanpa animasi.
    if (prefersReducedMotion() || !bar || !pct) {
      finish();
      return;
    }

    const counter = { v: 0 };
    const tl = gsap.timeline();
    tl.to(counter, {
      v: 100,
      duration: 1.15,
      ease: "power2.inOut",
      onUpdate: () => {
        pct.textContent = String(Math.round(counter.v));
      },
    }, 0)
      .to(bar, { scaleX: 1, duration: 1.15, ease: "power2.inOut" }, 0)
      .to(el, { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, "+=0.12")
      .set(el, { display: "none" })
      .add(finish);

    return () => { tl.kill(); };
  }, []);

  return (
    <>
      <noscript>
        <style>{`.preloader{display:none !important}`}</style>
      </noscript>
      <div
        ref={rootRef}
        className="preloader fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden will-change-transform"
        style={{ background: "linear-gradient(180deg, #8edaf2 0%, #61aede 58%, #4a86d4 100%)" }}
        aria-hidden="true"
      >
        {/* Matahari pixel — pojok atas */}
        <div className="pixel-art absolute top-[13%] right-[13%] w-[clamp(42px,6vw,84px)]">
          <PxSun />
        </div>

        {/* Awan pixel melayang (transform-only, mati di reduced-motion) */}
        <div className="pixel-art absolute top-[20%] left-[-90px] w-[150px] preloader-drift" style={{ animationDuration: "26s" }}>
          <div className="scale-100">
            <PxCloud />
          </div>
        </div>
        <div className="pixel-art px-cloud-3 absolute top-[46%] left-[-200px] w-[230px] preloader-drift" style={{ animationDuration: "40s", opacity: 0.85 }}>
          <div className="scale-[1.4] origin-left">
            <PxCloud />
          </div>
        </div>
        <div className="pixel-art absolute top-[66%] left-[-140px] w-[170px] preloader-drift" style={{ animationDuration: "33s", opacity: 0.55 }}>
          <div className="scale-[1.15] origin-left">
            <PxCloud />
          </div>
        </div>

        <div className="font-pixel text-[13px] text-ink">{SITE.brand}</div>
        <div className="mt-2 text-[11px] font-medium tracking-[2px] text-ink/70 uppercase">
          memuat dunia
        </div>
        <div className="pixel-art mt-7 h-[18px] w-[240px] border-[3px] border-ink p-[3px]">
          <div
            data-pbar-fill
            className="preloader-bar h-full w-full origin-left scale-x-0"
            style={{
              transform: "scaleX(0)",
              background:
                "repeating-linear-gradient(90deg, #ffd36a 0 22px, #ffe39a 22px 26px)",
            }}
          />
        </div>
        <div className="mt-4 flex items-baseline gap-1 font-pixel text-[11px] text-ink">
          <span data-pbar-pct>0</span>
          <span className="preloader-cursor">▌</span>
        </div>
      </div>
    </>
  );
}