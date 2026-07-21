import "../globals.css";

const siteUrl = "https://morris-liu.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | Morris Liu · AI & Advisory',
    default: 'Morris Liu · AI & Advisory',
  },
  description: "Morris Liu — Consultant in Data & AI - Advisory Service at WSP (Asia) Limited, bridging analytics, advisory delivery, and business execution.",
  alternates: {
    canonical: "/en",
    languages: {
      "zh-Hant": "/",
      en: "/en",
    },
  },
  openGraph: {
    title: "Morris Liu · Data & AI Advisory",
    description: "Consultant in Data & AI - Advisory Service at WSP (Asia) Limited, bridging analytics, advisory delivery, and business execution.",
    url: `${siteUrl}/en`,
    siteName: "Morris Liu",
    locale: "en_US",
    type: "website",
    images: [{ url: "/profile.png", width: 1200, height: 1200, alt: "Morris Liu" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morris Liu · Data & AI Advisory",
    description: "Consultant in Data & AI - Advisory Service at WSP (Asia) Limited, bridging analytics, advisory delivery, and business execution.",
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
