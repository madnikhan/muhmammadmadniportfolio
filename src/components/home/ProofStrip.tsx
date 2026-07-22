"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { TerminalWindow } from "@/components/ui/TerminalWindow";

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
    const duration = 1100;
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
  { label: "years_in_it", value: profile.yearsExperience, suffix: "+" },
  { label: "projects_delivered", value: profile.projectsDelivered, suffix: "+" },
  { label: "focus", value: 0, text: "full_stack" },
  { label: "base", value: 0, text: "merseyside" },
];

export function ProofStrip() {
  return (
    <section className="bg-term-bg px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <TerminalWindow path="~/stats --summary">
          <Reveal>
            <p className="mb-6 text-xs text-term-dim">
              <span className="text-term-green">$</span> stats --summary
            </p>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl text-term-green sm:text-4xl">
                    {stat.text ? stat.text : <CountUp to={stat.value} suffix={stat.suffix} />}
                  </p>
                  <p className="mt-2 text-xs text-term-dim">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </TerminalWindow>
      </div>
    </section>
  );
}
