"use client";

import { motion } from "framer-motion";
import { RevealSection } from "../RevealSection";
import { staggerContainer, staggerItem } from "../motionVariants";

const bullets = [
  "sente que Deus está movendo algo neste tempo",
  "percebe que uma nova estação se aproxima",
  "quer permanecer sensível à voz do Senhor",
  "não deseja ficar de fora do que será revelado",
  "sabe que certos movimentos pedem prontidão, não pressa",
  "quer ser avisada assim que tudo for liberado",
];

export function Identificacao() {
  return (
    <RevealSection className="mx-auto max-w-2xl">
      <h2 className="text-center font-serif text-2xl font-medium text-white sm:text-left sm:text-3xl">
        Essa convocação é para você que…
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
