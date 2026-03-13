"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface MainVisualProps {
  groomName?: string;
  brideName?: string;
  greeting?: string;
}

/**
 * 메인 비주얼 섹션
 * 우아한 화이트 톤 디자인
 */
export const MainVisual = ({
  groomName = "김승무",
  brideName = "성은지",
  greeting = "사랑하지 않고 스쳐 갈 수도 있었는데,\n사랑일지도 모른다고 걸음을 멈춰준\n그 사람이 정녕 고맙다고\n-양귀자 '모순'-",
}: MainVisualProps) => {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#faf9f6] px-6 py-20">
      {/* === 배경 장식 === */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5efe8] via-[#faf9f6] to-[#f8f5f0]" />

        {/* 좌상단 장식 */}
        <motion.div
          className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#d4c5a9]/10 blur-[80px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* 우하단 장식 */}
        <motion.div
          className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#e8d4c4]/15 blur-[80px]"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* 플로럴 라인 장식 (상단) */}
        <svg className="absolute left-1/2 top-8 -translate-x-1/2 opacity-20" width="200" height="60" viewBox="0 0 200 60">
          <path
            d="M100 30 Q80 10 60 30 Q40 50 20 30 M100 30 Q120 10 140 30 Q160 50 180 30"
            fill="none"
            stroke="#c9a961"
            strokeWidth="1"
          />
          <circle cx="100" cy="30" r="3" fill="#c9a961" />
        </svg>
      </div>

      {/* === 메인 이미지 영역 === */}
      <motion.div
        className="relative z-10 mb-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative h-56 w-56 overflow-hidden rounded-full border border-[#d4c5a9]/30 bg-gradient-to-br from-[#f5f0e8] to-[#ebe4d8] shadow-[0_10px_40px_rgba(180,160,130,0.15)] sm:h-72 sm:w-72">
          {/* 메인 이미지 */}
          <Image
            src="/main.jpeg"
            alt="웨딩 사진"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 장식 링 */}
        <div className="absolute -inset-3 rounded-full border border-dashed border-[#d4c5a9]/25" />
        <div className="absolute -inset-6 rounded-full border border-[#d4c5a9]/10" />
      </motion.div>

      {/* === 장식 라인 === */}
      <motion.div
        className="z-10 mb-6 flex items-center justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a961]/40" />
        <div className="h-1.5 w-1.5 rotate-45 border border-[#c9a961]/50" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a961]/40" />
      </motion.div>

      {/* === 이름 === */}
      <motion.div
        className="z-10 mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="flex items-center justify-center gap-5">
          <span className="text-2xl font-light tracking-wide text-[#4a4a4a]">
            {groomName}
          </span>
          <div className="flex items-center gap-2">
            <div className="h-px w-3 bg-[#d4a5a5]/50" />
            <svg className="h-4 w-4 text-[#d4a5a5]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <div className="h-px w-3 bg-[#d4a5a5]/50" />
          </div>
          <span className="text-2xl font-light tracking-wide text-[#4a4a4a]">
            {brideName}
          </span>
        </div>
      </motion.div>

      {/* === 인사말 === */}
      <motion.div
        className="z-10 max-w-sm text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <p className="whitespace-pre-line text-base font-light leading-loose text-[#6b6b6b]">
          {greeting}
        </p>
      </motion.div>

      {/* === 스크롤 힌트 === */}
      <motion.div
        className="absolute bottom-10 z-10 pb-safe"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-[#a08d6e]/50"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          <span className="text-[10px] tracking-[0.2em] text-[#b0b0b0]">SCROLL</span>
        </motion.div>
      </motion.div>
    </section>
  );
};
