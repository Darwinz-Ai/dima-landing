import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all duration-200 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-brand text-white shadow-sm hover:bg-brand-dark",
        secondary:
          "border-transparent bg-ui-chrome text-ink hover:bg-ui-line-soft",
        destructive:
          "border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/20 hover:border-destructive/30",

        outline:
          "border-line-strong text-copy-strong hover:border-ink hover:text-ink",
        soft:
          "border-transparent bg-soft-cyan text-brand-deep hover:bg-soft-cyan/80",
        accent:
          "border-transparent bg-accent text-ink shadow-sm hover:bg-accent/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }