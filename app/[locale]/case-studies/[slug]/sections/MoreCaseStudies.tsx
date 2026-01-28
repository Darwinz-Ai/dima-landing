"use client";
import SectionWrapper from "@/components/shared/SectionWrapper";
import CaseStudyCard from "../../components/CaseStudyCard";
import CaseStudyCardSkeleton from "../../components/CaseStudyCardSkeleton";
import { useCaseStudies } from "../../hooks/useCaseStudies";
import { useTranslations } from "next-intl";

const MORE_CASES_LIMIT = 2;

function MoreCaseStudies() {
    const t = useTranslations("CaseStudy")
    const { data: moreCases, isLoading, isError } = useCaseStudies(MORE_CASES_LIMIT);

    if (isError) return null;

    const placeholders = Array.from({ length: MORE_CASES_LIMIT }, (_, idx) => (
        <li key={`case-study-skeleton-${idx}`}>
            <CaseStudyCardSkeleton />
        </li>
    ));

    return (
        <SectionWrapper>
            <div className="container mx-auto flex flex-col justify-center items-center">
                <ul className="grid grid-cols-1 xl:grid-cols-3 gap-8 w-full">
                    <li>
                        <h4 className="uppercase font-mono  ">{t("moreCases")}</h4>
                        <div className="h-0.5 bg-muted w-[40%]"></div>
                    </li>
                    {isLoading
                        ? placeholders
                        : moreCases?.map((caseStudy) => (
                            <li key={caseStudy.id}>
                                <CaseStudyCard {...caseStudy} />
                            </li>
                        ))}
                </ul>
            </div>
        </SectionWrapper>
    );
}

export default MoreCaseStudies;