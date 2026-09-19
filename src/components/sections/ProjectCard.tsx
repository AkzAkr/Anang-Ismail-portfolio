import type { Project } from "@/data/data";

/** Palet gradien visual per zona: game bernuansa nila/malam, umum cyan/siang. */
const GAME_GRADIENTS = [
  "linear-gradient(135deg, #6698de, #d97886)",
  "linear-gradient(135deg, #3a2f68, #10183f)",
  "linear-gradient(135deg, #55c8ee, #6698de)",
];

const GENERAL_GRADIENTS = [
  "linear-gradient(135deg, #55c8ee, #6698de)",
  "linear-gradient(135deg, #d97886, #55c8ee)",
  "linear-gradient(135deg, #6698de, #3a2f68)",
];

/**
 * Baris proyek (referensi): visual 500×270 + night-card.
 * Hover ringan: kartu naik, media membesar halus — CSS-only (murah).
 * `index` adalah nomor kartu DI DALAM zonanya (mulai 0).
 */
export function ProjectCard({
  project,
  index,
  kind,
}: {
  project: Project;
  index: number;
  kind: "game" | "general";
}) {
  const palette = kind === "game" ? GAME_GRADIENTS : GENERAL_GRADIENTS;
  return (
    <article className={`project-row group ${index % 2 === 1 ? "reverse" : ""}`}>
      <div
        className="project-visual h-[270px] w-[500px] flex-shrink-0"
        style={{ background: palette[index % palette.length] }}
      >
        {project.image ? (
          <div data-parallax="9" className="h-full w-full">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
          </div>
        ) : (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(16,38,74,0.25) 0 8px, transparent 8px 16px), repeating-linear-gradient(0deg, rgba(255,255,255,0.35) 0 4px, transparent 4px 12px)",
              }}
            />
            <span className="font-pixel relative text-[26px] font-bold text-paper [text-shadow:0_4px_0_rgba(16,38,74,0.45)]">
              {project.category}
            </span>
            <span className="font-pixel absolute right-3 bottom-2 text-[clamp(28px,4vw,44px)] text-paper/40">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      <div className="project-card night-panel w-[620px] max-w-full p-[32px] transition-transform duration-300 group-hover:-translate-y-2">
        <p className="eyebrow mb-4 text-accent-cyan">
          {String(index + 1).padStart(2, "0")} / {project.category}
        </p>
        <h3 className="font-pixel text-[30px] font-bold uppercase text-paper">
          {project.title}
        </h3>
        <p className="desc mt-5 text-[15px] leading-7">
          {project.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <span key={t} className="tag tag-dark">
              {t}
            </span>
          ))}
        </div>
        {project.href && (
          <a
            href={project.href}
            target={project.href.startsWith("http") ? "_blank" : undefined}
            rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="btn magnetic mt-8"
          >
            Lihat Case Study →
          </a>
        )}
      </div>
    </article>
  );
}