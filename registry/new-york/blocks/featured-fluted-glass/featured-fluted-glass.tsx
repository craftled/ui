"use client";

import { FlutedGlass } from "@paper-design/shaders-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

export type FeaturedFlutedGlassProps = {
  image: string;
  imageAlt?: string;
  title?: React.ReactNode;
  eyebrow?: React.ReactNode;
  titleClassName?: string;
  /** Grid shape. */
  shape?: "lines" | "linesIrregular" | "wave" | "zigzag" | "pattern";
  /** Distortion shape — controls how each stripe refracts the image. */
  distortionShape?: "prism" | "lens" | "contour" | "cascade" | "flat";
  /** Size of distortion grid (0-1). */
  size?: number;
  /** Grid angle (0-180). */
  angle?: number;
  /** Distortion strength (0-1). */
  distortion?: number;
  /** Texture shift opposite to grid (-1 to 1). */
  shift?: number;
  /** Stretch along grid (0-1). */
  stretch?: number;
  /** Blur (0-1). */
  blur?: number;
  /** Edge softness (0-1). */
  edges?: number;
  /** Margin from container edges (0-1). */
  margin?: number;
  /** Shadow tint strength (0-1). */
  shadows?: number;
  /** Highlight stroke strength (0-1). */
  highlights?: number;
  /** Grain mixer (0-1). */
  grainMixer?: number;
  /** Grain overlay (0-1). */
  grainOverlay?: number;
  colorBack?: string;
  colorShadow?: string;
  colorHighlight?: string;
  aspectRatio?: string;
  className?: string;
};

export function FeaturedFlutedGlass({
  image,
  imageAlt: _imageAlt,
  title,
  eyebrow,
  titleClassName = "text-white",
  shape = "lines",
  distortionShape = "prism",
  size = 0.5,
  angle = 0,
  distortion = 0.5,
  shift = 0,
  stretch = 0,
  blur = 0,
  edges = 0.25,
  margin = 0,
  shadows = 0.25,
  highlights = 0.1,
  grainMixer = 0,
  grainOverlay = 0,
  colorBack = "#00000000",
  colorShadow = "#000000",
  colorHighlight = "#ffffff",
  aspectRatio = "16/9",
  className,
}: FeaturedFlutedGlassProps) {
  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden rounded-2xl bg-neutral-100",
        className
      )}
      style={{ aspectRatio }}
    >
      <FlutedGlass
        angle={angle}
        blur={blur}
        colorBack={colorBack}
        colorHighlight={colorHighlight}
        colorShadow={colorShadow}
        distortion={distortion}
        distortionShape={distortionShape}
        edges={edges}
        fit="cover"
        grainMixer={grainMixer}
        grainOverlay={grainOverlay}
        highlights={highlights}
        image={image}
        margin={margin}
        shadows={shadows}
        shape={shape}
        shift={shift}
        size={size}
        stretch={stretch}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
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
