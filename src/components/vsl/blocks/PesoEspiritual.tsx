"use client";

import { RevealSection } from "../RevealSection";

export function PesoEspiritual() {
  return (
    <RevealSection className="mx-auto max-w-2xl text-center sm:text-left">
      <h2 className="font-serif text-2xl font-medium leading-snug text-white sm:text-3xl">
        Receba este momento com reverência, expectativa e atenção.
      </h2>
      <div className="mt-8 space-y-5 text-pretty text-base leading-relaxed text-white/72">
        <p>
          O que está sendo preparado não deve ser recebido com leveza nem com
          pressa.
        </p>
        <p>
          Há movimentos que nascem no secreto, mas carregam impacto público.
        </p>
        <p>Há começos que parecem discretos, mas marcam destinos.</p>
        <p>
          E há convocações que, no início, exigem uma única resposta: estar
          presente.
        </p>
        <p>
          Se o seu espírito sabe que precisa vigiar o que vem aí, permaneça até
          o fim desta mensagem — o próximo passo virá no tempo certo.
        </p>
      </div>
      <blockquote className="mt-10 rounded-[1.5rem] border border-[#c1693a]/25 bg-gradient-to-br from-[#c1693a]/10 to-transparent px-6 py-8">
        <p className="font-serif text-xl italic text-white/95 sm:text-2xl">
          &ldquo;Aproximem-se de Deus, e Ele se aproximará de vocês.&rdquo;
        </p>
        <cite className="mt-4 block text-sm not-italic text-[#e8a882]/75">
          Tiago 4:8
        </cite>
      </blockquote>
    </RevealSection>
  );
}
