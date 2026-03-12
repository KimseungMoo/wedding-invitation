"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { useDrag } from "@/hooks";

/**
 * 리본 풀기 인트로 애니메이션
 * 우아한 화이트 톤 디자인
 */
export const RibbonUnwind = () => {
  const router = useRouter();
  const [showTransition, setShowTransition] = useState(false);

  const handleComplete = useCallback(() => {
    setTimeout(() => {
      setShowTransition(true);
      setTimeout(() => {
        router.push("/invitation");
      }, 1000);
    }, 500);
  }, [router]);

  const { progress, isDragging, handlers } = useDrag({
    direction: "vertical",
    threshold: 200,
    onComplete: handleComplete,
  });

  const ribbonOffset = progress * 2;
  const bowScale = Math.max(0, 1 - progress / 70);
  const boxLidRotate = Math.min(progress * 1.2, 90);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#faf9f6] pt-safe">
      {/* === 배경 === */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5efe8] via-[#faf9f6] to-[#f8f5f0]" />

        {/* 중앙 글로우 */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8d4c4]/20 blur-[100px]"
          animate={{
            scale: isDragging ? [1, 1.1, 1] : 1,
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* 미세한 파티클 */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[#d4c5a9]/25"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.4, 0],
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
        className="relative z-10 mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: progress > 40 ? 0 : 1, y: 0 }}
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
          선물을 열어보세요
        </h1>
        <p className="text-sm tracking-wider text-[#a0a0a0]">
          리본을 아래로 당기세요
        </p>
      </motion.div>

      {/* === 선물 상자 + 리본 === */}
      <div className="relative z-10">
        {/* 선물 상자 */}
        <div className="relative h-[260px] w-[220px]">
          {/* 상자 본체 */}
          <div className="absolute bottom-0 h-[160px] w-full overflow-hidden rounded-sm border border-[#d4c5a9]/40 bg-gradient-to-b from-[#f8f5f0] to-[#f0ebe0] shadow-[0_8px_30px_rgba(180,160,130,0.15)]">
            {/* 상자 장식 - 세로 리본 자국 */}
            <div className="absolute left-1/2 top-0 h-full w-7 -translate-x-1/2 border-x border-[#d4c5a9]/25 bg-gradient-to-b from-[#e8d4c4]/20 to-transparent" />
            {/* 가로 리본 자국 */}
            <div className="absolute left-0 top-1/2 h-7 w-full -translate-y-1/2 border-y border-[#d4c5a9]/25 bg-gradient-to-r from-transparent via-[#e8d4c4]/20 to-transparent" />
          </div>

          {/* 상자 뚜껑 */}
          <motion.div
            className="absolute bottom-[150px] left-1/2 h-[36px] w-[240px] origin-bottom -translate-x-1/2"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateX: -boxLidRotate }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-full w-full rounded-t-sm border border-[#d4c5a9]/40 border-b-transparent bg-gradient-to-b from-[#f8f5f0] to-[#f0ebe0]">
              {/* 뚜껑 장식 */}
              <div className="absolute left-1/2 top-0 h-full w-7 -translate-x-1/2 border-x border-[#d4c5a9]/25 bg-[#e8d4c4]/15" />
            </div>
          </motion.div>

          {/* 상자 내용물 */}
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: progress > 50 ? 1 : 0,
              y: progress > 50 ? 0 : 20,
            }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-2 flex items-center justify-center gap-2">
              <div className="h-px w-5 bg-[#c9a961]/40" />
              <div className="h-1 w-1 rotate-45 border border-[#c9a961]/50" />
              <div className="h-px w-5 bg-[#c9a961]/40" />
            </div>
            <p className="text-xs font-light tracking-[0.2em] text-[#8b7355]">
              INVITATION
            </p>
          </motion.div>
        </div>

        {/* === 리본 === */}
        <div
          className="absolute -top-6 left-1/2 -translate-x-1/2 cursor-grab select-none active:cursor-grabbing"
          {...handlers}
          role="slider"
          aria-label="리본을 아래로 드래그하세요"
          aria-valuenow={Math.round(progress)}
          tabIndex={0}
        >
          {/* 리본 활 */}
          <motion.div
            className="relative"
            animate={{ scale: bowScale, opacity: bowScale }}
            transition={{ duration: 0.15 }}
          >
            {/* 왼쪽 날개 */}
            <motion.div
              className="absolute -left-7 top-1 h-9 w-9 origin-right rotate-[-25deg]"
              style={{
                background: "linear-gradient(135deg, #d4a5a5 0%, #c9a08a 100%)",
                borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              }}
            />
            {/* 오른쪽 날개 */}
            <motion.div
              className="absolute -right-7 top-1 h-9 w-9 origin-left rotate-[25deg]"
              style={{
                background: "linear-gradient(-135deg, #d4a5a5 0%, #c9a08a 100%)",
                borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              }}
            />
            {/* 왼쪽 꼬리 */}
            <div
              className="absolute -left-5 top-5 h-12 w-4 origin-top rotate-[-15deg] bg-gradient-to-b from-[#d4a5a5] to-[#c9a08a]"
              style={{ clipPath: "polygon(20% 0, 80% 0, 60% 100%, 40% 100%)" }}
            />
            {/* 오른쪽 꼬리 */}
            <div
              className="absolute -right-5 top-5 h-12 w-4 origin-top rotate-[15deg] bg-gradient-to-b from-[#d4a5a5] to-[#c9a08a]"
              style={{ clipPath: "polygon(20% 0, 80% 0, 60% 100%, 40% 100%)" }}
            />
            {/* 중앙 매듭 */}
            <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#d4a5a5] to-[#c9a08a] shadow-md">
              <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
            </div>
          </motion.div>

          {/* 드래그 가능한 리본 끝 */}
          <motion.div
            className="relative mt-1 flex justify-center"
            style={{ transform: `translateY(${ribbonOffset}px)` }}
          >
            <svg width="56" height="90" viewBox="0 0 60 100">
              <defs>
                <linearGradient id="ribbonPink" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c9a08a" />
                  <stop offset="50%" stopColor="#d4a5a5" />
                  <stop offset="100%" stopColor="#c9a08a" />
                </linearGradient>
              </defs>
              {/* 왼쪽 리본 */}
              <path
                d={`M 20 0 Q 8 ${30 + progress * 0.2} 18 ${60 + progress * 0.15} L 15 100 L 22 ${70 + progress * 0.15} Q 12 ${40 + progress * 0.2} 25 0`}
                fill="url(#ribbonPink)"
              />
              {/* 오른쪽 리본 */}
              <path
                d={`M 40 0 Q 52 ${30 + progress * 0.2} 42 ${60 + progress * 0.15} L 45 100 L 38 ${70 + progress * 0.15} Q 48 ${40 + progress * 0.2} 35 0`}
                fill="url(#ribbonPink)"
              />
            </svg>
          </motion.div>

          {/* 드래그 힌트 */}
          {!isDragging && progress < 10 && (
            <motion.div
              className="absolute -bottom-5 left-1/2 -translate-x-1/2"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a08d6e" strokeWidth="1.5" opacity="0.6">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          )}
        </div>
      </div>

      {/* === 진행도 === */}
      <motion.div
        className="relative z-10 mt-10 text-center"
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
          {progress < 100 ? "DRAG DOWN" : "UNWRAPPED"}
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
                className="absolute left-1/2 top-1/2 h-[250px] w-px origin-bottom bg-gradient-to-t from-[#d4c5a9]/25 to-transparent"
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
              <div className="mb-4 flex items-center justify-center gap-3">
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
