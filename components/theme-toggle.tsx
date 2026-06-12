"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { useBrandOptional } from "@/components/brand-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const brandCtx = useBrandOptional();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (brandCtx?.brand.lightOnly) {
    return null;
  }

  const next = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <button
      aria-label={mounted ? `Switch to ${next} mode` : "Toggle theme"}
      className={cn(
        "border-border bg-background hover:bg-muted",
        "relative inline-flex size-8 items-center justify-center rounded-md border",
        "text-foreground/70 transition-colors hover:text-foreground"
      )}
      onClick={() => setTheme(next)}
      type="button"
    >
      <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
