"use client";

import Link from "next/link";
import { wedding } from "@/wedding.config";
import { BrideNotes } from "./BrideNotes";
import { PromiseChat, TodayAlert } from "./PromiseChat";
import { Reminders } from "./Reminders";
import { Story } from "./Story";
import { UsAccount } from "./UsAccount";
import { CalendarWidget, DdayWidget } from "./UsCountdown";
import { PortraitWidget, PixelHeart } from "./UsSprites";
import { UsVenue } from "./UsVenue";

export const UsHome = ({ onBack }: { onBack: () => void }) => {
  const { groom, bride, us } = wedding;

  return (
    <div className="us-home">
      <header className="us-home-top">
        <button type="button" className="us-slot-chip" onClick={onBack}>
          <span className="us-pixel us-chip-label">{us.slotTitle}</span>
        </button>
        <Link href="/invitation" className="us-peek underline">
          {us.backLink}
        </Link>
      </header>

      <div className="us-glance-grid">
        <DdayWidget />
        <CalendarWidget />
        <BrideNotes />
        <PortraitWidget />
      </div>

      <div className="us-home-stack">
        <TodayAlert />
        <Reminders />
        <Story />
        <UsVenue />
        <UsAccount />
        <PromiseChat />
      </div>

      <footer className="us-dock">
        <Link href="/invitation">
          <PixelHeart size={12} className="text-[var(--us-pink)]" />
          {us.backLink}
        </Link>
      </footer>
      <p className="mt-3 text-center text-[10px] text-[var(--us-dim)]">
        {groom.name} & {bride.name}
      </p>
    </div>
  );
};
