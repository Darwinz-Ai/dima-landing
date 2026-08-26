import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "./Icon"

import { cn } from "@/lib/utils"
import { useLocale } from "next-intl"

export const ArrowLink = ({
  href,
  children,
  light = false,
}: {
  href: string
  children: React.ReactNode
  light?: boolean
}) => {
  const locale = useLocale()
  const isRTL = locale === "ar"

  return (
    <a
      href={href}
      className={cn(
        "group inline-flex h-12 items-center gap-4 px-6 text-3.5 font-[520] transition-colors duration-200 rounded-full",
        light ? "bg-white text-ink" : "bg-ink text-white hover:bg-ink-hover"
      )}
    >
      {children}
      <span
        className={cn(
          "grid size-7 place-items-center border-s border-current transition-transform duration-200 rounded-full",
          light ? "bg-ink text-white" : "bg-brand text-ink",
          isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
        )}
      >
        <Icon icon={ArrowRight01Icon} size={15} />
      </span>
    </a>

  )
}
