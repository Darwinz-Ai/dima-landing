import { cn } from "@/lib/utils"

export type PageSectionProps = React.ComponentProps<"section"> & {
  containerClassName?: string
}

/** Shared section rhythm and horizontal page gutters for content pages. */
export const PageSection = ({
  children,
  className,
  containerClassName,
  ...props
}: PageSectionProps) => (
  <section className={cn("py-10 max-md:py-8", className)} {...props}>
    <div className={cn("page-container", containerClassName)}>{children}</div>
  </section>
)
