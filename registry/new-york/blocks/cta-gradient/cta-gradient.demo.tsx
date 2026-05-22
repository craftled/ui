"use client"

import { CtaGradient } from "./cta-gradient"

export default function CtaGradientDemo() {
  return (
    <div className="mx-auto max-w-md">
      <CtaGradient
        title="Start advertising with Epigraph today"
        bullets={[
          "Reach founders, designers, devs, and marketers",
          "Launch campaigns in minutes—not weeks",
          "Ad credits that never expire",
        ]}
        ctaLabel="Apply to Advertise"
        ctaHref="https://epigraphmedia.com"
      />
    </div>
  )
}
