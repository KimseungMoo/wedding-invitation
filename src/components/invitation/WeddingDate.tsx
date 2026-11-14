"use client";

import { motion } from "framer-motion";
import { useMemo, useCallback } from "react";

interface WeddingDateProps {
  date?: string;
  time?: string;
  venue?: string;
  address?: string;
}

/**
 * 일시/장소 및 달력 섹션
 * 종이 청첩장의 샴페인 아이보리 & 에스프레소 토프 톤으로 통일
 */
export const WeddingDate = ({
  date = "2027년 2월 21일 (일)",
  time = "오전 11시 30분",
  venue = "더 채플 앳 청담 채플홀 (6층)",
  address = "서울특별시 강남구 선릉로 757 (논현동 94-9)",
}: WeddingDateProps) => {
  // 타임존 오차 없는 로컬 날짜 기준 D-Day 계산
  const dDay = useMemo(() => {
    const weddingDate = new Date(2027, 1, 21); // 2027-02-21 00:00 local
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.round(
      (weddingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
  }, []);

  // 달력 날짜 생성 (2027년 2월)
  const calendarDays = useMemo(() => {
    const year = 2027;
    const month = 1; // 2월 (0-indexed)
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= lastDate; i++) days.push(i);
    return days;
  }, []);

  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const handleSaveCalendar = useCallback(() => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Seungmoo & Eunji Wedding//KO",
      "BEGIN:VEVENT",
      "UID:seungmoo-eunji-20270221@wedding",
      "DTSTAMP:20261114T000000Z",
      "DTSTART;TZID=Asia/Seoul:20270221T113000",
      "DTEND;TZID=Asia/Seoul:20270221T133000",
      "SUMMARY:김승무 ♥ 성은지 결혼식",
      `LOCATION:${venue} (${address})`,
      "DESCRIPTION:더 채플 앳 청담 채플홀 (6층)에서 진행되는 결혼식에 초대합니다.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "김승무_성은지_결혼식.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [venue, address]);

  return (
    <section className="bg-[#faf7f2] px-6 py-20">
      <div className="mx-auto max-w-md">
        {/* === 섹션 제목 === */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 font-display text-[11px] tracking-[0.34em] text-[#8b7355]">
            WEDDING DAY
          </p>
          <div className="mx-auto flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#cbbba5]" />
            <div className="h-1 w-1 rotate-45 border border-[#8b7355]/60" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#cbbba5]" />
          </div>
        </motion.div>

        {/* === 날짜/시간 정보 === */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="mb-1 text-lg font-normal tracking-wide text-[#3f342b]">
            {date}
          </p>
          <p className="text-sm font-light text-[#7a6856]">{time}</p>
        </motion.div>

        {/* === 달력 === */}
        <motion.div
          className="mb-8 rounded-lg border border-[#e2d7c8] bg-white p-6 shadow-[0_6px_24px_rgba(92,72,52,0.04)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <h3 className="mb-5 text-center font-display text-xl font-medium tracking-[0.2em] text-[#4a3728] sm:text-2xl">
            2027. 02
          </h3>

          {/* 요일 헤더 */}
          <div className="mb-3 grid grid-cols-7 gap-1 text-center">
            {weekDays.map((day, index) => (
              <span
                key={day}
                className={`text-[10px] tracking-wider ${
                  index === 0
                    ? "text-[#b5655d]"
                    : index === 6
                      ? "text-[#7a828c]"
                      : "text-[#9c8c7b]"
                }`}
              >
                {day}
              </span>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div className="grid grid-cols-7 gap-y-1 text-center">
            {calendarDays.map((day, index) => (
              <div key={index} className="flex h-9 items-center justify-center">
                {day !== null && (
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                      day === 21
                        ? "bg-[#4a3728] font-medium text-[#faf7f2] shadow-sm"
                        : index % 7 === 0
                          ? "text-[#b5655d]"
                          : index % 7 === 6
                            ? "text-[#7a828c]"
                            : "text-[#5c4a3a]"
                    }`}
                  >
                    {day}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* === D-Day & 캘린더 저장 === */}
        <motion.div
          className="flex flex-col items-center gap-3 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <p className="text-sm font-light text-[#6b5e52]">
            승무 ♥ 은지의 결혼식이{" "}
            <span className="font-normal text-[#4a3728]">
              {dDay > 0
                ? `${dDay}일 남았습니다`
                : dDay === 0
                  ? "오늘입니다"
                  : `${Math.abs(dDay)}일 지났습니다`}
            </span>
          </p>

          <button
            type="button"
            onClick={handleSaveCalendar}
            className="inline-flex items-center gap-2 rounded-full border border-[#d6c7b4] bg-white px-5 py-2 text-xs font-light text-[#6b5a4a] transition-colors hover:border-[#b89f7d] hover:bg-[#f6f1ea]"
          >
            <svg
              className="h-3.5 w-3.5 text-[#8b7355]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            캘린더에 일정 저장
          </button>
        </motion.div>
      </div>
    </section>
  );
};
