import { empoweringAgenciesInfo } from "@/data/home-page";
import SectionWrapper from "../../../../components/shared/SectionWrapper";
import EmpoweringAgenciesCard from "../components/EmpoweringAgenciesCard";
import { useTranslations } from "next-intl";

function EmpoweringAgenciesSection() {
    const t = useTranslations("Home.empoweringAgencies");
    return (
        <SectionWrapper className="flex flex-col justify-center items-center px-4 sm:px-8 md:px-16">
            <div className="container mx-auto space-y-6 md:space-y-14 bg-no-repeat bg-contain" >
                {/* Heading */}
                <h2 className="text-[24px] md:text-[44px] font-normal text-center leading-tight">
                    {t("titlePrefix")} &nbsp;
                    <span className="block text-primary">{t("titleSuffix")}</span>
                </h2>

                {/* Cards Grid */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
                    {empoweringAgenciesInfo.map((info) => (
                        <li key={info.title}>
                            <EmpoweringAgenciesCard {...info} />
                        </li>
                    ))}
                </ul>
            </div>
        </SectionWrapper>
    );
}

export default EmpoweringAgenciesSection;
