"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getCookieConsent } from "@/components/ui/CookieBanner";
import { trackEvent, trackPageView } from "@/lib/tracking";

export default function AnalyticsProvider() {
  const [allowAnalytics, setAllowAnalytics] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "";
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pagePath = useMemo(() => {
    const query = searchParams?.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  useEffect(() => {
    setAllowAnalytics(getCookieConsent() === "granted");
  }, []);

  useEffect(() => {
    if (!allowAnalytics) return;
    if (gaId) {
      trackPageView(pagePath);
    }
    if (metaPixelId && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [allowAnalytics, gaId, metaPixelId, pagePath]);

  useEffect(() => {
    if (!allowAnalytics) return;

    const handleTrackedClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const trackNode = target?.closest<HTMLElement>("[data-track]");
      if (!trackNode) return;

      const eventLabel = trackNode.dataset.track || "cta_click";
      const location = trackNode.dataset.trackLocation || pagePath;

      trackEvent("select_content", {
        content_type: "cta",
        item_id: eventLabel,
        location,
      });

      if (metaPixelId && typeof window.fbq === "function") {
        window.fbq("trackCustom", "CtaClick", {
          label: eventLabel,
          location,
        });
      }
    };

    document.addEventListener("click", handleTrackedClick);
    return () => {
      document.removeEventListener("click", handleTrackedClick);
    };
  }, [allowAnalytics, metaPixelId, pagePath]);

  if (!allowAnalytics) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />

      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              window.gtag = function(){window.dataLayer.push(arguments);}
              window.gtag('js', new Date());
              window.gtag('config', '${gaId}', { anonymize_ip: true, send_page_view: false });
            `}
          </Script>
        </>
      ) : null}

      {metaPixelId ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
          `}
        </Script>
      ) : null}
    </>
  );
}
