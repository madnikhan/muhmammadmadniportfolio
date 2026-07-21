import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/content/profile";
import { additionalExperience } from "@/content/experience";

export const metadata: Metadata = {
  title: "About",
  description: profile.summary,
};

export default function AboutPage() {
  return (
    <div className="bg-paper px-5 pb-24 pt-28 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="section-label">About</p>
          <h1 className="font-display mt-3 text-4xl tracking-tight text-ink sm:text-5xl">
            Engineer first. Business fluency built in.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{profile.summary}</p>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="font-display text-2xl text-ink">20+ years in IT</h2>
          <p className="mt-4 leading-relaxed text-muted">
            Over two decades working with technology and business systems — delivering websites,
            e-commerce, static sites, web applications, and complex management platforms. The
            portfolio highlights three deep case studies; they represent a fraction of{" "}
            {profile.projectsDelivered}+ career deliveries.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="font-display text-2xl text-ink">Delivery domains</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {profile.domains.map((d) => (
              <li
                key={d}
                className="rounded-md border border-ink/10 bg-white px-3 py-1.5 text-sm text-ink"
              >
                {d}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">
            Systems built for immigration-style application and casework workflows, solicitor
            office management, government-office automation, and AI camera traffic monitoring —
            framed by capability and complexity, not unverifiable employer badges.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="font-display text-2xl text-ink">Operations that inform the software</h2>
          <div className="mt-4 space-y-6">
            {additionalExperience.map((exp) => (
              <div key={exp.title}>
                <h3 className="font-medium text-ink">{exp.title}</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
                  {exp.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="font-display text-2xl text-ink">Education</h2>
          <ul className="mt-4 space-y-3">
            {profile.education.map((ed) => (
              <li key={ed.title}>
                <p className="font-medium text-ink">{ed.title}</p>
                <p className="text-sm text-muted">{ed.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-14 flex flex-wrap gap-4">
          <Link
            href="/cv"
            className="rounded-md bg-ink px-5 py-3 text-sm font-medium text-white hover:bg-ink-soft"
          >
            Download CV
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-ink/15 px-5 py-3 text-sm font-medium text-ink hover:border-teal hover:text-teal"
          >
            Contact
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
