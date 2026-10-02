"use client";

import { wedding } from "@/wedding.config";
import { UsExpand, UsWidget } from "./UsWidget";

export const Story = () => {
  const [first, ...rest] = wedding.us.story;

  return (
    <UsWidget>
      <p className="us-widget-kicker">이야기</p>
      <article className="us-log-item">
        <p className="text-[10px] text-[var(--us-dim)]">01 {first.title}</p>
        <p className="mt-1 text-[13px] leading-relaxed">{first.body}</p>
      </article>
      <UsExpand label="이야기 더 보기">
        {rest.map((beat, index) => (
          <article key={beat.title} className="us-log-item">
            <p className="text-[10px] text-[var(--us-dim)]">
              {String(index + 2).padStart(2, "0")} {beat.title}
            </p>
            <p className="mt-1 text-[13px] leading-relaxed">{beat.body}</p>
          </article>
        ))}
      </UsExpand>
    </UsWidget>
  );
};
