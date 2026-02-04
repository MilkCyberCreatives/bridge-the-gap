import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import TopHeader from "@/components/layout/TopHeader";
import MainHeader from "@/components/layout/MainHeader";
import WaterCursor from "@/components/ui/WaterCursor";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const siteName = "Bridge The Gap Educational Services";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Touching the Future Through Meaningful Learning`,
    template: `%s | ${siteName}`,
  },
  description:
    "Bridge The Gap Educational Services offers learner support (Grade R–12), matric rewrite support, and educator development aligned to CAPS and IEB in South Africa.",
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
    title: `${siteName} | Touching the Future Through Meaningful Learning`,
    description:
      "Learner academic support, matric rewrite programmes, and teacher development aligned to CAPS and IEB.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA" className={font.variable}>
      <body className="min-h-screen bg-bg text-fg">
        {/* ✅ enables global water hover cursor ripple */}
        <WaterCursor />

        {/* background wash */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(250,78,27,0.14),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(248,135,24,0.12),transparent_45%),radial-gradient(circle_at_40%_90%,rgba(0,0,0,0.06),transparent_55%)]" />
          <div className="absolute inset-0 bg-grain opacity-60" />
        </div>

        {/* ✅ FIXED header stack (no gap) */}
        <header className="fixed inset-x-0 top-0 z-[60]">
          <TopHeader />
          <MainHeader />
        </header>

        {/* ✅ default offset for every page content */}
        <main className="pt-[var(--hdr)]">{children}</main>
      </body>
    </html>
  );
}
