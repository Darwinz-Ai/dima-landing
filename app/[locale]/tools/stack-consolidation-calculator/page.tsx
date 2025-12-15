import SectionWrapper from "@/components/shared/SectionWrapper";
import { TCOCalculator } from "./components/TCOCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Monitoring Stack Consolidation Calculator - dima Tool",
    description:
        "Compare your current 3-4 tool stack (social + online press + broadcast) against one Arabic-first AI copilot and discover your potential savings with dima.",
    keywords: [
        "monitoring stack consolidation",
        "media monitoring tools",
        "tool stack savings",
        "TCO calculator",
        "social listening tools",
        "press monitoring tools",
        "broadcast monitoring tools",
        "Arabic-first AI copilot",
    ],

    openGraph: {
        title: "Monitoring Stack Consolidation Calculator - dima Tool",
        description:
            "Use dima's Monitoring Stack Consolidation Calculator to evaluate your existing media monitoring tools and see the efficiency and savings of switching to a single Arabic-first AI copilot.",
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
        title: "Monitoring Stack Consolidation Calculator - dima Tool",
        description:
            "Compare your current 3-4 tool stack against dima's single Arabic-first AI copilot using the Monitoring Stack Consolidation Calculator.",
        images: ["/og/tools/monitoring-stack.png"],
    },

    alternates: {
        canonical: "https://thedar.ai/tools/stack-consolidation-calculator",
    },
};

function StackConsolidationCalculatorPage() {
    return (
        <SectionWrapper className="min-h-dvh mt-24">
            <TCOCalculator />
        </SectionWrapper>
    );
}

export default StackConsolidationCalculatorPage;