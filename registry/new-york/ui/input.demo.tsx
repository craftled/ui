"use client";

import { AtSign, Search } from "lucide-react";

import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";

export default function InputDemo() {
  return (
    <div className="flex flex-col gap-8">
      <Group label="Basic">
        <Input placeholder="Enter text…" />
      </Group>

      <Group label="With label">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="you@example.com" type="email" />
        </div>
      </Group>

      <Group label="Inline form">
        <form
          className="flex w-full max-w-sm gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input placeholder="Enter email" type="email" />
          <Button type="submit">Subscribe</Button>
        </form>
      </Group>

      <Group label="With icon">
        <div className="relative w-full max-w-sm">
          <AtSign className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground/60" />
          <Input className="pl-9" placeholder="Email address" type="email" />
        </div>
        <div className="relative w-full max-w-sm">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground/60" />
          <Input className="pl-9" placeholder="Search…" />
        </div>
      </Group>

      <Group label="States">
        <Input placeholder="Default" />
        <Input disabled placeholder="Disabled" />
        <Input aria-invalid placeholder="Invalid" />
      </Group>

      <Group label="File">
        <Input type="file" />
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
      <div className="flex w-full max-w-sm flex-col gap-2">{children}</div>
    </div>
  );
}
