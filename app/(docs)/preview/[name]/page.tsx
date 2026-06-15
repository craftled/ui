import { notFound, redirect } from "next/navigation";

import { DocsShell } from "@/components/docs-shell";
import { FullBleedPreview } from "@/components/fullbleed-preview";
import { PreviewCodeTabs } from "@/components/preview-code-tabs";
import { demos, FEATURED_FX_IDS, getItem } from "@/lib/registry";
import { readRegistryFiles } from "@/lib/source";

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  // Per-effect pages folded into the unified explorer — keep old links alive.
  if (FEATURED_FX_IDS.includes(name)) {
    redirect("/preview/featured-effects");
  }

  const item = getItem(name);
  const Demo = demos[name];
  if (!(item && Demo)) {
    notFound();
  }

  const installCmd = `bunx shadcn@latest add https://ui.craftled.com/r/${name}.json`;
  const files = await readRegistryFiles(name);

  // Full-bleed: render the demo inside an iframe with viewport toggle.
  if (item.layout === "fullwidth") {
    return (
      <FullBleedPreview
        description={item.description}
        files={files}
        installCmd={installCmd}
        name={name}
        title={item.title}
      />
    );
  }

  // Contained (default): docs chrome + Preview/Code tabs.
  return (
    <DocsShell>
      <div className="flex flex-col gap-8">
        <header className="space-y-3">
          <div className="space-y-1">
            <h1 className="font-semibold text-3xl tracking-tight">
              {item.title}
            </h1>
            <p className="max-w-md text-pretty text-muted-foreground text-sm">
              {item.description}
            </p>
          </div>
          <pre className="w-fit overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-sm">
            {installCmd}
          </pre>
        </header>

        <PreviewCodeTabs
          contentClassName="p-2"
          files={files}
          preview={<Demo />}
        />
      </div>
    </DocsShell>
  );
}
