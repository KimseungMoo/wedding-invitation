"use client";

import { useCallback } from "react";
import { wedding } from "@/wedding.config";
import { UsPanel } from "./UsPanel";

export const UsVenue = () => {
  const { venue } = wedding;
  const encoded = encodeURIComponent(venue.address);
  const kakaoMapUrl = `https://map.kakao.com/link/search/${encoded}`;
  const naverMapUrl = `https://map.naver.com/v5/search/${encoded}`;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(venue.copyAddress);
      alert("주소가 복사되었습니다.");
    } catch {
      alert("주소 복사에 실패했습니다.");
    }
  }, [venue.copyAddress]);

  const rows = [
    ["name", venue.name],
    ["hall", venue.hall],
    ["addr", venue.address],
    ["tel", venue.tel],
    ["parking", venue.parking],
    ["subway", venue.subway],
    ["bus", venue.bus],
  ] as const;

  return (
    <UsPanel label="VENUE" title="location">
      <div className="space-y-1.5 font-mono text-[12px]">
        {rows.map(([key, value]) => (
          <p key={key} className="leading-relaxed">
            <span className="text-[var(--us-sky)]">{key}</span>
            <span className="text-[var(--us-dim)]"> = </span>
            <span className="font-sans text-[var(--us-paper)]">{value}</span>
          </p>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <a
          href={kakaoMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded border border-[var(--us-line)] bg-[var(--us-ink-3)] py-2 text-center font-mono text-[10px] text-[var(--us-paper)]"
        >
          카카오맵
        </a>
        <a
          href={naverMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded border border-[var(--us-line)] bg-[var(--us-ink-3)] py-2 text-center font-mono text-[10px] text-[var(--us-paper)]"
        >
          네이버지도
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded border border-[var(--us-line)] bg-[var(--us-ink-3)] py-2 font-mono text-[10px] text-[var(--us-paper)]"
        >
          주소 복사
        </button>
      </div>
      <a
        href={`tel:${venue.tel.replace(/-/g, "")}`}
        className="mt-2 block text-center font-mono text-[11px] text-[var(--us-amber)] underline-offset-2 hover:underline"
      >
        {venue.tel}
      </a>
    </UsPanel>
  );
};
