"use client";

import { Skeleton } from "./skeleton";

export default function SkeletonDemo() {
  return (
    <div className="flex flex-col gap-8">
      <Group label="Single line">
        <Skeleton className="h-4 w-3/4 max-w-sm" />
      </Group>

      <Group label="Stacked text">
        <div className="w-full max-w-sm space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </Group>

      <Group label="Avatar + text row">
        <div className="flex w-full max-w-sm items-center gap-3">
          <Skeleton className="size-10 shrink-0 rounded-full" />
          <div className="flex flex-1 flex-col gap-1.5">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      </Group>

      <Group label="Card placeholder">
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm">
          <Skeleton className="aspect-video w-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <div className="flex items-center gap-2 pt-2">
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </Group>

      <Group label="Stat grid">
        <div className="grid w-full max-w-md grid-cols-3 gap-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              className="flex flex-col gap-2 rounded-md border bg-card p-4 shadow-sm"
              key={i}
            >
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
          ))}
        </div>
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
      {children}
    </div>
  );
}
