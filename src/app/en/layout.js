const siteUrl = "https://morris-liu.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Morris Liu",
    default: "Morris Liu · Data & AI Portfolio",
  },
  description: "The personal résumé and portfolio of Morris Liu, featuring work across data, AI, analytics, and product delivery.",
  alternates: {
    canonical: "/en",
    languages: {
      "zh-Hant": "/",
      en: "/en",
    },
  },
  openGraph: {
    title: "Morris Liu · Data & AI Portfolio",
    description: "The personal résumé, selected work, and Data / AI notes of Morris Liu.",
    url: `${siteUrl}/en`,
    siteName: "Morris Liu",
    locale: "en_US",
    type: "website",
    images: [{ url: "/profile.png", width: 1200, height: 1200, alt: "Morris Liu" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morris Liu · Data & AI Portfolio",
    description: "The personal résumé, selected work, and Data / AI notes of Morris Liu.",
    images: ["/profile.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function LocaleLayout({ children }) {
  // Nested layout must not render <html> or <body>.
  // Root layout already provides ThemeProvider, Navbar, Footer.
  return children;
}
