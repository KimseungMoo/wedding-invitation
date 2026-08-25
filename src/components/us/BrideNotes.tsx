"use client";

import { wedding } from "@/wedding.config";
import { UsPanel } from "./UsPanel";

export const BrideNotes = () => {
  return (
    <UsPanel label="NOTES" title="은지">
      <div className="space-y-2 font-mono text-[13px]">
        {wedding.us.notes.map((note) => (
          <p key={note.title} className="leading-relaxed">
            <span className="text-[var(--us-sky)]">{note.title}</span>
            <span className="text-[var(--us-dim)]"> = </span>
            <span className="font-sans text-[var(--us-paper)]">{note.body}</span>
          </p>
        ))}
      </div>
    </UsPanel>
  );
};
