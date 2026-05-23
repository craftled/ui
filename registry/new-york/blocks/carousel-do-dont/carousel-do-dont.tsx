"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const TONE_CLASSES = {
  terracotta: "bg-[#B14A2A] text-white",
  orange: "bg-[#C76339] text-white",
  mustard: "bg-[#E2A845] text-stone-950",
  sage: "bg-[#BFD9B0] text-stone-950",
  mint: "bg-[#7CB682] text-stone-950",
  forest: "bg-[#4E7A45] text-white",
} as const;

export type CarouselDoDontTone = keyof typeof TONE_CLASSES;

export type CarouselDoDontRow = {
  leftLabel: string;
  leftText: string;
  rightLabel: string;
  rightText: string;
  tone: CarouselDoDontTone;
};

export type CarouselDoDontSection = {
  title: string;
  rows: CarouselDoDontRow[];
};

export type CarouselDoDontData = {
  sections: CarouselDoDontSection[];
  footer?: string;
};

export type CarouselDoDontProps = {
  data: CarouselDoDontData;
  onChange?: (data: CarouselDoDontData) => void;
  editable?: boolean;
  className?: string;
};

export function CarouselDoDont({
  data,
  onChange,
  editable = false,
  className,
}: CarouselDoDontProps) {
  const update = React.useCallback(
    (mutator: (draft: CarouselDoDontData) => void) => {
      if (!onChange) {
        return;
      }
      const draft = structuredClone(data);
      mutator(draft);
      onChange(draft);
    },
    [data, onChange]
  );

  return (
    <article
      className={cn(
        "bg-stone-50 font-serif text-stone-950 [&_strong]:font-bold",
        className
      )}
    >
      {data.sections.map((section, si) => (
        <section className="flex flex-col" key={si}>
          <h2 className="px-6 pt-6 pb-4 font-medium text-4xl leading-[1.04] tracking-tight sm:text-5xl">
            <Editable
              editable={editable}
              onChange={(v) =>
                update((d) => {
                  d.sections[si].title = v;
                })
              }
              value={section.title}
            />
          </h2>
          {section.rows.map((row, ri) => (
            <div
              className={cn(
                "grid grid-cols-1 gap-4 px-6 py-5 sm:grid-cols-2 sm:gap-5",
                TONE_CLASSES[row.tone]
              )}
              key={ri}
            >
              <div className="space-y-2">
                <PillLabel>
                  <Editable
                    editable={editable}
                    onChange={(v) =>
                      update((d) => {
                        d.sections[si].rows[ri].leftLabel = v;
                      })
                    }
                    value={row.leftLabel}
                  />
                </PillLabel>
                <div className="rounded-sm bg-stone-900 px-3 py-2.5 font-mono text-[12px] text-stone-100 leading-snug">
                  <Editable
                    className="block whitespace-pre-wrap"
                    editable={editable}
                    multiline
                    onChange={(v) =>
                      update((d) => {
                        d.sections[si].rows[ri].leftText = v;
                      })
                    }
                    value={row.leftText}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <PillLabel>
                  <Editable
                    editable={editable}
                    onChange={(v) =>
                      update((d) => {
                        d.sections[si].rows[ri].rightLabel = v;
                      })
                    }
                    value={row.rightLabel}
                  />
                </PillLabel>
                <Editable
                  className="block text-[15px] leading-snug"
                  editable={editable}
                  html
                  multiline
                  onChange={(v) =>
                    update((d) => {
                      d.sections[si].rows[ri].rightText = v;
                    })
                  }
                  value={row.rightText}
                />
              </div>
            </div>
          ))}
        </section>
      ))}
      {data.footer === undefined ? null : (
        <footer className="px-6 py-3 text-[11px] text-stone-700">
          <Editable
            editable={editable}
            html
            onChange={(v) =>
              update((d) => {
                d.footer = v;
              })
            }
            value={data.footer}
          />
        </footer>
      )}
    </article>
  );
}

function PillLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block border-2 border-stone-900 bg-stone-50 px-2 py-0.5 font-bold font-mono text-[10px] text-stone-900 uppercase tracking-wider">
      {children}
    </span>
  );
}

type EditableProps = {
  value: string;
  onChange: (v: string) => void;
  editable: boolean;
  multiline?: boolean;
  html?: boolean;
  className?: string;
};

function Editable({
  value,
  onChange,
  editable,
  multiline = false,
  html = false,
  className,
}: EditableProps) {
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (!(editable && ref.current)) {
      return;
    }
    const current = html ? ref.current.innerHTML : ref.current.textContent;
    if (current !== value) {
      if (html) {
        ref.current.innerHTML = value;
      } else {
        ref.current.textContent = value;
      }
    }
  }, [value, html, editable]);

  if (!editable) {
    return html ? (
      <span className={className} dangerouslySetInnerHTML={{ __html: value }} />
    ) : (
      <span className={cn("whitespace-pre-wrap", className)}>{value}</span>
    );
  }

  return (
    <span
      aria-multiline={multiline}
      className={cn(
        "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        className
      )}
      contentEditable
      onBlur={(e) => {
        const next = html
          ? e.currentTarget.innerHTML
          : (e.currentTarget.textContent ?? "");
        if (next !== value) {
          onChange(next);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          (e.currentTarget as HTMLElement).blur();
        }
        if (!multiline && e.key === "Enter") {
          e.preventDefault();
          (e.currentTarget as HTMLElement).blur();
        }
      }}
      ref={ref}
      role="textbox"
      suppressContentEditableWarning
    />
  );
}
