"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { fetchSingleCaseStudy } from "@/lib/firebase/caseStudiesFunctions";

export const useCaseStudy = (slug: string) => {
    const locale = useLocale();
    return useQuery({
        queryKey: ["case-studies", slug, locale],
        queryFn: () => fetchSingleCaseStudy(locale, slug)
    })
}