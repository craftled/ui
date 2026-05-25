"use client";

import * as React from "react";

import { ControlsRail } from "@/components/controls-rail";
import { hslToHex, randomPalette } from "@/lib/random-palette";
import { cn } from "@/lib/utils";

import {
  FeaturedOgBanner,
  type FeaturedOgBannerProps,
  type OgBannerLayerLayout,
} from "./featured-og-banner";

type LayerName = "left" | "center" | "right";
type EditableLayerLayout = Required<
  Pick<
    OgBannerLayerLayout,
    "x" | "y" | "width" | "zIndex" | "opacity" | "objectPosition"
  >
>;
type LegacyLayerLayout = Partial<EditableLayerLayout> & { radius?: number };
type LegacyLayout = Partial<Record<LayerName, LegacyLayerLayout>>;

type Params = {
  background: NonNullable<FeaturedOgBannerProps["background"]>;
  backgroundImageUrl: string;
  screenshotSources: Record<LayerName, string>;
  layout: Record<LayerName, EditableLayerLayout>;
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
  centerCardImageSrc: string;
  centerCardImageAlt: string;
};

const FEDICA_LAYOUT: Params["layout"] = {
  left: {
    x: 20,
    y: 150,
    width: 480,
    zIndex: 1,
    opacity: 1,
    objectPosition: "top",
  },
  center: {
    x: 188,
    y: 120,
    width: 1024,
    zIndex: 30,
    opacity: 1,
    objectPosition: "bottom",
  },
  right: {
    x: 900,
    y: 150,
    width: 480,
    zIndex: 1,
    opacity: 1,
    objectPosition: "top",
  },
};

const STACKED_LAYOUT: Params["layout"] = {
  left: {
    x: 74,
    y: 184,
    width: 520,
    zIndex: 2,
    opacity: 0.72,
    objectPosition: "top",
  },
  center: {
    x: 188,
    y: 108,
    width: 1024,
    zIndex: 30,
    opacity: 1,
    objectPosition: "bottom",
  },
  right: {
    x: 806,
    y: 184,
    width: 520,
    zIndex: 2,
    opacity: 0.72,
    objectPosition: "top",
  },
};

const EMPTY_SCREENSHOT_SOURCES: Params["screenshotSources"] = {
  left: "",
  center: "",
  right: "",
};

const PRESETS: Record<string, Params> = {
  Default: {
    background: "mesh",
    backgroundImageUrl: "",
    screenshotSources: EMPTY_SCREENSHOT_SOURCES,
    layout: FEDICA_LAYOUT,
    colors: ["#fff2a8", "#a7f3d0", "#1ae8fa", "#c78bfd"],
    positions: 42,
    mixing: 0.88,
    rotation: 300,
    strokeFrom: "#1AE8FA",
    strokeTo: "#C78BFD",
    strokeWidth: 10,
    strokeOpacity: 0.24,
    frameRadius: 16,
    backdropBlur: 16,
    fadeHeight: 0.55,
    centerCardImageSrc: "",
    centerCardImageAlt: "Product screenshot preview",
  },
  "Fedica-like": {
    background: "mesh",
    backgroundImageUrl: "",
    screenshotSources: EMPTY_SCREENSHOT_SOURCES,
    layout: FEDICA_LAYOUT,
    colors: ["#fff2a8", "#a7f3d0", "#1ae8fa", "#c78bfd"],
    positions: 42,
    mixing: 0.88,
    rotation: 300,
    strokeFrom: "#1AE8FA",
    strokeTo: "#C78BFD",
    strokeWidth: 10,
    strokeOpacity: 0.24,
    frameRadius: 16,
    backdropBlur: 16,
    fadeHeight: 0.55,
    centerCardImageSrc: "",
    centerCardImageAlt: "Product screenshot preview",
  },
  Midnight: {
    background: "mesh",
    backgroundImageUrl: "",
    screenshotSources: EMPTY_SCREENSHOT_SOURCES,
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
    centerCardImageSrc: "",
    centerCardImageAlt: "Product screenshot preview",
  },
  Warm: {
    background: "mesh",
    backgroundImageUrl: "",
    screenshotSources: EMPTY_SCREENSHOT_SOURCES,
    layout: {
      left: { ...FEDICA_LAYOUT.left, opacity: 0.82 },
      center: { ...FEDICA_LAYOUT.center, y: 104 },
      right: { ...FEDICA_LAYOUT.right, opacity: 0.82 },
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
    centerCardImageSrc: "",
    centerCardImageAlt: "Product screenshot preview",
  },
};

const LOCAL_TEMPLATES_STORAGE_KEY = "featured-og-banner-templates";

function cloneParams(params: Params): Params {
  return {
    ...params,
    colors: [...params.colors],
    screenshotSources: { ...params.screenshotSources },
    layout: {
      left: { ...params.layout.left },
      center: { ...params.layout.center },
      right: { ...params.layout.right },
    },
  };
}

function normalizeBackground(
  background: Partial<Params>["background"],
  fallback: Params["background"]
): Params["background"] {
  if (
    background === "image" ||
    background === "none" ||
    background === "mesh"
  ) {
    return background;
  }

  return fallback;
}

function normalizeColors(
  colors: Partial<Params>["colors"],
  fallback: Params["colors"]
) {
  if (Array.isArray(colors) && colors.length > 0) {
    return colors.map(String).slice(0, 10);
  }

  return [...fallback];
}

function normalizeScreenshotSources(
  sources: Partial<Params>["screenshotSources"]
): Params["screenshotSources"] {
  return {
    left: String(sources?.left ?? ""),
    center: String(sources?.center ?? ""),
    right: String(sources?.right ?? ""),
  };
}

function normalizeFrameRadius(
  candidate: Partial<Params>,
  layout: LegacyLayout,
  fallback: Params
) {
  if (Number.isFinite(candidate.frameRadius)) {
    return Number(candidate.frameRadius);
  }

  if (Number.isFinite(layout.center?.radius)) {
    return Number(layout.center?.radius);
  }

  return fallback.frameRadius;
}

function withoutLayerRadius(
  layout?: LegacyLayerLayout
): Partial<EditableLayerLayout> {
  if (!layout) {
    return {};
  }

  const { radius: _radius, ...rest } = layout;
  return rest;
}

function normalizeLayout(
  layout: LegacyLayout,
  fallback: Params["layout"]
): Params["layout"] {
  return {
    left: { ...fallback.left, ...withoutLayerRadius(layout.left) },
    center: { ...fallback.center, ...withoutLayerRadius(layout.center) },
    right: { ...fallback.right, ...withoutLayerRadius(layout.right) },
  };
}

function normalizeParams(value: unknown): Params | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Partial<Params>;
  const fallback = PRESETS.Default;
  const layout = (candidate.layout ?? fallback.layout) as LegacyLayout;
  const frameRadius = normalizeFrameRadius(candidate, layout, fallback);

  return {
    background: normalizeBackground(candidate.background, fallback.background),
    backgroundImageUrl: String(candidate.backgroundImageUrl ?? ""),
    layout: normalizeLayout(layout, fallback.layout),
    colors: normalizeColors(candidate.colors, fallback.colors),
    screenshotSources: normalizeScreenshotSources(candidate.screenshotSources),
    positions: Number(candidate.positions ?? fallback.positions),
    mixing: Number(candidate.mixing ?? fallback.mixing),
    rotation: Number(candidate.rotation ?? fallback.rotation),
    strokeFrom: String(candidate.strokeFrom ?? fallback.strokeFrom),
    strokeTo: String(candidate.strokeTo ?? fallback.strokeTo),
    strokeWidth: Number(candidate.strokeWidth ?? fallback.strokeWidth),
    strokeOpacity: Number(candidate.strokeOpacity ?? fallback.strokeOpacity),
    frameRadius,
    backdropBlur: Number(candidate.backdropBlur ?? fallback.backdropBlur),
    fadeHeight: Number(candidate.fadeHeight ?? fallback.fadeHeight),
    centerCardImageSrc: String(candidate.centerCardImageSrc ?? ""),
    centerCardImageAlt: String(
      candidate.centerCardImageAlt ?? fallback.centerCardImageAlt
    ),
  };
}

function formatTemplate(params: Params) {
  return JSON.stringify(params, null, 2);
}

function randomParams(): Params {
  const frameRadius = 8 + Math.floor(Math.random() * 18);

  return {
    background: "mesh",
    backgroundImageUrl: "",
    screenshotSources: EMPTY_SCREENSHOT_SOURCES,
    layout: {
      left: {
        ...FEDICA_LAYOUT.left,
        x: 10 + Math.floor(Math.random() * 120),
        y: 130 + Math.floor(Math.random() * 90),
        opacity: 0.65 + Math.random() * 0.25,
      },
      center: {
        ...FEDICA_LAYOUT.center,
        x: 160 + Math.floor(Math.random() * 56),
        y: 96 + Math.floor(Math.random() * 54),
        width: 980 + Math.floor(Math.random() * 90),
      },
      right: {
        ...FEDICA_LAYOUT.right,
        x: 820 + Math.floor(Math.random() * 110),
        y: 130 + Math.floor(Math.random() * 90),
        opacity: 0.65 + Math.random() * 0.25,
      },
    },
    colors: randomPalette(4),
    positions: Math.floor(Math.random() * 100),
    mixing: 0.5 + Math.random() * 0.45,
    rotation: Math.floor(Math.random() * 360),
    strokeFrom: hslToHex(180 + Math.random() * 40, 90, 60),
    strokeTo: hslToHex(270 + Math.random() * 30, 70, 70),
    strokeWidth: 8 + Math.floor(Math.random() * 6),
    strokeOpacity: 0.18 + Math.random() * 0.2,
    frameRadius,
    backdropBlur: 10 + Math.floor(Math.random() * 16),
    fadeHeight: 0.45 + Math.random() * 0.2,
    centerCardImageSrc: "",
    centerCardImageAlt: "Product screenshot preview",
  };
}

export default function FeaturedOgBannerDemo() {
  const [params, setParams] = React.useState<Params>(() =>
    cloneParams(PRESETS.Default)
  );
  const [aspectRatio, setAspectRatio] = React.useState("1400/735");
  const [activeLayer, setActiveLayer] = React.useState<LayerName>("center");
  const [templateJson, setTemplateJson] = React.useState(() =>
    formatTemplate(PRESETS.Default)
  );
  const [templateStatus, setTemplateStatus] = React.useState("");
  const [templateName, setTemplateName] = React.useState("");
  const [localTemplates, setLocalTemplates] = React.useState<
    Record<string, Params>
  >({});

  React.useEffect(() => {
    setTemplateJson(formatTemplate(params));
  }, [params]);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(LOCAL_TEMPLATES_STORAGE_KEY);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      const normalized: Record<string, Params> = {};
      for (const [name, template] of Object.entries(parsed)) {
        const params = normalizeParams(template);
        if (params) {
          normalized[name] = params;
        }
      }
      setLocalTemplates(normalized);
    } catch {
      setTemplateStatus("Could not read local templates.");
    }
  }, []);

  const setColor = (idx: number, value: string) => {
    const next = [...params.colors];
    next[idx] = value;
    setParams({ ...params, colors: next });
  };

  const setLayerLayout = (
    layer: LayerName,
    patch: Partial<EditableLayerLayout>
  ) => {
    setParams({
      ...params,
      layout: {
        ...params.layout,
        [layer]: {
          ...params.layout[layer],
          ...patch,
        },
      },
    });
  };

  const setFrameRadius = (frameRadius: number) => {
    setParams((current) => ({
      ...current,
      frameRadius,
    }));
  };

  const setScreenshotSource = (layer: LayerName, src: string) => {
    setParams((current) => ({
      ...current,
      centerCardImageSrc: layer === "center" ? "" : current.centerCardImageSrc,
      screenshotSources: {
        ...current.screenshotSources,
        [layer]: src,
      },
    }));
  };

  const uploadScreenshot = (layer: LayerName, file: File | null) => {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") {
        setScreenshotSource(layer, reader.result);
        setTemplateStatus(
          `${layer[0].toUpperCase()}${layer.slice(1)} screenshot loaded.`
        );
      }
    });
    reader.addEventListener("error", () => {
      setTemplateStatus("Could not read screenshot file.");
    });
    reader.readAsDataURL(file);
  };

  const loadTemplateJson = () => {
    try {
      const parsed = JSON.parse(templateJson);
      const next = normalizeParams(parsed);
      if (!next) {
        setTemplateStatus("Template must be a JSON object.");
        return;
      }
      setParams(next);
      setTemplateStatus("Template loaded.");
    } catch {
      setTemplateStatus("Invalid JSON.");
    }
  };

  const saveLocalTemplate = () => {
    const name = templateName.trim();
    if (!name) {
      setTemplateStatus("Name the template before saving.");
      return;
    }

    const next = {
      ...localTemplates,
      [name]: cloneParams(params),
    };
    setLocalTemplates(next);
    window.localStorage.setItem(
      LOCAL_TEMPLATES_STORAGE_KEY,
      JSON.stringify(next)
    );
    setTemplateStatus(`Saved “${name}” locally.`);
  };

  const activeLayout = params.layout[activeLayer];

  return (
    <>
      <FeaturedOgBanner
        aspectRatio={aspectRatio}
        backdropBlur={params.backdropBlur}
        background={params.background}
        backgroundImageUrl={params.backgroundImageUrl || undefined}
        centerCard={{
          imageAlt: params.centerCardImageAlt || undefined,
          imageSrc: params.centerCardImageSrc || undefined,
        }}
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
        screenshotCenter={{
          alt: params.centerCardImageAlt || "Center product screenshot preview",
          src: params.screenshotSources.center || undefined,
        }}
        screenshotLeft={{
          alt: "Left product screenshot preview",
          src: params.screenshotSources.left || undefined,
        }}
        screenshotRadius={params.frameRadius}
        screenshotRight={{
          alt: "Right product screenshot preview",
          src: params.screenshotSources.right || undefined,
        }}
        strokeFrom={params.strokeFrom}
        strokeOpacity={params.strokeOpacity}
        strokeTo={params.strokeTo}
        strokeWidth={params.strokeWidth}
      />

      <ControlsRail>
        <div className="flex flex-col gap-3 text-foreground/80 text-xs">
          <div className="space-y-1.5">
            <div className="font-semibold text-foreground">Presets</div>
            <div className="grid grid-cols-2 gap-1.5">
              {Object.keys(PRESETS).map((name) => (
                <button
                  className="rounded-md border border-border px-2 py-1.5 transition-colors hover:bg-muted"
                  key={name}
                  onClick={() => setParams(cloneParams(PRESETS[name]))}
                  type="button"
                >
                  {name}
                </button>
              ))}
            </div>
            <button
              className="mt-1 w-full rounded-md bg-foreground px-2 py-1.5 font-medium text-background transition-colors hover:bg-foreground/90"
              onClick={() => setParams(randomParams())}
              type="button"
            >
              Randomize
            </button>
          </div>

          <div className="space-y-2 border-border border-t pt-3">
            <div>
              <div className="font-semibold text-foreground">Layout editor</div>
              <p className="text-muted-foreground">
                Design-space controls use the 1400×735 canvas. Frame radius is
                shared below.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {(["left", "center", "right"] as const).map((layer) => (
                <button
                  className={cn(
                    "rounded-md border px-2 py-1.5 capitalize transition-colors",
                    activeLayer === layer
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:bg-muted"
                  )}
                  key={layer}
                  onClick={() => setActiveLayer(layer)}
                  type="button"
                >
                  {layer}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <NumberField
                label="X (design px)"
                max={1400}
                onChange={(v) => setLayerLayout(activeLayer, { x: v })}
                value={activeLayout.x}
              />
              <NumberField
                label="Y (design px)"
                max={735}
                onChange={(v) => setLayerLayout(activeLayer, { y: v })}
                value={activeLayout.y}
              />
              <NumberField
                label="Width (design px)"
                max={1400}
                min={120}
                onChange={(v) => setLayerLayout(activeLayer, { width: v })}
                value={activeLayout.width}
              />
              <NumberField
                label="Opacity"
                max={1}
                min={0}
                onChange={(v) => setLayerLayout(activeLayer, { opacity: v })}
                step={0.05}
                value={activeLayout.opacity}
              />
              <NumberField
                label="zIndex"
                max={60}
                onChange={(v) => setLayerLayout(activeLayer, { zIndex: v })}
                value={activeLayout.zIndex}
              />
            </div>
            <TextField
              label="Object position"
              onChange={(v) =>
                setLayerLayout(activeLayer, { objectPosition: v })
              }
              value={activeLayout.objectPosition}
            />
          </div>

          <div className="space-y-1.5">
            <div className="font-semibold text-foreground">Format</div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                className={cn(
                  "rounded-md border px-2 py-1.5 transition-colors",
                  aspectRatio === "1400/735"
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:bg-muted"
                )}
                onClick={() => setAspectRatio("1400/735")}
                type="button"
              >
                Design (1400/735)
              </button>
              <button
                className={cn(
                  "rounded-md border px-2 py-1.5 transition-colors",
                  aspectRatio === "1200/630"
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:bg-muted"
                )}
                onClick={() => setAspectRatio("1200/630")}
                type="button"
              >
                OG (1200/630)
              </button>
            </div>
          </div>

          <SelectField
            label="Background"
            onChange={(v) =>
              setParams({
                ...params,
                background: v as Params["background"],
              })
            }
            options={["mesh", "image", "none"]}
            value={params.background}
          />

          <TextField
            label="Background image URL"
            onChange={(v) => setParams({ ...params, backgroundImageUrl: v })}
            value={params.backgroundImageUrl ?? ""}
          />

          <div className="space-y-2 border-border border-t pt-3">
            <div>
              <div className="font-semibold text-foreground">Screenshots</div>
              <p className="text-muted-foreground">
                Uploads are saved as data URLs in the template JSON.
              </p>
            </div>
            {(["left", "center", "right"] as const).map((layer) => (
              <div className="space-y-1.5" key={layer}>
                <TextField
                  label={`${layer[0].toUpperCase()}${layer.slice(1)} screenshot URL`}
                  onChange={(v) => setScreenshotSource(layer, v)}
                  value={params.screenshotSources[layer] ?? ""}
                />
                <FileField
                  label={`Upload ${layer} screenshot`}
                  onChange={(file) => uploadScreenshot(layer, file)}
                />
              </div>
            ))}
          </div>

          <TextField
            label="Center card override image URL"
            onChange={(v) => setParams({ ...params, centerCardImageSrc: v })}
            value={params.centerCardImageSrc ?? ""}
          />
          <TextField
            label="Center card image alt"
            onChange={(v) => setParams({ ...params, centerCardImageAlt: v })}
            value={params.centerCardImageAlt ?? ""}
          />

          <Slider
            format={(v) => `${Math.round(v)}px`}
            label="Frame radius"
            max={80}
            min={0}
            onChange={setFrameRadius}
            step={1}
            value={params.frameRadius}
          />
          <Slider
            format={(v) => `${Math.round(v)}px`}
            label="Stroke width"
            max={20}
            min={4}
            onChange={(v) => setParams({ ...params, strokeWidth: v })}
            step={1}
            value={params.strokeWidth}
          />
          <Slider
            label="Stroke opacity"
            max={1}
            onChange={(v) => setParams({ ...params, strokeOpacity: v })}
            value={params.strokeOpacity}
          />
          <Slider
            format={(v) => `${Math.round(v)}px`}
            label="Backdrop blur"
            max={40}
            min={0}
            onChange={(v) => setParams({ ...params, backdropBlur: v })}
            step={1}
            value={params.backdropBlur}
          />
          <Slider
            label="Fade height"
            max={0.85}
            min={0.2}
            onChange={(v) => setParams({ ...params, fadeHeight: v })}
            value={params.fadeHeight}
          />
          <Slider
            format={(v) => String(Math.round(v))}
            label="Mesh positions"
            max={100}
            min={0}
            onChange={(v) => setParams({ ...params, positions: v })}
            step={1}
            value={params.positions}
          />
          <Slider
            label="Mesh mixing"
            max={1}
            onChange={(v) => setParams({ ...params, mixing: v })}
            value={params.mixing}
          />
          <Slider
            format={(v) => `${Math.round(v)}°`}
            label="Mesh rotation"
            max={360}
            min={0}
            onChange={(v) => setParams({ ...params, rotation: v })}
            step={1}
            value={params.rotation}
          />

          <div className="mt-2 space-y-1.5 border-border border-t pt-3">
            <ColorField
              label="Stroke from"
              onChange={(v) => setParams({ ...params, strokeFrom: v })}
              value={params.strokeFrom}
            />
            <ColorField
              label="Stroke to"
              onChange={(v) => setParams({ ...params, strokeTo: v })}
              value={params.strokeTo}
            />
            {params.colors.map((c, i) => (
              <ColorField
                key={i}
                label={`Mesh ${i + 1}`}
                onChange={(v) => setColor(i, v)}
                value={c}
              />
            ))}
          </div>

          <div className="space-y-2 border-border border-t pt-3">
            <div>
              <div className="font-semibold text-foreground">Template JSON</div>
              <p className="text-muted-foreground">
                Copy, paste, or save the current layout locally.
              </p>
            </div>
            <textarea
              className={cn(
                "h-40 resize-y rounded-md border border-border bg-background p-2 font-mono text-[11px]",
                "focus:outline-none focus:ring-2 focus:ring-ring"
              )}
              onChange={(e) => setTemplateJson(e.target.value)}
              spellCheck={false}
              value={templateJson}
            />
            <div className="grid grid-cols-2 gap-1.5">
              <button
                className="rounded-md border border-border px-2 py-1.5 transition-colors hover:bg-muted"
                onClick={() => {
                  navigator.clipboard?.writeText(formatTemplate(params));
                  setTemplateStatus("Copied current template.");
                }}
                type="button"
              >
                Copy JSON
              </button>
              <button
                className="rounded-md bg-foreground px-2 py-1.5 font-medium text-background transition-colors hover:bg-foreground/90"
                onClick={loadTemplateJson}
                type="button"
              >
                Load JSON
              </button>
            </div>
            <div className="flex gap-1.5">
              <input
                className={cn(
                  "min-w-0 flex-1 rounded-md border border-border bg-background px-2 py-1.5",
                  "focus:outline-none focus:ring-2 focus:ring-ring"
                )}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="Template name"
                type="text"
                value={templateName}
              />
              <button
                className="rounded-md border border-border px-2 py-1.5 transition-colors hover:bg-muted"
                onClick={saveLocalTemplate}
                type="button"
              >
                Save
              </button>
            </div>
            {Object.keys(localTemplates).length > 0 ? (
              <div className="grid grid-cols-2 gap-1.5">
                {Object.keys(localTemplates).map((name) => (
                  <button
                    className="rounded-md border border-border px-2 py-1.5 transition-colors hover:bg-muted"
                    key={name}
                    onClick={() => setParams(cloneParams(localTemplates[name]))}
                    type="button"
                  >
                    {name}
                  </button>
                ))}
              </div>
            ) : null}
            {templateStatus ? (
              <p className="text-muted-foreground">{templateStatus}</p>
            ) : null}
          </div>
        </div>
      </ControlsRail>
    </>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-muted-foreground">{label}</span>
      <input
        className={cn(
          "rounded-md border border-border bg-background px-2 py-1.5 font-mono text-[11px]",
          "focus:outline-none focus:ring-2 focus:ring-ring"
        )}
        max={max}
        min={min}
        onChange={(e) => onChange(Number.parseFloat(e.target.value) || 0)}
        step={step}
        type="number"
        value={value}
      />
    </label>
  );
}

function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
  format,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  format?: (v: number) => string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-[11px]">
          {format ? format(value) : value.toFixed(2)}
        </span>
      </div>
      <input
        className="h-1 w-full cursor-pointer accent-foreground"
        max={max}
        min={min}
        onChange={(e) => onChange(Number.parseFloat(e.target.value))}
        step={step}
        type="range"
        value={value}
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-muted-foreground">{label}</span>
      <select
        className={cn(
          "rounded-md border border-border bg-background px-2 py-1.5",
          "focus:outline-none focus:ring-2 focus:ring-ring"
        )}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-muted-foreground">{label}</span>
      <input
        className={cn(
          "rounded-md border border-border bg-background px-2 py-1.5 font-mono text-[11px]",
          "focus:outline-none focus:ring-2 focus:ring-ring"
        )}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        value={value}
      />
    </label>
  );
}

function FileField({
  label,
  onChange,
}: {
  label: string;
  onChange: (file: File | null) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-muted-foreground">{label}</span>
      <input
        accept="image/*"
        className={cn(
          "rounded-md border border-border bg-background px-2 py-1.5 text-[11px]",
          "file:mr-2 file:rounded file:border-0 file:bg-muted file:px-2 file:py-1 file:text-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring"
        )}
        onChange={(e) => {
          onChange(e.currentTarget.files?.[0] ?? null);
          e.currentTarget.value = "";
        }}
        type="file"
      />
    </label>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-2">
      <input
        className="size-7 cursor-pointer rounded border border-border bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded [&::-webkit-color-swatch]:border-none"
        onChange={(e) => onChange(e.target.value)}
        type="color"
        value={value}
      />
      <div className="flex flex-1 items-center justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-[11px]">{value}</span>
      </div>
    </label>
  );
}
