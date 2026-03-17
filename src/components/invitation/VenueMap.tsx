"use client";

import { motion } from "framer-motion";

/**
 * 약도 컴포넌트
 * 실제 지리 기반 — 북쪽이 위
 * 강남구청역(남) → 셔틀버스 → 더채플앳청담(북)
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

        {/* === 도로 === */}
        {/* 선릉로 (남북) */}
        <line x1="150" y1="0" x2="150" y2="300" stroke="#c4b9a8" strokeWidth="0.8" />

        {/* 학동로 (동서, 강남구청역 통과) */}
        <line x1="0" y1="230" x2="300" y2="230" stroke="#c4b9a8" strokeWidth="0.8" />

        {/* 골목길 */}
        <line x1="235" y1="60" x2="235" y2="230" stroke="#ddd4c5" strokeWidth="0.4" />
        <line x1="70" y1="80" x2="70" y2="230" stroke="#ddd4c5" strokeWidth="0.4" />
        <line x1="0" y1="120" x2="150" y2="120" stroke="#ddd4c5" strokeWidth="0.4" />

        {/* === 도로명 === */}
        <text x="155" y="24" fontSize="8" fill="#8a7d6e" fontWeight="400" letterSpacing="0.12em">선릉로</text>
        <text x="220" y="245" fontSize="8" fill="#8a7d6e" fontWeight="400" letterSpacing="0.12em">학동로</text>

        {/* === 더채플앳청담 (북쪽, 선릉로 서쪽) === */}
        <rect x="50" y="56" width="72" height="34" fill="#6b5e50" rx="4" />
        <text x="86" y="75" fontSize="10" fill="#f5f0e8" textAnchor="middle" fontWeight="500" letterSpacing="0.02em">더채플앳청담</text>
        <text x="86" y="85" fontSize="5.5" fill="#b5a690" textAnchor="middle" letterSpacing="0.2em">THE CHAPEL</text>

        {/* 마커 */}
        <motion.g
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="122" cy="73" r="2.5" fill="#c9a961" />
        </motion.g>

        {/* === 셔틀버스 경로 (ㄴ자: 출구→서쪽→북쪽→더채플) === */}
        <path
          d="M138 210 L86 210 L86 93"
          fill="none"
          stroke="#c9a961"
          strokeWidth="0.8"
          strokeDasharray="3 2"
        />
        {/* 화살표 */}
        <path d="M83 96 L86 88 L89 96" fill="none" stroke="#c9a961" strokeWidth="0.8" />
        <text x="78" y="155" fontSize="7" fill="#b08d2e" textAnchor="end" fontWeight="400">셔틀버스</text>

        {/* === 강남구청역 3번 출구 (참고이미지 스타일) === */}
        {/* 역 교차점 마커 */}
        <circle cx="150" cy="230" r="3.5" fill="#6b5e50" />

        {/* 출구 표시: ③ + 텍스트 한 줄 */}
        <g>
          <circle cx="130" cy="210" r="7" fill="#6b5e50" />
          <text x="130" y="213.5" fontSize="8" fill="white" textAnchor="middle" fontWeight="700">3</text>
          <text x="112" y="213.5" fontSize="8" fill="#4a3f35" textAnchor="end" fontWeight="500">강남구청역</text>
          <text x="112" y="224" fontSize="6.5" fill="#8a7d6e" textAnchor="end" fontWeight="300">3번 출구</text>
        </g>

        {/* === 주변 건물 === */}
        {/* 영동고등학교 (선릉로 동쪽) */}
        <circle cx="195" cy="70" r="1.5" fill="#a0937f" />
        <text x="203" y="68" fontSize="7.5" fill="#6b5e50" fontWeight="400">영동고등학교</text>

        {/* 호림아트센터 */}
        <circle cx="210" cy="150" r="1.5" fill="#a0937f" />
        <text x="220" y="153" fontSize="7.5" fill="#6b5e50" fontWeight="400">호림아트센터</text>

        {/* 강남구청 */}
        <circle cx="220" cy="215" r="1.5" fill="#a0937f" />
        <text x="230" y="218" fontSize="7.5" fill="#6b5e50" fontWeight="400">강남구청</text>

        {/* 소방서 */}
        <circle cx="105" cy="108" r="1.5" fill="#a0937f" />
        <text x="97" y="106" fontSize="7.5" fill="#6b5e50" textAnchor="end" fontWeight="400">소방서</text>
      </svg>
    </motion.div>
  );
};
