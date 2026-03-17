interface MapEmbedProps {
  /** 장소 이름 */
  venue: string;
  /** 위도 */
  lat: number;
  /** 경도 */
  lng: number;
}

/**
 * 지도 임베드 컴포넌트
 * 카카오맵 link API로 정확한 위치에 마커 표시
 */
export const MapEmbed = ({ venue, lat, lng }: MapEmbedProps) => {
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
