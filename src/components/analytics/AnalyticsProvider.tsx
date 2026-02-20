"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getCookieConsent } from "@/components/ui/CookieBanner";

export default function AnalyticsProvider() {
  const [allowAnalytics, setAllowAnalytics] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "";

  useEffect(() => {
    setAllowAnalytics(getCookieConsent() === "granted");
  }, []);

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
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}
