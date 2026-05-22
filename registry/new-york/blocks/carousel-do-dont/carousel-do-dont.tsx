"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const TONE_CLASSES = {
  terracotta: "bg-[#B14A2A] text-white",
  orange: "bg-[#C76339] text-white",
  mustard: "bg-[#E2A845] text-stone-950",
  sage: "bg-[#BFD9B0] text-stone-950",
  mint: "bg-[#7CB682] text-stone-950",
  forest: "bg-[#4E7A45] text-white",
} as const

export type CarouselDoDontTone = keyof typeof TONE_CLASSES

export type CarouselDoDontRow = {
  leftLabel: string
  leftText: string
  rightLabel: string
  rightText: string
  tone: CarouselDoDontTone
}

export type CarouselDoDontSection = {
  title: string
  rows: CarouselDoDontRow[]
}

export type CarouselDoDontData = {
  sections: CarouselDoDontSection[]
  footer?: string
}

export type CarouselDoDontProps = {
  data: CarouselDoDontData
  onChange?: (data: CarouselDoDontData) => void
  editable?: boolean
  className?: string
}

export function CarouselDoDont({
  data,
  onChange,
  editable = false,
  className,
}: CarouselDoDontProps) {
  const update = React.useCallback(
    (mutator: (draft: CarouselDoDontData) => void) => {
      if (!onChange) return
      const draft = structuredClone(data)
      mutator(draft)
      onChange(draft)
    },
    [data, onChange]
  )

  return (
    <article
      className={cn(
        "bg-stone-50 font-serif text-stone-950 [&_strong]:font-bold",
        className
      )}
    >
      {data.sections.map((section, si) => (
        <section key={si} className="flex flex-col">
          <h2 className="px-6 pt-6 pb-4 text-4xl leading-[1.04] font-medium tracking-tight sm:text-5xl">
            <Editable
              editable={editable}
              value={section.title}
              onChange={(v) =>
                update((d) => {
                  d.sections[si].title = v
                })
              }
            />
          </h2>
          {section.rows.map((row, ri) => (
            <div
              key={ri}
              className={cn(
                "grid grid-cols-1 gap-4 px-6 py-5 sm:grid-cols-2 sm:gap-5",
                TONE_CLASSES[row.tone]
              )}
            >
              <div className="space-y-2">
                <PillLabel>
                  <Editable
                    editable={editable}
                    value={row.leftLabel}
                    onChange={(v) =>
                      update((d) => {
                        d.sections[si].rows[ri].leftLabel = v
                      })
                    }
                  />
                </PillLabel>
                <div className="rounded-sm bg-stone-900 px-3 py-2.5 font-mono text-[12px] leading-snug text-stone-100">
                  <Editable
                    multiline
                    editable={editable}
                    value={row.leftText}
                    className="block whitespace-pre-wrap"
                    onChange={(v) =>
                      update((d) => {
                        d.sections[si].rows[ri].leftText = v
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <PillLabel>
                  <Editable
                    editable={editable}
                    value={row.rightLabel}
                    onChange={(v) =>
                      update((d) => {
                        d.sections[si].rows[ri].rightLabel = v
                      })
                    }
                  />
                </PillLabel>
                <Editable
                  multiline
                  html
                  editable={editable}
                  value={row.rightText}
                  className="block text-[15px] leading-snug"
                  onChange={(v) =>
                    update((d) => {
                      d.sections[si].rows[ri].rightText = v
                    })
                  }
                />
              </div>
            </div>
          ))}
        </section>
      ))}
      {data.footer !== undefined ? (
        <footer className="px-6 py-3 text-[11px] text-stone-700">
          <Editable
            html
            editable={editable}
            value={data.footer}
            onChange={(v) =>
              update((d) => {
                d.footer = v
              })
            }
          />
        </footer>
      ) : null}
    </article>
  )
}

function PillLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block border-2 border-stone-900 bg-stone-50 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-stone-900 uppercase">
      {children}
    </span>
  )
}

type EditableProps = {
  value: string
  onChange: (v: string) => void
  editable: boolean
  multiline?: boolean
  html?: boolean
  className?: string
}

function Editable({
  value,
  onChange,
  editable,
  multiline = false,
  html = false,
  className,
}: EditableProps) {
  const ref = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    if (!editable || !ref.current) return
    const current = html ? ref.current.innerHTML : ref.current.textContent
    if (current !== value) {
      if (html) ref.current.innerHTML = value
      else ref.current.textContent = value
    }
  }, [value, html, editable])

  if (!editable) {
    return html ? (
      <span
        className={className}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    ) : (
      <span className={cn("whitespace-pre-wrap", className)}>{value}</span>
    )
  }

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      aria-multiline={multiline}
      className={cn(
        "focus-visible:ring-ring/40 rounded-sm outline-none focus-visible:ring-2",
        className
      )}
      onBlur={(e) => {
        const next = html
          ? e.currentTarget.innerHTML
          : (e.currentTarget.textContent ?? "")
        if (next !== value) onChange(next)
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          ;(e.currentTarget as HTMLElement).blur()
        }
        if (!multiline && e.key === "Enter") {
          e.preventDefault()
          ;(e.currentTarget as HTMLElement).blur()
        }
      }}
    />
  )
}
