"use client";
import RequestDemoButton from '@/components/shared/form/RequestDemoButton';
import { heroSlides } from '@/data/home-page';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'
import Typewriter from "typewriter-effect";

const TypewriterComponent = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const t = useTranslations("Home.hero");
    const locale = useLocale();
    const isRTL = locale === "ar";

    const slides = heroSlides.map((slide) => ({
        title: t(slide.translationKey),
        image: slide.image,
    }));

    useEffect(() => {
        const interval = setInterval(() => {
            setSelectedIndex((prev) => (prev + 1) % slides.length);
        }, 4000)

        return () => {
            clearInterval(interval);
        }
    }, [slides.length])
    return (
        <div className="flex-1 space-y-6 w-full">
            <h1 className="text-[24px] md:text-[44px] mb-8 min-h-32 md:min-h-[198px] lg:min-h-[264px] xl:min-h-[198px] 2xl:min-h-[132px]">
                <span>{t("titlePrefix")}</span>{" "}
                <Typewriter
                    options={{
                        strings: [slides[selectedIndex].title],
                        autoStart: true,
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
                    component={"span"}
                />
            </h1>
            <RequestDemoButton size={"xl"} />
        </div>
    )
}

export default TypewriterComponent