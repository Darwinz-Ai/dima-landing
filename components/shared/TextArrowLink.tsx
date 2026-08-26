import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "./Icon"

import { cn } from "@/lib/utils"
import { useLocale } from "next-intl"

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
}) => {
  const locale = useLocale()
  const isRTL = locale === "ar"

  return (
    <a
      href={href}
      className={cn("group inline-flex items-center font-medium", className)}
    >
      {children}
      <Icon
        className={cn(
          "transition-transform duration-200",
          isRTL
            ? "rtl-rotate group-hover:-translate-x-1 rotate-180"
            : "group-hover:translate-x-1"
        )}
        icon={ArrowRight01Icon}
        size={iconSize}
      />
    </a>
  )
}
