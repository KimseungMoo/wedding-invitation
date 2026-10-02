import type { ReactNode } from "react";

const PixelSprite = ({
  map,
  palette,
  scale = 3,
  label,
}: {
  map: readonly string[];
  palette: Record<string, string>;
  scale?: number;
  label?: string;
}) => {
  const height = map.length;
  const width = map[0]?.length ?? 0;
  const rects: ReactNode[] = [];

  map.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      const fill = ch === "." ? undefined : palette[ch];
      if (!fill) {
        x += 1;
        continue;
      }
      let run = 1;
      while (x + run < row.length && row[x + run] === ch) run += 1;
      rects.push(
        <rect key={`${x}-${y}`} x={x} y={y} width={run} height={1} fill={fill} />
      );
      x += run;
    }
  });

  return (
    <svg
      width={width * scale}
      height={height * scale}
      viewBox={`0 0 ${width} ${height}`}
      shapeRendering="crispEdges"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className="us-sprite"
    >
      {rects}
    </svg>
  );
};

const GROOM_MAP = [
  "................",
  "......hhhh......",
  ".....hhhhhh.....",
  "....hhhhhhhh....",
  "....hhsssshh....",
  "....hssssssh....",
  "....hseesseh....",
  "....hssssssh....",
  ".....hssssh.....",
  "......ssss......",
  "....nnnnnnnn....",
  "...nnnnwwnnnn...",
  "...nnnnwwnnnn...",
  "...nnnnwwnnnn...",
  "...nnnnnnnnnn...",
  "...nnnnnnnnnn...",
  "....nnppppnn....",
  ".....pppppp.....",
  ".....pppppp.....",
  ".....pppppp.....",
  ".....pp..pp.....",
  ".....kk..kk.....",
  ".....kk..kk.....",
  "....kkk..kkk....",
] as const;

const BRIDE_MAP = [
  "................",
  ".....hhhhhh.....",
  "....hhhhhhhh....",
  "...hhhhhhhhhh...",
  "...hhhsssshhh...",
  "...hhsssssshh...",
  "...hhseessehh...",
  "...hhsssssshh...",
  "....hhsssshh....",
  ".....hssssh.....",
  "......ssss......",
  "....dddddddd....",
  "...dddddddddd...",
  "...dddddddddd...",
  "..dddddddddddd..",
  "..dddddddddddd..",
  "..dddddddddddd..",
  "..dddddddddddd..",
  "...dddddddddd...",
  "...dddddddddd...",
  "....dd....dd....",
  ".....k....k.....",
  ".....k....k.....",
  "....kk....kk....",
] as const;

const GROOM_PALETTE = {
  h: "#2a1a12",
  s: "#f0c4a0",
  e: "#1a120c",
  n: "#3e5a94",
  w: "#f3efe6",
  p: "#4a4846",
  k: "#1c1816",
};

const BRIDE_PALETTE = {
  h: "#241814",
  s: "#f2c8a6",
  e: "#1a120c",
  d: "#a85a6e",
  k: "#1c1816",
};

export const GroomAdventurer = ({
  scale = 3,
  label,
}: {
  scale?: number;
  label?: string;
}) => (
  <PixelSprite
    map={GROOM_MAP}
    palette={GROOM_PALETTE}
    scale={scale}
    label={label}
  />
);

export const BrideAdventurer = ({
  scale = 3,
  label,
}: {
  scale?: number;
  label?: string;
}) => (
  <PixelSprite
    map={BRIDE_MAP}
    palette={BRIDE_PALETTE}
    scale={scale}
    label={label}
  />
);

export const AdventurerPair = ({ scale = 3 }: { scale?: number }) => (
  <div className="us-pair" aria-hidden>
    <GroomAdventurer scale={scale} />
    <BrideAdventurer scale={scale} />
  </div>
);

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
    shapeRendering="crispEdges"
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

export const HollowHeart = ({
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
    shapeRendering="crispEdges"
  >
    <g fill="currentColor">
      <rect x="1" y="0" width="2" height="1" />
      <rect x="4" y="0" width="2" height="1" />
      <rect x="0" y="1" width="1" height="2" />
      <rect x="3" y="1" width="1" height="1" />
      <rect x="6" y="1" width="1" height="2" />
      <rect x="1" y="3" width="1" height="1" />
      <rect x="5" y="3" width="1" height="1" />
      <rect x="2" y="4" width="1" height="1" />
      <rect x="4" y="4" width="1" height="1" />
      <rect x="3" y="5" width="1" height="1" />
    </g>
  </svg>
);

export const PortraitWidget = () => (
  <section className="us-widget-frost us-portrait-tile" aria-label="우리">
    <AdventurerPair scale={3} />
  </section>
);
