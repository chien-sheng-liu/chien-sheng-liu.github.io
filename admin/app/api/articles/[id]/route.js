import { getArticle, trashArticle, updateArticle } from "@/lib/notion";
import { errorResponse, readJson } from "@/lib/errors";
import { assertLocalRequest } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    assertLocalRequest(request);
    const { id } = await params;
    return Response.json({ article: await getArticle(id) });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request, { params }) {
  try {
    assertLocalRequest(request);
    const { id } = await params;
    return Response.json({ article: await updateArticle(id, await readJson(request)) });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request, { params }) {
  try {
    assertLocalRequest(request);
    const { id } = await params;
    const body = await readJson(request);
    const article = await getArticle(id);
    if (body.confirmTitle !== article.name) {
      return Response.json({ error: "確認標題不相符。" }, { status: 422 });
    }
    await trashArticle(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    return errorResponse(error);
  }
}
