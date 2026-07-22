"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { profile } from "@/content/profile";
import { TypeLines } from "@/components/ui/TypeLines";

const HeroScene = dynamic(
  () => import("./HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-term-bg" /> },
);

export function Hero() {
  const reduce = useReducedMotion();
  const [bootDone, setBootDone] = useState(!!reduce);

  const bootLines = useMemo(
    () => [
      { prompt: "$", text: "whoami", delay: 200 },
      { text: "muhammad.madni — full_stack_engineer", delay: 700 },
      { prompt: "$", text: "uptime", delay: 1200 },
      {
        text: `${profile.yearsExperience}+ years · ${profile.projectsDelivered}+ systems`,
        delay: 1700,
      },
      { prompt: "$", text: "tools --ai", delay: 2200 },
      { text: "chatgpt · anthropic_claude · cursor_ai · local_ai", delay: 2700 },
      { prompt: "$", text: "./portfolio --open", delay: 3300 },
    ],
    [],
  );

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-term-bg pb-10 pt-20 text-foreground sm:items-center sm:pb-16 sm:pt-24">
      {!reduce ? (
        <HeroScene />
      ) : (
        <div
          className="absolute inset-0 bg-term-bg"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 50% at 70% 35%, rgba(51,255,153,0.12), transparent), linear-gradient(180deg, #070b09, #0d1410)",
          }}
        />
      )}
      <div className="scanlines" />
      <div className="vignette" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-term-bg via-term-bg/75 to-term-bg/30 sm:bg-gradient-to-r sm:from-term-bg sm:via-term-bg/80 sm:to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-6 max-w-xl border border-[var(--term-border)] bg-term-panel/90 p-3 backdrop-blur-sm sm:p-4">
          <TypeLines lines={bootLines} onDone={() => setBootDone(true)} />
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={bootDone || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.45 }}
        >
          <p className="section-label text-term-dim">{profile.role}</p>
          <h1 className="font-display mt-3 max-w-4xl text-3xl leading-[1.1] text-term-green sm:text-5xl md:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-foreground/80 sm:text-lg">
            {profile.headline}
          </p>
          <p className="mt-2 max-w-xl text-xs text-term-dim sm:text-sm">
            latest stacks · AI-augmented workspace · {profile.locationShort}
          </p>
          <div className="pointer-events-auto mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Link href="/projects" className="btn-term-solid w-full sm:w-auto">
              View Projects
            </Link>
            <Link href="/cv" className="btn-term w-full sm:w-auto">
              Download CV
            </Link>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-term w-full sm:w-auto"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
