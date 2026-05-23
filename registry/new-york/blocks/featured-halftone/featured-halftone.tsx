"use client";

import { HalftoneCmyk } from "@paper-design/shaders-react";
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

export type FeaturedHalftoneProps = {
  image: string;
  imageAlt?: string;
  /** Title overlay text. */
  title?: React.ReactNode;
  /** Small label above the title. */
  eyebrow?: React.ReactNode;
  /** Where to anchor the title block. Default "bottom-left". */
  titlePosition?: TitlePosition;
  /** Title font size in px. Eyebrow scales proportionally. Default 30. */
  titleSize?: number;
  /** Class for the title text — color, weight overrides. */
  titleClassName?: string;
  /** Dot rendering style. Default "dots". */
  type?: "dots" | "ink" | "sharp";
  /** Halftone cell size, 0-1. Default 0.18. */
  size?: number;
  /** Dot edge softness, 0-1. Default 0.5. */
  softness?: number;
  /** Image contrast, 0-2. Default 1. */
  contrast?: number;
  /** Paper / background color. */
  colorBack?: string;
  /** CMYK ink colors. */
  colorC?: string;
  colorM?: string;
  colorY?: string;
  colorK?: string;
  /** Grain overlay strength, 0-1. */
  grainOverlay?: number;
  /** Grain mixer strength, 0-1. */
  grainMixer?: number;
  /** Aspect ratio. Default "1/1". */
  aspectRatio?: string;
  className?: string;
};

export function FeaturedHalftone({
  image,
  imageAlt: _imageAlt,
  title,
  eyebrow,
  titlePosition = "bottom-left",
  titleSize = 30,
  titleClassName = "text-stone-900",
  type = "dots",
  size = 0.18,
  softness = 0.55,
  contrast = 1.1,
  colorBack = "#f3ead8",
  colorC = "#1f6f97",
  colorM = "#d23a5a",
  colorY = "#e8a334",
  colorK = "#1a1a1a",
  grainOverlay = 0.25,
  grainMixer = 0.15,
  aspectRatio = "1/1",
  className,
}: FeaturedHalftoneProps) {
  const eyebrowSize = Math.max(11, Math.round(titleSize * 0.4));

  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden rounded-2xl bg-stone-100",
        className
      )}
      style={{ aspectRatio }}
    >
      <HalftoneCmyk
        colorBack={colorBack}
        colorC={colorC}
        colorK={colorK}
        colorM={colorM}
        colorY={colorY}
        contrast={contrast}
        fit="cover"
        grainMixer={grainMixer}
        grainOverlay={grainOverlay}
        image={image}
        size={size}
        softness={softness}
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
