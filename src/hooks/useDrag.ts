"use client";

import { useCallback, useRef, useState } from "react";

interface UseDragOptions {
  /** 드래그 방향 */
  direction?: "horizontal" | "vertical";
  /** 완료 판정 임계값 (px) */
  threshold?: number;
  /** 진행도 업데이트 콜백 (0-100) */
  onProgress?: (progress: number) => void;
  /** 완료 시 콜백 */
  onComplete?: () => void;
}

interface UseDragReturn {
  /** 현재 진행도 (0-100) */
  progress: number;
  /** 드래그 중인지 여부 */
  isDragging: boolean;
  /** 완료 여부 */
  isComplete: boolean;
  /** 드래그 거리 (px) */
  dragDistance: number;
  /** 이벤트 핸들러 */
  handlers: {
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart: (e: React.TouchEvent) => void;
  };
  /** 리셋 */
  reset: () => void;
}

/**
 * 드래그 감지 훅
 * 지정 방향으로 드래그하면 진행도가 증가하고, 임계값 도달 시 완료 콜백 호출
 *
 * @example
 * const { progress, handlers, isComplete } = useDrag({
 *   direction: 'vertical',
 *   threshold: 200,
 *   onComplete: () => router.push('/invitation')
 * });
 */
export const useDrag = ({
  direction = "vertical",
  threshold = 200,
  onProgress,
  onComplete,
}: UseDragOptions = {}): UseDragReturn => {
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);

  const startPosRef = useRef<{ x: number; y: number } | null>(null);

  // === 드래그 위치 계산 ===
  const calculateDistance = useCallback(
    (clientX: number, clientY: number): number => {
      if (!startPosRef.current) return 0;

      if (direction === "vertical") {
        return Math.max(0, clientY - startPosRef.current.y);
      }
      return Math.max(0, clientX - startPosRef.current.x);
    },
    [direction]
  );

  // === 드래그 업데이트 ===
  const updateDrag = useCallback(
    (clientX: number, clientY: number) => {
      if (isComplete) return;

      const distance = calculateDistance(clientX, clientY);
      const newProgress = Math.min((distance / threshold) * 100, 100);

      setDragDistance(distance);
      setProgress(newProgress);
      onProgress?.(newProgress);

      if (newProgress >= 100 && !isComplete) {
        setIsComplete(true);
        onComplete?.();
      }
    },
    [calculateDistance, isComplete, onComplete, onProgress, threshold]
  );

  // === 마우스 드래그 시작 ===
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isComplete) return;

      startPosRef.current = { x: e.clientX, y: e.clientY };
      setIsDragging(true);

      const handleMouseMove = (moveEvent: MouseEvent) => {
        updateDrag(moveEvent.clientX, moveEvent.clientY);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [isComplete, updateDrag]
  );

  // === 터치 드래그 시작 ===
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (isComplete) return;

      const touch = e.touches[0];
      startPosRef.current = { x: touch.clientX, y: touch.clientY };
      setIsDragging(true);

      const handleTouchMove = (moveEvent: TouchEvent) => {
        const moveTouch = moveEvent.touches[0];
        updateDrag(moveTouch.clientX, moveTouch.clientY);
      };

      const handleTouchEnd = () => {
        setIsDragging(false);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };

      document.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });
      document.addEventListener("touchend", handleTouchEnd);
    },
    [isComplete, updateDrag]
  );

  // === 리셋 ===
  const reset = useCallback(() => {
    startPosRef.current = null;
    setProgress(0);
    setDragDistance(0);
    setIsDragging(false);
    setIsComplete(false);
  }, []);

  const handlers = {
    onMouseDown: handleMouseDown,
    onTouchStart: handleTouchStart,
  };

  return {
    progress,
    isDragging,
    isComplete,
    dragDistance,
    handlers,
    reset,
  };
};
