import type * as React from "react";

/** Docs content area inside the app shell. */
export function DocsShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[700px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {children}
    </div>
  );
}
