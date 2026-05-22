import Link from "next/link"
import { notFound } from "next/navigation"

import { demos, getItem } from "@/lib/registry"

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const item = getItem(name)
  const Demo = demos[name]
  if (!item || !Demo) notFound()

  const installCmd = `bunx shadcn@latest add https://ui.craftled.com/r/${name}.json`

  return (
    <div className="mx-auto flex min-h-svh max-w-5xl flex-col gap-8 px-6 py-12">
      <header className="space-y-3">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground text-sm"
        >
          ← All components
        </Link>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {item.title}
          </h1>
          <p className="text-muted-foreground">{item.description}</p>
        </div>
        <pre className="bg-muted overflow-x-auto rounded-md px-3 py-2 font-mono text-xs">
          {installCmd}
        </pre>
      </header>

      <main className="bg-card rounded-lg border p-8">
        <Demo />
      </main>
    </div>
  )
}
