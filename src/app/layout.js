
import "./globals.css";
import { ThemeProvider } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import LangDetect from "@/components/LangDetect";

export const metadata = {
  title: {
    template: '%s | Morris Liu · AI × Advisory',
    default: 'Morris Liu · AI × Advisory',
  },
  description: "Morris Liu — Consultant in Data & AI - Advisory Service at WSP (Asia) Limited from August 2026，連結 AI、資料與策略決策。",
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
