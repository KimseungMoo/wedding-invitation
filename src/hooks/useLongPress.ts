"use client";

import { useCallback, useRef, useState } from "react";

interface UseLongPressOptions {
  /** 진행도 업데이트 콜백 (0-100) */
  onProgress?: (progress: number) => void;
  /** 완료 시 콜백 */
  onComplete?: () => void;
  /** 완료까지 걸리는 시간 (ms) */
  duration?: number;
  /** 진행도 업데이트 간격 (ms) */
  interval?: number;
}

interface UseLongPressReturn {
  /** 현재 진행도 (0-100) */
  progress: number;
  /** 누르고 있는 중인지 여부 */
  isPressed: boolean;
  /** 완료 여부 */
  isComplete: boolean;
  /** 이벤트 핸들러 */
  handlers: {
    onMouseDown: () => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
    onTouchStart: () => void;
    onTouchEnd: () => void;
  };
  /** 진행도 리셋 */
  reset: () => void;
}

/**
 * 꾹 누르기 감지 훅
 * 누르고 있는 동안 진행도가 증가하고, 100%에 도달하면 완료 콜백 호출
 *
 * @example
 * const { progress, handlers, isComplete } = useLongPress({
 *   onComplete: () => router.push('/invitation'),
 *   duration: 2000
 * });
 */
export const useLongPress = ({
  onProgress,
  onComplete,
  duration = 2000,
  interval = 50,
}: UseLongPressOptions = {}): UseLongPressReturn => {
  const [progress, setProgress] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef(0);

  // === 진행도 증가 시작 ===
  const startProgress = useCallback(() => {
    if (isComplete) return;

    setIsPressed(true);

    const step = (100 / duration) * interval;

    timerRef.current = setInterval(() => {
      progressRef.current = Math.min(progressRef.current + step, 100);
      setProgress(progressRef.current);
      onProgress?.(progressRef.current);

      if (progressRef.current >= 100) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setIsComplete(true);
        onComplete?.();
      }
    }, interval);
  }, [duration, interval, isComplete, onComplete, onProgress]);

  // === 진행도 증가 중지 ===
  const stopProgress = useCallback(() => {
    setIsPressed(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // === 리셋 ===
  const reset = useCallback(() => {
    stopProgress();
    progressRef.current = 0;
    setProgress(0);
    setIsComplete(false);
  }, [stopProgress]);

  const handlers = {
    onMouseDown: startProgress,
    onMouseUp: stopProgress,
    onMouseLeave: stopProgress,
    onTouchStart: startProgress,
    onTouchEnd: stopProgress,
  };

  return {
    progress,
    isPressed,
    isComplete,
    handlers,
    reset,
  };
};
