import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  locale: "en",
  path: "/contact",
  title: "Contact Morris Liu | Data & AI Collaboration",
  description: "Contact Morris Liu about Data & AI, BI, cross-market analytics, advisory work, career opportunities, speaking, and teaching.",
});

export default function ContactLayout({ children }) {
  return children;
}
