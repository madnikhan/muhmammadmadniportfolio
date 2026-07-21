import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
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
    <div className="bg-paper px-5 pb-24 pt-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/projects" className="text-sm text-muted hover:text-teal">
          ← All projects
        </Link>
        <Reveal>
          <p className="section-label mt-8">{project.role}</p>
          <h1 className="font-display mt-3 max-w-4xl text-4xl tracking-tight text-ink sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{project.summary}</p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {project.images.map((img) => (
            <div key={img.src} className="relative aspect-[16/10] overflow-hidden bg-ink-soft">
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

        <div className="mt-16 grid gap-12 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="sticky top-24 space-y-8">
              <div>
                <p className="section-label">Technologies</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-ink/10 bg-white px-3 py-1 text-sm text-ink"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-sm font-medium text-teal hover:underline"
                >
                  View on GitHub →
                </a>
              ) : null}
            </div>
          </Reveal>

          <div className="space-y-10">
            <Reveal>
              <h2 className="font-display text-2xl text-ink">Problem</h2>
              <p className="mt-3 text-muted">{project.problem}</p>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-2xl text-ink">Features</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
                {project.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-2xl text-ink">Outcome</h2>
              <p className="mt-3 text-muted">{project.outcome}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
