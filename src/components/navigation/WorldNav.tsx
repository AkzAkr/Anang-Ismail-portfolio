"use client";

import { useEffect, useState } from "react";
import { SECTIONS } from "@/data/worldObjects";
import { SITE } from "@/data/data";
import { scrollToTarget } from "@/animations/lenis-store";

const LABELS: Record<string, string> = {
  hero: "Home",
  about: "About",
  skills: "Skills",
  projects: "Projects",
  experience: "Experience",
  contact: "Contact",
};

// Satu sumber kebenaran dengan ProgressRail (SECTIONS): 6 node = 6 item nav.
const NAV_ITEMS = [...SECTIONS];

export function WorldNav() {
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 right-0 left-0 z-[70] flex items-center justify-between px-[96px] py-[14px] max-md:px-6">
      <button
        onClick={() => scrollToTarget("#hero")}
        className="flex items-center gap-2.5 bg-transparent border-none p-0 cursor-pointer"
      >
        <span className="block h-[18px] w-[18px] border-[3px] border-ink bg-accent-yellow" />
        <span className="font-pixel text-[16px] font-bold text-ink">{SITE.brand}</span>
      </button>
      <div className="font-pixel flex items-center gap-7 text-[10px] tracking-wide max-md:hidden">
        {NAV_ITEMS.map((id) => (
          <button
            key={id}
            onClick={() => scrollToTarget(`#${id}`)}
            className={`bg-transparent border-none p-0 cursor-pointer font-pixel text-[10px] font-bold tracking-wide uppercase text-ink transition-opacity ${
              active === id ? "opacity-100" : "opacity-50 hover:opacity-80"
            }`}
          >
            {LABELS[id]}
          </button>
        ))}
      </div>
      {/* Hamburger mobile — menu dirender kondisional agar DOM default tetap 7 tombol */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Tutup menu" : "Buka menu"}
        aria-expanded={open}
        className="hidden bg-transparent border-none p-2 cursor-pointer max-md:block"
      >
        <span className="font-pixel text-[16px] font-bold text-ink">
          {open ? "✕" : "☰"}
        </span>
      </button>
      {open && (
        <div className="absolute top-full right-4 left-4 hidden flex-col gap-1 border-[3px] border-ink bg-cream-soft/95 p-3 shadow-[10px_14px_0_0_rgba(16,38,74,0.33)] max-md:flex">
          {NAV_ITEMS.map((id) => (
            <button
              key={id}
              onClick={() => {
                setOpen(false);
                scrollToTarget(`#${id}`);
              }}
              className={`bg-transparent border-none p-3 text-left cursor-pointer font-pixel text-[12px] font-bold tracking-wide uppercase text-ink ${
                active === id ? "opacity-100" : "opacity-60"
              }`}
            >
              {active === id ? "◆ " : "□ "}{LABELS[id]}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}