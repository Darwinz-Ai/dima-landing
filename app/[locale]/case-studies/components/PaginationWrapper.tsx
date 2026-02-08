import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useLocale } from "next-intl";
import { MouseEvent } from "react";

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

  const pages = totalPages > 0 ? Array.from({ length: totalPages }, (_, index) => index + 1) : [1];

  return (
    <Pagination className="mb-4">
      <PaginationContent className="space-x-2">
        <PaginationItem>
          <PaginationLink
            href="#"
            size="icon"
            onClick={handlePreviousClick}
            aria-disabled={!canGoPrevious}
            className={cn(
              "size-10 rounded-full flex items-center justify-center",
              !canGoPrevious && "pointer-events-none opacity-50"
            )}
          >
            <IconChevronLeft className={`size-4 ${isRTL ? "rotate-180" : ""}`} />
          </PaginationLink>
        </PaginationItem>

        {pages.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href="#"
              isActive={pageNumber === currentPage}
              className="tabular-nums"
              size="default"
              onClick={(event) => handlePageClick(event, pageNumber)}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink
            href="#"
            size="icon"
            onClick={handleNextClick}
            aria-disabled={!canGoNext}
            className={cn(
              "size-10 rounded-full flex items-center justify-center",
              !canGoNext && "pointer-events-none opacity-50"
            )}
          >
            {<IconChevronRight className={`size-4 ${isRTL ? "rotate-180" : ""}`} />}
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationWrapper;
