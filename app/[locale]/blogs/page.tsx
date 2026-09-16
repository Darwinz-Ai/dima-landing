import { getLocale } from "next-intl/server";
import { buildLocalizedMetadata } from "@/lib/seo";
import { getBlogsPageJsonLd } from "@/lib/jsonLd";
import { fetchBlogsByPageNumber, fetchEditorsPickBlogs, getBlogsCount } from "@/lib/firebase/blogsFunctions";

import type { Metadata } from "next";

import JsonLd from "@/components/shared/JsonLd";
import { AllBlogs } from "@/features/new-blogs/components/AllBlogs";
import { BlogHero } from "@/features/new-blogs/components/BlogHero";
import { FinalCta } from "@/features/new-home/final-cta/components/FinalCta";

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

const PAGE_SIZE = 12;

async function BlogsPage({ params, searchParams }: BlogsPageProps) {
    const locale = await getLocale();
    const resolvedSearchParams = await searchParams;

    const pageQuery = resolvedSearchParams?.page;
    const parsedPage = typeof pageQuery === "string" ? parseInt(pageQuery, 10) : 1;
    const requestedPage = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

    const totalCount = await getBlogsCount();
    const totalPages = totalCount > 0 ? Math.ceil(totalCount / PAGE_SIZE) : 1;
    const validCurrentPage = Math.min(requestedPage, totalPages);

    const blogs = await fetchBlogsByPageNumber(locale, validCurrentPage, PAGE_SIZE);
    const latestBlogs = await fetchBlogsByPageNumber(locale, validCurrentPage, 4);
    const featuredBlogArray = await fetchEditorsPickBlogs(locale, 1);
    const featuredBlog = featuredBlogArray[0] || null;

    const blogsJsonLd = await getBlogsPageJsonLd(blogs);

    return (
        <main>
            <JsonLd data={[blogsJsonLd]} />

            <BlogHero featured={featuredBlog} latest={latestBlogs} />
            <AllBlogs
                posts={blogs}
                showTopicNav
                pagination={{
                    currentPage: validCurrentPage,
                    totalPages,
                    totalItems: totalCount
                }}
            />
            <FinalCta />
        </main>
    );
}

export default BlogsPage;