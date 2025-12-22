import SectionWrapper from "@/components/shared/SectionWrapper";
import { TCOCalculator } from "./components/TCOCalculator";
import type { Metadata } from "next";
import { buildLocalizedMetadata } from "@/lib/seo";

type StackConsolidationCalculatorPageProps = {
    params: { locale: string };
};

export async function generateMetadata(
    { params: { locale } }: StackConsolidationCalculatorPageProps
): Promise<Metadata> {
    return buildLocalizedMetadata(locale, "Tools-stack-consolidation-calculator", {
        overrides: {
            openGraph: {
                url: "https://thedar.ai/tools/stack-consolidation-calculator",
                siteName: "dima",
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
                canonical: "https://thedar.ai/tools/stack-consolidation-calculator",
                languages: {
                    "en-US": "https://thedar.ai/en/tools/stack-consolidation-calculator",
                    "ar-SA": "https://thedar.ai/ar/tools/stack-consolidation-calculator",
                }
            },
        },
    });
}

function StackConsolidationCalculatorPage() {
    return (
        <SectionWrapper className="min-h-dvh mt-24">
            <TCOCalculator />
        </SectionWrapper>
    );
}

export default StackConsolidationCalculatorPage;