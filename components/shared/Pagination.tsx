import Link from "next/link"
import { Icon } from "./Icon"

import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

const getVisiblePages = (currentPage: number, totalPages: number) => {
  const visiblePages = new Set([
    1,
    totalPages,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ])

  if (currentPage <= 3) {
    visiblePages.add(2)
    visiblePages.add(3)
    visiblePages.add(4)
  }

  if (currentPage >= totalPages - 2) {
    visiblePages.add(totalPages - 1)
    visiblePages.add(totalPages - 2)
    visiblePages.add(totalPages - 3)
  }

  return [...visiblePages]
    .filter((page) => page > 0 && page <= totalPages)
    .sort((first, second) => first - second)
}

export type PaginationProps = {
  currentPage: number
  totalPages: number
  getPageHref: (page: number) => string
  ariaLabel?: string
  className?: string
}

export const Pagination = ({
  currentPage,
  totalPages,
  getPageHref,
  ariaLabel = "Pagination",
  className,
}: PaginationProps) => {
  if (totalPages <= 1) return null

  const visiblePages = getVisiblePages(currentPage, totalPages)

  return (
    <nav
      className={cn(
        "flex items-center justify-between border-t border-line pt-7",
        className
      )}
      aria-label={ariaLabel}
    >
      {currentPage > 1 ? (
        <Link
          className="inline-flex h-11 items-center gap-2 border border-line px-4 text-3 font-medium hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          href={getPageHref(currentPage - 1)}
        >
          <Icon icon={ArrowLeft01Icon} size={16} />
          <span className="max-sm:sr-only">Previous</span>
        </Link>
      ) : (
        <span
          className="inline-flex h-11 items-center gap-2 border border-line px-4 text-3 text-copy/35"
          aria-hidden="true"
        >
          <Icon icon={ArrowLeft01Icon} size={16} />
          <span className="max-sm:sr-only">Previous</span>
        </span>
      )}

      <ol className="flex items-center gap-1.5">
        {visiblePages.map((page, index) => {
          const previousPage = visiblePages[index - 1]
          const hasGap = previousPage !== undefined && page - previousPage > 1

          return (
            <li className="flex items-center gap-1.5" key={page}>
              {hasGap ? (
                <span
                  className="grid size-10 place-items-center text-3 text-copy"
                  aria-hidden="true"
                >
                  …
                </span>
              ) : null}
              <Link
                className="grid size-10 place-items-center border border-transparent text-3 font-medium hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand aria-[current=page]:bg-ink aria-[current=page]:text-white"
                href={getPageHref(page)}
                aria-current={page === currentPage ? "page" : undefined}
                aria-label={
                  page === currentPage
                    ? `Page ${page}, current page`
                    : `Go to page ${page}`
                }
              >
                {page}
              </Link>
            </li>
          )
        })}
      </ol>

      {currentPage < totalPages ? (
        <Link
          className="inline-flex h-11 items-center gap-2 border border-line px-4 text-3 font-medium hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          href={getPageHref(currentPage + 1)}
        >
          <span className="max-sm:sr-only">Next</span>
          <Icon icon={ArrowRight01Icon} size={16} />
        </Link>
      ) : (
        <span
          className="inline-flex h-11 items-center gap-2 border border-line px-4 text-3 text-copy/35"
          aria-hidden="true"
        >
          <span className="max-sm:sr-only">Next</span>
          <Icon icon={ArrowRight01Icon} size={16} />
        </span>
      )}
    </nav>
  )
}
