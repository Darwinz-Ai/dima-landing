import SectionWrapper from "@/components/shared/SectionWrapper";
import HeroSection from "./sections/HeroSection";
import type { Metadata } from "next";
import RequestDemoSection from "@/components/shared/form/RequestDemoSection";
import AllArticlesSection from "./sections/AllArticlesSection";
import { buildLocalizedMetadata } from "@/lib/seo";

type BlogsPageProps = {
    params: { locale: string };
};

export async function generateMetadata(
    { params: { locale } }: BlogsPageProps
): Promise<Metadata> {
    return buildLocalizedMetadata(locale, "Blogs", {
        overrides: {
            metadataBase: new URL("https://thedar.ai"),
            openGraph: {
                url: "https://thedar.ai/blogs",
                siteName: "dima",
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
                canonical: "https://thedar.ai/blogs",
                languages: {
                    "en-US": "https://thedar.ai/en/blogs",
                    "ar-SA": "https://thedar.ai/ar/blogs"
                }
            },
        },
    });
}

function BlogsPage() {
    return (
        <main>
            <SectionWrapper className="mt-20">
                <HeroSection />
                <AllArticlesSection />
            </SectionWrapper>
            <RequestDemoSection />
        </main>
    );
}

export default BlogsPage;