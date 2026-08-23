import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "./Icon"

import { cn } from "@/lib/utils"

export const ArrowLink = ({
  href,
  children,
  light = false,
}: {
  href: string
  children: React.ReactNode
  light?: boolean
}) => (
  <a
    href={href}
    className={cn(
      "group inline-flex h-12 items-center gap-4 px-6 text-3.5 font-[520] transition-colors duration-200",
      light ? "bg-white text-ink" : "bg-ink text-white hover:bg-ink-hover"
    )}
  >
    {children}
    <span
      className={cn(
        "grid size-7 place-items-center border-l border-current transition-transform duration-200 group-hover:translate-x-1",
        light ? "bg-ink text-white" : "bg-brand text-ink"
      )}
    >
      <Icon icon={ArrowRight01Icon} size={15} />
    </span>
  </a>
)
