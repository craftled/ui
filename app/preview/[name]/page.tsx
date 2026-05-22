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
    <div className="flex flex-col gap-8">
      <header className="space-y-3">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">
            {item.title}
          </h1>
          <p className="text-muted-foreground text-base">{item.description}</p>
        </div>
        <pre className="bg-muted w-fit overflow-x-auto rounded-md px-3 py-2 font-mono text-sm">
          {installCmd}
        </pre>
      </header>

      <section className="bg-card rounded-lg border p-8">
        <Demo />
      </section>
    </div>
  )
}
