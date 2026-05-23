"use client";

import { ArrowUpRight, MoreHorizontal } from "lucide-react";

import { Button } from "./button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

export default function CardDemo() {
  return (
    <div className="flex flex-col gap-8">
      <Group label="Basic">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Email subscribers</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-3xl tabular-nums">12,839</div>
            <p className="mt-1 text-muted-foreground text-sm">
              <span className="text-emerald-500">+428</span> vs previous period
            </p>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button className="w-full" size="sm" variant="outline">
              View report
            </Button>
          </CardFooter>
        </Card>
      </Group>

      <Group label="With action">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Best Writing</CardTitle>
            <CardDescription>9 unread articles</CardDescription>
            <CardAction>
              <Button aria-label="More" size="icon" variant="ghost">
                <MoreHorizontal />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Weekly digest from the network. Catch up on what shipped this
              week.
            </p>
          </CardContent>
        </Card>
      </Group>

      <Group label="Compact stat">
        <div className="grid w-full max-w-md grid-cols-2 gap-3">
          <Card>
            <CardHeader>
              <CardDescription>Impressions</CardDescription>
              <CardTitle className="text-2xl tabular-nums">204,318</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Clicks</CardDescription>
              <CardTitle className="text-2xl tabular-nums">12,540</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </Group>

      <Group label="With link footer">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Publishing Network</CardTitle>
            <CardDescription>
              Reach knowledge workers across 9 curated B2B publications.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <a
              className="inline-flex items-center gap-1 font-medium text-foreground text-sm hover:underline"
              href="#"
            >
              Learn more <ArrowUpRight className="size-3.5" />
            </a>
          </CardFooter>
        </Card>
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
