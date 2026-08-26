import { initializeNotion } from "@/lib/notion";
import { errorResponse, readJson } from "@/lib/errors";
import { assertLocalRequest } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    assertLocalRequest(request);
    const body = await readJson(request);
    const result = await initializeNotion(
      body.databaseReference || process.env.NOTION_DATABASE_URL || process.env.NOTION_DATABASE_ID,
    );
    return Response.json(result, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
