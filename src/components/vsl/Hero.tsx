"use client";

import { VideoPlayer } from "./VideoPlayer";
import { trackEvent } from "@/lib/track";

type HeroProps = {
  videoSrc: string;
  cadastroLiberado: boolean;
  onTimeUpdate: React.ReactEventHandler<HTMLVideoElement>;
  onLoadedMetadata: React.ReactEventHandler<HTMLVideoElement>;
  onVideoEnded: React.ReactEventHandler<HTMLVideoElement>;
};

function scrollToCadastro(focusNome: boolean) {
  document.getElementById("cadastro")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  if (focusNome) {
    setTimeout(() => {
      document.querySelector<HTMLInputElement>("#cadastro-nome")?.focus();
    }, 500);
  }
}

export function Hero({
  videoSrc,
  cadastroLiberado,
  onTimeUpdate,
  onLoadedMetadata,
  onVideoEnded,
}: HeroProps) {
  return (
    <header className="relative z-10 mx-auto max-w-3xl text-center">
      <h1 className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-serif text-[clamp(1.6rem,5vw,2.75rem)] font-medium leading-tight tracking-tight text-white">
        Comunidade Ember - 100% Gratuita
      </h1>
      <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-white/55 sm:text-[0.95rem]">
        Permaneça no vídeo para desbloquear sua jornada na Comunidade Ember.
      </p>

      <div className="mx-auto mt-10 max-w-2xl sm:mt-12">
        <VideoPlayer
          key={videoSrc}
          src={videoSrc}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={onVideoEnded}
        />
      </div>

      {cadastroLiberado ? (
        <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-3 sm:mt-12">
          <button
            type="button"
            onClick={() => {
              trackEvent("cta_click", { cta_label: "hero_ir_cadastro" });
              scrollToCadastro(true);
            }}
            className="inline-flex w-full max-w-md items-center justify-center rounded-full bg-gradient-to-r from-amber-700 via-[#c1693a] to-rose-600 px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.1em] text-white shadow-[0_12px_40px_-8px_rgba(193,105,58,0.5)] transition hover:brightness-110 active:scale-[0.98] sm:text-sm sm:tracking-[0.12em]"
          >
            Ir para o cadastro
          </button>
          <p className="text-pretty text-xs text-white/45 sm:text-sm">
            Cadastro abaixo. Depois do envio, link do grupo na próxima página.
          </p>
        </div>
      ) : null}
    </header>
  );
}
