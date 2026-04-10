"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  REVEAL_ALL_AT_SEC,
  REVEAL_STEPS,
  type RevealBlockId,
} from "@/constants/revealTimeline";
import { trackEvent } from "@/lib/track";

export function useVideoProgress() {
  const [currentTime, setCurrentTime] = useState(0);
  const [peakTime, setPeakTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const milestonesRef = useRef({ q25: false, q50: false });

  const revealThreshold = useMemo(() => {
    if (!duration || !Number.isFinite(duration) || duration <= 0) {
      return REVEAL_ALL_AT_SEC;
    }
    return Math.min(REVEAL_ALL_AT_SEC, duration);
  }, [duration]);

  const cadastroLiberado = peakTime >= revealThreshold;

  const revealedIds = useMemo(() => {
    if (peakTime < revealThreshold) return [] as RevealBlockId[];
    return REVEAL_STEPS.map((s) => s.id) as RevealBlockId[];
  }, [peakTime, revealThreshold]);

  const progressPct =
    duration > 0 && Number.isFinite(duration)
      ? Math.min(100, (currentTime / duration) * 100)
      : 0;

  const handleTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const el = e.currentTarget;
      const t = el.currentTime;
      const d = el.duration;
      setCurrentTime(t);
      setPeakTime((p) => (t > p ? t : p));
      if (d && Number.isFinite(d)) {
        const pct = (t / d) * 100;
        if (!milestonesRef.current.q25 && pct >= 25) {
          milestonesRef.current.q25 = true;
          trackEvent("25%_watched");
        }
        if (!milestonesRef.current.q50 && pct >= 50) {
          milestonesRef.current.q50 = true;
          trackEvent("50%_watched");
        }
      }
    },
    []
  );

  const handleLoadedMetadata = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const d = e.currentTarget.duration;
      if (d && Number.isFinite(d)) setDuration(d);
    },
    []
  );

  const handleVideoEnded = useCallback(() => {
    trackEvent("video_complete");
  }, []);

  const isRevealed = useCallback(
    (id: RevealBlockId) => revealedIds.includes(id),
    [revealedIds]
  );

  return {
    currentTime,
    duration,
    revealedIds,
    progressPct,
    cadastroLiberado,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleVideoEnded,
    isRevealed,
  };
}
