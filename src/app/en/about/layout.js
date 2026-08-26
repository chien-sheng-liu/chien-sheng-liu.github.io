import JsonLd from "@/components/JsonLd";
import { buildPageMetadata, profilePageJsonLd } from "@/lib/seo";

export const metadata = buildPageMetadata({
  locale: "en",
  path: "/about",
  title: "About Morris Liu | Data & AI Consultant",
  description: "Explore Morris Liu's cross-market journey across Taiwan, Germany, and Hong Kong, spanning BI, analytics, AI, data engineering, team leadership, and advisory delivery.",
});

export default function AboutLayout({ children }) {
  return <><JsonLd data={profilePageJsonLd("en")} />{children}</>;
}
