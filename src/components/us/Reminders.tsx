"use client";

import { wedding } from "@/wedding.config";
import { UsWidget } from "./UsWidget";

export const Reminders = () => {
  return (
    <UsWidget>
      <p className="us-widget-kicker">리마인드</p>
      <ul className="space-y-3">
        {wedding.us.reminders.map((reminder) => (
          <li key={reminder.title} className="us-check">
            <span className="us-check-mark" aria-hidden>
              ♥
            </span>
            <div>
              <p className="text-[10px] text-[var(--us-dim)]">{reminder.when}</p>
              <p className="text-[14px] font-semibold">{reminder.title}</p>
              <p className="text-[12px] leading-relaxed text-[var(--us-dim)]">
                {reminder.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </UsWidget>
  );
};
