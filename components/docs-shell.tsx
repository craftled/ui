import type * as React from "react";

import { SiteSidebar } from "@/components/site-sidebar";

/**
 * Docs-style content shell: left sidebar + centered 700px column + right rail
 * mount. Use for pages that should sit inside the documentation chrome
 * (Introduction, Compose, primitive previews, contained block previews).
 *
 * Pages that want full viewport width (fullwidth blocks like Navbar) should
 * skip this shell and render directly.
 */
export function DocsShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-1 justify-center gap-8 px-6">
      <SiteSidebar />
      <main className="w-full min-w-0 max-w-[700px] py-8">{children}</main>
      <aside
        className="hidden w-56 shrink-0 py-8 md:block"
        id="controls-rail-mount"
      />
    </div>
  );
}
