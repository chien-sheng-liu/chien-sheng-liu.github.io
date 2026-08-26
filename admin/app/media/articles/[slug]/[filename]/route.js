import { getArticle, listArticles } from "@/lib/notion";
import { errorResponse } from "@/lib/errors";
import { assertLocalRequest } from "@/lib/security";
import { readVisualAsset, visualFilename } from "@/lib/visuals";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    assertLocalRequest(request);
    const { slug, filename } = await params;
    const summary = (await listArticles()).find((article) => article.slug === slug);
    if (!summary) return new Response("Not found", { status: 404 });
    const article = await getArticle(summary.id);
    const visual = (article.visualManifest?.visuals || []).find(
      (item) => item.filename === filename && item.status === "ready",
    );
    if (!visual || visualFilename(visual.id) !== filename) {
      return new Response("Not found", { status: 404 });
    }
    const bytes = await readVisualAsset(article, filename);
    return new Response(bytes, {
      headers: {
        "Content-Type": "image/webp",
        "Content-Length": String(bytes.length),
        "Cache-Control": "private, max-age=60",
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
