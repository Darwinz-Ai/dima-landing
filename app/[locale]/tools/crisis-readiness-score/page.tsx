import SectionWrapper from "@/components/shared/SectionWrapper";
import CrisisReadinessScore from "./components/CrisisReadinessScore";
import type { Metadata } from "next";
import { buildLocalizedMetadata } from "@/lib/seo";
import { getLocale, getTranslations } from "next-intl/server";
import { getToolPageJsonLd } from "@/lib/jsonLd";
import JsonLd from "@/components/shared/JsonLd";

type CrisisReadinessScorePageProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata(
    { params }: CrisisReadinessScorePageProps
): Promise<Metadata> {
    const { locale } = await params;
    return buildLocalizedMetadata(locale, "Tools-crisis-readiness-score", {
        overrides: {
            openGraph: {
                url: `https://thedar.ai/${locale}/tools/crisis-readiness-score`,
                siteName: "TheDar.AI",
                locale,
                type: "website",
                images: [
                    {
                        url: "/og/tools/crisis-readiness.png",
                        width: 1200,
                        height: 630,
                        alt: "Crisis Readiness Scorecard Tool OG Image",
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                images: ["/og/tools/crisis-readiness.png"],
            },
            alternates: {
                canonical: `https://thedar.ai/${locale}/tools/crisis-readiness-score`,
                languages: {
                    en: "https://thedar.ai/en/tools/crisis-readiness-score",
                    ar: "https://thedar.ai/ar/tools/crisis-readiness-score",
                    "x-default": "https://thedar.ai/tools/crisis-readiness-score"
                }
            },
        },
    });
}

async function CrisisReadinessScorePage() {
    const t = await getTranslations("Tools.crisis-readiness-score");

    const locale = await getLocale();
    const { breadcrumbsJsonLd, toolJsonLd } = await getToolPageJsonLd({
        locale,
        seoKey: "Tools-crisis-readiness-score",
        slug: "crisis-readiness-score",
        displayName: "Crisis Readiness Scorecard",
        imagePath: "https://thedar.ai/og/tools/crisis-readiness.png"
    });
    return (
        <main>
            <JsonLd data={[breadcrumbsJsonLd, toolJsonLd]} />

            <SectionWrapper className="min-h-dvh mt-24 space-y-4">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold">{t('title')}</h1>
                    <p className="text-xl text-primary font-semibold">{t('subtitle')}</p>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('description')}</p>
                    <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-4">
                        <span>{t('audience.item1')}</span>
                        <span>{t('audience.item2')}</span>
                        <span>{t('audience.item3')}</span>
                    </div>
                </div>

                {/* Tool */}
                <CrisisReadinessScore />
            </SectionWrapper>
        </main>
    );
}

export default CrisisReadinessScorePage;