import { getTranslations } from "next-intl/server"

import SectionWrapper from "@/components/shared/SectionWrapper"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"
import { SERVING_COUNTRIES } from "@/data/about-us"


const ServingCustomersSection = async () => {
    const t = await getTranslations("AboutUs.servingCustomers")
    const audiences = t.raw("audiences") as string[];
    return (
        <SectionWrapper className="space-y-8">
            <header>
                <h2 className="text-[24px] md:text-[44px] font-normal text-center leading-tight max-w-4xl">
                    {t("prefix")}
                    <span className="text-primary"> {SERVING_COUNTRIES.length} </span>
                    {t("suffix")}
                </h2>
            </header>

            <div className="grid grid-cols-6 gap-4 max-w-3xl mx-auto">
                {audiences.map((a, index) => (
                    <Button
                        key={a}
                        variant="secondary"
                        className={cn("capitalize font-normal pointer-events-none col-span-2",
                            "text-[8px] sm:text-sm md:text-base px-4",
                            index === 3 && "col-start-2"
                        )}
                    >
                        {a}
                    </Button>
                ))}
            </div>
        </SectionWrapper>
    )
}

export default ServingCustomersSection