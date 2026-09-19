"use client";

import { CONTACT } from "@/data/data";
import { SITE } from "@/data/data";
import { scrollToTarget } from "@/animations/lenis-store";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-[110px] text-center"
    >
      <div className="reveal-panel flex w-full max-w-[760px] flex-col items-center 2xl:max-w-[920px]">
        <p className="eyebrow text-accent-cyan">FINAL WAYPOINT / 05700</p>
        <h2
          data-mask-reveal
          className="font-pixel mt-5 text-[clamp(28px,4.4vw,52px)] leading-[1.05] text-paper [text-shadow:0_4px_0_rgba(16,38,74,0.4)]"
        >
          Mari bangun dunia kecil berikutnya
        </h2>
        <p className="mt-5 max-w-[480px] text-[15px] leading-7 text-paper/85">
          Terbuka untuk proyek baru, kolaborasi kreatif, dan sinyal dari luar
          dunia ini.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          {CONTACT.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="btn"
            >
              {l.label} →
            </a>
          ))}
        </div>
      </div>

      <footer className="mt-20 flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-6 border-t border-paper/15 pt-7 text-left">
        <div>
          <p className="font-pixel text-[14px] font-bold text-paper">
            {CONTACT.email}
          </p>
          <p className="mt-1 text-[11px] text-paper/50">{CONTACT.footer}</p>
        </div>
        <button
          onClick={() => scrollToTarget("#hero")}
          className="font-pixel bg-transparent border-none p-0 cursor-pointer text-[10px] font-bold text-paper/70 hover:text-paper"
        >
          KEMBALI KE LANGIT ↑
        </button>
      </footer>
    </section>
  );
}