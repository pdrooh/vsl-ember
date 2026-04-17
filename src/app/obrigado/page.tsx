import type { Metadata } from "next";
import { ObrigadoView } from "@/components/vsl/ObrigadoView";

export const metadata: Metadata = {
  title: "Obrigada — Comunidade Ember",
  description:
    "Cadastro recebido. Entre no grupo do WhatsApp para fazer parte da Comunidade Ember.",
};

export default function ObrigadoPage() {
  return <ObrigadoView />;
}
