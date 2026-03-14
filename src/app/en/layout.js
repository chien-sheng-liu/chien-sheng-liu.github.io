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
    template: '%s | Personal Website',
    default: 'Personal Website',
  },
  description: "A professional personal website to showcase skills, projects, and experience.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
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

