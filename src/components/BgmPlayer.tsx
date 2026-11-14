"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const TARGET_VOLUME = 0.42;

/**
 * 전역 배경음악 플레이어
 * RootLayout에 마운트되어 오프닝 문 열기 터치 시 재생을 시작하고
 * /invitation 페이지 전환 이후에도 끊김 없이 이어서 재생됨
 */
export function BgmPlayer() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoResumeRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const clearFade = useCallback(() => {
    if (fadeTimerRef.current) {
      clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }, []);

  const fadeInVolume = useCallback(
    (audio: HTMLAudioElement) => {
      clearFade();
      audio.volume = 0.05;
      fadeTimerRef.current = setInterval(() => {
        if (audio.paused) {
          clearFade();
          return;
        }
        const next = Math.min(TARGET_VOLUME, audio.volume + 0.04);
        audio.volume = next;
        if (next >= TARGET_VOLUME) {
          clearFade();
        }
      }, 90);
    },
    [clearFade]
  );

  // ponytail: synchronous helper kept stable so user-gesture callers (door tap / toggle) unlock iOS Safari audio
  const startPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      setIsPlaying(true);
      setHasStarted(true);
      return;
    }
    audio.volume = 0.05;
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
          autoResumeRef.current = true;
          fadeInVolume(audio);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    } else {
      setIsPlaying(true);
      setHasStarted(true);
      autoResumeRef.current = true;
      fadeInVolume(audio);
    }
  }, [fadeInVolume]);

  const pausePlayback = useCallback(
    (byUser: boolean) => {
      const audio = audioRef.current;
      clearFade();
      if (!audio) return;
      if (byUser) autoResumeRef.current = false;
      audio.pause();
      setIsPlaying(false);
    },
    [clearFade]
  );

  const handleToggle = useCallback(() => {
    if (isPlaying) {
      pausePlayback(true);
    } else {
      startPlayback();
    }
  }, [isPlaying, pausePlayback, startPlayback]);

  useEffect(() => {
    const handleStartEvent = () => {
      startPlayback();
    };

    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.visibilityState === "hidden") {
        autoResumeRef.current = !audio.paused;
        if (!audio.paused) {
          pausePlayback(false);
        }
      } else if (document.visibilityState === "visible" && autoResumeRef.current) {
        startPlayback();
      }
    };

    const handlePageHide = () => {
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        autoResumeRef.current = false;
        pausePlayback(false);
      }
    };

    window.addEventListener("wedding-bgm-start", handleStartEvent);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      clearFade();
      window.removeEventListener("wedding-bgm-start", handleStartEvent);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [clearFade, pausePlayback, startPlayback]);

  // 오프닝 페이지에서는 문 열기 터치 후부터만 플로팅 토글 노출, 본문(/invitation)에서는 항상 노출
  const showToggle =
    pathname === "/invitation" || Boolean(pathname?.startsWith("/opening") && hasStarted);

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/bgm-prelude.m4a"
        loop
        preload="metadata"
        playsInline
      />

      {showToggle && (
        <button
          type="button"
          onClick={handleToggle}
          aria-label={isPlaying ? "배경음악 끄기" : "배경음악 켜기"}
          title={isPlaying ? "배경음악 끄기" : "배경음악 켜기"}
          className="fixed right-3.5 top-[max(0.875rem,env(safe-area-inset-top))] z-40 flex h-9 w-9 items-center justify-center rounded-full border border-[#d6c7b4]/85 bg-[#fcfaf7]/85 text-[#5c4a3a] shadow-[0_2px_10px_rgba(92,72,52,0.08)] backdrop-blur-sm transition-colors hover:border-[#b89f7d] hover:bg-[#f6f1ea]"
        >
          {isPlaying ? (
            <span className="flex items-end gap-[2.5px]" aria-hidden="true">
              <span className="h-2.5 w-[2px] origin-bottom animate-[pulse_0.9s_ease-in-out_infinite] rounded-full bg-[#7a6049]" />
              <span className="h-3.5 w-[2px] origin-bottom animate-[pulse_0.9s_ease-in-out_0.2s_infinite] rounded-full bg-[#7a6049]" />
              <span className="h-2 w-[2px] origin-bottom animate-[pulse_0.9s_ease-in-out_0.4s_infinite] rounded-full bg-[#7a6049]" />
            </span>
          ) : (
            <svg
              className="h-4 w-4 text-[#8b7355]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
              <line x1="3" y1="3" x2="21" y2="21" />
            </svg>
          )}
        </button>
      )}
    </>
  );
}
