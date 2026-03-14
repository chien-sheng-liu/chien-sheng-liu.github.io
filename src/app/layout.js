
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: {
    template: '%s | 個人網站',
    default: '個人網站',
  },
  description: "一個專業的個人網站，用於展示技能、專案和經驗。",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className={`${notoSansTC.className} bg-deep-space text-gray-300 transition-colors duration-500`}>
        <ThemeProvider>
          <Navbar />
          {/* Ensure the main content area has padding top to not be obscured by the fixed navbar */}
          <main className="relative z-0 pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
