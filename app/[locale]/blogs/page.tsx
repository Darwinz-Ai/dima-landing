import SectionWrapper from "@/components/shared/SectionWrapper";
import GuideSection from "./sections/GuideSection";
import HeroSection from "./sections/HeroSection";
import LatestSection from "./sections/LatestSection";
import VideosSection from "./sections/VideosSection";
import SocialMediaAnalyticsSection from "./sections/SocialMediaAnalyticsSection";
import { useTranslations } from "next-intl";
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
                url: "/og-image.png",
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
        images: ["/og-image.png"],
    },

    alternates: {
        canonical: "https://thedar.ai/blogs",
    },
};

function BlogsPage() {
    // const t = useTranslations("Blogs");
    return (
        <main>
            <SectionWrapper className="mt-20">
                <HeroSection />
                {/* <LatestSection /> */}
                {/* <VideosSection title={t("videosSection.title")} /> */}
                {/* <SocialMediaAnalyticsSection /> */}
                {/* <GuideSection /> */}
                <AllArticlesSection />
            </SectionWrapper>
            <RequestDemoSection />
        </main>
    );
}

export default BlogsPage;