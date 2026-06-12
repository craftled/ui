import { DocsShell } from "@/components/docs-shell";
import { demos, previewItems, themeItems } from "@/lib/registry";

export default function Home() {
  return (
    <DocsShell>
      <div className="flex flex-col gap-12">
        <header className="space-y-3">
          <h1 className="font-semibold text-4xl tracking-tight">
            Build with Craftled UI
          </h1>
          <p className="max-w-prose text-lg text-muted-foreground">
            A craft-led, shadcn-native component library. Every item stands on
            shadcn primitives via{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              registryDependencies
            </code>
            . Install via the shadcn CLI — the code lands in your repo, you own
            it.
          </p>
          <pre className="w-fit overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-sm">
            bunx shadcn@latest add
            https://ui.craftled.com/r/chart-area-gradient.json
          </pre>
        </header>

        <section className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="font-semibold text-2xl tracking-tight">
              All components
            </h2>
            <span className="text-muted-foreground text-sm">
              {previewItems.length} component
              {previewItems.length === 1 ? "" : "s"}
            </span>
          </div>
          <div className="grid gap-6">
            {previewItems.map((item) => {
              const Demo = demos[item.name];
              return (
                <section
                  className="flex flex-col gap-4 rounded-lg border bg-card p-6"
                  key={item.name}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div className="space-y-1">
                      <a
                        className="font-medium text-lg hover:underline"
                        href={`/preview/${item.name}`}
                      >
                        {item.title}
                      </a>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                    <code className="font-mono text-muted-foreground text-xs">
                      @craftled/{item.name}
                    </code>
                  </div>
                  {Demo ? (
                    <div className="flex min-h-[320px] items-center justify-center rounded-md border bg-background p-6">
                      <div className="w-full max-w-2xl">
                        <Demo />
                      </div>
                    </div>
                  ) : null}
                </section>
              );
            })}
          </div>
        </section>

        {themeItems.length > 0 ? (
          <section className="space-y-4">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-semibold text-2xl tracking-tight">
                Brand themes
              </h2>
              <a
                className="text-muted-foreground text-sm hover:text-foreground"
                href="/themes"
              >
                View all
              </a>
            </div>
            <p className="max-w-prose text-muted-foreground text-sm">
              Switch brands from the sidebar, or install a theme preset into
              your project. See{" "}
              <a className="underline hover:text-foreground" href="/themes">
                Brand themes
              </a>{" "}
              for install commands.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {themeItems.map((item) => (
                <li
                  className="rounded-lg border bg-card px-4 py-3 text-sm"
                  key={item.name}
                >
                  <span className="font-medium">{item.title}</span>
                  <p className="mt-1 text-muted-foreground text-xs">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </DocsShell>
  );
}
