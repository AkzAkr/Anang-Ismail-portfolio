import { SkyWorld } from "@/components/world/SkyWorld";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { WorldNav } from "@/components/navigation/WorldNav";
import { ProgressRail } from "@/components/navigation/ProgressRail";
import { Preloader } from "@/components/world/Preloader";

export default function Page() {
  return (
    <>
      <Preloader />
      <WorldNav />
      <ProgressRail />
      <SkyWorld>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </SkyWorld>
    </>
  );
}
