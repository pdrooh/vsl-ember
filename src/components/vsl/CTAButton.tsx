"use client";

import { trackEvent } from "@/lib/track";

type CTAButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  label: string;
  /** Só exibe o botão quando o vídeo terminou e o cadastro foi liberado */
  liberado?: boolean;
};

export function CTAButton({
  children,
  variant = "primary",
  label,
  liberado = true,
}: CTAButtonProps) {
  if (!liberado) return null;

  const scrollToForm = () => {
    trackEvent("cta_click", { cta_label: label });
    document.getElementById("cadastro")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setTimeout(() => {
      document.querySelector<HTMLInputElement>("#cadastro-nome")?.focus();
    }, 500);
  };

  const base =
    "inline-flex w-full max-w-md items-center justify-center gap-2 rounded-full px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.12em] transition-transform active:scale-[0.98] sm:w-auto sm:min-w-[280px]";

  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-amber-700 via-[#c1693a] to-rose-600 text-white shadow-[0_12px_40px_-8px_rgba(193,105,58,0.5)] hover:brightness-110"
      : "border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10";

  return (
    <button type="button" className={`${base} ${styles}`} onClick={scrollToForm}>
      {children}
    </button>
  );
}
