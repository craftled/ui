"use client"

import { FeaturedEvent } from "./featured-event"

export default function FeaturedEventDemo() {
  return (
    <FeaturedEvent
      brandName="Epigraph Insider"
      eventType="Webinar"
      title="How Sarah Chen built Marketful from zero to 50k subscribers"
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
    />
  )
}
