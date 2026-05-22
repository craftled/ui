"use client"

import { FeaturedHalftone } from "./featured-halftone"

export default function FeaturedHalftoneDemo() {
  return (
    <div className="mx-auto max-w-md">
      <FeaturedHalftone
        image="https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=900&h=900&fit=crop&q=80"
        imageAlt="Citrus"
        title="Autumn Vibes"
        titleClassName="text-stone-900"
        dotSize={5}
        dotIntensity={0.55}
      />
    </div>
  )
}
