import { getTranslations } from "next-intl/server"

import SectionWrapper from "@/components/shared/SectionWrapper"
import { Button } from "@/components/ui/button"


const ServingCustomersSection = async () => {
    const t = await getTranslations("AboutUs.servingCustomers")
    const audiences = t.raw("audiences") as string[];
    return (
        <SectionWrapper className="space-y-8">
            <header>
                <h2 className="text-[24px] md:text-[44px] font-normal text-center leading-tight max-w-4xl">
                    {t("prefix")}
                    <span className="text-primary"> 31 </span>
                    {t("suffix")}
                </h2>
            </header>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 max-w-3xl mx-auto">
                {audiences.map((a) => (
                    <Button key={a} size="lg" variant="secondary" className="capitalize font-normal md:w-[calc(33.33%-1rem)] pointer-events-none">{a}</Button>
                ))}
            </div>
        </SectionWrapper>
    )
}

export default ServingCustomersSection