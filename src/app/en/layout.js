import "../globals.css";

const siteUrl = "https://morris-liu.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Morris Liu · Data & AI Advisory",
    default: "Morris Liu · Data & AI Advisory",
  },
  description: "Morris Liu — WSP Data & AI Consultant and founder of Mentarix Data Studio, connecting cross-market BI, GenAI, data engineering, and business decisions.",
  alternates: {
    canonical: "/en",
    languages: {
      "zh-Hant": "/",
      en: "/en",
    },
  },
  openGraph: {
    title: "Morris Liu · Data & AI Advisory",
    description: "WSP Data & AI Consultant and founder of Mentarix Data Studio, connecting BI, GenAI, data engineering, and business decisions.",
    url: `${siteUrl}/en`,
    siteName: "Morris Liu",
    locale: "en_US",
    type: "website",
    images: [{ url: "/profile.png", width: 1200, height: 1200, alt: "Morris Liu" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morris Liu · Data & AI Advisory",
    description: "WSP Data & AI Consultant and founder of Mentarix Data Studio, connecting BI, GenAI, data engineering, and business decisions.",
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
