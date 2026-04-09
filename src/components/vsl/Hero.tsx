"use client";

import { VideoPlayer } from "./VideoPlayer";

type HeroProps = {
  videoSrc: string;
  onTimeUpdate: React.ReactEventHandler<HTMLVideoElement>;
  onLoadedMetadata: React.ReactEventHandler<HTMLVideoElement>;
  onVideoEnded: React.ReactEventHandler<HTMLVideoElement>;
};

export function Hero({
  videoSrc,
  onTimeUpdate,
  onLoadedMetadata,
  onVideoEnded,
}: HeroProps) {
  return (
    <header className="relative z-10 mx-auto max-w-3xl text-center">
      <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#c1693a]/40 bg-[#c1693a]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e8a882]">
        Convocação
      </p>
      <h1 className="font-serif text-[clamp(2.1rem,5.8vw,3.35rem)] font-medium leading-[1.1] tracking-tight text-white">
        Algo grande está se aproximando.
      </h1>
      <p className="mx-auto mt-5 max-w-xl font-serif text-xl font-normal leading-snug text-[#f5e6dc]/95 sm:text-2xl">
        Uma convocação foi iniciada.
      </p>
      <p className="mx-auto mt-8 max-w-xl text-pretty font-sans text-base leading-[1.75] text-white/68 sm:text-[1.05rem] sm:leading-[1.8]">
        Se você sente que Deus está chamando você para um novo tempo de
        intimidade, sensibilidade espiritual e resposta, permaneça aqui com
        atenção: o que vem a seguir se desenrola junto com esta mensagem — e
        pede o coração inteiro, não só a curiosidade.
      </p>

      <div className="mx-auto mt-12 max-w-2xl">
        <VideoPlayer
          key={videoSrc}
          src={videoSrc}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={onVideoEnded}
        />
      </div>
    </header>
  );
}
