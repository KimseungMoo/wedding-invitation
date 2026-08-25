"use client";

import { wedding } from "@/wedding.config";
import { UsPanel } from "./UsPanel";

export const Story = () => {
  return (
    <UsPanel label="LOG" title="우리가 여기까지">
      <ol className="space-y-3">
        {wedding.us.story.map((beat, index) => (
          <li key={beat.title} className="font-mono text-[12px]">
            <p className="text-[var(--us-amber)]">
              <span className="text-[var(--us-dim)]">{String(index + 1).padStart(2, "0")}</span>{" "}
              {beat.title}
            </p>
            <p className="mt-1 font-sans text-[13px] leading-relaxed text-[var(--us-paper)]">
              {beat.body}
            </p>
          </li>
        ))}
      </ol>
    </UsPanel>
  );
};
