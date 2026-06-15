"use client";

import { ColorPanels } from "@paper-design/shaders-react";
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

export type FeaturedColorPanelsProps = {
  /** Up to 7 colors. */
  colors?: string[];
  /** Background color. */
  colorBack?: string;
  /** Angle between panels (0.25-7). */
  density?: number;
  /** Skew angle (-1 to 1). */
  angle1?: number;
  /** Skew angle (-1 to 1). */
  angle2?: number;
  /** Panel length relative to height (0-3). */
  length?: number;
  /** Color highlight on panel edges. */
  edges?: boolean;
  /** Side blur, 0 = sharp (0-0.5). */
  blur?: number;
  /** Transparency near central axis (0-1). */
  fadeIn?: number;
  /** Transparency near viewer (0-1). */
  fadeOut?: number;
  /** Color mixing within a panel, 0 = solid, 1 = gradient (0-1). */
  gradient?: number;
  /** Animation speed multiplier. 0 = static. */
  speed?: number;
  /** Zoom, 0.01-4. */
  scale?: number;
  /** Rotation in degrees, 0-360. */
  rotation?: number;
  /** Horizontal offset (-1 to 1). */
  offsetX?: number;
  /** Vertical offset (-1 to 1). */
  offsetY?: number;
  title?: React.ReactNode;
  eyebrow?: React.ReactNode;
  /** Where to anchor the title block. Default "bottom-left". */
  titlePosition?: TitlePosition;
  /** Title font size in px. Eyebrow scales proportionally. Default 30. */
  titleSize?: number;
  /** Inline color for the title + eyebrow. Overrides titleClassName color. */
  titleColor?: string;
  titleClassName?: string;
  children?: React.ReactNode;
  /** Forwarded to the WebGL canvas. Pass `{ preserveDrawingBuffer: true }` to allow exporting the canvas to an image. */
  webGlContextAttributes?: WebGLContextAttributes;
  aspectRatio?: string;
  className?: string;
};

const DEFAULT_COLORS = [
  "#ff9d00",
  "#fd4f30",
  "#809bff",
  "#6d2eff",
  "#333aff",
  "#f15cff",
  "#ffd557",
];

export function FeaturedColorPanels({
  colors = DEFAULT_COLORS,
  colorBack = "#000000",
  density = 3,
  angle1 = 0,
  angle2 = 0,
  length = 1.1,
  edges = false,
  blur = 0,
  fadeIn = 1,
  fadeOut = 0.3,
  gradient = 0,
  speed = 0.5,
  scale = 0.8,
  rotation = 0,
  offsetX = 0,
  offsetY = 0,
  title,
  eyebrow,
  titlePosition = "bottom-left",
  titleSize = 30,
  titleColor,
  titleClassName = "text-white",
  children,
  webGlContextAttributes,
  aspectRatio = "16/9",
  className,
}: FeaturedColorPanelsProps) {
  const eyebrowSize = Math.max(11, Math.round(titleSize * 0.4));

  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden rounded-2xl bg-neutral-900",
        className
      )}
      style={{ aspectRatio }}
    >
      <ColorPanels
        angle1={angle1}
        angle2={angle2}
        blur={blur}
        colorBack={colorBack}
        colors={colors}
        density={density}
        edges={edges}
        fadeIn={fadeIn}
        fadeOut={fadeOut}
        fit="cover"
        gradient={gradient}
        length={length}
        offsetX={offsetX}
        offsetY={offsetY}
        rotation={rotation}
        scale={scale}
        speed={speed}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        webGlContextAttributes={webGlContextAttributes}
      />

      {children ? (
        <div className="relative z-10 size-full">{children}</div>
      ) : null}

      {title || eyebrow ? (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-10 flex p-4 sm:p-6",
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
