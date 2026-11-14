"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const DOOR_SIDES = ["left", "right"] as const;

const LANE_CENTERS = [25, 48, 71, 94] as const;

const LATTICE_PETAL_CENTERS: ReadonlyArray<{ cx: number; cy: number }> = [
  { cx: 25, cy: 252 },
  { cx: 48, cy: 252 },
  { cx: 71, cy: 252 },
  { cx: 94, cy: 252 },
  { cx: 36.5, cy: 271 },
  { cx: 59.5, cy: 271 },
  { cx: 82.5, cy: 271 },
  { cx: 25, cy: 290 },
  { cx: 48, cy: 290 },
  { cx: 71, cy: 290 },
  { cx: 94, cy: 290 },
  { cx: 36.5, cy: 309 },
  { cx: 59.5, cy: 309 },
  { cx: 82.5, cy: 309 },
  { cx: 25, cy: 328 },
  { cx: 48, cy: 328 },
  { cx: 71, cy: 328 },
  { cx: 94, cy: 328 },
];

const petalPath = (cx: number, cy: number, rx = 11, ry = 18) =>
  `M ${cx} ${cy - ry} C ${cx + rx} ${cy - ry * 0.42}, ${cx + rx} ${cy + ry * 0.42}, ${cx} ${cy + ry} C ${cx - rx} ${cy + ry * 0.42}, ${cx - rx} ${cy - ry * 0.42}, ${cx} ${cy - ry} Z`;

const horizontalPetalPath = (cx: number, cy: number, rx = 11, ry = 14.5) =>
  `M ${cx - rx} ${cy} C ${cx - rx * 0.42} ${cy - ry * 0.52}, ${cx + rx * 0.42} ${cy - ry * 0.52}, ${cx + rx} ${cy} C ${cx + rx * 0.42} ${cy + ry * 0.52}, ${cx - rx * 0.42} ${cy + ry * 0.52}, ${cx - rx} ${cy} Z`;

function ChapelDoorPanelSvg({ side }: { side: (typeof DOOR_SIDES)[number] }) {
  const isLeft = side === "left";
  const handleX = isLeft ? 109 : 10;
  const clipId = `door-lattice-clip-${side}`;
  const grainId = `door-wood-grad-${side}`;
  const fluteId = `door-flute-grad-${side}`;

  return (
    <svg
      viewBox="0 0 119 384"
      className="h-full w-full block"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={grainId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9e673a" />
          <stop offset="50%" stopColor="#875229" />
          <stop offset="100%" stopColor="#6e3f1c" />
        </linearGradient>
        <linearGradient id={fluteId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#48260e" stopOpacity="0.62" />
          <stop offset="50%" stopColor="#966034" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#48260e" stopOpacity="0.62" />
        </linearGradient>
        <clipPath id={clipId}>
          <rect x="13.5" y="232" width="92" height="122" rx="1" />
        </clipPath>
      </defs>

      {/* Main teak wood leaf surface */}
      <rect x="0" y="0" width="119" height="384" fill={`url(#${grainId})`} />

      {/* Outer stile & rail recessed perimeter */}
      <rect
        x="7"
        y="9"
        width="105"
        height="365"
        fill="none"
        stroke="#47250e"
        strokeWidth="1.2"
        opacity="0.72"
      />
      <rect
        x="10.5"
        y="12.5"
        width="98"
        height="358"
        fill="none"
        stroke="#b9814f"
        strokeWidth="0.7"
        opacity="0.45"
      />

      {/* Inner full-height recessed field */}
      <rect
        x="13.5"
        y="15.5"
        width="92"
        height="352"
        fill="#7c4922"
        fillOpacity="0.42"
        stroke="#46240d"
        strokeWidth="0.9"
      />

      {/* 4 tall vertical fluted lanes tapering into lower petal relief */}
      {LANE_CENTERS.map((cx) => (
        <g key={cx}>
          <path
            d={`M ${cx - 8.2} 22 L ${cx + 8.2} 22 L ${cx + 8.2} 226 Q ${cx + 8.2} 238 ${cx} 244 Q ${cx - 8.2} 238 ${cx - 8.2} 226 Z`}
            fill={`url(#${fluteId})`}
            stroke="#47250e"
            strokeWidth="0.9"
            opacity="0.92"
          />
          <line
            x1={cx - 3.6}
            y1="26"
            x2={cx - 3.6}
            y2="228"
            stroke="#b9814f"
            strokeWidth="0.55"
            opacity="0.38"
          />
          <line
            x1={cx + 3.6}
            y1="26"
            x2={cx + 3.6}
            y2="228"
            stroke="#42210b"
            strokeWidth="0.55"
            opacity="0.48"
          />
        </g>
      ))}

      {/* Lower interlocking pointed-petal relief matching the real Chapel Hall doors */}
      <g clipPath={`url(#${clipId})`}>
        <rect x="13.5" y="232" width="92" height="122" fill="#6b3d1a" fillOpacity="0.5" />
        {LATTICE_PETAL_CENTERS.map(({ cx, cy }, idx) => (
          <g key={`v-${idx}`}>
            <path
              d={petalPath(cx, cy, 11, 18)}
              fill="#89542b"
              fillOpacity="0.54"
              stroke="#45230d"
              strokeWidth="1.05"
            />
            <path
              d={petalPath(cx, cy, 7.8, 13.5)}
              fill="none"
              stroke="#b8804e"
              strokeWidth="0.65"
              opacity="0.55"
            />
          </g>
        ))}
        {LATTICE_PETAL_CENTERS.slice(0, 14).map(({ cx, cy }, idx) => (
          <path
            key={`h-${idx}`}
            d={horizontalPetalPath(cx, cy + 9.5, 11, 14.5)}
            fill="none"
            stroke="#46240d"
            strokeWidth="0.8"
            opacity="0.65"
          />
        ))}
      </g>

      {/* Bottom kick-rail divider */}
      <line
        x1="13.5"
        y1="354"
        x2="105.5"
        y2="354"
        stroke="#b9814f"
        strokeWidth="0.7"
        opacity="0.42"
      />

      {/* Low-mounted cylindrical vertical pull handle near center seam */}
      <g>
        <rect
          x={handleX - 1.5}
          y="236"
          width="5.5"
          height="114"
          rx="2.5"
          fill="#271205"
          opacity="0.32"
        />
        <rect
          x={handleX - 2.3}
          y="234"
          width="4.6"
          height="9.5"
          rx="1.2"
          fill="#dcd9d2"
          stroke="#8a857d"
          strokeWidth="0.45"
        />
        <rect
          x={handleX - 2.3}
          y="339"
          width="4.6"
          height="9.5"
          rx="1.2"
          fill="#dcd9d2"
          stroke="#8a857d"
          strokeWidth="0.45"
        />
        <rect
          x={handleX - 2.1}
          y="243.5"
          width="4.2"
          height="95.5"
          rx="1.2"
          fill="#ab7240"
          stroke="#4a270f"
          strokeWidth="0.45"
        />
        <line
          x1={handleX - 0.6}
          y1="245"
          x2={handleX - 0.6}
          y2="337"
          stroke="#d8a370"
          strokeWidth="0.7"
          opacity="0.58"
        />
      </g>
    </svg>
  );
}

export const DoorOpen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const router = useRouter();

  const handleDoorClick = useCallback(() => {
    if (isOpen) return;
    setIsOpen(true);

    setTimeout(() => {
      setShowTransition(true);
    }, 2250);

    setTimeout(() => {
      router.push("/invitation");
    }, 2900);
  }, [isOpen, router]);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#ede5d8] select-none">
      {/* Entire Architectural Lobby Scene (Wall + Floor + Doorway) with subtle half-step forward motion */}
      <motion.div
        animate={{
          scale: isOpen ? 1.24 : 1,
          y: isOpen ? 6 : 0,
        }}
        transition={{
          duration: 2.1,
          delay: 0.35,
          ease: [0.38, 0.04, 0.22, 1],
        }}
        style={{ transformOrigin: "50% 58%" }}
        className="absolute inset-0 will-change-transform"
      >
        {/* 1. Cream Travertine Ashlar Stone Wall (Top 79% down to Floor Horizon) */}
        <div
          className="absolute inset-x-0 top-0 bottom-[21%] border-b-2 border-[#cbbca4]"
          style={{
            backgroundColor: "#ece3d5",
            backgroundImage: `
              radial-gradient(circle at 50% 34%, rgba(255,251,244,0.68) 0%, rgba(232,221,203,0.45) 58%, rgba(206,191,168,0.55) 100%),
              repeating-linear-gradient(0deg, rgba(152,134,108,0.09) 0px, rgba(152,134,108,0.09) 1px, transparent 1px, transparent 44px),
              repeating-linear-gradient(90deg, rgba(152,134,108,0.08) 0px, rgba(152,134,108,0.08) 1px, transparent 1px, transparent 74px)
            `,
          }}
        >
          {/* Stone baseboard plinth where wall meets marble floor */}
          <div
            className="absolute inset-x-0 bottom-0 h-[14px] border-t border-white/55"
            style={{
              background: "linear-gradient(180deg, #dfd4c0 0%, #cfc1a9 100%)",
            }}
          />
        </div>

        {/* 2. Polished Cream Marble Lobby Floor (Bottom 21% directly below door threshold) */}
        <div
          className="absolute inset-x-0 top-[79%] bottom-0 overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #dfd6c7 0%, #ede6da 26%, #f4efe6 65%, #f8f4ed 100%)",
          }}
        >
          {/* Perspective marble tile joints */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(180deg, rgba(160,144,120,0.16) 0px, transparent 1px),
                linear-gradient(180deg, transparent 46px, rgba(160,144,120,0.12) 47px, transparent 48px),
                linear-gradient(180deg, transparent 104px, rgba(160,144,120,0.10) 105px, transparent 106px)
              `,
            }}
          />

          {/* Mirror reflection of wooden doors on polished marble floor */}
          <motion.div
            animate={{ opacity: isOpen ? 0.28 : 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[min(226px,29dvh)] sm:w-[min(246px,31dvh)] h-[96px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(118,68,30,0.22) 0%, rgba(118,68,30,0.07) 48%, transparent 100%)",
              filter: "blur(4px)",
            }}
          />

          {/* Trapezoid warm chapel sunlight spilling onto the lobby marble floor as doors open */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.35 }}
            animate={{
              opacity: isOpen ? 1 : 0,
              scaleX: isOpen ? 1 : 0.35,
            }}
            transition={{ duration: 1.45, delay: 0.18, ease: "easeOut" }}
            aria-hidden="true"
            className="pointer-events-none absolute -top-[2px] left-1/2 -translate-x-1/2 w-[300px] sm:w-[330px] h-[165px]"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(255,249,232,0.92) 0%, rgba(255,244,214,0.52) 45%, transparent 78%)",
              clipPath: "polygon(16% 0%, 84% 0%, 100% 100%, 0% 100%)",
            }}
          />
        </div>

        {/* 3. Stepped Travertine Stone Doorway Assembly anchored squarely on the floor horizon */}
        <div className="absolute left-1/2 bottom-[21%] -translate-x-1/2 flex items-end justify-center">
          {/* Symmetrical glowing frosted wall sconces */}
          {DOOR_SIDES.map((side) => {
            const isLeft = side === "left";
            return (
              <motion.div
                key={`sconce-${side}`}
                animate={{
                  opacity: isOpen ? 0.92 : [0.88, 1, 0.88],
                }}
                transition={{
                  duration: 3.2,
                  repeat: isOpen ? 0 : Infinity,
                  ease: "easeInOut",
                }}
                aria-hidden="true"
                className={`pointer-events-none flex flex-col items-center absolute top-[43%] -translate-y-1/2 z-15 ${
                  isLeft
                    ? "-left-[34px] sm:-left-[42px]"
                    : "-right-[34px] sm:-right-[42px]"
                }`}
              >
                <div
                  className="absolute -inset-[22px] rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,214,148,0.55) 0%, rgba(255,214,148,0.16) 48%, transparent 74%)",
                  }}
                />
                <div className="w-[10px] h-[5px] bg-[#b5743c] rounded-t-[1px]" />
                <div
                  className="relative w-[18px] sm:w-[20px] h-[66px] sm:h-[72px] rounded-[2px] border border-[#c9a372]/60"
                  style={{
                    background:
                      "linear-gradient(90deg, #f9e3bc 0%, #fff7e8 50%, #f1d4a4 100%)",
                    boxShadow: "0 0 18px rgba(255, 210, 140, 0.58)",
                  }}
                >
                  <div className="absolute inset-x-0 top-[8px] h-[1px] bg-[#8e6338]/45" />
                  <div className="absolute inset-x-0 bottom-[8px] h-[1px] bg-[#8e6338]/45" />
                </div>
                <div className="w-[10px] h-[5px] bg-[#b5743c] rounded-b-[1px]" />
              </motion.div>
            );
          })}

          {/* 3-step concentric travertine stone casing sitting flush on the floor */}
          <div
            onClick={handleDoorClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleDoorClick();
              }
            }}
            aria-label="채플홀 문을 열어주세요"
            className={`group relative pt-[11px] px-[11px] pb-0 bg-[#dfd3be] border border-b-0 border-[#c2b197] shadow-[0_-8px_42px_-12px_rgba(58,40,20,0.28),-12px_0_28px_-14px_rgba(58,40,20,0.22),12px_0_28px_-14px_rgba(58,40,20,0.22)] ${
              isOpen ? "cursor-default" : "cursor-pointer"
            }`}
          >
            <div className="pt-[7px] px-[7px] pb-0 bg-[#ece3d3] border border-b-0 border-[#cbbba1] shadow-[inset_0_1px_2px_rgba(255,255,255,0.75)]">
              <div className="pt-[5px] px-[5px] pb-0 bg-[#c8b79d] border border-b-0 border-[#aa977b] shadow-[inset_0_3px_8px_rgba(52,36,18,0.26)]">
                {/* Doorway portal opening (responsive height so top header never overlaps) */}
                <div
                  className="relative w-[min(226px,29dvh)] h-[min(360px,46dvh)] sm:w-[min(246px,31dvh)] sm:h-[min(390px,48dvh)] overflow-hidden bg-[#f6f1e7]"
                  style={{ perspective: "1050px" }}
                >
                  {/* Single continuous Chapel Interior behind the doors */}
                  <div className="absolute inset-0 overflow-hidden bg-[#f7f2e8]">
                    <motion.div
                      initial={{ scale: 1.06 }}
                      animate={{ scale: isOpen ? 1 : 1.06 }}
                      transition={{
                        duration: 2.2,
                        delay: 0.2,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="relative w-full h-full"
                      style={{ transformOrigin: "50% 48%" }}
                    >
                      <Image
                        src="/chapel-illustration.png"
                        alt="더 채플 앳 청담 채플홀"
                        fill
                        className="object-cover"
                        style={{ objectPosition: "50% 18%" }}
                        priority
                      />
                    </motion.div>

                    {/* Ambient doorway lintel & jamb shadow cast onto interior */}
                    <motion.div
                      animate={{ opacity: isOpen ? 0.35 : 1 }}
                      transition={{ duration: 1.6, ease: "easeOut" }}
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: `
                          linear-gradient(180deg, rgba(62,42,22,0.32) 0%, rgba(62,42,22,0.08) 18%, transparent 42%),
                          radial-gradient(ellipse at 50% 55%, transparent 45%, rgba(74,52,28,0.26) 100%)
                        `,
                      }}
                    />

                    {/* Warm sunlit bloom rising inside the threshold */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isOpen ? 0.55 : 0 }}
                      transition={{ duration: 1.7, delay: 0.45, ease: "easeOut" }}
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 58%, rgba(255,250,236,0.78) 0%, rgba(255,244,218,0.26) 52%, transparent 80%)",
                      }}
                    />
                  </div>

                  {/* 3D Wooden Door Leaves with 7px solid teak edge thickness */}
                  {DOOR_SIDES.map((side) => {
                    const isLeft = side === "left";
                    return (
                      <motion.div
                        key={side}
                        initial={{ rotateY: 0 }}
                        animate={{ rotateY: isOpen ? (isLeft ? 78 : -78) : 0 }}
                        transition={{
                          duration: 1.72,
                          delay: 0.12,
                          ease: [0.32, 0.04, 0.18, 1],
                        }}
                        style={{
                          transformStyle: "preserve-3d",
                          transformOrigin: isLeft ? "left center" : "right center",
                        }}
                        className={`absolute top-0 bottom-0 w-1/2 z-20 ${
                          isLeft ? "left-0" : "right-0"
                        }`}
                      >
                        {/* Front wooden panel face */}
                        <div
                          className="absolute inset-0"
                          style={{ backfaceVisibility: "hidden" }}
                        >
                          <ChapelDoorPanelSvg side={side} />
                          {/* Dynamic shading as door leaf turns away from lobby light */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isOpen ? 0.34 : 0 }}
                            transition={{ duration: 1.65, delay: 0.12, ease: "easeOut" }}
                            className="pointer-events-none absolute inset-0 bg-[#1e0e04]"
                          />
                        </div>

                        {/* 7px solid teak wood slab thickness along the center meeting stile */}
                        <div
                          aria-hidden="true"
                          className={`absolute top-0 bottom-0 w-[7px] border-x border-[#ffd7aa]/25 ${
                            isLeft ? "-right-[3.5px]" : "-left-[3.5px]"
                          }`}
                          style={{
                            background:
                              "linear-gradient(180deg, #5c3416 0%, #46250d 50%, #351b08 100%)",
                            transform: isLeft ? "rotateY(90deg)" : "rotateY(-90deg)",
                          }}
                        />
                      </motion.div>
                    );
                  })}

                  {/* Center meeting seam line & initial unlatch light flash */}
                  <motion.div
                    animate={{ opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.25, delay: 0.1 }}
                    className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-[1.5px] -translate-x-1/2 bg-[#2a1406]/80 z-24"
                  />
                  <motion.div
                    initial={{ opacity: 0.35 }}
                    animate={{
                      opacity: isOpen ? [0.4, 0.92, 0] : [0.28, 0.65, 0.28],
                    }}
                    transition={{
                      duration: isOpen ? 0.55 : 3.0,
                      repeat: isOpen ? 0 : Infinity,
                      ease: "easeInOut",
                    }}
                    className="pointer-events-none absolute left-1/2 top-1 bottom-1 w-[3px] -translate-x-1/2 z-25"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,244,214,0.2), rgba(255,246,222,0.92), rgba(255,244,214,0.35))",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fixed UI Overlays (outside the scaling scene so text never distorts or crops) */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: isOpen ? 0 : 1,
          y: isOpen ? -8 : 0,
        }}
        transition={{
          duration: isOpen ? 0.5 : 0.7,
          delay: isOpen ? 0.1 : 0,
          ease: "easeOut",
        }}
        className="pointer-events-none absolute inset-x-0 top-[24px] sm:top-[32px] z-35 text-center px-6"
      >
        <p className="text-[10px] tracking-[0.34em] uppercase text-[#847056] font-serif mb-1">
          The Chapel at Cheongdam
        </p>
        <h1 className="text-[20px] sm:text-[22px] tracking-[0.2em] font-serif text-[#3f2f1e]">
          SEUNGMOO &amp; EUNJI
        </h1>
        <p className="mt-1 text-[11px] tracking-[0.16em] text-[#76634b] font-serif">
          2027. 02. 21. SUN PM 12:20
        </p>
      </motion.header>

      <motion.footer
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isOpen ? 0 : 1,
          y: isOpen ? 8 : 0,
        }}
        transition={{
          duration: isOpen ? 0.5 : 0.7,
          delay: isOpen ? 0.1 : 0.2,
          ease: "easeOut",
        }}
        className="pointer-events-none absolute inset-x-0 bottom-[26px] sm:bottom-[34px] z-35 text-center px-6"
      >
        <motion.p
          animate={{ opacity: isOpen ? 0 : [0.55, 1, 0.55] }}
          transition={{ duration: 2.5, repeat: isOpen ? 0 : Infinity, ease: "easeInOut" }}
          className="text-[12px] tracking-[0.16em] text-[#574430] font-serif"
        >
          문을 터치해 입장해 주세요
        </motion.p>
        <p className="mt-1 text-[10px] tracking-[0.22em] uppercase text-[#8d7a61] font-serif">
          Tap the Chapel Doors
        </p>
      </motion.footer>

      {/* Silk ivory transition veil into main invitation */}
      <AnimatePresence>
        {showTransition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-[#faf7f2] pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
