import Link from "next/link"

import { demos, items } from "@/lib/registry"

export default function Home() {
  return (
    <div className="mx-auto flex min-h-svh max-w-5xl flex-col gap-12 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Craftled UI</h1>
        <p className="text-muted-foreground max-w-prose">
          A parasitic, shadcn-native component library. Every item stands on
          shadcn primitives via{" "}
          <code className="font-mono text-xs">registryDependencies</code>.{" "}
          {items.length} component{items.length === 1 ? "" : "s"}.
        </p>
      </header>

      <main className="grid gap-6">
        {items.map((item) => {
          const Demo = demos[item.name]
          return (
            <section
              key={item.name}
              className="bg-card flex flex-col gap-4 rounded-lg border p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="space-y-1">
                  <Link
                    href={`/preview/${item.name}`}
                    className="text-lg font-medium hover:underline"
                  >
                    {item.title}
                  </Link>
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
              ) : (
                <p className="text-muted-foreground text-sm italic">
                  No demo registered. Add it in{" "}
                  <code className="font-mono">lib/registry.ts</code>.
                </p>
              )}
            </section>
          )
        })}
      </main>
    </div>
  )
}
