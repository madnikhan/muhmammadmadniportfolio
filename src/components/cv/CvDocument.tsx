import { cv } from "@/content/cv";

export function CvDocument() {
  const { profile, summary, skills, softwareExperience, additionalExperience, education, domainsLine, technicalStrengths } =
    cv;

  return (
    <article className="cv-sheet mx-auto max-w-[210mm] bg-white text-ink shadow-lg print:shadow-none">
      {/* Page 1 */}
      <div className="px-[14mm] py-[14mm] print:px-0 print:py-0">
        <header>
          <h1 className="font-display text-[22pt] font-semibold leading-none tracking-tight">
            {profile.name.toUpperCase()}
          </h1>
          <p className="mt-1.5 text-[11.5pt] font-medium text-teal">{profile.role}</p>
          <p className="mt-2 text-[9.5pt] text-muted">
            {profile.location} · {profile.phone}
          </p>
          <p className="mt-0.5 text-[9.5pt] text-muted">
            <a href={`mailto:${profile.email}`} className="hover:text-teal">
              {profile.email}
            </a>
            {" · "}
            <a href={profile.linkedin} className="hover:text-teal">
              LinkedIn
            </a>
            {" · "}
            <a href={profile.github} className="hover:text-teal">
              GitHub
            </a>
            {" · "}
            <span>{profile.portfolioUrl.replace(/^https?:\/\//, "")}</span>
          </p>
          <div className="mt-3 h-px bg-teal/40" />
        </header>

        <section className="mt-4">
          <h2 className="text-[9pt] font-semibold uppercase tracking-[0.16em] text-muted">
            Profile
          </h2>
          <div className="mt-1 h-px bg-ink/10" />
          <p className="mt-2 text-[9.5pt] leading-snug text-ink/90">{summary}</p>
        </section>

        <section className="mt-4">
          <h2 className="text-[9pt] font-semibold uppercase tracking-[0.16em] text-muted">
            Core skills
          </h2>
          <div className="mt-1 h-px bg-ink/10" />
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-[9pt] sm:grid-cols-4">
            <div>
              <p className="font-semibold text-ink">Frontend</p>
              <p className="mt-0.5 leading-snug text-ink/80">{skills.frontend.join(", ")}</p>
            </div>
            <div>
              <p className="font-semibold text-ink">Backend</p>
              <p className="mt-0.5 leading-snug text-ink/80">{skills.backend.join(", ")}</p>
            </div>
            <div>
              <p className="font-semibold text-ink">Data</p>
              <p className="mt-0.5 leading-snug text-ink/80">{skills.database.join(", ")}</p>
            </div>
            <div>
              <p className="font-semibold text-ink">Tools</p>
              <p className="mt-0.5 leading-snug text-ink/80">{skills.tools.join(", ")}</p>
            </div>
          </div>
        </section>

        <section className="mt-4">
          <h2 className="text-[9pt] font-semibold uppercase tracking-[0.16em] text-muted">
            Selected software experience
          </h2>
          <div className="mt-1 h-px bg-ink/10" />
          <div className="mt-2 flex items-baseline justify-between gap-4">
            <h3 className="text-[10.5pt] font-semibold">{softwareExperience.title}</h3>
            <p className="shrink-0 text-[9pt] text-muted">{softwareExperience.period}</p>
          </div>
          <p className="mt-1 text-[9.5pt] text-ink/80">{softwareExperience.intro}</p>
          {softwareExperience.blocks.map((block) => (
            <div key={block.heading} className="mt-2.5">
              <p className="text-[9.5pt] font-semibold text-ink">{block.heading}</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[9.5pt] leading-snug text-ink/85">
                {block.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-4">
          <h2 className="text-[9pt] font-semibold uppercase tracking-[0.16em] text-muted">
            Key delivery domains
          </h2>
          <div className="mt-1 h-px bg-ink/10" />
          <p className="mt-2 text-[9.5pt] text-ink/85">{domainsLine}</p>
        </section>
      </div>

      {/* Soft page break hint for print */}
      <div className="break-before-page px-[14mm] pb-[14mm] pt-2 print:px-0 print:pb-0">
        <section>
          <h2 className="text-[9pt] font-semibold uppercase tracking-[0.16em] text-muted">
            Additional experience
          </h2>
          <div className="mt-1 h-px bg-ink/10" />
          {additionalExperience.map((exp) => (
            <div key={exp.title} className="mt-3">
              <h3 className="text-[10pt] font-semibold">{exp.title}</h3>
              <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[9.5pt] leading-snug text-ink/85">
                {exp.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-5">
          <h2 className="text-[9pt] font-semibold uppercase tracking-[0.16em] text-muted">
            Education & professional development
          </h2>
          <div className="mt-1 h-px bg-ink/10" />
          <ul className="mt-2 space-y-1.5 text-[9.5pt]">
            {education.map((ed) => (
              <li key={ed.title}>
                <span className="font-semibold text-ink">{ed.title}</span>
                <span className="text-muted"> — {ed.detail}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-5">
          <h2 className="text-[9pt] font-semibold uppercase tracking-[0.16em] text-muted">
            Technical strengths
          </h2>
          <div className="mt-1 h-px bg-ink/10" />
          <p className="mt-2 text-[9.5pt] text-ink/85">{technicalStrengths.join(" · ")}</p>
        </section>
      </div>
    </article>
  );
}
