"use client";

import { motion } from "framer-motion";

type RevealSectionProps = {
  children: React.ReactNode;
  className?: string;
};

export function RevealSection({ children, className = "" }: RevealSectionProps) {
  return (
    <motion.section
      className={`scroll-mt-32 ${className}`}
      initial={{ opacity: 0, y: 52 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
