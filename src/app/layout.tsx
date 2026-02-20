import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import TopHeader from "@/components/layout/TopHeader";
import MainHeader from "@/components/layout/MainHeader";
import FooterSection from "@/components/layout/FooterSection";
import ScrollToTop from "@/components/ui/ScrollToTop";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import FloatingWhatsAppButton from "@/components/ui/FloatingWhatsAppButton";
import CookieBanner from "@/components/ui/CookieBanner";
import WaterCursor from "@/components/ui/WaterCursor";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import { CONTACT_DETAILS } from "@/data/site";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const siteName = "Bridge The Gap Educational Services";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bridge-the-gap-delta.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Education Support and Professional Development`,
    template: `%s | ${siteName}`,
  },
  description:
    "Bridge The Gap Educational Services provides tutoring services, matric support, teacher professional development, and coaching across CAPS and IB curricula.",
  alternates: { canonical: siteUrl },
  icons: {
    icon: "/bridge-the-gap-icon.svg",
    shortcut: "/bridge-the-gap-icon.svg",
    apple: "/bridge-the-gap-icon.svg",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: `${siteName} | Education Support and Professional Development`,
    description:
      "Support for school leaders, parents, and learners through tutoring, matric support, coaching, and educator development.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA" className={`${font.variable} antialiased`}>
      <body className="relative min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
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

        <main className="pt-[var(--hdr)]">{children}</main>

        <FooterSection />
        <FloatingWhatsAppButton />
        <ScrollToTop />
        <CookieBanner />
        <AnalyticsProvider />

        <span className="sr-only">
          Contact: {CONTACT_DETAILS.phoneLocal} - {CONTACT_DETAILS.addressLine}
        </span>
      </body>
    </html>
  );
}
