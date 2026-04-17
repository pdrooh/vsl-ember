"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/track";

const SHEET_MONKEY_FORM_URL =
  "https://api.sheetmonkey.io/form/51HzKw2qrQHXUEvKJGGAUH";

export function LeadForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("submitting");
    try {
      const res = await fetch(SHEET_MONKEY_FORM_URL, {
        method: "POST",
        body: fd,
        mode: "cors",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      trackEvent("lead_submit", {
        nome: String(fd.get("nome") ?? "").slice(0, 80),
      });
      router.push("/obrigado");
    } catch {
      setStatus("idle");
      setSubmitError("Não foi possível enviar. Verifique a conexão e tente de novo.");
    }
  };

  return (
    <motion.div
      id="cadastro"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-32 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] to-transparent p-6 shadow-[0_0_80px_-20px_rgba(193,105,58,0.28)] sm:p-10"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e8a882]/90">
        Comunidade Ember — acesso gratuito
      </p>
      <h2 className="mt-3 font-serif text-2xl font-medium text-white sm:text-3xl">
        Entre na comunidade
      </h2>
      <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-white/65">
        Deixe seus dados para receber o convite direto no WhatsApp. Em seguida
        você será levada à página de confirmação com o link do grupo — tudo
        sem custo.
      </p>
      <form className="mt-8 flex flex-col gap-4" onSubmit={onSubmit}>
          {submitError ? (
            <p
              className="rounded-2xl border border-rose-500/35 bg-rose-500/10 px-4 py-3 text-sm text-rose-100"
              role="alert"
            >
              {submitError}
            </p>
          ) : null}
          <label className="flex flex-col gap-2 text-sm text-white/70">
            Nome
            <input
              id="cadastro-nome"
              name="nome"
              required
              autoComplete="name"
              className="rounded-2xl border border-white/15 bg-black/30 px-4 py-3.5 text-base text-white outline-none ring-orange-500/0 transition placeholder:text-white/35 focus:border-[#c1693a]/50 focus:ring-2 focus:ring-[#c1693a]/25"
              placeholder="Seu nome"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-white/70">
            E-mail
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="rounded-2xl border border-white/15 bg-black/30 px-4 py-3.5 text-base text-white outline-none transition placeholder:text-white/35 focus:border-[#c1693a]/50 focus:ring-2 focus:ring-[#c1693a]/25"
              placeholder="seu@email.com"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-white/70">
            WhatsApp
            <input
              name="whatsapp"
              type="tel"
              autoComplete="tel"
              className="rounded-2xl border border-white/15 bg-black/30 px-4 py-3.5 text-base text-white outline-none transition placeholder:text-white/35 focus:border-[#c1693a]/50 focus:ring-2 focus:ring-[#c1693a]/25"
              placeholder="(00) 00000-0000"
            />
          </label>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-700 via-[#c1693a] to-rose-600 px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_12px_40px_-8px_rgba(193,105,58,0.45)] transition hover:brightness-110 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-55"
          >
            {status === "submitting" ? "Enviando…" : "Concluir cadastro"}
          </button>
        </form>
    </motion.div>
  );
}
