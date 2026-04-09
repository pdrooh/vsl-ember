"use client";

import { motion, AnimatePresence } from "framer-motion";

type CadastroGateProps = {
  visivel: boolean;
  /** Já existe algum bloco liberado abaixo do vídeo */
  temConteudoLiberado: boolean;
};

export function CadastroGate({ visivel, temConteudoLiberado }: CadastroGateProps) {
  return (
    <AnimatePresence>
      {visivel && temConteudoLiberado && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-gradient-to-t from-black via-black/95 to-transparent px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-10 text-center"
        >
          <p className="mx-auto max-w-md text-xs font-medium uppercase tracking-[0.2em] text-white/45">
            Assista até o final
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/70">
            O cadastro será liberado quando a mensagem terminar. Não pule: cada
            etapa aparece no tempo certo.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
