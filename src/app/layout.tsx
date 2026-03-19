import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
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

const GTM_ID = "GTM-W92N8LBX";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-ZA"
      className={`${font.variable} ${displayFont.variable} antialiased`}
    >
      <head>
        <Script id="gtm-base" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body className="relative flex min-h-screen flex-col bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ScrollProgressBar />
        <WaterCursor />

        <header className="fixed inset-x-0 top-0 z-[70]">
          <TopHeader />
          <MainHeader />
        </header>

        <main className="flex-1 pt-[var(--hdr)]">{children}</main>

        <FooterSection />
        <ScrollToTopButton />
        <CookieBanner />
        <AnalyticsProvider />
        <StructuredData data={[getOrganizationSchema(), getWebsiteSchema()]} />

        <span className="sr-only">Contact: {CONTACT_DETAILS.phoneLocal}</span>
      </body>
    </html>
  );
}
