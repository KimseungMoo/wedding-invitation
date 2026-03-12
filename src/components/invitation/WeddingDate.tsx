"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface WeddingDateProps {
  date?: string;
  time?: string;
  venue?: string;
  address?: string;
}

/**
 * 일시/장소 섹션
 * 우아한 화이트 톤 디자인
 */
export const WeddingDate = ({
  date = "2027년 2월 21일",
  time = "일요일 오전 11시 30분",
  venue = "그랜드 웨딩홀",
  address = "서울시 강남구 테헤란로 123",
}: WeddingDateProps) => {
  // D-Day 계산
  const dDay = useMemo(() => {
    const weddingDate = new Date("2027-02-21");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.ceil(
      (weddingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff;
  }, []);

  // 달력 날짜 생성
  const calendarDays = useMemo(() => {
    const year = 2027;
    const month = 1; // 2월 (0-indexed)
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = [];

    // 빈 칸 추가
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // 날짜 추가
    for (let i = 1; i <= lastDate; i++) {
      days.push(i);
    }

    return days;
  }, []);

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-md">
        {/* === 섹션 제목 === */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 text-[10px] tracking-[0.3em] text-[#a08d6e]">WEDDING DAY</p>
          <div className="mx-auto flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4c5a9]/50" />
            <div className="h-1 w-1 rotate-45 border border-[#c9a961]/50" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4c5a9]/50" />
          </div>
        </motion.div>

        {/* === 날짜/시간 정보 === */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="mb-1 text-xl font-light tracking-wide text-[#4a4a4a]">{date}</p>
          <p className="text-base text-[#8b8b8b]">{time}</p>
        </motion.div>

        {/* === 달력 === */}
        <motion.div
          className="mb-10 rounded-lg border border-[#e8e2d9] bg-[#faf9f6] p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="mb-5 text-center text-sm font-light tracking-[0.15em] text-[#6b6b6b]">
            FEBRUARY 2027
          </h3>

          {/* 요일 헤더 */}
          <div className="mb-3 grid grid-cols-7 gap-1 text-center">
            {weekDays.map((day, index) => (
              <span
                key={`${day}-${index}`}
                className={`text-[11px] font-medium ${
                  index === 0
                    ? "text-[#d4a5a5]"
                    : index === 6
                      ? "text-[#8ba5c9]"
                      : "text-[#a0a0a0]"
                }`}
              >
                {day}
              </span>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`flex h-9 w-full items-center justify-center rounded-full text-sm ${
                  day === 21
                    ? "bg-[#d4a5a5] font-medium text-white"
                    : day === null
                      ? ""
                      : index % 7 === 0
                        ? "text-[#d4a5a5]"
                        : index % 7 === 6
                          ? "text-[#8ba5c9]"
                          : "text-[#6b6b6b]"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </motion.div>

        {/* === D-Day === */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="inline-block rounded-full border border-[#d4c5a9]/40 bg-[#faf9f6] px-6 py-2 text-sm font-light tracking-wider text-[#8b7355]">
            {dDay > 0 ? `D - ${dDay}` : dDay === 0 ? "D - Day" : "We Got Married"}
          </span>
        </motion.div>

        {/* === 장소 정보 === */}
        <motion.div
          className="rounded-lg border border-[#e8e2d9] bg-[#faf9f6] p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <svg className="mx-auto mb-3 h-6 w-6 text-[#c9a961]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <h3 className="mb-1 text-base font-light text-[#4a4a4a]">
            {venue}
          </h3>
          <p className="text-sm text-[#8b8b8b]">{address}</p>
        </motion.div>
      </div>
    </section>
  );
};
