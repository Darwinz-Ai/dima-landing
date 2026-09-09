import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import PaginationWrapper from "../components/ui/PaginationWrapper";
import CaseStudyCard from "../components/cards/CaseStudyCard";
import { CaseStudy } from "@/types";

type FiltersSectionProps = {
    caseStudies: CaseStudy[];
    currentPage: number;
    totalPages: number;
    currentType: string;
};

export default function FilterSection({ caseStudies, currentPage, totalPages, currentType }: FiltersSectionProps) {
    const t = useTranslations("CaseStudies");

    console.log("case studies:", caseStudies);

    return (
        <SectionWrapper>
            <div id="case-studies-grid" className="container mx-auto flex flex-col justify-center items-center gap-8 scroll-mt-24">

                {/* Scrollable Filter Links */}
                <div className="md:flex justify-center py-4">
                    <ul className="flex items-center gap-4 w-max px-4">
                        {(t.raw("typeFilter") as string[]).map((text) => {
                            const isSelected = currentType === text;
                            // Clicking a filter always resets to page 1
                            const href = `?type=${encodeURIComponent(text)}#case-studies-grid`;

                            return (
                                <li key={text} className="shrink-0">
                                    <Button
                                        asChild
                                        size="sm"
                                        className="md:hidden capitalize"
                                        variant={isSelected ? "default" : "outline"}
                                    >
                                        <Link href={href}>{text}</Link>
                                    </Button>
                                    <Button
                                        asChild
                                        size="lg"
                                        className="hidden md:flex capitalize"
                                        variant={isSelected ? "default" : "outline"}
                                    >
                                        <Link href={href}>{text}</Link>
                                    </Button>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Case Studies Grid */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16 w-full">
                    {caseStudies.length === 0 && (
                        <p className="col-span-full text-center text-lg">No case studies found for this category.</p>
                    )}
                    {caseStudies.map((caseStudy) => (
                        <li key={caseStudy.id}>
                            <CaseStudyCard {...caseStudy} />
                        </li>
                    ))}
                </ul>

                {/* Pagination */}
                {caseStudies.length > 0 && (
                    <PaginationWrapper
                        currentPage={currentPage}
                        totalPages={totalPages}
                        currentType={currentType}
                    />
                )}
            </div>
        </SectionWrapper>
    );
}