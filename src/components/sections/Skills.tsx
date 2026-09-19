import type { CSSProperties } from "react";
import { SKILL_GROUPS } from "@/data/data";

const GLYPHS: Array<Array<[number, number, number, number]>> = [
  // dunia / bangunan
  [
    [3, 11, 10, 2],
    [5, 9, 6, 2],
    [4, 5, 8, 4],
    [4, 5, 2, 2],
    [6, 4, 4, 1],
  ],
  // game controller
  [
    [2, 8, 3, 3],
    [11, 8, 3, 3],
    [7, 11, 2, 2],
    [5, 6, 6, 5],
    [5, 7, 1, 1],
    [10, 7, 1, 1],
  ],
  // web / bintang
  [
    [8, 2, 1, 3],
    [8, 11, 1, 3],
    [8, 6, 1, 1],
    [6, 4, 2, 2],
    [10, 4, 2, 2],
    [3, 8, 2, 2],
    [11, 8, 2, 2],
  ],
];

export function Skills() {
  return (
      <section
        id="skills"
        className="relative z-10 flex min-h-screen flex-col gap-[54px] px-[96px] py-[100px] max-md:px-6 2xl:mx-auto 2xl:w-full 2xl:max-w-[1600px]"
      >
      <div>
        <p className="eyebrow text-ink-soft">WORLD Y / 02600</p>
        <p className="section-title mt-3 text-ink">Skill Constellations</p>
      </div>
      <div className="skill-grid reveal-panel flex w-full flex-wrap gap-[30px]">
        {SKILL_GROUPS.map((g, i) => {
          const dark = i === 1;
          const style = { "--acc": i === 0 ? "#ffd36a" : i === 2 ? "#6ee7f2" : "#c3d9ff" } as CSSProperties;
          return (
            <div
              key={g.title}
              className={`flex min-w-[280px] flex-1 flex-col gap-[22px] p-7 ${
                dark
                  ? "night-panel text-paper"
                  : "pixel-panel panel-body text-ink"
              }`}
              style={style}
            >
              <svg viewBox="0 0 16 16" className="h-7 w-7 pixel-art" aria-hidden="true">
                {GLYPHS[i % GLYPHS.length].map(([x, y, w, h], k) => (
                  <rect key={k} x={x} y={y} width={w} height={h} fill={dark ? "#6ee7f2" : "#10264a"} />
                ))}
              </svg>
              <h3 className="font-pixel text-[20px] font-bold uppercase">
                {g.title}
              </h3>
              <p className={`text-[15px] leading-[1.5] ${dark ? "desc" : "text-ink-soft"}`}>
                {g.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {g.tags.map((t) => (
                  <span key={t} className={dark ? "tag tag-dark" : "tag"}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}