"use client";

import { usePathname } from "next/navigation";
import * as React from "react";
import { createPortal } from "react-dom";

/**
 * Portals demo variant controls into the right-hand variant panel.
 * Demos should expose presets and discrete choices only — see
 * `components/variant-panel.tsx` for the supported control set.
 */
export function ControlsRail({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [target, setTarget] = React.useState<Element | null>(null);

  React.useEffect(() => {
    setTarget(document.getElementById("variant-panel-mount"));
  }, []);

  const onPreview = pathname?.startsWith("/preview/") ?? false;
  if (!(onPreview && target)) {
    return null;
  }

  return createPortal(
    <div className="flex flex-col gap-3">{children}</div>,
    target
  );
}
