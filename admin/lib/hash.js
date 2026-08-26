import crypto from "node:crypto";

export function contentHash(value = "") {
  return crypto.createHash("sha256").update(value.trim()).digest("hex").slice(0, 16);
}
