"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A typographic cover (rendered text on a colored face) or an image cover
 * (full-bleed artwork). `type` covers also accept an `accent` swatch used for
 * the small corner mark.
 */
export type BookCoverFace =
  | {
      kind: "type";
      /** Cover background. Hex, rgb, or any CSS color. */
      bg: string;
      /** Title + meta color. */
      fg: string;
      /** Optional accent for the corner mark. Defaults to `fg`. */
      accent?: string;
      /** Draw the thin inset frame around the face. */
      frame?: boolean;
      /** Font stack for the title. Defaults to a mono stack. */
      fontFamily?: string;
    }
  | {
      kind: "image";
      src: string;
      alt?: string;
    };

export type BookCoverProps = {
  title: string;
  author?: string;
  /** Footer line on `type` covers — a year, edition, imprint, etc. */
  footer?: string;
  cover?: BookCoverFace;

  // --- Geometry (px / deg) ---
  width?: number;
  height?: number;
  /** Page-block thickness. */
  depth?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  perspective?: number;
  /** Corner radius on the cover + spine. */
  radius?: number;

  // --- Appearance ---
  variant?: "solid" | "wireframe";
  /** Spine + back color (solid). */
  spineColor?: string;
  /** Page-block (fore-edge / head / tail) color (solid). */
  pageColor?: string;
  /** Drop a soft contact shadow under the book (solid only). */
  shadow?: boolean;

  // --- Wireframe-only ---
  /** Edge stroke. Defaults to `var(--foreground)` so it adapts to light/dark. */
  edgeColor?: string;
  /** Face fill. Defaults to `var(--card)` so it adapts to light/dark. */
  faceColor?: string;
  /** 0–1 opacity of wireframe faces. */
  faceOpacity?: number;

  /**
   * Background painted on the scene root. Left transparent by default so the
   * book inherits the surface it sits on (theme-aware). Pass a color to force
   * a specific canvas (e.g. the configurator's dark stage).
   */
  background?: string;
  /** Straighten slightly toward the viewer on hover (good for rows). */
  hoverable?: boolean;
  /** Grab + drag to orbit the book (mouse / touch). */
  draggable?: boolean;
  /** Fires with the live rotation while dragging — sync external controls. */
  onRotateChange?: (rotation: { rotateX: number; rotateY: number }) => void;
  className?: string;
};

const DEFAULT_COVER: BookCoverFace = {
  kind: "type",
  bg: "#1a1d24",
  fg: "#e8eaed",
  accent: "#7dd3fc",
  frame: true,
};

const MONO_STACK =
  '"Geist Mono", ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace';

const GEOMETRY_DEFAULTS = {
  width: 300,
  height: 440,
  depth: 42,
  rotateX: 6,
  rotateY: -28,
  rotateZ: 0,
  perspective: 1800,
  radius: 4,
};

function pageTexture(color: string, axis: "to right" | "to bottom"): string {
  // Thin leaves: a hairline every ~2px to read as a stacked page-block.
  return `repeating-linear-gradient(${axis}, ${color} 0 1.5px, rgba(0,0,0,0.10) 1.5px 2.5px)`;
}

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

function grabCursor(
  draggable: boolean,
  active: boolean
): React.CSSProperties["cursor"] {
  if (!draggable) {
    return;
  }
  return active ? "grabbing" : "grab";
}

const DRAG_SPEED = 0.4;
const RX_LIMIT = 85; // stay shy of 90° to avoid the gimbal flip
const RY_LIMIT = 180;

/**
 * Pointer-drag orbit. Renders from `rotateX`/`rotateY` props, but while the
 * user drags it tracks a local delta and reports it through `onRotateChange`
 * so a parent (e.g. sliders) stays the single source of truth.
 */
function useOrbit({
  rotateX,
  rotateY,
  draggable,
  onRotateChange,
}: {
  rotateX: number;
  rotateY: number;
  draggable?: boolean;
  onRotateChange?: (r: { rotateX: number; rotateY: number }) => void;
}) {
  const [rot, setRot] = React.useState({ x: rotateX, y: rotateY });
  const [active, setActive] = React.useState(false);
  const dragging = React.useRef(false);
  const start = React.useRef({ px: 0, py: 0, x: 0, y: 0 });

  // Resync from props when not mid-drag (slider moves flow in here).
  React.useEffect(() => {
    if (!dragging.current) {
      setRot({ x: rotateX, y: rotateY });
    }
  }, [rotateX, rotateY]);

  if (!draggable) {
    return { rot: { x: rotateX, y: rotateY }, active: false, bind: {} };
  }

  const bind = {
    onPointerDown: (e: React.PointerEvent) => {
      dragging.current = true;
      setActive(true);
      start.current = { px: e.clientX, py: e.clientY, x: rot.x, y: rot.y };
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Pointer capture is a nicety; dragging still works without it.
      }
    },
    onPointerMove: (e: React.PointerEvent) => {
      if (!dragging.current) {
        return;
      }
      const nx = clamp(
        start.current.x - (e.clientY - start.current.py) * DRAG_SPEED,
        -RX_LIMIT,
        RX_LIMIT
      );
      const ny = clamp(
        start.current.y + (e.clientX - start.current.px) * DRAG_SPEED,
        -RY_LIMIT,
        RY_LIMIT
      );
      setRot({ x: nx, y: ny });
      onRotateChange?.({ rotateX: Math.round(nx), rotateY: Math.round(ny) });
    },
    onPointerUp: (e: React.PointerEvent) => {
      dragging.current = false;
      setActive(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Already released / never captured — safe to ignore.
      }
    },
    onPointerCancel: () => {
      dragging.current = false;
      setActive(false);
    },
  };

  return { rot, active, bind };
}

// --- Internal: the cover face (image or typographic) ------------------------

function CoverFace({
  title,
  author,
  footer,
  cover,
  width,
  radius,
  wire,
  edgeColor,
}: {
  title: string;
  author?: string;
  footer?: string;
  cover: BookCoverFace;
  width: number;
  radius: number;
  wire: boolean;
  edgeColor: string;
}) {
  if (cover.kind === "image") {
    return (
      <img
        alt={cover.alt ?? title}
        className="h-full w-full object-cover"
        src={cover.src}
        style={{ borderRadius: radius }}
      />
    );
  }

  return (
    <div
      className="flex h-full w-full flex-col"
      style={{
        background: wire ? "transparent" : cover.bg,
        color: wire ? edgeColor : cover.fg,
        borderRadius: wire ? 0 : radius,
        padding: Math.round(width * 0.09),
        fontFamily: cover.fontFamily ?? MONO_STACK,
      }}
    >
      {cover.frame && !wire ? (
        <span
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            inset: Math.round(width * 0.055),
            border: `1px solid color-mix(in srgb, ${cover.fg} 28%, transparent)`,
            borderRadius: Math.max(radius - 2, 0),
          }}
        />
      ) : null}
      <span
        aria-hidden
        className="self-end"
        style={{
          width: Math.round(width * 0.085),
          height: Math.round(width * 0.085),
          borderRadius: 3,
          background: wire ? "transparent" : (cover.accent ?? cover.fg),
          border: wire ? `1px solid ${edgeColor}` : "none",
        }}
      />
      <span
        className="mt-auto font-semibold leading-[1.1] tracking-tight"
        style={{ fontSize: Math.round(width * 0.105) }}
      >
        {title}
      </span>
      {author ? (
        <span
          className="mt-1.5 opacity-70"
          style={{ fontSize: Math.round(width * 0.05) }}
        >
          {author}
        </span>
      ) : null}
      {footer ? (
        <span
          className="mt-3 opacity-55"
          style={{ fontSize: Math.round(width * 0.045) }}
        >
          {footer}
        </span>
      ) : null}
    </div>
  );
}

// --- Internal: one 3D cuboid, no perspective wrapper (centered model) -------

type BookBoxProps = {
  title: string;
  author?: string;
  footer?: string;
  cover: BookCoverFace;
  width: number;
  height: number;
  depth: number;
  radius: number;
  variant: "solid" | "wireframe";
  spineColor: string;
  pageColor: string;
  edgeColor: string;
  faceColor: string;
  faceOpacity: number;
  /** Extra transform placed before the face layout (stack offsets). */
  transform?: string;
  /** Dim factor for books sitting behind the front one (0–1). */
  dim?: number;
};

function BookBox({
  title,
  author,
  footer,
  cover,
  width,
  height,
  depth,
  radius,
  variant,
  spineColor,
  pageColor,
  edgeColor,
  faceColor,
  faceOpacity,
  transform,
  dim = 1,
}: BookBoxProps) {
  const wire = variant === "wireframe";
  const half = depth / 2;

  // Faces are centered on the wrapper, then rotated + pushed out by half the
  // perpendicular dimension — the canonical CSS cuboid.
  const faceBase: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
  };

  const wireFace: React.CSSProperties = wire
    ? {
        background:
          faceColor === "transparent"
            ? "transparent"
            : `color-mix(in srgb, ${faceColor} ${faceOpacity * 100}%, transparent)`,
        border: `1px solid ${edgeColor}`,
        boxSizing: "border-box",
      }
    : {};

  // Solid-only surface fills (undefined in wireframe so wireFace shows through).
  const spineFill = wire
    ? undefined
    : `linear-gradient(to right, rgba(0,0,0,0.35), rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.25)), ${spineColor}`;
  const headFill = wire
    ? "repeating-linear-gradient(45deg, transparent 0 5px, color-mix(in srgb, var(--wire-edge) 22%, transparent) 5px 6px)"
    : pageTexture(pageColor, "to bottom");

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width,
        height,
        transformStyle: "preserve-3d",
        transform: `translate(-50%, -50%)${transform ? ` ${transform}` : ""}`,
        opacity: dim,
      }}
    >
      {/* Front cover */}
      <div
        style={{
          ...faceBase,
          width,
          height,
          overflow: "hidden",
          borderRadius: wire ? 0 : radius,
          transform: `translate(-50%, -50%) translateZ(${half}px)`,
          boxShadow:
            wire || cover.kind === "image"
              ? undefined
              : "inset 0 0 0 1px rgba(255,255,255,0.04), 0 1px 0 rgba(255,255,255,0.05)",
          ...wireFace,
        }}
      >
        <CoverFace
          author={author}
          cover={cover}
          edgeColor={edgeColor}
          footer={footer}
          radius={radius}
          title={title}
          width={width}
          wire={wire}
        />
      </div>

      {/* Back */}
      <div
        style={{
          ...faceBase,
          width,
          height,
          borderRadius: wire ? 0 : radius,
          background: wire ? undefined : spineColor,
          transform: `translate(-50%, -50%) rotateY(180deg) translateZ(${half}px)`,
          ...wireFace,
        }}
      />

      {/* Spine (left) */}
      <div
        style={{
          ...faceBase,
          width: depth,
          height,
          background: spineFill,
          transform: `translate(-50%, -50%) rotateY(-90deg) translateZ(${width / 2}px)`,
          ...wireFace,
        }}
      />

      {/* Fore-edge / pages (right) */}
      <div
        style={{
          ...faceBase,
          width: depth,
          height,
          background: wire ? undefined : pageTexture(pageColor, "to right"),
          transform: `translate(-50%, -50%) rotateY(90deg) translateZ(${width / 2}px)`,
          ...wireFace,
        }}
      />

      {/* Head (top) */}
      <div
        style={{
          ...faceBase,
          ...(wire
            ? ({ "--wire-edge": edgeColor } as React.CSSProperties)
            : {}),
          width,
          height: depth,
          background: headFill,
          transform: `translate(-50%, -50%) rotateX(90deg) translateZ(${height / 2}px)`,
          ...wireFace,
        }}
      />

      {/* Tail (bottom) */}
      <div
        style={{
          ...faceBase,
          width,
          height: depth,
          background: wire ? undefined : pageTexture(pageColor, "to bottom"),
          transform: `translate(-50%, -50%) rotateX(-90deg) translateZ(${height / 2}px)`,
          ...wireFace,
        }}
      />
    </div>
  );
}

// --- Public: single book ----------------------------------------------------

export function BookCover({
  title,
  author,
  footer,
  cover = DEFAULT_COVER,
  width = GEOMETRY_DEFAULTS.width,
  height = GEOMETRY_DEFAULTS.height,
  depth = GEOMETRY_DEFAULTS.depth,
  rotateX = GEOMETRY_DEFAULTS.rotateX,
  rotateY = GEOMETRY_DEFAULTS.rotateY,
  rotateZ = GEOMETRY_DEFAULTS.rotateZ,
  perspective = GEOMETRY_DEFAULTS.perspective,
  radius = GEOMETRY_DEFAULTS.radius,
  variant = "solid",
  spineColor = "#12151b",
  pageColor = "#efece3",
  shadow = true,
  edgeColor = "var(--foreground)",
  faceColor = "var(--card)",
  faceOpacity = 0.72,
  background,
  hoverable = false,
  draggable = false,
  onRotateChange,
  className,
}: BookCoverProps) {
  const [hovered, setHovered] = React.useState(false);
  const { rot, active, bind } = useOrbit({
    rotateX,
    rotateY,
    draggable,
    onRotateChange,
  });

  let rx = rotateX;
  let ry = rotateY;
  if (draggable) {
    rx = rot.x;
    ry = rot.y;
  } else if (hoverable && hovered) {
    rx = rotateX * 0.45;
    ry = rotateY * 0.45;
  }

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      onMouseEnter={
        hoverable && !draggable ? () => setHovered(true) : undefined
      }
      onMouseLeave={
        hoverable && !draggable ? () => setHovered(false) : undefined
      }
      style={{
        background,
        perspective: `${perspective}px`,
        minHeight: height + depth + 80,
        cursor: grabCursor(draggable, active),
        touchAction: draggable ? "none" : undefined,
      }}
      {...bind}
    >
      <div
        className={cn(
          hoverable &&
            !draggable &&
            "transition-transform duration-500 ease-out"
        )}
        style={{
          position: "relative",
          width,
          height,
          transformStyle: "preserve-3d",
          transform: `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rotateZ}deg)`,
          willChange: "transform",
        }}
      >
        <BookBox
          author={author}
          cover={cover}
          depth={depth}
          edgeColor={edgeColor}
          faceColor={faceColor}
          faceOpacity={faceOpacity}
          footer={footer}
          height={height}
          pageColor={pageColor}
          radius={radius}
          spineColor={spineColor}
          title={title}
          variant={variant}
          width={width}
        />
      </div>

      {shadow && variant === "solid" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            bottom: 28,
            width: width * 0.92,
            height: 26,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(0,0,0,0.45), transparent)",
            filter: "blur(8px)",
            transform: `translateX(${ry * 0.6}px)`,
          }}
        />
      ) : null}
    </div>
  );
}

// --- Public: stacked group (the configurator look) --------------------------

export type BookStackProps = Omit<BookCoverProps, "hoverable"> & {
  /** Number of books in the stack (front + behind). */
  count?: number;
  /** Per-layer screen offset behind the front book. */
  offsetX?: number;
  offsetY?: number;
};

export function BookStack({
  count = 3,
  offsetX = 26,
  offsetY = -16,
  width = GEOMETRY_DEFAULTS.width,
  height = GEOMETRY_DEFAULTS.height,
  depth = GEOMETRY_DEFAULTS.depth,
  rotateX = GEOMETRY_DEFAULTS.rotateX,
  rotateY = GEOMETRY_DEFAULTS.rotateY,
  rotateZ = GEOMETRY_DEFAULTS.rotateZ,
  perspective = GEOMETRY_DEFAULTS.perspective,
  radius = GEOMETRY_DEFAULTS.radius,
  variant = "wireframe",
  title,
  author,
  footer,
  cover = DEFAULT_COVER,
  spineColor = "#12151b",
  pageColor = "#efece3",
  edgeColor = "var(--foreground)",
  faceColor = "var(--card)",
  faceOpacity = 0.72,
  background,
  draggable = false,
  onRotateChange,
  className,
}: BookStackProps) {
  const layers = Array.from({ length: Math.max(count, 1) });
  const { rot, active, bind } = useOrbit({
    rotateX,
    rotateY,
    draggable,
    onRotateChange,
  });

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{
        background,
        perspective: `${perspective}px`,
        minHeight: height + depth + 100,
        cursor: grabCursor(draggable, active),
        touchAction: draggable ? "none" : undefined,
      }}
      {...bind}
    >
      <div
        style={{
          position: "relative",
          width,
          height,
          transformStyle: "preserve-3d",
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg) rotateZ(${rotateZ}deg)`,
        }}
      >
        {layers.map((_, i) => {
          // Render back-to-front so the front book paints last.
          const fromFront = layers.length - 1 - i;
          const isFront = fromFront === 0;
          return (
            <BookBox
              author={isFront ? author : undefined}
              cover={cover}
              depth={depth}
              dim={isFront ? 1 : 0.55 - fromFront * 0.08}
              edgeColor={edgeColor}
              faceColor={faceColor}
              faceOpacity={faceOpacity}
              footer={isFront ? footer : undefined}
              height={height}
              key={i}
              pageColor={pageColor}
              radius={radius}
              spineColor={spineColor}
              title={isFront ? title : ""}
              transform={`translate3d(${-fromFront * offsetX}px, ${-fromFront * offsetY}px, ${-fromFront * (depth + 14)}px)`}
              variant={variant}
              width={width}
            />
          );
        })}
      </div>
    </div>
  );
}

// --- Public: horizontal shelf (Next.js Learn style) -------------------------

export type BookRowItem = Pick<
  BookCoverProps,
  "title" | "author" | "footer" | "cover" | "spineColor" | "pageColor"
>;

export type BookRowProps = {
  books: BookRowItem[];
  width?: number;
  height?: number;
  depth?: number;
  gap?: number;
  background?: string;
  className?: string;
};

export function BookRow({
  books,
  width = 150,
  height = 210,
  depth = 30,
  gap = 36,
  background,
  className,
}: BookRowProps) {
  return (
    <div
      className={cn("flex flex-wrap items-end", className)}
      style={{ background, gap, padding: "32px 8px" }}
    >
      {books.map((book, i) => (
        <BookCover
          author={book.author}
          cover={book.cover}
          depth={depth}
          footer={book.footer}
          height={height}
          hoverable
          key={i}
          pageColor={book.pageColor}
          rotateX={4}
          rotateY={-32}
          shadow
          spineColor={book.spineColor}
          title={book.title}
          width={width}
        />
      ))}
    </div>
  );
}
