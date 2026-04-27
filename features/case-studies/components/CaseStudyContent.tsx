import { notFound } from "next/navigation";

import RequestDemoSection from "@/components/shared/form/RequestDemoSection";
import MoreCaseStudies from "@/features/case-studies/sections/case-study/MoreCaseStudies";
import StackedCardsSection from "@/features/case-studies/sections/case-study/StackedCardsSection";
import CaseContent from "@/features/case-studies/sections/case-study/CaseContent";

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