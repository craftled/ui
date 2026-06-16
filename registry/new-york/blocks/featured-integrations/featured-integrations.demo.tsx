"use client";

import * as React from "react";

import { ControlsRail } from "@/components/controls-rail";
import {
  VariantChoice,
  VariantPresets,
  VariantSection,
  VariantShuffle,
  VariantSlider,
  VariantText,
} from "@/components/variant-panel";
import { randomInRange, randomItem } from "@/lib/random-palette";
import { cn } from "@/lib/utils";

import { FeaturedIntegrations } from "./featured-integrations";

const OG_WIDTH = 1400;
const OG_HEIGHT = 735;

function Monogram({ letter, color }: { letter: string; color: string }) {
  return (
    <span
      className={cn(
        "flex size-9 items-center justify-center rounded-lg font-bold text-base text-white",
        color
      )}
    >
      {letter}
    </span>
  );
}

/** Pool the orbit draws from — the icon-count control slices off the front. */
const ICON_POOL = [
  { letter: "B", color: "bg-rose-500", alt: "Best Writing" },
  { letter: "M", color: "bg-cyan-500", alt: "Marketful" },
  { letter: "U", color: "bg-amber-500", alt: "UI Things" },
  { letter: "X", color: "bg-emerald-500", alt: "UX Crush" },
  { letter: "P", color: "bg-blue-500", alt: "Pynions" },
  { letter: "A", color: "bg-violet-500", alt: "AI Turnpoint" },
  { letter: "Y", color: "bg-fuchsia-500", alt: "YouStartups" },
  { letter: "J", color: "bg-orange-500", alt: "JustPricing" },
];

type Params = {
  label: string;
  titleTop: string;
  titleBottom: string;
  description: string;
  iconCount: number;
  iconSize: number;
  circleDiameter: number;
  surface: "light" | "dark";
};

const TEXT_DEFAULTS = {
  label: "Network",
  titleTop: "Reach every",
  titleBottom: "audience.",
  description:
    "Epigraph distributes your message across our owned-and-operated B2B publications. No retargeting. No spray.",
};

const PRESETS: Record<string, Params> = {
  Network: {
    ...TEXT_DEFAULTS,
    iconCount: 6,
    iconSize: 56,
    circleDiameter: 560,
    surface: "light",
  },
  Dark: {
    ...TEXT_DEFAULTS,
    iconCount: 6,
    iconSize: 56,
    circleDiameter: 560,
    surface: "dark",
  },
  Stack: {
    label: "Integrations",
    titleTop: "One stack,",
    titleBottom: "every tool.",
    description:
      "Connect the apps your team already runs. Two-way sync, no glue code, no maintenance.",
    iconCount: 8,
    iconSize: 52,
    circleDiameter: 620,
    surface: "light",
  },
  Focused: {
    label: "Partners",
    titleTop: "A few",
    titleBottom: "that matter.",
    description: "Deep integrations with the platforms that move the needle.",
    iconCount: 4,
    iconSize: 64,
    circleDiameter: 440,
    surface: "dark",
  },
};

function randomParams(prev: Params): Params {
  return {
    label: prev.label,
    titleTop: prev.titleTop,
    titleBottom: prev.titleBottom,
    description: prev.description,
    iconCount: Math.round(randomInRange(3, 8)),
    iconSize: Math.round(randomInRange(44, 72)),
    circleDiameter: Math.round(randomInRange(440, 660)),
    surface: randomItem(["light", "dark"] as const),
  };
}

export default function FeaturedIntegrationsDemo() {
  const [params, setParams] = React.useState<Params>(PRESETS.Network);

  const set = <K extends keyof Params>(key: K, value: Params[K]) =>
    setParams((p) => ({ ...p, [key]: value }));

  const icons = ICON_POOL.slice(0, params.iconCount).map((icon) => ({
    node: <Monogram color={icon.color} letter={icon.letter} />,
    alt: icon.alt,
  }));

  const title = (
    <>
      <span className="text-muted-foreground">{params.titleTop}</span>
      <br />
      <span className="text-foreground">{params.titleBottom}</span>
    </>
  );

  return (
    <>
      <div
        className={cn(
          "overflow-hidden rounded-xl border bg-background",
          params.surface === "dark" && "dark"
        )}
      >
        <OgFrame height={OG_HEIGHT} width={OG_WIDTH}>
          <FeaturedIntegrations
            circleDiameter={params.circleDiameter}
            description={params.description}
            iconSize={params.iconSize}
            icons={icons}
            label={params.label}
            title={title}
          />
        </OgFrame>
      </div>

      <ControlsRail>
        <VariantSection title="Variants">
          <VariantPresets
            onSelect={(name) => setParams(PRESETS[name])}
            presets={Object.keys(PRESETS)}
          />
          <VariantShuffle onClick={() => setParams(randomParams(params))} />
        </VariantSection>

        <VariantSection title="Layout">
          <VariantChoice
            label="Surface"
            onChange={(v) => set("surface", v)}
            options={["light", "dark"] as const}
            value={params.surface}
          />
          <VariantSlider
            label="Icons"
            max={8}
            min={3}
            onChange={(v) => set("iconCount", v)}
            step={1}
            value={params.iconCount}
          />
          <VariantSlider
            label="Icon size"
            max={80}
            min={40}
            onChange={(v) => set("iconSize", v)}
            step={1}
            value={params.iconSize}
          />
          <VariantSlider
            label="Circle diameter"
            max={700}
            min={360}
            onChange={(v) => set("circleDiameter", v)}
            step={10}
            value={params.circleDiameter}
          />
        </VariantSection>

        <VariantSection title="Content">
          <VariantText
            label="Eyebrow"
            onChange={(v) => set("label", v)}
            placeholder="Eyebrow"
            value={params.label}
          />
          <VariantText
            label="Title — line 1 (muted)"
            onChange={(v) => set("titleTop", v)}
            placeholder="Reach every"
            value={params.titleTop}
          />
          <VariantText
            label="Title — line 2 (emphasis)"
            onChange={(v) => set("titleBottom", v)}
            placeholder="audience."
            value={params.titleBottom}
          />
          <VariantText
            label="Description"
            onChange={(v) => set("description", v)}
            placeholder="Description"
            value={params.description}
          />
        </VariantSection>
      </ControlsRail>
    </>
  );
}

function OgFrame({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="@container relative w-full overflow-hidden"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div
        className="absolute top-0 left-0"
        style={{
          width,
          height,
          transformOrigin: "top left",
          transform: `scale(calc(100cqw / ${width}px))`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
