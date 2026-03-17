"use client";

import { motion } from "framer-motion";

/**
 * 약도 컴포넌트
 * 참고 이미지 스타일 — 깔끔한 도로 + 위치 강조 마커
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
      <svg viewBox="0 0 300 280" className="w-full" xmlns="http://www.w3.org/2000/svg">

        {/* === 도로 === */}
        {/* 선릉로 (남북) */}
        <line x1="155" y1="0" x2="155" y2="280" stroke="#c4b9a8" strokeWidth="1.2" />
        {/* 학동로 (동서) */}
        <line x1="0" y1="220" x2="300" y2="220" stroke="#c4b9a8" strokeWidth="1.2" />

        {/* 골목길 좌측 */}
        <line x1="75" y1="40" x2="75" y2="220" stroke="#d8cfc0" strokeWidth="0.6" />
        <line x1="0" y1="100" x2="155" y2="100" stroke="#d8cfc0" strokeWidth="0.6" />
        <line x1="0" y1="165" x2="155" y2="165" stroke="#d8cfc0" strokeWidth="0.6" />

        {/* 골목길 우측 */}
        <line x1="235" y1="40" x2="235" y2="220" stroke="#d8cfc0" strokeWidth="0.6" />
        <line x1="155" y1="90" x2="300" y2="90" stroke="#d8cfc0" strokeWidth="0.6" />
        <line x1="155" y1="155" x2="300" y2="155" stroke="#d8cfc0" strokeWidth="0.6" />

        {/* === 도로명 === */}
        <text x="162" y="25" fontSize="8" fill="#8a7d6e" fontWeight="400" letterSpacing="0.12em">선릉로</text>
        <text x="240" y="235" fontSize="8" fill="#8a7d6e" fontWeight="400" letterSpacing="0.12em">학동로</text>

        {/* === 더채플앳청담 (예식장 강조) === */}
        <rect x="82" y="60" width="68" height="30" fill="#6b5e50" rx="3" />
        <text x="116" y="78" fontSize="9.5" fill="#f5f0e8" textAnchor="middle" fontWeight="500">더채플앳청담</text>

        {/* 위치 강조 마커 (참고이미지 스타일 ⊙) */}
        <circle cx="116" cy="108" r="7" fill="none" stroke="#c9a961" strokeWidth="1.2" />
        <circle cx="116" cy="108" r="2.5" fill="#c9a961" />

        {/* === 강남구청역 3번 출구 (참고이미지 스타일) === */}
        <g>
          <circle cx="130" cy="200" r="7" fill="#6b5e50" />
          <text x="130" y="203.5" fontSize="8" fill="white" textAnchor="middle" fontWeight="700">3</text>
          <text x="105" y="196" fontSize="8" fill="#4a3f35" textAnchor="end" fontWeight="500">강남구청역</text>
          <text x="105" y="207" fontSize="7" fill="#8a7d6e" textAnchor="end" fontWeight="300">3번 출구</text>
        </g>

        {/* 역 교차점 */}
        <circle cx="155" cy="220" r="3" fill="#6b5e50" />
        <text x="160" y="248" fontSize="7" fill="#8a7d6e" fontWeight="300">7호선 · 수인분당선</text>

        {/* === 주변 건물 === */}
        {/* 소방서 (더채플 좌측 하단) */}
        <circle cx="90" cy="130" r="1.5" fill="#a0937f" />
        <text x="98" y="133" fontSize="7.5" fill="#6b5e50" fontWeight="400">소방서</text>

        {/* 영동고등학교 (선릉로 동쪽, 더채플 맞은편) */}
        <circle cx="200" cy="68" r="1.5" fill="#a0937f" />
        <text x="210" y="71" fontSize="7.5" fill="#6b5e50" fontWeight="400">영동고등학교</text>

        {/* 호림아트센터 (동쪽 중간) */}
        <circle cx="200" cy="135" r="1.5" fill="#a0937f" />
        <text x="210" y="138" fontSize="7.5" fill="#6b5e50" fontWeight="400">호림아트센터</text>

        {/* 강남구청 (학동로 동쪽) */}
        <circle cx="200" cy="205" r="1.5" fill="#a0937f" />
        <text x="210" y="208" fontSize="7.5" fill="#6b5e50" fontWeight="400">강남구청</text>
      </svg>
    </motion.div>
  );
};
