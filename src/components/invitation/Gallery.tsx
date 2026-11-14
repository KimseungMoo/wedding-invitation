"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";

interface GalleryProps {
  images?: string[];
}

/**
 * 갤러리 섹션
 * 실제 사진 배열이 전달되면 이미지를 렌더링하고, 미전달 시 플레이스홀더 카드 표시
 */
export const Gallery = ({ images }: GalleryProps) => {
  const placeholderImages = [
    { id: 1, label: "First Meeting" },
    { id: 2, label: "Spring Date" },
    { id: 3, label: "Summer Trip" },
    { id: 4, label: "Winter Memory" },
    { id: 5, label: "Proposal" },
    { id: 6, label: "Wedding Photo" },
  ];

  const hasRealImages = Boolean(images && images.length > 0);
  const totalCount = hasRealImages ? images!.length : placeholderImages.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAllThumbs, setShowAllThumbs] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  // === 자동 넘김 (갤러리 섹션이 화면에 보일 때만 4초 간격 실행) ===
  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    if (totalCount <= 1 || !isInView) return;
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === totalCount - 1 ? 0 : prev + 1));
    }, 4000);
  }, [totalCount, isInView, stopAutoPlay]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isInView, startAutoPlay, stopAutoPlay]);

  /** 사용자 조작 시 자동 넘김 리셋 */
  const handleUserInteraction = useCallback(
    (action: () => void) => {
      stopAutoPlay();
      action();
      startAutoPlay();
    },
    [stopAutoPlay, startAutoPlay]
  );

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalCount - 1 : prev - 1));
  }, [totalCount]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalCount - 1 ? 0 : prev + 1));
  }, [totalCount]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (
    e: React.TouchEvent,
    onPrev: () => void,
    onNext: () => void
  ) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleUserInteraction(onNext);
      else handleUserInteraction(onPrev);
    }
    touchStartX.current = null;
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#f6f1ea] px-6 py-20 select-none"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="mx-auto max-w-md">
        {/* === 섹션 제목 === */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 font-display text-[11px] tracking-[0.34em] text-[#8b7355]">
            GALLERY
          </p>
          <div className="mx-auto flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#cbbba5]" />
            <div className="h-1 w-1 rotate-45 border border-[#8b7355]/60" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#cbbba5]" />
          </div>
        </motion.div>

        {/* === 메인 캐러셀 === */}
        <motion.div
          className="relative mb-5 overflow-hidden rounded-lg border border-[#e2d7c8] bg-white shadow-[0_6px_24px_rgba(92,72,52,0.05)]"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={(e) => handleTouchEnd(e, handlePrev, handleNext)}
        >
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {hasRealImages
              ? images!.map((src, index) => (
                  <div
                    key={src + index}
                    className="relative aspect-[3/4] w-full flex-shrink-0 bg-[#f8f4ee]"
                  >
                    <Image
                      src={src}
                      alt={`웨딩 갤러리 사진 ${index + 1}`}
                      fill
                      sizes="(max-width: 480px) 100vw, 448px"
                      draggable={false}
                      className="object-cover pointer-events-none select-none"
                    />
                    <div className="absolute inset-0 z-10" />
                  </div>
                ))
              : placeholderImages.map((img) => (
                  <div
                    key={img.id}
                    className="aspect-[3/4] w-full flex-shrink-0"
                  >
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#fcfaf7] to-[#f4ede3]">
                      <svg
                        className="mb-3 h-11 w-11 text-[#cbbba5]/70"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                      <span className="font-display text-xs tracking-[0.18em] text-[#9b8976]">
                        {img.label}
                      </span>
                    </div>
                  </div>
                ))}
          </div>

          {/* 좌우 버튼 & 카운터 */}
          {totalCount > 1 && (
            <>
              <div className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-black/40 px-2.5 py-1 font-display text-[11px] tracking-[0.14em] text-white backdrop-blur-xs">
                {currentIndex + 1} / {totalCount}
              </div>
              <button
                type="button"
                onClick={() => handleUserInteraction(handlePrev)}
                className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#d6c7b4]/50 bg-white/90 shadow-sm transition-all hover:bg-white"
                aria-label="이전 사진"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6b5344"
                  strokeWidth="1.5"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleUserInteraction(handleNext)}
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#d6c7b4]/50 bg-white/90 shadow-sm transition-all hover:bg-white"
                aria-label="다음 사진"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6b5344"
                  strokeWidth="1.5"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}
        </motion.div>

        {/* === 인디케이터 === */}
        {totalCount > 1 && (
          <div className="flex flex-wrap justify-center gap-1.5 px-2">
            {Array.from({ length: totalCount }).map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handleUserInteraction(() => setCurrentIndex(index))}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-5 bg-[#8b7355]"
                    : "w-1.5 bg-[#cbbba5]/60"
                }`}
                aria-label={`${index + 1}번째 사진으로 이동`}
              />
            ))}
          </div>
        )}

        {/* === 썸네일 그리드 === */}
        <motion.div
          className="mt-6 grid grid-cols-3 gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {hasRealImages
            ? (showAllThumbs ? images! : images!.slice(0, 9)).map((src, index) => (
                <button
                  type="button"
                  key={src + index}
                  onClick={() => handleUserInteraction(() => setCurrentIndex(index))}
                  className={`relative aspect-square overflow-hidden rounded-md border transition-all ${
                    index === currentIndex
                      ? "border-[#8b7355] shadow-sm"
                      : "border-[#e2d7c8] opacity-75 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`웨딩 썸네일 ${index + 1}`}
                    fill
                    sizes="(max-width: 480px) 33vw, 140px"
                    draggable={false}
                    className="object-cover pointer-events-none select-none"
                  />
                  <div className="absolute inset-0 z-10" />
                </button>
              ))
            : placeholderImages.map((img, index) => (
                <button
                  type="button"
                  key={img.id}
                  onClick={() => handleUserInteraction(() => setCurrentIndex(index))}
                  className={`aspect-square overflow-hidden rounded-md border transition-all ${
                    index === currentIndex
                      ? "border-[#8b7355] shadow-sm"
                      : "border-[#e2d7c8] opacity-75 hover:opacity-100"
                  }`}
                >
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#fcfaf7] to-[#f4ede3]">
                    <svg
                      className="h-6 w-6 text-[#cbbba5]/60"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                </button>
              ))}
        </motion.div>

        {hasRealImages && images!.length > 9 && (
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={() => setShowAllThumbs((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#d6c7b4] bg-white px-5 py-2 text-xs font-light text-[#5c4a3a] shadow-2xs transition-colors hover:bg-[#fcfaf7]"
            >
              <span>
                {showAllThumbs
                  ? "사진 접기"
                  : `사진 더보기 (+${images!.length - 9}장)`}
              </span>
              <svg
                className={`h-3.5 w-3.5 text-[#8b7355] transition-transform ${
                  showAllThumbs ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
