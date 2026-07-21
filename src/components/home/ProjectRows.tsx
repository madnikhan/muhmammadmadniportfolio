"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";

export function ProjectRows() {
  return (
    <section className="bg-paper px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="section-label">Selected work</p>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
            Deep dives from 250+ deliveries
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Three case studies that show enterprise-style complexity — POS, multi-branch retail,
            commerce and operations. More on GitHub.
          </p>
        </Reveal>

        <div className="mt-14 space-y-16">
          {projects.map((project, index) => {
            const reverse = index % 2 === 1;
            return (
              <Reveal key={project.slug} delay={0.05 * index}>
                <Link
                  href={`/projects/${project.slug}`}
                  className={`group grid items-center gap-8 md:grid-cols-2 ${
                    reverse ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-ink-soft">
                    <motion.div
                      className="h-full w-full"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.45 }}
                    >
                      <Image
                        src={project.images[0].src}
                        alt={project.images[0].alt}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </motion.div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-60" />
                  </div>
                  <div>
                    <p className="text-sm text-teal">{project.role}</p>
                    <h3 className="font-display mt-2 text-2xl tracking-tight text-ink transition group-hover:translate-x-1 sm:text-3xl">
                      {project.shortTitle}
                    </h3>
                    <p className="mt-3 text-muted">{project.summary}</p>
                    <p className="mt-4 text-sm font-medium text-ink">
                      View case study
                      <span className="ml-2 inline-block text-teal transition group-hover:translate-x-1">
                        →
                      </span>
                    </p>
                    <div className="mt-1 h-px w-0 bg-teal transition-all duration-500 group-hover:w-24" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
