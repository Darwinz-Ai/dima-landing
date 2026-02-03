import SectionWrapper from "@/components/shared/SectionWrapper";
import HeroSection from "./sections/HeroSection";
import type { Metadata } from "next";
import RequestDemoSection from "@/components/shared/form/RequestDemoSection";
import AllArticlesSection from "./sections/AllArticlesSection";
import { buildLocalizedMetadata } from "@/lib/seo";
import { fetchBlogs } from "@/lib/firebase/blogsFunctions";
import { getLocale } from "next-intl/server";
import { getBlogsPageJsonLd } from "@/lib/jsonLd";
import JsonLd from "@/components/shared/JsonLd";

type BlogsPageProps = {
    params: Promise<{ locale: string }>;
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
                siteName: "dima",
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
                    "x-default": "https://thedar.ai/blogs"
                }
            },
        },
    });
}



async function BlogsPage() {
    const locale = await getLocale();
    const blogs = await fetchBlogs(locale, [], null)

    const blogsJsonLd = await getBlogsPageJsonLd(blogs);
    return (
        <main>
            <JsonLd data={[blogsJsonLd]} />
            <SectionWrapper className="mt-20">
                <HeroSection />
                <AllArticlesSection />
            </SectionWrapper>
            <RequestDemoSection />
        </main>
    );
}

export default BlogsPage;