"use client";

import { motion } from "framer-motion";

/**
 * 약도 컴포넌트
 * 선릉로 좌측(서쪽) 구역 중심
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
      <svg viewBox="0 0 280 280" className="w-full" xmlns="http://www.w3.org/2000/svg">

        {/* === 도로 === */}
        {/* 선릉로 (우측 경계) */}
        <line x1="250" y1="0" x2="250" y2="280" stroke="#c4b9a8" strokeWidth="1.2" />
        {/* 학동로 (하단) */}
        <line x1="0" y1="230" x2="280" y2="230" stroke="#c4b9a8" strokeWidth="1.2" />

        {/* 골목길 */}
        <line x1="130" y1="30" x2="130" y2="230" stroke="#d8cfc0" strokeWidth="0.6" />
        <line x1="0" y1="95" x2="250" y2="95" stroke="#d8cfc0" strokeWidth="0.6" />
        <line x1="0" y1="160" x2="250" y2="160" stroke="#d8cfc0" strokeWidth="0.6" />

        {/* === 도로명 === */}
        <text x="256" y="28" fontSize="8" fill="#8a7d6e" fontWeight="400" letterSpacing="0.12em">선릉로</text>
        <text x="15" y="244" fontSize="8" fill="#8a7d6e" fontWeight="400" letterSpacing="0.12em">학동로</text>

        {/* === 더채플앳청담 === */}
        <rect x="145" y="42" width="68" height="30" fill="#6b5e50" rx="3" />
        <text x="179" y="60" fontSize="9.5" fill="#f5f0e8" textAnchor="middle" fontWeight="500">더채플앳청담</text>

        {/* 뱃지 → 마커 점선 연결 */}
        <line x1="179" y1="72" x2="179" y2="100" stroke="#c9a961" strokeWidth="0.8" strokeDasharray="2 2" />

        {/* 위치 강조 마커 ⊙ */}
        <circle cx="179" cy="112" r="7" fill="none" stroke="#c9a961" strokeWidth="1.2" />
        <circle cx="179" cy="112" r="2.5" fill="#c9a961" />

        {/* === 강남구청역 3번 출구 === */}
        <circle cx="250" cy="230" r="3" fill="#6b5e50" />

        <g>
          <circle cx="230" cy="210" r="7" fill="#6b5e50" />
          <text x="230" y="213.5" fontSize="8" fill="white" textAnchor="middle" fontWeight="700">3</text>
          <text x="218" y="206" fontSize="8" fill="#4a3f35" textAnchor="end" fontWeight="500">강남구청역</text>
          <text x="218" y="217" fontSize="7" fill="#8a7d6e" textAnchor="end" fontWeight="300">3번 출구</text>
        </g>

        <text x="256" y="248" fontSize="7" fill="#8a7d6e" fontWeight="300">7호선 · 수인분당선</text>

        {/* === 주변 건물 (선릉로 서쪽 구역) === */}
        {/* 소방서 */}
        <circle cx="170" cy="140" r="1.5" fill="#a0937f" />
        <text x="178" y="143" fontSize="7.5" fill="#6b5e50" fontWeight="400">소방서</text>

        {/* 호림아트센터 */}
        <circle cx="80" cy="130" r="1.5" fill="#a0937f" />
        <text x="80" y="123" fontSize="7.5" fill="#6b5e50" textAnchor="middle" fontWeight="400">호림아트센터</text>

        {/* 영동고등학교 */}
        <circle cx="200" cy="180" r="1.5" fill="#a0937f" />
        <text x="208" y="183" fontSize="7.5" fill="#6b5e50" fontWeight="400">영동고등학교</text>
      </svg>
    </motion.div>
  );
};
