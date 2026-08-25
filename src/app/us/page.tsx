"use client";

import {
  BrideNotes,
  PromiseChat,
  Reminders,
  Story,
  UsAccount,
  UsCountdown,
  UsHero,
  UsShell,
  UsVenue,
} from "@/components/us";
import { wedding } from "@/wedding.config";

export default function UsPage() {
  return (
    <UsShell>
      <main>
        <UsHero />
        <UsCountdown />
        <PromiseChat />
        <BrideNotes />
        <Reminders />
        <Story />
        <UsVenue />
        <UsAccount />
      </main>
      <footer className="px-4 pb-8 pb-safe pt-2">
        <p className="mx-auto max-w-md text-center font-mono text-[10px] text-[var(--us-dim)]">
          {wedding.groom.name} && {wedding.bride.name}
        </p>
      </footer>
    </UsShell>
  );
}
