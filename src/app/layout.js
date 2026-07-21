
import "./globals.css";
import { ThemeProvider } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import LangDetect from "@/components/LangDetect";

const siteUrl = "https://morris-liu.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | Morris Liu · AI × Advisory',
    default: 'Morris Liu · AI × Advisory',
  },
  description: "Morris Liu — Consultant in Data & AI - Advisory Service at WSP (Asia) Limited，連結分析、顧問交付與商業決策。",
  alternates: {
    canonical: "/",
    languages: {
      "zh-Hant": "/",
      en: "/en",
    },
  },
  openGraph: {
    title: "Morris Liu · Data & AI Advisory",
    description: "Consultant in Data & AI - Advisory Service at WSP (Asia) Limited，連結分析、顧問交付與商業決策。",
    url: siteUrl,
    siteName: "Morris Liu",
    locale: "zh_HK",
    type: "website",
    images: [{ url: "/profile.png", width: 1200, height: 1200, alt: "Morris Liu" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morris Liu · Data & AI Advisory",
    description: "Consultant in Data & AI - Advisory Service at WSP (Asia) Limited，連結分析、顧問交付與商業決策。",
    images: ["/profile.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className="bg-[#0a0a0a] text-white antialiased">
        <ThemeProvider>
          <LangDetect />
          <CursorGlow />
          <Navbar />
          <main className="relative z-0 pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
