"use client";

import { Check, Copy, RotateCcw } from "lucide-react";
import * as React from "react";

import { Button } from "@/registry/new-york/ui/button";

import { CarouselDoDont, type CarouselDoDontData } from "./carousel-do-dont";

const DEFAULT_DATA: CarouselDoDontData = {
  sections: [
    {
      title: "Stop advertising like this:",
      rows: [
        {
          leftLabel: "The Spend",
          leftText: '"Blast Meta ads at everyone 18–65 with a credit card."',
          rightLabel: "The Problem",
          rightText:
            "<strong>No signal.</strong> You're paying to interrupt people who never asked to hear from you. Your CAC climbs every quarter. Welcome to the bidding war.",
          tone: "terracotta",
        },
        {
          leftLabel: "The Spend",
          leftText:
            '"$50k programmatic display buy on a major news site, run-of-network."',
          rightLabel: "The Problem",
          rightText:
            "<strong>You bought a billboard on a highway</strong> and hoped the right cars drove past. Display CTRs hover around 0.05%. You called it a strategy.",
          tone: "orange",
        },
        {
          leftLabel: "The Spend",
          leftText:
            '"Sponsor a B2B influencer carousel — 200k followers, surely some of them are buyers."',
          rightLabel: "The Problem",
          rightText:
            "<strong>Vanity reach.</strong> The followers aren't your buyers. The post will trend. Your pipeline won't move. You're paying for someone else's audience, not yours.",
          tone: "mustard",
        },
      ],
    },
    {
      title: "Start advertising like this instead:",
      rows: [
        {
          leftLabel: "The Spend",
          leftText:
            "Sponsor a niche newsletter read by 8,000 senior developers.",
          rightLabel: "The Power",
          rightText:
            "Small list. Right list. <strong>The audience opted in because they trust the publisher.</strong> Your message lands in a context they actually care about.",
          tone: "sage",
        },
        {
          leftLabel: "The Spend",
          leftText:
            "Place across a curated network of B2B publications — devs, designers, founders, marketers.",
          rightLabel: "The Power",
          rightText:
            "<strong>One application, dozens of relevant audiences.</strong> Founders read founder pubs. Designers read design pubs. Your spend follows your buyer.",
          tone: "mint",
        },
        {
          leftLabel: "The Spend",
          leftText:
            "Set audience, budget, creative. Fund the account once. Let the network deliver.",
          rightLabel: "The Power",
          rightText:
            "<strong>Self-serve, transparent, no expiring credits.</strong> You stopped chasing impressions and started buying intent — from people who chose to be there.",
          tone: "forest",
        },
      ],
    },
  ],
  footer:
    "more components at <strong>ui.craftled.com</strong> · made by <strong>Craftled</strong>",
};

export default function CarouselDoDontDemo() {
  const [data, setData] = React.useState<CarouselDoDontData>(DEFAULT_DATA);
  const [copied, setCopied] = React.useState(false);

  const copyJson = async () => {
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <p className="mr-auto text-muted-foreground text-sm">
          Click any text to edit. ⌘B for bold, Esc to commit.
        </p>
        <Button
          onClick={() => setData(DEFAULT_DATA)}
          size="sm"
          variant="outline"
        >
          <RotateCcw />
          Reset
        </Button>
        <Button onClick={copyJson} size="sm" variant="outline">
          {copied ? <Check /> : <Copy />}
          {copied ? "Copied" : "Copy JSON"}
        </Button>
      </div>
      <div className="overflow-hidden rounded-md border">
        <CarouselDoDont data={data} editable onChange={setData} />
      </div>
    </div>
  );
}
