import { notFound } from "next/navigation";

import { demos, getItem } from "@/lib/registry";

/**
 * Bare demo render — no docs chrome. Loaded by the full-bleed preview shell
 * inside an iframe so the block's media queries (lg:, max-lg:, etc.) fire
 * against the iframe's viewport, not the docs viewport.
 */
export default async function RawPreviewPage({
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
  return <Demo />;
}
