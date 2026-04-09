/** Frações da duração total do vídeo (base ~3 min) — adapta a qualquer comprimento. */
export const REVEAL_STEPS = [
  { fraction: 0, id: "hero" },
  { fraction: 20 / 180, id: "abertura" },
  { fraction: 40 / 180, id: "identificacao" },
  { fraction: 60 / 180, id: "atmosfera" },
  { fraction: 90 / 180, id: "proposito" },
  { fraction: 120 / 180, id: "peso" },
  { fraction: 150 / 180, id: "urgencia" },
  { fraction: 168 / 180, id: "final" },
] as const;

export type RevealBlockId = (typeof REVEAL_STEPS)[number]["id"];
