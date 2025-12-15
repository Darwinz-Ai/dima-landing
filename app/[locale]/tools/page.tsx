import SectionWrapper from "@/components/shared/SectionWrapper";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Metadata } from "next";
import RequestDemoSection from "@/components/shared/form/RequestDemoSection";
import { toolLinks } from "@/data/tools";
import RequestDemoButton from "@/components/shared/form/RequestDemoButton";
import LogoCarousel from "../(home)/components/LogoCarousel";
import EmpoweringAgenciesSection from "../(home)/sections/EmpoweringAgenciesSection";

export const metadata: Metadata = {
    title: "Tools & Calculators - dima",
    description:
        "Explore dima's free AI tools for marketers and PR teams: Arabic Coverage Gap Audit, Arabic Dialect Accuracy Lab, Lost Mentions Calculator, Crisis Readiness Scorecard, and Monitoring Stack Consolidation Calculator. Analyze campaigns, detect blind spots, and optimize media monitoring.",
    keywords: [
        "dima tools",
        "marketing calculators",
        "PR tools",
        "Arabic coverage gap audit",
        "Arabic dialect accuracy lab",
        "lost mentions calculator",
        "crisis readiness scorecard",
        "monitoring stack consolidation calculator",
        "media monitoring tools",
    ],

    openGraph: {
        title: "Tools & Calculators - dima",
        description:
            "Use dima's AI tools to audit Arabic coverage gaps, test dialect accuracy, calculate missed mentions, evaluate crisis readiness, and consolidate monitoring stacks. Boost PR and marketing performance.",
        url: "https://thedar.ai/tools",
        siteName: "dima",
        type: "website",
        images: [
            {
                url: "/og/tools.png",
                width: 1200,
                height: 630,
                alt: "dima Tools & Calculators OG Image",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Tools & Calculators - dima",
        description:
            "Discover dima's free AI tools for Arabic media monitoring and PR: Coverage Gap Audit, Dialect Accuracy Lab, Lost Mentions Calculator, Crisis Scorecard, and Stack Consolidation Calculator.",
        images: ["/og/tools.png"],
    },

    alternates: {
        canonical: "https://thedar.ai/tools",
    },
};

function ToolsPage() {
    const t = useTranslations("Tools");
    return (
        <main>
            {/* Header */}
            <SectionWrapper className="lg:py-0 px-0 justify-start">
                <div className="w-full lg:pt-12 bg-muted rounded-b-[80px]">
                    <div className="flex flex-col justify-center items-center text-center gap-4 py-24">
                        <h2 className="bg-black text-white uppercase py-1 rounded-sm italic tracking-wide font-semibold px-4 text-sm mb-4">{t("badge")}</h2>
                        <h1 className="text-2xl md:text-[44px] lg:text-[60px] text-[#142828] font-semibold">{t("title")}</h1>
                        <p className="text-lg md:text-2xl lg:text-[35px] max-w-7xl">{t("description")}</p>
                        <RequestDemoButton className="px-4 mt-4" size={"xl"} />
                    </div>
                </div>
                <div className="container mx-auto pt-10 px-6">
                    <h2 className="text-[14px] sm:text-3xl text-center">{t("trustedBy")}</h2>
                    <LogoCarousel />
                </div>

            </SectionWrapper>

            {/* Tools */}
            <SectionWrapper>
                <h3 className="text-[22px] md:text-[44px] text-center max-w-5xl">{t("toolsTitle")}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mt-12">
                    {
                        toolLinks.map((tool) => (
                            <Link key={tool.href} href={tool.href}>
                                <article className="h-full space-y-4 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.07)] p-6">
                                    <Badge className="capitalize">{t("tryNow")}</Badge>
                                    <h2 className="text-lg sm:text-2xl font-medium">{t(`${tool.translationKey}.title`)}</h2>
                                    <p className="text-[#6d6d6d]">{t(`${tool.translationKey}.description`)}</p>
                                </article>
                            </Link>
                        ))
                    }
                </div>
            </SectionWrapper>

            <EmpoweringAgenciesSection />
            <RequestDemoSection />
        </main>
    );
}

export default ToolsPage;