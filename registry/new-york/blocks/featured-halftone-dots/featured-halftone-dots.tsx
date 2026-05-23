"use client";

import { HalftoneDots } from "@paper-design/shaders-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

export type TitlePosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

const POSITION_CLASSES: Record<TitlePosition, string> = {
  "top-left": "items-start justify-start text-left",
  "top-center": "items-start justify-center text-center",
  "top-right": "items-start justify-end text-right",
  "center-left": "items-center justify-start text-left",
  center: "items-center justify-center text-center",
  "center-right": "items-center justify-end text-right",
  "bottom-left": "items-end justify-start text-left",
  "bottom-center": "items-end justify-center text-center",
  "bottom-right": "items-end justify-end text-right",
};

export type FeaturedHalftoneDotsProps = {
  image: string;
  imageAlt?: string;
  title?: React.ReactNode;
  eyebrow?: React.ReactNode;
  /** Where to anchor the title block. Default "bottom-left". */
  titlePosition?: TitlePosition;
  /** Title font size in px. Eyebrow scales proportionally. Default 30. */
  titleSize?: number;
  /** Inline color for the title + eyebrow. Overrides titleClassName color. */
  titleColor?: string;
  titleClassName?: string;
  /** Dot rendering style. */
  type?: "classic" | "gooey" | "holes" | "soft";
  /** Grid pattern. */
  grid?: "square" | "hex";
  /** Grid size relative to image (0-1). */
  size?: number;
  /** Max dot size relative to cell (0-2). */
  radius?: number;
  /** Image contrast (0-1). */
  contrast?: number;
  /** Paper / background color. */
  colorBack?: string;
  /** Dot color. */
  colorFront?: string;
  /** Use the image's actual colors instead of colorFront. */
  originalColors?: boolean;
  /** Invert image luminance. */
  inverted?: boolean;
  /** Grain distortion on dot edges (0-1). */
  grainMixer?: number;
  /** Black/white grain overlay (0-1). */
  grainOverlay?: number;
  /** Grain scale (0-1). */
  grainSize?: number;
  aspectRatio?: string;
  className?: string;
};

export function FeaturedHalftoneDots({
  image,
  imageAlt: _imageAlt,
  title,
  eyebrow,
  titlePosition = "bottom-left",
  titleSize = 30,
  titleColor,
  titleClassName = "text-stone-900",
  type = "gooey",
  grid = "hex",
  size = 0.5,
  radius = 1.25,
  contrast = 0.4,
  colorBack = "#f2f1e8",
  colorFront = "#2b2b2b",
  originalColors = false,
  inverted = false,
  grainMixer = 0.2,
  grainOverlay = 0.2,
  grainSize = 0.5,
  aspectRatio = "16/9",
  className,
}: FeaturedHalftoneDotsProps) {
  const eyebrowSize = Math.max(11, Math.round(titleSize * 0.4));

  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden rounded-2xl bg-stone-100",
        className
      )}
      style={{ aspectRatio }}
    >
      <HalftoneDots
        colorBack={colorBack}
        colorFront={colorFront}
        contrast={contrast}
        fit="cover"
        grainMixer={grainMixer}
        grainOverlay={grainOverlay}
        grainSize={grainSize}
        grid={grid}
        image={image}
        inverted={inverted}
        originalColors={originalColors}
        radius={radius}
        size={size}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        type={type}
      />

      {title || eyebrow ? (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 flex p-4 sm:p-6",
            POSITION_CLASSES[titlePosition]
          )}
        >
          <figcaption className="flex max-w-full flex-col gap-1">
            {eyebrow ? (
              <span
                className={cn("font-medium opacity-80", titleClassName)}
                style={{ fontSize: `${eyebrowSize}px`, color: titleColor }}
              >
                {eyebrow}
              </span>
            ) : null}
            {title ? (
              <h3
                className={cn(
                  "font-bold leading-tight tracking-tight",
                  titleClassName
                )}
                style={{ fontSize: `${titleSize}px`, color: titleColor }}
              >
                {title}
              </h3>
            ) : null}
          </figcaption>
        </div>
      ) : null}
    </figure>
  );
}
