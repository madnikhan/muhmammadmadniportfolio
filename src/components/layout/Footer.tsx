import Link from "next/link";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="no-print border-t border-white/10 bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-14 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-3xl tracking-tight">{profile.name}</p>
          <p className="mt-2 max-w-md text-white/60">{profile.role} · {profile.locationShort}</p>
          <p className="mt-4 max-w-lg text-sm text-white/50">
            Open to RQF Level 6+ software engineering roles as an employee. Portfolio and CV
            focused on employment — not freelance or business ownership.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/cv" className="text-teal-bright hover:underline">
            Download CV
          </Link>
          <Link href="/contact" className="text-white/70 hover:text-white">
            Contact
          </Link>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white"
          >
            GitHub
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-white/40 sm:px-8">
        © {new Date().getFullYear()} {profile.name}
      </div>
    </footer>
  );
}
