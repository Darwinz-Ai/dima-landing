import { cn } from "@/lib/utils"
import { formatDate } from "../constants/helpers"
import { Icon } from "@/components/shared/Icon"
import { IconClock } from "@tabler/icons-react"
import { Clock } from "@hugeicons/core-free-icons"


export const PostMeta = ({
  // category,
  publishedAt,
  // readingTimeMinutes,
  inverted = false,
}: {
  // category: string
  publishedAt: string
  // readingTimeMinutes: number
  inverted?: boolean
}) => (
  <p
    className={cn(
      "flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm",
      inverted ? "text-white/58" : "text-copy"
    )}
  >
    {/* <span
      className={cn("font-medium", inverted ? "text-brand" : "text-brand-dark")}
    >
      {category}
    </span> */}
    {/* <span aria-hidden="true">·</span> */}
    <Icon icon={Clock} size={16} />
    <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
    {/* <span aria-hidden="true">·</span> */}
    {/* <span>{readingTimeMinutes} min read</span> */}
  </p>
)
