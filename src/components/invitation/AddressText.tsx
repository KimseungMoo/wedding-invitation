interface AddressTextProps {
  address: string;
  className?: string;
}

/**
 * 주소 문자열에서 괄호 구간(예: "(논현동 94-9)")이
 * 중간에 어색하게 줄바꿈되지 않도록 괄호 단위로 묶어 렌더링한다.
 */
export const AddressText = ({ address, className = "" }: AddressTextProps) => {
  const match = address.match(/^(.*?)(\s*\([^)]+\))(.*)$/);
  if (!match) {
    return <p className={`break-keep ${className}`}>{address}</p>;
  }

  const [, main, paren, tail] = match;
  return (
    <p className={`break-keep ${className}`}>
      <span>{main.trimEnd()}</span>{" "}
      <span className="inline-block whitespace-nowrap">
        {paren.trim()}
        {tail}
      </span>
    </p>
  );
};
