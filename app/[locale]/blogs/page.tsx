
import SectionWrapper from "@/components/shared/SectionWrapper";
import HeroSection from "@/features/blogs/sections/HeroSection";
import RequestDemoSection from "@/components/shared/form/RequestDemoSection";
import AllArticlesSection from "@/features/blogs/sections/AllArticlesSection";
import JsonLd from "@/components/shared/JsonLd";

import type { Metadata } from "next";

import { getLocale } from "next-intl/server";
import { buildLocalizedMetadata } from "@/lib/seo";
import { getBlogsPageJsonLd } from "@/lib/jsonLd";
import { fetchBlogsByPageNumber, getBlogsCount } from "@/lib/firebase/blogsFunctions";

type BlogsPageProps = {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
    { params }: BlogsPageProps
): Promise<Metadata> {
    const { locale } = await params;
    return buildLocalizedMetadata(locale, "Blogs", {
        overrides: {
            metadataBase: new URL("https://thedar.ai"),
            openGraph: {
                url: `https://thedar.ai/${locale}/blogs`,
                siteName: "TheDar.AI",
                locale,
                type: "website",
                images: [
                    {
                        url: "/og/blogs.png",
                        width: 1200,
                        height: 630,
                        alt: "dima OG Image",
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                images: ["/og/blogs.png"],
            },
            alternates: {
                canonical: `https://thedar.ai/${locale}/blogs`,
                languages: {
                    en: "https://thedar.ai/en/blogs",
                    ar: "https://thedar.ai/ar/blogs",
                    "x-default": "https://thedar.ai/en/blogs"
                }
            },
        },
    });
}

const PAGE_SIZE = 16;

async function BlogsPage({ params, searchParams }: BlogsPageProps) {
    const locale = await getLocale();
    const resolvedSearchParams = await searchParams;

    // Parse the page number from the URL (?page=2), default to 1
    const pageQuery = resolvedSearchParams?.page;
    const parsedPage = typeof pageQuery === "string" ? parseInt(pageQuery, 10) : 1;
    const requestedPage = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

    // Fetch total count and calculate total pages
    const totalCount = await getBlogsCount();
    const totalPages = totalCount > 0 ? Math.ceil(totalCount / PAGE_SIZE) : 1;
    const validCurrentPage = Math.min(requestedPage, totalPages);

    // Fetch only the 16 blogs for the current page
    const blogs = await fetchBlogsByPageNumber(locale, validCurrentPage, PAGE_SIZE);
    const blogsJsonLd = await getBlogsPageJsonLd(blogs);

    return (
        <main>
            <JsonLd data={[blogsJsonLd]} />
            <SectionWrapper className="">
                <HeroSection />
                <AllArticlesSection
                    blogs={blogs}
                    currentPage={validCurrentPage}
                    totalPages={totalPages}
                />
            </SectionWrapper>
            <RequestDemoSection />
        </main>
    );
}

export default BlogsPage;