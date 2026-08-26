import {
  generateChinese,
  generateArticleVisual,
  generateOutline,
  planArticleVisuals,
  researchArticle,
  rewriteSelection,
  translateEnglish,
} from "@/lib/ai";
import {
  getArticle,
  markEnglishFromChinese,
  saveArticleVisual,
  setArticleStatus,
  setArticleVisualPlan,
  updateArticle,
} from "@/lib/notion";
import { publishArticle } from "@/lib/github";
import { visualFilename } from "@/lib/visuals";
import { errorResponse, readJson, AppError } from "@/lib/errors";
import { assertLocalRequest } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 900;

export async function POST(request, { params }) {
  try {
    assertLocalRequest(request);
    const { id, action } = await params;
    const body = await readJson(request);
    let article = await getArticle(id);

    if (action === "research") {
      const research = await researchArticle(article, body);
      article = await updateArticle(id, {
        research: research.markdown,
        expectedLastEditedTime: article.lastEditedTime,
      });
      return Response.json({ article, result: research });
    }
    if (action === "outline") {
      return Response.json({ result: await generateOutline(article) });
    }
    if (action === "generate-zh") {
      const generated = await generateChinese(article, body.outline);
      article = await updateArticle(id, {
        name: generated.title,
        locales: {
          zh: {
            ...generated,
            expectedLastEditedTime: article.locales.zh.lastEditedTime,
          },
        },
      });
      return Response.json({ article, result: generated });
    }
    if (action === "translate-en") {
      if (!article.locales.zh.body.trim()) throw new AppError("請先完成中文文章。");
      const generated = await translateEnglish(article);
      article = await markEnglishFromChinese(id, generated);
      return Response.json({ article, result: generated });
    }
    if (action === "visual-plan") {
      if (!article.locales.zh.body.trim() || !article.locales.en.body.trim()) {
        throw new AppError("請先完成中英文文章，再交給視覺內容 Agent。");
      }
      const plan = await planArticleVisuals(article, body.maxVisuals || article.maxVisuals);
      article = await setArticleVisualPlan(id, plan);
      return Response.json({ article, result: plan });
    }
    if (action === "generate-visual") {
      const visual = (article.visualManifest?.visuals || []).find(
        (item) => item.id === body.visualId,
      );
      if (!visual) throw new AppError("找不到這張圖片的視覺規劃。", 404);
      const generated = await generateArticleVisual(visual);
      article = await saveArticleVisual(id, visual.id, generated);
      return Response.json({
        article,
        result: {
          visualId: visual.id,
          filename: visualFilename(visual.id),
          model: generated.model,
        },
      });
    }
    if (action === "rewrite") {
      return Response.json({ result: await rewriteSelection(article, body) });
    }
    if (action === "publish") {
      return Response.json({ article: await publishArticle(id, "publish") });
    }
    if (action === "unpublish") {
      return Response.json({ article: await publishArticle(id, "unpublish") });
    }
    if (action === "archive") {
      if (article.status === "Published") article = await publishArticle(id, "unpublish");
      if (article.status === "Error") {
        throw new AppError("請先確認失敗的發布是否已合併；若已上線請先下架，否則還原為草稿。", 409);
      }
      return Response.json({ article: await setArticleStatus(id, "Archived") });
    }
    if (action === "restore") {
      return Response.json({ article: await setArticleStatus(id, "Draft") });
    }
    throw new AppError("不支援的操作。", 404);
  } catch (error) {
    return errorResponse(error);
  }
}
