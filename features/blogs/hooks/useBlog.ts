"use client";

import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { fetchSingleBlog } from "@/lib/firebase/blogsFunctions";

function useBlog(slug: string) {
    const locale = useLocale();
    return useQuery({
        queryKey: ["blogs", slug, locale],
        queryFn: () => fetchSingleBlog(locale, slug)
    })
}

export default useBlog;