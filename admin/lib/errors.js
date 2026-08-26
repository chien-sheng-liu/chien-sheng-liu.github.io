export class AppError extends Error {
  constructor(message, status = 400, details) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.details = details;
  }
}

export function errorResponse(error) {
  const status = error?.status || 500;
  const knownError = error instanceof AppError;
  const message =
    knownError || status < 500
      ? error.message
      : `系統處理失敗：${error?.message || "未知錯誤"}`;
  if (status >= 500) console.error(error);
  return Response.json(
    { error: message, details: knownError ? error?.details : undefined },
    { status },
  );
}

export async function readJson(request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new AppError("只接受 JSON 請求。", 415);
  }
  return request.json();
}
