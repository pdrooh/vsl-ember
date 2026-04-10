"use client";

import { useVideoProgress } from "@/hooks/useVideoProgress";
import { Hero } from "./Hero";
import { ProgressBar } from "./ProgressBar";
import { LeadForm } from "./LeadForm";
import { CadastroGate } from "./CadastroGate";
import { Abertura } from "./blocks/Abertura";
import { Identificacao } from "./blocks/Identificacao";
import { Atmosfera } from "./blocks/Atmosfera";
import { PesoEspiritual } from "./blocks/PesoEspiritual";
import { Urgencia } from "./blocks/Urgencia";
import { Final } from "./blocks/Final";

const DEFAULT_VSL_URL = "https://youtu.be/GPJVJnbx0yY";

const VIDEO_SRC =
  process.env.NEXT_PUBLIC_VSL_URL?.trim() || DEFAULT_VSL_URL;

export function VSLPage() {
  const {
    handleTimeUpdate,
    handleLoadedMetadata,
    handleVideoEnded,
    isRevealed,
    progressPct,
    cadastroLiberado,
  } = useVideoProgress();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-18%,rgba(193,105,58,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_100%_40%,rgba(244,63,94,0.06),transparent_45%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-neutral-950 to-black" />
      </div>

      <div className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.06] bg-black/50 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl flex-col gap-2">
          <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.22em] text-white/38">
            <span>Jornada</span>
            <span className="text-right">Tudo após 1:40</span>
          </div>
          <ProgressBar value={progressPct} />
        </div>
      </div>

      <CadastroGate visivel={!cadastroLiberado} />

      <main className="relative mx-auto max-w-3xl px-5 pb-32 pt-28 sm:px-8 sm:pb-40 sm:pt-32">
        <Hero
          videoSrc={VIDEO_SRC}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onVideoEnded={handleVideoEnded}
        />

        <div className="mt-20 flex flex-col gap-[clamp(4rem,10vw,7rem)] sm:mt-24">
          {isRevealed("abertura") && <Abertura />}
          {isRevealed("identificacao") && <Identificacao />}
          {isRevealed("atmosfera") && <Atmosfera />}
          {isRevealed("peso") && <PesoEspiritual />}
          {isRevealed("urgencia") && (
            <Urgencia cadastroLiberado={cadastroLiberado} />
          )}
          {isRevealed("final") && (
            <Final cadastroLiberado={cadastroLiberado} />
          )}
        </div>

        {cadastroLiberado && (
          <div className="mt-20 sm:mt-28">
            <LeadForm />
          </div>
        )}
      </main>
    </div>
  );
}
