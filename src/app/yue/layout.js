import { Noto_Sans_TC } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/app/providers";
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
  description: "一個專業嘅個人網站，用嚟展示技能、項目同經驗。",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-HK" suppressHydrationWarning>
      <body className={`${notoSansTC.className} bg-deep-space text-gray-300 transition-colors duration-500`}>
        <ThemeProvider>
          <Navbar />
          <main className="relative z-0 pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

