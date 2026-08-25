"use client";

import { useEffect, useMemo, useState } from "react";
import { wedding } from "@/wedding.config";
import { UsPanel } from "./UsPanel";

const pad = (n: number) => String(n).padStart(2, "0");

const useCountdown = (at: string) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const target = new Date(at).getTime();
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
    done: diff === 0,
  };
};

export const UsCountdown = () => {
  const count = useCountdown(wedding.date.at);

  const calendarDays = useMemo(() => {
    const year = 2027;
    const month = 1;
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i += 1) days.push(null);
    for (let i = 1; i <= lastDate; i += 1) days.push(i);
    return days;
  }, []);

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <UsPanel label="COUNTDOWN" title="D-DAY">
      <p className="mb-3 font-mono text-[10px] tracking-[0.14em] text-[var(--us-dim)]">
        {count.done ? "TODAY" : `D-${count.days}`}
      </p>
      <div className="mb-5 grid grid-cols-4 gap-2 font-mono">
        {[
          [pad(count.days), "DAY"],
          [pad(count.hours), "HR"],
          [pad(count.minutes), "MIN"],
          [pad(count.seconds), "SEC"],
        ].map(([value, unit]) => (
          <div
            key={unit}
            className="rounded border border-[var(--us-line)] bg-[var(--us-ink-3)] py-2 text-center"
          >
            <p className="text-lg text-[var(--us-amber)]">{value}</p>
            <p className="text-[9px] tracking-wider text-[var(--us-dim)]">{unit}</p>
          </div>
        ))}
      </div>

      <p className="mb-3 text-center font-mono text-[10px] tracking-[0.16em] text-[var(--us-dim)]">
        FEBRUARY 2027
      </p>
      <div className="mb-1 grid grid-cols-7 gap-1 text-center font-mono text-[10px] text-[var(--us-dim)]">
        {weekDays.map((day, index) => (
          <span key={`${day}-${index}`}>{day}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center font-mono text-[12px]">
        {calendarDays.map((day, index) => (
          <span
            key={`${day}-${index}`}
            className={`flex h-7 items-center justify-center rounded ${
              day === 21
                ? "bg-[var(--us-amber)] font-medium text-[#20180a]"
                : day === null
                  ? ""
                  : "text-[var(--us-paper)]"
            }`}
          >
            {day ?? ""}
          </span>
        ))}
      </div>
    </UsPanel>
  );
};
