"use client"

import { FeaturedLogoSpotlight } from "./featured-logo-spotlight"

export default function FeaturedLogoSpotlightDemo() {
  return (
    <FeaturedLogoSpotlight
      title="Best Writing"
      eyebrow="In the spotlight"
      logo={
        <div className="flex size-full items-center justify-center bg-rose-500 text-4xl font-bold text-white">
          B
        </div>
      }
    />
  )
}
