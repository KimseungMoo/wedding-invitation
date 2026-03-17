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

        {/* === 약도 === */}
        <motion.div
          className="mb-8 overflow-hidden rounded-lg border border-[#e8e2d9] bg-[#f7f3ec] px-4 py-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <svg
            viewBox="0 0 340 310"
            className="mx-auto w-full max-w-[320px]"
            role="img"
            aria-label="더채플앳청담 약도"
          >
            {/* === 보조 도로 === */}
            <line x1="85" y1="5" x2="85" y2="300" stroke="#ebe4d8" strokeWidth="1.2" />
            <line x1="285" y1="5" x2="285" y2="300" stroke="#ebe4d8" strokeWidth="1.2" />
            <line x1="5" y1="155" x2="335" y2="155" stroke="#ebe4d8" strokeWidth="1.2" />

            {/* === 주도로: 선릉로 (수직, 중앙~우측) === */}
            <line x1="195" y1="5" x2="195" y2="300" stroke="#d4c5a9" strokeWidth="2.5" />
            {/* === 주도로: 도산대로 (수평, 상단) === */}
            <line x1="5" y1="80" x2="335" y2="80" stroke="#d4c5a9" strokeWidth="2.5" />

            {/* === 도로명 라벨 === */}
            <text x="203" y="25" fontSize="8" fill="#a08d6e">선릉로</text>
            <text x="260" y="73" fontSize="8" fill="#a08d6e">도산대로</text>

            {/* === 예식장 정확한 위치 (이중원 마커) === */}
            <circle cx="85" cy="155" r="6" fill="none" stroke="#8b7355" strokeWidth="1.5" />
            <circle cx="85" cy="155" r="2.5" fill="#8b7355" />

            {/* === 예식장 카드 (마커에서 떨어진 위치, 점선 연결) === */}
            <rect x="18" y="98" width="100" height="34" rx="4" fill="#8b7355" />
            <text
              x="68"
              y="119"
              fontSize="10.5"
              fill="#fff"
              textAnchor="middle"
              fontWeight="500"
            >
              더채플앳청담
            </text>
            {/* 카드 → 이중원 마커 ㄴ자 점선 연결 */}
            <polyline
              points="68,132 68,155 79,155"
              fill="none"
              stroke="#8b7355"
              strokeWidth="0.8"
              strokeDasharray="3 2"
            />

            {/* === ⑦ 강남구청역 3번 출구 (하단 6시 방향) === */}
            <circle cx="195" cy="272" r="11" fill="#fff" stroke="#6B8E23" strokeWidth="1.8" />
            <text
              x="195"
              y="276"
              fontSize="10"
              fill="#6B8E23"
              textAnchor="middle"
              fontWeight="bold"
            >
              7
            </text>
            <text x="195" y="293" fontSize="8" fill="#6b6b6b" textAnchor="middle">
              강남구청역
            </text>
            <text x="195" y="304" fontSize="6.5" fill="#8b8b8b" textAnchor="middle">
              3번 출구
            </text>

            {/* === 주변 건물 (찾기 쉬운 건물 위주) === */}
            {/* 도산공원 (좌상단) */}
            <circle cx="38" cy="45" r="2.5" fill="#c9a961" />
            <text x="46" y="48" fontSize="7.5" fill="#8b8b8b">도산공원</text>

            {/* CGV (좌측, 도산대로 근처) */}
            <circle cx="120" cy="62" r="2.5" fill="#c9a961" />
            <text x="128" y="65" fontSize="7.5" fill="#8b8b8b">CGV</text>

            {/* 학동사거리 (도산대로 × 선릉로 교차점) */}
            <text x="205" y="95" fontSize="7" fill="#a08d6e">학동사거리</text>

            {/* 삼성디지털프라자 (예식장 우측, 선릉로 옆) */}
            <circle cx="215" cy="143" r="2.5" fill="#c9a961" />
            <text x="223" y="146" fontSize="7.5" fill="#8b8b8b">삼성디지털프라자</text>

            {/* 영동중학교 (예식장과 강남구청역 사이) */}
            <circle cx="220" cy="210" r="2.5" fill="#c9a961" />
            <text x="228" y="213" fontSize="7.5" fill="#8b8b8b">영동중학교</text>
          </svg>
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
              간선: 301, 351, 472<br />
              지선: 4212, 4412
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
