import pick from "lodash/pick";

import Calculator from "./components/Calculator";
import SectionWrapper from "@/components/shared/SectionWrapper";
import type { Metadata } from "next";
import { buildLocalizedMetadata } from "@/lib/seo";
import { getLocale, getMessages } from "next-intl/server";
import { getToolPageJsonLd } from "@/lib/jsonLd";
import JsonLd from "@/components/shared/JsonLd";
import { NextIntlClientProvider } from "next-intl";

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
                url: `https://thedar.ai/${locale}/tools/arabic-mention-analyzer`,
                siteName: "TheDar.AI",
                locale,
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
                canonical: `https://thedar.ai/${locale}/tools/arabic-mention-analyzer`,
                languages: {
                    en: "https://thedar.ai/en/tools/arabic-mention-analyzer",
                    ar: "https://thedar.ai/ar/tools/arabic-mention-analyzer",
                    "x-default": "https://thedar.ai/en/tools/arabic-mention-analyzer"
                }
            },
        },
    });
}

async function ArabicMentionAnalyzerPage() {
    const locale = await getLocale();
    const { breadcrumbsJsonLd, toolJsonLd } = await getToolPageJsonLd({
        locale,
        seoKey: "Tools-arabic-mention-analyzer",
        slug: "arabic-mention-analyzer",
        displayName: "Lost Mentions & Missed Sentiment Calculator",
        imagePath: "https://thedar.ai/og/tools/lost-mentions.png"
    });

    const messages = await getMessages();
    const clientMessages = pick(messages, ["Tools.arabic-mention-analyzer"])
    return (
        <main>
            <JsonLd data={[breadcrumbsJsonLd, toolJsonLd]} />

            <SectionWrapper className="min-h-dvh mt-24">
                <div className="max-w-7xl mx-auto space-y-12">
                    <NextIntlClientProvider messages={clientMessages}>
                        <Calculator />
                    </NextIntlClientProvider>
                </div>
            </SectionWrapper>
        </main>
    );
}

export default ArabicMentionAnalyzerPage;