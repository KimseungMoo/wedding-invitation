"use client";

import { motion } from "framer-motion";
import { useCallback } from "react";


interface LocationProps {
  venue?: string;
  address?: string;
  tel?: string;
  parking?: string;
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
}: LocationProps) => {
  const encodedAddress = encodeURIComponent(address);
  const kakaoMapUrl = `https://map.kakao.com/link/search/${encodedAddress}`;
  const naverMapUrl = `https://map.naver.com/v5/search/${encodedAddress}`;
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

        {/* === 약도 === */}
        <motion.div
          className="mb-8 overflow-hidden rounded-lg border border-[#e8e2d9] bg-[#f7f3ec] px-4 py-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <p className="mb-1 text-center font-serif text-sm italic text-[#a08d6e]">
            Detail
          </p>
          <p className="mb-5 text-center text-[11px] leading-relaxed text-[#8b8b8b]">
            강남구 선릉로 757,<br />
            더채플앳청담
          </p>

          <svg
            viewBox="0 0 350 260"
            className="mx-auto w-full max-w-[320px]"
            role="img"
            aria-label="더채플앳청담 약도"
          >
            {/* === 보조 도로 === */}
            <line x1="90" y1="8" x2="90" y2="252" stroke="#ebe4d8" strokeWidth="1.2" />
            <line x1="278" y1="8" x2="278" y2="252" stroke="#ebe4d8" strokeWidth="1.2" />
            <line x1="8" y1="78" x2="342" y2="78" stroke="#ebe4d8" strokeWidth="1.2" />

            {/* === 주도로: 선릉로 (수직) === */}
            <line x1="188" y1="8" x2="188" y2="252" stroke="#d4c5a9" strokeWidth="2.5" />
            {/* === 주도로: 학동로 (수평) === */}
            <line x1="8" y1="158" x2="342" y2="158" stroke="#d4c5a9" strokeWidth="2.5" />

            {/* === 도로명 라벨 === */}
            <text x="196" y="28" fontSize="8" fill="#a08d6e">선릉로</text>
            <text x="295" y="151" fontSize="8" fill="#a08d6e">학동로</text>

            {/* === 더채플앳청담 (메인 장소) === */}
            <rect x="140" y="96" width="96" height="34" rx="4" fill="#8b7355" />
            <text
              x="188"
              y="117"
              fontSize="10.5"
              fill="#fff"
              textAnchor="middle"
              fontWeight="500"
            >
              더채플앳청담
            </text>

            {/* === 셔틀 경로 (점선) === */}
            <polyline
              points="68,158 140,158 140,113"
              fill="none"
              stroke="#a08d6e"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
            <text x="105" y="150" fontSize="6.5" fill="#a08d6e" textAnchor="middle">
              셔틀버스
            </text>

            {/* === ⑦ 강남구청역 3번 출구 === */}
            <circle cx="48" cy="158" r="10" fill="#fff" stroke="#6B8E23" strokeWidth="1.8" />
            <text
              x="48"
              y="162"
              fontSize="9.5"
              fill="#6B8E23"
              textAnchor="middle"
              fontWeight="bold"
            >
              7
            </text>
            <text x="48" y="178" fontSize="7.5" fill="#6b6b6b" textAnchor="middle">
              강남구청역
            </text>
            <text x="48" y="188" fontSize="6.5" fill="#8b8b8b" textAnchor="middle">
              3번 출구
            </text>

            {/* === 주변 건물 (찾기 쉬운 건물 위주) === */}
            {/* 강남구청 */}
            <circle cx="82" cy="58" r="2.5" fill="#c9a961" />
            <text x="90" y="61" fontSize="7.5" fill="#8b8b8b">
              강남구청
            </text>

            {/* 학동사거리 */}
            <text x="206" y="172" fontSize="7" fill="#a08d6e">
              학동사거리
            </text>

            {/* CGV 청담씨네시티 */}
            <circle cx="270" cy="192" r="2.5" fill="#c9a961" />
            <text x="278" y="195" fontSize="7.5" fill="#8b8b8b">
              CGV
            </text>

            {/* LG 베스트샵 */}
            <circle cx="118" cy="195" r="2.5" fill="#c9a961" />
            <text x="100" y="210" fontSize="7.5" fill="#8b8b8b">
              LG베스트샵
            </text>
          </svg>

          {/* 안내 문구 */}
          <div className="mt-4 space-y-0.5 text-center">
            <p className="text-[10px] text-[#a08d6e]">
              *강남구청역 3번 출구 앞 셔틀버스를 이용하십시오.
            </p>
            <p className="text-[10px] text-[#a08d6e]">
              *축하 화환은 정중히 사양합니다.
            </p>
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
              간선: 301, 351, 472<br />
              지선: 4212, 4412
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
