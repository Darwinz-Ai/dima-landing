import { TestimonialType } from "@/types";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

function TestimonialCard({ companyLogo, translationKey }: TestimonialType) {
    const locale = useLocale();
    const isRTL = locale === 'ar';
    const t = useTranslations("Home.testimonials.items")
    return (
        <article className="w-[340px] h-[460px] relative flex flex-col p-6 bg-white rounded-xl shadow-md mx-1 my-8">
            <div className={`flex gap-4 items-start ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                <figure className="relative w-6 h-6 shrink-0">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/dima-landing.firebasestorage.app/o/HomePage%2FTestimonials%2Fopen-quote.svg?alt=media&token=4c89236c-9543-47e7-ad6d-fa8f95b58aa9"
                        alt="open quotes"
                        fill
                        sizes="24px"
                        className={`object-contain ${isRTL ? 'rotate-180' : ''}`}

                    />
                </figure>
                <p className="text-sm leading-relaxed"><bdi>{t(`${translationKey}.quote`)}</bdi></p>
            </div>

            <div className={`mt-auto pt-6 flex justify-between items-center ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <div>
                    <h3 className="font-medium text-base">{t(`${translationKey}.name`)}</h3>
                    <p className="text-muted-foreground text-sm"><bdi>{t(`${translationKey}.jobRole`)}</bdi></p>
                </div>
                <figure className="w-[120px] h-[60px] flex items-center justify-center">
                    <Image
                        src={companyLogo}
                        alt={translationKey}
                        width={120}
                        height={60}
                        className="object-contain"

                    />
                </figure>

            </div>
        </article>
    );
}

export default TestimonialCard;
