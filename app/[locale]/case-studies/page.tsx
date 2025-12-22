import LogoCarousel from "../(home)/components/LogoCarousel";
import HeroSection from "./sections/HeroSection";
import FilterSection from "./sections/FilterSection";
import DimaSection from "./sections/DimaSection";
import type { Metadata } from "next";
import RequestDemoSection from "@/components/shared/form/RequestDemoSection";
import { buildLocalizedMetadata } from "@/lib/seo";

type CaseStudiesPageProps = {
    params: { locale: string };
};

export async function generateMetadata(
    { params: { locale } }: CaseStudiesPageProps
): Promise<Metadata> {
    return buildLocalizedMetadata(locale, "CaseStudies", {
        overrides: {
            openGraph: {
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
                images: ["/og/caseStudies.png"],
            },
            alternates: {
                canonical: "https://thedar.ai/case-studies",
                languages: {
                    "en-US": "https://thedar.ai/en/case-studies",
                    "ar-SA": "https://thedar.ai/ar/case-studies"
                }
            },
        },
    });
}

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
