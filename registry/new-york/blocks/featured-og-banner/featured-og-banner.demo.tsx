"use client";

import { Check, Copy, Download, RotateCcw } from "lucide-react";
import * as React from "react";

import { ControlsRail } from "@/components/controls-rail";
import {
  VariantColor,
  VariantColorList,
  VariantImageDrop,
  VariantNote,
  VariantPresets,
  VariantSection,
  VariantSelect,
  VariantShuffle,
  VariantSlider,
} from "@/components/variant-panel";
import { hslToHex, randomPalette } from "@/lib/random-palette";
import { Button } from "@/registry/new-york/ui/button";

import {
  FeaturedOgBanner,
  type FeaturedOgBannerProps,
  type OgBannerLayerLayout,
  type OgImageTransform,
  type OgLayerName,
} from "./featured-og-banner";

type EditableLayerLayout = Required<
  Pick<OgBannerLayerLayout, "x" | "y" | "width" | "zIndex" | "opacity">
>;

type ImageTransform = Required<OgImageTransform>;

type Params = {
  background: NonNullable<FeaturedOgBannerProps["background"]>;
  backgroundImageUrl: string;
  screenshotSources: Record<OgLayerName, string>;
  transforms: Record<OgLayerName, ImageTransform>;
  layout: Record<OgLayerName, EditableLayerLayout>;
  colors: string[];
  positions: number;
  mixing: number;
  rotation: number;
  strokeFrom: string;
  strokeTo: string;
  strokeWidth: number;
  strokeOpacity: number;
  frameRadius: number;
  backdropBlur: number;
  fadeHeight: number;
};

const EXPORT_WIDTH = 1400;
const EXPORT_HEIGHT = 735;
const ZOOM_MIN = 1;
const ZOOM_MAX = 3;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const LAYER_OPTIONS: readonly { value: OgLayerName; label: string }[] = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

const BACKGROUND_OPTIONS: readonly {
  value: Params["background"];
  label: string;
}[] = [
  { value: "mesh", label: "Mesh" },
  { value: "image", label: "Image" },
  { value: "none", label: "Solid" },
];

// Center-dominant: hero card in front, two browser frames peeking behind.
const HERO_LAYOUT: Params["layout"] = {
  left: { x: 20, y: 150, width: 480, zIndex: 1, opacity: 1 },
  center: { x: 188, y: 120, width: 1024, zIndex: 30, opacity: 1 },
  right: { x: 900, y: 150, width: 480, zIndex: 1, opacity: 1 },
};

const STACKED_LAYOUT: Params["layout"] = {
  left: { x: 74, y: 184, width: 520, zIndex: 2, opacity: 0.72 },
  center: { x: 188, y: 108, width: 1024, zIndex: 30, opacity: 1 },
  right: { x: 806, y: 184, width: 520, zIndex: 2, opacity: 0.72 },
};

const EMPTY_SOURCES: Params["screenshotSources"] = {
  left: "",
  center: "",
  right: "",
};

const DEFAULT_TRANSFORM: ImageTransform = { posX: 50, posY: 50, scale: 1 };

const DEFAULT_TRANSFORMS: Params["transforms"] = {
  left: { ...DEFAULT_TRANSFORM },
  center: { ...DEFAULT_TRANSFORM },
  right: { ...DEFAULT_TRANSFORM },
};

// Blue → indigo → violet → magenta → red diagonal, matching the reference hero.
const REFERENCE_STYLE = {
  colors: ["#3b82f6", "#4f46e5", "#7c3aed", "#c026d3", "#fb7185"],
  positions: 35,
  mixing: 0.6,
  rotation: 220,
  strokeFrom: "#1AE8FA",
  strokeTo: "#C78BFD",
  strokeWidth: 10,
  strokeOpacity: 0.24,
  frameRadius: 16,
  backdropBlur: 16,
  fadeHeight: 0.4,
} as const;

const PRESETS: Record<string, Params> = {
  Default: {
    background: "mesh",
    backgroundImageUrl: "",
    screenshotSources: EMPTY_SOURCES,
    transforms: DEFAULT_TRANSFORMS,
    layout: HERO_LAYOUT,
    ...REFERENCE_STYLE,
    colors: [...REFERENCE_STYLE.colors],
  },
  Stacked: {
    background: "mesh",
    backgroundImageUrl: "",
    screenshotSources: EMPTY_SOURCES,
    transforms: DEFAULT_TRANSFORMS,
    layout: STACKED_LAYOUT,
    ...REFERENCE_STYLE,
    colors: [...REFERENCE_STYLE.colors],
  },
  Midnight: {
    background: "mesh",
    backgroundImageUrl: "",
    screenshotSources: EMPTY_SOURCES,
    transforms: DEFAULT_TRANSFORMS,
    layout: STACKED_LAYOUT,
    colors: ["#0a0a0a", "#5e1de3", "#1e3a8a", "#090515"],
    positions: 55,
    mixing: 0.92,
    rotation: 270,
    strokeFrom: "#38bdf8",
    strokeTo: "#a78bfa",
    strokeWidth: 10,
    strokeOpacity: 0.28,
    frameRadius: 18,
    backdropBlur: 20,
    fadeHeight: 0.6,
  },
  Warm: {
    background: "mesh",
    backgroundImageUrl: "",
    screenshotSources: EMPTY_SOURCES,
    transforms: DEFAULT_TRANSFORMS,
    layout: {
      left: { ...HERO_LAYOUT.left, opacity: 0.82 },
      center: { ...HERO_LAYOUT.center, y: 104 },
      right: { ...HERO_LAYOUT.right, opacity: 0.82 },
    },
    colors: ["#2a0a00", "#ea580c", "#fbbf24", "#7c2d12"],
    positions: 20,
    mixing: 0.75,
    rotation: 15,
    strokeFrom: "#fbbf24",
    strokeTo: "#fb7185",
    strokeWidth: 12,
    strokeOpacity: 0.3,
    frameRadius: 22,
    backdropBlur: 12,
    fadeHeight: 0.5,
  },
};

function cloneParams(params: Params): Params {
  return {
    ...params,
    colors: [...params.colors],
    screenshotSources: { ...params.screenshotSources },
    transforms: {
      left: { ...params.transforms.left },
      center: { ...params.transforms.center },
      right: { ...params.transforms.right },
    },
    layout: {
      left: { ...params.layout.left },
      center: { ...params.layout.center },
      right: { ...params.layout.right },
    },
  };
}

function randomParams(prev: Params): Params {
  const next = cloneParams(prev);
  next.layout = {
    left: {
      ...prev.layout.left,
      x: 10 + Math.floor(Math.random() * 120),
      y: 130 + Math.floor(Math.random() * 90),
      opacity: 0.65 + Math.random() * 0.25,
    },
    center: {
      ...prev.layout.center,
      x: 160 + Math.floor(Math.random() * 56),
      y: 96 + Math.floor(Math.random() * 54),
      width: 980 + Math.floor(Math.random() * 90),
    },
    right: {
      ...prev.layout.right,
      x: 820 + Math.floor(Math.random() * 110),
      y: 130 + Math.floor(Math.random() * 90),
      opacity: 0.65 + Math.random() * 0.25,
    },
  };
  next.colors = randomPalette(4 + Math.floor(Math.random() * 2));
  next.positions = Math.floor(Math.random() * 100);
  next.mixing = 0.5 + Math.random() * 0.45;
  next.rotation = Math.floor(Math.random() * 360);
  next.strokeFrom = hslToHex(180 + Math.random() * 40, 90, 60);
  next.strokeTo = hslToHex(270 + Math.random() * 30, 70, 70);
  next.strokeWidth = 8 + Math.floor(Math.random() * 6);
  next.strokeOpacity = 0.18 + Math.random() * 0.2;
  next.frameRadius = 8 + Math.floor(Math.random() * 18);
  next.backdropBlur = 10 + Math.floor(Math.random() * 16);
  next.fadeHeight = 0.45 + Math.random() * 0.2;
  return next;
}

/** JSON payload for agents — drops session-only blob: URLs so it stays portable. */
function buildExportProps(params: Params) {
  const portable = (src: string) =>
    src && !src.startsWith("blob:") ? src : undefined;
  const screenshot = (layer: OgLayerName) => {
    const src = portable(params.screenshotSources[layer]);
    if (!src) {
      return;
    }
    const t = params.transforms[layer];
    const moved = t.posX !== 50 || t.posY !== 50 || t.scale !== 1;
    return moved ? { src, transform: t } : { src };
  };

  return {
    background: params.background,
    ...(params.background === "image"
      ? { backgroundImageUrl: portable(params.backgroundImageUrl) }
      : {}),
    ...(params.background === "mesh"
      ? {
          meshGradient: {
            colors: params.colors,
            positions: params.positions,
            mixing: params.mixing,
            rotation: params.rotation,
          },
        }
      : {}),
    layout: params.layout,
    screenshotLeft: screenshot("left"),
    screenshotCenter: screenshot("center"),
    screenshotRight: screenshot("right"),
    screenshotRadius: params.frameRadius,
    strokeFrom: params.strokeFrom,
    strokeTo: params.strokeTo,
    strokeWidth: params.strokeWidth,
    strokeOpacity: params.strokeOpacity,
    backdropBlur: params.backdropBlur,
    fadeHeight: params.fadeHeight,
  };
}

/**
 * html-to-image rasterizes via an SVG `<foreignObject>`, which Chrome refuses
 * to render when any descendant uses `backdrop-filter` — the export image fires
 * an `error` event. Strip it for the capture and return a restore fn. The glass
 * card's content sits on top of the blur, so the exported frame looks the same.
 */
function neutralizeBackdropFilter(root: HTMLElement) {
  const touched: { el: HTMLElement; bf: string; wbf: string }[] = [];
  for (const el of root.querySelectorAll<HTMLElement>("*")) {
    const value = getComputedStyle(el).backdropFilter;
    if (!value || value === "none") {
      continue;
    }
    touched.push({
      el,
      bf: el.style.getPropertyValue("backdrop-filter"),
      wbf: el.style.getPropertyValue("-webkit-backdrop-filter"),
    });
    el.style.setProperty("backdrop-filter", "none", "important");
    el.style.setProperty("-webkit-backdrop-filter", "none", "important");
  }
  return () => {
    for (const { el, bf, wbf } of touched) {
      el.style.removeProperty("backdrop-filter");
      el.style.removeProperty("-webkit-backdrop-filter");
      if (bf) {
        el.style.setProperty("backdrop-filter", bf);
      }
      if (wbf) {
        el.style.setProperty("-webkit-backdrop-filter", wbf);
      }
    }
  };
}

export default function FeaturedOgBannerDemo() {
  const [params, setParams] = React.useState<Params>(() =>
    cloneParams(PRESETS.Default)
  );
  const [activeLayer, setActiveLayer] = React.useState<OgLayerName>("center");
  const [copied, setCopied] = React.useState(false);
  const [exporting, setExporting] = React.useState(false);

  const canvasRef = React.useRef<HTMLDivElement>(null);
  // The current object URL minted per slot (blank when none). Tracked in a ref
  // so revocation never depends on possibly-stale `params` state, which would
  // leak on rapid re-upload, preset switches, or background-mode changes.
  const slotBlobs = React.useRef<Record<string, string>>({
    left: "",
    center: "",
    right: "",
    background: "",
  });

  const revokeSlot = (slot: string) => {
    const url = slotBlobs.current[slot];
    if (url) {
      URL.revokeObjectURL(url);
      slotBlobs.current[slot] = "";
    }
  };

  const trackSlot = (slot: string, url: string) => {
    const prev = slotBlobs.current[slot];
    if (prev && prev !== url) {
      URL.revokeObjectURL(prev);
    }
    slotBlobs.current[slot] = url.startsWith("blob:") ? url : "";
  };

  const revokeAllSlots = () => {
    for (const slot of Object.keys(slotBlobs.current)) {
      revokeSlot(slot);
    }
  };

  // Release every object URL we minted on unmount.
  React.useEffect(() => {
    const slots = slotBlobs.current;
    return () => {
      for (const url of Object.values(slots)) {
        if (url) {
          URL.revokeObjectURL(url);
        }
      }
    };
  }, []);

  const layer = params.layout[activeLayer];
  const transform = params.transforms[activeLayer];

  const setLayer = (patch: Partial<EditableLayerLayout>) =>
    setParams((p) => ({
      ...p,
      layout: {
        ...p.layout,
        [activeLayer]: { ...p.layout[activeLayer], ...patch },
      },
    }));

  // Drop/upload an image into a layer; reset its pan/zoom so it starts centered.
  const setLayerImage = (target: OgLayerName, url: string) => {
    trackSlot(target, url);
    setParams((p) => ({
      ...p,
      screenshotSources: { ...p.screenshotSources, [target]: url },
      transforms: { ...p.transforms, [target]: { ...DEFAULT_TRANSFORM } },
    }));
  };

  const clearLayerImage = (target: OgLayerName) => {
    revokeSlot(target);
    setParams((p) => ({
      ...p,
      screenshotSources: { ...p.screenshotSources, [target]: "" },
      transforms: { ...p.transforms, [target]: { ...DEFAULT_TRANSFORM } },
    }));
  };

  // A file dropped straight onto a frame in the canvas — select that layer and
  // load the image, reusing the per-slot revoke tracking.
  const handleImageDrop = (target: OgLayerName, file: File) => {
    setActiveLayer(target);
    setLayerImage(target, URL.createObjectURL(file));
  };

  // Pointer-drag inside a frame pans the image; the block reports deltas.
  const handleImagePan = (
    target: OgLayerName,
    delta: { dPosX: number; dPosY: number }
  ) => {
    setActiveLayer(target);
    setParams((p) => {
      const t = p.transforms[target];
      return {
        ...p,
        transforms: {
          ...p.transforms,
          [target]: {
            ...t,
            posX: clamp(t.posX + delta.dPosX, 0, 100),
            posY: clamp(t.posY + delta.dPosY, 0, 100),
          },
        },
      };
    });
  };

  const setZoom = (scale: number) =>
    setParams((p) => ({
      ...p,
      transforms: {
        ...p.transforms,
        [activeLayer]: { ...p.transforms[activeLayer], scale },
      },
    }));

  const setBackgroundImage = (url: string) => {
    trackSlot("background", url);
    setParams((p) => ({ ...p, backgroundImageUrl: url, background: "image" }));
  };

  const setBackground = (value: Params["background"]) => {
    // Leaving image mode drops the dropped background; revoke its blob (if any)
    // and clear the now-dangling URL so re-entering image mode starts fresh.
    if (value !== "image" && slotBlobs.current.background) {
      revokeSlot("background");
      setParams((p) => ({ ...p, background: value, backgroundImageUrl: "" }));
      return;
    }
    setParams((p) => ({ ...p, background: value }));
  };

  const loadPreset = (name: string) => {
    revokeAllSlots();
    setParams(cloneParams(PRESETS[name]));
  };

  const copyJson = async () => {
    await navigator.clipboard.writeText(
      JSON.stringify(buildExportProps(params), null, 2)
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleExport = async (format: "png" | "jpeg") => {
    const node = canvasRef.current;
    if (!node) {
      return;
    }
    setExporting(true);
    try {
      const { toPng, toJpeg } = await import("html-to-image");
      const options = {
        canvasWidth: EXPORT_WIDTH,
        canvasHeight: EXPORT_HEIGHT,
        pixelRatio: 1,
        // No cacheBust: it appends a query string to every resource URL, which
        // turns a dropped `blob:` image URL invalid and fails the whole export.
        backgroundColor: format === "jpeg" ? "#0f0a1d" : undefined,
      };
      // backdrop-filter breaks html-to-image; drop it only for the capture.
      const restore = neutralizeBackdropFilter(node);
      try {
        const dataUrl =
          format === "png"
            ? await toPng(node, options)
            : await toJpeg(node, { ...options, quality: 0.95 });
        const link = document.createElement("a");
        link.download = `featured-og-banner-${EXPORT_WIDTH}x${EXPORT_HEIGHT}.${
          format === "jpeg" ? "jpg" : "png"
        }`;
        link.href = dataUrl;
        link.click();
      } finally {
        restore();
      }
    } catch (error) {
      console.error("Export failed", error);
    } finally {
      setExporting(false);
    }
  };

  const reset = () => loadPreset("Default");

  return (
    <>
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <p className="mr-auto text-muted-foreground text-sm">
            Drop a screenshot onto any frame (or use the sidebar), then drag it
            to position the image inside the frame and zoom to taste — tune the
            gradient and frames, copy JSON, or export at OG size.
          </p>
          <Button onClick={reset} size="sm" variant="outline">
            <RotateCcw />
            Reset
          </Button>
          <Button onClick={copyJson} size="sm" variant="outline">
            {copied ? <Check /> : <Copy />}
            {copied ? "Copied" : "Copy JSON"}
          </Button>
          <Button
            disabled={exporting}
            onClick={() => handleExport("png")}
            size="sm"
            variant="outline"
          >
            <Download />
            PNG
          </Button>
          <Button
            disabled={exporting}
            onClick={() => handleExport("jpeg")}
            size="sm"
            variant="outline"
          >
            <Download />
            JPG
          </Button>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div ref={canvasRef}>
            <FeaturedOgBanner
              aspectRatio="1400/735"
              backdropBlur={params.backdropBlur}
              background={params.background}
              backgroundColor="#0f0a1d"
              backgroundImageUrl={params.backgroundImageUrl || undefined}
              editable
              fadeHeight={params.fadeHeight}
              layout={params.layout}
              meshGradient={{
                colors: params.colors,
                mixing: params.mixing,
                positions: params.positions,
                rotation: params.rotation,
                speed: 0,
                waveX: 0.85,
                waveXShift: 0.35,
                waveY: 0.9,
                waveYShift: 0.25,
              }}
              onImageDrop={handleImageDrop}
              onImagePan={handleImagePan}
              screenshotCenter={{
                alt: "Center product screenshot",
                src: params.screenshotSources.center || undefined,
                transform: params.transforms.center,
              }}
              screenshotLeft={{
                alt: "Left product screenshot",
                src: params.screenshotSources.left || undefined,
                transform: params.transforms.left,
              }}
              screenshotRadius={params.frameRadius}
              screenshotRight={{
                alt: "Right product screenshot",
                src: params.screenshotSources.right || undefined,
                transform: params.transforms.right,
              }}
              strokeFrom={params.strokeFrom}
              strokeOpacity={params.strokeOpacity}
              strokeTo={params.strokeTo}
              strokeWidth={params.strokeWidth}
            />
          </div>
        </div>
      </div>

      <ControlsRail>
        <VariantSection title="Variants">
          <VariantPresets
            onSelect={loadPreset}
            presets={Object.keys(PRESETS)}
          />
          <VariantShuffle onClick={() => setParams((p) => randomParams(p))} />
        </VariantSection>

        <VariantSection title="Layer">
          <VariantSelect
            columns={3}
            onChange={setActiveLayer}
            options={LAYER_OPTIONS}
            value={activeLayer}
          />
          <VariantImageDrop
            label="Screenshot"
            onChange={(url) => setLayerImage(activeLayer, url)}
            onReset={
              params.screenshotSources[activeLayer]
                ? () => clearLayerImage(activeLayer)
                : undefined
            }
            value={params.screenshotSources[activeLayer] || undefined}
          />
          <VariantSlider
            label="Zoom"
            max={ZOOM_MAX}
            min={ZOOM_MIN}
            onChange={setZoom}
            step={0.05}
            value={transform.scale}
          />
          <VariantSlider
            label="Width"
            max={1280}
            min={240}
            onChange={(value) => setLayer({ width: Math.round(value) })}
            step={1}
            value={layer.width}
          />
          <VariantSlider
            label="Opacity"
            max={1}
            min={0.2}
            onChange={(value) => setLayer({ opacity: value })}
            value={layer.opacity}
          />
          <VariantNote>
            Frames are fixed — drag the image inside a frame to position it.
          </VariantNote>
        </VariantSection>

        <VariantSection title="Background">
          <VariantSelect
            columns={3}
            onChange={setBackground}
            options={BACKGROUND_OPTIONS}
            value={params.background}
          />
          {params.background === "image" ? (
            <VariantImageDrop
              label="Background image"
              onChange={setBackgroundImage}
              value={params.backgroundImageUrl || undefined}
            />
          ) : null}
          {params.background === "mesh" ? (
            <>
              <VariantColorList
                max={8}
                onChange={(colors) => setParams((p) => ({ ...p, colors }))}
                value={params.colors}
              />
              <VariantSlider
                label="Spread"
                max={100}
                min={0}
                onChange={(value) =>
                  setParams((p) => ({ ...p, positions: Math.round(value) }))
                }
                step={1}
                value={params.positions}
              />
              <VariantSlider
                label="Blend"
                max={1}
                min={0}
                onChange={(value) =>
                  setParams((p) => ({ ...p, mixing: value }))
                }
                value={params.mixing}
              />
              <VariantSlider
                label="Rotation"
                max={360}
                min={0}
                onChange={(value) =>
                  setParams((p) => ({ ...p, rotation: Math.round(value) }))
                }
                step={1}
                value={params.rotation}
              />
            </>
          ) : null}
        </VariantSection>

        <VariantSection title="Frame">
          <VariantColor
            label="Stroke from"
            onChange={(value) =>
              setParams((p) => ({ ...p, strokeFrom: value }))
            }
            value={params.strokeFrom}
          />
          <VariantColor
            label="Stroke to"
            onChange={(value) => setParams((p) => ({ ...p, strokeTo: value }))}
            value={params.strokeTo}
          />
          <VariantSlider
            label="Stroke width"
            max={24}
            min={0}
            onChange={(value) =>
              setParams((p) => ({ ...p, strokeWidth: Math.round(value) }))
            }
            step={1}
            value={params.strokeWidth}
          />
          <VariantSlider
            label="Stroke opacity"
            max={1}
            min={0}
            onChange={(value) =>
              setParams((p) => ({ ...p, strokeOpacity: value }))
            }
            value={params.strokeOpacity}
          />
          <VariantSlider
            label="Corner radius"
            max={40}
            min={0}
            onChange={(value) =>
              setParams((p) => ({ ...p, frameRadius: Math.round(value) }))
            }
            step={1}
            value={params.frameRadius}
          />
          <VariantSlider
            label="Backdrop blur"
            max={40}
            min={0}
            onChange={(value) =>
              setParams((p) => ({ ...p, backdropBlur: Math.round(value) }))
            }
            step={1}
            value={params.backdropBlur}
          />
        </VariantSection>

        <VariantSection title="Fade">
          <VariantSlider
            label="Height"
            max={1}
            min={0}
            onChange={(value) =>
              setParams((p) => ({ ...p, fadeHeight: value }))
            }
            value={params.fadeHeight}
          />
        </VariantSection>
      </ControlsRail>
    </>
  );
}
