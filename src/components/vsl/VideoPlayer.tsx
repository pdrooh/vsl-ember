"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { trackEvent } from "@/lib/track";

const SKIP_GUARD_SEC = 0.85;

function formatTime(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return "0:00";
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type VideoPlayerProps = {
  src: string;
  poster?: string;
  onTimeUpdate: React.ReactEventHandler<HTMLVideoElement>;
  onLoadedMetadata: React.ReactEventHandler<HTMLVideoElement>;
  onEnded?: React.ReactEventHandler<HTMLVideoElement>;
};

function emitVideoEvent(
  video: HTMLVideoElement,
  handler: React.ReactEventHandler<HTMLVideoElement> | undefined
) {
  if (!handler) return;
  handler({
    currentTarget: video,
    target: video,
  } as unknown as React.SyntheticEvent<HTMLVideoElement>);
}

export function VideoPlayer({
  src,
  poster,
  onTimeUpdate,
  onLoadedMetadata,
  onEnded,
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playedRef = useRef(false);
  const furthestRef = useRef(0);

  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [displayTime, setDisplayTime] = useState(0);
  const [displayDuration, setDisplayDuration] = useState(0);
  const [fsActive, setFsActive] = useState(false);

  const clampToFurthest = useCallback((v: HTMLVideoElement) => {
    const t = v.currentTime;
    const cap = furthestRef.current;
    if (t > cap + SKIP_GUARD_SEC) {
      v.currentTime = cap;
      return v.currentTime;
    }
    furthestRef.current = Math.max(furthestRef.current, t);
    return t;
  }, []);

  useEffect(() => {
    furthestRef.current = 0;
    playedRef.current = false;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    void v.play().catch(() => setPlaying(false));
  }, [src]);

  useEffect(() => {
    const onFsChange = () => {
      setFsActive(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const wrap = containerRef.current;
    const v = videoRef.current;
    if (!wrap || !v) return;

    const exit = () => {
      if (document.fullscreenElement) void document.exitFullscreen?.();
    };

    const enter = async () => {
      try {
        if (wrap.requestFullscreen) {
          await wrap.requestFullscreen();
          return;
        }
      } catch {
        /* fall through */
      }
      const anyV = v as HTMLVideoElement & {
        webkitEnterFullscreen?: () => void;
      };
      anyV.webkitEnterFullscreen?.();
    };

    if (document.fullscreenElement) exit();
    else void enter();
  }, []);

  const blockSeekKeys = useCallback((e: React.KeyboardEvent) => {
    const block = [
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
      "PageUp",
      "PageDown",
    ];
    if (block.includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Vídeo da mensagem"
      tabIndex={0}
      className="group relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-black/60 shadow-[0_0_72px_-14px_rgba(193,105,58,0.45)] ring-1 ring-[#c1693a]/25 outline-none focus-visible:ring-2 focus-visible:ring-[#c1693a]/50"
      onKeyDown={blockSeekKeys}
    >
      <div className="aspect-video w-full">
        <video
          ref={videoRef}
          className="h-full w-full object-contain outline-none"
          src={src}
          poster={poster}
          playsInline
          muted={muted}
          autoPlay
          preload="auto"
          controls={false}
          disablePictureInPicture
          tabIndex={-1}
          onContextMenu={(e) => e.preventDefault()}
          onPlay={() => {
            setPlaying(true);
            if (!playedRef.current) {
              playedRef.current = true;
              trackEvent("video_start");
            }
          }}
          onPause={() => setPlaying(false)}
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            v.playbackRate = 1;
            furthestRef.current = 0;
            setDisplayDuration(
              Number.isFinite(v.duration) && v.duration > 0 ? v.duration : 0
            );
            emitVideoEvent(v, onLoadedMetadata);
          }}
          onRateChange={(e) => {
            const v = e.currentTarget;
            if (v.playbackRate !== 1) v.playbackRate = 1;
          }}
          onSeeking={(e) => {
            const v = e.currentTarget;
            if (v.currentTime > furthestRef.current + SKIP_GUARD_SEC) {
              v.currentTime = furthestRef.current;
            }
          }}
          onSeeked={(e) => {
            const v = e.currentTarget;
            if (v.currentTime > furthestRef.current + 0.05) {
              v.currentTime = furthestRef.current;
            }
            clampToFurthest(v);
            setDisplayTime(v.currentTime);
            emitVideoEvent(v, onTimeUpdate);
          }}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            clampToFurthest(v);
            setDisplayTime(v.currentTime);
            emitVideoEvent(v, onTimeUpdate);
          }}
          onEnded={(e) => {
            const v = e.currentTarget;
            furthestRef.current = Math.max(
              furthestRef.current,
              Number.isFinite(v.duration) ? v.duration : v.currentTime
            );
            setPlaying(false);
            emitVideoEvent(v, onEnded);
          }}
        />
      </div>

      {/* Bloqueia interação direta com o vídeo (sem barra de progresso nativa / arrastar) */}
      <div
        className="absolute inset-0 z-[1] cursor-default bg-transparent"
        aria-hidden
        onContextMenu={(e) => e.preventDefault()}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-16 pb-3 opacity-100 transition-opacity sm:pt-20 sm:pb-4">
        <div className="pointer-events-auto mx-auto flex max-w-full items-center gap-2 px-3 sm:gap-4 sm:px-4">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pausar" : "Reproduzir"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            {playing ? (
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg
                className="ml-0.5 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <div className="min-w-0 flex-1 text-center font-mono text-xs tabular-nums tracking-tight text-white/85 sm:text-sm">
            <span className="text-white">{formatTime(displayTime)}</span>
            <span className="mx-1 text-white/40">/</span>
            <span className="text-white/55">{formatTime(displayDuration)}</span>
          </div>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Ativar som" : "Silenciar"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            {muted ? (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={fsActive ? "Sair da tela cheia" : "Tela cheia"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            {fsActive ? (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
