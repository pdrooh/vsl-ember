"use client";

import Link from "next/link";
import { useEffect } from "react";
import { WHATSAPP_GROUP_URL } from "@/constants/communityLinks";
import { trackEvent } from "@/lib/track";

export function ObrigadoView() {
  useEffect(() => {
    trackEvent("lead_thank_you_view");
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden px-5 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-18%,rgba(193,105,58,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_100%_40%,rgba(244,63,94,0.06),transparent_45%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-neutral-950 to-black" />
      </div>

      <main className="relative mx-auto max-w-lg text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e8a882]/90">
          Comunidade Ember — 100% gratuita
        </p>
        <h1 className="mt-4 font-serif text-[clamp(1.85rem,5vw,2.5rem)] font-medium leading-tight text-white">
          Obrigada pelo cadastro
        </h1>
        <p className="mx-auto mt-6 max-w-md text-pretty text-base leading-relaxed text-white/70">
          Seu cadastro foi recebido. O acesso à comunidade é gratuito: use o
          botão abaixo para entrar no grupo do WhatsApp e acompanhar avisos,
          conteúdos e conversas com quem também faz parte da Ember.
        </p>
        <a
          href={WHATSAPP_GROUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("lead_whatsapp_click", { origin: "obrigado" })}
          className="mx-auto mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-[#05301f] shadow-[0_12px_40px_-8px_rgba(37,211,102,0.45)] transition hover:brightness-110 active:scale-[0.98]"
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
        <p className="mx-auto mt-8 max-w-sm text-pretty text-sm leading-relaxed text-white/45">
          Se fechou a aba por engano, você pode voltar à página do vídeo quando
          quiser.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm font-medium text-[#e8a882]/90 underline-offset-4 transition hover:text-[#f5c4a8] hover:underline"
        >
          Voltar ao vídeo
        </Link>
      </main>
    </div>
  );
}
