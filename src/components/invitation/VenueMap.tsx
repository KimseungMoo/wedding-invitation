"use client";

import { motion } from "framer-motion";

/**
 * 약도 컴포넌트
 * 비대칭 레이아웃, 실제 지리 기반 배치
 */
export const VenueMap = () => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-lg bg-[#f5f0e8] px-6 py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <svg viewBox="0 0 300 260" className="w-full" xmlns="http://www.w3.org/2000/svg">

        {/* === 도로 === */}
        {/* 선릉로 (세로, 좌측에 배치) */}
        <line x1="95" y1="0" x2="95" y2="260" stroke="#c4b9a8" strokeWidth="0.8" />

        {/* 언주로 (가로 상단) */}
        <line x1="0" y1="60" x2="300" y2="60" stroke="#c4b9a8" strokeWidth="0.8" />

        {/* 도산대로 (가로 하단) */}
        <line x1="0" y1="225" x2="300" y2="225" stroke="#c4b9a8" strokeWidth="0.8" />

        {/* 골목길 */}
        <line x1="190" y1="60" x2="190" y2="225" stroke="#dcd3c4" strokeWidth="0.4" />
        <line x1="95" y1="145" x2="300" y2="145" stroke="#dcd3c4" strokeWidth="0.4" />

        {/* === 도로명 === */}
        <text x="100" y="22" fontSize="7" fill="#b5a690" fontWeight="300" letterSpacing="0.12em">선릉로</text>
        <text x="220" y="55" fontSize="7" fill="#b5a690" fontWeight="300" letterSpacing="0.12em">언주로</text>
        <text x="15" y="220" fontSize="7" fill="#b5a690" fontWeight="300" letterSpacing="0.12em">도산대로</text>

        {/* === 강남구청역 (좌상단) === */}
        <g>
          <circle cx="95" cy="60" r="3" fill="#8a7d6e" />
          <text x="60" y="47" fontSize="8.5" fill="#6b5e50" textAnchor="middle" fontWeight="500">강남구청역</text>
          <text x="60" y="57" fontSize="6" fill="#b5a690" textAnchor="middle" fontWeight="300">7호선 · 수인분당선</text>
        </g>

        {/* 3번 출구 */}
        <circle cx="95" cy="82" r="2" fill="#8a7d6e" />
        <text x="105" y="85" fontSize="6.5" fill="#8a7d6e" fontWeight="400">3번 출구</text>

        {/* === 경로 (3번출구 → 더채플앳청담) === */}
        <path
          d="M95 85 L95 120 Q95 125 100 125 L140 125"
          fill="none"
          stroke="#c9a961"
          strokeWidth="0.8"
          strokeDasharray="3 2"
        />
        <text x="118" y="118" fontSize="5.5" fill="#c9a961" textAnchor="middle" fontWeight="300">도보 2분</text>

        {/* === 더채플앳청담 (우측 중앙) === */}
        <g>
          {/* 뱃지 */}
          <rect x="140" y="108" width="70" height="34" fill="#6b5e50" rx="4" />
          <text x="175" y="127" fontSize="9" fill="#f5f0e8" textAnchor="middle" fontWeight="500" letterSpacing="0.02em">더채플앳청담</text>
          <text x="175" y="137" fontSize="5" fill="#c4b9a8" textAnchor="middle" letterSpacing="0.2em">THE CHAPEL</text>
        </g>

        {/* 마커 */}
        <motion.g
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="140" cy="125" r="2.5" fill="#c9a961" />
        </motion.g>

        {/* === 주변 건물 라벨 === */}
        {/* 강남구청 */}
        <circle cx="42" cy="35" r="1.2" fill="#c4b9a8" />
        <text x="42" y="32" fontSize="6" fill="#b5a690" textAnchor="middle" fontWeight="300">강남구청</text>

        {/* 영동고등학교 */}
        <circle cx="190" cy="85" r="1.2" fill="#c4b9a8" />
        <text x="198" y="82" fontSize="6" fill="#b5a690" fontWeight="300">영동고등학교</text>

        {/* 호림아트센터 */}
        <circle cx="55" cy="195" r="1.2" fill="#c4b9a8" />
        <text x="55" y="207" fontSize="6" fill="#b5a690" textAnchor="middle" fontWeight="300">호림아트센터</text>

        {/* 소방서 */}
        <circle cx="145" cy="170" r="1.2" fill="#c4b9a8" />
        <text x="155" y="173" fontSize="6" fill="#b5a690" fontWeight="300">소방서</text>
      </svg>
    </motion.div>
  );
};
