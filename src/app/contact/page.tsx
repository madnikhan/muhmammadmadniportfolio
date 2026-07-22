import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { TerminalWindow } from "@/components/ui/TerminalWindow";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${profile.name} — ${profile.role} based in ${profile.locationShort}.`,
};

export default function ContactPage() {
  return (
    <div className="bg-term-bg px-4 pb-20 pt-24 sm:px-6 sm:pb-24 sm:pt-28">
      <div className="mx-auto max-w-3xl">
        <p className="section-label">Contact</p>
        <h1 className="font-display mt-3 text-3xl text-term-green sm:text-5xl">
          Let&apos;s talk about software roles
        </h1>
        <p className="mt-4 text-sm text-term-dim sm:text-base">
          Open to Full Stack, Software Engineer, and related employee positions in the UK. Not
          available for freelance, contractor, or self-employed consulting under current
          Permission to Work conditions.
        </p>

        <TerminalWindow path="~/contact.sh" className="mt-10">
          <div className="space-y-8">
            <div>
              <p className="text-xs text-term-dim">
                <span className="text-term-green">$</span> echo $EMAIL
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-2 block break-all font-display text-xl text-term-green hover:underline sm:text-3xl"
              >
                {profile.email}
              </a>
            </div>
            <div>
              <p className="text-xs text-term-dim">
                <span className="text-term-green">$</span> echo $PHONE
              </p>
              <a
                href={profile.phoneHref}
                className="mt-2 block font-display text-xl text-term-green hover:underline sm:text-3xl"
              >
                {profile.phone}
              </a>
            </div>
            <div>
              <p className="text-xs text-term-dim">
                <span className="text-term-green">$</span> echo $LOCATION
              </p>
              <p className="mt-2 text-base text-foreground sm:text-xl">{profile.location}</p>
            </div>
            <div className="flex flex-wrap gap-6 border-t border-[var(--term-border)] pt-6">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-11 text-term-green hover:underline"
              >
                linkedin
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-11 text-term-green hover:underline"
              >
                github
              </a>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}
