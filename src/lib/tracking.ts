type TrackParams = Record<
  string,
  string | number | boolean | null | undefined
>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params: TrackParams = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

export function trackPageView(pagePath: string) {
  trackEvent("page_view", {
    page_path: pagePath,
    page_location:
      typeof window !== "undefined"
        ? `${window.location.origin}${pagePath}`
        : pagePath,
    page_title: typeof document !== "undefined" ? document.title : "",
  });
}

export function trackLead(service: string, audience: string) {
  trackEvent("generate_lead", {
    event_category: "consultation",
    event_label: service,
    service,
    audience,
    value: 1,
    currency: "ZAR",
  });

  if (typeof window === "undefined") return;
  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead", {
      content_name: service,
      content_category: audience,
      value: 1,
      currency: "ZAR",
    });
  }
}
