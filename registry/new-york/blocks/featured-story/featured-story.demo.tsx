"use client"

import { Newspaper } from "lucide-react"

import { FeaturedStory } from "./featured-story"

export default function FeaturedStoryDemo() {
  return (
    <FeaturedStory
      href="#"
      image="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1600&h=900&fit=crop&q=80"
      imageAlt="Writer at desk"
      brandColor="#E11D48"
      brandLogo={
        <img
          src="/logos/best-writing.svg"
          alt="Best Writing"
          className="h-6 w-auto [filter:brightness(0)_invert(1)]"
        />
      }
      brandIcon={<Newspaper className="size-5" strokeWidth={1.75} />}
      title="Best Writing reaches 30,000 paid subscribers with Epigraph"
      ctaLabel="Read story"
    />
  )
}
