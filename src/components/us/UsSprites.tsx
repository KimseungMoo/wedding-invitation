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
  "................................",
  "..........oooooooo..............",
  "........ooHHHHHHHHoo............",
  ".......oHHHHHHHHHHHHo...........",
  ".......oHHHHhhhhHHHHo...........",
  ".......oHHHhSSSSHHhHo...........",
  ".......oHHHSSSSSSHHHo...........",
  ".......oHHHSwoowSHHHo...........",
  ".......oHHHSSSSSSHHHo...........",
  "........oHHSSSsSSHHo............",
  ".........oSSSSSSSSo.............",
  "..........osSSSSso..............",
  ".......ooDDcCIICcDDoo...........",
  "......oDcCcCIIIICcCDo...........",
  ".....oDCcCCCIIIIICCcDo..........",
  ".....oCcCCCCIIIIICCCco..........",
  ".....oCcCCCCIBBIICCCco..........",
  ".....ocNCCCCCCCCCCCNco..........",
  ".....o.NcCCCCCCCCCcNo...........",
  "......o.CCCCCCCCCCCc.o..........",
  "......o.CCCPPPPPPCC.o...........",
  ".......oCCPPPPPPPCCCo...........",
  "........oPPPPPPPPPPo............",
  "........oPPPo..oPPPo............",
  "........oPPPo..oPPPo............",
  "........oKKKo..oKKKo............",
  "........oKKKo..oKKKo............",
  ".........ooo....ooo.............",
  "................................",
  "................................",
  "................................",
  "................................",
] as const;

const BRIDE_MAP = [
  "................................",
  ".........oooooooooo.............",
  ".......ooHHHHHHHHHHoo...........",
  "......oHHHHHHHHHHHHHHo..........",
  "......oHHHHHhhhhhHHHHo..........",
  "......oHHHHhSSSSShHHHo..........",
  "......oHHHHSSSSSSHHHHo..........",
  "......oHHHHSwoowSHHHHo..........",
  "......oHHHHSSSSSSHHHHo..........",
  ".......oHHHSSSsSSHHHo...........",
  "........oHHssSSsHHo.............",
  "......ooHHTTTTTTTTHHoo..........",
  ".....oHHHhGGGGGGGghHHHo.........",
  ".....oHHhGGGGIIIIGGhHHo.........",
  ".....oHHhGGGITTTIIGGhHo.........",
  ".....oHHh.GGGGGGGG.hHHo.........",
  ".....oHHN.GGGGGGGG.NHHo.........",
  ".....oHHh.GGGGGGGG.hHHo.........",
  ".....oHHhGGGGGGGGGGhHHo.........",
  ".....oHHhGGGGGGGGGGhHHo.........",
  "......oHhQGGGGGGGGghHo..........",
  "......oH.QGGGGGGGGg.Ho..........",
  ".......o.QGGGGGGGGg.o...........",
  "........oGGGGGGGGGo.............",
  "........oGGGGo.oGGo.............",
  ".........oGGGo.oGo..............",
  ".........oKKKo.oKo..............",
  ".........oKKKo.oKo..............",
  "..........ooo...oo..............",
  "................................",
  "................................",
  "................................",
] as const;

const GROOM_PALETTE = {
  o: "#0c0a08",
  H: "#1a1410",
  h: "#3a2e24",
  S: "#f0c4a0",
  s: "#c8946c",
  w: "#fff8f0",
  C: "#6b4528",
  c: "#8d5c38",
  D: "#3f2a16",
  I: "#d8c8a8",
  B: "#c4a060",
  P: "#35322f",
  p: "#4a4642",
  K: "#16120e",
  N: "#e8b890",
};

const BRIDE_PALETTE = {
  o: "#0c0a08",
  H: "#1a1410",
  h: "#3a2e24",
  S: "#f0c4a0",
  s: "#c8946c",
  w: "#fff8f0",
  I: "#d8c8a8",
  N: "#e8b890",
  T: "#efe4d2",
  G: "#3a5a54",
  g: "#527870",
  Q: "#2a423e",
  K: "#16120e",
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

export const AdventurerPair = ({ scale = 2 }: { scale?: number }) => (
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
    <AdventurerPair scale={2} />
  </section>
);
