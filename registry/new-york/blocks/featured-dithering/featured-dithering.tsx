"use client";

import { ImageDithering } from "@paper-design/shaders-react";
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

export type FeaturedDitheringProps = {
  image: string;
  imageAlt?: string;
  title?: React.ReactNode;
  eyebrow?: React.ReactNode;
  /** Where to anchor the title block. Default "bottom-left". */
  titlePosition?: TitlePosition;
  /** Title font size in px. Eyebrow scales proportionally. Default 30. */
  titleSize?: number;
  titleClassName?: string;
  /** Dithering pattern. */
  type?: "random" | "2x2" | "4x4" | "8x8";
  /** Pixel grid size, 0.5–20. */
  size?: number;
  /** Number of palette colors, 1–7. */
  colorSteps?: number;
  /** Background color (paper). */
  colorBack?: string;
  /** Foreground color (ink). */
  colorFront?: string;
  /** Secondary foreground (set to colorFront for classic 2-color dithering). */
  colorHighlight?: string;
  /** Use the image's actual colors instead of the palette. */
  originalColors?: boolean;
  /** Invert the image luminance. */
  inverted?: boolean;
  aspectRatio?: string;
  className?: string;
};

export function FeaturedDithering({
  image,
  imageAlt: _imageAlt,
  title,
  eyebrow,
  titlePosition = "bottom-left",
  titleSize = 30,
  titleClassName = "text-white",
  type = "8x8",
  size = 2,
  colorSteps = 2,
  colorBack = "#000c38",
  colorFront = "#94ffaf",
  colorHighlight = "#eaff94",
  originalColors = false,
  inverted = false,
  aspectRatio = "16/9",
  className,
}: FeaturedDitheringProps) {
  const eyebrowSize = Math.max(11, Math.round(titleSize * 0.4));

  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden rounded-2xl bg-neutral-900",
        className
      )}
      style={{ aspectRatio }}
    >
      <ImageDithering
        colorBack={colorBack}
        colorFront={colorFront}
        colorHighlight={colorHighlight}
        colorSteps={colorSteps}
        fit="cover"
        image={image}
        inverted={inverted}
        originalColors={originalColors}
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
                style={{ fontSize: `${eyebrowSize}px` }}
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
                style={{ fontSize: `${titleSize}px` }}
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
