import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import type { SourceFile } from "@/components/preview-code-tabs";
import { highlight, langFromPath } from "@/lib/highlight";

/**
 * Read a built registry item JSON from `public/r/<name>.json` and return
 * one `SourceFile` per shipped source file, with each one's content
 * highlighted via shiki. Used by the preview routes' "Code" tab.
 *
 * `shadcn build` writes these JSONs at build time so the source the user
 * would actually install (via the shadcn CLI) is exactly what we display.
 */
export async function readRegistryFiles(name: string): Promise<SourceFile[]> {
  const filePath = path.join(process.cwd(), "public", "r", `${name}.json`);
  let raw: string;
  try {
    raw = await fs.readFile(filePath, "utf8");
  } catch {
    return [];
  }

  const json = JSON.parse(raw) as {
    files?: Array<{ path: string; content?: string }>;
  };

  if (!json.files?.length) {
    return [];
  }

  const out: SourceFile[] = [];
  for (const f of json.files) {
    const content = f.content ?? "";
    if (!content) {
      continue;
    }
    out.push({
      path: f.path,
      raw: content,
      html: await highlight(content, langFromPath(f.path)),
    });
  }
  return out;
}
