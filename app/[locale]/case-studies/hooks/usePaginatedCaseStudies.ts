"use client";

import { getCaseStudiesCount, fetchCaseStudiesPage } from "@/lib/firebase/caseStudiesFunctions";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useLocale } from "next-intl";

export const usePaginatedCaseStudies = (limitCount: number = 6) => {
    const locale = useLocale();

    const countQuery = useQuery({
        queryKey: ["case-studies-count", locale, "active"],
        queryFn: getCaseStudiesCount,
        staleTime: 1000 * 60
    });

    const infiniteQuery = useInfiniteQuery({
        queryKey: ["case-studies", locale, limitCount, "active"],
        initialPageParam: null as QueryDocumentSnapshot<DocumentData> | null,
        queryFn: async ({ pageParam }) => fetchCaseStudiesPage(locale, limitCount, pageParam),
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
