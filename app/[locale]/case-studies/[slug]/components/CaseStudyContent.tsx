import StackedCardsSection from "../sections/StackedCardsSection";
import CaseContent from "../sections/CaseContent";
import MoreCaseStudies from "../sections/MoreCaseStudies";
import { notFound } from "next/navigation";
import RequestDemoSection from "@/components/shared/form/RequestDemoSection";
import { fetchSingleCaseStudy } from "@/lib/firebase/caseStudiesFunctions";
import { getLocale } from "next-intl/server";


async function CaseStudyContent({ slug }: { slug: string }) {
    try {
        const locale = await getLocale();
        const caseStudy = await fetchSingleCaseStudy(locale, slug)
        return (
            <article>
                <StackedCardsSection caseStudy={caseStudy} />
                <CaseContent caseStudy={caseStudy} />
                <MoreCaseStudies />
                <RequestDemoSection />
            </article>
        );
    } catch (error) {
        return notFound()
    }
}

export default CaseStudyContent;