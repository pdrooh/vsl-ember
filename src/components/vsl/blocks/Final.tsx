"use client";

import { RevealSection } from "../RevealSection";
import { CTAButton } from "../CTAButton";

type FinalProps = {
  cadastroLiberado: boolean;
};

export function Final({ cadastroLiberado }: FinalProps) {
  return (
    <RevealSection className="mx-auto max-w-2xl pb-8 text-center sm:text-left">
      <h2 className="font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-medium text-white">
        Você foi avisado. Agora é a sua vez de responder.
      </h2>
      <div className="mt-8 space-y-5 text-pretty text-base leading-relaxed text-white/72">
        <p>
          Durante dias você soube que algo estava vindo. Hoje, esse algo tem
          nome, tem endereço e tem porta aberta.
        </p>
        <p>
          Não trate como comum o que pode marcar um novo tempo na sua vida.
        </p>
        <p>Entre. Permaneça. Se mova.</p>
      </div>
      <div className="mt-10 flex justify-center sm:justify-start">
        <CTAButton label="final_comunidade_gratuita" liberado={cadastroLiberado}>
          Acessar a Comunidade Ember 100% gratuita
        </CTAButton>
      </div>
    </RevealSection>
  );
}
