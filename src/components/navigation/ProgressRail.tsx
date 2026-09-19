"use client";

import { useEffect, useState } from "react";
import { SECTIONS } from "@/data/worldObjects";
import { scrollToTarget } from "@/animations/lenis-store";

export function ProgressRail() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && setActive(e.target.id)
        ),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="world-progress fixed right-[80px] top-[360px] z-[70] max-md:hidden">
      {SECTIONS.map((id) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollToTarget(`#${id}`)}
            className={`cursor-pointer bg-transparent border-none p-0 text-[14px] ${
              isActive
                ? "text-accent-yellow font-bold"
                : "idle text-paper opacity-60"
            }`}
            aria-label={`Navigate to ${id}`}
          >
            {isActive ? "◆" : "□"}
          </button>
        );
      })}
    </div>
  );
}