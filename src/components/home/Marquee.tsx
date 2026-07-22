"use client";

import { profile } from "@/content/profile";

export function Marquee() {
  const items = [...profile.marqueeItems, ...profile.marqueeItems];

  return (
    <section
      className="overflow-hidden border-y border-[var(--term-border)] bg-term-panel py-3"
      aria-hidden
    >
      <p className="sr-only">Technology and domain stream</p>
      <div className="animate-marquee flex w-max">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-5 whitespace-nowrap font-mono text-xs tracking-wide text-term-dim sm:text-sm"
          >
            <span className="text-term-green">stdout</span>
            <span className="text-term-dim"> · </span>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
