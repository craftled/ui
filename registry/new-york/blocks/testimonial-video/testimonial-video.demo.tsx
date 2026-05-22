"use client"

import { TestimonialVideo } from "./testimonial-video"

export default function TestimonialVideoDemo() {
  return (
    <div className="mx-auto max-w-sm">
      <TestimonialVideo
        image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=1200&fit=crop&q=80"
        imageAlt="Tomas Lau"
        videoHref="#"
        quote="Epigraph has become the standard way to monetize a B2B newsletter."
        author={{ name: "Tomas Lau", role: "Founder, Best Writing" }}
        brandLogo={
          <>
            <span className="flex size-5 items-center justify-center rounded-sm bg-neutral-900 text-[10px] font-bold text-white">
              E
            </span>
            <span>Epigraph</span>
          </>
        }
        clientLogo={
          <span className="text-2xl leading-none font-bold tracking-tight">
            Best Writing
          </span>
        }
      />
    </div>
  )
}
