import SectionWrapper from "@/components/shared/SectionWrapper";
import { getTranslations } from "next-intl/server";

async function HeroSection() {
    const t = await getTranslations("CaseStudies");
    return (
        <SectionWrapper className="mt-24">
            <div className="container mx-auto flex flex-col justify-center items-center gap-8 ">
                {/* Heading */}
                <h1 className="text-2xl lg:text-[66px] text-center font-bold text-[#282943]">{t("title")}</h1>
                <h2 className="text-lg lg:text-2xl text-center max-w-3xl">{t("description")}</h2>
            </div>
        </SectionWrapper>
    );
}

export default HeroSection;