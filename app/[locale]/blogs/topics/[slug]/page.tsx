import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { fetchBlogsByTopicAndPage, getTopicBlogsCount } from "@/lib/firebase/blogsFunctions";
import { FinalCta } from "@/features/new-home/final-cta/components/FinalCta";
import { AllBlogs } from "@/features/new-blogs/components/AllBlogs";
import { TopicHero } from "@/features/new-blogs/components/TopicHero";
import { RelatedTopics } from "@/features/new-blogs/components/RelatedTopics";
import { BLOG_TOPICS, isBlogTopicSlug } from "@/features/new-blogs/constants/topics";
import JsonLd from "@/components/shared/JsonLd";
import { createBreadcrumbs, getTopicBlogsPageJsonLd } from "@/lib/jsonLd";

const PAGE_SIZE = 12;

type TopicPageProps = {
    params: Promise<{ locale: string; slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export function generateStaticParams() {
    return BLOG_TOPICS.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata(
    { params }: TopicPageProps
): Promise<Metadata> {
    const { locale, slug } = await params;

    if (!isBlogTopicSlug(slug)) {
        return {
            title: "Topic Not Found - dima",
            description: "The requested topic does not exist.",
        };
    }

    const t = await getTranslations({ locale, namespace: "Blogs.topics" });
    const name = t(`items.${slug}.name`);
    const description = t(`items.${slug}.description`);

    return {
        title: `${name} - dima Blogs`,
        description,
        keywords: [name, "dima blog", "media intelligence", "MENA", "GCC"],
        openGraph: {
            url: `https://thedar.ai/${locale}/blogs/topics/${slug}`,
            siteName: "TheDar.AI",
            locale,
            type: "website",
            title: `${name} - dima Blogs`,
            description,
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
            canonical: `https://thedar.ai/${locale}/blogs/topics/${slug}`,
            languages: {
                en: `https://thedar.ai/en/blogs/topics/${slug}`,
                ar: `https://thedar.ai/ar/blogs/topics/${slug}`,
                "x-default": `https://thedar.ai/en/blogs/topics/${slug}`,
            },
        },
    };
}

export default async function TopicPillarPage({ params, searchParams }: TopicPageProps) {
    const { locale, slug } = await params;
    const resolvedSearchParams = await searchParams;

    if (!isBlogTopicSlug(slug)) return notFound();

    const t = await getTranslations("Blogs");
    const topicName = t(`topics.items.${slug}.name`);

    const pageQuery = resolvedSearchParams?.page;
    const parsedPage = typeof pageQuery === "string" ? parseInt(pageQuery, 10) : 1;
    const requestedPage = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

    const totalCount = await getTopicBlogsCount(slug);
    const totalPages = totalCount > 0 ? Math.ceil(totalCount / PAGE_SIZE) : 1;
    const validCurrentPage = Math.min(requestedPage, totalPages);

    const [blogs, spotlight] = await Promise.all([
        fetchBlogsByTopicAndPage(locale, slug, validCurrentPage, PAGE_SIZE),
        fetchBlogsByTopicAndPage(locale, slug, 1, 4),
    ]);

    const featured = spotlight[0] ?? null;
    const latest = spotlight.slice(1);

    const blogsJsonLd = await getTopicBlogsPageJsonLd(slug, topicName, blogs);
    const breadcrumbsJsonLd = createBreadcrumbs([
        { name: "Home", path: `/${locale}` },
        { name: t("allBlogs"), path: `/${locale}/blogs` },
        { name: topicName, path: `/${locale}/blogs/topics/${slug}` },
    ]);

    return (
        <main>
            <JsonLd data={[blogsJsonLd]} />
            <JsonLd data={[breadcrumbsJsonLd]} />

            <TopicHero
                slug={slug}
                featured={featured}
                latest={latest}
                articleCount={totalCount}
            />

            <AllBlogs
                posts={blogs}
                currentTopicSlug={slug}
                title={t("topics.gridTitle", { topic: topicName })}
                description={t("topics.gridDescription", {
                    count: totalCount,
                    topic: topicName,
                })}
                pagination={{
                    currentPage: validCurrentPage,
                    totalPages,
                    totalItems: totalCount,
                }}
            />

            <RelatedTopics slug={slug} />
            <FinalCta />
        </main>
    );
}
