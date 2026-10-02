"use client";

import Link from "next/link";
import { wedding } from "@/wedding.config";
import { CoupleSprites, PixelHeart } from "./UsSprites";

const SlotIcon = ({ d }: { d: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden className="mt-0.5">
    <path d={d} fill="currentColor" />
  </svg>
);

export const UsSaveSlot = ({ onContinue }: { onContinue: () => void }) => {
  const { groom, bride, date, venue, us } = wedding;

  const rows = [
    {
      icon: "M8 3.2 9.4 6l3 .3-2.3 2 0.7 2.9L8 9.8 5.2 11.2l.7-2.9L3.6 6.3l3-.3z",
      label: "이름",
      value: `${groom.name} & ${bride.name}`,
      color: "text-[var(--us-pink)]",
    },
    {
      icon: "M8 2.5A5.5 5.5 0 1 0 8 13.5 5.5 5.5 0 0 0 8 2.5zm.6 3v2.3l1.8 1.1-.6 1-2.5-1.5V5.5h1.3z",
      label: "플레이타임",
      value: "0000:00",
      color: "text-[var(--us-dim)]",
    },
    {
      icon: "M3.5 4.2h9v8.2h-9zm1.3 1.4v1.3h6.4V5.6zm0 2.6v1.2h4.2V8.2z",
      label: "마지막 저장",
      value: date.compact,
      color: "text-[var(--us-dim)]",
    },
    {
      icon: "M8 2.8c2.2 0 4 1.8 4 4.1 0 2.8-4 6.3-4 6.3S4 9.7 4 6.9c0-2.3 1.8-4.1 4-4.1zm0 2.2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6z",
      label: "장소",
      value: venue.name,
      color: "text-[var(--us-dim)]",
    },
  ] as const;

  return (
    <section className="us-entry">
      <div className="us-meadow" aria-hidden />
      <header className="us-slot-title">
        <PixelHeart size={14} className="text-white/90" />
        <h1>{us.slotTitle}</h1>
        <div className="us-slot-rule">
          <PixelHeart size={8} />
          <i />
          <PixelHeart size={8} />
        </div>
      </header>

      <article className="us-slot-card">
        <div className="us-slot-portrait">
          <CoupleSprites className="h-[138px] w-[132px]" />
          <span className="us-slot-badge">
            <PixelHeart size={11} />
          </span>
        </div>
        <dl className="us-slot-rows">
          {rows.map((row) => (
            <div key={row.label} className="us-slot-row">
              <span className={row.color}>
                <SlotIcon d={row.icon} />
              </span>
              <div className="min-w-0">
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </article>

      <button type="button" className="us-continue" onClick={onContinue}>
        <PixelHeart size={12} />
        {us.continueLabel}
        <PixelHeart size={12} />
      </button>

      <p className="us-entry-foot">
        <PixelHeart size={8} className="mr-1 inline-block align-[-1px]" />
        {us.saveLine}
        <PixelHeart size={8} className="ml-1 inline-block align-[-1px]" />
      </p>
      <Link href="/invitation" className="us-peek mt-3 underline">
        {us.backLink}
      </Link>
    </section>
  );
};
