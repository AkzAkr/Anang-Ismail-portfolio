import gsap from "gsap";

// MICRO — interaksi halus & terukur (hasil keputusan desain: C dipakai,
// tapi tidak berlebihan). Hanya transform, dorong pointermove, tanpa rAF
// tambahan. Aktif khusus (pointer: fine) + prefers-reduced-motion no-preference.

const FINE_MOTION = "(pointer: fine) and (prefers-reduced-motion: no-preference)";

/**
 * Tombol CTA utama tertarik halus (±8px) menuju kursor.
 * Hanya elemen berkelas `.magnetic`; CSS `.btn.magnetic` menonaktifkan
 * transisi transform agar tidak bertarung dengan GSAP.
 */
function initMagnetic() {
  if (!window.matchMedia(FINE_MOTION).matches) return () => {};
  const els = gsap.utils.toArray<HTMLElement>(".magnetic");
  const cleanups = els.map((el) => {
    const strength = parseFloat(el.dataset.mag || "8");
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      xTo(((e.clientX - (r.left + r.width / 2)) / r.width) * strength);
      yTo(((e.clientY - (r.top + r.height / 2)) / r.height) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  });
  return () => cleanups.forEach((fn) => fn());
}

/**
 * Mouse-parallax halus pada elemen `[data-parallax]`.
 * Elemen dipilih yang TIDAK disentuh tween scroll (menghindari konflik
 * transform): kolom kiri hero, wrapper dalam visual proyek, avatar.
 */
function initMouseParallax() {
  if (!window.matchMedia(FINE_MOTION).matches) return () => {};
  const targets = gsap.utils.toArray<HTMLElement>("[data-parallax]");
  if (!targets.length) return () => {};

  const states = targets.map((el) => {
    const depth = parseFloat(el.dataset.parallax || "12");
    return {
      xTo: gsap.quickTo(el, "x", { duration: 0.6, ease: "power2.out" }),
      yTo: gsap.quickTo(el, "y", { duration: 0.6, ease: "power2.out" }),
      depth,
    };
  });

  const onMove = (e: PointerEvent) => {
    const nx = e.clientX / window.innerWidth - 0.5; // -0.5..0.5
    const ny = e.clientY / window.innerHeight - 0.5;
    states.forEach(({ xTo, yTo, depth }) => {
      xTo(nx * depth);
      yTo(ny * depth * 0.6);
    });
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  return () => window.removeEventListener("pointermove", onMove);
}

/** Gabungan micro-interaction + pembersihannya. */
export function initMicroParallax() {
  const mag = initMagnetic();
  const par = initMouseParallax();
  return () => {
    mag();
    par();
  };
}