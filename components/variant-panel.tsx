"use client";

/**
 * Variant panel — curated controls for docs demos, not a visual editor.
 *
 * Craftled blocks ship opinionated defaults. The panel exposes only:
 * - Named presets and discrete variant choices
 * - Content fields (copy, layout position, size tier)
 * - Accent picks from the block's own palette — never open-ended color pickers
 *   or shader parameter sliders.
 *
 * Continuous tuning belongs in component props in code, not in the docs UI.
 */

import type * as React from "react";
import { cn } from "@/lib/utils";
import { TITLE_SIZE_LABELS, type TitleSizeTier } from "@/lib/variant-tiers";

export function VariantSection({
  title,
  action,
  children,
  className,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-medium text-[11px] text-muted-foreground uppercase tracking-wide">
          {title}
        </h3>
        {action}
      </div>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

export function VariantNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] text-muted-foreground leading-relaxed">
      {children}
    </p>
  );
}

export function VariantPresets({
  presets,
  active,
  onSelect,
}: {
  presets: string[];
  active?: string;
  onSelect: (name: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-1">
      {presets.map((name) => (
        <button
          className={cn(
            "h-7 rounded-md border text-[11px] transition-colors",
            active === name
              ? "border-foreground bg-foreground text-background"
              : "bg-background hover:bg-muted"
          )}
          key={name}
          onClick={() => onSelect(name)}
          type="button"
        >
          {name}
        </button>
      ))}
    </div>
  );
}

export function VariantShuffle({
  children = "Explore variants",
  onClick,
}: {
  children?: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="h-8 w-full rounded-md border bg-background text-[11px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

/** Discrete choice — enums and layout modes, not continuous values. */
export function VariantChoice<T extends string>({
  label,
  value,
  options,
  onChange,
  columns = 2,
}: {
  label?: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  columns?: 2 | 3;
}) {
  return (
    <div className="space-y-1">
      {label ? (
        <span className="text-[11px] text-muted-foreground">{label}</span>
      ) : null}
      <div
        className={cn(
          "grid gap-1",
          columns === 3 ? "grid-cols-3" : "grid-cols-2"
        )}
      >
        {options.map((option) => (
          <button
            className={cn(
              "h-7 rounded-md border px-1 text-[11px] transition-colors",
              value === option
                ? "border-foreground bg-foreground text-background"
                : "bg-background hover:bg-muted"
            )}
            key={option}
            onClick={() => onChange(option)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export function VariantText({
  label,
  value,
  onChange,
  placeholder,
  mono,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  mono?: boolean;
}) {
  return (
    <label className="space-y-1">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <input
        className={cn(
          "h-7 w-full rounded-md border bg-background px-2 text-[11px] outline-none transition-colors focus:border-foreground/40",
          mono && "font-mono uppercase"
        )}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type="text"
        value={value}
      />
    </label>
  );
}

export function VariantSizeTier({
  value,
  onChange,
}: {
  value: TitleSizeTier;
  onChange: (value: TitleSizeTier) => void;
}) {
  const tiers: TitleSizeTier[] = ["sm", "md", "lg"];
  return (
    <div className="space-y-1">
      <span className="text-[11px] text-muted-foreground">Title size</span>
      <div className="grid grid-cols-3 gap-1">
        {tiers.map((tier) => (
          <button
            className={cn(
              "h-7 rounded-md border text-[11px] transition-colors",
              value === tier
                ? "border-foreground bg-foreground text-background"
                : "bg-background hover:bg-muted"
            )}
            key={tier}
            onClick={() => onChange(tier)}
            type="button"
          >
            {TITLE_SIZE_LABELS[tier]}
          </button>
        ))}
      </div>
    </div>
  );
}

export function VariantPositionGrid<T extends string>({
  label = "Position",
  value,
  options,
  onChange,
}: {
  label?: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="space-y-1">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <div className="grid grid-cols-3 gap-1">
        {options.map((position) => (
          <button
            aria-label={`Position ${position}`}
            aria-pressed={value === position}
            className={cn(
              "flex aspect-square items-center justify-center rounded-md border transition-colors",
              value === position
                ? "border-foreground bg-foreground"
                : "border-border bg-background hover:border-foreground/40"
            )}
            key={position}
            onClick={() => onChange(position)}
            type="button"
          >
            <span
              className={cn(
                "block size-1.5 rounded-full transition-colors",
                value === position ? "bg-background" : "bg-muted-foreground/40"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/** Pick an accent from a curated list — no free-form hex input. */
export function VariantSwatches({
  label = "Accent",
  swatches,
  value,
  onChange,
}: {
  label?: string;
  swatches: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  const unique = [...new Set(swatches)];

  return (
    <div className="space-y-1">
      {label ? (
        <span className="text-[11px] text-muted-foreground">{label}</span>
      ) : null}
      <div className="flex flex-wrap gap-1.5">
        {unique.map((swatch) => (
          <button
            aria-label={`Accent ${swatch}`}
            aria-pressed={value === swatch}
            className={cn(
              "size-6 rounded-md border-2 transition-transform hover:scale-105",
              value === swatch ? "border-foreground" : "border-transparent"
            )}
            key={swatch}
            onClick={() => onChange(swatch)}
            style={{ backgroundColor: swatch }}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}

export function VariantContent<T extends string>({
  text,
  position,
  sizeTier,
  color,
  positions,
  accentSwatches,
  onTextChange,
  onPositionChange,
  onSizeTierChange,
  onColorChange,
}: {
  text: string;
  position: T;
  sizeTier: TitleSizeTier;
  color: string;
  positions: readonly T[];
  accentSwatches: string[];
  onTextChange: (value: string) => void;
  onPositionChange: (value: T) => void;
  onSizeTierChange: (value: TitleSizeTier) => void;
  onColorChange: (value: string) => void;
}) {
  return (
    <VariantSection title="Content">
      <VariantText
        label="Title"
        onChange={onTextChange}
        placeholder="Title text"
        value={text}
      />
      <VariantPositionGrid
        onChange={onPositionChange}
        options={positions}
        value={position}
      />
      <VariantSizeTier onChange={onSizeTierChange} value={sizeTier} />
      {accentSwatches.length > 0 ? (
        <VariantSwatches
          label="Title color"
          onChange={onColorChange}
          swatches={accentSwatches}
          value={color}
        />
      ) : null}
    </VariantSection>
  );
}

/** Content-block controls (charts, banners) — structured fields, not shader knobs. */
export function VariantToggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-2">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <input
        checked={value}
        className="size-3.5 cursor-pointer accent-foreground"
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
    </label>
  );
}

export function VariantInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-7 w-full rounded-md border bg-background px-2 text-[11px] outline-none transition-colors focus:border-foreground/40",
        className
      )}
      {...props}
    />
  );
}

export function VariantCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "space-y-1.5 rounded-md border bg-background/60 p-2",
        className
      )}
    >
      {children}
    </div>
  );
}
