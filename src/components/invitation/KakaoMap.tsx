"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  address: string;
  venue: string;
}

/**
 * 카카오맵 컴포넌트
 * 주소 기반으로 지도를 렌더링하고 마커를 표시
 */
export const KakaoMap = ({ address, venue }: KakaoMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
    if (!apiKey || apiKey.includes("여기에")) return;

    // 이미 로드된 경우
    if (window.kakao?.maps) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services&autoload=false`;
    script.onload = () => setIsLoaded(true);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    window.kakao.maps.load(() => {
      const map = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(37.5145, 127.0462),
        level: 3,
      });

      // === 주소로 좌표 검색 ===
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result: any[], status: string) => {
        if (status !== window.kakao.maps.services.Status.OK) return;

        const coords = new window.kakao.maps.LatLng(
          result[0].y,
          result[0].x
        );

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          map,
          position: coords,
        });

        // 인포윈도우
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:8px 12px;font-size:13px;font-weight:500;white-space:nowrap;">${venue}</div>`,
        });
        infowindow.open(map, marker);

        map.setCenter(coords);
      });
    });
  }, [isLoaded, address, venue]);

  return (
    <div
      ref={mapRef}
      className="aspect-video w-full rounded-lg"
    />
  );
};
