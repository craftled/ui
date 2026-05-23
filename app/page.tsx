import { demos, items } from "@/lib/registry";

export default function Home() {
  return (
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
            {items.length} component{items.length === 1 ? "" : "s"}
          </span>
        </div>
        <div className="grid gap-6">
          {items.map((item) => {
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
    </div>
  );
}
