import "../globals.css";

export const metadata = {
  title: {
    template: '%s | Morris Liu · AI & Strategy',
    default: 'Morris Liu · AI & Strategy',
  },
  description: "Morris Liu — Data scientist and AI strategist turning data into clear narratives and business value.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function LocaleLayout({ children }) {
  // Nested layout must not render <html> or <body>.
  // Root layout already provides ThemeProvider, Navbar, Footer.
  return children;
}
