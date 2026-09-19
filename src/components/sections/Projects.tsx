import Link from "next/link";
import { projects } from "@/data/data";
import { ProjectZones } from "./ProjectZones";

/**
 * Section Projects di Home — hanya menampilkan proyek unggulan (`featured: true`).
 * Semua proyek (termasuk yang `featured: false`) ada di halaman /projects.
 */
export function Projects() {
  const featured = projects.filter((p) => p.featured !== false);

  return (
      <section
        id="projects"
        className="relative z-10 flex min-h-screen flex-col gap-[80px] px-[96px] py-[110px] max-md:px-6 2xl:mx-auto 2xl:w-full 2xl:max-w-[1600px]"
      >
      <header className="flex flex-wrap items-end justify-between gap-6 pb-2">
        <div>
          <p className="eyebrow text-ink-soft">WORLD Y / 03400</p>
          <h2 className="section-title mt-3 text-ink" data-mask-reveal>
            Discovered Worlds
          </h2>
        </div>
        <Link href="/projects" className="btn btn-outline magnetic">
          Lihat Semua Proyek →
        </Link>
      </header>

      <ProjectZones projects={featured} />
    </section>
  );
}