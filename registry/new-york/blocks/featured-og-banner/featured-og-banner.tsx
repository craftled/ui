"use client";

import { StaticMeshGradient } from "@paper-design/shaders-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

/** Design canvas width — stroke and spacing scale from this baseline. */
export const OG_BANNER_DESIGN_WIDTH = 1400;

/** Design canvas height paired with {@link OG_BANNER_DESIGN_WIDTH}. */
export const OG_BANNER_DESIGN_HEIGHT = 735;

/** Center glass card width at the design canvas scale. */
export const OG_BANNER_CENTER_CARD_WIDTH = 1024;

export type OgScreenshot = {
  /** Image URL. When omitted, a neutral placeholder block is rendered. */
  src?: string;
  alt?: string;
  /** Tailwind / custom classes for the screenshot frame. */
  className?: string;
  /** Inline styles merged onto the screenshot frame (position, transform, size). */
  style?: React.CSSProperties;
  /** Placeholder fill when `src` is omitted. */
  placeholderColor?: string;
};

export type OgCenterCard = {
  /** Card image URL — full-bleed, bottom-aligned. Ignored when `children` is set. */
  imageSrc?: string;
  imageAlt?: string;
  /** Custom card content — takes precedence over `imageSrc`. */
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export type OgBannerLayerLayout = {
  /** Design px from the left edge of the 1400px canvas. */
  x?: number;
  /** Design px from the top edge of the 735px canvas. */
  y?: number;
  /** Design px width. Height fills to the bottom fade area. */
  width?: number;
  zIndex?: number;
  opacity?: number;
  /** Design px corner radius. */
  radius?: number;
  objectPosition?: string;
};

export type FeaturedOgBannerLayout = {
  left?: OgBannerLayerLayout;
  center?: OgBannerLayerLayout;
  right?: OgBannerLayerLayout;
};

export type OgMeshGradientProps = {
  /** Up to 10 colors. */
  colors?: string[];
  /** Color spot placement seed (0-100). */
  positions?: number;
  /** Sine wave distortion strength along X (0-1). */
  waveX?: number;
  /** X-axis wave phase offset (0-1). */
  waveXShift?: number;
  /** Sine wave distortion strength along Y (0-1). */
  waveY?: number;
  /** Y-axis wave phase offset (0-1). */
  waveYShift?: number;
  /** Blending behavior, 0 = hard stripes, 1 = gradual blend (0-1). */
  mixing?: number;
  /** Grain on shape edges (0-1). */
  grainMixer?: number;
  /** B/W grain overlay (0-1). */
  grainOverlay?: number;
  /** Animation speed (0 = static). */
  speed?: number;
  /** Zoom (0.01-4). */
  scale?: number;
  /** Rotation (0-360). */
  rotation?: number;
  /** Horizontal offset (-1 to 1). */
  offsetX?: number;
  /** Vertical offset (-1 to 1). */
  offsetY?: number;
};

export type FeaturedOgBannerProps = {
  /**
   * Background mode.
   * - `mesh` — static mesh gradient shader (default)
   * - `image` — `backgroundImageUrl`
   * - `none` — transparent / solid `backgroundColor`
   */
  background?: "mesh" | "image" | "none";
  /** Used when `background="image"`. */
  backgroundImageUrl?: string;
  /** Solid fallback when `background="none"`. */
  backgroundColor?: string;
  /** Props forwarded to the mesh gradient shader when `background="mesh"`. */
  meshGradient?: OgMeshGradientProps;
  /** Left screenshot (Figma: screenshot 2). */
  screenshotLeft?: OgScreenshot;
  /** Center screenshot image/content for the dominant card. */
  screenshotCenter?: OgScreenshot;
  /** Right screenshot (Figma: screenshot 3). */
  screenshotRight?: OgScreenshot;
  /** Dominant glass card. `imageSrc` / `children` override `screenshotCenter.src`. */
  centerCard?: OgCenterCard;
  /** Coordinate-based screenshot layout using the 1400×735 design canvas. */
  layout?: FeaturedOgBannerLayout;
  /** Shared top corner radius for all screenshot frames. `layout.*.radius` overrides it. */
  screenshotRadius?: number;
  /** Gradient stroke start color. Default `#1AE8FA`. */
  strokeFrom?: string;
  /** Gradient stroke end color. Default `#C78BFD`. */
  strokeTo?: string;
  /** Stroke width at the 1400px design scale. Scales with container width. Default 10. */
  strokeWidth?: number;
  /** Stroke opacity, 0–1. Default 0.24. */
  strokeOpacity?: number;
  /** Backdrop blur on the card inner surface, in px. Default 16. */
  backdropBlur?: number;
  /** Top corner radius at design scale (1400px width). Bottom corners stay square. Default 16. */
  cardRadius?: number;
  /** Bottom fade start color. Default `#0F0A1D`. */
  fadeFrom?: string;
  /** Bottom fade start opacity, 0–1. Default 0. */
  fadeFromOpacity?: number;
  /** Bottom fade end color. Default `#090515`. */
  fadeTo?: string;
  /** Bottom fade end opacity, 0–1. Default 1. */
  fadeToOpacity?: number;
  /** Height of the bottom fade as a fraction of banner height, 0–1. Default 0.55. */
  fadeHeight?: number;
  /** Root aspect ratio. Default `1400/735` (design frame). Use `1200/630` for OG export. */
  aspectRatio?: string;
  className?: string;
};

const DEFAULT_MESH: OgMeshGradientProps = {
  colors: ["#fff2a8", "#a7f3d0", "#1ae8fa", "#c78bfd"],
  positions: 42,
  waveX: 0.85,
  waveXShift: 0.35,
  waveY: 0.9,
  waveYShift: 0.25,
  mixing: 0.88,
  rotation: 300,
  speed: 0,
};

/** Horizontal position/size as % of the 1400px design width. */
function scaleDesignX(value: number) {
  return `${(value / OG_BANNER_DESIGN_WIDTH) * 100}%`;
}

/** Vertical position/size as % of the 735px design height. */
function scaleDesignY(value: number) {
  return `${(value / OG_BANNER_DESIGN_HEIGHT) * 100}%`;
}

// Fedica-style defaults — flat browser frames, center dominant, sides peeking behind.
const DEFAULT_LAYOUT: Required<{
  [Layer in keyof FeaturedOgBannerLayout]: Required<
    Pick<
      OgBannerLayerLayout,
      "x" | "y" | "width" | "zIndex" | "opacity" | "radius" | "objectPosition"
    >
  >;
}> = {
  left: {
    x: 20,
    y: 150,
    width: 480,
    zIndex: 1,
    opacity: 1,
    radius: 8,
    objectPosition: "top",
  },
  center: {
    x: (OG_BANNER_DESIGN_WIDTH - OG_BANNER_CENTER_CARD_WIDTH) / 2,
    y: 120,
    width: OG_BANNER_CENTER_CARD_WIDTH,
    zIndex: 30,
    opacity: 1,
    radius: 16,
    objectPosition: "bottom",
  },
  right: {
    x: 900,
    y: 150,
    width: 480,
    zIndex: 1,
    opacity: 1,
    radius: 8,
    objectPosition: "top",
  },
};

const PLACEHOLDER_LEFT: Required<Pick<OgScreenshot, "placeholderColor">> &
  OgScreenshot = {
  placeholderColor: "#2a1f4a",
  alt: "Product screenshot (left)",
};

const PLACEHOLDER_RIGHT: OgScreenshot = {
  placeholderColor: "#3d2a5c",
  alt: "Product screenshot (right)",
};

const PLACEHOLDER_CENTER: OgScreenshot = {
  placeholderColor: "#1f1635",
  alt: "Product screenshot (center)",
};

function designScale(value: number) {
  const scaledValue = `${(value / OG_BANNER_DESIGN_WIDTH) * 100}cqw`;

  return `clamp(${value * 0.45}px, ${scaledValue}, ${value}px)`;
}

function resolveLayerLayout(
  defaults: (typeof DEFAULT_LAYOUT)[keyof typeof DEFAULT_LAYOUT],
  layout?: OgBannerLayerLayout,
  screenshotRadius?: number
) {
  return {
    ...defaults,
    ...(screenshotRadius === undefined ? {} : { radius: screenshotRadius }),
    ...layout,
  };
}

function layerLayoutStyle(
  defaults: (typeof DEFAULT_LAYOUT)[keyof typeof DEFAULT_LAYOUT],
  layout?: OgBannerLayerLayout
): React.CSSProperties {
  const resolved = resolveLayerLayout(defaults, layout);

  return {
    left: scaleDesignX(resolved.x),
    top: scaleDesignY(resolved.y),
    bottom: 0,
    width: scaleDesignX(resolved.width),
    zIndex: resolved.zIndex,
    opacity: resolved.opacity,
    borderRadius: designScale(resolved.radius),
  };
}

function MeshBackground({
  meshGradient,
}: {
  meshGradient: OgMeshGradientProps;
}) {
  return (
    <StaticMeshGradient
      {...meshGradient}
      fit="cover"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
}

function hexWithAlpha(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized.padEnd(6, "0").slice(0, 6);
  const r = Number.parseInt(full.slice(0, 2), 16);
  const g = Number.parseInt(full.slice(2, 4), 16);
  const b = Number.parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function renderCenterCardContent(
  card: OgCenterCard,
  objectPosition = "bottom"
) {
  if (card.children) {
    return card.children;
  }

  if (card.imageSrc) {
    return (
      <img
        alt={card.imageAlt ?? ""}
        className="block h-full w-full object-cover"
        draggable={false}
        src={card.imageSrc}
        style={{ objectPosition }}
      />
    );
  }

  return (
    <div
      aria-label={card.imageAlt ?? "Center card preview"}
      className="h-full w-full bg-linear-to-br from-cyan-500/20 via-violet-500/15 to-fuchsia-500/20"
      role="img"
    />
  );
}

function OgPlaceholderPreview({
  alt,
  placeholderColor,
}: {
  alt?: string;
  placeholderColor: string;
}) {
  return (
    <div
      aria-label={alt}
      className="flex size-full flex-col gap-[4%] bg-linear-to-br from-white/10 to-black/20 p-[7%]"
      role="img"
      style={{ backgroundColor: placeholderColor }}
    >
      <div className="h-[8%] w-[42%] rounded-full bg-white/18" />
      <div className="grid flex-1 grid-cols-[1.1fr_0.9fr] gap-[4%]">
        <div className="rounded-[inherit] bg-white/12" />
        <div className="flex flex-col gap-[6%]">
          <div className="h-[22%] rounded-[inherit] bg-white/14" />
          <div className="h-[22%] rounded-[inherit] bg-white/10" />
          <div className="flex-1 rounded-[inherit] bg-white/8" />
        </div>
      </div>
      <div className="grid h-[18%] grid-cols-3 gap-[3%]">
        <div className="rounded-[inherit] bg-white/10" />
        <div className="rounded-[inherit] bg-white/14" />
        <div className="rounded-[inherit] bg-white/10" />
      </div>
    </div>
  );
}

function OgScreenshotFrame({
  screenshot,
  layout,
  roundedClass = "rounded-xl",
  strokeFrom,
  strokeTo,
  strokeWidth,
  strokeOpacity,
}: {
  screenshot: OgScreenshot;
  layout: Required<OgBannerLayerLayout>;
  roundedClass?: string;
  strokeFrom: string;
  strokeTo: string;
  strokeWidth: number;
  strokeOpacity: number;
}) {
  const {
    src,
    alt,
    className,
    style,
    placeholderColor = "#27272a",
  } = screenshot;
  const padding = designScale(strokeWidth);
  const topRadius = designScale(layout.radius);
  const innerTopRadius = `max(0px, calc(${topRadius} - ${padding}))`;
  const outerBorderRadius = `${topRadius} ${topRadius} 0 0`;
  const innerBorderRadius = `${innerTopRadius} ${innerTopRadius} 0 0`;

  return (
    <div
      className={cn("absolute", roundedClass, className)}
      style={{
        ...layerLayoutStyle(layout, undefined),
        ...style,
      }}
    >
      <div
        className="box-border size-full px-[var(--og-card-stroke)] pt-[var(--og-card-stroke)] shadow-[0_24px_80px_-20px_rgba(0,0,0,0.65)]"
        style={{
          ["--og-card-stroke" as string]: padding,
          borderRadius: outerBorderRadius,
          background: `linear-gradient(135deg, ${hexWithAlpha(strokeFrom, strokeOpacity)}, ${hexWithAlpha(strokeTo, strokeOpacity)})`,
        }}
      >
        <div
          className="size-full overflow-hidden bg-black/25 ring-1 ring-white/10"
          style={{ borderRadius: innerBorderRadius }}
        >
          {src ? (
            <img
              alt={alt ?? ""}
              className="block size-full object-cover object-top"
              draggable={false}
              src={src}
              style={{ objectPosition: layout.objectPosition }}
            />
          ) : (
            <OgPlaceholderPreview
              alt={alt}
              placeholderColor={placeholderColor}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function OgCenterCardFrame({
  card,
  screenshot,
  layout,
  strokeFrom,
  strokeTo,
  strokeWidth,
  strokeOpacity,
  backdropBlur,
  cardRadius,
}: {
  card: OgCenterCard;
  screenshot: OgScreenshot;
  layout: Required<OgBannerLayerLayout>;
  strokeFrom: string;
  strokeTo: string;
  strokeWidth: number;
  strokeOpacity: number;
  backdropBlur: number;
  cardRadius: number;
}) {
  const padding = designScale(strokeWidth);
  const topRadius = designScale(layout.radius ?? cardRadius);
  const innerTopRadius = `max(0px, calc(${topRadius} - ${padding}))`;
  const outerBorderRadius = `${topRadius} ${topRadius} 0 0`;
  const innerBorderRadius = `${innerTopRadius} ${innerTopRadius} 0 0`;
  const resolvedCard: OgCenterCard = {
    imageAlt: card.imageAlt ?? screenshot.alt,
    imageSrc: card.imageSrc ?? screenshot.src,
    children: card.children,
  };

  return (
    <div
      className={cn("absolute", screenshot.className, card.className)}
      style={{
        ...layerLayoutStyle(layout, undefined),
        ...screenshot.style,
        ...card.style,
      }}
    >
      <div
        className="box-border size-full px-[var(--og-card-stroke)] pt-[var(--og-card-stroke)]"
        style={{
          ["--og-card-stroke" as string]: padding,
          borderRadius: outerBorderRadius,
          background: `linear-gradient(135deg, ${hexWithAlpha(strokeFrom, strokeOpacity)}, ${hexWithAlpha(strokeTo, strokeOpacity)})`,
        }}
      >
        <div
          className="flex size-full flex-col justify-end overflow-hidden bg-black/25 ring-1 ring-white/10"
          style={{
            borderRadius: innerBorderRadius,
            backdropFilter: `blur(${backdropBlur}px)`,
            WebkitBackdropFilter: `blur(${backdropBlur}px)`,
          }}
        >
          {resolvedCard.imageSrc || resolvedCard.children ? (
            renderCenterCardContent(resolvedCard, layout.objectPosition)
          ) : (
            <OgPlaceholderPreview
              alt={resolvedCard.imageAlt ?? "Center card preview"}
              placeholderColor={screenshot.placeholderColor ?? "#1f1635"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export function FeaturedOgBanner({
  background = "mesh",
  backgroundImageUrl,
  backgroundColor = "#0f0a1d",
  meshGradient = DEFAULT_MESH,
  screenshotLeft = PLACEHOLDER_LEFT,
  screenshotCenter = PLACEHOLDER_CENTER,
  screenshotRight = PLACEHOLDER_RIGHT,
  centerCard = {},
  layout,
  screenshotRadius,
  strokeFrom = "#1AE8FA",
  strokeTo = "#C78BFD",
  strokeWidth = 10,
  strokeOpacity = 0.24,
  backdropBlur = 16,
  cardRadius = 16,
  fadeFrom = "#0F0A1D",
  fadeFromOpacity = 0,
  fadeTo = "#090515",
  fadeToOpacity = 1,
  fadeHeight = 0.55,
  aspectRatio = "1400/735",
  className,
}: FeaturedOgBannerProps) {
  const resolvedMeshGradient = { ...DEFAULT_MESH, ...meshGradient };
  const resolvedLayout = {
    left: resolveLayerLayout(
      DEFAULT_LAYOUT.left,
      layout?.left,
      screenshotRadius
    ),
    center: resolveLayerLayout(
      DEFAULT_LAYOUT.center,
      layout?.center,
      screenshotRadius
    ),
    right: resolveLayerLayout(
      DEFAULT_LAYOUT.right,
      layout?.right,
      screenshotRadius
    ),
  };

  return (
    <figure
      className={cn(
        "relative isolate w-full overflow-hidden bg-neutral-950",
        className
      )}
      style={{ aspectRatio, backgroundColor, containerType: "inline-size" }}
    >
      {background === "mesh" ? (
        <MeshBackground meshGradient={resolvedMeshGradient} />
      ) : null}

      {background === "image" && backgroundImageUrl ? (
        <img
          alt=""
          className="absolute inset-0 size-full object-cover"
          draggable={false}
          src={backgroundImageUrl}
        />
      ) : null}

      <div className="absolute inset-0 z-10">
        <OgScreenshotFrame
          layout={resolvedLayout.left}
          roundedClass="rounded-lg"
          screenshot={screenshotLeft}
          strokeFrom={strokeFrom}
          strokeOpacity={strokeOpacity}
          strokeTo={strokeTo}
          strokeWidth={strokeWidth}
        />
        <OgScreenshotFrame
          layout={resolvedLayout.right}
          roundedClass="rounded-lg"
          screenshot={screenshotRight}
          strokeFrom={strokeFrom}
          strokeOpacity={strokeOpacity}
          strokeTo={strokeTo}
          strokeWidth={strokeWidth}
        />
        <OgCenterCardFrame
          backdropBlur={backdropBlur}
          card={centerCard}
          cardRadius={cardRadius}
          layout={resolvedLayout.center}
          screenshot={screenshotCenter}
          strokeFrom={strokeFrom}
          strokeOpacity={strokeOpacity}
          strokeTo={strokeTo}
          strokeWidth={strokeWidth}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-40"
        style={{
          height: `${fadeHeight * 100}%`,
          background: `linear-gradient(to bottom, ${hexWithAlpha(fadeFrom, fadeFromOpacity)}, ${hexWithAlpha(fadeTo, fadeToOpacity)})`,
        }}
      />
    </figure>
  );
}
