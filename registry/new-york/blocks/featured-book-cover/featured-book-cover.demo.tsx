"use client";

import { Check, Copy, Download, RotateCcw } from "lucide-react";
import * as React from "react";

import { ControlsRail } from "@/components/controls-rail";
import {
  VariantChoice,
  VariantPresets,
  VariantSection,
  VariantShuffle,
  VariantText,
  VariantToggle,
} from "@/components/variant-panel";
import { exportDomAsJpg, exportJpgFilename } from "@/lib/export-dom-as-jpg";
import { hslToHex, randomBool, randomItem } from "@/lib/random-palette";
import { Button } from "@/registry/new-york/ui/button";

import {
  BookCover,
  type BookCoverFace,
  type BookCoverProps,
  BookRow,
  type BookRowItem,
  BookStack,
} from "./featured-book-cover";

type Layout = "single" | "stack" | "row";
type TypeCover = Extract<BookCoverFace, { kind: "type" }>;
type Patch = (patch: Partial<BookCoverProps>) => void;

const DEFAULT_COVER: TypeCover = {
  kind: "type",
  bg: "#1a1d24",
  fg: "#e8eaed",
  accent: "#7dd3fc",
  frame: true,
};

const DEFAULT_PROPS: BookCoverProps = {
  title: "Mempool Internals",
  author: "Craftled Press",
  footer: "2026",
  cover: DEFAULT_COVER,
  width: 300,
  height: 440,
  depth: 42,
  rotateX: 6,
  rotateY: -28,
  rotateZ: 0,
  perspective: 1800,
  radius: 4,
  variant: "solid",
  spineColor: "#12151b",
  pageColor: "#efece3",
  shadow: true,
  faceOpacity: 0.72,
};

const ROW_SAMPLE: BookRowItem[] = [
  {
    title: "Fullstack with Next.js, Prisma & Postgres",
    footer: "Build & Deploy",
    cover: { kind: "type", bg: "#1f2937", fg: "#f3f4f6", accent: "#60a5fa" },
    spineColor: "#111827",
  },
  {
    title: "Multi-tenant apps with custom domains",
    footer: "Build & Deploy",
    cover: { kind: "type", bg: "#26303f", fg: "#f3f4f6", accent: "#34d399" },
    spineColor: "#161e29",
  },
  {
    title: "Next.js + Contentful headless CMS",
    footer: "Databases & CMS",
    cover: { kind: "type", bg: "#2a2438", fg: "#f3f4f6", accent: "#c084fc" },
    spineColor: "#1a1626",
  },
  {
    title: "Ecommerce with Next.js & Shopify",
    footer: "Databases & CMS",
    cover: { kind: "type", bg: "#33262a", fg: "#f3f4f6", accent: "#fb7185" },
    spineColor: "#221619",
  },
];

type DemoState = {
  layout: Layout;
  stackCount: number;
  props: BookCoverProps;
};

const PRESETS: Record<string, DemoState> = {
  Default: {
    layout: "single",
    stackCount: 3,
    props: DEFAULT_PROPS,
  },
  Wireframe: {
    layout: "single",
    stackCount: 3,
    props: {
      ...DEFAULT_PROPS,
      variant: "wireframe",
      title: "Systems Design",
      author: "Craftled Press",
    },
  },
  Stack: {
    layout: "stack",
    stackCount: 4,
    props: {
      ...DEFAULT_PROPS,
      title: "Distributed Systems",
      cover: {
        kind: "type",
        bg: "#1e293b",
        fg: "#f8fafc",
        accent: "#38bdf8",
        frame: true,
      },
    },
  },
  Shelf: {
    layout: "row",
    stackCount: 3,
    props: DEFAULT_PROPS,
  },
};

function randomState(prev: DemoState): DemoState {
  const hue = Math.random() * 360;
  return {
    layout: randomItem(["single", "stack", "row"] as const),
    stackCount: 1 + Math.floor(Math.random() * 5),
    props: {
      ...prev.props,
      title: prev.props.title,
      cover: {
        kind: "type",
        bg: hslToHex(hue, 25, 12 + Math.random() * 8),
        fg: "#f3f4f6",
        accent: hslToHex(hue + 40, 70, 65),
        frame: randomBool(0.6),
      },
      variant: randomBool(0.25) ? "wireframe" : "solid",
      rotateY: -40 + Math.random() * 30,
      rotateX: 4 + Math.random() * 10,
    },
  };
}

export default function FeaturedBookCoverDemo() {
  const [state, setState] = React.useState<DemoState>(PRESETS.Default);
  const [copied, setCopied] = React.useState(false);
  const [exporting, setExporting] = React.useState(false);
  const canvasRef = React.useRef<HTMLDivElement>(null);

  const { layout, stackCount, props } = state;

  const set: Patch = (patch) =>
    setState((prev) => ({ ...prev, props: { ...prev.props, ...patch } }));

  const copyJson = async () => {
    const payload =
      layout === "stack" ? { ...props, count: stackCount } : props;
    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const exportJpg = async () => {
    const node = canvasRef.current;
    if (!node) {
      return;
    }
    setExporting(true);
    try {
      await exportDomAsJpg(node, exportJpgFilename(props.title, "book-cover"));
    } finally {
      setExporting(false);
    }
  };

  const reset = () => setState(PRESETS.Default);

  return (
    <>
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <p className="mr-auto text-muted-foreground text-sm">
            Drag the book to rotate, or tune it in the sidebar — copy JSON for
            agents or export the frame.
          </p>
          <Button onClick={reset} size="sm" variant="outline">
            <RotateCcw />
            Reset
          </Button>
          <Button onClick={copyJson} size="sm" variant="outline">
            {copied ? <Check /> : <Copy />}
            {copied ? "Copied" : "Copy JSON"}
          </Button>
          <Button
            disabled={exporting}
            onClick={exportJpg}
            size="sm"
            variant="outline"
          >
            <Download />
            {exporting ? "Exporting…" : "Export JPG"}
          </Button>
        </div>

        <div
          className="overflow-hidden rounded-xl border border-border bg-card"
          ref={canvasRef}
        >
          {layout === "single" ? (
            <BookCover {...props} draggable onRotateChange={set} />
          ) : null}
          {layout === "stack" ? (
            <BookStack
              {...props}
              count={stackCount}
              draggable
              onRotateChange={set}
            />
          ) : null}
          {layout === "row" ? (
            <BookRow background={props.background} books={ROW_SAMPLE} />
          ) : null}
        </div>
      </div>

      <ControlsRail>
        <VariantSection title="Variants">
          <VariantPresets
            onSelect={(name) => setState(PRESETS[name])}
            presets={Object.keys(PRESETS)}
          />
          <VariantShuffle onClick={() => setState(randomState(state))} />
        </VariantSection>

        <VariantSection title="Layout">
          <VariantChoice
            columns={3}
            onChange={(v) =>
              setState((prev) => ({ ...prev, layout: v as Layout }))
            }
            options={["single", "stack", "row"] as const}
            value={layout}
          />
          {layout === "stack" ? (
            <VariantChoice
              label="Books in stack"
              onChange={(v) =>
                setState((prev) => ({ ...prev, stackCount: Number(v) }))
              }
              options={["1", "2", "3", "4", "5"] as const}
              value={String(stackCount) as "1" | "2" | "3" | "4" | "5"}
            />
          ) : null}
        </VariantSection>

        {layout === "row" ? (
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Row renders the <code>books[]</code> prop — a sample shelf is shown
            here. Switch to <strong>single</strong> to edit copy below.
          </p>
        ) : (
          <VariantSection title="Content">
            <VariantText
              label="Title"
              onChange={(v) => set({ title: v })}
              value={props.title}
            />
            <VariantText
              label="Author"
              onChange={(v) => set({ author: v })}
              value={props.author ?? ""}
            />
            <VariantText
              label="Footer"
              onChange={(v) => set({ footer: v })}
              value={props.footer ?? ""}
            />
            <VariantChoice
              label="Render mode"
              onChange={(v) => set({ variant: v as BookCoverProps["variant"] })}
              options={["solid", "wireframe"] as const}
              value={props.variant ?? "solid"}
            />
            <VariantToggle
              label="Contact shadow"
              onChange={(v) => set({ shadow: v })}
              value={props.shadow ?? true}
            />
          </VariantSection>
        )}
      </ControlsRail>
    </>
  );
}
