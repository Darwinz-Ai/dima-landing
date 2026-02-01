
import SectionWrapper from "@/components/shared/SectionWrapper";
import CaseStudyCard from "../../components/CaseStudyCard";
import { fetchCaseStudies } from "@/lib/firebase/caseStudiesFunctions";
import { getLocale, getTranslations } from "next-intl/server";

const MORE_CASES_LIMIT = 2;

async function MoreCaseStudies() {
    const t = await getTranslations("CaseStudy")
    const locale = await getLocale()

    try {
        const moreCases = await fetchCaseStudies(locale, undefined, MORE_CASES_LIMIT);
        return (
            <SectionWrapper>
                <div className="container mx-auto flex flex-col justify-center items-center">
                    <ul className="grid grid-cols-1 xl:grid-cols-3 gap-8 w-full">
                        <li>
                            <h4 className="uppercase font-mono  ">{t("moreCases")}</h4>
                            <div className="h-0.5 bg-muted w-[40%]"></div>
                        </li>
                        {
                            moreCases?.map((caseStudy) => (
                                <li key={caseStudy.id}>
                                    <CaseStudyCard {...caseStudy} />
                                </li>
                            ))}
                    </ul>
                </div>
            </SectionWrapper>
        );
    } catch (error: any) {
        return null
    }

}

export default MoreCaseStudies;