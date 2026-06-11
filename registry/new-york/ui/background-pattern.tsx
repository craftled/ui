"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type BackgroundPatternVariant =
  | "dots"
  | "grid"
  | "vertical-lines"
  | "diagonal-lines"
  | "vertical-lines-top"
  | "vertical-lines-dome"
  | "isometric";

export type BackgroundPatternProps = React.ComponentProps<"div"> & {
  variant: BackgroundPatternVariant;
  /** Cell / line spacing in px. Default 24. */
  size?: number;
  /** Stroke width for lines; dot diameter for dot variants. Default 1. */
  strokeWidth?: number;
  /** Arch strength for dome variant, 0–1. Default 0.35. */
  domeStrength?: number;
  /** Fade pattern toward edges with a radial mask. Default false. */
  fade?: boolean;
};
const VIEW_WIDTH = 960;
const VIEW_HEIGHT = 540;

function safeSpacing(size: number, fallback = 24): number {
  if (!Number.isFinite(size) || size <= 0) {
    return fallback;
  }
  return size;
}

function BackgroundPattern({
  variant,
  size = 24,
  strokeWidth = 1,
  domeStrength = 0.35,
  fade = false,
  className,
  style,
  ...props
}: BackgroundPatternProps) {
  const id = React.useId().replace(/:/g, "");
  const fadeStyle = fade
    ? {
        maskImage:
          "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 30%, transparent 70%)",
      }
    : undefined;

  const rootClassName = cn(
    "pointer-events-none size-full text-foreground/[0.08] dark:text-foreground/[0.12]",
    className
  );
  const spacing = safeSpacing(size);

  if (variant === "vertical-lines") {
    const lineColor = "currentColor";
    return (
      <div
        aria-hidden
        className={rootClassName}
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, ${lineColor} 0, ${lineColor} ${strokeWidth}px, transparent ${strokeWidth}px, transparent ${spacing}px)`,
          ...fadeStyle,
          ...style,
        }}
        {...props}
      />
    );
  }

  if (variant === "diagonal-lines") {
    const lineColor = "currentColor";
    return (
      <div
        aria-hidden
        className={rootClassName}
        style={{
          backgroundImage: `repeating-linear-gradient(-45deg, ${lineColor} 0, ${lineColor} ${strokeWidth}px, transparent ${strokeWidth}px, transparent ${spacing}px)`,
          ...fadeStyle,
          ...style,
        }}
        {...props}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={rootClassName}
      style={{ ...fadeStyle, ...style }}
      {...props}
    >
      {variant === "dots" ? (
        <DotsPattern id={id} size={spacing} strokeWidth={strokeWidth} />
      ) : null}
      {variant === "grid" ? (
        <GridPattern id={id} size={spacing} strokeWidth={strokeWidth} />
      ) : null}
      {variant === "vertical-lines-top" ? (
        <VerticalLinesTopPattern size={spacing} strokeWidth={strokeWidth} />
      ) : null}
      {variant === "vertical-lines-dome" ? (
        <VerticalLinesDomePattern
          domeStrength={domeStrength}
          size={spacing}
          strokeWidth={strokeWidth}
        />
      ) : null}
      {variant === "isometric" ? <IsometricPattern id={id} /> : null}
    </div>
  );
}

function DotsPattern({
  id,
  size,
  strokeWidth,
}: {
  id: string;
  size: number;
  strokeWidth: number;
}) {
  const radius = strokeWidth * 0.75;
  const offset = radius + 1;

  return (
    <svg aria-hidden className="size-full" preserveAspectRatio="none">
      <title>Dot pattern</title>
      <defs>
        <pattern
          height={size}
          id={`dots-${id}`}
          patternUnits="userSpaceOnUse"
          width={size}
        >
          <circle cx={offset} cy={offset} fill="currentColor" r={radius} />
        </pattern>
      </defs>
      <rect fill={`url(#dots-${id})`} height="100%" width="100%" />
    </svg>
  );
}

function GridPattern({
  id,
  size,
  strokeWidth,
}: {
  id: string;
  size: number;
  strokeWidth: number;
}) {
  return (
    <svg aria-hidden className="size-full" preserveAspectRatio="none">
      <title>Grid pattern</title>
      <defs>
        <pattern
          height={size}
          id={`grid-${id}`}
          patternUnits="userSpaceOnUse"
          width={size}
        >
          <path
            d={`M ${size} 0 L 0 0 0 ${size}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
        </pattern>
      </defs>
      <rect fill={`url(#grid-${id})`} height="100%" width="100%" />
    </svg>
  );
}

function VerticalLinesTopPattern({
  size,
  strokeWidth,
}: {
  size: number;
  strokeWidth: number;
}) {
  const columnCount = Math.ceil(VIEW_WIDTH / safeSpacing(size));
  const spacing = VIEW_WIDTH / columnCount;
  const dotRadius = Math.max(strokeWidth * 0.75, 1.5);
  const topY = 24;

  return (
    <svg
      aria-hidden
      className="size-full"
      preserveAspectRatio="none"
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
    >
      <title>Vertical lines with top dots</title>
      {Array.from({ length: columnCount + 1 }, (_, index) => {
        const x = index * spacing;
        return (
          <g key={index}>
            <circle cx={x} cy={topY} fill="currentColor" r={dotRadius} />
            <line
              stroke="currentColor"
              strokeWidth={strokeWidth}
              x1={x}
              x2={x}
              y1={topY + dotRadius + 2}
              y2={VIEW_HEIGHT}
            />
          </g>
        );
      })}
    </svg>
  );
}

function VerticalLinesDomePattern({
  size,
  strokeWidth,
  domeStrength,
}: {
  size: number;
  strokeWidth: number;
  domeStrength: number;
}) {
  const columnCount = Math.ceil(VIEW_WIDTH / safeSpacing(size));
  const spacing = VIEW_WIDTH / columnCount;
  const dotRadius = Math.max(strokeWidth * 0.75, 1.5);
  const topY = 0;
  const maxBottom = VIEW_HEIGHT;
  const archHeight = VIEW_HEIGHT * domeStrength;

  return (
    <svg
      aria-hidden
      className="size-full"
      preserveAspectRatio="none"
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
    >
      <title>Vertical lines with dome curve</title>
      {Array.from({ length: columnCount + 1 }, (_, index) => {
        const x = index * spacing;
        const normalized = (index / columnCount - 0.5) * 2;
        const arch = (1 - normalized * normalized) * archHeight;
        const bottomY = maxBottom - arch;

        return (
          <g key={index}>
            <line
              stroke="currentColor"
              strokeWidth={strokeWidth}
              x1={x}
              x2={x}
              y1={topY}
              y2={bottomY - dotRadius - 2}
            />
            <circle cx={x} cy={bottomY} fill="currentColor" r={dotRadius} />
          </g>
        );
      })}
    </svg>
  );
}

function IsometricPattern({ id }: { id: string }) {
  return (
    <svg
      aria-hidden
      className="size-full"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 960 540"
    >
      <title>Isometric wireframe pattern</title>
      <defs>
        <pattern
          height="32"
          id={`iso-grid-${id}`}
          patternUnits="userSpaceOnUse"
          width="32"
        >
          <path
            d="M 32 0 L 0 0 0 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
          />
        </pattern>
        <pattern
          height="8"
          id={`iso-hatch-${id}`}
          patternTransform="rotate(45)"
          patternUnits="userSpaceOnUse"
          width="8"
        >
          <line
            stroke="currentColor"
            strokeWidth="1.5"
            x1="0"
            x2="0"
            y1="0"
            y2="8"
          />
        </pattern>
      </defs>
      <rect fill={`url(#iso-grid-${id})`} height="100%" width="100%" />
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(480 300)"
      >
        <IsometricCube
          hatchId={`iso-hatch-${id}`}
          opacity={0.35}
          strokeWidth={1}
          x={-220}
        />
        <IsometricCube
          hatchId={`iso-hatch-${id}`}
          opacity={0.35}
          strokeWidth={1}
          x={-110}
        />
        <IsometricCube
          emphasized
          hatchId={`iso-hatch-${id}`}
          opacity={1}
          strokeWidth={2}
          x={0}
        />
        <IsometricCube
          hatchId={`iso-hatch-${id}`}
          opacity={0.35}
          strokeWidth={1}
          x={110}
        />
        <IsometricCube
          hatchId={`iso-hatch-${id}`}
          opacity={0.35}
          strokeWidth={1}
          x={220}
        />
      </g>
    </svg>
  );
}

function IsometricCube({
  x,
  strokeWidth,
  opacity,
  emphasized = false,
  hatchId,
}: {
  x: number;
  strokeWidth: number;
  opacity: number;
  emphasized?: boolean;
  hatchId: string;
}) {
  const w = 72;
  const h = 42;
  const d = 36;
  const top = -h - d;
  const left = -w / 2;
  const right = w / 2;

  return (
    <g opacity={opacity} transform={`translate(${x} 0)`}>
      <path
        d={`M ${left} ${top + d} L 0 ${top} L ${right} ${top + d} L ${right} ${top + d + h} L 0 ${top + d + h + d / 2} L ${left} ${top + d + h} Z`}
        strokeDasharray={emphasized ? undefined : "4 4"}
        strokeWidth={strokeWidth}
      />
      <path
        d={`M ${left} ${top + d} L 0 ${top + d + d / 2} L ${right} ${top + d} L ${right} ${top + d + h} L 0 ${top + d + h + d / 2} L ${left} ${top + d + h} Z`}
        strokeDasharray="4 4"
        strokeWidth={emphasized ? strokeWidth * 0.75 : strokeWidth * 0.5}
      />
      {emphasized ? (
        <path
          d={`M 0 ${top + d + d / 2} L ${right} ${top + d} L ${right} ${top + d + h} L 0 ${top + d + h + d / 2} Z`}
          fill={`url(#${hatchId})`}
          opacity={0.5}
          stroke="currentColor"
          strokeWidth={strokeWidth * 0.75}
        />
      ) : null}
    </g>
  );
}

export { BackgroundPattern };
