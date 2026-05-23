"use client";

import { Newspaper } from "lucide-react";

import { FeaturedStory } from "./featured-story";

export default function FeaturedStoryDemo() {
  return (
    <FeaturedStory
      brandColor="#E11D48"
      brandIcon={<Newspaper className="size-5" strokeWidth={1.75} />}
      brandLogo={
        <img
          alt="Best Writing"
          className="h-6 w-auto [filter:brightness(0)_invert(1)]"
          src="/logos/best-writing.svg"
        />
      }
      ctaLabel="Read story"
      href="#"
      image="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1600&h=900&fit=crop&q=80"
      imageAlt="Writer at desk"
      title="Best Writing reaches 30,000 paid subscribers with Epigraph"
    />
  );
}
