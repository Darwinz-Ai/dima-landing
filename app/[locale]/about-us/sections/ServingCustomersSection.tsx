import SectionWrapper from "@/components/shared/SectionWrapper"
import { Button } from "@/components/ui/button"

const audience = ["marketing teams", "communication specialists", "PR professionals", "agencies", "enterprises"]

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

            <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
                {audience.map((a) => (
                    <Button key={a} size="lg" variant="secondary" className="capitalize font-normal w-[calc(33.33%-1rem)] pointer-events-none">{a}</Button>
                ))}
            </div>
        </SectionWrapper>
    )
}

export default ServingCustomersSection