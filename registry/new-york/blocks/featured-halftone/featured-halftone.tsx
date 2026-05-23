"use client";

import { HalftoneCmyk } from "@paper-design/shaders-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

export type FeaturedHalftoneProps = {
  image: string;
  imageAlt?: string;
  /** Bottom-left title overlay. */
  title?: React.ReactNode;
  /** Small label above the title. */
  eyebrow?: React.ReactNode;
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
        <figcaption className="absolute right-4 bottom-4 left-4 flex flex-col gap-1">
          {eyebrow ? (
            <span
              className={cn("font-medium text-xs opacity-80", titleClassName)}
            >
              {eyebrow}
            </span>
          ) : null}
          {title ? (
            <h3
              className={cn(
                "font-bold text-2xl leading-tight tracking-tight sm:text-3xl",
                titleClassName
              )}
            >
              {title}
            </h3>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
