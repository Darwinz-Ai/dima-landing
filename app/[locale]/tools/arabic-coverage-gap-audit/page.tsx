import SectionWrapper from "@/components/shared/SectionWrapper";
import { ArabicCoverageWizard } from "./components/ArabicCoverageWizard";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { buildLocalizedMetadata } from "@/lib/seo";

type ArabicCoverageGapAuditPageProps = {
    params: { locale: string };
};

export async function generateMetadata(
    { params: { locale } }: ArabicCoverageGapAuditPageProps
): Promise<Metadata> {
    return buildLocalizedMetadata(locale, "Tools-arabic-coverage-gap-audit", {
        overrides: {
            openGraph: {
                url: "https://thedar.ai/tools/arabic-coverage-gap-audit",
                siteName: "dima",
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
                canonical: "https://thedar.ai/tools/arabic-coverage-gap-audit",
                languages: {
                    "en-US": "https://thedar.ai/en/tools/arabic-coverage-gap-audit",
                    "ar-SA": "https://thedar.ai/ar/tools/arabic-coverage-gap-audit",
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
                    {/* Logo at top center */}
                    <div className="flex justify-center mb-12">
                        <Image
                            src="/dima-logo/dima-logo.png"
                            alt="dima"
                            width={200}
                            height={60}
                            className="h-12 md:h-14 w-auto"
                            unoptimized={true}
                        />
                    </div>

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
