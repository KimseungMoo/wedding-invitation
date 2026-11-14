"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import {
  MainVisual,
  Greeting,
  WeddingDate,
  Gallery,
  Location,
  Account,
} from "@/components/invitation";

const GALLERY_IMAGES = [
  "/gallery/01-kakao-006.jpg",
  "/gallery/02-kakao-001.jpg",
  "/gallery/03-kakao-002.jpg",
  "/gallery/04-kakao-003.jpg",
  "/gallery/05-kakao-004.jpg",
  "/gallery/06-kakao-005.jpg",
  "/gallery/07-kakao-007.jpg",
  "/gallery/08-kakao-008.jpg",
  "/gallery/09-kakao-009.jpg",
  "/gallery/10-kakao-011.jpg",
  "/gallery/11-kakao-012.jpg",
  "/gallery/12-kakao-013-v2.jpg",
  "/gallery/13-kakao-014-v2.jpg",
  "/gallery/14-num-11.jpg",
  "/gallery/15-num-15.jpg",
  "/gallery/16-num-16.jpg",
  "/gallery/17-num-17.jpg",
  "/gallery/18-num-18.jpg",
  "/gallery/19-num-25.jpg",
  "/gallery/20-num-03.jpg",
  "/gallery/21-num-05.jpg",
  "/gallery/22-num-06.jpg",
];

/**
 * 청첩장 메인 페이지
 * 종이 청첩장 표지 및 내지 디자인·정보를 모바일에 최적화하여 구성
 */
export default function InvitationPage() {
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const preventMultiTouch = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    const preventGesture = (e: Event) => {
      e.preventDefault();
    };
    const preventCaptureKeys = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (
        e.key === "PrintScreen" ||
        ((e.metaKey || e.ctrlKey) && (key === "p" || key === "s")) ||
        (e.metaKey && e.shiftKey && ["3", "4", "5", "s"].includes(key))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchstart", preventMultiTouch, { passive: false });
    document.addEventListener("touchmove", preventMultiTouch, { passive: false });
    document.addEventListener("gesturestart", preventGesture);
    document.addEventListener("gesturechange", preventGesture);
    window.addEventListener("keydown", preventCaptureKeys);

    return () => {
      document.removeEventListener("touchstart", preventMultiTouch);
      document.removeEventListener("touchmove", preventMultiTouch);
      document.removeEventListener("gesturestart", preventGesture);
      document.removeEventListener("gesturechange", preventGesture);
      window.removeEventListener("keydown", preventCaptureKeys);
    };
  }, []);

  const handleShareLink = useCallback(async () => {
    const shareUrl = window.location.origin;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "김승무 ♥ 성은지 결혼식에 초대합니다",
          text: "2027년 2월 21일 (일) 오전 11시 30분 · 더 채플 앳 청담 채플홀 (6층)",
          url: shareUrl,
        });
        return;
      } catch {
        // 공유 취소 시 링크 복사로 대체하지 않고 종료
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      setCopiedLink(false);
    }
  }, []);

  return (
    <main
      className="overflow-x-hidden select-none"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* 표지: SAVE THE DATE & 더 채플 앳 청담 일러스트 */}
      <MainVisual
        groomEnglishName="KIM SEUNG MOO"
        brideEnglishName="SEONG EUN JI"
        dateLabel="2027. 2. 21. (일)"
        timeLabel="오전 11시 30분"
        venueLabel="더 채플 앳 청담 채플홀 (6층)"
      />

      {/* 초대의 글 & 혼주 소개 & 일시/장소 요약 */}
      <Greeting
        greeting={`서로의 내일이란 단어에\n항상 '우리'가 있기를 바라며\n새로운 시작을 합니다.\n저희의 시작을 함께 축복해 주시면\n감사하겠습니다.`}
        groomFather="김종렬"
        groomMother="김숙희"
        groomName="김승무"
        brideFather="성낙인"
        brideMother="김보예"
        brideName="성은지"
        dateText="2027년 2월 21일 (일) 오전 11시 30분"
        venueText="더 채플 앳 청담 채플홀 (6층)"
        addressText="서울특별시 강남구 선릉로 757 (논현동 94-9)"
      />

      {/* 예식 일시 & 캘린더 */}
      <WeddingDate
        date="2027년 2월 21일 (일)"
        time="오전 11시 30분"
        venue="더 채플 앳 청담 채플홀 (6층)"
        address="서울특별시 강남구 선릉로 757 (논현동 94-9)"
      />

      {/* 갤러리 */}
      <Gallery images={GALLERY_IMAGES} />

      {/* 오시는 길 */}
      <Location
        venue="더 채플 앳 청담 채플홀 (6층)"
        address="서울특별시 강남구 선릉로 757 (논현동 94-9)"
        copyAddress="서울특별시 강남구 선릉로 757"
        tel="02-421-1121"
      />

      {/* 축의금 계좌 */}
      <Account />

      {/* 푸터 */}
      <footer className="bg-[#faf7f2] px-6 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-md text-center"
        >
          {/* 청첩장 공유하기 버튼 */}
          <div className="mb-10">
            <button
              type="button"
              onClick={handleShareLink}
              className="inline-flex items-center gap-2 rounded-full border border-[#d6c7b4] bg-white px-5 py-2.5 text-xs font-light text-[#5c4a3a] shadow-sm transition-colors hover:border-[#b89f7d] hover:bg-[#f6f1ea]"
            >
              <svg
                className="h-3.5 w-3.5 text-[#8b7355]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
              </svg>
              {copiedLink ? "청첩장 링크가 복사되었습니다" : "청첩장 공유하기"}
            </button>
          </div>

          {/* 장식 */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#cbbba5]" />
            <div className="h-1.5 w-1.5 rotate-45 border border-[#8b7355]/60" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#cbbba5]" />
          </div>

          {/* 이름 */}
          <p className="mb-1.5 text-base font-light tracking-wide text-[#4a3728]">
            김승무 &amp; 성은지
          </p>
          <p className="text-xs font-light text-[#7a6856]">
            2027년 2월 21일 (일) 오전 11시 30분 · 더 채플 앳 청담
          </p>

          {/* 저작권 */}
          <p className="mt-8 font-display text-[11px] tracking-[0.2em] text-[#b4a493]">
            KIM SEUNG MOO &amp; SEONG EUN JI
          </p>
        </motion.div>
      </footer>
    </main>
  );
}
