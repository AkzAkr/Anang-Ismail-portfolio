import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DEBUG } from "./debug";

gsap.registerPlugin(ScrollTrigger);

/**
 * CELESTIALS — matahari pixel (day) → bulan (night) + meteor (dusk).
 * Satu timeline scrub, sinkron dengan ramp langit di world.ts:
 *   dusk mulai 0.35  → matahari tenggelam tepat di situ,
 *   night mulai 0.72 → bulan penuh, bintang sudah nyala (0.6 di world.ts).
 * Hanya transform/opacity/autoAlpha — murah & tidak menyentuh paralaks.
 */
export function initCelestials(worldEl: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add(
    {
      motionOK: "(prefers-reduced-motion: no-preference)",
      motionReduce: "(prefers-reduced-motion: reduce)",
    },
    (ctx) => {
      const { motionOK } = ctx.conditions as { motionOK: boolean };
      const sun = document.querySelector<HTMLElement>("[data-sun]");
      const moon = document.querySelector<HTMLElement>("[data-moon]");
      const meteors = gsap.utils.toArray<HTMLElement>("[data-meteor]");
      const showerLayer = document.querySelector<HTMLElement>("[data-shower-layer]");
      if (!sun || !moon) return;

      if (!motionOK) {
        gsap.set(sun, { autoAlpha: 1 });
        gsap.set([moon, ...meteors], { autoAlpha: 0 });
        gsap.set(showerLayer, { autoAlpha: 0 });
        return;
      }

      gsap.set(sun, { autoAlpha: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: worldEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
          invalidateOnRefresh: true,
          markers: DEBUG,
        },
      });

      // Matahari: drift halus saat day → tenggelam persis di ambang dusk (0.35)
      tl.to(sun, { x: "6vw", y: "7vh", autoAlpha: 0, duration: 0.3 }, 0.05);

      // Bulan: terbit mengisi dusk sambil MELA YYANG ke kanan-atas (drift mengikuti
// kamera), keluar dari kolom konten yang berada di kiri-tengah, lalu terus
// mengambang pelan di zona Contact. Dimulai dari top 15vh & bergeser -5vh/-1vh
// sehingga final ~9vh — DI BAWAH bar navigasi dan DI ATAS kolom konten.
// (Breadth/bob idle ada di CSS moon-breathe pada svg-nya.)
      tl.fromTo(
        moon,
        { x: 0, y: 0, autoAlpha: 0 },
        { x: "60vw", y: "-5vh", autoAlpha: 1, duration: 0.4 },
        0.46
      ).to(moon, { x: "+=6vw", y: "-=1vh", duration: 0.6 }, 0.9);

      // Meteor shower malam: lapisan pudar-nyala begitu night tiba (0.78),
      // meteor-nya loop real-time (MeteorShower), terlihat ~contact.
      if (showerLayer) {
        tl.to(showerLayer, { autoAlpha: 1, duration: 0.4 }, 0.78);
      }

      // Meteor (dusk): ekor dihasilkan oleh gerak, bukan gambar.
      // Kepala + 5 ghost di-stagger menuju TITIK TUJUAN YANG SAMA; karena scrub
      // terikat scroll, saat di-scroll kepala memimpin dan ghost tertinggal —
      // ekor "mengalir" di belakang kepala (comet trail), bukan sprite digeser.
      meteors.forEach((m, i) => {
        const dir = parseInt(m.dataset.dir || "1", 10);
        const start = 0.42 + i * 0.09;
        const dx = `${dir * 22}vw`;
        const dy = "18vh";

        const head = m.querySelector<HTMLElement>(".meteor-head");
        const ghosts = gsap.utils.toArray<HTMLElement>("[data-ghost]", m);
        if (!head) return;

        // Container: nyala saat jendela meteor (anak-anak punya autoAlpha masing2,
        // tapi parent inline opacity:0 → harus nyala dulu agar terlihat).
        tl.fromTo(
          m,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.13 },
          start
        ).to(m, { autoAlpha: 0, duration: 0.04 }, start + 0.16);

        // Kepala: terang memimpin, menghilang langsung setelah tiba.
        tl.fromTo(
          head,
          { x: 0, y: 0, autoAlpha: 0 },
          { x: dx, y: dy, autoAlpha: 1, duration: 0.1 },
          start
        ).to(head, { autoAlpha: 0, duration: 0.04 });

        // Ghost ekor: start mundur sedikit demi sedikit → tertinggal di belakang.
        ghosts.forEach((g, gi) => {
          const st = start + 0.016 * (gi + 1);
          tl.fromTo(
            g,
            { x: 0, y: 0, autoAlpha: 0 },
            { x: dx, y: dy, autoAlpha: 1, duration: 0.1 },
            st
          ).to(g, { autoAlpha: 0, duration: 0.03 });
        });
      });
    }
  );

  return () => mm.revert();
}