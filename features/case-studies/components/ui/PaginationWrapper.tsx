import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { Icon } from "@/components/shared/Icon";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

type PaginationWrapperProps = {
  currentPage: number;
  totalPages: number;
  currentType?: string;
  gridId?: string;
};

const getVisiblePages = (current: number, total: number) => {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 4, "...", total];
  if (current >= total - 2) return [1, "...", total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
};

export default async function PaginationWrapper({ currentPage, totalPages, currentType, gridId }: PaginationWrapperProps) {
  const t = await getTranslations("Blogs.pagination");
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
    return `?${params.toString()}#${gridId}`;
  };

  return (
    <nav
      className={cn("flex items-center justify-between border-t border-line pt-7 mt-8")}
    >
      {canGoPrevious ? (
        <Link
          className="inline-flex h-11 items-center gap-2 border border-line px-4 text-3 font-medium hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          href={buildHref(currentPage - 1)}
        >
          <Icon className={isRTL ? "rotate-180" : ""} icon={ArrowLeft01Icon} size={16} />
          <span className="max-sm:sr-only">{t("previous")}</span>
        </Link>
      ) : (
        <span
          className="inline-flex h-11 items-center gap-2 border border-line px-4 text-3 text-copy/35"
          aria-hidden="true"
        >
          <Icon className={isRTL ? "rotate-180" : ""} icon={ArrowLeft01Icon} size={16} />
          <span className="max-sm:sr-only">{t("previous")}</span>
        </span>
      )}

      <ol className="flex items-center gap-1.5">
        {visiblePages.map((page, index) => {
          if (page === "...") {
            return (
              <li key={`ellipsis-${index}`} className="flex items-center gap-1.5">
                <span
                  className="grid size-10 place-items-center text-3 text-copy"
                  aria-hidden="true"
                >
                  …
                </span>
              </li>
            );
          }

          const pageNumber = page as number;
          return (
            <li className="flex items-center gap-1.5" key={pageNumber}>
              <Link
                className="grid size-10 place-items-center border border-transparent text-3 font-medium hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand aria-[current=page]:bg-ink aria-[current=page]:text-white"
                href={buildHref(pageNumber)}
                aria-current={pageNumber === currentPage ? "page" : undefined}
                aria-label={
                  pageNumber === currentPage
                    ? `Page ${pageNumber}, current page`
                    : `Go to page ${pageNumber}`
                }
              >
                {pageNumber}
              </Link>
            </li>
          );
        })}
      </ol>

      {canGoNext ? (
        <Link
          className="inline-flex h-11 items-center gap-2 border border-line px-4 text-3 font-medium hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          href={buildHref(currentPage + 1)}
        >
          <span className="max-sm:sr-only">{t("next")}</span>
          <Icon className={isRTL ? "rotate-180" : ""} icon={ArrowRight01Icon} size={16} />
        </Link>
      ) : (
        <span
          className="inline-flex h-11 items-center gap-2 border border-line px-4 text-3 text-copy/35"
          aria-hidden="true"
        >
          <span className="max-sm:sr-only">{t("next")}</span>
          <Icon className={isRTL ? "rotate-180" : ""} icon={ArrowRight01Icon} size={16} />
        </span>
      )}
    </nav>
  );
}