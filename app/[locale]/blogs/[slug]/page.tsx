import { fetchSingleBlog } from "@/lib/firebase/blogsFunctions";
import BlogContent from "../components/BlogContent";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { getSingleBlogJsonLd } from "@/lib/jsonLd";
import JsonLd from "@/components/shared/JsonLd";

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

    const locale = await getLocale();
    const blog = await fetchSingleBlog(locale, slug);

    const blogJsonLd = await getSingleBlogJsonLd(blog);
    return (
        <main>
            <JsonLd data={blogJsonLd} />

            <BlogContent slug={slug} />
        </main>
    );
}
