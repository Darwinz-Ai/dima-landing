import { getLocale } from "next-intl/server";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis
} from "@/components/ui/pagination";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type PaginationWrapperProps = {
  currentPage: number;
  totalPages: number;
  currentType?: string;
};

const getVisiblePages = (current: number, total: number) => {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 4, "...", total];
  if (current >= total - 2) return [1, "...", total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
};

export default async function PaginationWrapper({ currentPage, totalPages, currentType }: PaginationWrapperProps) {
  const locale = await getLocale();
  const isRTL = locale === "ar";
  const safeTotalPages = totalPages > 0 ? totalPages : 1;
  const visiblePages = getVisiblePages(currentPage, safeTotalPages);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < safeTotalPages;

  // Helper to build URLs that preserve the filter type
  const buildHref = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (currentType) {
      params.set("type", currentType);
    }
    return `?${params.toString()}#case-studies-grid`;
  };

  return (
    <Pagination className="mb-4">
      <PaginationContent className="space-x-1 sm:space-x-2">
        <PaginationItem>
          <PaginationLink
            href={canGoPrevious ? buildHref(currentPage - 1) : "#"}
            size="icon"
            aria-disabled={!canGoPrevious}
            className={cn(
              "size-8 sm:size-10 rounded-full flex items-center justify-center",
              !canGoPrevious && "pointer-events-none opacity-50"
            )}
          >
            <IconChevronLeft className={`size-4 ${isRTL ? "rotate-180" : ""}`} />
          </PaginationLink>
        </PaginationItem>

        {visiblePages.map((page, index) => {
          if (page === "...") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis className="w-5 sm:w-9 flex justify-center" />
              </PaginationItem>
            );
          }

          const pageNumber = page as number;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href={buildHref(pageNumber)}
                isActive={pageNumber === currentPage}
                className="tabular-nums h-8 w-8 sm:h-10 sm:w-10 p-0 flex items-center justify-center text-xs sm:text-sm"
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationLink
            href={canGoNext ? buildHref(currentPage + 1) : "#"}
            size="icon"
            aria-disabled={!canGoNext}
            className={cn(
              "size-8 sm:size-10 rounded-full flex items-center justify-center",
              !canGoNext && "pointer-events-none opacity-50"
            )}
          >
            <IconChevronRight className={`size-4 ${isRTL ? "rotate-180" : ""}`} />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}