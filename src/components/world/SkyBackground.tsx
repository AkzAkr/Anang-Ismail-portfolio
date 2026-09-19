"use client";

import { PixelSun, PixelMoon, PixelMeteor } from "./CelestialSprites";
import { MeteorShower } from "./MeteorShower";

/** Opacity ghost ekor meteor: makin jauh dari kepala makin redup. */
const METEOR_GHOSTS = [0.55, 0.42, 0.3, 0.2, 0.12];
/** Ukuran ghost (px): dua terdekat kepala sedikit lebih besar. */
const GHOST_SIZES = (i: number) => (i < 2 ? "9px" : "7px");

/** Langit fixed + bintang + matahari/bulan/meteor pixel. Warna digerakkan GSAP via CSS vars (murah, tanpa rebuild gradient string per-tick). */
export function SkyBackground() {
  return (
    <>
      <div
        id="skyBg"
        className="fixed inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, var(--sky-top, #6ec6e0), var(--sky-bot, #bfe9f0))",
        }}
      />
      {/* Bintang berkedip 3 lapis (phase berbeda). Opacity lapisan dikendalikan GSAP,
          opacity dalam = CSS kernel (tidak bentrok) */}
      <div
        id="stars"
        className="pointer-events-none fixed inset-0 z-[1] opacity-0"
      >
        <div
          className="star-field"
          style={{
            backgroundImage: [
              "radial-gradient(2px 2px at 10% 20%, #fff 100%, transparent 100%)",
              "radial-gradient(3px 3px at 40% 15%, #fff 100%, transparent 100%)",
              "radial-gradient(2px 2px at 75% 35%, #fff 100%, transparent 100%)",
              "radial-gradient(2px 2px at 92% 10%, #fff 100%, transparent 100%)",
            ].join(","),
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          className="star-field"
          style={{
            backgroundImage: [
              "radial-gradient(2px 2px at 25% 55%, #fff 100%, transparent 100%)",
              "radial-gradient(2px 2px at 60% 70%, #fff 100%, transparent 100%)",
              "radial-gradient(3px 3px at 15% 85%, #fff 100%, transparent 100%)",
              "radial-gradient(2px 2px at 33% 40%, #fff 100%, transparent 100%)",
            ].join(","),
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          className="star-field"
          style={{
            backgroundImage: [
              "radial-gradient(3px 3px at 85% 80%, #fff 100%, transparent 100%)",
              "radial-gradient(2px 2px at 50% 90%, #fff 100%, transparent 100%)",
            ].join(","),
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      {/* Celestial pixel: matahari (day) → bulan (night) + meteor (dusk).
          Posisi & opacity digerakkan GSAP scrub, tersinkron ramp langit. */}
      <div
        data-celestials
        className="pointer-events-none fixed inset-0 z-[1]"
        aria-hidden="true"
      >
        <div
          data-sun
          className="celestial-sprite absolute"
          style={{ left: "64vw", top: "13vh", width: "clamp(72px, 9vw, 140px)", opacity: 0 }}
        >
          <PixelSun />
        </div>
        <div
          data-moon
          className="celestial-sprite absolute"
          style={{ left: "13vw", top: "15vh", width: "clamp(56px, 7vw, 110px)", opacity: 0 }}
        >
          <PixelMoon />
        </div>
        <div
          data-meteor
          className="celestial-sprite absolute"
          style={{
            left: "56vw",
            top: "8vh",
            width: "clamp(34px, 4vw, 56px)",
            opacity: 0,
          }}
        >
          <div className="meteor-head">
            <PixelMeteor />
          </div>
          {METEOR_GHOSTS.map((o, i) => (
            <div
              key={i}
              data-ghost
              className="meteor-ghost"
              style={{ opacity: o, width: GHOST_SIZES(i), height: GHOST_SIZES(i) }}
            />
          ))}
        </div>
        <div
          data-meteor
          data-dir="-1"
          className="celestial-sprite absolute"
          style={{
            left: "8vw",
            top: "30vh",
            width: "clamp(30px, 3.5vw, 48px)",
            opacity: 0,
          }}
        >
          <div className="meteor-head">
            <PixelMeteor />
          </div>
          {METEOR_GHOSTS.map((o, i) => (
            <div
              key={i}
              data-ghost
              className="meteor-ghost"
              style={{ opacity: o, width: GHOST_SIZES(i), height: GHOST_SIZES(i) }}
            />
          ))}
        </div>
      </div>

      {/* Meteor shower malam (time-based, loop): lapisan muncul saat night
          (digerakkan celestials.ts pada progress ~0.78), meteor-nya sendiri
          berlari real-time di dalamnya. */}
      <div
        data-shower-layer
        className="pointer-events-none fixed inset-0 z-[1]"
        aria-hidden="true"
        style={{ opacity: 0 }}
      >
        <MeteorShower />
      </div>
    </>
  );
}