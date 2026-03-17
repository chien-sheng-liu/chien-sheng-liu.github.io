import "../globals.css";

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

export default function LocaleLayout({ children }) {
  // Nested layout must not render <html> or <body>.
  // Root layout already provides ThemeProvider, Navbar, Footer.
  return children;
}
