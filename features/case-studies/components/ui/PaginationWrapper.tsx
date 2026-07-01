import { useLocale } from "next-intl";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis
} from "@/components/ui/pagination";
import { MouseEvent } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type PaginationWrapperProps = {
  currentPage: number;
  totalPages: number;
  canGoPrevious: boolean;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void | Promise<void>;
  onSelectPage?: (pageNumber: number) => void | Promise<void>;
  isLoadingNext?: boolean;
};

// Helper function to calculate which page numbers to show
const getVisiblePages = (current: number, total: number) => {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  // If at beginning of pagination, render first few pages
  if (current <= 3) {
    return [1, 2, 3, 4, "...", total];
  }

  // If at end of pagination, render last few pages
  if (current >= total - 2) {
    return [1, "...", total - 3, total - 2, total - 1, total];
  }

  // If middle of pagination, render around current then add ellipses
  return [1, "...", current - 1, current, current + 1, "...", total];
};

function PaginationWrapper({
  currentPage,
  totalPages,
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
  onSelectPage,
}: PaginationWrapperProps) {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const handlePreviousClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (!canGoPrevious) return;
    onPrevious();
  };

  const handleNextClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (!canGoNext) return;
    await onNext();
  };

  const handlePageClick = async (event: MouseEvent<HTMLAnchorElement>, pageNumber: number) => {
    event.preventDefault();
    if (!onSelectPage || pageNumber === currentPage) return;
    await onSelectPage(pageNumber);
  };

  const safeTotalPages = totalPages > 0 ? totalPages : 1;
  const visiblePages = getVisiblePages(currentPage, safeTotalPages);

  return (
    <Pagination className="mb-4">
      <PaginationContent className="space-x-1 sm:space-x-2">
        <PaginationItem>
          <PaginationLink
            href="#"
            size="icon"
            onClick={handlePreviousClick}
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
                href="#"
                isActive={pageNumber === currentPage}
                className="tabular-nums h-8 w-8 sm:h-10 sm:w-10 p-0 flex items-center justify-center text-xs sm:text-sm"
                onClick={(event) => handlePageClick(event, pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationLink
            href="#"
            size="icon"
            onClick={handleNextClick}
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

export default PaginationWrapper;