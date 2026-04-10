"use client";

import { motion } from "framer-motion";
import { RevealSection } from "../RevealSection";
import { staggerContainer, staggerItem } from "../motionVariants";

const bullets = [
  "📖 Conteúdos exclusivos sobre vida sobrenatural e dons do Espírito e aplicações práticas",
  "🎙️ Lives ao vivo com ensinamentos profundos e práticos",
  "🤝 Convidados especiais — vozes que também vivem e ensinam o sobrenatural",
  "🔥 Uma comunidade de pessoas que não se contentam com o comum",
];

export function Atmosfera() {
  return (
    <RevealSection className="mx-auto max-w-2xl py-4 text-center sm:text-left">
      <h2 className="font-serif text-2xl font-medium leading-snug text-white sm:text-3xl">
        O que você encontra dentro da Comunidade Ember
      </h2>
      <p className="mt-8 text-pretty text-base leading-relaxed text-white/72">
        Ao entrar, você passa a fazer parte de um grupo no WhatsApp onde você
        vai receber:
      </p>
      <motion.ul
        className="mt-8 space-y-4"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {bullets.map((text) => (
          <motion.li
            key={text}
            variants={staggerItem}
            className="flex gap-3 text-pretty text-base leading-relaxed text-white/75"
          >
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c1693a]"
              aria-hidden
            />
            {text}
          </motion.li>
        ))}
      </motion.ul>
      <p className="mt-10 text-pretty text-base leading-relaxed text-white/72">
        E tudo isso de forma completamente gratuita.
      </p>
    </RevealSection>
  );
}
