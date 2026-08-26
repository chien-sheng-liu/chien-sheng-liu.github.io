import { AppError } from "./errors.js";

export function assertLocalRequest(request) {
  const host = request.headers.get("host") || "";
  const origin = request.headers.get("origin");
  if (!/^(127\.0\.0\.1|localhost)(:\d+)?$/.test(host)) {
    throw new AppError("Admin 只允許從本機存取。", 403);
  }
  if (origin) {
    const originHost = new URL(origin).host;
    if (originHost !== host) throw new AppError("拒絕跨來源操作。", 403);
  }
}
