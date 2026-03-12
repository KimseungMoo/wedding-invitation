"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";

/**
 * 하트비트 인트로 애니메이션
 * 탭할 때마다 심장이 뛰고 카운트가 올라감
 */
export const HeartBeat = () => {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [isBeating, setIsBeating] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const targetCount = 10;

  const handleTap = useCallback(() => {
    if (count >= targetCount) return;

    setIsBeating(true);
    setCount((prev) => prev + 1);

    setTimeout(() => setIsBeating(false), 200);
  }, [count, targetCount]);

  useEffect(() => {
    if (count >= targetCount && !showComplete) {
      setTimeout(() => {
        setShowComplete(true);
        setTimeout(() => {
          router.push("/invitation");
        }, 1500);
      }, 500);
    }
  }, [count, targetCount, showComplete, router]);

  const progress = (count / targetCount) * 100;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#faf9f6]">
      {/* === 배경 === */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5efe8] via-[#faf9f6] to-[#f8f5f0]" />

        {/* 중앙 글로우 */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8b4b8]/15 blur-[80px]"
          animate={{
            scale: isBeating ? [1, 1.3, 1] : 1,
            opacity: isBeating ? [0.15, 0.3, 0.15] : 0.15,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* === 안내 문구 === */}
      <motion.div
        className="relative z-10 mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: count >= targetCount ? 0 : 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="mb-5 flex items-center justify-center gap-5"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#c9a961]/50" />
          <div className="h-1.5 w-1.5 rotate-45 border border-[#c9a961]/50" />
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#c9a961]/50" />
        </motion.div>
        <h1 className="mb-2 text-xl font-light tracking-wide text-[#5a5a5a]">
          두근두근
        </h1>
        <p className="text-sm tracking-wider text-[#a0a0a0]">
          하트를 {targetCount}번 터치하세요
        </p>
      </motion.div>

      {/* === 메인 하트 === */}
      <motion.div
        className="relative z-10 cursor-pointer select-none"
        onClick={handleTap}
        animate={{
          scale: isBeating ? [1, 1.15, 0.95, 1] : 1,
        }}
        transition={{ duration: 0.3 }}
        role="button"
        aria-label="하트를 터치하세요"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleTap();
        }}
      >
        {/* 펄스 이펙트 */}
        <AnimatePresence>
          {isBeating && (
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <svg width="200" height="180" viewBox="0 0 24 24" fill="none" stroke="#d4a5a5" strokeWidth="0.5">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        <svg
          width="180"
          height="162"
          viewBox="0 0 200 180"
          className="drop-shadow-[0_8px_30px_rgba(212,165,165,0.3)]"
        >
          <defs>
            <linearGradient id="heartBeatFill" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#d4a5a5" />
              <stop offset={`${progress}%`} stopColor="#e8b4b8" />
              <stop offset={`${progress}%`} stopColor="#f0e6e6" />
              <stop offset="100%" stopColor="#f5f0f0" />
            </linearGradient>
          </defs>

          <path
            d="M100 160 C50 120 10 80 10 50 C10 20 35 5 55 5 C75 5 90 20 100 35 C110 20 125 5 145 5 C165 5 190 20 190 50 C190 80 150 120 100 160 Z"
            fill="url(#heartBeatFill)"
            stroke="#d4a5a5"
            strokeWidth="1.5"
            strokeOpacity="0.5"
          />

          <ellipse cx="60" cy="45" rx="18" ry="10" fill="white" opacity="0.4" transform="rotate(-20 60 45)" />
        </svg>

        {/* 카운트 */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
          animate={{ scale: isBeating ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-3xl font-light text-[#8b7355]">{count}</span>
          <span className="text-sm text-[#a08d6e]">/{targetCount}</span>
        </motion.div>
      </motion.div>

      {/* === 진행도 === */}
      <motion.div
        className="relative z-10 mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* 하트 인디케이터 */}
        <div className="mb-4 flex justify-center gap-1.5">
          {Array.from({ length: targetCount }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{
                scale: i < count ? 1 : 0.6,
                opacity: i < count ? 1 : 0.3,
              }}
              transition={{ duration: 0.2, delay: i < count ? 0 : 0 }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill={i < count ? "#d4a5a5" : "none"}
                stroke="#d4a5a5"
                strokeWidth="1.5"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
          ))}
        </div>

        <p className="text-[10px] tracking-[0.2em] text-[#b0b0b0]">
          {count < targetCount ? "TAP THE HEART" : "COMPLETE"}
        </p>
      </motion.div>

      {/* === 완료 오버레이 === */}
      <AnimatePresence>
        {showComplete && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#faf9f6]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 하트 파티클 */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: Math.cos((i * Math.PI) / 4) * 150,
                  y: Math.sin((i * Math.PI) / 4) * 150,
                  scale: [0, 1, 0.5],
                  opacity: [1, 1, 0],
                }}
                transition={{ duration: 1.2, delay: i * 0.05 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#d4a5a5">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.div>
            ))}

            <motion.div
              className="relative text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.svg
                width="80"
                height="72"
                viewBox="0 0 24 24"
                fill="#d4a5a5"
                className="mx-auto mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </motion.svg>
              <p className="text-base font-light tracking-[0.3em] text-[#8b7355]">
                HEARTBEAT
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
