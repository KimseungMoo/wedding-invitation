interface MapEmbedProps {
  /** 주소 */
  address: string;
  /** 장소 이름 */
  venue: string;
}

/**
 * 지도 임베드 컴포넌트
 * Google Maps embed (API 키 불필요, iframe 안정적 렌더링)
 */
export const MapEmbed = ({ address, venue }: MapEmbedProps) => {
  const query = encodeURIComponent(`${venue} ${address}`);
  const src = `https://www.google.com/maps?q=${query}&z=16&output=embed`;

  return (
    <iframe
      src={src}
      className="aspect-video w-full rounded-lg"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title={`${venue} 지도`}
    />
  );
};
