import SectionWrapper from "@/components/shared/SectionWrapper"
import AudienceBadge from "../components/AudienceBadge"

const ServingCustomersSection = () => {
    return (
        <SectionWrapper className="space-y-8">
            <header>
                <h2 className="text-[24px] md:text-[44px] font-normal text-center leading-tight max-w-4xl">
                    Serving Customers Across
                    <span className="text-primary"> 31 </span>
                    Countries in Middle East and North Africa
                </h2>
            </header>

            <div className="flex flex-wrap justify-center items-center gap-4 max-w-3xl">
                {[0, 1, 2, 3, 4].map((_, i) => (
                    <AudienceBadge key={i} />
                ))}
            </div>
        </SectionWrapper>
    )
}

export default ServingCustomersSection