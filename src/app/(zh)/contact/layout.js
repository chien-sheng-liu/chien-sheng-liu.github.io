import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  locale: "zh",
  path: "/contact",
  title: "聯絡 Morris Liu｜Data & AI 合作與職涯交流",
  description: "聯絡 Morris Liu，討論 Data & AI、BI、跨市場分析、顧問合作、職涯機會、演講與教學。",
});

export default function ContactLayout({ children }) {
  return children;
}
