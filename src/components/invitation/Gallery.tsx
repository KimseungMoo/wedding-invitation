"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

interface GalleryProps {
  images?: string[];
}

/**
 * 갤러리 섹션
 * 우아한 화이트 톤 디자인
 */
export const Gallery = ({ images }: GalleryProps) => {
  // 플레이스홀더 이미지
  const placeholderImages = [
    { id: 1, label: "First Meeting" },
    { id: 2, label: "Spring Date" },
    { id: 3, label: "Summer Trip" },
    { id: 4, label: "Winter Memory" },
    { id: 5, label: "Proposal" },
    { id: 6, label: "Wedding Photo" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? placeholderImages.length - 1 : prev - 1
    );
  }, [placeholderImages.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === placeholderImages.length - 1 ? 0 : prev + 1
    );
  }, [placeholderImages.length]);

  const handleImageClick = useCallback((index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
  }, []);

  const handleModalPrev = useCallback(() => {
    setModalIndex((prev) =>
      prev === 0 ? placeholderImages.length - 1 : prev - 1
    );
  }, [placeholderImages.length]);

  const handleModalNext = useCallback(() => {
    setModalIndex((prev) =>
      prev === placeholderImages.length - 1 ? 0 : prev + 1
    );
  }, [placeholderImages.length]);

  return (
    <section className="bg-[#f8f5f0] px-6 py-20">
      <div className="mx-auto max-w-md">
        {/* === 섹션 제목 === */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 text-[10px] tracking-[0.3em] text-[#a08d6e]">GALLERY</p>
          <div className="mx-auto flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4c5a9]/50" />
            <div className="h-1 w-1 rotate-45 border border-[#c9a961]/50" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4c5a9]/50" />
          </div>
        </motion.div>

        {/* === 메인 캐러셀 === */}
        <motion.div
          className="relative mb-6 overflow-hidden rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* 이미지 컨테이너 */}
          <div
            className="flex cursor-pointer transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {placeholderImages.map((img, index) => (
              <div
                key={img.id}
                className="aspect-[4/3] w-full flex-shrink-0"
                onClick={() => handleImageClick(index)}
              >
                <div className="flex h-full w-full flex-col items-center justify-center border border-[#e8e2d9] bg-gradient-to-br from-white to-[#f5f0e8]">
                  <svg className="mb-3 h-12 w-12 text-[#d4c5a9]/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span className="text-xs tracking-wider text-[#a0a0a0]">{img.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 좌우 버튼 */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4c5a9]/30 bg-white/90 shadow-sm transition-all hover:bg-white"
            aria-label="이전 사진"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b7355" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4c5a9]/30 bg-white/90 shadow-sm transition-all hover:bg-white"
            aria-label="다음 사진"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b7355" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </motion.div>

        {/* === 인디케이터 === */}
        <div className="flex justify-center gap-1.5">
          {placeholderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex
                  ? "w-5 bg-[#c9a961]"
                  : "w-1.5 bg-[#d4c5a9]/40"
              }`}
              aria-label={`${index + 1}번째 사진으로 이동`}
            />
          ))}
        </div>

        {/* === 썸네일 그리드 === */}
        <motion.div
          className="mt-6 grid grid-cols-3 gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {placeholderImages.map((img, index) => (
            <button
              key={img.id}
              onClick={() => {
                setCurrentIndex(index);
                handleImageClick(index);
              }}
              className={`aspect-square overflow-hidden rounded-md border transition-all ${
                index === currentIndex
                  ? "border-[#c9a961] shadow-sm"
                  : "border-[#e8e2d9] opacity-70 hover:opacity-100"
              }`}
            >
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white to-[#f5f0e8]">
                <svg className="h-6 w-6 text-[#d4c5a9]/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
            </button>
          ))}
        </motion.div>
      </div>

      {/* === 모달 === */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            {/* 닫기 버튼 */}
            <button
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:text-white"
              onClick={() => setIsModalOpen(false)}
              aria-label="닫기"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* 이미지 */}
            <motion.div
              className="aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-lg border border-[#d4c5a9]/20 bg-gradient-to-br from-[#faf9f6] to-[#f0ebe0]"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-full w-full flex-col items-center justify-center">
                <svg className="mb-4 h-16 w-16 text-[#d4c5a9]/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span className="text-sm tracking-wider text-[#8b8b8b]">
                  {placeholderImages[modalIndex].label}
                </span>
              </div>
            </motion.div>

            {/* 좌우 버튼 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleModalPrev();
              }}
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:text-white"
              aria-label="이전 사진"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleModalNext();
              }}
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:text-white"
              aria-label="다음 사진"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
