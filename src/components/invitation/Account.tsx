"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

interface AccountInfo {
  bank: string;
  accountNumber: string;
  holder: string;
}

interface AccountProps {
  groomAccounts?: AccountInfo[];
  brideAccounts?: AccountInfo[];
}

/**
 * 축의금 계좌 섹션
 * 우아한 화이트 톤 디자인
 */
export const Account = ({
  groomAccounts = [
    { bank: "신한은행", accountNumber: "110-123-456789", holder: "김신랑" },
    { bank: "국민은행", accountNumber: "123-45-6789012", holder: "김아버지" },
    { bank: "우리은행", accountNumber: "1002-123-456789", holder: "김어머니" },
  ],
  brideAccounts = [
    { bank: "하나은행", accountNumber: "123-456789-01234", holder: "이신부" },
    { bank: "농협은행", accountNumber: "123-4567-8901-23", holder: "이아버지" },
    { bank: "신한은행", accountNumber: "110-987-654321", holder: "이어머니" },
  ],
}: AccountProps) => {
  const [isGroomOpen, setIsGroomOpen] = useState(false);
  const [isBrideOpen, setIsBrideOpen] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopyAccount = useCallback(
    async (account: AccountInfo) => {
      const textToCopy = `${account.bank} ${account.accountNumber} ${account.holder}`;
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopiedAccount(account.accountNumber);
        setTimeout(() => setCopiedAccount(null), 2000);
      } catch {
        alert("복사에 실패했습니다.");
      }
    },
    []
  );

  const AccountCard = ({
    account,
    isCopied,
  }: {
    account: AccountInfo;
    isCopied: boolean;
  }) => (
    <motion.div
      className="mb-3 flex items-center justify-between rounded-lg border border-[#e8e2d9] bg-white p-4 last:mb-0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <p className="text-xs text-[#a0a0a0]">{account.bank}</p>
        <p className="text-sm font-light text-[#4a4a4a]">{account.accountNumber}</p>
        <p className="text-xs text-[#8b8b8b]">{account.holder}</p>
      </div>
      <button
        onClick={() => handleCopyAccount(account)}
        className={`rounded-md px-4 py-2 text-xs font-light transition-all ${
          isCopied
            ? "border border-[#8ba5c9] bg-[#8ba5c9]/10 text-[#8ba5c9]"
            : "border border-[#d4c5a9] bg-[#faf9f6] text-[#8b7355] hover:bg-[#f5f0e8]"
        }`}
      >
        {isCopied ? "복사됨" : "복사"}
      </button>
    </motion.div>
  );

  return (
    <section className="bg-[#f8f5f0] px-6 py-20">
      <div className="mx-auto max-w-md">
        {/* === 섹션 제목 === */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 text-[10px] tracking-[0.3em] text-[#a08d6e]">ACCOUNT</p>
          <div className="mx-auto mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4c5a9]/50" />
            <div className="h-1 w-1 rotate-45 border border-[#c9a961]/50" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4c5a9]/50" />
          </div>
          <p className="text-sm font-light text-[#8b8b8b]">
            마음 전하실 곳
          </p>
        </motion.div>

        {/* === 신랑측 === */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            onClick={() => setIsGroomOpen(!isGroomOpen)}
            className="flex w-full items-center justify-between rounded-lg border border-[#d4c5a9]/40 bg-white p-5 transition-all hover:border-[#c9a961]/60"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f0f8]">
                <svg className="h-5 w-5 text-[#8ba5c9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span className="text-sm font-light text-[#4a4a4a]">
                신랑측 계좌번호
              </span>
            </div>
            <motion.svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a0a0a0"
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
                className="mt-2 overflow-hidden rounded-lg bg-[#f5f8fa] p-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {groomAccounts.map((account) => (
                  <AccountCard
                    key={account.accountNumber}
                    account={account}
                    isCopied={copiedAccount === account.accountNumber}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* === 신부측 === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={() => setIsBrideOpen(!isBrideOpen)}
            className="flex w-full items-center justify-between rounded-lg border border-[#d4c5a9]/40 bg-white p-5 transition-all hover:border-[#c9a961]/60"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fdf0f0]">
                <svg className="h-5 w-5 text-[#d4a5a5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span className="text-sm font-light text-[#4a4a4a]">
                신부측 계좌번호
              </span>
            </div>
            <motion.svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a0a0a0"
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
                className="mt-2 overflow-hidden rounded-lg bg-[#fdf8f8] p-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {brideAccounts.map((account) => (
                  <AccountCard
                    key={account.accountNumber}
                    account={account}
                    isCopied={copiedAccount === account.accountNumber}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
