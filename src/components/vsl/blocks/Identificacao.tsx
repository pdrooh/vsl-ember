"use client";

import { motion } from "framer-motion";
import { RevealSection } from "../RevealSection";
import { staggerContainer, staggerItem } from "../motionVariants";

const bullets = [
  "Frequenta a igreja mas sente que falta algo mais profundo",
  "Quer entender e operar nos dons do Espírito Santo",
  "Deseja sair da teoria e experimentar o sobrenatural na prática",
  "Está cansado de uma fé morna e quer mais de Deus",
  "Quer crescer espiritualmente ao lado de uma comunidade que leva isso a sério",
];

export function Identificacao() {
  return (
    <RevealSection className="mx-auto max-w-2xl">
      <h2 className="text-center font-serif text-2xl font-medium text-white sm:text-left sm:text-3xl">
        Essa comunidade é para você que…
      </h2>
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
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-amber-400 to-rose-500"
              aria-hidden
            />
            {text}
          </motion.li>
        ))}
      </motion.ul>
    </RevealSection>
  );
}
