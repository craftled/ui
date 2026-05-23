"use client";

import { Bold, Italic, Underline } from "lucide-react";
import type * as React from "react";

import { Button } from "./button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

export default function TooltipDemo() {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-6">
        <Group label="Single">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adds a tooltip on hover or focus.</p>
            </TooltipContent>
          </Tooltip>
        </Group>

        <Group label="Toolbar">
          <div className="inline-flex items-center gap-1 rounded-md border bg-card p-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button aria-label="Bold" size="icon" variant="ghost">
                  <Bold />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bold (⌘B)</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button aria-label="Italic" size="icon" variant="ghost">
                  <Italic />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Italic (⌘I)</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button aria-label="Underline" size="icon" variant="ghost">
                  <Underline />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Underline (⌘U)</TooltipContent>
            </Tooltip>
          </div>
        </Group>

        <Group label="Sides">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Top</Button>
            </TooltipTrigger>
            <TooltipContent side="top">Top tooltip</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Right</Button>
            </TooltipTrigger>
            <TooltipContent side="right">Right tooltip</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Bottom</Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Bottom tooltip</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Left</Button>
            </TooltipTrigger>
            <TooltipContent side="left">Left tooltip</TooltipContent>
          </Tooltip>
        </Group>
      </div>
    </TooltipProvider>
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
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}
