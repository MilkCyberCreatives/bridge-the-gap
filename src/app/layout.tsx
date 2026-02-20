import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
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
const CookieBanner = dynamic(() => import("@/components/ui/CookieBanner"), {
  ssr: false,
});
const AnalyticsProvider = dynamic(() => import("@/components/analytics/AnalyticsProvider"), {
  ssr: false,
});

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});
const displayFont = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
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
    <html
      lang="en-ZA"
      className={`${font.variable} ${displayFont.variable} antialiased`}
    >
      <body className="relative flex min-h-screen flex-col bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
        <ScrollProgressBar />

        <header className="fixed inset-x-0 top-0 z-[70]">
          <TopHeader />
          <MainHeader />
        </header>

        <main className="flex-1 pt-[var(--hdr)]">{children}</main>

        <FooterSection />
        <ScrollToTop />
        <CookieBanner />
        <AnalyticsProvider />
        <StructuredData data={[getOrganizationSchema(), getWebsiteSchema()]} />

        <span className="sr-only">Contact: {CONTACT_DETAILS.phoneLocal}</span>
      </body>
    </html>
  );
}
