import SectionWrapper from "../../../../components/shared/SectionWrapper";
import SolutionCard from "../components/SolutionCard";
import RequestDemoButton from "../../../../components/shared/form/RequestDemoButton";
import { dimaSolutions } from "@/data/home-page";
import { getTranslations } from "next-intl/server";

async function DimaSuiteSection() {
    const t = await getTranslations("Home.dimaSuite");
    return (
        <SectionWrapper>
            <div className="container mx-auto flex flex-col justify-center items-center">
                <h2 className="text-[24px] lg:text-[44px] font-normal text-center mb-4">
                    {t("title")}
                </h2>
                <RequestDemoButton size="xl" />

                <ul className="flex flex-wrap justify-center gap-12 mt-12">
                    {dimaSolutions.map((solution) => (
                        <li key={solution.href} className="w-full min-h-[246.5px] md:w-[275px] md:h-[279.5px]">
                            <SolutionCard
                                {...solution}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </SectionWrapper>
    );
}

export default DimaSuiteSection;
