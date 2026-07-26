
import "./globals.css";
import "./jreast.css";
import { ThemeProvider } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LangDetect from "@/components/LangDetect";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import SiteMotion from "@/components/SiteMotion";

const siteUrl = "https://morris-liu.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Morris Liu",
    default: "Morris Liu · Data & AI Portfolio",
  },
  description: "Morris Liu 的個人履歷與作品集，記錄 Data、AI、跨市場分析與產品實作經驗。",
  alternates: {
    canonical: "/",
    languages: {
      "zh-Hant": "/",
      en: "/en",
    },
  },
  openGraph: {
    title: "Morris Liu · Data & AI Portfolio",
    description: "Morris Liu 的個人履歷、作品與 Data / AI 實作筆記。",
    url: siteUrl,
    siteName: "Morris Liu",
    locale: "zh_TW",
    type: "website",
    images: [{ url: "/profile.webp", width: 1600, height: 1200, alt: "Morris Liu" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morris Liu · Data & AI Portfolio",
    description: "Morris Liu 的個人履歷、作品與 Data / AI 實作筆記。",
    images: ["/profile.webp"],
  },
  icons: {
    icon: {
      url: "/favicon.svg?v=2",
      type: "image/svg+xml",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className="bg-white text-[#111] antialiased">
        <ThemeProvider>
          <LangDetect />
          <SmoothScrollProvider>
            <SiteMotion />
            <Navbar />
            <main className="site-main">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
