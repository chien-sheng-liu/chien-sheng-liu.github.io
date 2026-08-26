import { publicConfig } from "@/lib/config";
import { githubStatus } from "@/lib/github-status";
import { errorResponse } from "@/lib/errors";
import { assertLocalRequest } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    assertLocalRequest(request);
    return Response.json({ ...publicConfig(), github: githubStatus() });
  } catch (error) {
    return errorResponse(error);
  }
}
