import SocialMediaLinksList from "@/components/shared/footer/SocialMediaLinks"
import SectionWrapper from "@/components/shared/SectionWrapper"
import ConnectCarousel from "../components/ConnectCarousel"


const ConnectSection = () => {
    return (
        <SectionWrapper className="space-y-8">
            <header>
                <h2 className="text-[24px] md:text-[44px] font-normal text-center leading-tight max-w-4xl capitalize">
                    connect with us
                </h2>

            </header>

            <SocialMediaLinksList />

            <ConnectCarousel items={[1, 2, 3]} />
        </SectionWrapper>
    )
}

export default ConnectSection