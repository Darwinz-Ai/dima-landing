import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { testimonialAssets } from "@/data/solutions";

function TestimonialMobile({ slug }: { slug: string }) {
    const t = useTranslations(`Solutions.${slug}.testimonial`)
    const assets = testimonialAssets[slug];
    const locale = useLocale();
    const isRTL = locale === "ar";
    return (
        <div className="container mx-auto flex flex-col gap-4 md:hidden">
            <div className="flex items-center gap-4">
                <figure className="flex justify-center sm:justify-start items-start shrink-0">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/dima-landing.firebasestorage.app/o/Solutions%2FTestimonial%2Fquote-marks-solutions.png?alt=media&token=f15801a5-6250-4d4e-9490-0afb97e2d9fc"
                        alt="quote marks"
                        width={40}
                        height={30}
                        className="sm:w-[89px] sm:h-[73px]"
                        quality={90}
                    />
                </figure>
                <h2 className="text-[22px] lg:text-[40px] font-medium capitalize leading-snug">
                    {t("title")}
                </h2>
            </div>

            <div className="flex flex-col gap-6 bg-muted rounded-2xl">
                {/* Quote */}
                <p className="text-lg sm:text-[22px] font-medium leading-relaxed p-4">
                    “{t("quote")}”
                </p>

                <div className="flex justify-between items-center">
                    {/* Quotee */}
                    <div className="flex flex-row items-center gap-4 px-4">
                        <figure className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-lg">
                            <Image
                                src={assets.companyLogo}
                                alt="wadi degla logo"
                                fill
                                sizes="(max-width: 640px) 64px, 80px"
                                className="object-contain"
                                quality={90}
                            />
                        </figure>

                        <div className="flex-1">
                            <p className="font-medium">
                                {t("name")}
                            </p>
                            <p className="text-primary text-sm font-bold">
                                {t("jobRole")}
                            </p>
                        </div>
                    </div>

                    {/* Quotation Mark image */}
                    <figure className={`flex justify-center sm:justify-start items-start shrink-0 bg-white relative w-20 h-20 p-12 ${isRTL ? "rounded-tr-2xl" : "rounded-tl-2xl"}`}>
                        <Image
                            src="https://firebasestorage.googleapis.com/v0/b/dima-landing.firebasestorage.app/o/Solutions%2FTestimonial%2Fquote-marks-solutions.png?alt=media&token=f15801a5-6250-4d4e-9490-0afb97e2d9fc"
                            alt="quote marks"
                            fill
                            sizes="80px"
                            className="object-contain p-4"
                            quality={90}
                        />
                    </figure>
                </div>
            </div>
        </div>
    );
}

export default TestimonialMobile;