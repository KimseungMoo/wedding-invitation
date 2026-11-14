"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { AddressText } from "./AddressText";

interface LocationProps {
  venue?: string;
  address?: string;
  copyAddress?: string;
  tel?: string;
}

/**
 * 오시는 길 섹션
 * 종이 청첩장 약도 및 교통 안내(자가용/지하철/셔틀버스) 100% 반영
 */
export const Location = ({
  venue = "더 채플 앳 청담 채플홀 (6층)",
  address = "서울특별시 강남구 선릉로 757 (논현동 94-9)",
  copyAddress = "서울특별시 강남구 선릉로 757",
  tel = "02-421-1121",
}: LocationProps) => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const encodedVenue = encodeURIComponent("더 채플 앳 청담");
  const kakaoMapUrl = `https://map.kakao.com/link/search/${encodedVenue}`;
  const naverMapUrl = `https://map.naver.com/v5/search/${encodedVenue}`;

  const handleCopyAddress = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(copyAddress);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch {
      // 클립보드 권한 미지원 환경 fallback
      setCopiedAddress(false);
    }
  }, [copyAddress]);

  const handleCall = useCallback(() => {
    window.location.href = `tel:${tel.replace(/-/g, "")}`;
  }, [tel]);

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-md">
        {/* === 섹션 제목 === */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 font-display text-[11px] tracking-[0.34em] text-[#8b7355]">
            LOCATION
          </p>
          <div className="mx-auto mb-3 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#cbbba5]" />
            <div className="h-1 w-1 rotate-45 border border-[#8b7355]/60" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#cbbba5]" />
          </div>
          <h2 className="text-base font-light tracking-wide text-[#4a3728]">
            오시는 길
          </h2>
        </motion.div>

        {/* === 예식장 정보 카드 === */}
        <motion.div
          className="mb-6 rounded-lg border border-[#e2d7c8] bg-[#fcfaf7] p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <h3 className="mb-4 text-center text-base font-normal text-[#3f342b]">
            {venue}
          </h3>

          {/* 주소 */}
          <div className="mb-3.5 flex items-start gap-3">
            <svg
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#8b7355]/80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div className="flex flex-1 items-start justify-between gap-2.5">
              <AddressText
                address={address}
                className="min-w-0 flex-1 text-sm font-light leading-snug text-[#5c4a3a]"
              />
              <button
                type="button"
                onClick={handleCopyAddress}
                className={`shrink-0 whitespace-nowrap rounded px-2.5 py-1 text-[11px] transition-colors ${
                  copiedAddress
                    ? "border border-[#8b7355] bg-[#8b7355]/10 text-[#4a3728]"
                    : "border border-[#d6c7b4] bg-white text-[#7a6856] hover:bg-[#f6f1ea]"
                }`}
              >
                {copiedAddress ? "복사됨" : "주소 복사"}
              </button>
            </div>
          </div>

          {/* 전화번호 */}
          <div className="flex items-center gap-3">
            <svg
              className="h-4 w-4 flex-shrink-0 text-[#8b7355]/80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            <button
              type="button"
              onClick={handleCall}
              className="text-sm font-light text-[#5c4a3a] underline decoration-[#cbbba5] underline-offset-4 transition-colors hover:text-[#3f342b]"
            >
              {tel}
            </button>
          </div>
        </motion.div>

        {/* === 종이 청첩장 기준 약도 === */}
        <motion.div
          className="mb-6 overflow-hidden rounded-lg border border-[#e2d7c8] bg-[#faf7f2] px-3 py-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <svg
            viewBox="0 0 320 350"
            className="mx-auto w-full max-w-[330px]"
            role="img"
            aria-label="더 채플 앳 청담 오시는 길 약도"
          >
            {/* === 세로 주도로 (선릉로) === */}
            <rect x="176" y="14" width="16" height="328" rx="8" fill="#ede4d7" />

            {/* === 갤러리아 명품관 WEST === */}
            <text
              x="184"
              y="18"
              fontSize="8.5"
              fill="#3f342b"
              textAnchor="middle"
              fontWeight="500"
            >
              갤러리아
            </text>
            <text
              x="184"
              y="29"
              fontSize="8.5"
              fill="#3f342b"
              textAnchor="middle"
              fontWeight="500"
            >
              명품관 WEST
            </text>
            <circle cx="184" cy="38" r="2.2" fill="#4a3728" />

            {/* === 압구정로데오역 가로 도로 === */}
            <rect x="16" y="45" width="288" height="20" rx="10" fill="#ede4d7" />
            <text
              x="184"
              y="58.5"
              fontSize="9"
              fill="#4a3728"
              textAnchor="middle"
              fontWeight="500"
            >
              압구정로데오역
            </text>

            {/* === 압구정로데오역 지하철 아이콘 & 출구 === */}
            {/* 지하철 아이콘 */}
            <g transform="translate(177, 74)">
              <rect
                x="1.5"
                y="1"
                width="11"
                height="13"
                rx="2.5"
                fill="none"
                stroke="#4a3728"
                strokeWidth="1.3"
              />
              <line x1="2" y1="7" x2="12" y2="7" stroke="#4a3728" strokeWidth="1" />
              <circle cx="4.5" cy="10.5" r="0.9" fill="#4a3728" />
              <circle cx="9.5" cy="10.5" r="0.9" fill="#4a3728" />
              <line x1="4" y1="14" x2="2.5" y2="16.5" stroke="#4a3728" strokeWidth="1.2" />
              <line x1="10" y1="14" x2="11.5" y2="16.5" stroke="#4a3728" strokeWidth="1.2" />
            </g>

            {/* 6번 출구 */}
            <circle cx="158" cy="83" r="8" fill="#a88771" />
            <text x="158" y="86" fontSize="8.5" fill="#fff" textAnchor="middle" fontWeight="500">
              6
            </text>
            {/* 5번 출구 */}
            <circle cx="158" cy="105" r="8" fill="#a88771" />
            <text x="158" y="108" fontSize="8.5" fill="#fff" textAnchor="middle" fontWeight="500">
              5
            </text>
            {/* 3번 출구 */}
            <circle cx="210" cy="83" r="8" fill="#a88771" />
            <text x="210" y="86" fontSize="8.5" fill="#fff" textAnchor="middle" fontWeight="500">
              3
            </text>
            {/* 4번 출구 */}
            <circle cx="210" cy="105" r="8" fill="#a88771" />
            <text x="210" y="108" fontSize="8.5" fill="#fff" textAnchor="middle" fontWeight="500">
              4
            </text>

            {/* 도산공원 */}
            <circle cx="76" cy="106" r="2.2" fill="#4a3728" />
            <text x="76" y="121" fontSize="8.5" fill="#3f342b" textAnchor="middle">
              도산공원
            </text>

            {/* LG전자 플래그십 D5 */}
            <circle cx="232" cy="109" r="2.2" fill="#4a3728" />
            <text x="238" y="108" fontSize="8.5" fill="#3f342b" fontWeight="500">
              LG전자
            </text>
            <text x="238" y="119" fontSize="8.5" fill="#3f342b" fontWeight="500">
              플래그십 D5
            </text>

            {/* === 학동사거리 가로 도로 === */}
            <rect x="16" y="135" width="288" height="20" rx="10" fill="#ede4d7" />
            <text
              x="184"
              y="148.5"
              fontSize="9"
              fill="#4a3728"
              textAnchor="middle"
              fontWeight="500"
            >
              학동사거리
            </text>

            {/* === 삼성스토어 청담 === */}
            <text
              x="151"
              y="177"
              fontSize="8.5"
              fill="#3f342b"
              textAnchor="end"
              fontWeight="500"
            >
              삼성스토어 청담
            </text>
            <circle cx="159" cy="174" r="2.2" fill="#4a3728" />

            {/* === 더 채플 앳 청담 카드 + 위치 핀 === */}
            <rect x="52" y="188" width="98" height="58" rx="4" fill="#4a3728" />
            <image
              href="/더채플로고-dark.png"
              x="67"
              y="196"
              width="68"
              height="26"
              preserveAspectRatio="xMidYMid meet"
            />
            <text
              x="101"
              y="236"
              fontSize="8.5"
              fill="#faf7f2"
              textAnchor="middle"
              fontWeight="400"
            >
              더 채플 앳 청담
            </text>

            {/* 위치 핀 아이콘 (카드 우측 상단, 선릉로 변) */}
            <g transform="translate(154, 192)">
              <path
                d="M10 1C5.86 1 2.5 4.36 2.5 8.5C2.5 13.85 10 21 10 21C10 21 17.5 13.85 17.5 8.5C17.5 4.36 14.14 1 10 1Z"
                fill="#4a3728"
              />
              <circle cx="10" cy="8.5" r="3" fill="#faf7f2" />
            </g>

            {/* === 삼성당빌딩 === */}
            <text
              x="151"
              y="266"
              fontSize="8.5"
              fill="#3f342b"
              textAnchor="end"
              fontWeight="500"
            >
              삼성당빌딩
            </text>
            <circle cx="159" cy="263" r="2.2" fill="#4a3728" />

            {/* === 영동고등학교 === */}
            <circle cx="248" cy="228" r="2.2" fill="#4a3728" />
            <text x="248" y="242" fontSize="8.5" fill="#3f342b" textAnchor="middle">
              영동고등학교
            </text>

            {/* === 강남구청역 지하철 아이콘 & 출구 === */}
            <g transform="translate(177, 286)">
              <rect
                x="1.5"
                y="1"
                width="11"
                height="13"
                rx="2.5"
                fill="none"
                stroke="#4a3728"
                strokeWidth="1.3"
              />
              <line x1="2" y1="7" x2="12" y2="7" stroke="#4a3728" strokeWidth="1" />
              <circle cx="4.5" cy="10.5" r="0.9" fill="#4a3728" />
              <circle cx="9.5" cy="10.5" r="0.9" fill="#4a3728" />
              <line x1="4" y1="14" x2="2.5" y2="16.5" stroke="#4a3728" strokeWidth="1.2" />
              <line x1="10" y1="14" x2="11.5" y2="16.5" stroke="#4a3728" strokeWidth="1.2" />
            </g>

            {/* 3-1번 출구 */}
            <circle cx="157" cy="294" r="9" fill="#a88771" />
            <text x="157" y="297" fontSize="7.5" fill="#fff" textAnchor="middle" fontWeight="500">
              3-1
            </text>
            {/* 4번 출구 */}
            <circle cx="211" cy="294" r="9" fill="#a88771" />
            <text x="211" y="297" fontSize="8.5" fill="#fff" textAnchor="middle" fontWeight="500">
              4
            </text>

            {/* === 강남구청역 가로 도로 === */}
            <rect x="16" y="313" width="288" height="20" rx="10" fill="#ede4d7" />
            <text
              x="184"
              y="326.5"
              fontSize="9"
              fill="#4a3728"
              textAnchor="middle"
              fontWeight="500"
            >
              강남구청역
            </text>
          </svg>
        </motion.div>

        {/* === 네비게이션 / 지도 앱 버튼 === */}
        <motion.div
          className="mb-8 grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <a
            href={kakaoMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 rounded-lg border border-[#e2d7c8] bg-[#fcfaf7] py-3.5 transition-all hover:border-[#cbbba5] hover:bg-[#f6f1ea]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FEE500]">
              <span className="text-[11px] font-bold text-[#3C1E1E]">K</span>
            </div>
            <span className="text-xs font-normal text-[#4a3728]">카카오맵</span>
          </a>

          <a
            href={naverMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 rounded-lg border border-[#e2d7c8] bg-[#fcfaf7] py-3.5 transition-all hover:border-[#cbbba5] hover:bg-[#f6f1ea]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2DB400]">
              <span className="text-[11px] font-bold text-white">N</span>
            </div>
            <span className="text-xs font-normal text-[#4a3728]">네이버지도</span>
          </a>
        </motion.div>

        {/* === 교통 안내 (자가용 / 지하철 / 셔틀버스) === */}
        <motion.div
          className="divide-y divide-[#ebe2d6] rounded-lg border border-[#e2d7c8] bg-[#fcfaf7] px-5 py-2 break-keep"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          {/* 자가용 */}
          <div className="flex items-start gap-4 py-5">
            <div className="flex w-14 flex-shrink-0 flex-col items-center gap-1.5 pt-0.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0e7dc] text-[#6b5344]">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M5 11l1.5-4.5h11L19 11" />
                  <rect x="3" y="11" width="18" height="6" rx="1.5" />
                  <circle cx="7" cy="17" r="1.5" />
                  <circle cx="17" cy="17" r="1.5" />
                </svg>
              </div>
              <span className="text-xs font-normal text-[#4a3728]">자가용</span>
            </div>
            <div className="flex-1 space-y-1.5 border-l border-[#e6dcd0] pl-4 text-[13px] font-light leading-relaxed text-[#5c4a3a]">
              <p className="font-normal text-[#3f342b]">
                건물 내 주차장 이용{" "}
                <span className="whitespace-nowrap">(무료주차 90분 제공)</span>
              </p>
              <p>내부 주차장 만차 시 외부 주차장으로 안내됩니다.</p>
              <p className="text-xs text-[#7a6856]">
                주차장이 협소하여 혼잡하오니 가급적 대중교통을 이용해 주시기 바랍니다.
              </p>
            </div>
          </div>

          {/* 지하철 */}
          <div className="flex items-start gap-4 py-5">
            <div className="flex w-14 flex-shrink-0 flex-col items-center gap-1.5 pt-0.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0e7dc] text-[#6b5344]">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="5" y="3" width="14" height="15" rx="3" />
                  <path d="M5 11h14" />
                  <circle cx="9" cy="14.5" r="1" fill="currentColor" />
                  <circle cx="15" cy="14.5" r="1" fill="currentColor" />
                  <path d="M8 18l-2 3M16 18l2 3" />
                </svg>
              </div>
              <span className="text-xs font-normal text-[#4a3728]">지하철</span>
            </div>
            <div className="flex-1 space-y-2 border-l border-[#e6dcd0] pl-4 text-[13px] font-light leading-relaxed text-[#5c4a3a]">
              <p>
                압구정로데오역 5번 출구에서
                <br />
                도보 약 8분
              </p>
              <p>
                강남구청역 3-1번 출구에서
                <br />
                도보 약 10분
              </p>
            </div>
          </div>

          {/* 셔틀버스 */}
          <div className="flex items-start gap-4 py-5">
            <div className="flex w-14 flex-shrink-0 flex-col items-center gap-1.5 pt-0.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0e7dc] text-[#6b5344]">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="5" width="18" height="12" rx="2" />
                  <path d="M3 11h18M8 5v6M16 5v6" />
                  <circle cx="7.5" cy="17.5" r="1.5" />
                  <circle cx="16.5" cy="17.5" r="1.5" />
                </svg>
              </div>
              <span className="text-xs font-normal text-[#4a3728]">셔틀버스</span>
            </div>
            <div className="flex-1 space-y-1 border-l border-[#e6dcd0] pl-4 text-[13px] font-light leading-relaxed text-[#5c4a3a]">
              <p>강남구청역 3번 출구 셔틀버스 운행</p>
              <p className="text-xs text-[#7a6856]">(10분 간격)</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
