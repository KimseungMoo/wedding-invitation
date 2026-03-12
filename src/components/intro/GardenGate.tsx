"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { useDrag } from "@/hooks";

/**
 * 정원 문 인트로 애니메이션
 * 좌우로 슬라이드하여 문을 여는 컨셉
 */
export const GardenGate = () => {
  const router = useRouter();
  const [showTransition, setShowTransition] = useState(false);

  const handleComplete = useCallback(() => {
    setTimeout(() => {
      setShowTransition(true);
      setTimeout(() => {
        router.push("/invitation");
      }, 1200);
    }, 300);
  }, [router]);

  const { progress, isDragging, handlers } = useDrag({
    direction: "horizontal",
    threshold: 150,
    onComplete: handleComplete,
  });

  const gateOffset = progress * 1.2;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#faf9f6]">
      {/* === 배경 === */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0ebe0] via-[#faf9f6] to-[#f5f0e8]" />

        {/* 덩굴 장식 */}
        <svg className="absolute left-0 top-0 h-full w-20 opacity-20" viewBox="0 0 80 600" preserveAspectRatio="xMinYMin slice">
          <path
            d="M40 0 Q20 100 40 200 Q60 300 40 400 Q20 500 40 600"
            fill="none"
            stroke="#8b9a6b"
            strokeWidth="2"
          />
          {[100, 200, 300, 400, 500].map((y) => (
            <circle key={y} cx="40" cy={y} r="4" fill="#8b9a6b" />
          ))}
        </svg>
        <svg className="absolute right-0 top-0 h-full w-20 opacity-20" viewBox="0 0 80 600" preserveAspectRatio="xMaxYMin slice">
          <path
            d="M40 0 Q60 100 40 200 Q20 300 40 400 Q60 500 40 600"
            fill="none"
            stroke="#8b9a6b"
            strokeWidth="2"
          />
          {[100, 200, 300, 400, 500].map((y) => (
            <circle key={y} cx="40" cy={y} r="4" fill="#8b9a6b" />
          ))}
        </svg>

        {/* 글로우 */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4c5a9]/10 blur-[80px]"
          animate={{
            scale: isDragging ? 1.2 : 1,
            opacity: isDragging ? 0.2 : 0.1,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* === 안내 문구 === */}
      <motion.div
        className="absolute top-20 z-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: progress > 50 ? 0 : 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="mb-5 flex items-center justify-center gap-5"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#8b9a6b]/50" />
          <svg className="h-4 w-4 text-[#8b9a6b]/60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#8b9a6b]/50" />
        </motion.div>
        <h1 className="mb-2 text-xl font-light tracking-wide text-[#5a5a5a]">
          정원으로 초대합니다
        </h1>
        <p className="text-sm tracking-wider text-[#a0a0a0]">
          문을 옆으로 밀어주세요
        </p>
      </motion.div>

      {/* === 정원 문 === */}
      <div
        className="relative z-10 cursor-grab select-none active:cursor-grabbing"
        {...handlers}
        role="slider"
        aria-label="문을 옆으로 드래그하세요"
        aria-valuenow={Math.round(progress)}
        tabIndex={0}
      >
        <div className="relative h-[400px] w-[280px]">
          {/* 문 프레임 */}
          <div className="absolute inset-0 rounded-t-[60px] border-2 border-[#8b9a6b]/30 bg-gradient-to-b from-[#f0ebe0] to-[#e8e2d6]" />

          {/* 왼쪽 문 */}
          <motion.div
            className="absolute left-0 top-0 h-full w-1/2 origin-left overflow-hidden rounded-tl-[58px] border-r border-[#8b9a6b]/20"
            style={{
              x: -gateOffset,
              opacity: Math.max(0, 1 - progress / 100),
            }}
          >
            <div className="h-full w-full bg-gradient-to-br from-[#f5f0e8] to-[#ebe4d8]">
              {/* 격자 패턴 */}
              <div className="absolute inset-4 grid grid-cols-2 grid-rows-4 gap-2">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-sm border border-[#8b9a6b]/20 bg-[#8b9a6b]/5"
                  />
                ))}
              </div>
              {/* 손잡이 */}
              <div className="absolute right-3 top-1/2 h-8 w-1 -translate-y-1/2 rounded-full bg-[#a08d6e]" />
            </div>
          </motion.div>

          {/* 오른쪽 문 */}
          <motion.div
            className="absolute right-0 top-0 h-full w-1/2 origin-right overflow-hidden rounded-tr-[58px] border-l border-[#8b9a6b]/20"
            style={{
              x: gateOffset,
              opacity: Math.max(0, 1 - progress / 100),
            }}
          >
            <div className="h-full w-full bg-gradient-to-bl from-[#f5f0e8] to-[#ebe4d8]">
              {/* 격자 패턴 */}
              <div className="absolute inset-4 grid grid-cols-2 grid-rows-4 gap-2">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-sm border border-[#8b9a6b]/20 bg-[#8b9a6b]/5"
                  />
                ))}
              </div>
              {/* 손잡이 */}
              <div className="absolute left-3 top-1/2 h-8 w-1 -translate-y-1/2 rounded-full bg-[#a08d6e]" />
            </div>
          </motion.div>

          {/* 문 안쪽 (정원) */}
          <motion.div
            className="absolute inset-2 flex flex-col items-center justify-center rounded-t-[52px] bg-gradient-to-b from-[#e8f0e8] to-[#f0f5f0]"
            initial={{ opacity: 0 }}
            animate={{ opacity: progress > 30 ? Math.min(1, (progress - 30) / 50) : 0 }}
          >
            {/* 꽃 장식 */}
            <svg className="mb-4 h-16 w-16 text-[#d4a5a5]/60" viewBox="0 0 64 64" fill="currentColor">
              <circle cx="32" cy="32" r="8" />
              <ellipse cx="32" cy="18" rx="6" ry="10" />
              <ellipse cx="32" cy="46" rx="6" ry="10" />
              <ellipse cx="18" cy="32" rx="10" ry="6" />
              <ellipse cx="46" cy="32" rx="10" ry="6" />
              <ellipse cx="22" cy="22" rx="6" ry="8" transform="rotate(-45 22 22)" />
              <ellipse cx="42" cy="22" rx="6" ry="8" transform="rotate(45 42 22)" />
              <ellipse cx="22" cy="42" rx="6" ry="8" transform="rotate(45 22 42)" />
              <ellipse cx="42" cy="42" rx="6" ry="8" transform="rotate(-45 42 42)" />
            </svg>
            <p className="text-sm font-light tracking-[0.2em] text-[#6b7b5b]">GARDEN</p>
          </motion.div>

          {/* 바닥 */}
          <div className="absolute -bottom-4 left-1/2 h-4 w-72 -translate-x-1/2 rounded-full bg-[#8b9a6b]/10 blur-lg" />
        </div>

        {/* 드래그 힌트 */}
        {!isDragging && progress < 10 && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ x: [-10, 10, -10] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="#8b9a6b" strokeWidth="1.5" opacity="0.5">
              <path d="M5 10H35M5 10L12 3M5 10L12 17M35 10L28 3M35 10L28 17" />
            </svg>
          </motion.div>
        )}
      </div>

      {/* === 진행도 === */}
      <motion.div
        className="absolute bottom-16 z-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="mb-3 h-[2px] w-44 overflow-hidden rounded-full bg-[#e8e2d9]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#8b9a6b] to-[#a08d6e]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <p className="text-[10px] tracking-[0.2em] text-[#b0b0b0]">
          {progress < 100 ? "SLIDE TO OPEN" : "WELCOME"}
        </p>
      </motion.div>

      {/* === 전환 오버레이 === */}
      <AnimatePresence>
        {showTransition && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#f0f5f0]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 잎 파티클 */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: 0,
                  y: -50,
                  rotate: 0,
                  opacity: 0,
                }}
                animate={{
                  x: (Math.random() - 0.5) * 300,
                  y: 300,
                  rotate: Math.random() * 360,
                  opacity: [0, 1, 1, 0],
                }}
                transition={{ duration: 2, delay: i * 0.1 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#8b9a6b" opacity="0.6">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                </svg>
              </motion.div>
            ))}

            <motion.div
              className="relative text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-[#8b9a6b]/50" />
                <svg className="h-5 w-5 text-[#8b9a6b]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <div className="h-px w-8 bg-[#8b9a6b]/50" />
              </div>
              <p className="text-base font-light tracking-[0.3em] text-[#6b7b5b]">
                WELCOME
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
