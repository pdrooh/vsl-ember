/** Segundos assistidos a partir dos quais todo o texto + cadastro aparecem de uma vez. */
export const REVEAL_ALL_AT_SEC = 100; // 1:40

/** Ids usados por `isRevealed` (hero reservado; a página usa só os demais). */
export const REVEAL_STEPS = [
  { id: "hero" },
  { id: "abertura" },
  { id: "identificacao" },
  { id: "atmosfera" },
  { id: "peso" },
  { id: "urgencia" },
  { id: "final" },
] as const;

export type RevealBlockId = (typeof REVEAL_STEPS)[number]["id"];
