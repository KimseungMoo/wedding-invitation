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
        {/* 선릉로 (남북, 세로) */}
        <line x1="165" y1="0" x2="165" y2="300" stroke="#c4b9a8" strokeWidth="0.8" />

        {/* 학동로 (동서, 가로 — 강남구청역 통과) */}
        <line x1="0" y1="230" x2="300" y2="230" stroke="#c4b9a8" strokeWidth="0.8" />

        {/* 골목길 */}
        <line x1="80" y1="60" x2="80" y2="230" stroke="#ddd4c5" strokeWidth="0.4" />
        <line x1="240" y1="80" x2="240" y2="230" stroke="#ddd4c5" strokeWidth="0.4" />
        <line x1="80" y1="120" x2="300" y2="120" stroke="#ddd4c5" strokeWidth="0.4" />

        {/* === 도로명 === */}
        <text x="172" y="24" fontSize="8" fill="#8a7d6e" fontWeight="400" letterSpacing="0.12em">선릉로</text>
        <text x="20" y="225" fontSize="8" fill="#8a7d6e" fontWeight="400" letterSpacing="0.12em">학동로</text>

        {/* === 더채플앳청담 (북쪽, 상단) === */}
        <rect x="172" y="56" width="72" height="34" fill="#6b5e50" rx="4" />
        <text x="208" y="75" fontSize="10" fill="#f5f0e8" textAnchor="middle" fontWeight="500" letterSpacing="0.02em">더채플앳청담</text>
        <text x="208" y="85" fontSize="5.5" fill="#b5a690" textAnchor="middle" letterSpacing="0.2em">THE CHAPEL</text>

        {/* 마커 */}
        <motion.g
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="172" cy="73" r="2.5" fill="#c9a961" />
        </motion.g>

        {/* === 셔틀버스 경로 (3번출구 → 더채플앳청담) === */}
        <line x1="165" y1="215" x2="165" y2="95" stroke="#c9a961" strokeWidth="0.8" strokeDasharray="3 2" />
        <text x="145" y="160" fontSize="7" fill="#b08d2e" textAnchor="end" fontWeight="400">셔틀버스</text>
        {/* 화살표 */}
        <path d="M162 98 L165 90 L168 98" fill="none" stroke="#c9a961" strokeWidth="0.8" />

        {/* === 강남구청역 (남쪽, 학동로 교차점) === */}
        <circle cx="165" cy="230" r="3.5" fill="#6b5e50" />
        <text x="155" y="258" fontSize="10" fill="#4a3f35" textAnchor="end" fontWeight="600">강남구청역</text>
        <text x="155" y="270" fontSize="7" fill="#8a7d6e" textAnchor="end" fontWeight="400">7호선 · 수인분당선</text>

        {/* 3번 출구 */}
        <circle cx="165" cy="215" r="2.5" fill="#6b5e50" />
        <text x="175" y="218" fontSize="7.5" fill="#6b5e50" fontWeight="500">3번 출구</text>

        {/* === 주변 건물 === */}
        {/* 영동고등학교 (선릉로 서쪽, 더채플 맞은편) */}
        <circle cx="105" cy="70" r="1.5" fill="#a0937f" />
        <text x="97" y="68" fontSize="7.5" fill="#6b5e50" textAnchor="end" fontWeight="400">영동고등학교</text>

        {/* 호림아트센터 (서쪽 중간) */}
        <circle cx="55" cy="155" r="1.5" fill="#a0937f" />
        <text x="48" y="152" fontSize="7.5" fill="#6b5e50" textAnchor="end" fontWeight="400">호림아트센터</text>

        {/* 강남구청 (학동로 북서쪽) */}
        <circle cx="60" cy="210" r="1.5" fill="#a0937f" />
        <text x="53" y="207" fontSize="7.5" fill="#6b5e50" textAnchor="end" fontWeight="400">강남구청</text>

        {/* 소방서 (선릉로 동쪽) */}
        <circle cx="200" cy="108" r="1.5" fill="#a0937f" />
        <text x="210" y="111" fontSize="7.5" fill="#6b5e50" fontWeight="400">소방서</text>
      </svg>
    </motion.div>
  );
};
