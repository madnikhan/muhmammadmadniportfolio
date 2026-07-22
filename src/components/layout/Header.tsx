"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

const links = [
  { href: "/projects", label: "projects" },
  { href: "/about", label: "about" },
  { href: "/cv", label: "cv" },
  { href: "/contact", label: "contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        scrolled || open
          ? "border-[var(--term-border)] bg-term-bg/95 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link href="/" className="truncate font-mono text-sm text-term-green sm:text-base">
          <span className="text-term-dim">~/</span>
          madni
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`min-h-11 px-3 py-2 text-sm transition ${
                  active ? "text-term-green" : "text-term-dim hover:text-term-green"
                }`}
              >
                ./{link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="flex min-h-11 min-w-11 items-center justify-center border border-[var(--term-border)] text-term-green md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="font-mono text-xs">{open ? "[x]" : "[≡]"}</span>
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-[var(--term-border)] bg-term-bg md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3" aria-label="Mobile">
            <p className="mb-2 text-xs text-term-dim">$ cd ~/site && ls</p>
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`min-h-12 border-b border-[var(--term-border)] py-3 font-mono text-base ${
                    active ? "text-term-green" : "text-foreground"
                  }`}
                >
                  <span className="text-term-dim">&gt; </span>
                  {link.label}
                </Link>
              );
            })}
            <p className="mt-3 text-xs text-term-dim">{profile.role}</p>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
