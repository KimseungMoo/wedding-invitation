"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { useLongPress } from "@/hooks";

/**
 * 하트 채우기 인트로 애니메이션
 * 우아한 화이트 톤 디자인
 */
export const HeartFill = () => {
  const router = useRouter();
  const [showComplete, setShowComplete] = useState(false);

  const handleComplete = useCallback(() => {
    setShowComplete(true);
    setTimeout(() => {
      router.push("/invitation");
    }, 1500);
  }, [router]);

  const { progress, isPressed, handlers } = useLongPress({
    onComplete: handleComplete,
    duration: 2500,
  });

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#faf9f6]">
      {/* === 배경 === */}
      <div className="pointer-events-none absolute inset-0">
        {/* 그라디언트 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5efe8] via-[#faf9f6] to-[#f8f5f0]" />

        {/* 중앙 글로우 */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8b4b8]/20 blur-[100px]"
          animate={{
            scale: isPressed ? [1, 1.15, 1] : 1,
            opacity: isPressed ? [0.2, 0.35, 0.2] : 0.2,
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* 미세한 파티클 */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[#d4a5a5]/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* === 안내 문구 === */}
      <motion.div
        className="relative z-10 mb-14 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
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
          사랑을 채워주세요
        </h1>
        <p className="text-sm tracking-wider text-[#a0a0a0]">
          하트를 꾹 누르고 계세요
        </p>
      </motion.div>

      {/* === 메인 하트 === */}
      <div className="relative z-10">
        {/* 펄스 링 */}
        <AnimatePresence>
          {isPressed && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  style={{ transform: "translate(-50%, -50%)" }}
                  initial={{ scale: 0.8, opacity: 0.4 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  <svg width="180" height="162" viewBox="0 0 24 24" fill="none" stroke="#d4a5a5" strokeWidth="0.5">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* 메인 하트 */}
        <motion.div
          className="cursor-pointer select-none"
          animate={{
            scale: isPressed ? 0.95 : 1,
          }}
          transition={{ duration: 0.15 }}
          {...handlers}
          role="button"
          aria-label="하트를 꾹 누르세요"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handlers.onMouseDown();
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter" || e.key === " ") handlers.onMouseUp();
          }}
        >
          <svg width="180" height="162" viewBox="0 0 200 180" className="drop-shadow-[0_8px_30px_rgba(212,165,165,0.3)]">
            <defs>
              {/* 채우기 그라디언트 */}
              <linearGradient id="heartFill" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#d4a5a5" />
                <stop offset={`${progress}%`} stopColor="#e8b4b8" />
                <stop offset={`${progress}%`} stopColor="#f0e6e6" />
                <stop offset="100%" stopColor="#f5f0f0" />
              </linearGradient>
              {/* 테두리 그라디언트 */}
              <linearGradient id="heartStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4a5a5" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#c9a961" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#d4a5a5" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* 외곽 글로우 */}
            <path
              d="M100 160 C50 120 10 80 10 50 C10 20 35 5 55 5 C75 5 90 20 100 35 C110 20 125 5 145 5 C165 5 190 20 190 50 C190 80 150 120 100 160 Z"
              fill="none"
              stroke="#d4a5a5"
              strokeWidth="1"
              opacity="0.2"
              filter="blur(6px)"
            />

            {/* 메인 하트 */}
            <path
              d="M100 160 C50 120 10 80 10 50 C10 20 35 5 55 5 C75 5 90 20 100 35 C110 20 125 5 145 5 C165 5 190 20 190 50 C190 80 150 120 100 160 Z"
              fill="url(#heartFill)"
              stroke="url(#heartStroke)"
              strokeWidth="1.5"
            />

            {/* 하이라이트 */}
            <ellipse cx="60" cy="45" rx="18" ry="10" fill="white" opacity="0.4" transform="rotate(-20 60 45)" />
          </svg>

          {/* 진행도 텍스트 */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            animate={{ opacity: progress > 0 ? 1 : 0 }}
          >
            <span className="text-2xl font-light tracking-wider text-[#8b7355]">
              {Math.round(progress)}
            </span>
            <span className="text-sm text-[#a08d6e]">%</span>
          </motion.div>
        </motion.div>
      </div>

      {/* === 진행도 바 === */}
      <motion.div
        className="relative z-10 mt-14 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="mb-3 h-[2px] w-44 overflow-hidden rounded-full bg-[#e8e2d9]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#d4a5a5] to-[#c9a961]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <p className="text-[10px] tracking-[0.2em] text-[#b0b0b0]">
          {progress < 100 ? "HOLD TO FILL" : "COMPLETE"}
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
            {/* 방사형 빛 */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 h-[300px] w-px origin-bottom bg-gradient-to-t from-[#d4c5a9]/30 to-transparent"
                style={{
                  rotate: `${i * 30}deg`,
                  translateX: "-50%",
                  translateY: "-100%",
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 1, delay: i * 0.05 }}
              />
            ))}

            <motion.div
              className="relative text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <svg width="100" height="90" viewBox="0 0 24 24" fill="#d4a5a5" className="mx-auto mb-5">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <p className="text-base font-light tracking-[0.3em] text-[#8b7355]">
                WITH LOVE
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
