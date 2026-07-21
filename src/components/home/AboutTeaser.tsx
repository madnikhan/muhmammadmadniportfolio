import Link from "next/link";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";

export function AboutTeaser() {
  return (
    <section className="bg-paper px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="section-label">About</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl tracking-tight text-ink sm:text-4xl">
            A software engineer who understands business problems, not just code.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            {profile.yearsExperience}+ years in IT and {profile.projectsDelivered}+ delivered
            projects across web design, e-commerce, management systems, immigration workflows,
            solicitor office tooling, government-office automation, and AI traffic monitoring —
            grounded in real operational experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/about"
              className="inline-flex rounded-md bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-ink-soft"
            >
              Read the story
            </Link>
            <Link
              href="/cv"
              className="inline-flex rounded-md border border-ink/15 px-5 py-3 text-sm font-medium text-ink transition hover:border-teal hover:text-teal"
            >
              Download CV
            </Link>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-5 py-3 text-sm font-medium text-muted transition hover:text-ink"
            >
              More on GitHub →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
