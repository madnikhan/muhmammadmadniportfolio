"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";
import { TerminalWindow } from "@/components/ui/TerminalWindow";

const HOME_PROJECT_COUNT = 2;

export function ProjectRows() {
  const featured = projects.slice(0, HOME_PROJECT_COUNT);

  return (
    <section className="bg-term-bg px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="section-label">Selected work</p>
          <h2 className="font-display mt-3 text-2xl text-term-green sm:text-4xl">
            Deep dives from 250+ deliveries
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-term-dim sm:text-base">
            Enterprise-style complexity — POS, multi-branch retail, commerce and operations.
            Built with modern stacks and an AI-augmented workspace.
          </p>
        </Reveal>

        <div className="mt-10 space-y-10 sm:mt-14 sm:space-y-14">
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={0.04 * index}>
              <TerminalWindow path={`~/projects/${project.slug}`}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group grid items-center gap-6 md:grid-cols-2"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border border-[var(--term-border)] bg-term-panel-2">
                    <motion.div
                      className="h-full w-full"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src={project.images[0].src}
                        alt={project.images[0].alt}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </motion.div>
                    {project.liveUrl ? (
                      <span className="absolute right-2 top-2 border border-term-green/50 bg-term-bg/85 px-2 py-0.5 text-[10px] uppercase tracking-wider text-term-green">
                        live
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <p className="text-xs text-term-amber sm:text-sm">{project.role}</p>
                    <h3 className="mt-2 text-xl text-term-green transition group-hover:translate-x-1 sm:text-2xl">
                      {project.shortTitle}
                    </h3>
                    <p className="mt-3 text-sm text-term-dim">{project.summary}</p>
                    <p className="mt-4 text-sm text-term-green">
                      <span className="text-term-dim">$ </span>
                      {project.liveUrl ? "open live_demo" : "open case_study"}
                      <span className="ml-1 opacity-70 group-hover:opacity-100">→</span>
                    </p>
                  </div>
                </Link>
              </TerminalWindow>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <Link href="/projects" className="btn-term inline-flex w-full sm:w-auto">
            View all projects
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
