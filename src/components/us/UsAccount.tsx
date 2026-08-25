"use client";

import { useCallback, useState } from "react";
import { wedding, type AccountInfo } from "@/wedding.config";
import { UsPanel } from "./UsPanel";

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
    <div className="mt-2 space-y-2">
      {accounts.map((account) => (
        <div
          key={account.accountNumber}
          className="flex items-center justify-between gap-3 rounded border border-[var(--us-line)] bg-[var(--us-ink-3)] px-3 py-2"
        >
          <div className="min-w-0">
            <p className="font-mono text-[10px] text-[var(--us-dim)]">{account.bank}</p>
            <p className="truncate font-mono text-[12px] text-[var(--us-paper)]">
              {account.accountNumber}
            </p>
            <p className="text-[11px] text-[var(--us-dim)]">{account.holder}</p>
          </div>
          <button
            type="button"
            onClick={() => handleCopy(account)}
            className="shrink-0 font-mono text-[10px] text-[var(--us-amber)]"
          >
            {copied === account.accountNumber ? "복사됨" : "복사"}
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <UsPanel label="ACCOUNT" title="마음 전하실 곳">
      <button
        type="button"
        onClick={() => setOpen((prev) => (prev === "groom" ? null : "groom"))}
        className="flex w-full items-center justify-between py-2 font-mono text-[13px] text-[var(--us-paper)]"
      >
        <span>
          <span className="text-[var(--us-groom)]">❯</span> 신랑측
        </span>
        <span className="text-[10px] text-[var(--us-dim)]">
          {open === "groom" ? "닫기" : "열기"}
        </span>
      </button>
      {open === "groom" ? renderList(wedding.accounts.groom) : null}

      <button
        type="button"
        onClick={() => setOpen((prev) => (prev === "bride" ? null : "bride"))}
        className="mt-2 flex w-full items-center justify-between py-2 font-mono text-[13px] text-[var(--us-paper)]"
      >
        <span>
          <span className="text-[var(--us-bride)]">❯</span> 신부측
        </span>
        <span className="text-[10px] text-[var(--us-dim)]">
          {open === "bride" ? "닫기" : "열기"}
        </span>
      </button>
      {open === "bride" ? renderList(wedding.accounts.bride) : null}
    </UsPanel>
  );
};
