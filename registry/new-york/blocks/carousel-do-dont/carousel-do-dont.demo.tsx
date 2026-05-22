"use client"

import * as React from "react"
import { Check, Copy, RotateCcw } from "lucide-react"

import { Button } from "@/registry/new-york/ui/button"

import { CarouselDoDont, type CarouselDoDontData } from "./carousel-do-dont"

const DEFAULT_DATA: CarouselDoDontData = {
  sections: [
    {
      title: "Stop prompting Claude like this:",
      rows: [
        {
          leftLabel: "The Prompt",
          leftText: '"Write me a LinkedIn post about AI."',
          rightLabel: "The Problem",
          rightText:
            "<strong>No context.</strong> You gave Claude nothing. You got what everyone gets. The 70th percentile. The statistical average of the entire internet. Congrats.",
          tone: "terracotta",
        },
        {
          leftLabel: "The Prompt",
          leftText:
            "Act as a world-class copywriter with 20 years of experience in B2B SaaS who studied under Ogilvy and writes like Paul Graham...",
          rightLabel: "The Problem",
          rightText:
            "<strong>Claude still has no idea who you are.</strong> Prompt libraries are a coping mechanism. I built the Prompt Maker. Used over 1M times. Stop using it.",
          tone: "orange",
        },
        {
          leftLabel: "The Prompt",
          leftText:
            '"Make it punchier."\n→ "No, more professional."\n→ "Actually, try a different tone."',
          rightLabel: "The Problem",
          rightText:
            "<strong>You can't describe what you want.</strong> So Claude keeps guessing. 12 rewrites later, you're back where you started.",
          tone: "mustard",
        },
      ],
    },
    {
      title: "Start doing this instead:",
      rows: [
        {
          leftLabel: "The Prompt",
          leftText:
            "\"I want to write a LinkedIn post about the AI tools I use daily. Don't start yet. Ask me clarifying questions first, so we align on angle, tone, and audience.\"",
          rightLabel: "The Power",
          rightText:
            "Everything changes here. You stopped guessing. <strong>You let Claude ask you.</strong> The first draft is already 3× better. Because Claude forced you to be clear.",
          tone: "sage",
        },
        {
          leftLabel: "The Prompt",
          leftText:
            '[ABOUT ME.md + ANTI AI WRITING STYLE.md + COPYWRITING.md uploaded]\n"I want to write a LinkedIn post about AI tools I use daily. First, read the uploaded files completely. DO NOT start executing yet. Ask me clarifying questions so we can refine together step by step."',
          rightLabel: "The Power",
          rightText:
            "<strong>Claude now knows your voice, your standards, your audience.</strong> The things you'd never say. The things you'd never sound like. 80% of taste is what you reject. You put your rejections in a file. Now Claude has your operating system.",
          tone: "mint",
        },
        {
          leftLabel: "The Prompt",
          leftText:
            "Doesn't write prompts anymore. Uses Cowork. Context files auto-loaded in a folder. Plugins installed. Connectors plugged in. Claude asks the questions. Claude builds the files. They steer.",
          rightLabel: "The Power",
          rightText:
            "<strong>You stopped prompting altogether and started operating.</strong> Claude isn't just a chatbot; it's part of the workflow. Your taste, your scars, your refusals — all in text files that compound with every conversation.",
          tone: "forest",
        },
      ],
    },
  ],
  footer:
    'to download more infographics, go to <strong>how-to-ai.guide</strong> · from <strong>Ruben Hassid</strong>, on <em>"How to AI"</em>',
}

export default function CarouselDoDontDemo() {
  const [data, setData] = React.useState<CarouselDoDontData>(DEFAULT_DATA)
  const [copied, setCopied] = React.useState(false)

  const copyJson = async () => {
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-muted-foreground mr-auto text-sm">
          Click any text to edit. ⌘B for bold, Esc to commit.
        </p>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setData(DEFAULT_DATA)}
        >
          <RotateCcw />
          Reset
        </Button>
        <Button size="sm" variant="outline" onClick={copyJson}>
          {copied ? <Check /> : <Copy />}
          {copied ? "Copied" : "Copy JSON"}
        </Button>
      </div>
      <div className="overflow-hidden rounded-md border">
        <CarouselDoDont editable data={data} onChange={setData} />
      </div>
    </div>
  )
}
