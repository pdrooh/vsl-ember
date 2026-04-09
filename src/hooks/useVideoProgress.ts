"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  REVEAL_STEPS,
  type RevealBlockId,
} from "@/constants/revealTimeline";
import { trackEvent } from "@/lib/track";

export function useVideoProgress() {
  const [currentTime, setCurrentTime] = useState(0);
  const [peakTime, setPeakTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [cadastroLiberado, setCadastroLiberado] = useState(false);
  const milestonesRef = useRef({ q25: false, q50: false });

  const revealedIds = useMemo(() => {
    if (!duration || !Number.isFinite(duration) || duration <= 0) {
      return [] as RevealBlockId[];
    }
    const t = peakTime;
    return REVEAL_STEPS.filter((s) => t >= s.fraction * duration).map(
      (s) => s.id
    ) as RevealBlockId[];
  }, [peakTime, duration]);

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
    setCadastroLiberado(true);
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
