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
      <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#c1693a]/40 bg-[#c1693a]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e8a882]">
        Comunidade Ember — 100% gratuita
      </p>
      <h1 className="font-serif text-[clamp(2.1rem,5.8vw,3.35rem)] font-medium leading-[1.1] tracking-tight text-white">
        Assista ao vídeo para liberar seu acesso
      </h1>
      <p className="mx-auto mt-5 max-w-xl font-serif text-xl font-normal leading-snug text-[#f5e6dc]/95 sm:text-2xl">
        O restante da página e o formulário de entrada na comunidade só aparecem
        depois que o vídeo atingir o momento combinado da jornada — por isso,
        vale assistir com atenção, sem pular.
      </p>
      <p className="mx-auto mt-8 max-w-xl text-pretty font-sans text-base leading-[1.75] text-white/68 sm:text-[1.05rem] sm:leading-[1.8]">
        A Ember é gratuita: não há mensalidade nem taxa para participar. O vídeo
        abaixo explica o contexto e, ao avançar até o ponto certo, o cadastro e
        todo o conteúdo complementar são desbloqueados automaticamente na mesma
        tela.
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
          <p className="text-pretty text-sm leading-relaxed text-white/55">
            Preencha o formulário abaixo. Ao enviar, abrimos a página de
            confirmação com o link do grupo no WhatsApp.
          </p>
        </div>
      ) : null}
    </header>
  );
}
