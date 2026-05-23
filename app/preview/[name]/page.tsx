import { notFound } from "next/navigation";

import { demos, getItem } from "@/lib/registry";

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const item = getItem(name);
  const Demo = demos[name];
  if (!(item && Demo)) {
    notFound();
  }

  const installCmd = `bunx shadcn@latest add https://ui.craftled.com/r/${name}.json`;

  return (
    <div className="flex flex-col gap-8">
      <header className="space-y-3">
        <div className="space-y-1">
          <h1 className="font-semibold text-3xl tracking-tight">
            {item.title}
          </h1>
          <p className="text-base text-muted-foreground">{item.description}</p>
        </div>
        <pre className="w-fit overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-sm">
          {installCmd}
        </pre>
      </header>

      <section className="rounded-lg border bg-card p-8">
        <Demo />
      </section>
    </div>
  );
}
