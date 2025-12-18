import SectionWrapper from "@/components/shared/SectionWrapper";
import { ArabicCoverageWizard } from "./components/ArabicCoverageWizard";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Arabic Coverage Gap Audit - dima Tool",
    description:
        "A guided wizard that maps keyword lists to Arabic dialect variations, common misspellings, and colloquialisms by country — saving time and reducing blind spots in media monitoring.",


    openGraph: {
        title: "Arabic Coverage Gap Audit - dima Tool",
        description:
            "Use dima's Arabic Coverage Gap Audit to map keywords to dialects, detect common misspellings, and identify blind spots in your media monitoring workflow.",
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
        title: "Arabic Coverage Gap Audit - dima Tool",
        description:
            "Map keywords to Arabic dialects, detect misspellings, and uncover media monitoring blind spots with dima’s Arabic Coverage Gap Audit.",
        images: ["/og/tools/arabic-coverage.png"],
    },

    alternates: {
        canonical: "https://thedar.ai/tools/arabic-coverage-gap-audit",
    },
};

function ArabicCoverageGapAudit() {
    const t = useTranslations("Tools.arabic-coverage-gap-audit");

    return (
        <main>
            <SectionWrapper className="min-h-dvh mt-24">
                <div className="container mx-auto">
                    {/* Logo at top center */}
                    <div className="flex justify-center mb-12">
                        <Image
                            src="/dima-logo.png"
                            alt="dima"
                            width={200}
                            height={60}
                            className="h-12 md:h-14 w-auto"
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
