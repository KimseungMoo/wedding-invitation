"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { wedding } from "@/wedding.config";

export const UsHero = () => {
  const { groom, bride, date, venue, us } = wedding;
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(us.typeLine.slice(0, i));
      if (i >= us.typeLine.length) window.clearInterval(id);
    }, 70);
    return () => window.clearInterval(id);
  }, [us.typeLine]);

  return (
    <section className="px-4 pb-2 pt-6">
      <div className="mx-auto max-w-md">
        <div className="mb-5 overflow-hidden rounded-lg border border-[var(--us-line)] bg-[var(--us-ink-2)]">
          <div className="flex items-center justify-between border-b border-[var(--us-line)] px-3 py-1.5 font-mono text-[10px] text-[var(--us-dim)]">
            <span>guest@wedding</span>
            <span>80×24</span>
          </div>
          <p className="min-h-[2.4em] px-3 py-3 font-mono text-[13px] text-[var(--us-leaf)]">
            <span className="text-[var(--us-dim)]">$ </span>
            {typed}
            <span className="us-caret" aria-hidden />
          </p>
        </div>

        <svg className="mx-auto mb-5 h-14 w-44" viewBox="0 0 220 90" aria-hidden>
          <path
            d="M20 14 C 80 14, 90 45, 110 45 L 200 45"
            fill="none"
            stroke="var(--us-groom)"
            strokeWidth="1.6"
          />
          <path
            d="M20 76 C 80 76, 90 45, 110 45 L 200 45"
            fill="none"
            stroke="var(--us-bride)"
            strokeWidth="1.6"
          />
          <circle cx="20" cy="14" r="4" fill="var(--us-groom)" />
          <circle cx="20" cy="76" r="4" fill="var(--us-bride)" />
          <circle cx="200" cy="45" r="5" fill="var(--us-amber)" />
        </svg>

        <div className="mb-5 text-center">
          <p className="mb-2 font-mono text-[10px] tracking-[0.16em] text-[var(--us-amber)]">
            {us.releaseLabel}
          </p>
          <h1 className="text-[28px] font-semibold tracking-tight text-[var(--us-paper)]">
            {groom.name}
            <span className="mx-1.5 font-mono text-[var(--us-sky)]">&amp;&amp;</span>
            {bride.name}
          </h1>
          <p className="mt-2 font-mono text-[12px] text-[var(--us-dim)]">{date.line}</p>
        </div>

        <div className="mb-4 rounded-lg border border-[var(--us-line)] bg-[var(--us-ink-2)] px-4 py-3">
          <p className="mb-1 font-mono text-[10px] tracking-[0.16em] text-[var(--us-amber)]">
            LOCATION
          </p>
          <p className="text-[16px] text-[var(--us-paper)]">
            {venue.name}{" "}
            <small className="text-[12px] text-[var(--us-dim)]">{venue.hall}</small>
          </p>
          <p className="mt-1 text-[12px] text-[var(--us-dim)]">{venue.copyAddress}</p>
        </div>

        <div className="mb-4 overflow-hidden rounded-lg border border-[var(--us-line)] bg-[var(--us-ink-2)]">
          <div className="flex items-center justify-between border-b border-[var(--us-line)] px-3 py-1.5 font-mono text-[10px] text-[var(--us-dim)]">
            <span>main.jpeg — preview</span>
            <span>오늘 알림 {us.todayAlertCount}</span>
          </div>
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/main.jpeg"
              alt={`${groom.name}와 ${bride.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 28rem"
              priority
            />
          </div>
          <p className="px-3 py-2.5 font-mono text-[12px] text-[var(--us-paper)]">
            {us.todayAlertText}
          </p>
        </div>
      </div>
    </section>
  );
};
