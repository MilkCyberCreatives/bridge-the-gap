import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import TopHeader from "@/components/layout/TopHeader";
import MainHeader from "@/components/layout/MainHeader";
import FooterSection from "@/components/layout/FooterSection";
import StructuredData from "@/components/seo/StructuredData";
import { CONTACT_DETAILS } from "@/data/site";
import {
  buildPageMetadata,
  getOrganizationSchema,
  getWebsiteSchema,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

const ScrollToTop = dynamic(() => import("@/components/ui/ScrollToTop"), {
  ssr: false,
});
const ScrollProgressBar = dynamic(() => import("@/components/ui/ScrollProgressBar"), {
  ssr: false,
});
const FloatingWhatsAppButton = dynamic(
  () => import("@/components/ui/FloatingWhatsAppButton"),
  { ssr: false }
);
const CookieBanner = dynamic(() => import("@/components/ui/CookieBanner"), {
  ssr: false,
});
const WaterCursor = dynamic(() => import("@/components/ui/WaterCursor"), {
  ssr: false,
});
const AnalyticsProvider = dynamic(() => import("@/components/analytics/AnalyticsProvider"), {
  ssr: false,
});

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
});

const baseMetadata = buildPageMetadata({
  title: "Education Support and Professional Development",
  description: SITE_DESCRIPTION,
  path: "/",
});

export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Education Support and Professional Development`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  category: "Education",
  icons: {
    icon: "/bridge-the-gap-icon.svg",
    shortcut: "/bridge-the-gap-icon.svg",
    apple: "/bridge-the-gap-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA" className={`${font.variable} antialiased`}>
      <body className="relative flex min-h-screen flex-col bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
        <ScrollProgressBar />
        <WaterCursor />

        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(250,78,27,0.14),transparent_42%),radial-gradient(circle_at_88%_18%,rgba(248,135,24,0.12),transparent_40%),radial-gradient(circle_at_45%_90%,rgba(0,0,0,0.05),transparent_52%)]" />
          <div className="absolute inset-0 bg-grain opacity-60" />
        </div>

        <header className="fixed inset-x-0 top-0 z-[70]">
          <TopHeader />
          <MainHeader />
        </header>

        <main className="flex-1 pt-[var(--hdr)]">{children}</main>

        <FooterSection />
        <FloatingWhatsAppButton />
        <ScrollToTop />
        <CookieBanner />
        <AnalyticsProvider />
        <StructuredData data={[getOrganizationSchema(), getWebsiteSchema()]} />

        <span className="sr-only">Contact: {CONTACT_DETAILS.phoneLocal}</span>
      </body>
    </html>
  );
}
