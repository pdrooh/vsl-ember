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
        A porta foi aberta hoje. Entre agora.
      </h2>
      <div className="mx-auto mt-6 max-w-lg space-y-4 text-pretty text-base leading-relaxed text-white/72 sm:mx-0">
        <p>
          O acesso à Comunidade está disponível a partir de hoje. Não há taxa.
          Não há seleção. Não há lista de espera.
        </p>
        <p>Só há uma decisão a tomar.</p>
      </div>
      <div className="mt-10 flex justify-center sm:justify-start">
        <CTAButton label="urgencia_comunidade" liberado={cadastroLiberado}>
          Quero entrar na comunidade
        </CTAButton>
      </div>
    </RevealSection>
  );
}
