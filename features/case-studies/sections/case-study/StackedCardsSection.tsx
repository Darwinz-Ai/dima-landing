import { useLocale } from "next-intl";

import LayeredCard from "@/features/case-studies/components/cards/LayeredCard";
import SectionWrapper from "@/components/shared/SectionWrapper";

import { CaseStudy } from "@/types";

function StackedCardsSection({ caseStudy }: { caseStudy: CaseStudy }) {
    const locale = useLocale();
    const isRTL = locale === "ar";
    return (
        <SectionWrapper className="mt-24">
            <div className="container mx-auto flex flex-col justify-center items-center gap-8 bg-[#053659] text-white p-6 sm:p-10 lg:p-16 rounded-4xl min-h-[500px] z-0">
                <div className={`flex flex-col justify-center gap-10 lg:gap-12 ${isRTL ? "lg:text-right" : "lg:text-left"}  w-full`}>
                    {/* Heading & Description */}
                    <div className="lg:mx-0 space-y-4">
                        <p className="text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed">
                            {caseStudy.content.type}
                        </p>
                        <h2 className="text-2xl sm:text-3xl lg:text-[40px]  leading-tight">
                            {caseStudy.content.title}
                        </h2>
                    </div>

                    {/* Layered Cards */}
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4 w-full ">
                        {caseStudy.content.metrics.map((data, i, arr) => {
                            const isLast = i === arr.length - 1;
                            return (
                                <li
                                    key={`${data.title}-${i}`}
                                    className={`flex justify-center ${isLast ? "col-span-2 md:col-span-1 h-[145px] md:h-auto" : ""}`}
                                >
                                    <LayeredCard {...data} index={i} isLast={isLast} />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </SectionWrapper>

    );
}

export default StackedCardsSection;
