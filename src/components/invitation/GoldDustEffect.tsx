"use client";

import { useEffect, useRef } from "react";

interface RGB {
  r: number;
  g: number;
  b: number;
}

const PALETTE: RGB[] = [
  { r: 216, g: 186, b: 134 }, // luminous champagne gold
  { r: 204, g: 170, b: 116 }, // warm honey gold
  { r: 228, g: 204, b: 162 }, // pale champagne bokeh
  { r: 189, g: 154, b: 102 }, // classic antique gold
];

type ParticleKind = "bokeh" | "orb" | "sparkle";

interface Particle {
  kind: ParticleKind;
  x: number;
  y: number;
  radius: number;
  colorIndex: number;
  baseAlpha: number;
  vy: number;
  swayAmp: number;
  swayFreq: number;
  phase: number;
  twinkleSpeed: number;
  hasStar: boolean;
}

/**
 * 시안 1(샴페인 골드 보케 & 빛가루)과 동일한 광학 보케 스프라이트를 오프스크린 캔버스에 미리 생성
 * ponytail: 매 프레임 그라데이션을 다시 계산하지 않고 drawImage로 합성해 모바일 배터리·프레임 보호
 */
function createBokehSprite(rgb: RGB, ringBoost: number): HTMLCanvasElement {
  const size = 96;
  const half = size / 2;
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const sctx = sprite.getContext("2d");
  if (!sctx) return sprite;

  const imgData = sctx.createImageData(size, size);
  const data = imgData.data;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const d = Math.hypot(x - half + 0.5, y - half + 0.5) / half;
      if (d >= 1) continue;

      const core = Math.exp(-d * d * 2.2);
      const rim = Math.exp(-Math.pow(d - 0.78, 2) / 0.025) * ringBoost;
      const edgeFade = 1 - Math.pow(d, 4);
      const alpha = Math.min(1, (core * 0.85 + rim) * edgeFade);

      const lift = Math.round(28 * (1 - d));
      const idx = (y * size + x) * 4;
      data[idx] = Math.min(255, rgb.r + lift);
      data[idx + 1] = Math.min(255, rgb.g + lift);
      data[idx + 2] = Math.min(255, rgb.b + lift);
      data[idx + 3] = Math.round(alpha * 255);
    }
  }

  sctx.putImageData(imgData, 0, 0);
  return sprite;
}

/**
 * 샴페인 골드 빛가루 & 보케 배경 낙하 이펙트 (시안 1)
 */
export const GoldDustEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bokehSprites = PALETTE.map((c) => createBokehSprite(c, 0.35));
    const orbSprites = PALETTE.map((c) => createBokehSprite(c, 0.15));

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const scaleCount = width < 480 ? 1 : 1.35;
    const bokehCount = Math.round(14 * scaleCount);
    const orbCount = Math.round(26 * scaleCount);
    const sparkleCount = Math.round(20 * scaleCount);

    const particles: Particle[] = [];

    const spawnParticle = (kind: ParticleKind, initialY?: number): Particle => {
      const colorIndex = Math.floor(Math.random() * PALETTE.length);
      if (kind === "bokeh") {
        const radius = 15 + Math.random() * 19;
        return {
          kind,
          x: Math.random() * width,
          y: initialY ?? -radius * 2,
          radius,
          colorIndex,
          baseAlpha: 0.2 + Math.random() * 0.16,
          vy: 0.22 + Math.random() * 0.26,
          swayAmp: 0.25 + Math.random() * 0.35,
          swayFreq: 0.008 + Math.random() * 0.008,
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.01 + Math.random() * 0.012,
          hasStar: false,
        };
      }

      if (kind === "orb") {
        const radius = 5 + Math.random() * 7.5;
        return {
          kind,
          x: Math.random() * width,
          y: initialY ?? -radius * 2,
          radius,
          colorIndex,
          baseAlpha: 0.42 + Math.random() * 0.28,
          vy: 0.35 + Math.random() * 0.42,
          swayAmp: 0.3 + Math.random() * 0.45,
          swayFreq: 0.012 + Math.random() * 0.012,
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.018 + Math.random() * 0.018,
          hasStar: false,
        };
      }

      const radius = 1.4 + Math.random() * 1.6;
      return {
        kind: "sparkle",
        x: Math.random() * width,
        y: initialY ?? -radius * 4,
        radius,
        colorIndex,
        baseAlpha: 0.55 + Math.random() * 0.35,
        vy: 0.28 + Math.random() * 0.36,
        swayAmp: 0.2 + Math.random() * 0.35,
        swayFreq: 0.014 + Math.random() * 0.014,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.028 + Math.random() * 0.025,
        hasStar: Math.random() < 0.36,
      };
    };

    for (let i = 0; i < bokehCount; i++) {
      particles.push(spawnParticle("bokeh", Math.random() * height));
    }
    for (let i = 0; i < orbCount; i++) {
      particles.push(spawnParticle("orb", Math.random() * height));
    }
    for (let i = 0; i < sparkleCount; i++) {
      particles.push(spawnParticle("sparkle", Math.random() * height));
    }

    let rafId = 0;
    let tick = 0;

    const render = () => {
      tick += 1;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.vy;
        p.x += Math.sin(tick * p.swayFreq + p.phase) * p.swayAmp;

        const margin = p.radius * 2 + 12;
        if (p.y > height + margin) {
          p.y = -margin;
          p.x = Math.random() * width;
        }
        if (p.x < -margin) p.x = width + margin;
        if (p.x > width + margin) p.x = -margin;

        const twinkle =
          0.78 + 0.22 * Math.sin(tick * p.twinkleSpeed + p.phase);
        const alpha = Math.max(0, Math.min(1, p.baseAlpha * twinkle));

        if (p.kind === "bokeh" || p.kind === "orb") {
          const sprite =
            p.kind === "bokeh"
              ? bokehSprites[p.colorIndex]
              : orbSprites[p.colorIndex];
          ctx.globalAlpha = alpha;
          ctx.drawImage(
            sprite,
            p.x - p.radius,
            p.y - p.radius,
            p.radius * 2,
            p.radius * 2
          );
        } else {
          ctx.globalAlpha = alpha;
          ctx.fillStyle = "rgb(201, 164, 106)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          if (p.hasStar) {
            const arm = (4.5 + p.radius * 1.8) * twinkle;
            ctx.strokeStyle = "rgba(214, 182, 128, 0.78)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x - arm, p.y);
            ctx.lineTo(p.x + arm, p.y);
            ctx.moveTo(p.x, p.y - arm);
            ctx.lineTo(p.x, p.y + arm);
            ctx.stroke();

            ctx.fillStyle = "rgb(255, 252, 244)";
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      ctx.globalAlpha = 1;
      rafId = window.requestAnimationFrame(render);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(rafId);
      } else {
        window.cancelAnimationFrame(rafId);
        rafId = window.requestAnimationFrame(render);
      }
    };

    rafId = window.requestAnimationFrame(render);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20"
    />
  );
};
