import { Metadata } from "next";
import CaseStudyContent from "./components/CaseStudyContent";
import { fetchSingleCaseStudy } from "@/lib/firebase/caseStudiesFunctions";

type SingleViewCaseStudiesPageProps = {
    params: Promise<{ slug: string, locale: string }>
}

// Metadata
export async function generateMetadata(
    { params }: SingleViewCaseStudiesPageProps
): Promise<Metadata> {
    try {
        const { slug, locale } = await params;

        const caseStudy = await fetchSingleCaseStudy(locale, slug);

        return {
            title: `${caseStudy.content.title} - dima`,
            description: caseStudy.content.description,
            metadataBase: new URL("https://thedar.ai"),
            openGraph: {
                title: `${caseStudy.content.title} - dima`,
                description: caseStudy.content.description,
                url: `https://thedar.ai/${locale}/case-studies/${slug}`,
                locale,
                siteName: "dima",
                images: [
                    {
                        url: caseStudy.ogImage || "/og/caseStudy.png",
                        width: 1200,
                        height: 630,
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                images: [caseStudy.ogImage || "/og/caseStudy.png"]
            },
            alternates: {
                canonical: `https://thedar.ai/${locale}/case-studies/${slug}`,
                languages: {
                    en: `https://thedar.ai/en/case-studies/${slug}`,
                    ar: `https://thedar.ai/ar/case-studies/${slug}`,
                    "x-default": `https://thedar.ai/case-studies/${slug}`
                }
            }
        };

    } catch (error) {
        return {
            title: "Case Study Not Found - dima",
            description: "The requested case study does not exist.",
            openGraph: {
                title: "Case Study Not Found - dima",
                description: "The requested case study does not exist.",
                images: ["/og/caseStudy.png"],
            },
        };
    }
}



async function SingleViewCaseStudiesPage({ params }: SingleViewCaseStudiesPageProps) {
    const slug = (await params).slug
    return (
        <main>
            <CaseStudyContent slug={slug} />
        </main>
    );
}

export default SingleViewCaseStudiesPage;