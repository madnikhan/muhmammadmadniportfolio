import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Projects",
  description: `Selected software case studies by ${profile.name} — restaurant ops, retail POS, and commerce systems from 250+ deliveries.`,
};

export default function ProjectsPage() {
  return (
    <div className="bg-paper px-5 pb-24 pt-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="section-label">Projects</p>
          <h1 className="font-display mt-3 text-4xl tracking-tight text-ink sm:text-5xl">
            Selected from 250+ deliveries
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            Deep dives into complex, multi-role systems. Broader catalogue spans web design,
            e-commerce, static sites, management platforms, immigration workflows, solicitor
            office systems, government-office automation, and AI traffic monitoring.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06}>
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-ink-soft">
                  <Image
                    src={project.images[0].src}
                    alt={project.images[0].alt}
                    fill
                    className="object-cover object-top transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="mt-4 text-sm text-teal">{project.role}</p>
                <h2 className="font-display mt-1 text-xl text-ink transition group-hover:text-teal">
                  {project.shortTitle}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{project.summary}</p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-ink hover:text-teal"
          >
            Explore more on GitHub →
          </a>
        </Reveal>
      </div>
    </div>
  );
}
