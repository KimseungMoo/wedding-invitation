"use client";

import { useCallback } from "react";
import { wedding } from "@/wedding.config";
import { UsExpand, UsWidget } from "./UsWidget";

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

  const extra = [
    ["전화", venue.tel],
    ["주차", venue.parking],
    ["지하철", venue.subway],
    ["버스", venue.bus],
  ] as const;

  return (
    <UsWidget tone="game">
      <p className="us-widget-kicker">장소</p>
      <p className="text-[17px] font-semibold">{venue.name}</p>
      <p className="mt-1 text-[12px] text-[var(--us-game-dim)]">{venue.hall}</p>
      <p className="mt-2 text-[12px] leading-relaxed">{venue.address}</p>
      <div className="us-map-row">
        <a href={kakaoMapUrl} target="_blank" rel="noopener noreferrer">
          카카오맵
        </a>
        <a href={naverMapUrl} target="_blank" rel="noopener noreferrer">
          네이버지도
        </a>
        <button type="button" onClick={handleCopy}>
          주소 복사
        </button>
      </div>
      <UsExpand label="오시는 길 더 보기">
        <dl className="mt-3 space-y-1.5">
          {extra.map(([key, value]) => (
            <div key={key} className="us-game-row">
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <a
          href={`tel:${venue.tel.replace(/-/g, "")}`}
          className="us-accent-link mt-3 block text-center text-[12px] underline-offset-2 hover:underline"
        >
          {venue.tel}
        </a>
      </UsExpand>
    </UsWidget>
  );
};
