"use client";

import { usePathname } from "next/navigation";
import * as React from "react";
import { createPortal } from "react-dom";

/**
 * Renders its children into the right-rail mount node when the page is a
 * preview page. On other pages (e.g. the home gallery) it renders nothing —
 * so multi-demo pages don't stack 8 control panels into the same slot.
 */
export function ControlsRail({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [target, setTarget] = React.useState<Element | null>(null);

  React.useEffect(() => {
    setTarget(document.getElementById("controls-rail-mount"));
  }, []);

  const onPreview = pathname?.startsWith("/preview/") ?? false;
  if (!(onPreview && target)) {
    return null;
  }

  return createPortal(children, target);
}
