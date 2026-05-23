"use client";

import { FlutedGlass } from "@paper-design/shaders-react";
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

export type FeaturedFlutedGlassProps = {
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
  titlePosition = "bottom-left",
  titleSize = 30,
  titleColor,
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
  const eyebrowSize = Math.max(11, Math.round(titleSize * 0.4));

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
