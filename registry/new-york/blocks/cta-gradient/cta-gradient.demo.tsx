"use client";

import { CtaGradient } from "./cta-gradient";

export default function CtaGradientDemo() {
  return (
    <div className="mx-auto max-w-md">
      <CtaGradient
        bullets={[
          "Reach founders, designers, devs, and marketers",
          "Launch campaigns in minutes—not weeks",
          "Ad credits that never expire",
        ]}
        ctaHref="https://epigraphmedia.com"
        ctaLabel="Apply to Advertise"
        title="Start advertising with Epigraph today"
      />
    </div>
  );
}
