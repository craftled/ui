import { toJpeg } from "html-to-image";

export type ExportDomAsJpgOptions = {
  quality?: number;
  pixelRatio?: number;
};

/** Capture a DOM node and trigger a `.jpg` download. Demo/playground use only. */
export async function exportDomAsJpg(
  element: HTMLElement,
  filename: string,
  options: ExportDomAsJpgOptions = {}
): Promise<void> {
  const { quality = 0.92, pixelRatio = 2 } = options;

  const dataUrl = await toJpeg(element, {
    quality,
    pixelRatio,
    cacheBust: true,
  });

  const link = document.createElement("a");
  link.download = filename.endsWith(".jpg") ? filename : `${filename}.jpg`;
  link.href = dataUrl;
  link.click();
}

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** Filename from title slug or fallback prefix + ISO-ish timestamp. */
export function exportJpgFilename(
  title: string | undefined,
  fallbackPrefix = "chart-bar-ranked"
): string {
  const slug = title?.trim() ? slugify(title) : fallbackPrefix;
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  return `${slug || fallbackPrefix}-${timestamp}.jpg`;
}
