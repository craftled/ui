import type { Metadata } from "next";

import { DocsShell } from "@/components/docs-shell";
import { FeaturedFxExplorer } from "@/components/featured-fx-explorer";
import type { SourceFile } from "@/components/preview-code-tabs";
import { FEATURED_FX_IDS, FEATURED_FX_ITEM } from "@/lib/registry";
import { readRegistryFiles } from "@/lib/source";

export const metadata: Metadata = {
  title: FEATURED_FX_ITEM.title,
  description: FEATURED_FX_ITEM.description,
};

export default async function FeaturedEffectsPage() {
  const entries = await Promise.all(
    FEATURED_FX_IDS.map(
      async (id) => [id, await readRegistryFiles(id)] as const
    )
  );

  const filesByEffect: Record<string, SourceFile[]> =
    Object.fromEntries(entries);
  const installByEffect: Record<string, string> = Object.fromEntries(
    FEATURED_FX_IDS.map((id) => [
      id,
      `bunx shadcn@latest add https://ui.craftled.com/r/${id}.json`,
    ])
  );

  return (
    <DocsShell>
      <FeaturedFxExplorer
        filesByEffect={filesByEffect}
        installByEffect={installByEffect}
      />
    </DocsShell>
  );
}
