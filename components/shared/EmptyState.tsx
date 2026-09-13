import { cn } from "@/lib/utils"

const HEADING_TAGS = {
  2: "h2",
  3: "h3",
  4: "h4",
} as const

export type EmptyStateProps = Omit<React.ComponentProps<"div">, "title"> & {
  title: React.ReactNode
  description?: React.ReactNode
  headingLevel?: keyof typeof HEADING_TAGS
}

/** Compact empty state for cards and content regions. */
export const EmptyState = ({
  title,
  description,
  headingLevel = 2,
  className,
  ...props
}: EmptyStateProps) => {
  const Heading = HEADING_TAGS[headingLevel]

  return (
    <div
      className={cn(
        "grid place-items-center border border-line bg-white p-7 text-center",
        className
      )}
      {...props}
    >
      <div>
        <Heading className="text-7 font-[520] tracking-tight">{title}</Heading>
        {description ? (
          <p className="mt-3 text-3.5 text-copy">{description}</p>
        ) : null}
      </div>
    </div>
  )
}
