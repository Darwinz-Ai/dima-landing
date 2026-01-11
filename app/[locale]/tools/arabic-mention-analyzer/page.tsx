import Calculator from "./components/Calculator";
import SectionWrapper from "@/components/shared/SectionWrapper";
import type { Metadata } from "next";
import { buildLocalizedMetadata } from "@/lib/seo";

type ArabicMentionAnalyzerPageProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata(
    { params }: ArabicMentionAnalyzerPageProps
): Promise<Metadata> {
    const { locale } = await params;
    return buildLocalizedMetadata(locale, "Tools-arabic-mention-analyzer", {
        overrides: {
            openGraph: {
                url: "https://thedar.ai/tools/arabic-mention-analyzer",
                siteName: "dima",
                type: "website",
                images: [
                    {
                        url: "/og/tools/lost-mentions.png",
                        width: 1200,
                        height: 630,
                        alt: "Lost Mentions & Missed Sentiment Calculator OG Image",
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                images: ["/og/tools/lost-mentions.png"],
            },
            alternates: {
                canonical: "https://thedar.ai/tools/arabic-mention-analyzer",
                languages: {
                    "en-US": "https://thedar.ai/en/tools/arabic-mention-analyzer",
                    "ar-SA": "https://thedar.ai/ar/tools/arabic-mention-analyzer",
                }
            },
        },
    });
}

function ArabicMentionAnalyzerPage() {
    return (
        <SectionWrapper className="min-h-dvh mt-24">
            <div className="max-w-7xl mx-auto space-y-12">
                <Calculator />
            </div>
        </SectionWrapper>
    );
}

export default ArabicMentionAnalyzerPage;