import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  locale: "zh",
  path: "/articles",
  title: "Data、AI 與 Analytics 實務筆記｜Morris Liu",
  description: "Morris Liu 關於資料分析、AI 系統、LLM、Data Career、Consulting 與跨市場經驗的雙語實務文章。",
  image: "/media/selected-work/martech-editorial.webp",
});

export default function ArticlesLayout({ children }) {
  return children;
}
