"use client";

import { motion } from "framer-motion";

/**
 * 약도 일러스트 컴포넌트
 * 더채플앳청담 위치를 귀여운 손그림 스타일로 표시
 */
export const VenueMap = () => {
  return (
    <motion.div
      className="relative bg-[#faf8f4] p-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <svg viewBox="0 0 360 320" className="w-full" xmlns="http://www.w3.org/2000/svg">
        {/* === 배경 패턴 (잔디/공원 느낌) === */}
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.8" fill="#d4c5a9" opacity="0.15" />
          </pattern>
        </defs>
        <rect width="360" height="320" fill="url(#dots)" />

        {/* === 도로 === */}
        {/* 선릉로 (세로 메인도로) */}
        <rect x="155" y="0" width="50" height="320" fill="#e8e2d9" rx="2" />
        <line x1="180" y1="0" x2="180" y2="320" stroke="#d4c5a9" strokeWidth="1" strokeDasharray="8 6" />

        {/* 언주로 (가로 도로 - 상단) */}
        <rect x="0" y="80" width="360" height="36" fill="#e8e2d9" rx="2" />
        <line x1="0" y1="98" x2="360" y2="98" stroke="#d4c5a9" strokeWidth="1" strokeDasharray="8 6" />

        {/* 도산대로 (가로 도로 - 하단) */}
        <rect x="0" y="230" width="360" height="36" fill="#e8e2d9" rx="2" />
        <line x1="0" y1="248" x2="360" y2="248" stroke="#d4c5a9" strokeWidth="1" strokeDasharray="8 6" />

        {/* === 도로 이름 === */}
        <text x="210" y="55" fontSize="9" fill="#a08d6e" fontWeight="400" letterSpacing="0.1em">선릉로</text>
        <text x="50" y="104" fontSize="9" fill="#a08d6e" fontWeight="400" letterSpacing="0.1em">언주로</text>
        <text x="265" y="254" fontSize="9" fill="#a08d6e" fontWeight="400" letterSpacing="0.1em">도산대로</text>

        {/* === 나무 장식 === */}
        {/* 좌측 나무들 */}
        <g opacity="0.6">
          <circle cx="60" cy="45" r="10" fill="#c8d5b9" />
          <circle cx="55" cy="40" r="8" fill="#b8c9a5" />
          <rect x="58" y="50" width="3" height="8" fill="#a08d6e" rx="1" />
        </g>
        <g opacity="0.5">
          <circle cx="100" cy="55" r="8" fill="#c8d5b9" />
          <circle cx="96" cy="51" r="6" fill="#b8c9a5" />
          <rect x="98" y="59" width="2.5" height="7" fill="#a08d6e" rx="1" />
        </g>
        {/* 우측 나무들 */}
        <g opacity="0.5">
          <circle cx="290" cy="140" r="9" fill="#c8d5b9" />
          <circle cx="286" cy="136" r="7" fill="#b8c9a5" />
          <rect x="288" y="145" width="2.5" height="7" fill="#a08d6e" rx="1" />
        </g>
        <g opacity="0.6">
          <circle cx="70" cy="200" r="10" fill="#c8d5b9" />
          <circle cx="65" cy="195" r="8" fill="#b8c9a5" />
          <rect x="68" y="205" width="3" height="8" fill="#a08d6e" rx="1" />
        </g>
        <g opacity="0.4">
          <circle cx="320" cy="290" r="8" fill="#c8d5b9" />
          <circle cx="316" cy="286" r="6" fill="#b8c9a5" />
          <rect x="318" y="294" width="2.5" height="6" fill="#a08d6e" rx="1" />
        </g>

        {/* === 강남구청역 (지하철) === */}
        <g>
          {/* 역 건물 */}
          <rect x="100" y="68" width="50" height="12" fill="#fff" stroke="#7fb3d9" strokeWidth="1.5" rx="3" />
          {/* 지하철 심볼 */}
          <circle cx="110" cy="74" r="4.5" fill="#7fb3d9" />
          <text x="110" y="76.5" fontSize="6" fill="white" textAnchor="middle" fontWeight="700">M</text>
          {/* 역 이름 */}
          <text x="137" y="77" fontSize="8" fill="#5a8aab" textAnchor="middle" fontWeight="500">강남구청역</text>
          {/* 3번 출구 표시 */}
          <circle cx="140" cy="116" r="8" fill="#7fb3d9" />
          <text x="140" y="119" fontSize="7" fill="white" textAnchor="middle" fontWeight="700">3</text>
          <text x="158" y="120" fontSize="7.5" fill="#5a8aab" fontWeight="400">번 출구</text>
        </g>

        {/* === 셔틀버스 경로 (점선) === */}
        <path
          d="M140 124 L140 150 Q140 155 145 155 L160 155 L160 165"
          fill="none"
          stroke="#d4a5a5"
          strokeWidth="2"
          strokeDasharray="4 3"
          strokeLinecap="round"
        />
        {/* 셔틀버스 아이콘 */}
        <g transform="translate(126, 138)">
          <rect x="0" y="0" width="16" height="10" fill="#d4a5a5" rx="3" />
          <circle cx="4" cy="11" r="2" fill="#d4a5a5" />
          <circle cx="12" cy="11" r="2" fill="#d4a5a5" />
          <rect x="2" y="2" width="5" height="4" fill="white" rx="1" />
          <rect x="9" y="2" width="5" height="4" fill="white" rx="1" />
        </g>
        <text x="114" y="157" fontSize="6.5" fill="#d4a5a5" fontWeight="400">셔틀버스</text>

        {/* === 더채플앳청담 (메인 건물) === */}
        <g>
          {/* 건물 그림자 */}
          <rect x="138" y="170" width="54" height="46" fill="#d4c5a9" opacity="0.2" rx="6" />
          {/* 건물 본체 */}
          <rect x="135" y="167" width="54" height="46" fill="white" stroke="#c9a961" strokeWidth="1.5" rx="6" />
          {/* 지붕 장식 */}
          <path d="M135 175 L162 160 L189 175" fill="none" stroke="#c9a961" strokeWidth="1.5" strokeLinecap="round" />
          {/* 건물 이름 */}
          <text x="162" y="188" fontSize="8" fill="#8b7355" textAnchor="middle" fontWeight="600">더채플앳청담</text>
          <text x="162" y="200" fontSize="6.5" fill="#a08d6e" textAnchor="middle">WEDDING HALL</text>
          {/* 건물 문 */}
          <rect x="157" y="203" width="10" height="10" fill="#f5f0e8" stroke="#c9a961" strokeWidth="0.8" rx="5 5 0 0" />
        </g>

        {/* === 하트 마커 (건물 위) === */}
        <motion.g
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* 마커 핀 */}
          <line x1="162" y1="148" x2="162" y2="158" stroke="#d4a5a5" strokeWidth="1.5" />
          {/* 하트 */}
          <path
            d="M162 148 C162 144, 155 140, 155 144 C155 147, 162 152, 162 152 C162 152, 169 147, 169 144 C169 140, 162 144, 162 148Z"
            fill="#d4a5a5"
          />
        </motion.g>

        {/* === 주변 건물들 (작은 사각형) === */}
        <rect x="230" y="130" width="30" height="20" fill="#f0ebe3" stroke="#d4c5a9" strokeWidth="0.8" rx="3" />
        <rect x="240" y="170" width="25" height="18" fill="#f0ebe3" stroke="#d4c5a9" strokeWidth="0.8" rx="3" />
        <rect x="60" y="130" width="28" height="22" fill="#f0ebe3" stroke="#d4c5a9" strokeWidth="0.8" rx="3" />
        <rect x="260" y="50" width="22" height="16" fill="#f0ebe3" stroke="#d4c5a9" strokeWidth="0.8" rx="3" />

        {/* === 꽃 장식 === */}
        {/* 꽃 1 */}
        <g transform="translate(310, 180)" opacity="0.7">
          <circle cx="0" cy="-4" r="3" fill="#f0d4d4" />
          <circle cx="4" cy="0" r="3" fill="#f0d4d4" />
          <circle cx="0" cy="4" r="3" fill="#f0d4d4" />
          <circle cx="-4" cy="0" r="3" fill="#f0d4d4" />
          <circle cx="0" cy="0" r="2.5" fill="#e8bfbf" />
        </g>
        {/* 꽃 2 */}
        <g transform="translate(40, 280)" opacity="0.6">
          <circle cx="0" cy="-3.5" r="2.5" fill="#d4c5e8" />
          <circle cx="3.5" cy="0" r="2.5" fill="#d4c5e8" />
          <circle cx="0" cy="3.5" r="2.5" fill="#d4c5e8" />
          <circle cx="-3.5" cy="0" r="2.5" fill="#d4c5e8" />
          <circle cx="0" cy="0" r="2" fill="#c4b5d8" />
        </g>
      </svg>
    </motion.div>
  );
};
