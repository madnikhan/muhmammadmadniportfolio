"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Line = { prompt?: string; text: string; delay: number };

export function TypeLines({ lines, onDone }: { lines: Line[]; onDone?: () => void }) {
  const reduce = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(reduce ? lines.length : 0);

  useEffect(() => {
    if (reduce) {
      onDone?.();
      return;
    }
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    lines.forEach((line, i) => {
      const t = setTimeout(() => {
        if (cancelled) return;
        setVisibleCount(i + 1);
        if (i === lines.length - 1) onDone?.();
      }, line.delay);
      timers.push(t);
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [lines, onDone, reduce]);

  return (
    <div className="space-y-1 font-mono text-xs text-term-dim sm:text-sm" aria-live="polite">
      {lines.slice(0, visibleCount).map((line, i) => (
        <p key={`${line.text}-${i}`} className="break-words">
          {line.prompt ? <span className="text-term-green">{line.prompt} </span> : null}
          <span className={i === visibleCount - 1 && !reduce ? "cursor-blink text-foreground" : "text-foreground/90"}>
            {line.text}
          </span>
        </p>
      ))}
    </div>
  );
}
