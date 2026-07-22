import Link from "next/link";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { TerminalWindow } from "@/components/ui/TerminalWindow";

export function AboutTeaser() {
  return (
    <section className="bg-term-bg px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl space-y-8">
        <Reveal>
          <TerminalWindow path="~/stack/ai-workspace">
            <p className="text-xs text-term-dim">
              <span className="text-term-green">$</span> cat ai_workspace.md
            </p>
            <p className="mt-3 text-sm text-foreground/90 sm:text-base">
              Builds with current stacks and an AI-augmented workspace to ship state-of-the-art
              software efficiently:
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {profile.aiWorkspace.map((tool) => (
                <li key={tool} className="tag-code">
                  [{tool}]
                </li>
              ))}
            </ul>
          </TerminalWindow>
        </Reveal>

        <Reveal>
          <p className="section-label">About</p>
          <h2 className="font-display mt-3 max-w-3xl text-2xl text-term-green sm:text-4xl">
            A software engineer who understands business problems, not just code.
          </h2>
          <p className="mt-5 max-w-2xl text-sm text-term-dim sm:text-lg">
            {profile.yearsExperience}+ years in IT and {profile.projectsDelivered}+ delivered
            projects — modern web systems plus domain depth across retail, hospitality,
            immigration workflows, solicitor ops, government-office automation, and AI traffic
            monitoring.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Link href="/about" className="btn-term-solid w-full sm:w-auto">
              Read the story
            </Link>
            <Link href="/cv" className="btn-term w-full sm:w-auto">
              Download CV
            </Link>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-term w-full sm:w-auto"
            >
              GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
