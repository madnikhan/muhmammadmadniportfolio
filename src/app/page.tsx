import { AboutTeaser } from "@/components/home/AboutTeaser";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { ProjectRows } from "@/components/home/ProjectRows";
import { ProofStrip } from "@/components/home/ProofStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <ProjectRows />
      <ProofStrip />
      <AboutTeaser />
    </>
  );
}
