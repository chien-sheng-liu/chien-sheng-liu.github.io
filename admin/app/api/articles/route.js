import { createArticle, listArticles } from "@/lib/notion";
import { errorResponse, readJson } from "@/lib/errors";
import { assertLocalRequest } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    assertLocalRequest(request);
    return Response.json({ articles: await listArticles() });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request) {
  try {
    assertLocalRequest(request);
    const article = await createArticle(await readJson(request));
    return Response.json({ article }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
