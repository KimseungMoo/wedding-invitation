"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";

export interface AccountInfo {
  role?: string;
  bank: string;
  accountNumber: string;
  holder: string;
}

interface AccountProps {
  groomAccounts?: AccountInfo[];
  brideAccounts?: AccountInfo[];
}

interface AccountCardProps {
  account: AccountInfo;
  cardKey: string;
  isCopied: boolean;
  onCopy: (account: AccountInfo, key: string) => void;
}

/**
 * 개별 계좌 카드 (부모 상태 변경 시 언마운트·재마운트로 인한 깜빡임 방지를 위해 모듈 스코프에 선언)
 */
const AccountCard = ({ account, cardKey, isCopied, onCopy }: AccountCardProps) => {
  const hasAccount = Boolean(account.accountNumber && account.bank);
  return (
    <motion.div
      className="mb-3 flex items-center justify-between rounded-lg border border-[#e2d7c8] bg-white p-4 last:mb-0"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div>
        <div className="flex items-center gap-2">
          {account.role && (
            <span className="text-[11px] font-light text-[#8b7355]">
              {account.role}
            </span>
          )}
          <span className="text-sm font-normal text-[#3f342b]">
            {account.holder}
          </span>
        </div>
        {hasAccount ? (
          <p className="mt-1 text-xs font-light text-[#5c4a3a]">
            <span>{account.bank} </span>
            <button
              type="button"
              onClick={() => onCopy(account, cardKey)}
              className="cursor-pointer underline decoration-[#b9a792] underline-offset-4 transition-colors hover:text-[#3f342b]"
              aria-label={`${account.holder} 계좌번호 ${account.accountNumber} 복사`}
            >
              {account.accountNumber}
            </button>
          </p>
        ) : (
          <p className="mt-1 text-xs font-light text-[#9b8976]">
            계좌번호 추후 안내 예정
          </p>
        )}
      </div>
      {hasAccount && (
        <button
          type="button"
          onClick={() => onCopy(account, cardKey)}
          className={`rounded-md px-3.5 py-2 text-xs font-light transition-all ${
            isCopied
              ? "border border-[#8b7355] bg-[#8b7355]/10 text-[#4a3728]"
              : "border border-[#d6c7b4] bg-[#faf7f2] text-[#6b5344] hover:bg-[#f2ebe0]"
          }`}
        >
          {isCopied ? "복사됨" : "복사"}
        </button>
      )}
    </motion.div>
  );
};

/**
 * 축의금 계좌 섹션
 * 종이 청첩장의 실제 가족 성함 반영 및 샴페인 아이보리 톤 디자인 통일
 */
export const Account = ({
  groomAccounts = [
    { role: "아버지", bank: "부산은행", accountNumber: "112-2040-3246-03", holder: "김종렬" },
    { role: "어머니", bank: "카카오뱅크", accountNumber: "3333-07-2869593", holder: "김숙희" },
    { role: "신랑", bank: "토스뱅크", accountNumber: "1000-1599-2712", holder: "김승무" },
  ],
  brideAccounts = [
    { role: "아버지", bank: "농협", accountNumber: "127-12-380646", holder: "성낙인" },
    { role: "어머니", bank: "농협", accountNumber: "127-12-204590", holder: "김보예" },
    { role: "신부", bank: "농협", accountNumber: "127-12-344017", holder: "성은지" },
  ],
}: AccountProps) => {
  const [isGroomOpen, setIsGroomOpen] = useState(false);
  const [isBrideOpen, setIsBrideOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const handleCopyAccount = useCallback(
    async (account: AccountInfo, key: string) => {
      if (!account.accountNumber) return;
      const digitsOnly = account.accountNumber.replace(/\D/g, "");
      try {
        await navigator.clipboard.writeText(digitsOnly);
        if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
        setCopiedKey(key);
        copyTimerRef.current = setTimeout(() => {
          setCopiedKey(null);
          copyTimerRef.current = null;
        }, 2000);
      } catch {
        setCopiedKey(null);
      }
    },
    []
  );

  return (
    <section className="bg-[#f6f1ea] px-6 py-20">
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
            ACCOUNT
          </p>
          <div className="mx-auto mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#cbbba5]" />
            <div className="h-1 w-1 rotate-45 border border-[#8b7355]/60" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#cbbba5]" />
          </div>
          <p className="text-sm font-light text-[#6b5e52]">마음 전하실 곳</p>
        </motion.div>

        {/* === 신랑측 === */}
        <motion.div
          className="mb-3.5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <button
            type="button"
            onClick={() => setIsGroomOpen(!isGroomOpen)}
            className="flex w-full items-center justify-between rounded-lg border border-[#d6c7b4]/70 bg-white p-5 transition-all hover:border-[#b89f7d]"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0e7dc] text-[#6b5344]">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span className="text-sm font-normal text-[#3f342b]">
                신랑측 계좌번호
              </span>
            </div>
            <motion.svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8b7355"
              strokeWidth="1.5"
              animate={{ rotate: isGroomOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path d="M6 9l6 6 6-6" />
            </motion.svg>
          </button>

          <AnimatePresence>
            {isGroomOpen && (
              <motion.div
                className="mt-2 overflow-hidden rounded-lg border border-[#e5dcd0] bg-[#faf7f2] p-3.5"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {groomAccounts.map((account, idx) => {
                  const key = `groom-${idx}-${account.holder}`;
                  return (
                    <AccountCard
                      key={key}
                      cardKey={key}
                      account={account}
                      isCopied={copiedKey === key}
                      onCopy={handleCopyAccount}
                    />
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* === 신부측 === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <button
            type="button"
            onClick={() => setIsBrideOpen(!isBrideOpen)}
            className="flex w-full items-center justify-between rounded-lg border border-[#d6c7b4]/70 bg-white p-5 transition-all hover:border-[#b89f7d]"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5eae6] text-[#944e47]">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span className="text-sm font-normal text-[#3f342b]">
                신부측 계좌번호
              </span>
            </div>
            <motion.svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8b7355"
              strokeWidth="1.5"
              animate={{ rotate: isBrideOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path d="M6 9l6 6 6-6" />
            </motion.svg>
          </button>

          <AnimatePresence>
            {isBrideOpen && (
              <motion.div
                className="mt-2 overflow-hidden rounded-lg border border-[#e5dcd0] bg-[#faf7f2] p-3.5"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {brideAccounts.map((account, idx) => {
                  const key = `bride-${idx}-${account.holder}`;
                  return (
                    <AccountCard
                      key={key}
                      cardKey={key}
                      account={account}
                      isCopied={copiedKey === key}
                      onCopy={handleCopyAccount}
                    />
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
