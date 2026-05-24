"use client";

import { Check, Copy, Download, Plus, RotateCcw, Trash2 } from "lucide-react";
import * as React from "react";

import { ControlsRail } from "@/components/controls-rail";
import { exportDomAsJpg, exportJpgFilename } from "@/lib/export-dom-as-jpg";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york/ui/button";

import {
  ChartBarRanked,
  type ChartBarRankedBrand,
  type ChartBarRankedDatum,
  type ChartBarRankedProps,
} from "./chart-bar-ranked";

const PRESET_CURRENCIES = ["USD", "EUR", "GBP"] as const;

function isPresetCurrency(currency: string | undefined): boolean {
  return PRESET_CURRENCIES.includes(
    (currency ?? "USD") as (typeof PRESET_CURRENCIES)[number]
  );
}

const DEFAULT_BRAND: ChartBarRankedBrand = {
  type: "image",
  imageSrc: "/logos/best-writing.svg",
  imageAlt: "Best Writing",
};

const DEFAULT_PROPS: ChartBarRankedProps = {
  title: "Median annual wages for Writers and Authors",
  subtitle: "By industry · May 2024",
  source: "U.S. Bureau of Labor Statistics",
  brand: DEFAULT_BRAND,
  valueFormat: "currency",
  currency: "USD",
  sort: "desc",
  showValues: true,
  aspectRatio: "16/9",
  data: [
    { label: "Information", value: 73_070 },
    {
      label: "Educational services; state, local, and private",
      value: 71_340,
    },
  ],
};

export default function ChartBarRankedDemo() {
  const [props, setProps] = React.useState<ChartBarRankedProps>(DEFAULT_PROPS);
  const [copied, setCopied] = React.useState(false);
  const [exporting, setExporting] = React.useState(false);
  const chartRef = React.useRef<HTMLDivElement>(null);

  const set = (patch: Partial<ChartBarRankedProps>) =>
    setProps((prev) => ({ ...prev, ...patch }));

  const updateRow = (index: number, patch: Partial<ChartBarRankedDatum>) => {
    setProps((prev) => {
      const data = [...prev.data];
      data[index] = { ...data[index], ...patch };
      return { ...prev, data };
    });
  };

  const addRow = () => {
    setProps((prev) => ({
      ...prev,
      data: [...prev.data, { label: "New category", value: 0 }],
    }));
  };

  const removeRow = (index: number) => {
    setProps((prev) => ({
      ...prev,
      data: prev.data.filter((_, i) => i !== index),
    }));
  };

  const setBrand = (patch: Partial<ChartBarRankedBrand>) => {
    setProps((prev) => {
      if (!prev.brand) {
        return prev;
      }
      return { ...prev, brand: { ...prev.brand, ...patch } };
    });
  };

  const copyJson = async () => {
    await navigator.clipboard.writeText(JSON.stringify(props, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const exportJpg = async () => {
    const wrapper = chartRef.current;
    if (!wrapper) {
      return;
    }

    const figure =
      wrapper.querySelector<HTMLElement>("figure") ?? wrapper.firstElementChild;
    if (!(figure instanceof HTMLElement)) {
      return;
    }

    setExporting(true);
    try {
      await exportDomAsJpg(
        figure,
        exportJpgFilename(props.title, "chart-bar-ranked")
      );
    } finally {
      setExporting(false);
    }
  };

  const currencySelect = isPresetCurrency(props.currency)
    ? (props.currency ?? "USD")
    : "Custom";
  const chartCurrency = props.currency?.trim().toUpperCase() || "USD";

  return (
    <>
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <p className="mr-auto text-muted-foreground text-sm">
            BLS wage fixture — edit in the sidebar or copy JSON for agents.
          </p>
          <Button
            onClick={() => setProps(DEFAULT_PROPS)}
            size="sm"
            variant="outline"
          >
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
        <div ref={chartRef}>
          <ChartBarRanked {...props} currency={chartCurrency} />
        </div>
      </div>

      <ControlsRail>
        <div className="flex flex-col gap-3 text-foreground/80 text-xs">
          <div className="space-y-1.5">
            <div className="font-semibold text-foreground">Format</div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                className={cn(
                  "rounded-md border px-2 py-1.5 transition-colors",
                  props.aspectRatio === "16/9"
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:bg-muted"
                )}
                onClick={() => set({ aspectRatio: "16/9" })}
                type="button"
              >
                Article (16/9)
              </button>
              <button
                className={cn(
                  "rounded-md border px-2 py-1.5 transition-colors",
                  props.aspectRatio === "1200/630"
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:bg-muted"
                )}
                onClick={() => set({ aspectRatio: "1200/630" })}
                type="button"
              >
                OG (1200/630)
              </button>
            </div>
          </div>

          <div className="space-y-1.5 border-border border-t pt-3">
            <div className="font-semibold text-foreground">Copy</div>
            <TextField
              label="Title"
              onChange={(v) => set({ title: v })}
              value={props.title ?? ""}
            />
            <TextField
              label="Subtitle"
              onChange={(v) => set({ subtitle: v })}
              value={props.subtitle ?? ""}
            />
            <TextField
              label="Source"
              onChange={(v) => set({ source: v })}
              value={props.source ?? ""}
            />
          </div>

          <BrandControls
            brand={props.brand}
            onChange={set}
            setBrand={setBrand}
          />

          <div className="space-y-1.5 border-border border-t pt-3">
            <div className="font-semibold text-foreground">Chart</div>
            <SelectField
              label="Value format"
              onChange={(v) =>
                set({
                  valueFormat: v as ChartBarRankedProps["valueFormat"],
                })
              }
              options={["currency", "number", "percent"]}
              value={props.valueFormat ?? "number"}
            />
            {props.valueFormat === "currency" ? (
              <>
                <SelectField
                  label="Currency"
                  onChange={(v) => set({ currency: v === "Custom" ? "" : v })}
                  options={[...PRESET_CURRENCIES, "Custom"]}
                  value={currencySelect}
                />
                {currencySelect === "Custom" ? (
                  <label className="flex flex-col gap-1">
                    <span className="text-muted-foreground">
                      Currency code (ISO 4217)
                    </span>
                    <input
                      className="w-full rounded-md border border-border bg-background px-2 py-1.5 font-mono text-foreground text-xs uppercase outline-none transition-colors focus:border-foreground/40"
                      onChange={(e) =>
                        set({ currency: e.target.value.toUpperCase() })
                      }
                      placeholder="e.g. CHF"
                      type="text"
                      value={props.currency ?? ""}
                    />
                    {props.currency?.trim() ? null : (
                      <span className="text-[10px] text-muted-foreground">
                        Empty — defaults to USD
                      </span>
                    )}
                  </label>
                ) : null}
              </>
            ) : null}
            <div className="space-y-1">
              <span className="text-muted-foreground">Sort</span>
              <div className="grid grid-cols-3 gap-1.5">
                {(["desc", "asc", "none"] as const).map((opt) => (
                  <button
                    className={cn(
                      "rounded-md border px-2 py-1.5 transition-colors",
                      props.sort === opt
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:bg-muted"
                    )}
                    key={opt}
                    onClick={() => set({ sort: opt })}
                    type="button"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <label className="flex items-center justify-between gap-2 pt-1">
              <span className="text-muted-foreground">Show values</span>
              <input
                checked={props.showValues ?? true}
                className="size-4 cursor-pointer accent-foreground"
                onChange={(e) => set({ showValues: e.target.checked })}
                type="checkbox"
              />
            </label>
          </div>

          <div className="space-y-1.5 border-border border-t pt-3">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-foreground">Data</div>
              <button
                className="flex items-center gap-1 rounded-md border border-border px-2 py-1 transition-colors hover:bg-muted"
                onClick={addRow}
                type="button"
              >
                <Plus className="size-3" />
                Add
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {props.data.map((row, index) => (
                <div
                  className="space-y-1.5 rounded-md border border-border p-2"
                  key={index}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-muted-foreground">
                      #{index + 1}
                    </span>
                    <button
                      aria-label={`Remove row ${index + 1}`}
                      className="rounded p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40"
                      disabled={props.data.length <= 1}
                      onClick={() => removeRow(index)}
                      type="button"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                  <input
                    className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-foreground text-xs outline-none transition-colors focus:border-foreground/40"
                    onChange={(e) =>
                      updateRow(index, { label: e.target.value })
                    }
                    placeholder="Label"
                    type="text"
                    value={row.label}
                  />
                  <input
                    className="w-full rounded-md border border-border bg-background px-2 py-1.5 font-mono text-foreground text-xs outline-none transition-colors focus:border-foreground/40"
                    onChange={(e) =>
                      updateRow(index, {
                        value: Number.parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="Value"
                    step="any"
                    type="number"
                    value={row.value}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ControlsRail>
    </>
  );
}

function BrandControls({
  brand,
  onChange,
  setBrand,
}: {
  brand?: ChartBarRankedBrand;
  onChange: (patch: Partial<ChartBarRankedProps>) => void;
  setBrand: (patch: Partial<ChartBarRankedBrand>) => void;
}) {
  return (
    <div className="space-y-1.5 border-border border-t pt-3">
      <div className="font-semibold text-foreground">Branding</div>
      <label className="flex items-center justify-between gap-2">
        <span className="text-muted-foreground">Show branding</span>
        <input
          checked={brand != null}
          className="size-4 cursor-pointer accent-foreground"
          onChange={(e) =>
            onChange({
              brand: e.target.checked ? (brand ?? DEFAULT_BRAND) : undefined,
            })
          }
          type="checkbox"
        />
      </label>
      {brand ? (
        <>
          <div className="space-y-1">
            <span className="text-muted-foreground">Type</span>
            <div className="grid grid-cols-2 gap-1.5">
              {(["image", "text"] as const).map((opt) => (
                <button
                  className={cn(
                    "rounded-md border px-2 py-1.5 transition-colors",
                    brand.type === opt
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:bg-muted"
                  )}
                  key={opt}
                  onClick={() =>
                    setBrand({
                      type: opt,
                      text:
                        opt === "text"
                          ? (brand.text ?? "Best Writing")
                          : brand.text,
                    })
                  }
                  type="button"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          {brand.type === "text" ? (
            <TextField
              label="Brand text"
              onChange={(v) => setBrand({ text: v })}
              value={brand.text ?? ""}
            />
          ) : (
            <>
              <TextField
                label="Image URL"
                onChange={(v) => setBrand({ imageSrc: v })}
                value={brand.imageSrc ?? ""}
              />
              <TextField
                label="Image alt"
                onChange={(v) => setBrand({ imageAlt: v })}
                value={brand.imageAlt ?? ""}
              />
            </>
          )}
          <TextField
            label="Link (optional)"
            onChange={(v) => setBrand({ href: v || undefined })}
            value={brand.href ?? ""}
          />
        </>
      ) : null}
    </div>
  );
}

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
        onChange={(e) => onChange(e.target.value)}
        type="text"
        value={value}
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-muted-foreground">{label}</span>
      <select
        className={cn(
          "rounded-md border border-border bg-background px-2 py-1.5",
          "focus:outline-none focus:ring-2 focus:ring-ring"
        )}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
