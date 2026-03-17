"use client";

import { motion } from "framer-motion";

/**
 * 약도 컴포넌트
 * 얇은 선 + 텍스트 라벨 기반의 미니멀 약도
 */
export const VenueMap = () => {
  return (
    <motion.div
      className="relative rounded-lg bg-[#f5f0e8] px-5 py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <svg viewBox="0 0 300 280" className="w-full" xmlns="http://www.w3.org/2000/svg">

        {/* === 도로 (얇은 선) === */}
        {/* 선릉로 (세로) */}
        <line x1="150" y1="0" x2="150" y2="280" stroke="#c4b9a8" strokeWidth="0.8" />

        {/* 언주로 (가로 상단) */}
        <line x1="0" y1="70" x2="300" y2="70" stroke="#c4b9a8" strokeWidth="0.8" />

        {/* 도산대로 (가로 하단) */}
        <line x1="0" y1="240" x2="300" y2="240" stroke="#c4b9a8" strokeWidth="0.8" />

        {/* 작은 골목길 */}
        <line x1="80" y1="70" x2="80" y2="240" stroke="#d4cab8" strokeWidth="0.5" />
        <line x1="220" y1="70" x2="220" y2="240" stroke="#d4cab8" strokeWidth="0.5" />
        <line x1="0" y1="155" x2="150" y2="155" stroke="#d4cab8" strokeWidth="0.5" />

        {/* === 도로명 라벨 === */}
        <text x="158" y="28" fontSize="7" fill="#a09080" fontWeight="400" letterSpacing="0.1em">선릉로</text>
        <text x="18" y="64" fontSize="7" fill="#a09080" fontWeight="400" letterSpacing="0.1em">언주로</text>
        <text x="230" y="254" fontSize="7" fill="#a09080" fontWeight="400" letterSpacing="0.1em">도산대로</text>

        {/* === 강남구청역 === */}
        {/* 역 마커 (교차점) */}
        <circle cx="150" cy="70" r="3.5" fill="#a09080" />
        {/* 역명 */}
        <text x="140" y="58" fontSize="8" fill="#6b5e50" textAnchor="end" fontWeight="500">강남구청역</text>

        {/* 3번 출구 */}
        <circle cx="150" cy="95" r="2.5" fill="#a09080" />
        <text x="160" y="98" fontSize="7" fill="#a09080" fontWeight="400">3번 출구</text>

        {/* === 경로 점선 === */}
        <line x1="150" y1="98" x2="150" y2="145" stroke="#a09080" strokeWidth="0.6" strokeDasharray="3 3" />

        {/* === 더채플앳청담 (다크 뱃지) === */}
        <rect x="117" y="150" width="66" height="26" fill="#6b5e50" rx="3" />
        <text x="150" y="167" fontSize="8.5" fill="#f5f0e8" textAnchor="middle" fontWeight="500" letterSpacing="0.03em">더채플앳청담</text>

        {/* 마커 핀 */}
        <motion.circle
          cx="150"
          cy="140"
          r="3"
          fill="#c9a961"
          animate={{ r: [3, 3.8, 3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* === 주변 건물 (텍스트 라벨) === */}
        {/* 강남구청 */}
        <circle cx="50" cy="46" r="1.5" fill="#c4b9a8" />
        <text x="50" y="42" fontSize="6.5" fill="#a09080" textAnchor="middle" fontWeight="300">강남구청</text>

        {/* 영동고등학교 */}
        <circle cx="220" cy="140" r="1.5" fill="#c4b9a8" />
        <text x="228" y="137" fontSize="6.5" fill="#a09080" fontWeight="300">영동고등학교</text>

        {/* 호림아트센터 */}
        <circle cx="80" cy="210" r="1.5" fill="#c4b9a8" />
        <text x="80" y="224" fontSize="6.5" fill="#a09080" textAnchor="middle" fontWeight="300">호림아트센터</text>

        {/* 소방서 */}
        <circle cx="180" cy="195" r="1.5" fill="#c4b9a8" />
        <text x="190" y="198" fontSize="6.5" fill="#a09080" fontWeight="300">소방서</text>
      </svg>
    </motion.div>
  );
};
