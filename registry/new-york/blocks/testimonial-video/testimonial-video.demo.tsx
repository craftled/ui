"use client";

import { TestimonialVideo } from "./testimonial-video";

export default function TestimonialVideoDemo() {
  return (
    <div className="mx-auto max-w-sm">
      <TestimonialVideo
        author={{ name: "Tomas Lau", role: "Founder, Best Writing" }}
        brandLogo={
          <img
            alt="Epigraph Media"
            className="h-3.5 w-auto"
            src="/logos/epigraph.svg"
          />
        }
        clientLogo={
          <img
            alt="Best Writing"
            className="h-6 w-auto [filter:brightness(0)_invert(1)]"
            src="/logos/best-writing.svg"
          />
        }
        image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=1200&fit=crop&q=80"
        imageAlt="Tomas Lau"
        quote="Epigraph has become the standard way to monetize a B2B newsletter."
        videoHref="#"
      />
    </div>
  );
}
