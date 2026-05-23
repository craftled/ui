import "server-only";

import { createHighlighter, type Highlighter } from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: ["tsx", "ts", "jsx", "json", "css", "bash"],
    });
  }
  return highlighterPromise;
}

/**
 * Highlight a source string to HTML. Uses shiki's dual-theme mode so
 * the same HTML serves both light and dark modes via inline CSS.
 *
 * Pair with the `.dark .shiki, .dark .shiki span` selector rule in
 * globals.css that swaps `color` with the `--shiki-dark` variable shiki
 * injects per token.
 */
export async function highlight(
  code: string,
  lang: "tsx" | "ts" | "jsx" | "json" | "css" | "bash" = "tsx"
): Promise<string> {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: "light",
    cssVariablePrefix: "--shiki-",
  });
}

/**
 * Pick a sensible shiki language id from a file path.
 */
export function langFromPath(
  path: string
): "tsx" | "ts" | "jsx" | "json" | "css" {
  const ext = path.split(".").pop()?.toLowerCase();
  if (ext === "tsx") {
    return "tsx";
  }
  if (ext === "ts") {
    return "ts";
  }
  if (ext === "jsx") {
    return "jsx";
  }
  if (ext === "css") {
    return "css";
  }
  return "json";
}
