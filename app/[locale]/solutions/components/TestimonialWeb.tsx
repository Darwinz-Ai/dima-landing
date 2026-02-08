import { testimonialAssets } from "@/data/solutions";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";


function TestimonialWeb({ slug }: { slug: string }) {
    const t = useTranslations(`Solutions.${slug}.testimonial`)
    const assets = testimonialAssets[slug];
    const locale = useLocale();
    const isRTL = locale === "ar";
    return (
        <div className="container mx-auto hidden md:flex flex-col lg:flex-row justify-center items-stretch gap-8 px-4 sm:px-6 lg:px-8 ">
            {/* Text Section */}
            <div className="flex-1 flex flex-col sm:flex-row gap-6 sm:gap-8 text-center sm:text-left order-2 lg:order-1">
                {/* Quote image */}
                <figure className="flex justify-center sm:justify-start items-start shrink-0">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/dima-landing.firebasestorage.app/o/Solutions%2FTestimonial%2Fquote-marks-solutions.png?alt=media&token=f15801a5-6250-4d4e-9490-0afb97e2d9fc"
                        alt="quote marks"
                        width={70}
                        height={60}
                        className="sm:w-[89px] sm:h-[73px]"

                    />
                </figure>

                {/* Text */}
                <div className={`flex-1 flex flex-col justify-between ${isRTL ? "text-right" : "text-left"}`}>
                    <h2 className="text-[22px] lg:text-[40px] font-medium capitalize mb-4 leading-snug">
                        {t("title")}
                    </h2>
                    <p className="text-lg sm:text-[22px] font-medium leading-relaxed">
                        “{t("quote")}”
                    </p>

                    {/* Quotee */}
                    <div className="flex flex-row items-center sm:items-center sm:gap-4 mt-6 sm:mt-8">
                        <figure className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-0">
                            <Image
                                src={assets.companyLogo}
                                alt="wadi degla logo"
                                fill
                                sizes="(max-width: 640px) 64px, 80px"
                                className="object-contain"

                            />
                        </figure>

                        <div className="flex-1">
                            <p className="font-medium text-lg sm:text-xl">
                                {t("name")}
                            </p>
                            <p className="text-primary text-sm font-bold">
                                {t("jobRole")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Section */}
            <figure
                className="relative flex-1 h-64 sm:h-80 md:h-[400px] lg:h-[468px] order-1 lg:order-2">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/dima-landing.firebasestorage.app/o/Solutions%2FTestimonial%2Ftestimonial-image.png?alt=media&token=d0a324ab-4a0d-46ce-8467-93c9d659bcfb"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain"
                    alt="testimonial image"

                />
            </figure>
        </div>
    );
}

export default TestimonialWeb;