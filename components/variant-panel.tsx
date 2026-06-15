"use client";

/**
 * Variant panel — controls for docs demos, not a visual editor.
 *
 * Two tiers, pick per demo:
 * - **Curated** (default for blocks that ship opinionated defaults): named
 *   presets (`VariantPresets`), discrete choices (`VariantChoice`,
 *   `VariantSelect`), content fields (`VariantContent`), and accent picks
 *   from the block's own palette (`VariantSwatches`).
 * - **Generator** (for explorers where the block IS the tool, e.g. the
 *   featured-effects OG generator): full continuous + color tuning via
 *   `VariantSlider`, `VariantColor`, and `VariantColorList`.
 *
 * Default to curated; reach for the generator controls only when free-form
 * tuning is the point of the demo.
 */

import * as React from "react";
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

/**
 * Labelled discrete choice — like `VariantChoice`, but each option carries a
 * separate display label so the value (e.g. a registry id) stays out of the UI.
 */
export function VariantSelect<T extends string>({
  label,
  value,
  options,
  onChange,
  columns = 1,
}: {
  label?: string;
  value: T;
  options: readonly { value: T; label: string }[];
  onChange: (value: T) => void;
  columns?: 1 | 2 | 3;
}) {
  return (
    <div className="space-y-1">
      {label ? (
        <span className="text-[11px] text-muted-foreground">{label}</span>
      ) : null}
      <div
        className={cn(
          "grid gap-1",
          columns === 3 && "grid-cols-3",
          columns === 2 && "grid-cols-2"
        )}
      >
        {options.map((option) => (
          <button
            className={cn(
              "h-7 rounded-md border px-2 text-[11px] transition-colors",
              value === option.value
                ? "border-foreground bg-foreground text-background"
                : "bg-background hover:bg-muted"
            )}
            key={option.value}
            onClick={() => onChange(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
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

/**
 * Drop or click to upload an image. Hands back an object URL the caller can
 * pass straight into a block's `image` prop. The caller owns the URL's
 * lifecycle (revoke blob: URLs on change/unmount).
 */
export function VariantImageDrop({
  label = "Image",
  value,
  onChange,
  onReset,
}: {
  label?: string;
  /** Current image URL — shown as a thumbnail. */
  value?: string;
  /** Called with a fresh object URL (and the source File) on drop/select. */
  onChange: (url: string, file: File) => void;
  /** When set, shows a "Reset" link to revert to the default image. */
  onReset?: () => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = React.useState(false);

  const handleFile = (file: File | null | undefined) => {
    if (!file?.type.startsWith("image/")) {
      return;
    }
    onChange(URL.createObjectURL(file), file);
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] text-muted-foreground">{label}</span>
        {onReset ? (
          <button
            className="text-[10px] text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            onClick={onReset}
            type="button"
          >
            Reset
          </button>
        ) : null}
      </div>
      <button
        className={cn(
          "flex w-full items-center gap-2 rounded-md border border-dashed bg-background p-2 text-left transition-colors",
          dragging ? "border-foreground bg-muted" : "hover:border-foreground/40"
        )}
        onClick={() => inputRef.current?.click()}
        onDragLeave={() => setDragging(false)}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          handleFile(event.dataTransfer.files?.[0]);
        }}
        type="button"
      >
        {value ? (
          <span
            aria-hidden="true"
            className="size-9 shrink-0 rounded bg-center bg-cover bg-muted"
            style={{ backgroundImage: `url("${value}")` }}
          />
        ) : null}
        <span className="text-[11px] text-muted-foreground">
          {dragging ? "Drop image…" : "Drop or click to upload"}
        </span>
      </button>
      <input
        accept="image/*"
        className="hidden"
        onChange={(event) => handleFile(event.target.files?.[0])}
        ref={inputRef}
        type="file"
      />
    </div>
  );
}

const HEX8 = /^#[0-9a-f]{8}$/i;
const HEX6 = /^#[0-9a-f]{6}$/i;

/** Native `<input type="color">` only accepts #rrggbb — drop any alpha. */
function toColorInputValue(value: string): string {
  if (HEX8.test(value)) {
    return value.slice(0, 7);
  }
  if (HEX6.test(value)) {
    return value;
  }
  return "#000000";
}

/** Continuous shader parameter — a labelled range with a live value readout. */
export function VariantSlider({
  label,
  value,
  min,
  max,
  step = 0.01,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block space-y-1">
      <span className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span>{label}</span>
        <span className="tabular-nums">
          {step < 1 ? value.toFixed(2) : Math.round(value)}
        </span>
      </span>
      <input
        className="h-1.5 w-full cursor-pointer accent-foreground"
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        step={step}
        type="range"
        value={value}
      />
    </label>
  );
}

/** Single color — swatch picker plus an editable hex field (alpha allowed). */
export function VariantColor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1.5">
        <input
          aria-label={`${label} swatch`}
          className="size-7 shrink-0 cursor-pointer rounded-md border bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded"
          onChange={(event) => onChange(event.target.value)}
          type="color"
          value={toColorInputValue(value)}
        />
        <input
          className="h-7 w-full rounded-md border bg-background px-2 font-mono text-[11px] uppercase outline-none transition-colors focus:border-foreground/40"
          onChange={(event) => onChange(event.target.value)}
          type="text"
          value={value}
        />
      </div>
    </div>
  );
}

/** Editable color palette — add/remove swatches up to `max`. */
export function VariantColorList({
  label = "Colors",
  value,
  max = 7,
  onChange,
}: {
  label?: string;
  value: string[];
  max?: number;
  onChange: (value: string[]) => void;
}) {
  const setAt = (index: number, color: string) =>
    onChange(value.map((c, i) => (i === index ? color : c)));
  const removeAt = (index: number) =>
    onChange(value.filter((_, i) => i !== index));
  const add = () => {
    if (value.length < max) {
      onChange([...value, "#ffffff"]);
    }
  };

  return (
    <div className="space-y-1">
      <span className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span>{label}</span>
        <span className="tabular-nums">
          {value.length}/{max}
        </span>
      </span>
      <div className="flex flex-wrap gap-1.5">
        {value.map((color, index) => (
          <span className="group relative" key={index}>
            <input
              aria-label={`Color ${index + 1}`}
              className="size-7 cursor-pointer rounded-md border bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded"
              onChange={(event) => setAt(index, event.target.value)}
              type="color"
              value={toColorInputValue(color)}
            />
            {value.length > 1 ? (
              <button
                aria-label={`Remove color ${index + 1}`}
                className="absolute -top-1 -right-1 hidden size-3.5 items-center justify-center rounded-full border bg-background text-[10px] text-muted-foreground leading-none hover:text-foreground group-hover:flex"
                onClick={() => removeAt(index)}
                type="button"
              >
                ×
              </button>
            ) : null}
          </span>
        ))}
        {value.length < max ? (
          <button
            aria-label="Add color"
            className="flex size-7 items-center justify-center rounded-md border border-dashed text-muted-foreground text-xs transition-colors hover:border-foreground/40 hover:text-foreground"
            onClick={add}
            type="button"
          >
            +
          </button>
        ) : null}
      </div>
    </div>
  );
}
