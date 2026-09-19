import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRELOADER_DONE } from "./preloader";
import { prefersReducedMotion, splitIntoChars, splitIntoWords } from "./text";
import { DEBUG } from "./debug";

gsap.registerPlugin(ScrollTrigger);

// ─── Hero entrance — dipicu oleh preloader selesai ──────────────────────────

/** Hero entrance: eyebrow → masked char reveal → role → tagline → cta → scroll-hint. */
export function initHeroEntrance() {
  const reduce = prefersReducedMotion();
  const eyebrow = document.querySelector<HTMLElement>("#hero .hero-eyebrow");
  const title = document.querySelector<HTMLElement>("#hero .hero-title");
  const role = document.querySelector<HTMLElement>("#hero .hero-role");
  const tagline = document.querySelector<HTMLElement>("#hero .hero-tagline");
  const cta = document.querySelector<HTMLElement>("#hero .btn");
  const hint = document.querySelector<HTMLElement>("#hero .scroll-cue");
  if (!title) return () => {};

  if (reduce) {
    gsap.set([eyebrow, title, role, tagline, cta, hint], { autoAlpha: 1 });
    return () => {};
  }

  splitIntoChars(title);
  const words = title.querySelectorAll<HTMLElement>(".mask-inner");

  const tl = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
  tl.fromTo(
    eyebrow,
    { y: 14, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.6 },
    0
  )
  .fromTo(
    words,
    { yPercent: 115, autoAlpha: 0, filter: "blur(6px)" },
    { yPercent: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.9, stagger: 0.035 },
    0.08
  )
    .fromTo(role, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, 0.45)
    .fromTo(tagline, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, 0.6)
    .fromTo(
      cta,
      { y: 14, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.7 },
      0.8
    )
    .fromTo(
      hint,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.7 },
      1.1
    );

  // Sembunyikan SELURUH konten hero sampai preloader selesai, lalu reveal berurutan.
  gsap.set([eyebrow, ...words, role, tagline, cta, hint], { autoAlpha: 0 });

  const onDone = () => tl.play();
  window.addEventListener(PRELOADER_DONE, onDone);
  return () => {
    window.removeEventListener(PRELOADER_DONE, onDone);
    tl.kill();
  };
}

// ─── Hero exit ──────────────────────────────────────────────────────────────

/** Hero exit: konten melayang ke atas saat kamera pergi. */
export function initHeroExit() {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to("#hero .hero-eyebrow", { y: -140, opacity: 0, ease: "none" }, 0)
      .to("#hero .hero-title", { y: -120, opacity: 0, ease: "none" }, 0)
      .to("#hero .hero-role", { y: -80, opacity: 0, ease: "none" }, 0)
      .to("#hero .hero-tagline", { y: -70, opacity: 0, ease: "none" }, 0)
      .to("#hero .btn", { y: -60, opacity: 0, ease: "none" }, 0)
      .to("#hero .scroll-cue", { opacity: 0, ease: "none" }, 0);
  });
  return () => mm.revert();
}

// ─── Section reveals — panel fade-up + masked headings ──────────────────────

export function initSectionReveals() {
  const mm = gsap.matchMedia();

  mm.add(
    {
      motionOK: "(prefers-reduced-motion: no-preference)",
      motionReduce: "(prefers-reduced-motion: reduce)",
    },
    (ctx) => {
      const { motionOK } = ctx.conditions as { motionOK: boolean };

      // Panel: reveal sinematik — clip dari bawah + blur + rise (sekali main,
      // bukan fade generik). Lalu camera-drift scrub agar panel terasa
      // "melayang" mengikuti kamera selama section melintasi viewport.
      // (#skills dikecualikan — kartunya membawa reveal scrub sendiri.)
      const panels = [
        "#about .reveal-panel",
        "#experience .reveal-panel",
        "#contact .reveal-panel",
      ];
      panels.forEach((sel) => {
        if (motionOK) {
          gsap.fromTo(
            sel,
            { opacity: 0, y: 44, clipPath: "inset(12% 0 12% 0)", filter: "blur(8px)" },
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0% 0 0% 0)",
              filter: "blur(0px)",
              duration: 1.1,
              ease: "power4.out",
              scrollTrigger: { trigger: sel, start: "top 80%", once: true },
              onComplete: () => gsap.set(sel, { clearProps: "clipPath,filter" }),
            }
          );
          // Camera drift: panel bergeser mengikuti scroll (kamera).
          gsap.fromTo(
            sel,
            { yPercent: 6 },
            {
              yPercent: -6,
              ease: "none",
              scrollTrigger: {
                trigger: sel,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );
        } else {
          gsap.fromTo(
            sel,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.15,
              scrollTrigger: { trigger: sel, start: "top 85%", once: true },
            }
          );
        }
      });

      // ── Scrub per section: konten bergerak MENGIKUTI scroll ──
      if (motionOK) {
        // About: avatar island melayang berlawanan arah panel (depth).
        const avatar = "#about .avatar-island";
        if (document.querySelector(avatar)) {
          gsap.fromTo(
            avatar,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: "#about",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        // Skills: kartu terungkap berurutan mengikuti progress scroll.
        const skillCards = gsap.utils.toArray<HTMLElement>("#skills .skill-grid > div");
        if (skillCards.length) {
          gsap.fromTo(
            skillCards,
            { opacity: 0, y: 56, filter: "blur(6px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              ease: "none",
              stagger: 0.25,
              scrollTrigger: {
                trigger: "#skills .skill-grid",
                start: "top 85%",
                end: "top 30%",
                scrub: 0.9,
                invalidateOnRefresh: true,
              },
              onComplete: () => gsap.set(skillCards, { clearProps: "filter" }),
            }
          );
        }

        // Experience: milestone menyala berurutan mengikuti scroll.
        const milestones = gsap.utils.toArray<HTMLElement>("#experience .milestone");
        if (milestones.length) {
          gsap.fromTo(
            milestones,
            { opacity: 0.15, x: -28 },
            {
              opacity: 1,
              x: 0,
              ease: "none",
              stagger: 0.3,
              scrollTrigger: {
                trigger: "#experience .reveal-panel",
                start: "top 80%",
                end: "bottom 55%",
                scrub: 0.9,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      }

      // Project cards: stagger ringan via batch (bila tidak pakai scene pin).
      // Kartu yang dianimasikan adegan Projects (data-batch-skip) dilewati.
      const cardSel = ".project-card:not([data-batch-skip])";
      if (motionOK) {
        ScrollTrigger.batch(cardSel, {
          start: "top 85%",
          once: true,
          onEnter: (els) =>
            gsap.fromTo(
              els,
              { opacity: 0, y: 48 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power4.out",
                stagger: 0.08,
                overwrite: true,
              }
            ),
        });
      } else {
        ScrollTrigger.batch(cardSel, {
          start: "top 88%",
          once: true,
          onEnter: (els) =>
            gsap.fromTo(
              els,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.15,
                stagger: 0.03,
                overwrite: true,
              }
            ),
        });
      }
    }
  );

  return () => mm.revert();
}

// ─── Masked headings — word reveal per section h2 ───────────────────────────

export function initMaskedHeadings() {
  const reduce = prefersReducedMotion();
  if (reduce) return;

  gsap.utils
    .toArray<HTMLElement>("[data-mask-reveal]")
    .forEach((el) => {
      if (el.dataset.masked === "1") return;
      splitIntoWords(el);
      const words = el.querySelectorAll<HTMLElement>(".mask-inner");
      gsap.fromTo(
        words,
        { yPercent: 115, autoAlpha: 0, filter: "blur(6px)" },
        {
          yPercent: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        }
      );
    });

  // Refresh setelah font selesai agar line-break stabil.
  try {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  } catch {}
}

// ─── Projects scene (A) — header pin pendek + kartu clip-reveal scrubbed ────

/**
 * Adegan masuk Projects yang bersifat "sinematik": header mengunci sebentar
 * (pin pendek ≤640px), kartu naik bertahap dengan clip reveal terikat scroll.
 * Hanya untuk desktop + gerak penuh; HP/reduced-motion memakai batch reveal
 * biasa (tanpa pin) via initSectionReveals. Transform/clip-path only.
 * Dijalankan SEBELUM initSectionReveals agar kartu ditandai data-batch-skip
 * sebelum batch lama menanyakannya.
 */
export function initProjectsScene() {
  const mm = gsap.matchMedia();

  mm.add(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    () => {
      const header = document.querySelector<HTMLElement>("#projects > header");
      const rows = gsap.utils.toArray<HTMLElement>(".project-row");
      const panels = gsap.utils.toArray<HTMLElement>(".project-card");
      if (!header || !rows.length) return;

      // Kartu adegan di-klaim di sini → batch lama tidak menyentuhnya lagi.
      panels.forEach((p) => p.setAttribute("data-batch-skip", "1"));

      // 1) Header "mengunci" di puncak layar sejenak.
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: "top top",
          end: "+=640",
          pin: true,
          scrub: 1,
          markers: DEBUG,
        },
      });
      pinTl.to({}, { duration: 1, ease: "none" }, 0);

      // 2) Kartu naik bertahap: clip dari bawah → penuh, terikat scroll.
      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              end: "top 30%",
              scrub: 0.8,
              invalidateOnRefresh: true,
              markers: DEBUG,
            },
          }
        );
      });
    }
  );

  return () => mm.revert();
}
