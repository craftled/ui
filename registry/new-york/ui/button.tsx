import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: cn(
          "bg-primary text-primary-foreground",
          "border-[0.5px] border-white/25 shadow-md shadow-black/20",
          "ring-1 ring-(--ring-color) [--ring-color:color-mix(in_oklab,var(--color-foreground)_15%,var(--color-primary))]",
          "not-in-data-[theme=dark]:text-shadow-sm [&_svg]:drop-shadow-sm",
          "hover:bg-primary/90"
        ),
        destructive: cn(
          "bg-destructive text-white",
          "border-[0.5px] border-white/25 shadow-md shadow-black/20",
          "ring-1 ring-(--ring-color) [--ring-color:color-mix(in_oklab,var(--color-foreground)_15%,var(--color-destructive))]",
          "not-in-data-[theme=dark]:text-shadow-sm [&_svg]:drop-shadow-sm",
          "hover:bg-destructive/90",
          "focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40"
        ),
        outline: cn(
          "border border-transparent bg-background shadow-sm shadow-black/15",
          "ring-1 ring-foreground/10 duration-200",
          "hover:bg-muted/50 dark:ring-foreground/15 dark:hover:bg-muted/50"
        ),
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
