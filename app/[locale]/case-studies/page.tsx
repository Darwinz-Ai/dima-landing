import LogoCarousel from "../(home)/components/LogoCarousel";
import HeroSection from "./sections/HeroSection";
import FilterSection from "./sections/FilterSection";
import DimaSection from "./sections/DimaSection";
import { Metadata } from "next";
import RequestDemoSection from "@/components/shared/form/RequestDemoSection";

export const metadata: Metadata = {
    title: "Case Studies - How Teams Use dima",
    description:
        "Discover how leading brands and PR teams use dima to monitor media, track campaigns, detect PR crises, and automate reporting. Real-world examples of AI in action.",
    keywords: [
        "dima case studies",
        "media monitoring case studies",
        "PR crisis management examples",
        "brand monitoring success stories",
        "Arabic media analytics",
        "campaign tracking results",
        "AI in PR and communications",
    ],

    openGraph: {
        title: "Case Studies - How Teams Use dima",
        description:
            "See real-world examples of how marketers, PR teams, and brand managers leverage dima to save time, improve accuracy, and gain actionable insights.",
        url: "https://thedar.ai/case-studies",
        siteName: "dima",
        type: "website",
        images: [
            {
                url: "/og/caseStudies.png",
                width: 1200,
                height: 630,
                alt: "dima Case Studies OG Image",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Case Studies - How Teams Use dima",
        description:
            "Explore real-life examples of brands and agencies using dima to monitor media, track campaigns, and manage PR crises efficiently.",
        images: ["/og/caseStudies.png"],
    },

    alternates: {
        canonical: "https://thedar.ai/case-studies",
    },
};

function CaseStudiesPage() {
    return (
        <main>
            <HeroSection />
            <LogoCarousel />
            <FilterSection />
            <DimaSection />
            <RequestDemoSection />
        </main>
    );
}

export default CaseStudiesPage;
