import ConnectSection from "./sections/ConnectSection"
import ForTheRegionSection from "./sections/ForTheRegionSection"
import HeroSection from "./sections/HeroSection"
import MapSection from "./sections/MapSection"
import ServingCustomersSection from "./sections/ServingCustomersSection"
import SolutionsSection from "./sections/SolutionsSection"
import TeamSection from "./sections/TeamSection"

const AboutUsPage = () => {
    return (
        <main>
            {/* json ld here */}

            <HeroSection />
            {/* <SolutionsSection /> */}
            <ForTheRegionSection />
            <ServingCustomersSection />
            <MapSection />
            <TeamSection />
            <ConnectSection />
        </main>
    )
}

export default AboutUsPage