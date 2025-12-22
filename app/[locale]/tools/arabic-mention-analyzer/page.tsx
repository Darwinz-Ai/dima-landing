import Image from "next/image";
import Calculator from "./components/Calculator";
import SectionWrapper from "@/components/shared/SectionWrapper";
import type { Metadata } from "next";
import { buildLocalizedMetadata } from "@/lib/seo";

type ArabicMentionAnalyzerPageProps = {
    params: { locale: string };
};

export async function generateMetadata(
    { params: { locale } }: ArabicMentionAnalyzerPageProps
): Promise<Metadata> {
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
                <figure className="flex justify-center">
                    <Image
                        src="/dima-logo/dima-logo.png"
                        alt="dima"
                        width={200}
                        height={60}
                        className="h-12 md:h-14 w-auto"
                        unoptimized={true}
                    />
                </figure>

                <Calculator />
            </div>
        </SectionWrapper>
    );
}

export default ArabicMentionAnalyzerPage;