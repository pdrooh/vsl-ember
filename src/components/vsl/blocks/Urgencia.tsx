"use client";

import { RevealSection } from "../RevealSection";
import { CTAButton } from "../CTAButton";

type UrgenciaProps = {
  cadastroLiberado: boolean;
};

export function Urgencia({ cadastroLiberado }: UrgenciaProps) {
  return (
    <RevealSection className="mx-auto max-w-2xl rounded-[2rem] border border-rose-500/20 bg-gradient-to-b from-rose-950/40 to-transparent px-6 py-10 text-center sm:px-10 sm:text-left">
      <h2 className="font-serif text-2xl font-medium text-white sm:text-3xl">
        Entre para receber em primeira mão
      </h2>
      <p className="mx-auto mt-6 max-w-lg text-pretty text-base leading-relaxed text-white/72 sm:mx-0">
        A lista está sendo formada para reunir aquelas que desejam acompanhar
        de perto tudo o que será revelado.
      </p>
      <p className="mx-auto mt-4 max-w-lg text-pretty text-base text-white/72 sm:mx-0">
        Quando o vídeo terminar, o cadastro será liberado — e você poderá
        garantir seu lugar entre as primeiras avisadas.
      </p>
      <div className="mt-10 flex justify-center sm:justify-start">
        <CTAButton label="urgencia_strong" liberado={cadastroLiberado}>
          Quero entrar na lista
        </CTAButton>
      </div>
    </RevealSection>
  );
}
