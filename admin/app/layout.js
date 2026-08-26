import "./globals.css";

export const metadata = {
  title: "Morris Writing Studio",
  description: "Local-first bilingual article studio",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
