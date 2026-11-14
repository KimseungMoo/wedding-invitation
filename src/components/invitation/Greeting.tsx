"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { AddressText } from "./AddressText";

interface GreetingProps {
  greeting?: string;
  groomFather?: string;
  groomMother?: string;
  groomName?: string;
  brideFather?: string;
  brideMother?: string;
  brideName?: string;
  dateText?: string;
  venueText?: string;
  addressText?: string;
}

/**
 * 초대의 글 & 혼주 소개 섹션
 * 종이 청첩장 내지 상단(인사말, 꽃가지 일러스트, 혼주 및 신랑·신부 성함, 일시·장소) 반영
 */
export const Greeting = ({
  greeting = "서로의 내일이란 단어에\n항상 '우리'가 있기를 바라며\n새로운 시작을 합니다.\n저희의 시작을 함께 축복해 주시면\n감사하겠습니다.",
  groomFather = "김종렬",
  groomMother = "김숙희",
  groomName = "김승무",
  brideFather = "성낙인",
  brideMother = "김보예",
  brideName = "성은지",
  dateText = "2027년 2월 21일 (일)\n오전 11시 30분",
  venueText = "더 채플 앳 청담 채플홀 (6층)",
  addressText = "서울특별시 강남구 선릉로 757 (논현동 94-9)",
}: GreetingProps) => {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-[420px]">
        {/* === 이중 테두리 카드 === */}
        <motion.div
          className="border border-[#e2d7c8] bg-[#fcfaf7] p-2 shadow-[0_8px_30px_rgba(92,72,52,0.04)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="border border-[#ebe2d6] px-5 py-10 text-center sm:px-7 sm:py-12">
            {/* 섹션 타이틀 */}
            <p className="mb-6 font-display text-[11px] tracking-[0.34em] text-[#8b7355]">
              INVITATION
            </p>

            {/* 인사말 */}
            <p className="whitespace-pre-line text-[15px] font-light leading-[2.05] text-[#4a3728] sm:text-base">
              {greeting}
            </p>

            {/* 꽃가지 디바이더 */}
            <div className="my-8 flex items-center justify-center gap-4">
              <div className="h-px flex-1 max-w-[72px] bg-[#d6c7b4]" />
              <div className="relative h-11 w-16 flex-shrink-0">
                <Image
                  src="/floral-twig.png"
                  alt="꽃가지 장식"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="h-px flex-1 max-w-[72px] bg-[#d6c7b4]" />
            </div>

            {/* 혼주 및 신랑·신부 성함 */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 py-2">
              {/* 신랑측 */}
              <div className="space-y-2.5 text-center">
                <p className="text-[12px] font-light tracking-tight text-[#5c4a3a] sm:text-[13px]">
                  <span className="font-normal">
                    {groomFather} · {groomMother}
                  </span>{" "}
                  <span className="text-[#8c7a67]">의 아들</span>
                </p>
                <p className="flex items-baseline justify-center gap-1.5">
                  <span className="text-[11px] font-light text-[#8c7a67]">신랑</span>
                  <span className="text-lg font-normal tracking-[0.08em] text-[#3f342b] sm:text-xl">
                    {groomName}
                  </span>
                </p>
              </div>

              {/* 세로 구분선 */}
              <div className="h-14 w-px bg-[#d6c7b4]" />

              {/* 신부측 */}
              <div className="space-y-2.5 text-center">
                <p className="text-[12px] font-light tracking-tight text-[#5c4a3a] sm:text-[13px]">
                  <span className="font-normal">
                    {brideFather} · {brideMother}
                  </span>{" "}
                  <span className="text-[#8c7a67]">의 딸</span>
                </p>
                <p className="flex items-baseline justify-center gap-1.5">
                  <span className="text-[11px] font-light text-[#8c7a67]">신부</span>
                  <span className="text-lg font-normal tracking-[0.08em] text-[#3f342b] sm:text-xl">
                    {brideName}
                  </span>
                </p>
              </div>
            </div>

            {/* 일시 & 장소 요약 표 */}
            <div className="mt-9 border-t border-[#dfd4c5] pt-5 text-left break-keep">
              <div className="mb-3 grid grid-cols-[52px_1px_1fr] items-start gap-x-3.5">
                <span className="pt-0.5 text-center text-xs tracking-[0.28em] text-[#6b5a4a]">
                  일 시
                </span>
                <span className="mt-1.5 h-3 w-px bg-[#cbbba5]" />
                <span className="whitespace-pre-line text-[13px] font-normal leading-relaxed text-[#3f342b] sm:text-sm">
                  {dateText}
                </span>
              </div>

              <div className="grid grid-cols-[52px_1px_1fr] items-start gap-x-3.5">
                <span className="pt-0.5 text-center text-xs tracking-[0.28em] text-[#6b5a4a]">
                  장 소
                </span>
                <span className="mt-1.5 h-3 w-px bg-[#cbbba5]" />
                <div>
                  <p className="text-[13px] font-normal text-[#3f342b] sm:text-sm">
                    {venueText}
                  </p>
                  <AddressText
                    address={addressText}
                    className="mt-1 text-[11.5px] font-light text-[#7a6856] sm:text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
