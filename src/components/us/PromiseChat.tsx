"use client";

import { wedding, type ChatSpeaker } from "@/wedding.config";
import { UsExpand, UsWidget } from "./UsWidget";

const speakerName = (from: ChatSpeaker) => {
  if (from === "groom") return wedding.groom.shortName;
  if (from === "bride") return wedding.bride.shortName;
  return wedding.us.botName;
};

const nameClass = (from: ChatSpeaker) => {
  if (from === "groom") return "text-[#9bb0ff]";
  if (from === "bride") return "text-[#f0c0c8]";
  return "text-[#9ee0b0]";
};

export const TodayAlert = () => {
  return (
    <UsWidget>
      <p className="us-widget-kicker">
        {wedding.us.botName} 오늘 알림
      </p>
      <p className="us-alert-num">1. {wedding.us.typeLine}</p>
    </UsWidget>
  );
};

export const PromiseChat = () => {
  return (
    <UsWidget tone="game">
      <p className="us-widget-kicker">{wedding.us.botName}</p>
      <p className="text-[13px] leading-relaxed text-[var(--us-game-dim)]">
        {wedding.us.intro}
      </p>
      <UsExpand label="대화 펼치기">
        <div className="mt-3 space-y-4">
          {wedding.us.chats.map((thread) => (
            <article key={thread.title}>
              <p className="mb-2 text-[10px] tracking-wide text-[#f4c4d4]">
                {thread.title}
              </p>
              {thread.messages.map((message) => (
                <p
                  key={`${thread.title}-${message.text}`}
                  className="us-chat-line"
                >
                  <span className={`mr-2 text-[11px] ${nameClass(message.from)}`}>
                    {speakerName(message.from)}
                  </span>
                  {message.text}
                </p>
              ))}
            </article>
          ))}
        </div>
      </UsExpand>
    </UsWidget>
  );
};
