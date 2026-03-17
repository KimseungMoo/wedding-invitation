"use client";

import { motion } from "framer-motion";

/**
 * 약도 컴포넌트
 * 더채플앳청담 위치를 모던하게 표시
 */
export const VenueMap = () => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <svg viewBox="0 0 340 300" className="w-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="340" height="300" fill="#faf9f6" />

        {/* === 도로 === */}
        {/* 선릉로 (세로) */}
        <rect x="140" y="0" width="60" height="300" fill="#f0ebe3" />

        {/* 언주로 (가로 상단) */}
        <rect x="0" y="50" width="340" height="38" fill="#f0ebe3" />

        {/* 도산대로 (가로 하단) */}
        <rect x="0" y="240" width="340" height="38" fill="#f0ebe3" />

        {/* 중앙선 */}
        <line x1="170" y1="0" x2="170" y2="50" stroke="#e4ddd2" strokeWidth="0.6" strokeDasharray="4 3" />
        <line x1="170" y1="88" x2="170" y2="240" stroke="#e4ddd2" strokeWidth="0.6" strokeDasharray="4 3" />
        <line x1="170" y1="278" x2="170" y2="300" stroke="#e4ddd2" strokeWidth="0.6" strokeDasharray="4 3" />
        <line x1="0" y1="69" x2="140" y2="69" stroke="#e4ddd2" strokeWidth="0.6" strokeDasharray="4 3" />
        <line x1="200" y1="69" x2="340" y2="69" stroke="#e4ddd2" strokeWidth="0.6" strokeDasharray="4 3" />
        <line x1="0" y1="259" x2="140" y2="259" stroke="#e4ddd2" strokeWidth="0.6" strokeDasharray="4 3" />
        <line x1="200" y1="259" x2="340" y2="259" stroke="#e4ddd2" strokeWidth="0.6" strokeDasharray="4 3" />

        {/* === 도로명 === */}
        <text x="205" y="38" fontSize="7.5" fill="#c0b49e" fontWeight="300" letterSpacing="0.15em">선릉로</text>
        <text x="28" y="73" fontSize="7.5" fill="#c0b49e" fontWeight="300" letterSpacing="0.15em">언주로</text>
        <text x="255" y="263" fontSize="7.5" fill="#c0b49e" fontWeight="300" letterSpacing="0.15em">도산대로</text>

        {/* === 주변 블록 === */}
        <rect x="22" y="100" width="42" height="30" fill="#f5f1eb" rx="2" />
        <rect x="22" y="145" width="35" height="25" fill="#f5f1eb" rx="2" />
        <rect x="80" y="108" width="30" height="22" fill="#f5f1eb" rx="2" />
        <rect x="230" y="100" width="38" height="28" fill="#f5f1eb" rx="2" />
        <rect x="240" y="145" width="32" height="22" fill="#f5f1eb" rx="2" />
        <rect x="285" y="108" width="28" height="20" fill="#f5f1eb" rx="2" />
        <rect x="30" y="195" width="36" height="24" fill="#f5f1eb" rx="2" />
        <rect x="245" y="195" width="30" height="20" fill="#f5f1eb" rx="2" />

        {/* === 강남구청역 === */}
        {/* 7호선 라인 */}
        <rect x="108" y="56" width="30" height="4" fill="#698B69" rx="2" />
        <rect x="108" y="78" width="30" height="4" fill="#698B69" rx="2" />
        {/* 수인분당선 라인 */}
        <rect x="108" y="62" width="30" height="4" fill="#E8A735" rx="2" />
        <rect x="108" y="72" width="30" height="4" fill="#E8A735" rx="2" />
        {/* 역명 */}
        <text x="123" y="71" fontSize="6.5" fill="#4a4a4a" textAnchor="middle" fontWeight="500">강남구청</text>

        {/* 3번 출구 */}
        <circle cx="170" cy="98" r="9" fill="none" stroke="#c9a961" strokeWidth="1" />
        <text x="170" y="101" fontSize="7" fill="#c9a961" textAnchor="middle" fontWeight="600">3</text>
        <text x="186" y="101" fontSize="6.5" fill="#b5a48a" fontWeight="300">번출구</text>

        {/* === 경로 점선 === */}
        <line x1="170" y1="107" x2="170" y2="143" stroke="#c9a961" strokeWidth="0.8" strokeDasharray="2 2" />
        <text x="185" y="130" fontSize="6" fill="#c9a961" fontWeight="300" letterSpacing="0.05em">도보 2분</text>

        {/* === 더채플앳청담 === */}
        <g>
          <rect x="143" y="148" width="54" height="44" fill="white" stroke="#c9a961" strokeWidth="1" rx="3" />
          <text x="170" y="169" fontSize="8.5" fill="#8b7355" textAnchor="middle" fontWeight="600" letterSpacing="0.03em">더채플앳청담</text>
          <text x="170" y="182" fontSize="5.5" fill="#c0b49e" textAnchor="middle" letterSpacing="0.25em">THE CHAPEL</text>
        </g>

        {/* === 마커 === */}
        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M170 132 C170 127, 162 124, 162 128.5 C162 132, 170 139, 170 139 C170 139, 178 132, 178 128.5 C178 124, 170 127, 170 132Z"
            fill="#c9a961"
          />
          <line x1="170" y1="139" x2="170" y2="148" stroke="#c9a961" strokeWidth="0.8" />
        </motion.g>
      </svg>
    </motion.div>
  );
};
