"use client";

import { useState } from "react";
import { wedding } from "@/wedding.config";
import { UsWidget } from "./UsWidget";

export const BrideNotes = () => {
  const [open, setOpen] = useState(false);

  return (
    <UsWidget>
      <p className="us-widget-kicker">{wedding.bride.shortName}</p>
      <div className="us-note-list">
        {wedding.us.notes.map((note) => (
          <button
            key={note.title}
            type="button"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="block text-[15px] font-semibold leading-snug">
              {note.glance}
            </span>
            {open ? (
              <span className="mt-0.5 block text-[11px] leading-relaxed text-[var(--us-dim)]">
                {note.body}
              </span>
            ) : null}
          </button>
        ))}
      </div>
    </UsWidget>
  );
};
