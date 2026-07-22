import type { ReactNode } from "react";

export function TerminalWindow({
  path,
  children,
  className = "",
}: {
  path: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden border border-[var(--term-border)] bg-term-panel ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-[var(--term-border)] bg-term-panel-2 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-term-amber/80" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-term-green/80" aria-hidden />
        <span className="ml-2 truncate text-xs text-term-dim">{path}</span>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}
