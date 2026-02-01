import SectionWrapper from "../../../../components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import CaseStudyCard from "../../case-studies/components/CaseStudyCard";
import { fetchCaseStudies } from "@/lib/firebase/caseStudiesFunctions";
import { getLocale, getTranslations } from "next-intl/server";

async function CaseStudiesSection() {
    const t = await getTranslations("Home.caseStudies");
    const locale = await getLocale()
    try {
        const caseStudies = await fetchCaseStudies(locale, undefined, 4);
        return (
            <SectionWrapper>
                <div className="container mx-auto max-w-5xl flex flex-col gap-6">
                    <h2 className="text-[24px] lg:text-[44px] font-normal text-center">{t("title")}</h2>
                    <p className="text-base lg:text-lg lg:font-light text-muted-foreground text-center">{t("description")}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted p-3 rounded-xl">
                        {
                            caseStudies && caseStudies?.map((caseStudy) => (
                                <li key={caseStudy.id}>
                                    <CaseStudyCard {...caseStudy} />
                                </li>
                            ))
                        }
                    </ul>
                    <div className="flex justify-center items-center">
                        <Link href="/case-studies">
                            <Button variant="outline" size="lg">{t("cta")}</Button>
                        </Link>
                    </div>
                </div>
            </SectionWrapper>
        );
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
        return <p>Error: {errorMessage}</p>
    }

}

export default CaseStudiesSection;