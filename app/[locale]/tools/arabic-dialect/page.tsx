import SectionWrapper from "@/components/shared/SectionWrapper";
import { DialectAnalyzer } from "./components/DialectAnalyzer";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { buildLocalizedMetadata } from "@/lib/seo";

type ArabicDialectToolPageProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata(
    { params }: ArabicDialectToolPageProps
): Promise<Metadata> {
    const { locale } = await params;
    return buildLocalizedMetadata(locale, "Tools-arabic-dialect", {
        overrides: {
            openGraph: {
                url: "https://thedar.ai/tools/arabic-dialect",
                siteName: "dima",
                type: "website",
                images: [
                    {
                        url: "/og/tools/arabic-dialect.png",
                        width: 1200,
                        height: 630,
                        alt: "Arabic Dialect Accuracy Lab Tool OG Image",
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                images: ["/og/tools/arabic-dialect.png"],
            },
            alternates: {
                canonical: "https://thedar.ai/tools/arabic-dialect",
                languages: {
                    "en-US": "https://thedar.ai/en/tools/arabic-dialect",
                    "ar-SA": "https://thedar.ai/ar/tools/arabic-dialect",
                }
            },
        },
    });
}

function ArabicDialectTool() {
    const t = useTranslations("Tools.arabic-dialect")
    return (
        <main>
            <SectionWrapper className="min-h-dvh mt-24">
                <div className="container mx-auto py-8 sm:py-12">
                    {/* Title Section */}
                    <div className="text-center mb-8 sm:mb-12 px-4">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">
                            {t("title")}
                        </h1>
                        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                            {t("description")}
                        </p>
                    </div>

                    {/* Analyzer Component */}
                    <DialectAnalyzer />
                </div>
            </SectionWrapper>
        </main>
    );
}

export default ArabicDialectTool;