"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) {
      setValue(to);
      return;
    }
    let frame = 0;
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(to * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

const stats = [
  { label: "Years in IT", value: profile.yearsExperience, suffix: "+" },
  { label: "Projects delivered", value: profile.projectsDelivered, suffix: "+" },
  { label: "Focus", value: 0, text: "Full Stack" },
  { label: "Based", value: 0, text: "Merseyside" },
];

export function ProofStrip() {
  return (
    <section className="bg-ink px-5 py-16 text-white sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.06}>
            <p className="font-display text-4xl tracking-tight text-teal-bright sm:text-5xl">
              {stat.text ? (
                stat.text
              ) : (
                <CountUp to={stat.value} suffix={stat.suffix} />
              )}
            </p>
            <p className="mt-2 text-sm text-white/50">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
