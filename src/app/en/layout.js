import "../globals.css";

export const metadata = {
  title: {
    template: '%s | Morris Liu · AI & Advisory',
    default: 'Morris Liu · AI & Advisory',
  },
  description: "Morris Liu — Consultant in Data & AI - Advisory Service at WSP (Asia) Limited from August 2026.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function LocaleLayout({ children }) {
  // Nested layout must not render <html> or <body>.
  // Root layout already provides ThemeProvider, Navbar, Footer.
  return children;
}
