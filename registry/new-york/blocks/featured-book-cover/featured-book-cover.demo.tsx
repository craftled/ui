"use client";

import { Check, Copy, Download, RotateCcw } from "lucide-react";
import * as React from "react";

import { ControlsRail } from "@/components/controls-rail";
import { exportDomAsJpg, exportJpgFilename } from "@/lib/export-dom-as-jpg";
import { cn } from "@/lib/utils";
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
  // background / edgeColor / faceColor left unset → theme-token defaults
  // (transparent canvas, var(--foreground) edges, var(--card) faces).
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

export default function FeaturedBookCoverDemo() {
  const [layout, setLayout] = React.useState<Layout>("single");
  const [props, setProps] = React.useState<BookCoverProps>(DEFAULT_PROPS);
  const [stackCount, setStackCount] = React.useState(3);
  const [copied, setCopied] = React.useState(false);
  const [exporting, setExporting] = React.useState(false);
  const canvasRef = React.useRef<HTMLDivElement>(null);

  const set: Patch = (patch) => setProps((prev) => ({ ...prev, ...patch }));

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

  const reset = () => {
    setProps(DEFAULT_PROPS);
    setLayout("single");
    setStackCount(3);
  };

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
        <div className="flex flex-col gap-3 text-foreground/80 text-xs">
          <Section title="Layout">
            <ButtonRow
              cols={3}
              onChange={(v) => setLayout(v as Layout)}
              options={["single", "stack", "row"]}
              value={layout}
            />
            {layout === "stack" ? (
              <RangeField
                label="Books"
                max={5}
                min={1}
                onChange={setStackCount}
                value={stackCount}
              />
            ) : null}
          </Section>

          {layout === "row" ? (
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Row renders the <code>books[]</code> prop — a small sample shelf
              is shown here. Switch to <strong>single</strong> to tune one book
              and the controls below apply.
            </p>
          ) : (
            <>
              <ContentControls props={props} set={set} />
              <CoverControls props={props} set={set} />
              <GeometryControls props={props} set={set} />
              <AppearanceControls props={props} set={set} />
            </>
          )}
        </div>
      </ControlsRail>
    </>
  );
}

// --- Control groups ---------------------------------------------------------

function ContentControls({
  props,
  set,
}: {
  props: BookCoverProps;
  set: Patch;
}) {
  return (
    <Section title="Content">
      <TextField
        label="Title"
        onChange={(v) => set({ title: v })}
        value={props.title}
      />
      <TextField
        label="Author"
        onChange={(v) => set({ author: v })}
        value={props.author ?? ""}
      />
      <TextField
        label="Footer"
        onChange={(v) => set({ footer: v })}
        value={props.footer ?? ""}
      />
    </Section>
  );
}

function CoverControls({ props, set }: { props: BookCoverProps; set: Patch }) {
  const cover = props.cover ?? DEFAULT_COVER;
  const setTypeCover = (patch: Partial<TypeCover>) => {
    const current = props.cover ?? DEFAULT_COVER;
    if (current.kind !== "type") {
      return;
    }
    set({ cover: { ...current, ...patch } });
  };

  return (
    <Section title="Cover">
      <ButtonRow
        cols={2}
        onChange={(kind) =>
          set({
            cover:
              kind === "image"
                ? { kind: "image", src: "", alt: props.title }
                : DEFAULT_COVER,
          })
        }
        options={["type", "image"]}
        value={cover.kind}
      />
      {cover.kind === "type" ? (
        <>
          <ColorField
            label="Cover bg"
            onChange={(v) => setTypeCover({ bg: v })}
            value={cover.bg}
          />
          <ColorField
            label="Text"
            onChange={(v) => setTypeCover({ fg: v })}
            value={cover.fg}
          />
          <ColorField
            label="Accent"
            onChange={(v) => setTypeCover({ accent: v })}
            value={cover.accent ?? cover.fg}
          />
          <CheckField
            checked={cover.frame ?? false}
            label="Inset frame"
            onChange={(v) => setTypeCover({ frame: v })}
          />
        </>
      ) : (
        <TextField
          label="Image URL"
          onChange={(v) =>
            set({ cover: { kind: "image", src: v, alt: props.title } })
          }
          value={cover.src}
        />
      )}
    </Section>
  );
}

function GeometryControls({
  props,
  set,
}: {
  props: BookCoverProps;
  set: Patch;
}) {
  return (
    <Section title="Geometry">
      <RangeField
        label="Width"
        max={420}
        min={120}
        onChange={(v) => set({ width: v })}
        value={props.width ?? 300}
      />
      <RangeField
        label="Height"
        max={620}
        min={160}
        onChange={(v) => set({ height: v })}
        value={props.height ?? 440}
      />
      <RangeField
        label="Depth"
        max={90}
        min={8}
        onChange={(v) => set({ depth: v })}
        value={props.depth ?? 42}
      />
      <RangeField
        label="Rotate X"
        max={85}
        min={-85}
        onChange={(v) => set({ rotateX: v })}
        suffix="°"
        value={props.rotateX ?? 6}
      />
      <RangeField
        label="Rotate Y"
        max={180}
        min={-180}
        onChange={(v) => set({ rotateY: v })}
        suffix="°"
        value={props.rotateY ?? -28}
      />
      <RangeField
        label="Rotate Z"
        max={30}
        min={-30}
        onChange={(v) => set({ rotateZ: v })}
        suffix="°"
        value={props.rotateZ ?? 0}
      />
      <RangeField
        label="Perspective"
        max={3000}
        min={600}
        onChange={(v) => set({ perspective: v })}
        step={50}
        value={props.perspective ?? 1800}
      />
      <RangeField
        label="Radius"
        max={24}
        min={0}
        onChange={(v) => set({ radius: v })}
        value={props.radius ?? 4}
      />
    </Section>
  );
}

function AppearanceControls({
  props,
  set,
}: {
  props: BookCoverProps;
  set: Patch;
}) {
  return (
    <Section title="Appearance">
      <ButtonRow
        cols={2}
        onChange={(v) => set({ variant: v as BookCoverProps["variant"] })}
        options={["solid", "wireframe"]}
        value={props.variant ?? "solid"}
      />
      <OptionalColor
        fallback="#0b0b0c"
        label="Background"
        onChange={(v) => set({ background: v })}
        value={props.background}
      />
      {props.variant === "wireframe" ? (
        <>
          <OptionalColor
            fallback="#1a1d24"
            label="Face color"
            onChange={(v) => set({ faceColor: v })}
            value={props.faceColor}
          />
          <RangeField
            label="Face opacity"
            max={100}
            min={0}
            onChange={(v) => set({ faceOpacity: v / 100 })}
            suffix="%"
            value={Math.round((props.faceOpacity ?? 0.72) * 100)}
          />
          <OptionalColor
            fallback="#ffffff"
            label="Edge color"
            onChange={(v) => set({ edgeColor: v })}
            value={props.edgeColor}
          />
        </>
      ) : (
        <>
          <ColorField
            label="Spine"
            onChange={(v) => set({ spineColor: v })}
            value={props.spineColor ?? "#12151b"}
          />
          <ColorField
            label="Pages"
            onChange={(v) => set({ pageColor: v })}
            value={props.pageColor ?? "#efece3"}
          />
          <CheckField
            checked={props.shadow ?? true}
            label="Contact shadow"
            onChange={(v) => set({ shadow: v })}
          />
        </>
      )}
    </Section>
  );
}

// --- Control primitives -----------------------------------------------------

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5 border-border border-t pt-3 first:border-t-0 first:pt-0">
      <div className="font-semibold text-foreground">{title}</div>
      {children}
    </div>
  );
}

const fieldName = (label: string) =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-muted-foreground">{label}</span>
      <input
        className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-foreground text-xs outline-none transition-colors focus:border-foreground/40"
        name={fieldName(label)}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        value={value}
      />
    </label>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="flex items-center justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-[11px] text-foreground tabular-nums">
          {value}
          {suffix}
        </span>
      </span>
      <input
        className="w-full cursor-pointer accent-foreground"
        max={max}
        min={min}
        name={fieldName(label)}
        onChange={(e) => onChange(Number(e.target.value))}
        step={step}
        type="range"
        value={value}
      />
    </label>
  );
}

/** Themed-by-default (undefined) with an opt-in custom hex swatch. */
function OptionalColor({
  label,
  value,
  fallback,
  onChange,
}: {
  label: string;
  value: string | undefined;
  fallback: string;
  onChange: (v: string | undefined) => void;
}) {
  const custom = value != null;
  return (
    <div className="space-y-1.5">
      <label className="flex items-center justify-between gap-2">
        <span className="text-muted-foreground">{label}</span>
        <span className="flex items-center gap-2">
          <span className="text-[11px] text-muted-foreground">
            {custom ? "Custom" : "Themed"}
          </span>
          <input
            aria-label={`Custom ${label}`}
            checked={custom}
            className="size-4 cursor-pointer accent-foreground"
            name={`${fieldName(label)}-custom`}
            onChange={(e) => onChange(e.target.checked ? fallback : undefined)}
            type="checkbox"
          />
        </span>
      </label>
      {custom ? (
        <ColorField label={label} onChange={onChange} value={value} />
      ) : null}
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="flex items-center gap-2">
        <span className="font-mono text-[11px] text-foreground">{value}</span>
        <input
          aria-label={label}
          className="size-6 cursor-pointer rounded border border-border bg-transparent"
          name={fieldName(label)}
          onChange={(e) => onChange(e.target.value)}
          type="color"
          value={value}
        />
      </span>
    </label>
  );
}

function CheckField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-2 pt-1">
      <span className="text-muted-foreground">{label}</span>
      <input
        checked={checked}
        className="size-4 cursor-pointer accent-foreground"
        name={fieldName(label)}
        onChange={(e) => onChange(e.target.checked)}
        type="checkbox"
      />
    </label>
  );
}

function ButtonRow({
  options,
  value,
  cols,
  onChange,
}: {
  options: string[];
  value: string;
  cols: number;
  onChange: (v: string) => void;
}) {
  return (
    <div
      className="grid gap-1.5"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {options.map((opt) => (
        <button
          className={cn(
            "rounded-md border px-2 py-1.5 capitalize transition-colors",
            value === opt
              ? "border-foreground bg-foreground text-background"
              : "border-border hover:bg-muted"
          )}
          key={opt}
          onClick={() => onChange(opt)}
          type="button"
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
