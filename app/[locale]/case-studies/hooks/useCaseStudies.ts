"use client";

import { fetchCaseStudies } from "@/lib/firebase/caseStudiesFunctions";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

type CaseStudyFilters = {
    featured?: boolean;
};

export const useCaseStudies = (limitCount: number | null = null, filters: CaseStudyFilters = {}) => {
    const locale = useLocale();

    return useQuery({
        queryKey: ["more-case-studies", locale, filters.featured ?? null, limitCount],
        queryFn: () => fetchCaseStudies(locale, filters, limitCount),
        staleTime: 1000 * 60
    });
};

