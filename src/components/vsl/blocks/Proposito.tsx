"use client";

import { motion } from "framer-motion";
import { RevealSection } from "../RevealSection";
import { CTAButton } from "../CTAButton";
import { staggerContainer, staggerItem } from "../motionVariants";

const lista = [
  "assim que a revelação for aberta",
  "quando a próxima etapa for liberada",
  "no início oficial deste novo tempo",
];

type PropositoProps = {
  cadastroLiberado: boolean;
};

export function Proposito({ cadastroLiberado }: PropositoProps) {
  return (
    <RevealSection className="mx-auto max-w-2xl">
      <h2 className="text-center font-serif text-2xl font-medium text-white sm:text-left sm:text-3xl">
        Por que entrar nessa lista?
      </h2>
      <div className="mt-8 space-y-5 text-pretty text-base leading-relaxed text-white/72">
        <p>
          Porque, quando a revelação for liberada, você estará entre as
          primeiras a saber.
        </p>
        <p>
          E porque estará respondendo — com sensibilidade — a uma convocação que
          já começou.
        </p>
        <p>Há coisas que pedem mais do que curiosidade.</p>
        <p>Pedem prontidão.</p>
      </div>
      <p className="mt-10 text-center text-sm font-medium uppercase tracking-[0.15em] text-[#e8a882]/85 sm:text-left">
        Ao se cadastrar, você será avisada:
      </p>
      <motion.ul
        className="mt-5 space-y-3"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {lista.map((text) => (
          <motion.li
            key={text}
            variants={staggerItem}
            className="flex gap-3 text-pretty text-base text-white/75"
          >
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c1693a]"
              aria-hidden
            />
            {text}
          </motion.li>
        ))}
      </motion.ul>
      <div className="mt-10 flex justify-center sm:justify-start">
        <CTAButton
          variant="secondary"
          label="proposito_light"
          liberado={cadastroLiberado}
        >
          Quero ser avisada
        </CTAButton>
      </div>
    </RevealSection>
  );
}
