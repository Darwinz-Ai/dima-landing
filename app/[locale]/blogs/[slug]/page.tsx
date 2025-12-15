import { fetchSingleBlog } from "@/lib/firebase/blogsFunctions";
import BlogContent from "../components/BlogContent";
import { Metadata } from "next";

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
                title: `${blog.content.title} - dima`,
                description: blog.content.description,
                images: [blog.thumbnail],
                type: "article"
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
    const slug = (await params).slug;

    return (
        <main>
            <BlogContent slug={slug} />
        </main>
    );
}
