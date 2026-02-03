import { fetchSingleBlog } from "@/lib/firebase/blogsFunctions";
import BlogContent from "../components/BlogContent";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { createBreadcrumbs, getSingleBlogJsonLd } from "@/lib/jsonLd";
import JsonLd from "@/components/shared/JsonLd";
import { notFound } from "next/navigation";

type SingleViewBlogPageProps = {
    params: Promise<{ slug: string, locale: string }>
};

// Generate metadata dynamically
export async function generateMetadata(
    { params }: SingleViewBlogPageProps
): Promise<Metadata> {

    try {
        const { slug, locale } = await params;
        const blog = await fetchSingleBlog(locale, slug);

        return {
            title: `${blog.content.title} - dima`,
            description: blog.content.description,
            keywords: [
                blog.content.title,
                "dima blog",
                "media monitoring",
                "social listening",
                "PR and communications",
                "Arabic media analytics",
            ],
            openGraph: {
                url: `https://thedar.ai/${locale}/${slug}`,
                siteName: "dima",
                locale,
                title: `${blog.content.title} - dima`,
                description: blog.content.description,
                images: [blog.thumbnail],
                type: "article",
            },
            twitter: {
                card: "summary_large_image",
                images: [blog.thumbnail]
            },
            alternates: {
                canonical: `https://thedar.ai/${locale}/blogs/${slug}`,
                languages: {
                    en: `https://thedar.ai/en/blogs/${slug}`,
                    ar: `https://thedar.ai/ar/blogs/${slug}`,
                    "x-default": `https://thedar.ai/blogs/${slug}`
                }
            }
        };
    } catch (error) {
        return {
            title: "Blog Not Found - dima",
            description: "The requested blog does not exist.",
            openGraph: {
                title: "Blog Not Found - dima",
                description: "The requested blog does not exist.",
                images: ["/og/blogs.png"],
            },
        };
    }
}

export default async function SingleViewBlogPage({ params }: SingleViewBlogPageProps) {
    const { slug } = await params;

    try {
        const locale = await getLocale();
        const blog = await fetchSingleBlog(locale, slug);

        const blogJsonLd = await getSingleBlogJsonLd(blog);
        const breadcrumbsJsonLd = createBreadcrumbs([
            { name: "Home", path: `/${locale}` },
            { name: "Blogs", path: `/${locale}/blogs` },
            { name: blog.content.title, path: `/${locale}/solutions/${slug}` },
        ]);
        return (
            <main>
                <JsonLd data={[breadcrumbsJsonLd, blogJsonLd]} />

                <BlogContent slug={slug} />
            </main>
        );
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? `Error: ${error.message}` : "An Error has occurred";
        console.log(errorMessage);
        return notFound()
    }
}
