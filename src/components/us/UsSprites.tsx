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
  className,
}: {
  className?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 200 210"
    role="img"
    aria-label="승무와 은지"
  >
    <g>
      <path
        d="M28 108c8-14 28-18 44-18s36 4 44 18l8 86H20z"
        fill="#f6f1ea"
      />
      <path d="M64 132l8 2 4 12-8-3-8 3z" fill="#f2b8c8" />
      <ellipse cx="72" cy="86" rx="10" ry="12" fill="#f0c4a8" />
      <ellipse cx="70" cy="62" rx="28" ry="30" fill="#4a2f22" />
      <ellipse cx="72" cy="68" rx="22" ry="22" fill="#f0c4a8" />
      <path
        d="M50 58c8-18 36-22 48-6 2 4-2 8-8 7-8-2-16-2-24 1-6 2-10-1-16-2z"
        fill="#3d281e"
      />
      <path d="M46 52c-6 8-6 22 2 30 2-12 6-22 14-28-6-4-12-4-16-2z" fill="#4a2f22" />
      <circle cx="64" cy="68" r="2.2" fill="#2a1810" />
      <circle cx="80" cy="68" r="2.2" fill="#2a1810" />
      <circle cx="64.7" cy="67.3" r="0.7" fill="#fff" />
      <circle cx="80.7" cy="67.3" r="0.7" fill="#fff" />
      <ellipse cx="60" cy="74" rx="4" ry="2" fill="#f4b0b0" opacity="0.7" />
      <ellipse cx="84" cy="74" rx="4" ry="2" fill="#f4b0b0" opacity="0.7" />
      <path
        d="M66 78c4 4 10 4 14 0"
        fill="none"
        stroke="#d47a7a"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="46" cy="50" r="6" fill="#f2a4b8" />
      <circle cx="42" cy="46" r="3.2" fill="#f7c0cc" />
      <circle cx="50" cy="45" r="3" fill="#f7c0cc" />
      <circle cx="46" cy="50" r="2" fill="#fff8f2" />
    </g>
    <g>
      <path d="M118 112c8-12 22-16 34-16s26 4 34 16l6 82h-80z" fill="#2a2a2e" />
      <path d="M146 112v22c0 6 8 6 8 0v-22z" fill="#f5f5f5" />
      <ellipse cx="150" cy="84" rx="10" ry="12" fill="#efc2a4" />
      <ellipse cx="150" cy="58" rx="24" ry="22" fill="#1c1c1c" />
      <ellipse cx="150" cy="64" rx="20" ry="20" fill="#efc2a4" />
      <path
        d="M130 54c6-16 32-20 42-4 2 4-4 8-10 6-8-3-16-3-22 0-6 2-10 0-10-2z"
        fill="#141414"
      />
      <path
        d="M138 64c2 0 3 1 4 2"
        fill="none"
        stroke="#2a1810"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="158" cy="66" r="2.2" fill="#2a1810" />
      <circle cx="158.7" cy="65.3" r="0.7" fill="#fff" />
      <ellipse cx="140" cy="72" rx="3.5" ry="1.8" fill="#f4b0b0" opacity="0.55" />
      <path
        d="M144 76c4 3.4 10 3.4 14 0"
        fill="none"
        stroke="#d47a7a"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

export const PortraitWidget = () => (
  <section className="us-widget-frost us-portrait-tile" aria-label="우리">
    <CoupleSprites className="h-[118px] w-[118px]" />
    <span className="us-slot-badge">
      <PixelHeart size={11} />
    </span>
  </section>
);
