import { projects } from "@/data/data";
import { ProjectZones } from "./ProjectZones";

/**
 * Halaman /projects — ARSIP SEMUA PROYEK (featured maupun tidak).
 * Markup zona dibagikan dengan Home (ProjectZones) agar tetap satu sumber.
 */
export function ArchiveProjects() {
  const total = projects.length;
  const game = projects.filter((p) => p.kind === "game").length;
  const general = projects.filter((p) => p.kind === "general").length;

  return (
    <section
      id="archive"
      className="relative z-10 flex min-h-screen flex-col gap-[80px] px-[96px] pt-[120px] pb-[110px] max-md:px-6"
    >
      <header className="flex flex-wrap items-end justify-between gap-6 pb-2">
        <div>
          <p className="eyebrow text-ink-soft">
            WORLD ARCHIVE · {total} WORLDS ({game} GAME / {general} GENERAL)
          </p>
          <h2 className="section-title mt-3 text-ink" data-mask-reveal>
            Project Archive
          </h2>
          <p className="desc mt-5 max-w-[560px] text-[15px] leading-7">
            Semua dunia yang pernah saya bangun — unggulan maupun eksperimen —
            tersusun dalam satu langit yang sama.
          </p>
        </div>
      </header>

      <ProjectZones projects={projects} />
    </section>
  );
}