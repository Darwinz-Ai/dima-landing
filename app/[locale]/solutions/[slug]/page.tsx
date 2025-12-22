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

type SolutionPageParams = {
    slug: string;
    locale: string;
};

type SolutionPageProps = {
    params: Promise<SolutionPageParams>;
};

// List of valid slugs and their metadata
const SOLUTIONS_METADATA: Record<
    string,
    { image: string }
> = {
    "social-listening-analytics": {
        image: "https://thedar.ai/og/solutions/sl.png",
    },
    "pr-comms": {
        image: "https://thedar.ai/og/solutions/pr.png",
    },
    "market-insights": {
        image: "https://thedar.ai/og/solutions/mi.png",
    },
    "consumer-insights": {
        image: "https://thedar.ai/og/solutions/ci.png",
    },
    "own-page-intelligence": {
        image: "https://thedar.ai/og/solutions/oi.png",
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
            metadataBase: new URL(`https://thedar.ai/solutions/${slug}`),
            openGraph: {
                title: undefined,
                description: undefined,
                type: "article",
                url: `https://thedar.ai/solutions/${slug}`,
                images: [
                    {
                        url: solutionMeta.image,
                        width: 1200,
                        height: 630,
                        alt: undefined,
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: undefined,
                description: undefined,
                images: [solutionMeta.image],
            },
            alternates: {
                canonical: `https://thedar.ai/solutions/${slug}`,
                languages: {
                    "en-US": `https://thedar.ai/en/solutions/${slug}`,
                    "ar-SA": `https://thedar.ai/ar/solutions/${slug}`,
                }
            },
        },
    });
}

// ---------------------------
// Page Component
// ---------------------------
async function SolutionPage({ params }: SolutionPageProps) {
    const { slug } = await params;
    const exists = await checkSlugExists(slug);
    if (!exists) return notFound();

    return (
        <main>
            <HeroSection slug={slug} />
            <ExpandingCardsSection slug={slug} />
            <ScrollingSection slug={slug} />
            <CardsGrid slug={slug} />
            <TestimonialSection slug={slug} />
            <RequestDemoSection />
            <QuestionsAnsweredSection slug={slug} />
        </main>
    );
}

export default SolutionPage;
