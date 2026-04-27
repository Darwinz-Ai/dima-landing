import { getTranslations } from "next-intl/server";

import SectionWrapper from "@/components/shared/SectionWrapper"
import CoFounderCard from "../components/cards/CoFounderCard"
import MembersCarousel from "../components/carousels/MembersCarousel";

const getTranslatedDescription = (t: Awaited<ReturnType<typeof getTranslations>>) => {
    return [
        {
            name: "Mohy Aboualam",
            title: "Co-founder & CEO",
            description: t("mohy"),
            url: "https://www.linkedin.com/in/maboualam/",
            image: "/about-us/mohy.png"
        },
        {
            name: "Emad El Azhary",
            title: "Co-founder",
            description: t("emad"),
            url: "https://www.linkedin.com/in/emad-elazhary-83a5631/",
            image: "/about-us/emad.png"
        },
    ]

}

const TeamSection = async () => {
    const t = await getTranslations("AboutUs.team")
    const foundersInfo = getTranslatedDescription(t);
    return (
        <>
            <SectionWrapper className="space-y-12">
                <header>
                    <h2 className="text-[24px] md:text-[44px] font-normal text-center leading-tight max-w-4xl capitalize">
                        {t("title")}
                    </h2>
                </header>

                <div className="flex flex-col md:flex-row items-center gap-16">
                    {foundersInfo.map((founder) => (
                        <CoFounderCard key={founder.name} founder={founder} />
                    ))}
                </div>
            </SectionWrapper>

            <MembersCarousel />
        </>
    )
}

export default TeamSection