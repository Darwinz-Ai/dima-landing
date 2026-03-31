import SectionWrapper from "@/components/shared/SectionWrapper"
import CoFounderCard from "../components/CoFounderCard"
import TeamCarousel from "../components/TeamCarousel"


const TeamSection = () => {
    return (
        <>
            <SectionWrapper className="space-y-8">
                <header>
                    <h2 className="text-[24px] md:text-[44px] font-normal text-center leading-tight max-w-4xl capitalize">
                        The team behind TheDar.AI
                    </h2>
                </header>

                <div className="flex items-center gap-16">
                    <CoFounderCard />
                    <CoFounderCard />
                </div>
            </SectionWrapper>

            <TeamCarousel />
        </>
    )
}

export default TeamSection