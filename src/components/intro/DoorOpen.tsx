"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";

/**
 * 문 열기 인트로 애니메이션
 * 우아한 화이트 톤 디자인
 */
export const DoorOpen = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const handleDoorClick = useCallback(() => {
    if (isOpen) return;
    setIsOpen(true);

    setTimeout(() => {
      setShowTransition(true);
      setTimeout(() => {
        router.push("/invitation");
      }, 1000);
    }, 1800);
  }, [isOpen, router]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#faf9f6]">
      {/* === 배경 === */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5efe8] via-[#faf9f6] to-[#f8f5f0]" />

        {/* 중앙 글로우 */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[500px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4c5a9]/15 blur-[100px]"
          animate={{
            opacity: isOpen ? [0.15, 0.3] : 0.15,
            scale: isOpen ? [1, 1.2] : 1,
          }}
          transition={{ duration: 1.5 }}
        />

        {/* 빛줄기 (문 열릴 때) */}
        <AnimatePresence>
          {isOpen && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 h-[500px] w-px origin-center bg-gradient-to-t from-transparent via-[#d4c5a9]/15 to-transparent"
                  style={{ rotate: `${i * 22.5}deg` }}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 1.2, delay: 0.5 + i * 0.08 }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* === 안내 문구 === */}
      <motion.div
        className="absolute top-24 z-10 pt-safe text-center sm:top-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isOpen ? 0 : 1, y: 0 }}
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
          새로운 시작
        </h1>
        <p className="text-sm tracking-wider text-[#a0a0a0]">
          문을 터치하세요
        </p>
      </motion.div>

      {/* === 문 === */}
      <div
        className="relative z-10 cursor-pointer select-none"
        style={{ perspective: "1200px" }}
        onClick={handleDoorClick}
        role="button"
        aria-label="문을 열어주세요"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleDoorClick();
        }}
      >
        {/* 문 프레임 */}
        <div className="relative h-[380px] w-[240px]">
          {/* 외곽 프레임 */}
          <div className="absolute -inset-2 rounded-t-[130px] border border-[#d4c5a9]/30 bg-gradient-to-b from-[#f0ebe0]/50 to-transparent" />

          {/* 문 컨테이너 */}
          <div className="relative h-full w-full overflow-hidden rounded-t-[120px] border border-[#d4c5a9]/40 bg-gradient-to-b from-[#f5f0e8] to-[#ebe4d8] shadow-[0_10px_40px_rgba(180,160,130,0.15)]">
            {/* === 왼쪽 문 === */}
            <motion.div
              className="absolute left-0 top-0 h-full w-1/2 origin-left border-r border-[#d4c5a9]/20"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: isOpen ? -105 : 0 }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="absolute inset-0 overflow-hidden rounded-tl-[116px] bg-gradient-to-br from-[#f8f5f0] via-[#f0ebe0] to-[#e8e2d6]">
                {/* 문 패널 장식 */}
                <div className="absolute left-1/2 top-14 h-20 w-px -translate-x-1/2 bg-gradient-to-b from-[#d4c5a9]/30 to-transparent" />
                <div className="absolute left-1/2 top-20 h-10 w-10 -translate-x-1/2 rounded-full border border-[#d4c5a9]/25" />
                <div className="absolute left-1/2 bottom-20 h-28 w-px -translate-x-1/2 bg-gradient-to-t from-[#d4c5a9]/30 to-transparent" />

                {/* 손잡이 */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="h-10 w-1 rounded-full bg-gradient-to-b from-[#c9a961] to-[#a08d6e]" />
                </div>

                {/* 빛 반사 */}
                <div className="absolute left-2 top-16 h-32 w-3 rotate-6 bg-gradient-to-b from-white/30 to-transparent" />
              </div>
            </motion.div>

            {/* === 오른쪽 문 === */}
            <motion.div
              className="absolute right-0 top-0 h-full w-1/2 origin-right border-l border-[#d4c5a9]/20"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: isOpen ? 105 : 0 }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="absolute inset-0 overflow-hidden rounded-tr-[116px] bg-gradient-to-bl from-[#f8f5f0] via-[#f0ebe0] to-[#e8e2d6]">
                {/* 문 패널 장식 */}
                <div className="absolute left-1/2 top-14 h-20 w-px -translate-x-1/2 bg-gradient-to-b from-[#d4c5a9]/30 to-transparent" />
                <div className="absolute left-1/2 top-20 h-10 w-10 -translate-x-1/2 rounded-full border border-[#d4c5a9]/25" />
                <div className="absolute left-1/2 bottom-20 h-28 w-px -translate-x-1/2 bg-gradient-to-t from-[#d4c5a9]/30 to-transparent" />

                {/* 손잡이 */}
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <div className="h-10 w-1 rounded-full bg-gradient-to-b from-[#c9a961] to-[#a08d6e]" />
                </div>

                {/* 빛 반사 */}
                <div className="absolute right-2 top-16 h-32 w-3 -rotate-6 bg-gradient-to-b from-white/30 to-transparent" />
              </div>
            </motion.div>

            {/* === 문 안쪽 === */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center rounded-t-[116px] bg-gradient-to-b from-white to-[#faf9f6]"
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/60" />

              <motion.div
                className="relative text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: isOpen ? 1 : 0.9, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <div className="mb-5 flex items-center justify-center gap-3">
                  <div className="h-px w-6 bg-[#c9a961]/50" />
                  <div className="h-1.5 w-1.5 rotate-45 border border-[#c9a961]/60" />
                  <div className="h-px w-6 bg-[#c9a961]/50" />
                </div>
                <p className="text-lg font-light tracking-[0.3em] text-[#5a5a5a]">
                  WELCOME
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* 바닥 그림자 */}
          <div className="absolute -bottom-6 left-1/2 h-6 w-56 -translate-x-1/2 rounded-full bg-[#d4c5a9]/20 blur-xl" />
        </div>
      </div>

      {/* === 하단 힌트 === */}
      <motion.div
        className="absolute bottom-16 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#a08d6e]/50">
            <path d="M8 3v4l-4 4 4 4v4M16 3v4l4 4-4 4v4" />
          </svg>
          <span className="text-[10px] tracking-[0.2em] text-[#b0b0b0]">TAP TO OPEN</span>
        </motion.div>
      </motion.div>

      {/* === 전환 오버레이 === */}
      <AnimatePresence>
        {showTransition && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#faf9f6]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
