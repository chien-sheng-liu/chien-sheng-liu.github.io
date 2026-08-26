import JsonLd from "@/components/JsonLd";
import { buildPageMetadata, profilePageJsonLd } from "@/lib/seo";

export const metadata = buildPageMetadata({
  locale: "zh",
  path: "/about",
  title: "關於 Morris Liu｜Data & AI Consultant",
  description: "認識 Morris Liu 從台灣、德國到香港的跨市場經歷，涵蓋 BI、資料分析、AI、資料工程、團隊管理與顧問交付。",
});

export default function AboutLayout({ children }) {
  return <><JsonLd data={profilePageJsonLd("zh")} />{children}</>;
}
