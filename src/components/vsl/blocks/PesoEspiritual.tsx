"use client";

import { RevealSection } from "../RevealSection";

export function PesoEspiritual() {
  return (
    <RevealSection className="mx-auto max-w-2xl text-center sm:text-left">
      <h2 className="font-serif text-2xl font-medium leading-snug text-white sm:text-3xl">
        Deus não reservou o sobrenatural para uma elite espiritual.
      </h2>
      <div className="mt-8 space-y-5 text-pretty text-base leading-relaxed text-white/72">
        <blockquote className="rounded-[1.5rem] border border-[#c1693a]/25 bg-gradient-to-br from-[#c1693a]/10 to-transparent px-6 py-6 text-left">
          <p className="font-serif text-lg italic text-white/95 sm:text-xl">
            &ldquo;E estas maravilhas acompanharão os que creem…&rdquo;
          </p>
          <cite className="mt-3 block text-sm not-italic text-[#e8a882]/75">
            Marcos 16:17
          </cite>
        </blockquote>
        <p>
          A Palavra não diz &ldquo;os que forem especiais.&rdquo; Não diz
          &ldquo;os que forem pastores.&rdquo; Diz: os que creem.
        </p>
        <p>Se você crê, isso é para você.</p>
        <p>
          A Comunidade existe para que essa verdade saia do papel e entre na sua
          vida.
        </p>
      </div>
    </RevealSection>
  );
}
