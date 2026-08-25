"use client";

import { wedding, type ChatSpeaker } from "@/wedding.config";
import { UsPanel } from "./UsPanel";

const speakerName = (from: ChatSpeaker) => {
  if (from === "groom") return wedding.groom.shortName;
  if (from === "bride") return wedding.bride.shortName;
  return wedding.us.botName;
};

const nameClass = (from: ChatSpeaker) => {
  if (from === "groom") return "text-[var(--us-groom)]";
  if (from === "bride") return "text-[var(--us-bride)]";
  return "font-mono text-[var(--us-leaf)]";
};

export const PromiseChat = () => {
  return (
    <UsPanel label="BOT" title={wedding.us.botName}>
      <p className="mb-4 text-[13px] leading-relaxed text-[var(--us-dim)]">
        {wedding.us.intro}
      </p>
      <div className="space-y-4">
        {wedding.us.chats.map((thread) => (
          <article
            key={thread.title}
            className="rounded border border-[var(--us-line)] bg-[var(--us-ink-3)] p-3"
          >
            <p className="mb-2 font-mono text-[10px] text-[var(--us-amber)]">
              {thread.title}
            </p>
            <div className="space-y-2">
              {thread.messages.map((message) => (
                <p
                  key={`${thread.title}-${message.text}`}
                  className="text-[13px] leading-relaxed text-[var(--us-paper)]"
                >
                  <span className={`mr-2 text-[11px] ${nameClass(message.from)}`}>
                    {speakerName(message.from)}
                  </span>
                  {message.text}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </UsPanel>
  );
};
