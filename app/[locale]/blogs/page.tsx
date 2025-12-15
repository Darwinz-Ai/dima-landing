import SectionWrapper from "@/components/shared/SectionWrapper";
import HeroSection from "./sections/HeroSection";
import { Metadata } from "next";
import RequestDemoSection from "@/components/shared/form/RequestDemoSection";
import AllArticlesSection from "./sections/AllArticlesSection";

export const metadata: Metadata = {
    title: "Blogs - dima",
    description:
        "Insights, case studies, and practical guides on AI-powered media monitoring, social listening, and Arabic-language analytics.",
    keywords: [
        "dima blog",
        "media monitoring insights",
        "social listening guides",
        "PR analytics articles",
        "case studies",
        "Arabic language analytics",
        "marketing analytics blog",
        "brand monitoring tips",
    ],

    metadataBase: new URL("https://thedar.ai"),

    openGraph: {
        title: "Blogs - dima",
        description:
            "Insights, case studies, and practical guides on AI-powered media monitoring, social listening, and Arabic-language analytics.",
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
        title: "Blogs - dima",
        description:
            "Insights, case studies, and practical guides on AI-powered media monitoring, social listening, and Arabic-language analytics.",
        images: ["/og/blogs.png"],
    },

    alternates: {
        canonical: "https://thedar.ai/blogs",
    },
};

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