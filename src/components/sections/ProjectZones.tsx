import type { Project } from "@/data/data";
import { ProjectCard } from "./ProjectCard";

/** Controller pixel (kartu game). */
const GAME_GLYPH: Array<[number, number, number, number]> = [
  [2, 8, 3, 3],
  [11, 8, 3, 3],
  [7, 11, 2, 2],
  [5, 6, 6, 5],
  [5, 7, 1, 1],
  [10, 7, 1, 1],
];

/** Jendela + bintang (kartu umum). */
const GENERAL_GLYPH: Array<[number, number, number, number]> = [
  [3, 2, 10, 9],
  [8, 2, 1, 3],
  [8, 9, 1, 1],
  [3, 4, 3, 3],
];

function ZoneGlyph({ blocs }: { blocs: Array<[number, number, number, number]> }) {
  return (
    <svg viewBox="0 0 16 16" className="h-6 w-6 pixel-art" aria-hidden="true">
      {blocs.map(([x, y, w, h], k) => (
        <rect key={k} x={x} y={y} width={w} height={h} fill="#10264a" />
      ))}
    </svg>
  );
}

/**
 * Dua zona proyek (Game Worlds + General Worlds) — markup tunggal yang
 * dipakai Home (proyek unggulan) dan halaman /projects (semua proyek).
 */
export function ProjectZones({ projects }: { projects: Project[] }) {
  const gameProjects = projects.filter((p) => p.kind === "game");
  const generalProjects = projects.filter((p) => p.kind === "general");

  return (
    <div className="flex flex-col gap-[140px]">
      {/* ── Zona Game ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-[64px]">
        <div className="flex items-center gap-4">
          <ZoneGlyph blocs={GAME_GLYPH} />
          <div>
            <p className="eyebrow text-ink-soft">WORLD Y / 03400 · GAME ZONE</p>
            <h3 className="section-title mt-2 text-ink" data-mask-reveal>
              Game Worlds
            </h3>
          </div>
        </div>
        <div id="gameZone" className="flex flex-col gap-[100px]">
          {gameProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} kind="game" />
          ))}
        </div>
      </div>

      {/* Divider halus — tidak memotong kesan dunia yang kontinu */}
      <div className="border-t border-ink/15" aria-hidden="true" />

      {/* ── Zona Umum ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-[64px]">
        <div className="flex items-center gap-4">
          <ZoneGlyph blocs={GENERAL_GLYPH} />
          <div>
            <p className="eyebrow text-ink-soft">WORLD Y / 04000 · GENERAL ZONE</p>
            <h3 className="section-title mt-2 text-ink" data-mask-reveal>
              General Worlds
            </h3>
          </div>
        </div>
        <div id="generalZone" className="flex flex-col gap-[100px]">
          {generalProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} kind="general" />
          ))}
        </div>
      </div>
    </div>
  );
}