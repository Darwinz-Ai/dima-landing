import SectionWrapper from "@/components/shared/SectionWrapper";
import { TCOCalculator } from "./components/TCOCalculator";
import type { Metadata } from "next";
import { buildLocalizedMetadata } from "@/lib/seo";
import { getLocale } from "next-intl/server";
import { getToolPageJsonLd } from "@/lib/jsonLd";
import JsonLd from "@/components/shared/JsonLd";

type StackConsolidationCalculatorPageProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata(
    { params }: StackConsolidationCalculatorPageProps
): Promise<Metadata> {
    const { locale } = await params;
    return buildLocalizedMetadata(locale, "Tools-stack-consolidation-calculator", {
        overrides: {
            openGraph: {
                url: `https://thedar.ai/${locale}/tools/stack-consolidation-calculator`,
                siteName: "dima",
                locale,
                type: "website",
                images: [
                    {
                        url: "/og/tools/monitoring-stack.png",
                        width: 1200,
                        height: 630,
                        alt: "Monitoring Stack Consolidation Calculator OG Image",
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                images: ["/og/tools/monitoring-stack.png"],
            },
            alternates: {
                canonical: `https://thedar.ai/${locale}/tools/stack-consolidation-calculator`,
                languages: {
                    en: "https://thedar.ai/en/tools/stack-consolidation-calculator",
                    ar: "https://thedar.ai/ar/tools/stack-consolidation-calculator",
                    "x-default": "https://thedar.ai/tools/stack-consolidation-calculator"
                }
            },
        },
    });
}

async function StackConsolidationCalculatorPage() {
    const locale = await getLocale();
    const { breadcrumbsJsonLd, toolJsonLd } = await getToolPageJsonLd({
        locale,
        seoKey: "Tools-stack-consolidation-calculator",
        slug: "stack-consolidation-calculator",
        displayName: "Monitoring Stack Consolidation Calculator",
        imagePath: "https://thedar.ai/og/tools/monitoring-stack.png"
    });
    return (
        <main>
            <JsonLd data={[breadcrumbsJsonLd, toolJsonLd]} />

            <SectionWrapper className="min-h-dvh mt-24">
                <TCOCalculator />
            </SectionWrapper>
        </main>
    );
}

export default StackConsolidationCalculatorPage;