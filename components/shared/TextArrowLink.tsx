import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "./Icon"

import { cn } from "@/lib/utils"

export const TextArrowLink = ({
  href,
  children,
  className = "",
  iconSize = 17,
}: {
  href: string
  children: React.ReactNode
  className?: string
  iconSize?: number
}) => (
  <a
    href={href}
    className={cn("group inline-flex items-center font-medium", className)}
  >
    {children}
    <Icon
      className="transition-transform duration-200 group-hover:translate-x-1"
      icon={ArrowRight01Icon}
      size={iconSize}
    />
  </a>
)
