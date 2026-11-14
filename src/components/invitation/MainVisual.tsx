"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface MainVisualProps {
  groomEnglishName?: string;
  brideEnglishName?: string;
  dateLabel?: string;
  timeLabel?: string;
  venueLabel?: string;
}

/**
 * 메인 비주얼 섹션
 * 종이 청첩장 표지(SAVE THE DATE + 더 채플 앳 청담 아치 일러스트)를 모바일에 맞게 재현
 */
export const MainVisual = ({
  groomEnglishName = "KIM SEUNG MOO",
  brideEnglishName = "SEONG EUN JI",
  dateLabel = "2027. 2. 21. (일)",
  timeLabel = "오전 11시 30분",
  venueLabel = "더 채플 앳 청담 채플홀 (6층)",
}: MainVisualProps) => {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#faf7f2] px-4 py-4 sm:px-6 sm:py-10">
      {/* === 배경 은은한 그라데이션 === */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f4ede3] via-[#faf7f2] to-[#f6f1ea]" />

      {/* === 종이 청첩장 표지 카드 프레임 === */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-[420px] border border-[#dcd0c0] bg-[#f8f3eb]/90 p-1.5 sm:p-2 shadow-[0_14px_45px_rgba(92,72,52,0.08)]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex flex-col items-center border border-[#e6dcd0] bg-gradient-to-b from-[#faf6ef] via-[#faf7f2] to-[#f6f0e6] px-4 pb-6 pt-6 text-center sm:px-6 sm:pb-10 sm:pt-9">
          {/* SAVE THE DATE */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="font-display text-sm font-medium tracking-[0.42em] text-[#5c4a3a] sm:text-base">
              SAVE THE DATE
            </p>
            <div className="mx-auto mt-3 h-px w-8 bg-[#bfa98e]/70 sm:mt-4" />
          </motion.div>

          {/* 채플 아치 일러스트 */}
          <motion.div
            className="relative my-2.5 w-full max-w-[260px] sm:my-4 sm:max-w-[320px]"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="relative aspect-[646/583] w-full overflow-hidden"
              style={{
                WebkitMaskImage:
                  "radial-gradient(ellipse 92% 90% at 50% 50%, black 66%, transparent 100%)",
                maskImage:
                  "radial-gradient(ellipse 92% 90% at 50% 50%, black 66%, transparent 100%)",
              }}
            >
              <Image
                src="/chapel-illustration.png"
                alt="더 채플 앳 청담 아치 일러스트"
                fill
                className="object-contain mix-blend-multiply"
                priority
              />
            </div>
          </motion.div>

          {/* 예식 일시 */}
          <motion.div
            className="mt-1 space-y-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <p className="text-base font-normal tracking-[0.18em] text-[#4a3728] sm:text-[17px]">
              {dateLabel}
            </p>
            <p className="text-xs font-light tracking-[0.14em] text-[#7a6856] sm:text-[13px]">
              {timeLabel}
            </p>
          </motion.div>

          {/* 영문 성함 */}
          <motion.div
            className="mt-4 flex flex-col items-center gap-0.5 sm:mt-5 sm:gap-1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <p className="font-display text-base font-medium tracking-[0.28em] text-[#4a3728] sm:text-lg">
              {groomEnglishName}
            </p>
            <span className="font-display text-sm italic text-[#9d8770]">&amp;</span>
            <p className="font-display text-base font-medium tracking-[0.28em] text-[#4a3728] sm:text-lg">
              {brideEnglishName}
            </p>
          </motion.div>

          {/* 예식장 안내 */}
          <motion.p
            className="mt-4 text-[11px] tracking-[0.14em] text-[#8b7763] sm:mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            {venueLabel}
          </motion.p>
        </div>
      </motion.div>

      {/* === 스크롤 힌트 === */}
      <motion.div
        className="relative z-10 mt-3.5 pb-safe sm:mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-[#8b7355]/60"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          <span className="font-display text-[10px] tracking-[0.28em] text-[#9b8976]">
            SCROLL
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};
