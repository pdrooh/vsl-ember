const ID_RE = /^[\w-]{11}$/;

/** Aceita youtu.be, watch?v=, /embed/ e URLs sem esquema. */
export function extractYoutubeVideoId(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;
  try {
    const href = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    const u = new URL(href);
    const host = u.hostname.replace(/^www\./i, "");
    if (host === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      return id && ID_RE.test(id) ? id : null;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname.startsWith("/embed/")) {
        const id = u.pathname.slice("/embed/".length).split("/")[0];
        return id && ID_RE.test(id) ? id : null;
      }
      const v = u.searchParams.get("v");
      return v && ID_RE.test(v) ? v : null;
    }
  } catch {
    return null;
  }
  return null;
}

let iframeApiPromise: Promise<void> | null = null;

/** Carrega https://www.youtube.com/iframe_api uma vez (client-side). */
export function loadYoutubeIframeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  const w = window as Window & {
    YT?: { Player: new (id: string, options: unknown) => unknown };
    onYouTubeIframeAPIReady?: () => void;
  };

  if (w.YT?.Player) return Promise.resolve();

  if (!iframeApiPromise) {
    iframeApiPromise = new Promise((resolve) => {
      const prev = w.onYouTubeIframeAPIReady;
      w.onYouTubeIframeAPIReady = () => {
        prev?.();
        resolve();
      };
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    });
  }

  return iframeApiPromise;
}
