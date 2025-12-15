import SectionWrapper from "@/components/shared/SectionWrapper";
import Image from "next/image";
import { DialectAnalyzer } from "./components/DialectAnalyzer";
import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Arabic Dialect Accuracy Lab - dima Tool",
    description:
        "Live sandbox for testing sentiment and entity extraction across KSA, Egyptian, Levantine, Maghrebi, and Gulf Arabic dialects.",
    keywords: [
        "Arabic dialect accuracy",
        "sentiment analysis Arabic",
        "entity extraction Arabic",
        "KSA Arabic",
        "Egyptian Arabic",
        "Levantine Arabic",
        "Maghrebi Arabic",
        "Gulf Arabic",
        "Arabic NLP",
    ],

    openGraph: {
        title: "Arabic Dialect Accuracy Lab - dima Tool",
        description:
            "Use dima's Arabic Dialect Accuracy Lab to test sentiment analysis and entity extraction for multiple Arabic dialects, including KSA, Egyptian, Levantine, Maghrebi, and Gulf Arabic.",
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
        title: "Arabic Dialect Accuracy Lab - dima Tool",
        description:
            "Test sentiment and entity extraction across multiple Arabic dialects with dima's Arabic Dialect Accuracy Lab.",
        images: ["/og/tools/arabic-dialect.png"],
    },

    alternates: {
        canonical: "https://thedar.ai/tools/arabic-dialect",
    },
};


function ArabicDialectTool() {
    const t = useTranslations("Tools.arabic-dialect")
    return (
        <main>
            <SectionWrapper className="min-h-dvh mt-24">
                <div className="container mx-auto py-8 sm:py-12">
                    {/* Logo Section */}
                    <div className="flex justify-center mb-12">
                        <Image
                            src="/dima-logo.svg"
                            alt="dima"
                            width={200}
                            height={60}
                            className="h-12 md:h-14 w-auto"
                            quality={90}
                        />
                    </div>

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