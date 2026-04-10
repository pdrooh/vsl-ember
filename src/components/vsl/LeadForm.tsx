"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { WHATSAPP_GROUP_URL } from "@/constants/communityLinks";
import { trackEvent } from "@/lib/track";

const SHEET_MONKEY_FORM_URL =
  "https://api.sheetmonkey.io/form/51HzKw2qrQHXUEvKJGGAUH";

export function LeadForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
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
      setStatus("sent");
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
        Cadastro liberado
      </p>
      <h2 className="mt-3 font-serif text-2xl font-medium text-white sm:text-3xl">
        Garanta seu aviso prioritário
      </h2>
      <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-white/65">
        Você chegou até o fim da mensagem. Preencha os dados e seja uma das
        primeiras a saber quando a revelação for aberta.
      </p>
      {status === "sent" ? (
        <div className="mt-8 flex flex-col gap-6">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-emerald-100">
            <p className="font-medium text-emerald-50">Obrigada pelo cadastro!</p>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-emerald-200/95">
              Seu lugar na fila está garantido. Para acompanhar tudo em tempo
              real e fazer parte da comunidade, entre no nosso grupo no
              WhatsApp pelo botão abaixo.
            </p>
          </div>
          <a
            href={WHATSAPP_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("lead_whatsapp_click")}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-[#05301f] shadow-[0_12px_40px_-8px_rgba(37,211,102,0.45)] transition hover:brightness-110 active:scale-[0.98]"
          >
            <svg
              className="h-5 w-5 shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Entrar no grupo do WhatsApp
          </a>
        </div>
      ) : (
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
            {status === "submitting" ? "Enviando…" : "Quero ser avisada"}
          </button>
        </form>
      )}
    </motion.div>
  );
}
