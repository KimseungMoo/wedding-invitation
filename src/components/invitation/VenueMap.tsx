"use client";

import { motion } from "framer-motion";

/**
 * 약도 컴포넌트
 * 더채플앳청담 위치를 우아하고 모던하게 표시
 */
export const VenueMap = () => {
  return (
    <motion.div
      className="relative bg-[#faf9f6]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <svg viewBox="0 0 340 330" className="w-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="340" height="330" fill="#faf9f6" />

        {/* === 도로 === */}
        {/* 선릉로 (세로 메인) */}
        <rect x="148" y="0" width="44" height="330" fill="#f2ede6" />

        {/* 언주로 (가로 상단) */}
        <rect x="0" y="68" width="340" height="32" fill="#f2ede6" />

        {/* 도산대로 (가로 하단) */}
        <rect x="0" y="268" width="340" height="32" fill="#f2ede6" />

        {/* 중앙선 점선 */}
        <line x1="170" y1="0" x2="170" y2="68" stroke="#e6dfd5" strokeWidth="0.5" strokeDasharray="4 3" />
        <line x1="170" y1="100" x2="170" y2="268" stroke="#e6dfd5" strokeWidth="0.5" strokeDasharray="4 3" />
        <line x1="170" y1="300" x2="170" y2="330" stroke="#e6dfd5" strokeWidth="0.5" strokeDasharray="4 3" />
        <line x1="0" y1="84" x2="148" y2="84" stroke="#e6dfd5" strokeWidth="0.5" strokeDasharray="4 3" />
        <line x1="192" y1="84" x2="340" y2="84" stroke="#e6dfd5" strokeWidth="0.5" strokeDasharray="4 3" />
        <line x1="0" y1="284" x2="148" y2="284" stroke="#e6dfd5" strokeWidth="0.5" strokeDasharray="4 3" />
        <line x1="192" y1="284" x2="340" y2="284" stroke="#e6dfd5" strokeWidth="0.5" strokeDasharray="4 3" />

        {/* === 도로명 === */}
        <text x="197" y="50" fontSize="7" fill="#c4b9a8" fontWeight="300" letterSpacing="0.2em">선릉로</text>
        <text x="20" y="88" fontSize="7" fill="#c4b9a8" fontWeight="300" letterSpacing="0.2em">언주로</text>
        <text x="258" y="288" fontSize="7" fill="#c4b9a8" fontWeight="300" letterSpacing="0.2em">도산대로</text>

        {/* === 주변 건물 블록 (이름 포함) === */}
        {/* 강남구청 (좌상단) */}
        <rect x="20" y="18" width="58" height="36" fill="#f5f1eb" rx="2" />
        <text x="49" y="40" fontSize="6.5" fill="#b5a48a" textAnchor="middle" fontWeight="300">강남구청</text>

        {/* 영동고등학교 (선릉로 건너편) */}
        <rect x="205" y="140" width="60" height="36" fill="#f5f1eb" rx="2" />
        <text x="235" y="162" fontSize="6.5" fill="#b5a48a" textAnchor="middle" fontWeight="300">영동고등학교</text>

        {/* 호림아트센터 (하단 좌측) */}
        <rect x="32" y="225" width="58" height="28" fill="#f5f1eb" rx="2" />
        <text x="61" y="243" fontSize="6.5" fill="#b5a48a" textAnchor="middle" fontWeight="300">호림아트센터</text>

        {/* 기타 블록 */}
        <rect x="30" y="118" width="40" height="26" fill="#f5f1eb" rx="2" />
        <rect x="85" y="155" width="32" height="22" fill="#f5f1eb" rx="2" />
        <rect x="250" y="110" width="34" height="20" fill="#f5f1eb" rx="2" />
        <rect x="215" y="210" width="38" height="22" fill="#f5f1eb" rx="2" />

        {/* === 강남구청역 === */}
        <g>
          <circle cx="130" cy="84" r="6" fill="#4a4a4a" />
          <text x="130" y="87" fontSize="5.5" fill="white" textAnchor="middle" fontWeight="700">M</text>
          <text x="118" y="78" fontSize="7.5" fill="#4a4a4a" textAnchor="middle" fontWeight="500">강남구청역</text>
        </g>

        {/* 3번 출구 */}
        <g>
          <circle cx="170" cy="112" r="6.5" fill="#4a4a4a" />
          <text x="170" y="115" fontSize="6.5" fill="white" textAnchor="middle" fontWeight="600">3</text>
          <text x="185" y="115" fontSize="6.5" fill="#8b8b8b" fontWeight="300">번출구</text>
        </g>

        {/* === 경로 === */}
        <line x1="170" y1="119" x2="170" y2="162" stroke="#c9a961" strokeWidth="0.8" strokeDasharray="2 2" />
        <text x="152" y="145" fontSize="5.5" fill="#c9a961" textAnchor="end" fontWeight="300">도보 2분</text>

        {/* === 더채플앳청담 === */}
        <rect x="148" y="168" width="44" height="48" fill="white" stroke="#c9a961" strokeWidth="1.2" rx="2" />
        <text x="170" y="191" fontSize="6" fill="#8b7355" textAnchor="middle" fontWeight="600" letterSpacing="0.02em">더채플앳청담</text>
        <text x="170" y="203" fontSize="4.5" fill="#c4b9a8" textAnchor="middle" letterSpacing="0.3em">CHAPEL</text>

        {/* === 마커 === */}
        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M170 150 C170 146, 164 143.5, 164 147 C164 150, 170 156, 170 156 C170 156, 176 150, 176 147 C176 143.5, 170 146, 170 150Z"
            fill="#c9a961"
          />
          <line x1="170" y1="156" x2="170" y2="168" stroke="#c9a961" strokeWidth="0.8" />
        </motion.g>
      </svg>
    </motion.div>
  );
};
