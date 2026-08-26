import { spawnSync } from "node:child_process";

export function githubStatus() {
  const result = spawnSync("gh", ["auth", "status", "--hostname", "github.com"], {
    encoding: "utf8",
    env: { ...process.env, GH_PROMPT_DISABLED: "true" },
    timeout: 10_000,
  });
  const authenticated = result.status === 0;
  return {
    installed: !result.error || result.error.code !== "ENOENT",
    authenticated,
    message: authenticated
      ? ""
      : (result.stderr || result.stdout || "")
          .replace(/gh[opurs]_[A-Za-z0-9_]+/g, "[redacted]")
          .trim(),
  };
}
