import type { Metadata } from "next";
import ExpandingCardsSection from "../sections/ExpandingCardsSection";
import CardsGrid from "../sections/CardsGrid";
import HeroSection from "../sections/HeroSection";
import ScrollingSection from "../sections/ScrollingSection";
import TestimonialSection from "../sections/TestimonialSection";
import QuestionsAnsweredSection from "@/app/[locale]/(home)/sections/QuestionsAnsweredSection";
import { notFound } from "next/navigation";
import RequestDemoSection from "@/components/shared/form/RequestDemoSection";
import { buildLocalizedMetadata, SolutionsSeoKey } from "@/lib/seo";
import { getFAQJsonLd, getSolutionSchema } from "@/lib/jsonLd";
import JsonLd from "@/components/shared/JsonLd";
import { getTranslations } from "next-intl/server";
import { QuestionAccordion } from "@/types";

type SolutionPageParams = {
    slug: string;
    locale: string;
};

type SolutionPageProps = {
    params: Promise<SolutionPageParams>;
};

// List of valid slugs and their metadata
export const SOLUTIONS_METADATA: Record<
    string,
    {
        image: string,
        title: string,
        logoPath: string;
    }
> = {
    "social-listening-analytics": {
        image: "https://thedar.ai/og/solutions/sl.png",
        title: "Social Listening & Analytics",
        logoPath: "https://thedar.ai/nav-links/sl.svg"

    },
    "pr-comms": {
        image: "https://thedar.ai/og/solutions/pr.png",
        title: "PR & Comms",
        logoPath: "https://thedar.ai/nav-links/pr.svg"
    },
    "market-insights": {
        image: "https://thedar.ai/og/solutions/mi.png",
        title: "Market Insights",
        logoPath: "https://thedar.ai/nav-links/mi.svg"
    },
    "consumer-insights": {
        image: "https://thedar.ai/og/solutions/ci.png",
        title: "Consumer Insights",
        logoPath: "https://thedar.ai/nav-links/ci.svg"
    },
    "own-page-intelligence": {
        image: "https://thedar.ai/og/solutions/oi.png",
        title: "Own Page Intelligence",
        logoPath: "https://thedar.ai/nav-links/oi.svg"
    },
    "influencer-marketing": {
        image: "https://thedar.ai/og/solutions/oi.png",
        title: "Influencer Marketing",
        logoPath: "https://thedar.ai/nav-links/im.svg"
    },
};

// Check if a slug exists
const checkSlugExists = async (slug: string) => {
    return Object.keys(SOLUTIONS_METADATA).includes(slug);
};

// ---------------------------
// Dynamic Metadata Generator
// ---------------------------
export async function generateMetadata(
    { params }: { params: Promise<SolutionPageParams> }
): Promise<Metadata> {
    const { slug, locale } = await params;

    const exists = await checkSlugExists(slug);
    if (!exists) {
        return { title: "Solution Not Found" };
    }

    const solutionMeta = SOLUTIONS_METADATA[slug];

    return buildLocalizedMetadata(locale, `Solutions-${slug}` as SolutionsSeoKey, {
        overrides: {
            metadataBase: new URL(`https://thedar.ai/`),
            openGraph: {
                url: `https://thedar.ai/solutions/${slug}`,
                siteName: "TheDar.AI",
                locale,
                type: "article",
                images: [
                    {
                        url: solutionMeta.image,
                        width: 1200,
                        height: 630,
                        alt: `dima og image for ${slug}`
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                images: [solutionMeta.image],
            },
            alternates: {
                canonical: `https://thedar.ai/${locale}/solutions/${slug}`,
                languages: {
                    en: `https://thedar.ai/en/solutions/${slug}`,
                    ar: `https://thedar.ai/ar/solutions/${slug}`,
                    "x-default": `https://thedar.ai/solutions/${slug}`
                }
            },
        },
    });
}

// ---------------------------
// Page Component
// ---------------------------
async function SolutionPage({ params }: SolutionPageProps) {
    const { slug, locale } = await params;
    const exists = await checkSlugExists(slug);
    if (!exists) return notFound();

    const solutionMetadata = SOLUTIONS_METADATA[slug];

    const [breadcrumbsJsonLd, serviceJsonLd] = await getSolutionSchema(
        slug,
        locale,
        solutionMetadata.logoPath
    );

    const tSolutions = await getTranslations("Solutions");
    const faqs = (tSolutions.raw(`${slug}.faqs`) as QuestionAccordion[]) ?? [];
    const faqJsonLd = await getFAQJsonLd(faqs);

    return (
        <main>
            <JsonLd data={[breadcrumbsJsonLd, serviceJsonLd, faqJsonLd]} />

            <HeroSection slug={slug} />
            <ExpandingCardsSection slug={slug} />
            <ScrollingSection slug={slug} />
            <CardsGrid slug={slug} />
            <TestimonialSection slug={slug} />
            <RequestDemoSection />
            <QuestionsAnsweredSection faqs={faqs} />
        </main>
    );
}

export default SolutionPage;
