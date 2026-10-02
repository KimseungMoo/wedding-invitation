"use client";

import { useCallback, useState } from "react";
import { wedding, type AccountInfo } from "@/wedding.config";
import { UsExpand, UsWidget } from "./UsWidget";

export const UsAccount = () => {
  const [open, setOpen] = useState<"groom" | "bride" | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = useCallback(async (account: AccountInfo) => {
    try {
      await navigator.clipboard.writeText(
        `${account.bank} ${account.accountNumber} ${account.holder}`
      );
      setCopied(account.accountNumber);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      alert("복사에 실패했습니다.");
    }
  }, []);

  const renderList = (accounts: readonly AccountInfo[]) => (
    <div className="mt-1">
      {accounts.map((account) => (
        <div key={account.accountNumber} className="us-account-item">
          <div className="min-w-0">
            <p className="text-[10px] text-[var(--us-game-dim)]">{account.bank}</p>
            <p className="truncate font-mono text-[12px]">{account.accountNumber}</p>
            <p className="text-[11px] text-[var(--us-game-dim)]">{account.holder}</p>
          </div>
          <button
            type="button"
            onClick={() => handleCopy(account)}
            className="us-accent-link shrink-0 text-[11px]"
          >
            {copied === account.accountNumber ? "복사됨" : "복사"}
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <UsWidget>
      <p className="us-widget-kicker">계좌</p>
      <p className="text-[16px] font-semibold">마음 전하실 곳</p>
      <p className="mt-1 text-[12px] text-[var(--us-game-dim)]">
        신랑측 · 신부측 더미 계좌
      </p>
      <UsExpand label="계좌 펼치기">
        <button
          type="button"
          onClick={() => setOpen((prev) => (prev === "groom" ? null : "groom"))}
          className="mt-3 flex w-full items-center justify-between py-2 text-left text-[13px]"
        >
          <span>신랑측</span>
          <span className="text-[10px] text-[var(--us-game-dim)]">
            {open === "groom" ? "닫기" : "열기"}
          </span>
        </button>
        {open === "groom" ? renderList(wedding.accounts.groom) : null}

        <button
          type="button"
          onClick={() => setOpen((prev) => (prev === "bride" ? null : "bride"))}
          className="flex w-full items-center justify-between py-2 text-left text-[13px]"
        >
          <span>신부측</span>
          <span className="text-[10px] text-[var(--us-game-dim)]">
            {open === "bride" ? "닫기" : "열기"}
          </span>
        </button>
        {open === "bride" ? renderList(wedding.accounts.bride) : null}
      </UsExpand>
    </UsWidget>
  );
};
