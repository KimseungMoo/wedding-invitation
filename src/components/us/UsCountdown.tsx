"use client";

import { useEffect, useMemo, useState } from "react";
import { wedding } from "@/wedding.config";
import { UsWidget } from "./UsWidget";

const pad = (n: number) => String(n).padStart(2, "0");

export const useCountdown = (at: string) => {
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

export const DdayWidget = () => {
  const count = useCountdown(wedding.date.at);
  const label = count.done ? "D-DAY" : `D-${count.days}`;

  return (
    <UsWidget>
      <p className="us-widget-kicker">결혼식까지</p>
      <p className="us-dday">{label}</p>
      {!count.done ? (
        <p className="us-dday-clock">
          {pad(count.hours)}:{pad(count.minutes)}:{pad(count.seconds)}
        </p>
      ) : null}
      <p className="mt-3 text-[11px] text-[var(--us-dim)]">{wedding.date.compact}</p>
    </UsWidget>
  );
};

export const CalendarWidget = () => {
  const cells = useMemo(() => {
    const year = 2027;
    const month = 1;
    const startPad = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevDays = new Date(year, month, 0).getDate();
    const next: { day: number; current: boolean }[] = [];
    for (let i = startPad; i > 0; i -= 1) {
      next.push({ day: prevDays - i + 1, current: false });
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      next.push({ day, current: true });
    }
    const trail = (7 - (next.length % 7)) % 7;
    for (let day = 1; day <= trail; day += 1) {
      next.push({ day, current: false });
    }
    return next;
  }, []);

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <UsWidget>
      <p className="us-widget-kicker">February 2027</p>
      <div className="us-cal mb-1">
        {weekDays.map((day, index) => (
          <span
            key={`${day}-${index}`}
            className={`us-cal-head${index === 0 ? " is-sun" : ""}`}
          >
            {day}
          </span>
        ))}
      </div>
      <div className="us-cal">
        {cells.map((cell, index) => {
          const weddingDay = cell.current && cell.day === 21;
          return (
            <span
              key={`${cell.day}-${index}`}
              className={`us-cal-day${
                weddingDay ? " is-wed" : cell.current ? "" : " is-out"
              }`}
            >
              {cell.day}
            </span>
          );
        })}
      </div>
    </UsWidget>
  );
};
