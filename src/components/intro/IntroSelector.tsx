"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { HeartFill } from "./HeartFill";
import { DoorOpen } from "./DoorOpen";
import { RibbonUnwind } from "./RibbonUnwind";
import { HeartBeat } from "./HeartBeat";
import { GardenGate } from "./GardenGate";
import { WaxSeal } from "./WaxSeal";

type IntroType = "heart" | "door" | "ribbon" | "heartbeat" | "garden" | "seal" | null;

interface IntroOption {
  id: IntroType;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const introOptions: IntroOption[] = [
  {
    id: "heart",
    title: "Heart Fill",
    subtitle: "하트를 꾹 눌러 채워주세요",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
  },
  {
    id: "heartbeat",
    title: "Heart Beat",
    subtitle: "하트를 10번 터치하세요",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        <path d="M3 12h4l2-4 4 8 2-4h6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "door",
    title: "Door Open",
    subtitle: "문을 터치해 열어주세요",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 21v-6h6v6M15 10h.01" />
      </svg>
    ),
  },
  {
    id: "garden",
    title: "Garden Gate",
    subtitle: "문을 옆으로 밀어주세요",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 12h18M12 3v18" />
        <circle cx="8" cy="8" r="1" fill="currentColor" />
        <circle cx="16" cy="8" r="1" fill="currentColor" />
        <circle cx="8" cy="16" r="1" fill="currentColor" />
        <circle cx="16" cy="16" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "ribbon",
    title: "Ribbon",
    subtitle: "리본을 아래로 당겨주세요",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3c-1.5 0-2.5 1-2.5 2s1 2 2.5 2 2.5-1 2.5-2-1-2-2.5-2zM7 7l-3 7h6l2 7 2-7h6l-3-7" />
      </svg>
    ),
  },
  {
    id: "seal",
    title: "Wax Seal",
    subtitle: "봉랍을 꾹 눌러 열어주세요",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
        <circle cx="12" cy="14" r="3" fill="currentColor" />
      </svg>
    ),
  },
];

/**
 * 인트로 애니메이션 선택 화면
 * 우아한 화이트 톤 디자인
 */
export const IntroSelector = () => {
  const [selectedIntro, setSelectedIntro] = useState<IntroType>(null);

  const handleSelect = useCallback((type: IntroType) => {
    setSelectedIntro(type);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedIntro(null);
  }, []);

  if (selectedIntro) {
    const IntroComponents: Record<Exclude<IntroType, null>, React.ComponentType> = {
      heart: HeartFill,
      door: DoorOpen,
      ribbon: RibbonUnwind,
      heartbeat: HeartBeat,
      garden: GardenGate,
      seal: WaxSeal,
    };

    const SelectedComponent = IntroComponents[selectedIntro];

    return (
      <div className="relative">
        <button
          onClick={handleBack}
          className="fixed left-6 top-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[#d4c5a9]/30 bg-white/80 shadow-sm backdrop-blur-md transition-all hover:bg-white"
          aria-label="뒤로 가기"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b7355" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <SelectedComponent />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#faf9f6]">
      {/* === 배경 === */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* 따뜻한 그라디언트 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f0e8] via-transparent to-[#faf9f6]" />

        {/* 미세한 텍스처 */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />

        {/* 부드러운 글로우 */}
        <div className="absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4c5a9]/10 blur-[100px]" />
      </div>

      {/* === 메인 콘텐츠 === */}
      <div className="relative z-10 flex flex-1 flex-col px-6 py-16">
        {/* 헤더 */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* 장식 라인 */}
          <motion.div
            className="mx-auto mb-6 flex items-center justify-center gap-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a961]/50" />
            <div className="h-1.5 w-1.5 rotate-45 border border-[#c9a961]/60" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a961]/50" />
          </motion.div>

          <h1 className="mb-3 font-light tracking-[0.3em] text-[#a08d6e]" style={{ fontSize: "0.65rem" }}>
            WEDDING INVITATION
          </h1>
          <p className="text-lg font-light tracking-wide text-[#4a4a4a]">
            오프닝 선택
          </p>
        </motion.div>

        {/* 선택 카드 그리드 */}
        <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-3">
          {introOptions.map((option, index) => (
            <motion.button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className="group relative overflow-hidden rounded-lg border border-[#e8e2d9] bg-white/60 p-5 text-center shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-[#d4c5a9] hover:bg-white hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.08 }}
            >
              {/* 호버 글로우 */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#d4c5a9]/0 via-[#d4c5a9]/5 to-[#d4c5a9]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative flex flex-col items-center gap-3">
                {/* 아이콘 */}
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f0e8] text-[#a08d6e] transition-all duration-300 group-hover:bg-[#ebe4d8] group-hover:text-[#8b7355]">
                  {option.icon}
                </div>

                {/* 텍스트 */}
                <div>
                  <h3 className="mb-1 text-xs font-medium tracking-[0.1em] text-[#5a5a5a]">
                    {option.title.toUpperCase()}
                  </h3>
                  <p className="text-[11px] leading-tight text-[#a0a0a0]">{option.subtitle}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* 하단 */}
        <motion.div
          className="mt-auto pt-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="mx-auto mb-4 h-px w-8 bg-gradient-to-r from-transparent via-[#d4c5a9]/40 to-transparent" />
          <p className="text-[11px] tracking-wider text-[#b0b0b0]">
            어떤 오프닝을 선택하셔도 같은 청첩장으로 이동합니다
          </p>
        </motion.div>
      </div>
    </div>
  );
};
