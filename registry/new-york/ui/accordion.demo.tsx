"use client";

import type * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

export default function AccordionDemo() {
  return (
    <div className="flex flex-col gap-6">
      <Group label="Single (default)">
        <Accordion
          className="w-full max-w-md"
          collapsible
          defaultValue="install"
          type="single"
        >
          <AccordionItem value="install">
            <AccordionTrigger>How do I install a component?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Run{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                bunx shadcn@latest add
                https://ui.craftled.com/r/&lt;name&gt;.json
              </code>{" "}
              and the source lands in your repo as plain TSX you own.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="tailwind">
            <AccordionTrigger>Does it need Tailwind v4?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes. Tailwind v4 with the shadcn CLI initialized. Tokens use the
              new CSS-first format (oklch, container queries, custom variants).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="license">
            <AccordionTrigger>What's the license?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              MIT. Use it for anything — personal, commercial, client work, your
              own component library.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Group>

      <Group label="Multiple (multiple can be open)">
        <Accordion className="w-full max-w-md" type="multiple">
          <AccordionItem value="primitives">
            <AccordionTrigger>Primitives</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              11 atomic components — Button, Card, Chart, Dialog, Dropdown Menu,
              Input, Label, Separator, Skeleton, Tabs, Tooltip.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="blocks">
            <AccordionTrigger>Blocks</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              22 production blocks — dashboards, charts, CTAs, paper-design
              shaders, testimonials, carousels.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Group>
    </div>
  );
}

function Group({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        {label}
      </span>
      <div className="flex flex-wrap items-start gap-2">{children}</div>
    </div>
  );
}
