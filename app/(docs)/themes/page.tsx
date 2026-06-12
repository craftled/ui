import { DocsShell } from "@/components/docs-shell";
import { BRAND_THEMES } from "@/lib/brand-themes";
import { themeItems } from "@/lib/registry";

export default function ThemesPage() {
  return (
    <DocsShell>
      <div className="flex flex-col gap-10">
        <header className="space-y-3">
          <h1 className="font-semibold text-3xl tracking-tight">
            Brand themes
          </h1>
          <p className="max-w-prose text-muted-foreground text-sm leading-relaxed">
            Craftled brands are shadcn-native{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              registry:theme
            </code>{" "}
            presets — the same{" "}
            <code className="font-mono text-xs">cssVars</code> shape as upstream
            color themes. Switch live from the sidebar on this site, or install
            into your app with the CLI.
          </p>
        </header>

        <div className="grid gap-4">
          {themeItems.map((item) => {
            const brand = BRAND_THEMES.find(
              (b) => b.registryName === item.name
            );
            return (
              <section
                className="space-y-3 rounded-lg border bg-card p-5"
                key={item.name}
              >
                <div className="space-y-1">
                  <h2 className="font-medium text-lg">{item.title}</h2>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
                <pre className="overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-sm">
                  {`bunx shadcn@latest add @craftled/${item.name}`}
                </pre>
                {brand?.lightOnly ? (
                  <p className="text-[11px] text-muted-foreground">
                    Light-only parchment system — dark mode is disabled when
                    this brand is active on the docs site.
                  </p>
                ) : null}
                {brand?.brandDoc ? (
                  <p className="text-[11px] text-muted-foreground">
                    Reference:{" "}
                    <code className="font-mono">{brand.brandDoc}</code>
                  </p>
                ) : null}
              </section>
            );
          })}
        </div>
      </div>
    </DocsShell>
  );
}
