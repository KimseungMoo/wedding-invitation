"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { useLongPress } from "@/hooks";

/**
 * 봉랍 인장 인트로 애니메이션
 * 봉투의 봉랍을 꾹 눌러 편지를 여는 컨셉
 */
export const WaxSeal = () => {
  const router = useRouter();
  const [isOpened, setIsOpened] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const handleComplete = useCallback(() => {
    setIsOpened(true);
    setTimeout(() => {
      setShowTransition(true);
      setTimeout(() => {
        router.push("/invitation");
      }, 1200);
    }, 800);
  }, [router]);

  const { progress, isPressed, handlers } = useLongPress({
    onComplete: handleComplete,
    duration: 1500,
  });

  const sealScale = isOpened ? 0 : Math.max(0.8, 1 - progress / 200);
  const flapRotate = isOpened ? -180 : Math.min(0, -progress * 0.5);
  const letterRise = isOpened ? -80 : Math.max(0, -progress * 0.3);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#faf9f6] pt-safe">
      {/* === 배경 === */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5efe8] via-[#faf9f6] to-[#f8f5f0]" />

        {/* 글로우 */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4c5a9]/10 blur-[80px]"
          animate={{
            scale: isPressed ? 1.2 : 1,
            opacity: isPressed ? 0.2 : 0.1,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* === 안내 문구 === */}
      <motion.div
        className="relative z-10 mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isOpened ? 0 : 1, y: 0 }}
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
          초대장이 도착했습니다
        </h1>
        <p className="text-sm tracking-wider text-[#a0a0a0]">
          봉랍을 꾹 눌러 열어주세요
        </p>
      </motion.div>

      {/* === 봉투 === */}
      <div className="relative z-10" style={{ perspective: "1000px" }}>
        {/* 봉투 본체 */}
        <div className="relative h-[280px] w-[340px]">
          {/* 봉투 뒤 */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#f0ebe0] to-[#e8e2d6] shadow-[0_10px_40px_rgba(180,160,130,0.2)]" />

          {/* 봉투 안쪽 (삼각형) */}
          <div
            className="absolute left-0 top-0 h-[140px] w-full"
            style={{
              background: "linear-gradient(to bottom, #e8e2d6, #ddd5c5)",
              clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            }}
          />

          {/* 편지지 */}
          <motion.div
            className="absolute left-[10%] top-[15%] h-[70%] w-[80%] rounded-sm bg-white shadow-sm"
            animate={{ y: letterRise }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex h-full flex-col items-center justify-center p-6">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-px w-6 bg-[#d4c5a9]/40" />
                <svg className="h-4 w-4 text-[#d4a5a5]/60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <div className="h-px w-6 bg-[#d4c5a9]/40" />
              </div>
              <p className="text-xs tracking-[0.2em] text-[#8b8b8b]">INVITATION</p>
            </div>
          </motion.div>

          {/* 봉투 앞 덮개 */}
          <motion.div
            className="absolute left-0 top-0 h-[140px] w-full origin-top"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateX: flapRotate }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="h-full w-full rounded-t-lg bg-gradient-to-b from-[#f5f0e8] to-[#ebe4d8]"
              style={{
                clipPath: "polygon(0 0, 50% 100%, 100% 0)",
              }}
            />
          </motion.div>

          {/* 봉투 앞면 */}
          <div className="absolute bottom-0 left-0 h-[160px] w-full rounded-b-lg bg-gradient-to-b from-[#f0ebe0] to-[#e8e2d6]">
            {/* 장식 라인 */}
            <div className="absolute left-1/2 top-8 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#d4c5a9]/30 to-transparent" />
            <div className="absolute left-1/2 top-12 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#d4c5a9]/20 to-transparent" />
          </div>

          {/* 봉랍 인장 */}
          <motion.div
            className="absolute left-1/2 top-[100px] z-20 -translate-x-1/2 cursor-pointer"
            animate={{ scale: sealScale }}
            transition={{ duration: 0.2 }}
            {...handlers}
            role="button"
            aria-label="봉랍을 꾹 누르세요"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handlers.onMouseDown();
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter" || e.key === " ") handlers.onMouseUp();
            }}
          >
            {/* 인장 글로우 */}
            <motion.div
              className="absolute -inset-4 rounded-full bg-[#8b3a3a]/20 blur-lg"
              animate={{
                scale: isPressed ? [1, 1.3, 1] : 1,
                opacity: isPressed ? [0.2, 0.4, 0.2] : 0.2,
              }}
              transition={{ duration: 0.5, repeat: isPressed ? Infinity : 0 }}
            />

            {/* 인장 본체 */}
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#8b3a3a] to-[#6b2a2a] shadow-lg">
              {/* 문양 */}
              <svg className="h-8 w-8 text-[#c9a961]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>

              {/* 진행도 링 */}
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="30"
                  fill="none"
                  stroke="#c9a961"
                  strokeWidth="2"
                  strokeDasharray={`${progress * 1.88} 188`}
                  opacity="0.8"
                />
              </svg>
            </div>

            {/* 누르기 힌트 */}
            {!isPressed && progress === 0 && !isOpened && (
              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="text-[10px] tracking-wider text-[#a0a0a0]">HOLD</span>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* 그림자 */}
        <div className="absolute -bottom-6 left-1/2 h-6 w-80 -translate-x-1/2 rounded-full bg-[#d4c5a9]/15 blur-xl" />
      </div>

      {/* === 진행도 === */}
      <motion.div
        className="relative z-10 mt-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpened ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-3 h-[2px] w-44 overflow-hidden rounded-full bg-[#e8e2d9]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#8b3a3a] to-[#c9a961]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <p className="text-[10px] tracking-[0.2em] text-[#b0b0b0]">
          {progress < 100 ? "HOLD TO OPEN" : "OPENING"}
        </p>
      </motion.div>

      {/* === 전환 오버레이 === */}
      <AnimatePresence>
        {showTransition && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#faf9f6]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 방사형 빛 */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 h-[250px] w-px origin-bottom bg-gradient-to-t from-[#c9a961]/20 to-transparent"
                style={{
                  rotate: `${i * 45}deg`,
                  translateX: "-50%",
                  translateY: "-100%",
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
              />
            ))}

            <motion.div
              className="relative text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* 편지 아이콘 */}
              <svg className="mx-auto mb-4 h-12 w-12 text-[#c9a961]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              <div className="mb-3 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-[#c9a961]/50" />
                <div className="h-1.5 w-1.5 rotate-45 border border-[#c9a961]/60" />
                <div className="h-px w-8 bg-[#c9a961]/50" />
              </div>
              <p className="text-base font-light tracking-[0.3em] text-[#8b7355]">
                FOR YOU
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
