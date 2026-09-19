"use client";

import { SITE } from "@/data/data";
import { PROFILE } from "@/data/data";
import { scrollToTarget } from "@/animations/lenis-store";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen flex-col justify-center px-[96px] py-[120px] max-md:justify-between max-md:px-6 max-md:pt-[120px] max-md:pb-[80px]"
    >
      <div
        data-parallax="10"
        className="flex max-w-[820px] flex-col items-start gap-[18px] 2xl:max-w-[1060px] 2xl:gap-[22px]"
      >
        <div className="hero-eyebrow eyebrow bg-cream-soft/50 px-3 py-[7px] text-ink">
          ● AVAILABLE FOR NEW WORLDS
        </div>
        <h1
          data-hero-title
          className="hero-title font-pixel text-[clamp(48px,6.5vw,88px)] leading-[0.9] text-paper [text-shadow:0_3px_0_rgba(16,38,74,0.25)] 2xl:text-[clamp(88px,7vw,124px)]"
        >
          {SITE.brand}
        </h1>
        <p className="hero-role font-pixel text-[20px] text-ink 2xl:text-[24px]">{PROFILE.role}</p>
        <p className="hero-tagline max-w-[580px] text-[15px] leading-7 text-ink 2xl:max-w-[680px] 2xl:text-[17px]">
          {PROFILE.tagline}
        </p>
        <button onClick={() => scrollToTarget("#about")} className="btn magnetic mt-2">
          JELAJAHI DUNIA →
        </button>
      </div>

      <div className="scroll-cue absolute bottom-[64px] left-[96px] flex items-center gap-3 text-paper max-md:static">
        <div className="h-[2px] w-20 bg-paper" />
        <span className="font-pixel text-[10px]">SCROLL / CAMERA DOWN</span>
      </div>
    </section>
  );
}