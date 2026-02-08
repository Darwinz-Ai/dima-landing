"use client";
import RequestDemoButton from '@/components/shared/form/RequestDemoButton';
import { heroSlides } from '@/data/home-page';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react'
import Typewriter from "typewriter-effect";

const TypewriterComponent = () => {
    const t = useTranslations("Home.hero");
    const locale = useLocale();
    const isRTL = locale === "ar";

    const slides = heroSlides.map((slide) => t(slide.translationKey));

    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, [])
    return (
        <div className="flex-1 space-y-6 w-full">
            <h1 className="text-[24px] md:text-[44px] mb-8 min-h-32 md:min-h-[198px] lg:min-h-[264px] xl:min-h-[198px] 2xl:min-h-[132px]">
                <span>{t("titlePrefix")}</span>{" "}

                {!mounted ? (
                    <>
                        <span className='text-primary'>{slides[0]}</span>
                        <span>|</span>
                    </>
                ) : (
                    <Typewriter
                        options={{
                            autoStart: true,
                            loop: true,
                            delay: isRTL ? 160 : 35,
                            deleteSpeed: isRTL ? 150 : 25,
                            wrapperClassName: "text-primary",
                            stringSplitter: (text: string) => {
                                if (isRTL) {
                                    const words = text.split(" ");
                                    return words.map(word => `${word} `)
                                }
                                return text.split("");
                            },
                        }}
                        onInit={(typewriter) => {
                            slides.forEach((slide) => {
                                typewriter
                                    .typeString(slide)
                                    .pauseFor(3000)
                                    .deleteAll()
                                    .start()
                            })
                        }}
                        component={"span"}
                    />
                )}
            </h1>
            <RequestDemoButton size={"xl"} />
        </div>
    )
}

export default TypewriterComponent