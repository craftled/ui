"use client";

import { Check, Copy } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";

export type SourceFile = {
  /** Filesystem-style path used in the per-file tab label */
  path: string;
  /** Raw text content — for the Copy button */
  raw: string;
  /** Pre-highlighted shiki HTML — rendered with dangerouslySetInnerHTML */
  html: string;
};

/**
 * Preview / Code tabs above any block or primitive demo.
 *
 * - The `preview` slot renders the running component (or an iframe for
 *   full-bleed blocks).
 * - The `files` array carries the source for each file the registry ships;
 *   when there's >1 file, a nested tab strip lets the user pick between
 *   them. Each file has a copy-to-clipboard button.
 */
export function PreviewCodeTabs({
  preview,
  files,
  toolbar,
  contentClassName,
}: {
  preview: React.ReactNode;
  files: SourceFile[];
  /** Optional row rendered above the preview content (e.g., viewport chips) */
  toolbar?: React.ReactNode;
  /** Tailwind classes for the preview tab's content surface */
  contentClassName?: string;
}) {
  return (
    <Tabs className="gap-0" defaultValue="preview">
      <div className="flex items-center justify-between gap-3">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <div className="hidden flex-1 justify-end sm:flex">{toolbar}</div>
      </div>

      <TabsContent
        className={cn(
          "mt-2 overflow-hidden rounded-md border bg-card",
          contentClassName
        )}
        value="preview"
      >
        {preview}
      </TabsContent>

      <TabsContent
        className="mt-2 overflow-hidden rounded-md border bg-card"
        value="code"
      >
        {files.length === 1 ? (
          <CodeBlock file={files[0]} />
        ) : (
          <Tabs className="gap-0" defaultValue={files[0]?.path}>
            <TabsList className="m-2 w-fit overflow-x-auto">
              {files.map((file) => (
                <TabsTrigger
                  className="font-mono text-xs"
                  key={file.path}
                  value={file.path}
                >
                  {basename(file.path)}
                </TabsTrigger>
              ))}
            </TabsList>
            {files.map((file) => (
              <TabsContent
                className="border-t"
                key={file.path}
                value={file.path}
              >
                <CodeBlock file={file} hideHeader />
              </TabsContent>
            ))}
          </Tabs>
        )}
      </TabsContent>
    </Tabs>
  );
}

function CodeBlock({
  file,
  hideHeader = false,
}: {
  file: SourceFile;
  hideHeader?: boolean;
}) {
  return (
    <div className="relative">
      {!hideHeader && (
        <div className="flex items-center justify-between border-b px-4 py-2">
          <code className="font-mono text-muted-foreground text-xs">
            {file.path}
          </code>
          <CopyButton text={file.raw} />
        </div>
      )}
      {hideHeader && (
        <div className="absolute top-2 right-2 z-10">
          <CopyButton text={file.raw} />
        </div>
      )}
      <div
        className="[&_pre]:!bg-transparent [&_pre]:!font-mono overflow-x-auto bg-card p-4 text-sm [&_pre]:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: file.html }}
      />
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);

  return (
    <Button
      aria-label="Copy source"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1500);
        } catch {
          // Clipboard API can fail in non-secure contexts — silently ignore.
        }
      }}
      size="sm"
      variant="ghost"
    >
      {copied ? <Check /> : <Copy />}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}

function basename(path: string) {
  return path.split("/").pop() ?? path;
}
