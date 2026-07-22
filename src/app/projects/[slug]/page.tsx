import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { getProject, projects } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="bg-term-bg px-4 pb-20 pt-24 sm:px-6 sm:pb-24 sm:pt-28">
      <div className="mx-auto max-w-6xl">
        <Link href="/projects" className="text-sm text-term-dim hover:text-term-green">
          $ cd ../projects
        </Link>
        <Reveal>
          <p className="section-label mt-8">{project.role}</p>
          <h1 className="font-display mt-3 max-w-4xl text-3xl text-term-green sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-term-dim sm:text-lg">{project.summary}</p>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {project.images.map((img) => (
            <div
              key={img.src}
              className="relative aspect-[16/10] overflow-hidden border border-[var(--term-border)] bg-term-panel"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-[1fr_1.2fr] md:gap-12">
          <Reveal>
            <TerminalWindow path="~/tech" className="md:sticky md:top-24">
              <p className="section-label !normal-case tracking-normal">technologies</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li key={tech} className="tag-code">
                    [{tech}]
                  </li>
                ))}
              </ul>
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex text-sm text-term-green hover:underline"
                >
                  $ open github →
                </a>
              ) : null}
            </TerminalWindow>
          </Reveal>

          <div className="space-y-8">
            <Reveal>
              <TerminalWindow path="~/problem.md">
                <h2 className="text-lg text-term-green">Problem</h2>
                <p className="mt-3 text-sm text-term-dim">{project.problem}</p>
              </TerminalWindow>
            </Reveal>
            <Reveal>
              <TerminalWindow path="~/features.list">
                <h2 className="text-lg text-term-green">Features</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-term-dim">
                  {project.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </TerminalWindow>
            </Reveal>
            <Reveal>
              <TerminalWindow path="~/outcome.md">
                <h2 className="text-lg text-term-green">Outcome</h2>
                <p className="mt-3 text-sm text-term-dim">{project.outcome}</p>
              </TerminalWindow>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
