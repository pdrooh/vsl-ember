"use client";

import { motion, AnimatePresence } from "framer-motion";

type CadastroGateProps = {
  visivel: boolean;
};

export function CadastroGate({ visivel }: CadastroGateProps) {
  return (
    <AnimatePresence>
      {visivel && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-gradient-to-t from-black via-black/95 to-transparent px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-10 text-center"
        >
          <p className="mx-auto max-w-md text-xs font-medium uppercase tracking-[0.2em] text-white/45">
            Em 1 min 40 s
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/70">
            Texto completo e formulário da comunidade só liberam nesse instante do
            vídeo. Continue assistindo até desbloquear.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
