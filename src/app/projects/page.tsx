import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Projects",
  description: `Selected software case studies by ${profile.name} — restaurant ops, retail POS, and commerce systems from 250+ deliveries.`,
};

export default function ProjectsPage() {
  return (
    <div className="bg-term-bg px-4 pb-20 pt-24 sm:px-6 sm:pb-24 sm:pt-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="section-label">Projects</p>
          <h1 className="font-display mt-3 text-3xl text-term-green sm:text-5xl">
            Selected from 250+ deliveries
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-term-dim sm:text-base">
            Deep dives into complex, multi-role systems. Broader catalogue spans web design,
            e-commerce, management platforms, immigration workflows, solicitor office systems,
            government-office automation, and AI traffic monitoring.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.05}>
              <TerminalWindow path={`~/projects/${project.slug}`} className="h-full">
                <Link href={`/projects/${project.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden border border-[var(--term-border)] bg-term-panel-2">
                    <Image
                      src={project.images[0].src}
                      alt={project.images[0].alt}
                      fill
                      className="object-cover object-top transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <p className="mt-4 text-xs text-term-amber">{project.role}</p>
                  <h2 className="mt-1 text-lg text-term-green group-hover:underline">
                    {project.shortTitle}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-xs text-term-dim sm:text-sm">
                    {project.summary}
                  </p>
                </Link>
              </TerminalWindow>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-term-green hover:underline"
          >
            $ git remote show github →
          </a>
        </Reveal>
      </div>
    </div>
  );
}
