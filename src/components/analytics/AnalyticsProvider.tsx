"use client";

import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getCookieConsent } from "@/components/ui/CookieBanner";

export default function AnalyticsProvider() {
  const consent =
    typeof window !== "undefined" ? getCookieConsent() : null;

  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

  const allowAnalytics = consent === "granted";

  return (
    <>
      {/* ✅ Vercel Analytics + Speed Insights (only when consent granted) */}
      {allowAnalytics ? (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      ) : null}

      {/* ✅ Optional GA4 (only loads when consent granted AND GA ID exists) */}
      {allowAnalytics && GA_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}
