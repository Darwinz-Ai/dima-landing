import SectionWrapper from "@/components/shared/SectionWrapper";
import { useTranslations } from "next-intl";
import CrisisReadinessScore from "./components/CrisisReadinessScore";
import type { Metadata } from "next";
import { buildLocalizedMetadata } from "@/lib/seo";

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
                url: "https://thedar.ai/tools/crisis-readiness-score",
                siteName: "dima",
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
                canonical: "https://thedar.ai/tools/crisis-readiness-score",
                languages: {
                    "en-US": "https://thedar.ai/en/tools/crisis-readiness-score",
                    "ar-SA": "https://thedar.ai/ar/tools/crisis-readiness-score",
                }
            },
        },
    });
}

function CrisisReadinessScorePage() {
    const t = useTranslations("Tools.crisis-readiness-score");
    return (
        <main>
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