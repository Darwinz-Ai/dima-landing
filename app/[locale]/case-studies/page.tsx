
import LogoCarousel from "@/features/home/components/carousels/LogoCarousel";
import HeroSection from "@/features/case-studies/sections/HeroSection";
import FilterSection from "@/features/case-studies/sections/FilterSection";
import DimaSection from "@/features/case-studies/sections/DimaSection";
import RequestDemoSection from "@/components/shared/form/RequestDemoSection";
import JsonLd from "@/components/shared/JsonLd";

import type { Metadata } from "next";

import { buildLocalizedMetadata } from "@/lib/seo";
import { getLocale } from "next-intl/server";
import { fetchCaseStudies } from "@/lib/firebase/caseStudiesFunctions";
import { getCaseStudiesPageJsonLd } from "@/lib/jsonLd";

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
                siteName: "TheDar.AI",
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
                    "x-default": "https://thedar.ai/en/case-studies"
                }
            },
        },
    });
}

async function CaseStudiesPage() {
    const locale = await getLocale();

    const caseStudies = await fetchCaseStudies(locale, undefined, null)
    const caseStudiesJsonLd = await getCaseStudiesPageJsonLd(caseStudies);
    return (
        <main>
            <JsonLd data={[caseStudiesJsonLd]} />

            <HeroSection />
            <LogoCarousel />
            <FilterSection />
            <DimaSection />
            <RequestDemoSection />
        </main>
    );
}

export default CaseStudiesPage;
