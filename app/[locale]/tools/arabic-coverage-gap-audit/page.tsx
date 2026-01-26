import SectionWrapper from "@/components/shared/SectionWrapper";
import { ArabicCoverageWizard } from "./components/ArabicCoverageWizard";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { buildLocalizedMetadata } from "@/lib/seo";

type ArabicCoverageGapAuditPageProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata(
    { params }: ArabicCoverageGapAuditPageProps
): Promise<Metadata> {
    const { locale } = await params;
    return buildLocalizedMetadata(locale, "Tools-arabic-coverage-gap-audit", {
        overrides: {
            metadataBase: new URL("https://thedar.ai"),
            openGraph: {
                url: `https://thedar.ai/${locale}/tools/arabic-coverage-gap-audit`,
                siteName: "dima",
                locale,
                type: "website",
                images: [
                    {
                        url: "/og/tools/arabic-coverage.png",
                        width: 1200,
                        height: 630,
                        alt: "Arabic Coverage Gap Audit Tool OG Image",
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                images: ["/og/tools/arabic-coverage.png"],
            },
            alternates: {
                canonical: `https://thedar.ai/${locale}/tools/arabic-coverage-gap-audit`,
                languages: {
                    en: "https://thedar.ai/en/tools/arabic-coverage-gap-audit",
                    ar: "https://thedar.ai/ar/tools/arabic-coverage-gap-audit",
                    "x-default": "https://thedar.ai/tools/arabic-coverage-gap-audit"
                }
            },
        },
    });
}

function ArabicCoverageGapAudit() {
    const t = useTranslations("Tools.arabic-coverage-gap-audit");

    return (
        <main>
            <SectionWrapper className="min-h-dvh mt-24">
                <div className="container mx-auto">
                    {/* Main heading */}
                    <div className="text-center mb-12 space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                            {t("title")}
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            {t("description")}
                        </p>
                    </div>

                    {/* Wizard Component */}
                    <ArabicCoverageWizard />
                </div>
            </SectionWrapper>
        </main>
    );
}

export default ArabicCoverageGapAudit;
