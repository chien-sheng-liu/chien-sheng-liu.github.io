
import "../globals.css";
import "../jreast.css";
import { ThemeProvider } from "../providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import SiteMotion from "@/components/SiteMotion";
import { buildSiteMetadata } from "@/lib/seo";

export const metadata = buildSiteMetadata("zh");

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className="bg-white text-[#111] antialiased">
        <ThemeProvider>
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
