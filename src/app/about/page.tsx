import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { profile } from "@/content/profile";
import { additionalExperience } from "@/content/experience";

export const metadata: Metadata = {
  title: "About",
  description: profile.summary,
};

export default function AboutPage() {
  return (
    <div className="bg-term-bg px-4 pb-20 pt-24 sm:px-6 sm:pb-24 sm:pt-28">
      <div className="mx-auto max-w-3xl space-y-10">
        <Reveal>
          <p className="section-label">About</p>
          <h1 className="font-display mt-3 text-3xl text-term-green sm:text-5xl">
            Engineer first. AI-augmented. Business fluent.
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-term-dim sm:text-lg">{profile.summary}</p>
        </Reveal>

        <Reveal>
          <TerminalWindow path="~/stack/ai-workspace">
            <p className="text-xs text-term-dim">
              <span className="text-term-green">$</span> tools --ai --list
            </p>
            <p className="mt-3 text-sm text-foreground/90">
              Adopted AI across the workspace for efficiency and effective delivery of modern
              systems — ChatGPT, Anthropic Claude, Cursor AI, and locally built AI systems —
              alongside latest application stacks.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {profile.aiWorkspace.map((t) => (
                <li key={t} className="tag-code">
                  [{t}]
                </li>
              ))}
            </ul>
          </TerminalWindow>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-xl text-term-green sm:text-2xl">20+ years in IT</h2>
          <p className="mt-4 text-sm leading-relaxed text-term-dim sm:text-base">
            Over two decades delivering websites, e-commerce, static sites, web applications, and
            complex management platforms. Three deep case studies on this site represent a
            fraction of {profile.projectsDelivered}+ career deliveries.
          </p>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-xl text-term-green sm:text-2xl">Delivery domains</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {profile.domains.map((d) => (
              <li key={d} className="tag-code">
                [{d}]
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-xl text-term-green sm:text-2xl">
            Operations that inform the software
          </h2>
          <div className="mt-4 space-y-6">
            {additionalExperience.map((exp) => (
              <div key={exp.title}>
                <h3 className="text-sm font-medium text-foreground sm:text-base">{exp.title}</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-term-dim">
                  {exp.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-xl text-term-green sm:text-2xl">Education</h2>
          <ul className="mt-4 space-y-3">
            {profile.education.map((ed) => (
              <li key={ed.title}>
                <p className="text-sm font-medium text-foreground sm:text-base">{ed.title}</p>
                <p className="text-xs text-term-dim sm:text-sm">{ed.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="flex w-full flex-col gap-3 sm:flex-row">
          <Link href="/cv" className="btn-term-solid w-full sm:w-auto">
            Download CV
          </Link>
          <Link href="/contact" className="btn-term w-full sm:w-auto">
            Contact
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
