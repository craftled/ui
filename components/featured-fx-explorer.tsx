"use client";

import { Download } from "lucide-react";
import * as React from "react";

import { ControlsRail } from "@/components/controls-rail";
import {
  PreviewCodeTabs,
  type SourceFile,
} from "@/components/preview-code-tabs";
import {
  VariantChoice,
  VariantColor,
  VariantColorList,
  VariantContent,
  VariantImageDrop,
  VariantNote,
  VariantPresets,
  VariantSection,
  VariantSelect,
  VariantShuffle,
  VariantSlider,
  VariantToggle,
} from "@/components/variant-panel";
import { useDemoAccentSwatches } from "@/lib/demo-accent-swatches";
import {
  FEATURED_FX_EFFECTS,
  FX_POSITION_GRID,
  type FxContent,
  type FxControl,
  type FxParams,
  getFxEffect,
  type ImageTransform,
} from "@/lib/featured-fx";
import { cn } from "@/lib/utils";
import { TITLE_SIZE_PX, titleSizeTierFromPx } from "@/lib/variant-tiers";
import { Button } from "@/registry/new-york/ui/button";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=1400&h=800&fit=crop&q=80";

const DEFAULT_TRANSFORM: ImageTransform = { scale: 1, offsetX: 0, offsetY: 0 };

const EFFECT_OPTIONS = FEATURED_FX_EFFECTS.map((effect) => ({
  value: effect.id,
  label: effect.label,
}));

const EXPORT_WIDTH = 1400;
const EXPORT_HEIGHT = 735;

// Keeping the WebGL backbuffer readable is what lets us rasterize the canvas
// to PNG/JPG; without it `toDataURL` comes back blank.
const EXPORT_WEBGL: WebGLContextAttributes = { preserveDrawingBuffer: true };

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 3;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/** Maps one per-effect control descriptor onto the matching panel primitive. */
function FxParamControl({
  control,
  value,
  onChange,
}: {
  control: FxControl;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}) {
  switch (control.kind) {
    case "choice":
      return (
        <VariantChoice
          columns={control.options.length > 4 ? 3 : 2}
          label={control.label}
          onChange={(v) => onChange(control.key, v)}
          options={control.options}
          value={value as string}
        />
      );
    case "slider":
      return (
        <VariantSlider
          label={control.label}
          max={control.max}
          min={control.min}
          onChange={(v) => onChange(control.key, v)}
          step={control.step}
          value={(value as number) ?? control.min}
        />
      );
    case "toggle":
      return (
        <VariantToggle
          label={control.label}
          onChange={(v) => onChange(control.key, v)}
          value={Boolean(value)}
        />
      );
    case "color":
      return (
        <VariantColor
          label={control.label}
          onChange={(v) => onChange(control.key, v)}
          value={(value as string) ?? "#000000"}
        />
      );
    case "colorList":
      return (
        <VariantColorList
          label={control.label}
          max={control.max}
          onChange={(v) => onChange(control.key, v)}
          value={(value as string[]) ?? []}
        />
      );
    default:
      return null;
  }
}

/**
 * One featured image, every shader effect, at OG proportions. The image, its
 * pan/zoom, and the title overlay are shared state that survive switching
 * effects; presets/shuffle/controls drive only the active effect's look.
 * `filesByEffect` / `installByEffect` come from the server (built registry
 * JSON) so the Code tab and install command track the selected effect.
 */
export function FeaturedFxExplorer({
  filesByEffect,
  installByEffect,
}: {
  filesByEffect: Record<string, SourceFile[]>;
  installByEffect: Record<string, string>;
}) {
  const [effectId, setEffectId] = React.useState(FEATURED_FX_EFFECTS[0].id);
  const [params, setParams] = React.useState<FxParams>(() =>
    getFxEffect(effectId).getPreset(getFxEffect(effectId).defaultPreset)
  );
  const [image, setImage] = React.useState(DEFAULT_IMAGE);
  const [imageTransform, setImageTransform] =
    React.useState<ImageTransform>(DEFAULT_TRANSFORM);
  const [content, setContent] = React.useState<FxContent>({
    titleText: "Featured",
    titlePosition: "bottom-left",
    titleSize: 30,
    titleColor: getFxEffect(effectId).defaultTitleColor,
  });
  const [exporting, setExporting] = React.useState(false);
  const [dragOver, setDragOver] = React.useState(false);

  const previewRef = React.useRef<HTMLDivElement>(null);
  const dragOrigin = React.useRef<{ x: number; y: number } | null>(null);
  const effect = getFxEffect(effectId);
  const interactive = effect.takesImage;

  // Release the dropped image's object URL when it changes or on unmount.
  React.useEffect(() => {
    if (!image.startsWith("blob:")) {
      return;
    }
    return () => URL.revokeObjectURL(image);
  }, [image]);

  // Scroll / pinch over the preview zooms the image. Bound natively so we can
  // preventDefault (React's onWheel is passive and can't stop page scroll).
  React.useEffect(() => {
    const node = previewRef.current;
    if (!(node && interactive)) {
      return;
    }
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      // Pinch gestures arrive as ctrl+wheel with small deltas — boost those.
      const intensity = event.ctrlKey ? 0.01 : 0.0015;
      setImageTransform((t) => ({
        ...t,
        scale: clamp(
          t.scale * (1 - event.deltaY * intensity),
          ZOOM_MIN,
          ZOOM_MAX
        ),
      }));
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [interactive]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) {
      return;
    }
    dragOrigin.current = { x: event.clientX, y: event.clientY };
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Some browsers reject capture for synthetic/edge-case pointers — drag
      // still works while the pointer stays over the preview.
    }
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragOrigin.current) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - dragOrigin.current.x;
    const dy = event.clientY - dragOrigin.current.y;
    dragOrigin.current = { x: event.clientX, y: event.clientY };
    setImageTransform((t) => ({
      ...t,
      // Image follows the cursor; divide by scale so a drag covers the same
      // on-screen distance at any zoom.
      offsetX: clamp(t.offsetX + dx / (rect.width * t.scale), -1, 1),
      offsetY: clamp(t.offsetY + dy / (rect.height * t.scale), -1, 1),
    }));
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    dragOrigin.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const selectEffect = (id: string) => {
    const next = getFxEffect(id);
    setEffectId(id);
    setParams(next.getPreset(next.defaultPreset));
    // Reset title color to the new effect's legible default; keep text/layout.
    setContent((c) => ({ ...c, titleColor: next.defaultTitleColor }));
  };

  const setParam = (key: string, value: unknown) =>
    setParams((p) => ({ ...p, [key]: value }));

  const handleImage = (url: string) => {
    setImage(url);
    setImageTransform(DEFAULT_TRANSFORM);
  };

  // Native file drag-and-drop onto the preview — drop an image to replace it.
  // Pointer events handle panning; file drags (DataTransfer) load the image.
  const onFileDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    if (!(interactive && event.dataTransfer.types.includes("Files"))) {
      return;
    }
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setDragOver(true);
  };

  const onFileDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setDragOver(false);
    }
  };

  const onFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    if (!(interactive && event.dataTransfer.types.includes("Files"))) {
      return;
    }
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) {
      handleImage(URL.createObjectURL(file));
    }
  };

  // Spread the drop handlers (the keyboard-accessible path is the sidebar
  // upload button); spreading also keeps the a11y lint scoped to that control.
  const fileDropBind = interactive
    ? {
        onDragLeave: onFileDragLeave,
        onDragOver: onFileDragOver,
        onDrop: onFileDrop,
      }
    : {};

  const handleExport = async (format: "png" | "jpeg") => {
    const node = previewRef.current;
    if (!node) {
      return;
    }
    setExporting(true);
    try {
      const { toPng, toJpeg } = await import("html-to-image");
      const options = {
        canvasWidth: EXPORT_WIDTH,
        canvasHeight: EXPORT_HEIGHT,
        // Pin output to exactly 1400×735 (don't multiply by devicePixelRatio).
        pixelRatio: 1,
        cacheBust: true,
        backgroundColor: format === "jpeg" ? "#ffffff" : undefined,
      };
      const dataUrl =
        format === "png"
          ? await toPng(node, options)
          : await toJpeg(node, { ...options, quality: 0.95 });
      const link = document.createElement("a");
      link.download = `featured-${effectId}-${EXPORT_WIDTH}x${EXPORT_HEIGHT}.${
        format === "jpeg" ? "jpg" : "png"
      }`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Export failed", error);
    } finally {
      setExporting(false);
    }
  };

  const swatches = useDemoAccentSwatches(effect.swatches(params));

  return (
    <div className="flex flex-col gap-8">
      <header className="space-y-3">
        <div className="space-y-1">
          <h1 className="font-semibold text-3xl tracking-tight">
            Featured effects
          </h1>
          <p className="max-w-md text-pretty text-muted-foreground text-sm">
            One featured image, seven shader effects, at OG proportions
            (1200×630). Pick an effect, tune it, drop your own image, then
            export or install just the one you want.
          </p>
        </div>
        <pre className="w-fit overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-sm">
          {installByEffect[effectId]}
        </pre>
      </header>

      <PreviewCodeTabs
        contentClassName="p-2"
        files={filesByEffect[effectId] ?? []}
        preview={
          <div
            className={cn(
              "relative",
              interactive && "cursor-grab touch-none active:cursor-grabbing",
              dragOver && "ring-2 ring-foreground/70"
            )}
            onPointerCancel={endDrag}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            ref={previewRef}
            {...fileDropBind}
          >
            {effect.render({
              params,
              content,
              image,
              imageTransform,
              webGlContextAttributes: EXPORT_WEBGL,
            })}
            {dragOver ? (
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-background/40">
                <span className="rounded-md border bg-background px-3 py-1.5 font-medium text-foreground text-sm shadow-sm">
                  Drop image to replace
                </span>
              </div>
            ) : null}
          </div>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground text-xs">
          Export {EXPORT_WIDTH}×{EXPORT_HEIGHT} (OG image):
        </span>
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

      <ControlsRail>
        <VariantSection title="Effect">
          <VariantSelect
            onChange={selectEffect}
            options={EFFECT_OPTIONS}
            value={effectId}
          />
        </VariantSection>

        <VariantSection title="Variants">
          <VariantPresets
            onSelect={(name) => setParams(effect.getPreset(name))}
            presets={effect.presetNames}
          />
          <VariantShuffle
            onClick={() => setParams(effect.randomParams(params))}
          />
        </VariantSection>

        <VariantSection title="Adjust">
          {effect.controls.map((control) => (
            <FxParamControl
              control={control}
              key={control.key}
              onChange={setParam}
              value={params[control.key]}
            />
          ))}
        </VariantSection>

        {effect.takesImage ? (
          <VariantSection title="Image">
            <VariantImageDrop
              onChange={handleImage}
              onReset={
                image === DEFAULT_IMAGE
                  ? undefined
                  : () => handleImage(DEFAULT_IMAGE)
              }
              value={image}
            />
            <VariantNote>
              Drop an image onto the preview · drag to pan · scroll or pinch to
              zoom.
            </VariantNote>
            <VariantSlider
              label="Zoom"
              max={ZOOM_MAX}
              min={ZOOM_MIN}
              onChange={(v) => setImageTransform((t) => ({ ...t, scale: v }))}
              step={0.05}
              value={imageTransform.scale}
            />
            <VariantSlider
              label="Move X"
              max={1}
              min={-1}
              onChange={(v) => setImageTransform((t) => ({ ...t, offsetX: v }))}
              step={0.02}
              value={imageTransform.offsetX}
            />
            <VariantSlider
              label="Move Y"
              max={1}
              min={-1}
              onChange={(v) => setImageTransform((t) => ({ ...t, offsetY: v }))}
              step={0.02}
              value={imageTransform.offsetY}
            />
          </VariantSection>
        ) : null}

        <VariantContent
          accentSwatches={swatches}
          color={content.titleColor}
          onColorChange={(v) => setContent({ ...content, titleColor: v })}
          onPositionChange={(v) => setContent({ ...content, titlePosition: v })}
          onSizeTierChange={(t) =>
            setContent({ ...content, titleSize: TITLE_SIZE_PX[t] })
          }
          onTextChange={(v) => setContent({ ...content, titleText: v })}
          position={content.titlePosition}
          positions={FX_POSITION_GRID}
          sizeTier={titleSizeTierFromPx(content.titleSize)}
          text={content.titleText}
        />
      </ControlsRail>
    </div>
  );
}
