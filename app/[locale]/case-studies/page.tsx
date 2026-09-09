
import LogoCarousel from "@/features/home/components/carousels/LogoCarousel";
import HeroSection from "@/features/case-studies/sections/HeroSection";
import FilterSection from "@/features/case-studies/sections/FilterSection";
import DimaSection from "@/features/case-studies/sections/DimaSection";
import RequestDemoSection from "@/components/shared/form/RequestDemoSection";
import JsonLd from "@/components/shared/JsonLd";

import type { Metadata } from "next";

import { buildLocalizedMetadata } from "@/lib/seo";
import { getLocale } from "next-intl/server";
import { fetchCaseStudiesByPageNumber, getCaseStudiesCount } from "@/lib/firebase/caseStudiesFunctions";
import { getCaseStudiesPageJsonLd } from "@/lib/jsonLd";

type CaseStudiesPageProps = {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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

const PAGE_SIZE = 6;

export default async function CaseStudiesPage({ searchParams }: CaseStudiesPageProps) {
    const locale = await getLocale();
    const resolvedSearchParams = await searchParams;

    // 1. Parse URL Parameters
    const pageQuery = resolvedSearchParams?.page;
    const parsedPage = typeof pageQuery === "string" ? parseInt(pageQuery, 10) : 1;
    const requestedPage = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

    const defaultType = locale === "ar" ? "الكل" : "all";
    const currentType = typeof resolvedSearchParams?.type === "string"
        ? resolvedSearchParams.type
        : defaultType;

    // 2. Fetch Data
    const totalCount = await getCaseStudiesCount(currentType);
    const totalPages = totalCount > 0 ? Math.ceil(totalCount / PAGE_SIZE) : 1;
    const validCurrentPage = Math.min(requestedPage, totalPages);

    const caseStudies = await fetchCaseStudiesByPageNumber(locale, validCurrentPage, PAGE_SIZE, currentType);
    const caseStudiesJsonLd = await getCaseStudiesPageJsonLd(caseStudies);


    return (
        <main>
            <JsonLd data={[caseStudiesJsonLd]} />
            <HeroSection />
            <LogoCarousel />
            <FilterSection
                caseStudies={caseStudies}
                currentPage={validCurrentPage}
                totalPages={totalPages}
                currentType={currentType}
            />
            <DimaSection />
            <RequestDemoSection />
        </main>
    );
}
