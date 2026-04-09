declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(
  event: string,
  payload?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event, ...payload });
}
