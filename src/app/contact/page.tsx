import type { Metadata } from "next";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${profile.name} — ${profile.role} based in ${profile.locationShort}.`,
};

export default function ContactPage() {
  return (
    <div className="bg-paper px-5 pb-24 pt-28 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="section-label">Contact</p>
        <h1 className="font-display mt-3 text-4xl tracking-tight text-ink sm:text-5xl">
          Let&apos;s talk about software roles
        </h1>
        <p className="mt-4 text-muted">
          Open to Full Stack, Software Engineer, and related employee positions in the UK. Not
          available for freelance, contractor, or self-employed consulting under current
          Permission to Work conditions.
        </p>

        <div className="mt-14 space-y-8">
          <div>
            <p className="section-label">Email</p>
            <a
              href={`mailto:${profile.email}`}
              className="font-display mt-2 block text-3xl text-ink transition hover:text-teal sm:text-4xl"
            >
              {profile.email}
            </a>
          </div>
          <div>
            <p className="section-label">Phone</p>
            <a
              href={profile.phoneHref}
              className="font-display mt-2 block text-3xl text-ink transition hover:text-teal sm:text-4xl"
            >
              {profile.phone}
            </a>
          </div>
          <div>
            <p className="section-label">Location</p>
            <p className="mt-2 text-xl text-ink">{profile.location}</p>
          </div>
          <div className="flex flex-wrap gap-6 pt-4">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-teal hover:underline"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-teal hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
