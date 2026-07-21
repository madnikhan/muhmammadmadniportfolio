"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { profile } from "@/content/profile";

const HeroScene = dynamic(
  () => import("./HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-ink" /> },
);

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-white">
      {!reduce ? (
        <HeroScene />
      ) : (
        <div
          className="absolute inset-0 bg-ink"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(13,148,136,0.25), transparent), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(100,116,139,0.2), transparent)",
          }}
        />
      )}
      <div className="noise-overlay z-[1]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-ink via-ink/70 to-ink/20" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 pt-28 sm:px-8">
        <motion.p
          className="section-label text-teal-bright/90"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {profile.role}
        </motion.p>
        <motion.h1
          className="font-display mt-4 max-w-4xl text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          {profile.name}
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl text-lg text-white/75 sm:text-xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
        >
          {profile.headline}
        </motion.p>
        <motion.p
          className="mt-3 max-w-xl text-sm text-white/50 sm:text-base"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
        >
          {profile.yearsExperience}+ years · {profile.projectsDelivered}+ projects · Full Stack ·{" "}
          {profile.locationShort}
        </motion.p>
        <motion.div
          className="pointer-events-auto mt-10 flex flex-wrap gap-3"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center rounded-md bg-teal px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-bright"
          >
            View Projects
          </Link>
          <Link
            href="/cv"
            className="inline-flex items-center rounded-md border border-white/25 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur transition hover:border-white/50"
          >
            Download CV
          </Link>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md px-5 py-3 text-sm font-medium text-white/80 transition hover:text-white"
          >
            LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}
