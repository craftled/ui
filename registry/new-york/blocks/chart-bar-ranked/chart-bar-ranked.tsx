"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/new-york/ui/chart";

export type ChartBarRankedDatum = { label: string; value: number };

export type ChartBarRankedBrand = {
  type: "text" | "image";
  text?: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
};

export type ChartBarRankedProps = {
  title?: string;
  subtitle?: string;
  source?: string;
  brand?: ChartBarRankedBrand;
  data: ChartBarRankedDatum[];
  valueFormat?: "currency" | "number" | "percent";
  /** ISO 4217 code — used when valueFormat is "currency". Defaults to USD. */
  currency?: string;
  sort?: "desc" | "asc" | "none";
  showValues?: boolean;
  aspectRatio?: string;
  className?: string;
};

const VALUE_KEY = "value";
const ISO_4217 = /^[A-Z]{3}$/;

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatValue(
  value: number,
  format: ChartBarRankedProps["valueFormat"] = "number",
  currency = "USD"
): string {
  switch (format) {
    case "currency": {
      const code = currency.trim().toUpperCase();
      if (!ISO_4217.test(code)) {
        return formatNumber(value);
      }
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: code,
        maximumFractionDigits: 0,
      }).format(value);
    }
    case "percent":
      return new Intl.NumberFormat("en-US", {
        style: "percent",
        maximumFractionDigits: 1,
      }).format(value / 100);
    default:
      return formatNumber(value);
  }
}

function CategoryLabelList(props: {
  x?: number | string;
  y?: number | string;
  height?: number | string;
  value?: string | number;
}) {
  const x = Number(props.x ?? 0);
  const y = Number(props.y ?? 0);
  const height = Number(props.height ?? 0);
  const { value } = props;
  if (value == null) {
    return <text />;
  }

  return (
    <text
      dominantBaseline="auto"
      fill="currentColor"
      fillOpacity={0.85}
      fontSize={12}
      textAnchor="start"
      x={x}
      y={y - height / 2 - 4}
    >
      {String(value)}
    </text>
  );
}

function ChartBarRankedBrandMark({ brand }: { brand: ChartBarRankedBrand }) {
  let content: React.ReactNode = null;

  if (brand.type === "image" && brand.imageSrc) {
    content = (
      <img
        alt={brand.imageAlt ?? ""}
        className="h-3.5 w-auto opacity-80"
        src={brand.imageSrc}
      />
    );
  } else if (brand.type === "text" && brand.text) {
    content = (
      <span className="font-medium text-[11px] text-muted-foreground tracking-tight">
        {brand.text}
      </span>
    );
  }

  if (!content) {
    return null;
  }

  if (brand.href) {
    return (
      <a
        className="shrink-0 transition-opacity hover:opacity-100"
        href={brand.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {content}
      </a>
    );
  }

  return <div className="shrink-0">{content}</div>;
}

export function ChartBarRanked({
  title,
  subtitle,
  source,
  brand,
  data,
  valueFormat = "number",
  currency = "USD",
  sort = "desc",
  showValues = true,
  aspectRatio = "16/9",
  className,
}: ChartBarRankedProps) {
  const sortedData = React.useMemo(() => {
    if (sort === "none") {
      return data;
    }
    const copy = [...data];
    copy.sort((a, b) =>
      sort === "desc" ? b.value - a.value : a.value - b.value
    );
    return copy;
  }, [data, sort]);

  const config = React.useMemo<ChartConfig>(
    () => ({
      [VALUE_KEY]: { label: "Value", color: "var(--chart-1)" },
    }),
    []
  );

  const formatTick = React.useCallback(
    (value: number) => formatValue(value, valueFormat, currency),
    [valueFormat, currency]
  );

  const formatLabel = React.useCallback(
    (value: number) => formatValue(value, valueFormat, currency),
    [valueFormat, currency]
  );

  return (
    <figure
      className={cn(
        "flex w-full flex-col gap-4 rounded-2xl border bg-card p-6 text-card-foreground",
        className
      )}
    >
      {title || subtitle ? (
        <figcaption className="space-y-1">
          {title ? (
            <h3 className="font-semibold text-lg tracking-tight">{title}</h3>
          ) : null}
          {subtitle ? (
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          ) : null}
        </figcaption>
      ) : null}

      <div className="min-h-0 w-full" style={{ aspectRatio }}>
        <ChartContainer
          className="!aspect-auto size-full items-stretch justify-start"
          config={config}
        >
          <BarChart
            accessibilityLayer
            barCategoryGap="28%"
            barSize={18}
            data={sortedData}
            layout="vertical"
            margin={{
              top: 12,
              right: showValues ? 56 : 12,
              left: 0,
              bottom: 4,
            }}
          >
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis
              axisLine={false}
              tickFormatter={formatTick}
              tickLine={false}
              tickMargin={8}
              type="number"
            />
            <YAxis
              axisLine={false}
              dataKey="label"
              tick={false}
              tickLine={false}
              type="category"
              width={0}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) =>
                    formatValue(Number(value), valueFormat, currency)
                  }
                  indicator="line"
                />
              }
              cursor={{ fill: "hsl(var(--muted))", opacity: 0.35 }}
            />
            <Bar
              dataKey={VALUE_KEY}
              fill={`var(--color-${VALUE_KEY})`}
              radius={[0, 4, 4, 0]}
            >
              <LabelList
                content={(labelProps) => (
                  <CategoryLabelList
                    height={labelProps.height}
                    value={labelProps.value as string | number | undefined}
                    x={labelProps.x}
                    y={labelProps.y}
                  />
                )}
                dataKey="label"
              />
              {showValues ? (
                <LabelList
                  className="fill-foreground"
                  dataKey={VALUE_KEY}
                  formatter={(label) => formatLabel(Number(label))}
                  offset={8}
                  position="right"
                />
              ) : null}
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>

      {source || brand ? (
        <footer className="flex items-center justify-between gap-4">
          {source ? (
            <p className="min-w-0 text-muted-foreground text-xs">{source}</p>
          ) : null}
          {brand ? (
            <div className={cn(!source && "ml-auto")}>
              <ChartBarRankedBrandMark brand={brand} />
            </div>
          ) : null}
        </footer>
      ) : null}
    </figure>
  );
}
