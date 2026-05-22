import { demos, items } from "@/lib/registry"

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">
          Build with Craftled UI
        </h1>
        <p className="text-muted-foreground max-w-prose text-lg">
          A parasitic, shadcn-native component library. Every item stands on
          shadcn primitives via{" "}
          <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm">
            registryDependencies
          </code>
          . Install via the shadcn CLI — the code lands in your repo, you own
          it.
        </p>
        <pre className="bg-muted w-fit overflow-x-auto rounded-md px-3 py-2 font-mono text-sm">
          bunx shadcn@latest add https://ui.craftled.com/r/chart-area-gradient.json
        </pre>
      </header>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            All components
          </h2>
          <span className="text-muted-foreground text-sm">
            {items.length} component{items.length === 1 ? "" : "s"}
          </span>
        </div>
        <div className="grid gap-6">
          {items.map((item) => {
            const Demo = demos[item.name]
            return (
              <section
                key={item.name}
                className="bg-card flex flex-col gap-4 rounded-lg border p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div className="space-y-1">
                    <a
                      href={`/preview/${item.name}`}
                      className="text-lg font-medium hover:underline"
                    >
                      {item.title}
                    </a>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                  <code className="text-muted-foreground font-mono text-xs">
                    @craftled/{item.name}
                  </code>
                </div>
                {Demo ? (
                  <div className="bg-background flex min-h-[320px] items-center justify-center rounded-md border p-6">
                    <div className="w-full max-w-2xl">
                      <Demo />
                    </div>
                  </div>
                ) : null}
              </section>
            )
          })}
        </div>
      </section>
    </div>
  )
}
