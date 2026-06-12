"use client";

import { Check, Copy, Download, Plus, RotateCcw, Trash2 } from "lucide-react";
import * as React from "react";

import { ControlsRail } from "@/components/controls-rail";
import {
  VariantCard,
  VariantChoice,
  VariantInput,
  VariantSection,
  VariantText,
  VariantToggle,
} from "@/components/variant-panel";
import { exportDomAsJpg, exportJpgFilename } from "@/lib/export-dom-as-jpg";
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
        <p className="text-muted-foreground text-sm">
          BLS wage fixture — edit in the sidebar or copy JSON for agents.
        </p>
        <div ref={chartRef}>
          <ChartBarRanked {...props} currency={chartCurrency} />
        </div>
      </div>

      <ControlsRail>
        <VariantSection title="Export">
          <div className="grid grid-cols-2 gap-1.5">
            <Button
              className="h-8 w-full"
              onClick={() => setProps(DEFAULT_PROPS)}
              size="sm"
              variant="outline"
            >
              <RotateCcw />
              Reset
            </Button>
            <Button
              className="h-8 w-full"
              onClick={copyJson}
              size="sm"
              variant="outline"
            >
              {copied ? <Check /> : <Copy />}
              {copied ? "Copied" : "Copy JSON"}
            </Button>
          </div>
          <Button
            className="h-8 w-full"
            disabled={exporting}
            onClick={exportJpg}
            size="sm"
            variant="outline"
          >
            <Download />
            {exporting ? "Exporting…" : "Export JPG"}
          </Button>
        </VariantSection>

        <VariantSection title="Content">
          <VariantText
            label="Title"
            onChange={(v) => set({ title: v })}
            value={props.title ?? ""}
          />
          <VariantText
            label="Subtitle"
            onChange={(v) => set({ subtitle: v })}
            value={props.subtitle ?? ""}
          />
          <VariantText
            label="Source"
            onChange={(v) => set({ source: v })}
            value={props.source ?? ""}
          />
        </VariantSection>

        <VariantSection title="Chart">
          <VariantChoice
            label="Format"
            onChange={(v) => set({ aspectRatio: v })}
            options={["16/9", "1200/630"] as const}
            value={props.aspectRatio ?? "16/9"}
          />
          <VariantChoice
            label="Value format"
            onChange={(v) =>
              set({
                valueFormat: v as ChartBarRankedProps["valueFormat"],
              })
            }
            options={["currency", "number", "percent"] as const}
            value={props.valueFormat ?? "number"}
          />
          {props.valueFormat === "currency" ? (
            <>
              <VariantChoice
                label="Currency"
                onChange={(v) => set({ currency: v === "Custom" ? "" : v })}
                options={[...PRESET_CURRENCIES, "Custom"] as const}
                value={currencySelect}
              />
              {currencySelect === "Custom" ? (
                <VariantText
                  label="Currency code (ISO 4217)"
                  mono
                  onChange={(v) => set({ currency: v.toUpperCase() })}
                  placeholder="e.g. CHF"
                  value={props.currency ?? ""}
                />
              ) : null}
            </>
          ) : null}
          <VariantChoice
            columns={3}
            label="Sort"
            onChange={(v) => set({ sort: v })}
            options={["desc", "asc", "none"] as const}
            value={props.sort ?? "desc"}
          />
          <VariantToggle
            label="Show values"
            onChange={(v) => set({ showValues: v })}
            value={props.showValues ?? true}
          />
        </VariantSection>

        <BrandControls brand={props.brand} onChange={set} setBrand={setBrand} />

        <VariantSection
          action={
            <button
              className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] transition-colors hover:bg-muted"
              onClick={addRow}
              type="button"
            >
              <Plus className="size-3" />
              Add
            </button>
          }
          title="Data"
        >
          <div className="flex flex-col gap-2">
            {props.data.map((row, index) => (
              <VariantCard key={index}>
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
                <VariantInput
                  onChange={(e) => updateRow(index, { label: e.target.value })}
                  placeholder="Label"
                  type="text"
                  value={row.label}
                />
                <VariantInput
                  className="font-mono"
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
              </VariantCard>
            ))}
          </div>
        </VariantSection>
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
    <VariantSection title="Branding">
      <VariantToggle
        label="Show branding"
        onChange={(checked) =>
          onChange({
            brand: checked ? (brand ?? DEFAULT_BRAND) : undefined,
          })
        }
        value={brand != null}
      />
      {brand ? (
        <>
          <VariantChoice
            onChange={(opt) =>
              setBrand({
                type: opt,
                text:
                  opt === "text" ? (brand.text ?? "Best Writing") : brand.text,
              })
            }
            options={["image", "text"] as const}
            value={brand.type}
          />
          {brand.type === "text" ? (
            <VariantText
              label="Brand text"
              onChange={(v) => setBrand({ text: v })}
              value={brand.text ?? ""}
            />
          ) : (
            <>
              <VariantText
                label="Image URL"
                onChange={(v) => setBrand({ imageSrc: v })}
                value={brand.imageSrc ?? ""}
              />
              <VariantText
                label="Image alt"
                onChange={(v) => setBrand({ imageAlt: v })}
                value={brand.imageAlt ?? ""}
              />
            </>
          )}
          <VariantText
            label="Link (optional)"
            onChange={(v) => setBrand({ href: v || undefined })}
            value={brand.href ?? ""}
          />
        </>
      ) : null}
    </VariantSection>
  );
}
