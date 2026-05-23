"use client";

import { Laptop, Monitor, Smartphone, Tablet } from "lucide-react";
import * as React from "react";

import {
  PreviewCodeTabs,
  type SourceFile,
} from "@/components/preview-code-tabs";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york/ui/button";

type Viewport = {
  id: string;
  label: string;
  width: number | null; // null = full bleed
  icon: React.ReactNode;
};

const VIEWPORTS: Viewport[] = [
  { id: "mobile", label: "375", width: 375, icon: <Smartphone /> },
  { id: "tablet", label: "768", width: 768, icon: <Tablet /> },
  { id: "laptop", label: "1024", width: 1024, icon: <Laptop /> },
  { id: "desktop", label: "Full", width: null, icon: <Monitor /> },
];

const DEFAULT_VIEWPORT = "desktop";

/**
 * Full-bleed preview surface for blocks that need to be evaluated at real
 * viewport widths. Wraps the running demo in an iframe loaded from
 * `/raw/[name]` so the block's media queries fire against the iframe's
 * viewport, not the docs viewport. Sits inside the shared Preview/Code
 * tabs so users can flip to the source.
 */
export function FullBleedPreview({
  name,
  title,
  description,
  installCmd,
  files,
}: {
  name: string;
  title: string;
  description: string;
  installCmd: string;
  files: SourceFile[];
}) {
  const [viewportId, setViewportId] = React.useState(DEFAULT_VIEWPORT);
  const viewport = VIEWPORTS.find((v) => v.id === viewportId) ?? VIEWPORTS[3];

  return (
    <div className="flex flex-col gap-6 px-6 py-8">
      <header className="mx-auto w-full max-w-screen-xl space-y-3">
        <div className="space-y-1">
          <h1 className="font-semibold text-3xl tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <pre className="w-fit overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-sm">
          {installCmd}
        </pre>
      </header>

      <div className="mx-auto w-full max-w-screen-xl">
        <PreviewCodeTabs
          files={files}
          preview={
            <div className="flex justify-center bg-background">
              <iframe
                className="block h-[640px] w-full border-0 transition-[max-width] duration-200"
                src={`/raw/${name}`}
                style={
                  viewport.width
                    ? { maxWidth: `${viewport.width}px` }
                    : undefined
                }
                title={`${title} preview`}
              />
            </div>
          }
          toolbar={
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-0.5 rounded-md bg-muted p-0.5">
                {VIEWPORTS.map((v) => (
                  <button
                    aria-label={`Preview at ${v.label}px`}
                    aria-pressed={v.id === viewport.id}
                    className={cn(
                      "inline-flex h-7 items-center gap-1.5 rounded px-2 font-medium text-xs transition-colors",
                      v.id === viewport.id
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    key={v.id}
                    onClick={() => setViewportId(v.id)}
                    type="button"
                  >
                    <span className="size-3.5 [&_svg]:size-full">{v.icon}</span>
                    {v.label}
                  </button>
                ))}
              </div>
              <Button asChild size="sm" variant="ghost">
                <a href={`/raw/${name}`} rel="noreferrer" target="_blank">
                  Open standalone
                </a>
              </Button>
            </div>
          }
        />
      </div>
    </div>
  );
}
