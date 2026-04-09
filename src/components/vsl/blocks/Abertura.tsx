"use client";

import { RevealSection } from "../RevealSection";

export function Abertura() {
  return (
    <RevealSection className="mx-auto max-w-2xl text-center sm:text-left">
      <h2 className="font-serif text-2xl font-medium leading-snug text-white sm:text-3xl">
        Nem todo movimento de Deus começa com explicações. Alguns começam com um
        chamado.
      </h2>
      <div className="mt-8 space-y-5 text-pretty text-base leading-relaxed text-white/72">
        <p>
          Há tempos em que o Senhor começa a mover algo de modo silencioso,
          profundo e intencional.
        </p>
        <p>Sem excesso de detalhes.</p>
        <p>Sem antecipar tudo.</p>
        <p>Mas com direção clara para quem sabe discernir.</p>
        <p>Foi assim que esta convocação começou.</p>
        <p>
          Se você sente que é hora de se posicionar com mais sensibilidade, mais
          oração e mais prontidão, honre esse tempo: a página vai se abrindo
          conforme você permanece com a mensagem.
        </p>
      </div>
      <blockquote className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-6 text-left">
        <p className="font-serif text-lg italic text-[#e8a882]/95">
          &ldquo;Quem tem ouvidos, ouça o que o Espírito diz às igrejas.&rdquo;
        </p>
        <cite className="mt-3 block text-sm not-italic text-white/45">
          Apocalipse 2:29
        </cite>
      </blockquote>
    </RevealSection>
  );
}
