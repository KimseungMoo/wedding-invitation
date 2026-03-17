"use client";

import { motion } from "framer-motion";

/**
 * 약도 컴포넌트
 * 실제 지리 기반 — 북쪽이 위
 */
export const VenueMap = () => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-lg bg-[#f5f0e8] px-5 py-7"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <svg viewBox="0 0 300 300" className="w-full" xmlns="http://www.w3.org/2000/svg">

        {/* === 메인 도로 === */}
        <line x1="150" y1="0" x2="150" y2="300" stroke="#c4b9a8" strokeWidth="1.5" />
        <line x1="0" y1="230" x2="300" y2="230" stroke="#c4b9a8" strokeWidth="1.5" />

        {/* === 골목길 (좌측) === */}
        <line x1="70" y1="80" x2="70" y2="230" stroke="#d8cfc0" strokeWidth="0.8" />
        <line x1="0" y1="120" x2="150" y2="120" stroke="#d8cfc0" strokeWidth="0.8" />
        <line x1="0" y1="175" x2="150" y2="175" stroke="#d8cfc0" strokeWidth="0.8" />

        {/* === 골목길 (우측) === */}
        <line x1="235" y1="50" x2="235" y2="230" stroke="#d8cfc0" strokeWidth="0.8" />
        <line x1="150" y1="100" x2="300" y2="100" stroke="#d8cfc0" strokeWidth="0.8" />
        <line x1="150" y1="170" x2="300" y2="170" stroke="#d8cfc0" strokeWidth="0.8" />

        {/* === 도로명 === */}
        <text x="155" y="24" fontSize="8" fill="#8a7d6e" fontWeight="400" letterSpacing="0.12em">선릉로</text>
        <text x="220" y="245" fontSize="8" fill="#8a7d6e" fontWeight="400" letterSpacing="0.12em">학동로</text>

        {/* === 더채플앳청담 === */}
        <rect x="75" y="68" width="72" height="34" fill="#6b5e50" rx="4" />
        <text x="111" y="87" fontSize="10" fill="#f5f0e8" textAnchor="middle" fontWeight="500" letterSpacing="0.02em">더채플앳청담</text>
        <text x="111" y="97" fontSize="5.5" fill="#b5a690" textAnchor="middle" letterSpacing="0.2em">THE CHAPEL</text>

        {/* 마커 (뱃지 좌측 중앙) */}
        <motion.g
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="75" cy="85" r="2.5" fill="#c9a961" />
        </motion.g>

        {/* === 셔틀버스 경로 (ㄴ자: 출구→좌측→마커까지 직선) === */}
        <path
          d="M138 205 L75 205 L75 88"
          fill="none"
          stroke="#c9a961"
          strokeWidth="0.8"
          strokeDasharray="3 2"
        />
        {/* 화살표 (마커에 도달) */}
        <path d="M72 91 L75 85 L78 91" fill="none" stroke="#c9a961" strokeWidth="0.8" />
        {/* 라벨 */}
        <text x="67" y="150" fontSize="7" fill="#b08d2e" textAnchor="end" fontWeight="400">셔틀버스</text>

        {/* === 강남구청역 3번 출구 === */}
        <circle cx="150" cy="230" r="3.5" fill="#6b5e50" />

        <circle cx="138" cy="205" r="7" fill="#6b5e50" />
        <text x="138" y="208.5" fontSize="8" fill="white" textAnchor="middle" fontWeight="700">3</text>

        <text x="155" y="255" fontSize="10" fill="#4a3f35" fontWeight="600">강남구청역</text>
        <text x="155" y="268" fontSize="7" fill="#8a7d6e" fontWeight="400">7호선 · 수인분당선</text>

        {/* === 주변 건물 === */}
        {/* 소방서 (더채플 기준 좌측 상단) */}
        <circle cx="42" cy="48" r="1.5" fill="#a0937f" />
        <text x="50" y="51" fontSize="7.5" fill="#6b5e50" fontWeight="400">소방서</text>

        {/* 영동고등학교 (선릉로 동쪽, 더채플 맞은편) */}
        <circle cx="200" cy="145" r="1.5" fill="#a0937f" />
        <text x="210" y="148" fontSize="7.5" fill="#6b5e50" fontWeight="400">영동고등학교</text>

        {/* 호림아트센터 (동쪽 하단) */}
        <circle cx="210" cy="200" r="1.5" fill="#a0937f" />
        <text x="220" y="203" fontSize="7.5" fill="#6b5e50" fontWeight="400">호림아트센터</text>

        {/* 강남구청 (동쪽 학동로 위) */}
        <circle cx="210" cy="215" r="1.5" fill="#a0937f" />
        <text x="220" y="218" fontSize="7.5" fill="#6b5e50" fontWeight="400">강남구청</text>
      </svg>
    </motion.div>
  );
};
