"use client";

import { profile } from "@/content/profile";

export function Marquee() {
  const items = [...profile.marqueeItems, ...profile.marqueeItems];

  return (
    <section className="overflow-hidden border-y border-ink/5 bg-paper-deep py-4" aria-hidden>
      <div className="animate-marquee flex w-max">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-6 whitespace-nowrap text-sm font-medium tracking-wide text-ink/45"
          >
            {item}
            <span className="ml-6 text-teal/50">·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
