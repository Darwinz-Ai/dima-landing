import { getBlogsCount, fetchBlogsPage } from "@/lib/firebase/blogsFunctions";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useLocale } from "next-intl";

export const usePaginatedBlogs = (limitCount: number = 16) => {
    const locale = useLocale();

    const countQuery = useQuery({
        queryKey: ["blogs-count", locale, "active"],
        queryFn: getBlogsCount,
        staleTime: 1000 * 60
    });

    const infiniteQuery = useInfiniteQuery({
        queryKey: ["blogs", locale, limitCount, "active"],
        initialPageParam: null as QueryDocumentSnapshot<DocumentData> | null,
        queryFn: async ({ pageParam }) => fetchBlogsPage(locale, limitCount, pageParam),
        getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.lastVisible : undefined),
        staleTime: 1000 * 60
    });

    const totalCount = countQuery.data ?? 0;
    const totalPages = totalCount > 0 ? Math.ceil(totalCount / limitCount) : 1;

    return {
        ...infiniteQuery,
        totalCount,
        totalPages,
        isLoading: infiniteQuery.isLoading || countQuery.isLoading,
        isError: infiniteQuery.isError || countQuery.isError,
        error: infiniteQuery.error ?? countQuery.error
    };
};
