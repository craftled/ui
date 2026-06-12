"use client";

import * as React from "react";

import { ControlsRail } from "@/components/controls-rail";
import {
  VariantPresets,
  VariantSection,
  VariantShuffle,
} from "@/components/variant-panel";
import { hslToHex, randomPalette } from "@/lib/random-palette";

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

  return (
    <>
      <FeaturedOgBanner
        aspectRatio="1400/735"
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
        <VariantSection title="Variants">
          <VariantPresets
            onSelect={(name) => setParams(cloneParams(PRESETS[name]))}
            presets={Object.keys(PRESETS)}
          />
          <VariantShuffle onClick={() => setParams(randomParams())} />
        </VariantSection>
      </ControlsRail>
    </>
  );
}
