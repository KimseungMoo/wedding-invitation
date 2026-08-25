"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MainVisual,
  Gallery,
  Location,
  Account,
} from "@/components/invitation";
import { wedding } from "@/wedding.config";

/**
 * 청첩장 메인 페이지
 * 우아한 화이트 톤 디자인
 */
export default function InvitationPage() {
  const { groom, bride, greeting, date, venue, accounts, us } = wedding;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 메인 비주얼 */}
      <MainVisual
        groomName={groom.name}
        brideName={bride.name}
        greeting={greeting}
      />

      {/* 일시/장소 */}
      {/* <WeddingDate
        date={date.label}
        time={`${date.weekday} ${date.time}`}
        venue={venue.hall}
        address={venue.copyAddress}
      /> */}

      {/* 갤러리 */}
      <Gallery />

      {/* 오시는 길 */}
      <Location
        venue={venue.name}
        address={venue.address}
        copyAddress={venue.copyAddress}
        tel={venue.tel}
        parking={venue.parking}
      />

      {/* 축의금 계좌 */}
      <Account
        groomAccounts={[...accounts.groom]}
        brideAccounts={[...accounts.bride]}
      />

      {/* 푸터 */}
      <footer className="bg-[#faf9f6] px-6 pb-6 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-md text-center"
        >
          {/* 장식 */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#d4c5a9]/40" />
            <svg className="h-5 w-5 text-[#d4a5a5]/60" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#d4c5a9]/40" />
          </div>

          {/* 이름 */}
          <p className="mb-2 text-base font-light text-[#4a4a4a]">
            {groom.name} & {bride.name}
          </p>
          <p className="text-sm text-[#8b8b8b]">
            {date.full}
          </p>

          <Link
            href="/us"
            className="mt-8 inline-block text-[10px] tracking-wider text-[#b0a48c] transition-colors hover:text-[#8b7355]"
          >
            {us.peekLink}
          </Link>

          {/* 저작권 */}
          <p className="mt-10 text-[10px] tracking-wider text-[#c9c9c9]">
            Made with love for our special day
          </p>
        </motion.div>
      </footer>
    </motion.main>
  );
}
