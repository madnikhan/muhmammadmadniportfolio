import Link from "next/link";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="no-print border-t border-[var(--term-border)] bg-term-bg text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs text-term-dim"># EOF — session</p>
          <p className="mt-2 font-mono text-xl text-term-green sm:text-2xl">{profile.name}</p>
          <p className="mt-2 max-w-md text-sm text-term-dim">
            {profile.role} · {profile.locationShort}
          </p>
          <p className="mt-4 max-w-lg text-xs text-term-dim/80">
            Open to Full Stack and Software Engineer roles across the UK — Merseyside-based,
            remote and hybrid friendly.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/cv" className="text-term-green hover:underline">
            ./cv
          </Link>
          <Link href="/contact" className="text-term-dim hover:text-term-green">
            ./contact
          </Link>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-term-dim hover:text-term-green"
          >
            linkedin
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-term-dim hover:text-term-green"
          >
            github
          </a>
        </div>
      </div>
      <div className="border-t border-[var(--term-border)] px-4 py-3 text-center text-xs text-term-dim sm:px-6">
        © {new Date().getFullYear()} {profile.name} · exit 0
      </div>
    </footer>
  );
}
