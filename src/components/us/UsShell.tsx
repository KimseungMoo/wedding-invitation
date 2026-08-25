"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { wedding } from "@/wedding.config";

export const UsShell = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <div className="us-root" data-theme={theme}>
      <header className="sticky top-0 z-40 flex items-center gap-2 border-b border-[var(--us-line)] bg-[var(--us-ink-2)] px-3 py-2 pt-safe">
        <div className="flex gap-1.5" aria-hidden>
          <i className="block h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <i className="block h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <i className="block h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <p className="min-w-0 flex-1 truncate font-mono text-[11px] text-[var(--us-dim)]">
          <b className="font-medium text-[var(--us-groom)]">{wedding.groom.shortName}</b>
          <span className="mx-1 text-[var(--us-blush)]">♥</span>
          <em className="not-italic font-medium text-[var(--us-bride)]">
            {wedding.bride.shortName}
          </em>
          <span> — {wedding.us.tabName}</span>
        </p>
        <Link
          href="/invitation"
          className="shrink-0 font-mono text-[10px] text-[var(--us-amber)] underline-offset-2 hover:underline"
        >
          {wedding.us.backLink}
        </Link>
        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-[var(--us-line)] font-mono text-xs text-[var(--us-dim)]"
          aria-label={theme === "dark" ? "밝은 화면" : "어두운 화면"}
        >
          {theme === "dark" ? "☾" : "☀"}
        </button>
      </header>
      {children}
    </div>
  );
};
