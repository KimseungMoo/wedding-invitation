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
  const query = encodeURIComponent(`${address} ${venue}`);
  const src = `https://maps.google.com/maps?q=${query}&t=&z=16&ie=UTF8&iwloc=B&output=embed`;

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
