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
        Algo grande vem por aí.
      </h2>
      <div className="mt-8 space-y-5 text-pretty text-base leading-relaxed text-white/72">
        <p>
          Você não precisa entender tudo agora para reconhecer que este é um
          tempo de atenção.
        </p>
        <p>
          Se o seu coração percebe que há algo sendo movido, não ignore esse
          sinal.
        </p>
        <p>Permaneça sensível.</p>
        <p>Conclua a mensagem.</p>
        <p>E esteja pronta para o passo que vem em seguida.</p>
      </div>
      <div className="mt-10 flex justify-center sm:justify-start">
        <CTAButton label="final_cta" liberado={cadastroLiberado}>
          Quero ser avisada em primeira mão
        </CTAButton>
      </div>
    </RevealSection>
  );
}
