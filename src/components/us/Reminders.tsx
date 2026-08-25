"use client";

import { wedding } from "@/wedding.config";
import { UsPanel } from "./UsPanel";

export const Reminders = () => {
  return (
    <UsPanel label="REMINDERS" title="checklist">
      <ul className="space-y-3">
        {wedding.us.reminders.map((reminder) => (
          <li key={reminder.title} className="flex gap-2.5">
            <span className="mt-0.5 font-mono text-[12px] text-[var(--us-leaf)]">
              ✓
            </span>
            <div>
              <p className="font-mono text-[10px] text-[var(--us-dim)]">
                {reminder.when}
              </p>
              <p className="text-[14px] text-[var(--us-paper)]">{reminder.title}</p>
              <p className="text-[13px] leading-relaxed text-[var(--us-dim)]">
                {reminder.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </UsPanel>
  );
};
