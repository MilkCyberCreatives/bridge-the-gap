"use client";

import dynamic from "next/dynamic";

const ScrollProgressBar = dynamic(() => import("@/components/ui/ScrollProgressBar"), {
  ssr: false,
});
const ScrollToTopButton = dynamic(() => import("@/components/ui/ScrollToTopButton"), {
  ssr: false,
});
const WaterCursor = dynamic(() => import("@/components/ui/WaterCursor"), {
  ssr: false,
});
const CookieBanner = dynamic(() => import("@/components/ui/CookieBanner"), {
  ssr: false,
});
const AnalyticsProvider = dynamic(() => import("@/components/analytics/AnalyticsProvider"), {
  ssr: false,
});

export default function ClientEnhancements() {
  return (
    <>
      <ScrollProgressBar />
      <WaterCursor />
      <ScrollToTopButton />
      <CookieBanner />
      <AnalyticsProvider />
    </>
  );
}
