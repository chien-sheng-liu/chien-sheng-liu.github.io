import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  locale: "zh",
  path: "/projects",
  title: "Data & AI 案例作品｜Morris Liu",
  description: "瀏覽 Morris Liu 的 22 個匿名 Data & AI 案例，涵蓋 O2O 物流分析、BI、資料工程、AI 產品、智慧交通與顧問交付。",
  image: "/media/selected-work/logistics-editorial.webp",
});

export default function ProjectsLayout({ children }) {
  return children;
}
