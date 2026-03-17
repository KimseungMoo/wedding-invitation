"use client";

import { motion } from "framer-motion";

/**
 * 약도 컴포넌트
 * 더채플앳청담 위치를 모던하고 깔끔하게 표시
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
      <svg viewBox="0 0 360 280" className="w-full" xmlns="http://www.w3.org/2000/svg">
        {/* === 배경 === */}
        <rect width="360" height="280" fill="#faf9f6" />

        {/* === 도로 === */}
        {/* 선릉로 (세로 메인도로) */}
        <rect x="152" y="0" width="56" height="280" fill="#f0ebe3" />
        <line x1="180" y1="0" x2="180" y2="280" stroke="#e0d8cc" strokeWidth="0.8" strokeDasharray="6 4" />

        {/* 언주로 (가로 상단) */}
        <rect x="0" y="58" width="360" height="40" fill="#f0ebe3" />
        <line x1="0" y1="78" x2="360" y2="78" stroke="#e0d8cc" strokeWidth="0.8" strokeDasharray="6 4" />

        {/* 도산대로 (가로 하단) */}
        <rect x="0" y="210" width="360" height="40" fill="#f0ebe3" />
        <line x1="0" y1="230" x2="360" y2="230" stroke="#e0d8cc" strokeWidth="0.8" strokeDasharray="6 4" />

        {/* === 도로 이름 라벨 === */}
        <g fontSize="8" fontWeight="300" letterSpacing="0.15em">
          <text x="212" y="45" fill="#b5a48a">선릉로</text>
          <text x="42" y="83" fill="#b5a48a">언주로</text>
          <text x="270" y="235" fill="#b5a48a">도산대로</text>
        </g>

        {/* === 강남구청역 === */}
        <g>
          {/* 역 표시 바 */}
          <rect x="108" y="62" width="40" height="6" fill="#7fb3d9" rx="3" />
          <rect x="108" y="88" width="40" height="6" fill="#7fb3d9" rx="3" />
          {/* 역 이름 */}
          <text x="128" y="80" fontSize="8" fill="#5a8aab" textAnchor="middle" fontWeight="500" letterSpacing="0.05em">강남구청역</text>
          {/* 3번 출구 */}
          <g>
            <rect x="161" y="98" width="38" height="16" fill="white" stroke="#7fb3d9" strokeWidth="1" rx="8" />
            <text x="180" y="109" fontSize="7" fill="#5a8aab" textAnchor="middle" fontWeight="500">3번 출구</text>
          </g>
        </g>

        {/* === 셔틀버스 경로 === */}
        <path
          d="M180 114 L180 140"
          fill="none"
          stroke="#c9a961"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          strokeLinecap="round"
        />
        {/* 셔틀버스 라벨 */}
        <g>
          <rect x="190" y="120" width="42" height="14" fill="white" stroke="#d4c5a9" strokeWidth="0.8" rx="7" />
          <text x="211" y="130" fontSize="6.5" fill="#a08d6e" textAnchor="middle" fontWeight="400">셔틀버스</text>
        </g>

        {/* === 더채플앳청담 (메인) === */}
        <g>
          {/* 건물 */}
          <rect x="148" y="148" width="64" height="52" fill="white" stroke="#c9a961" strokeWidth="1.2" rx="4" />
          {/* 건물 내부 라인 */}
          <line x1="148" y1="160" x2="212" y2="160" stroke="#c9a961" strokeWidth="0.5" opacity="0.4" />
          {/* 건물 이름 */}
          <text x="180" y="175" fontSize="9" fill="#8b7355" textAnchor="middle" fontWeight="600" letterSpacing="0.05em">더채플앳청담</text>
          <text x="180" y="190" fontSize="6" fill="#b5a48a" textAnchor="middle" letterSpacing="0.2em">WEDDING</text>
        </g>

        {/* === 마커 === */}
        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* 핀 */}
          <path
            d="M180 130 C180 124, 170 120, 170 126 C170 130, 180 138, 180 138 C180 138, 190 130, 190 126 C190 120, 180 124, 180 130Z"
            fill="#c9a961"
          />
          <line x1="180" y1="138" x2="180" y2="148" stroke="#c9a961" strokeWidth="1" />
        </motion.g>

        {/* === 주변 블록 === */}
        <rect x="220" y="110" width="36" height="24" fill="#f5f0e8" stroke="#e8e2d9" strokeWidth="0.6" rx="2" />
        <rect x="225" y="155" width="30" height="20" fill="#f5f0e8" stroke="#e8e2d9" strokeWidth="0.6" rx="2" />
        <rect x="65" y="110" width="32" height="26" fill="#f5f0e8" stroke="#e8e2d9" strokeWidth="0.6" rx="2" />
        <rect x="270" y="115" width="26" height="18" fill="#f5f0e8" stroke="#e8e2d9" strokeWidth="0.6" rx="2" />
        <rect x="55" y="160" width="28" height="20" fill="#f5f0e8" stroke="#e8e2d9" strokeWidth="0.6" rx="2" />
      </svg>
    </motion.div>
  );
};
