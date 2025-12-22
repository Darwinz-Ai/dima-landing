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
            openGraph: {
                title: `${caseStudy.content.title} - dima`,
                description: caseStudy.content.description,
                url: `https://thedar.ai/case-studies/${slug}`,
                images: [
                    {
                        url: caseStudy.ogImage || "/og/caseStudy.png",
                        width: 1200,
                        height: 630,
                    },
                ],
            },
            alternates: {
                canonical: `https://thedar.ai/case-studies/${slug}`,
                languages: {
                    "en-US": `https://thedar.ai/en/case-studies/${slug}`,
                    "ar-SA": `https://thedar.ai/ar/case-studies/${slug}`,
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