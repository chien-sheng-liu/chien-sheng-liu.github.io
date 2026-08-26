import EditorialHome from "@/components/EditorialHome";
import JsonLd from "@/components/JsonLd";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <JsonLd data={websiteJsonLd("zh")} />
      <JsonLd data={personJsonLd("zh")} />
      <EditorialHome locale="zh" />
    </>
  );
}
