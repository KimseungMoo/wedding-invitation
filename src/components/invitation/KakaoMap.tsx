"use client";

interface KakaoMapProps {
  /** 장소 이름 */
  venue: string;
  /** 위도 */
  lat: number;
  /** 경도 */
  lng: number;
}

/**
 * 카카오맵 iframe 임베드 컴포넌트
 * API 키 없이 카카오맵을 표시
 */
export const KakaoMap = ({ venue, lat, lng }: KakaoMapProps) => {
  const encodedVenue = encodeURIComponent(venue);
  const src = `https://map.kakao.com/link/map/${encodedVenue},${lat},${lng}`;

  return (
    <iframe
      src={src}
      className="aspect-video w-full rounded-lg"
      allowFullScreen
      loading="lazy"
      title={`${venue} 지도`}
    />
  );
};
