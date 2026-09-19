import type { Metadata } from "next";
import { SITE } from "@/data/data";
import { ArchiveWorld } from "@/components/world/ArchiveWorld";
import { ArchiveProjects } from "@/components/sections/ArchiveProjects";
import { ArchiveNav } from "@/components/navigation/ArchiveNav";

export const metadata: Metadata = {
  title: "Project Archive — " + SITE.brand,
  description:
    "Semua proyek Anang Ismail — game Roblox (Luau), web interaktif, dan eksplorasi data science.",
};

export default function ProjectsPage() {
  return (
    <>
      <ArchiveNav />
      <ArchiveWorld>
        <ArchiveProjects />
      </ArchiveWorld>
    </>
  );
}