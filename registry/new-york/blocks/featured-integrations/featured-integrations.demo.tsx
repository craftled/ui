"use client";

import type * as React from "react";

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

const SHARED_PROPS = {
  label: "Network",
  title: (
    <>
      <span className="text-muted-foreground">Reach every</span>
      <br />
      <span className="text-foreground">audience.</span>
    </>
  ),
  description:
    "Epigraph distributes your message across our owned-and-operated B2B publications. No retargeting. No spray.",
  icons: [
    { node: <Monogram color="bg-rose-500" letter="B" />, alt: "Best Writing" },
    { node: <Monogram color="bg-cyan-500" letter="M" />, alt: "Marketful" },
    { node: <Monogram color="bg-amber-500" letter="U" />, alt: "UI Things" },
    { node: <Monogram color="bg-emerald-500" letter="X" />, alt: "UX Crush" },
    { node: <Monogram color="bg-blue-500" letter="P" />, alt: "Pynions" },
    {
      node: <Monogram color="bg-violet-500" letter="A" />,
      alt: "AI Turnpoint",
    },
  ],
};

export default function FeaturedIntegrationsDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-xl border bg-background">
        <OgFrame height={OG_HEIGHT} width={OG_WIDTH}>
          <FeaturedIntegrations {...SHARED_PROPS} />
        </OgFrame>
      </div>
      <div className="dark overflow-hidden rounded-xl border bg-background">
        <OgFrame height={OG_HEIGHT} width={OG_WIDTH}>
          <FeaturedIntegrations {...SHARED_PROPS} />
        </OgFrame>
      </div>
    </div>
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
