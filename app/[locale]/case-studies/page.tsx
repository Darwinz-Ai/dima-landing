import LogoCarousel from "../(home)/components/LogoCarousel";
import HeroSection from "./sections/HeroSection";
import FilterSection from "./sections/FilterSection";
import DimaSection from "./sections/DimaSection";
import type { Metadata } from "next";
import RequestDemoSection from "@/components/shared/form/RequestDemoSection";
import { buildLocalizedMetadata } from "@/lib/seo";

type CaseStudiesPageProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata(
    { params }: CaseStudiesPageProps
): Promise<Metadata> {
    const { locale } = await params;
    return buildLocalizedMetadata(locale, "CaseStudies", {
        overrides: {
            metadataBase: new URL("https://thedar.ai"),
            openGraph: {
                url: `https://thedar.ai/${locale}/case-studies`,
                siteName: "dima",
                locale,
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
                canonical: `https://thedar.ai/${locale}/case-studies`,
                languages: {
                    en: "https://thedar.ai/en/case-studies",
                    ar: "https://thedar.ai/ar/case-studies",
                    "x-default": "https://thedar.ai/case-studies"
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
