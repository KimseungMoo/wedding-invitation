"use client";

import { motion } from "framer-motion";
import { useCallback } from "react";

interface LocationProps {
  venue?: string;
  address?: string;
  tel?: string;
  parking?: string;
  kakaoMapUrl?: string;
  naverMapUrl?: string;
  tMapUrl?: string;
}

/**
 * 오시는 길 섹션
 * 우아한 화이트 톤 디자인
 */
export const Location = ({
  venue = "채플홀",
  address = "서울특별시 강남구 선릉로 757",
  tel = "02-421-1121",
  parking = "1시간 30분 무료",
  kakaoMapUrl = "https://map.kakao.com",
  naverMapUrl = "https://map.naver.com"
}: LocationProps) => {
  const handleCopyAddress = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(address);
      alert("주소가 복사되었습니다.");
    } catch {
      alert("주소 복사에 실패했습니다.");
    }
  }, [address]);

  const handleCall = useCallback(() => {
    window.location.href = `tel:${tel.replace(/-/g, "")}`;
  }, [tel]);

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-md">
        {/* === 섹션 제목 === */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 text-[10px] tracking-[0.3em] text-[#a08d6e]">LOCATION</p>
          <div className="mx-auto flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4c5a9]/50" />
            <div className="h-1 w-1 rotate-45 border border-[#c9a961]/50" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4c5a9]/50" />
          </div>
        </motion.div>

        {/* === 지도 플레이스홀더 === */}
        <motion.div
          className="mb-8 overflow-hidden rounded-lg border border-[#e8e2d9] bg-gradient-to-br from-[#f5f0e8] to-[#ebe4d8]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex aspect-video flex-col items-center justify-center">
            <svg className="mb-3 h-10 w-10 text-[#c9a961]/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p className="text-xs tracking-wider text-[#a0a0a0]">MAP</p>
          </div>
        </motion.div>

        {/* === 장소 정보 === */}
        <motion.div
          className="mb-8 rounded-lg border border-[#e8e2d9] bg-[#faf9f6] p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="mb-4 text-center text-base font-light text-[#4a4a4a]">
            {venue}
          </h3>

          {/* 주소 */}
          <div className="mb-4 flex items-start gap-3">
            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#c9a961]/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div className="flex-1">
              <p className="text-sm text-[#6b6b6b]">{address}</p>
              <button
                onClick={handleCopyAddress}
                className="mt-1.5 text-xs text-[#a08d6e] underline underline-offset-2 transition-colors hover:text-[#8b7355]"
              >
                주소 복사
              </button>
            </div>
          </div>

          {/* 전화번호 */}
          <div className="mb-4 flex items-center gap-3">
            <svg className="h-4 w-4 flex-shrink-0 text-[#c9a961]/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            <button
              onClick={handleCall}
              className="text-sm text-[#6b6b6b] underline underline-offset-2 transition-colors hover:text-[#4a4a4a]"
            >
              {tel}
            </button>
          </div>

          {/* 주차 정보 */}
          <div className="flex items-start gap-3">
            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#c9a961]/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="1" y="3" width="15" height="13" rx="2" ry="2" />
              <path d="M16 8h4a2 2 0 012 2v7a2 2 0 01-2 2H6" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <p className="text-sm text-[#6b6b6b]">{parking}</p>
          </div>
        </motion.div>

        {/* === 네비게이션 버튼 === */}
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href={kakaoMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 rounded-lg border border-[#e8e2d9] bg-[#faf9f6] py-4 transition-all hover:border-[#d4c5a9] hover:shadow-sm"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FEE500]">
              <span className="text-xs font-bold text-[#3C1E1E]">K</span>
            </div>
            <span className="text-[11px] text-[#6b6b6b]">카카오맵</span>
          </a>

          <a
            href={naverMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 rounded-lg border border-[#e8e2d9] bg-[#faf9f6] py-4 transition-all hover:border-[#d4c5a9] hover:shadow-sm"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2DB400]">
              <span className="text-xs font-bold text-white">N</span>
            </div>
            <span className="text-[11px] text-[#6b6b6b]">네이버지도</span>
          </a>
        </motion.div>

        {/* === 교통 안내 === */}
        <motion.div
          className="mt-8 rounded-lg border border-[#e8e2d9] bg-[#faf9f6] p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="mb-5">
            <div className="mb-2 flex items-center gap-2">
              <svg className="h-4 w-4 text-[#c9a961]/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="4" y="3" width="16" height="18" rx="2" ry="2" />
                <line x1="12" y1="8" x2="12" y2="21" />
                <line x1="4" y1="13" x2="20" y2="13" />
              </svg>
              <span className="text-sm font-light text-[#4a4a4a]">지하철</span>
            </div>
            <p className="pl-6 text-sm text-[#8b8b8b]">
              강남구청역 3번 출구 앞 셔틀버스 운행
            </p>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <svg className="h-4 w-4 text-[#c9a961]/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 17H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-1" />
                <circle cx="7.5" cy="17.5" r="2.5" />
                <circle cx="16.5" cy="17.5" r="2.5" />
                <path d="M10 17h4" />
              </svg>
              <span className="text-sm font-light text-[#4a4a4a]">버스</span>
            </div>
            <p className="pl-6 text-sm text-[#8b8b8b]">
              간선: <br />
              지선: 
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
