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

// Original 16x16 NES adventurer — red cap / blue shirt. No M, mushroom, or Nintendo marks.
const GROOM_MAP = [
  "................",
  ".....ooooo......",
  "....oRRRRRo.....",
  "....oHHHHHo.....",
  "...oHSeSSeHo....",
  "...oSSSSSSSo....",
  "....oSSSSSo.....",
  "...oBBBBBBBo....",
  "..oBBBBBBBBBo...",
  "...oBBBBBBBo....",
  "...on.BB.no.....",
  "....onn.nno.....",
  "....oKK.KKo.....",
  ".....oo.oo......",
  "................",
  "................",
] as const;

// Original 16x16 partner — black bob, purple dress. Same world as the 시안.
const BRIDE_MAP = [
  "................",
  ".....oooooo.....",
  "....oHHHHHHo....",
  "...oHHHHHHHHo...",
  "...oHSeSSeHHo...",
  "...oHSSSSSHHo...",
  "....oSSSSSSo....",
  "...oPPPPPPPPo...",
  "...oPPPPPPPPo...",
  "...oPPPPPPPPo...",
  "...oPPPPPPPPo...",
  "....oPPPPPPo....",
  "....oPP.PPo.....",
  "....oKK.KKo.....",
  ".....oo.oo......",
  "................",
] as const;

const GROOM_PALETTE = {
  o: "#140806",
  e: "#140806",
  R: "#e43428",
  H: "#5a3218",
  S: "#f2c4a0",
  B: "#2c58c8",
  n: "#8a4c28",
  K: "#241810",
};

const BRIDE_PALETTE = {
  o: "#140806",
  e: "#140806",
  H: "#1a1216",
  S: "#f2c4a0",
  P: "#7a3d5c",
  K: "#2a2438",
};

export const GroomAdventurer = ({
  scale = 2,
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
  scale = 2,
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
