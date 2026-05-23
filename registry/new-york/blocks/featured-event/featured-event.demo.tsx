"use client";

import type * as React from "react";

import { FeaturedEvent } from "./featured-event";

const OG_WIDTH = 1400;
const OG_HEIGHT = 735;

export default function FeaturedEventDemo() {
  return (
    <OgFrame height={OG_HEIGHT} width={OG_WIDTH}>
      <FeaturedEvent
        brandName="Epigraph Insider"
        eventType="Webinar"
        participants={[
          {
            name: "Sarah Chen",
            role: "Founder, Marketful",
            photo:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&q=80",
          },
          {
            name: "David Park",
            role: "Founder, Epigraph",
            photo:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80",
          },
        ]}
        title="How Sarah Chen built Marketful from zero to 50k subscribers"
      />
    </OgFrame>
  );
}

/**
 * Renders children at exact `width × height` pixel dimensions and scales them
 * down to fit the available container width. Uses CSS container queries
 * (`cqw`) so there's no JS resize listener — the canvas scales whenever the
 * frame's width changes. Right-click → screenshot the inner canvas to capture
 * a real `width × height` OG image.
 */
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
