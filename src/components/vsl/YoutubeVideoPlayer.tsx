"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { extractYoutubeVideoId, loadYoutubeIframeApi } from "@/lib/youtube";
import { trackEvent } from "@/lib/track";

const SKIP_GUARD_SEC = 0.85;

/** YT.PlayerState */
const YT_ENDED = 0;
const YT_PLAYING = 1;
const YT_PAUSED = 2;
const YT_BUFFERING = 3;

type YtPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  getPlayerState: () => number;
  destroy: () => void;
};

function formatTime(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return "0:00";
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function emitVideoEvent(
  currentTime: number,
  duration: number,
  handler: React.ReactEventHandler<HTMLVideoElement> | undefined
) {
  if (!handler) return;
  const fake = { currentTime, duration } as HTMLVideoElement;
  handler({
    currentTarget: fake,
    target: fake,
  } as unknown as React.SyntheticEvent<HTMLVideoElement>);
}

type YoutubeVideoPlayerProps = {
  src: string;
  onTimeUpdate: React.ReactEventHandler<HTMLVideoElement>;
  onLoadedMetadata: React.ReactEventHandler<HTMLVideoElement>;
  onEnded?: React.ReactEventHandler<HTMLVideoElement>;
};

export function YoutubeVideoPlayer({
  src,
  onTimeUpdate,
  onLoadedMetadata,
  onEnded,
}: YoutubeVideoPlayerProps) {
  const videoId = useMemo(() => extractYoutubeVideoId(src), [src]);
  const reactId = useId();
  const playerDomId = useMemo(
    () => `ytp-${reactId.replace(/:/g, "")}`,
    [reactId]
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YtPlayer | null>(null);
  const playedRef = useRef(false);
  const furthestRef = useRef(0);
  const durationRef = useRef(0);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [displayTime, setDisplayTime] = useState(0);
  const [displayDuration, setDisplayDuration] = useState(0);
  const [fsActive, setFsActive] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const stopPoll = useCallback(() => {
    if (pollRef.current != null) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const clampToFurthest = useCallback((player: YtPlayer) => {
    let t = player.getCurrentTime();
    const cap = furthestRef.current;
    if (t > cap + SKIP_GUARD_SEC) {
      player.seekTo(cap, true);
      t = cap;
    }
    furthestRef.current = Math.max(furthestRef.current, t);
    return t;
  }, []);

  useEffect(() => {
    furthestRef.current = 0;
    playedRef.current = false;
    durationRef.current = 0;
    setDisplayTime(0);
    setDisplayDuration(0);
    setApiError(null);
    stopPoll();
    playerRef.current = null;

    if (!videoId) {
      setApiError("URL do YouTube inválida");
      return;
    }

    let cancelled = false;
    let created: YtPlayer | null = null;

    void (async () => {
      try {
        await loadYoutubeIframeApi();
        if (cancelled) return;

        const w = window as Window & {
          YT: {
            Player: new (
              id: string,
              options: {
                videoId: string;
                playerVars?: Record<string, string | number>;
                events?: {
                  onReady?: (e: { target: YtPlayer }) => void;
                  onStateChange?: (e: { data: number; target: YtPlayer }) => void;
                };
              }
            ) => YtPlayer;
          };
        };

        created = new w.YT.Player(playerDomId, {
          videoId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            playsinline: 1,
            controls: 0,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            enablejsapi: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (e) => {
              if (cancelled) return;
              const p = e.target;
              playerRef.current = p;
              p.mute();
              const d = p.getDuration();
              if (Number.isFinite(d) && d > 0) {
                durationRef.current = d;
                setDisplayDuration(d);
                emitVideoEvent(0, d, onLoadedMetadata);
              }
              void p.playVideo();
              const tick = () => {
                if (cancelled || !playerRef.current) return;
                const pl = playerRef.current;
                const dur = pl.getDuration();
                if (Number.isFinite(dur) && dur > 0 && dur !== durationRef.current) {
                  durationRef.current = dur;
                  setDisplayDuration(dur);
                }
                const t = clampToFurthest(pl);
                setDisplayTime(t);
                const effD = durationRef.current || dur;
                emitVideoEvent(t, effD, onTimeUpdate);
              };
              tick();
              pollRef.current = setInterval(tick, 200);
            },
            onStateChange: (e) => {
              if (cancelled) return;
              const p = e.target;
              const st = e.data;
              if (st === YT_PLAYING || st === YT_BUFFERING) {
                setPlaying(true);
                if (!playedRef.current) {
                  playedRef.current = true;
                  trackEvent("video_start");
                }
              } else if (st === YT_PAUSED) {
                setPlaying(false);
              } else if (st === YT_ENDED) {
                setPlaying(false);
                const d = durationRef.current || p.getDuration();
                furthestRef.current = Math.max(
                  furthestRef.current,
                  Number.isFinite(d) ? d : p.getCurrentTime()
                );
                emitVideoEvent(p.getCurrentTime(), d, onEnded);
              }
            },
          },
        });
        if (cancelled) {
          created.destroy();
          created = null;
        }
      } catch {
        if (!cancelled) setApiError("Não foi possível carregar o YouTube");
      }
    })();

    return () => {
      cancelled = true;
      stopPoll();
      created?.destroy();
      created = null;
      playerRef.current = null;
    };
  }, [
    videoId,
    playerDomId,
    src,
    onTimeUpdate,
    onLoadedMetadata,
    onEnded,
    clampToFurthest,
    stopPoll,
  ]);

  useEffect(() => {
    const onFsChange = () => {
      setFsActive(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const togglePlay = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    const st = p.getPlayerState();
    if (st === YT_PLAYING || st === YT_BUFFERING) p.pauseVideo();
    else p.playVideo();
  }, []);

  const toggleMute = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (p.isMuted()) {
      p.unMute();
      setMuted(false);
    } else {
      p.mute();
      setMuted(true);
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    const wrap = containerRef.current;
    if (!wrap) return;
    if (document.fullscreenElement) void document.exitFullscreen?.();
    else void wrap.requestFullscreen?.();
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

  if (!videoId) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-black/60 p-8 text-center text-white/70">
        {apiError ?? "URL do YouTube inválida"}
      </div>
    );
  }

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
        {apiError ? (
          <div className="flex h-full items-center justify-center bg-black/80 text-white/75">
            {apiError}
          </div>
        ) : (
          <div id={playerDomId} className="h-full w-full [&_iframe]:h-full [&_iframe]:w-full" />
        )}
      </div>

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
