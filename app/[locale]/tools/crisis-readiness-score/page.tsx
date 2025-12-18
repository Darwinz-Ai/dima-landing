import SectionWrapper from "@/components/shared/SectionWrapper";
import { useTranslations } from "next-intl";
import Image from "next/image";
import CrisisReadinessScore from "./components/CrisisReadinessScore";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Crisis Readiness Scorecard - dima Tool",
    description:
        "A 5-minute self-assessment to evaluate your crisis detection, escalation speed, channel coverage, and Arabic sentiment accuracy — helping teams identify gaps and improve preparedness.",

    openGraph: {
        title: "Crisis Readiness Scorecard - dima Tool",
        description:
            "Use dima's Crisis Readiness Scorecard to assess your team's ability to detect crises, respond quickly, monitor channels, and measure Arabic sentiment accuracy.",
        url: "https://thedar.ai/tools/crisis-readiness-scorecard",
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
        title: "Crisis Readiness Scorecard - dima Tool",
        description:
            "Evaluate your crisis detection, escalation speed, channel coverage, and Arabic sentiment accuracy with dima's Crisis Readiness Scorecard.",
        images: ["/og/tools/crisis-readiness.png"],
    },

    alternates: {
        canonical: "https://thedar.ai/tools/crisis-readiness-scorecard",
    },
};

function CrisisReadinessScorePage() {
    const t = useTranslations("Tools.crisis-readiness-score");
    return (
        <main>
            <SectionWrapper className="min-h-dvh mt-24 space-y-4">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Image
                        src="/dima-logo.png"
                        alt="dima"
                        width={200}
                        height={60}
                        className="h-12 md:h-14 w-auto"
                    />
                </div>

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