"use client";

import { motion } from "framer-motion";

type ProgressBarProps = {
  value: number;
};

export function ProgressBar({ value }: ProgressBarProps) {
  return (
    <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/[0.08]">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-amber-800 via-[#c1693a] to-rose-600 shadow-[0_0_12px_rgba(193,105,58,0.7)]"
        initial={false}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ type: "spring", stiffness: 140, damping: 26 }}
      />
    </div>
  );
}
