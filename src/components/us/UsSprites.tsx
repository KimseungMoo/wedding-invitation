const BRIDE = [
  "....ffff....",
  "...hhhhhh...",
  "..hhhhhhhh..",
  "..hhhhhhhh..",
  "..hhsssshh..",
  "..hseesseh..",
  "..hssssssh..",
  "...sbmmbs...",
  "....ssss....",
  "...WWWWWW...",
  "..WWWWWWWW..",
  "..WWWkWWWW..",
  "..WWWWWWWW..",
  "...WWWWWW...",
  "...WW..WW...",
  "....s..s....",
];

const GROOM = [
  "...hhhhhh...",
  "..hhhhhhhh..",
  "..hhhhhhhh..",
  "..hhsssshh..",
  "..hswesseh..",
  "..hssssssh..",
  "...sbmmbs...",
  "....uuuu....",
  "...JJJJJJ...",
  "..JJJJJJJJ..",
  "..JJJJJJJJ..",
  "..JJJJJJJJ..",
  "...JJ..JJ...",
  "...pp..pp...",
  "...pp..pp...",
  "............",
];

const BRIDE_COLORS: Record<string, string> = {
  h: "#4a2f22",
  f: "#f2a4b8",
  s: "#f0c4a8",
  e: "#2a1810",
  b: "#f4b0b0",
  m: "#d47a7a",
  W: "#f7f2ea",
  k: "#f2b8c8",
};

const GROOM_COLORS: Record<string, string> = {
  h: "#1c1c1c",
  s: "#efc2a4",
  e: "#2a1810",
  w: "#1c1c1c",
  b: "#f4b0b0",
  m: "#d47a7a",
  u: "#f5f5f5",
  J: "#2a2a2e",
  p: "#2a2a2e",
};

const PixelGrid = ({
  rows,
  colors,
  pixel,
}: {
  rows: readonly string[];
  colors: Record<string, string>;
  pixel: number;
}) => {
  const cells: React.ReactNode[] = [];
  rows.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      const fill = colors[ch];
      if (!fill) return;
      cells.push(
        <rect
          key={`${x}-${y}`}
          x={x * pixel}
          y={y * pixel}
          width={pixel}
          height={pixel}
          fill={fill}
        />
      );
    });
  });

  return (
    <svg
      width={rows[0].length * pixel}
      height={rows.length * pixel}
      viewBox={`0 0 ${rows[0].length * pixel} ${rows.length * pixel}`}
      aria-hidden
    >
      {cells}
    </svg>
  );
};

export const PixelHeart = ({
  size = 12,
  className,
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 7 6"
    aria-hidden
  >
    <g fill="currentColor">
      <rect x="1" y="0" width="2" height="1" />
      <rect x="4" y="0" width="2" height="1" />
      <rect x="0" y="1" width="7" height="2" />
      <rect x="1" y="3" width="5" height="1" />
      <rect x="2" y="4" width="3" height="1" />
      <rect x="3" y="5" width="1" height="1" />
    </g>
  </svg>
);

export const CoupleSprites = ({
  pixel = 5,
  className,
}: {
  pixel?: number;
  className?: string;
}) => (
  <div className={`flex items-end justify-center -space-x-1 ${className ?? ""}`}>
    <PixelGrid rows={BRIDE} colors={BRIDE_COLORS} pixel={pixel} />
    <PixelGrid rows={GROOM} colors={GROOM_COLORS} pixel={pixel} />
  </div>
);

export const PortraitWidget = () => (
  <section className="us-widget-frost us-portrait-tile" aria-label="우리">
    <CoupleSprites pixel={4} />
    <span className="us-slot-badge">
      <PixelHeart size={11} />
    </span>
  </section>
);
