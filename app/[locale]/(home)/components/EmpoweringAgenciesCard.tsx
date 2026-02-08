import { EmpoweringAgenciesInfo } from "@/types";
import RadialGradientProgress from "./RadialGradientProgress";
import { getLocale, getTranslations } from "next-intl/server";

export default async function EmpoweringAgenciesCard({
    value,
    suffix,
    maxValue,
    translationKey,
    gapValue
}: EmpoweringAgenciesInfo) {
    const t = await getTranslations("Home.empoweringAgencies.cards")
    const locale = await getLocale();
    const isRTL = locale === "ar";
    return (
        <article className="w-full max-w-sm mx-auto h-full rounded-3xl shadow-md shadow-primary flex flex-col items-center gap-4 p-4 sm:p-6 bg-muted transition-transform duration-300 hover:scale-[1.02]">
            {/* Top section */}
            <div className={`flex flex-col sm:flex-row items-center gap-4 bg-muted-foreground/10 rounded-xl px-4 sm:px-5 py-4 w-full`}>
                <div className={`flex justify-center ${isRTL ? 'sm:justify-end' : 'sm:justify-start'}`}>
                    <RadialGradientProgress
                        progress={value}
                        size={100}
                        strokeWidth={16}
                        suffix={suffix}
                        maxValue={maxValue}
                        gapValue={gapValue}
                    />
                </div>
                <h3 className={`text-lg lg:text-2xl capitalize tracking-wide text-center ${isRTL ? 'sm:text-right' : 'sm:text-left'}`}>
                    {t(`${translationKey}.title`)}
                </h3>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-center leading-relaxed px-2 sm:px-4">
                {t(`${translationKey}.description`)}
            </p>
        </article>
    );
}
