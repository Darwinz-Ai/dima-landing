"use client";
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl';
import { useGSAP } from "@gsap/react"
import { TextPlugin } from 'gsap/all';

import RequestDemoButton from '@/components/shared/form/RequestDemoButton';

import gsap from 'gsap';

import { heroSlides } from '@/data/home-page';

const TypewriterComponent = () => {
    const t = useTranslations("Home.hero");
    const slides = heroSlides.map((slide) => t(slide.translationKey));
    const [isMounted, setIsMounted] = useState<boolean>(false);

    const container = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    useGSAP(() => {
        gsap.registerPlugin(TextPlugin);

        const tl = gsap.timeline({
            repeat: -1
        })

        slides.forEach((slide) => {
            // Write text
            tl.to(textRef.current, {
                duration: slide.length * 0.05,
                text: {
                    value: slide,
                    rtl: false
                },
                ease: "none"
            })
                .to({}, { duration: 2 }) // Pause

                // Delete text
                .to(textRef.current, {
                    duration: slide.length * 0.03,
                    text: {
                        value: "",
                        rtl: true,
                    },
                    ease: "none"
                })
        })

    }, { scope: container, dependencies: [slides] })

    return (
        <div ref={container} className="flex-1 space-y-6 w-full">
            <h1 className="text-[24px] md:text-[44px] mb-8 min-h-32 md:min-h-[198px] lg:min-h-[264px] xl:min-h-[264px] 2xl:min-h-[198px]">
                <span>{t("titlePrefix")}</span>{" "}
                {isMounted ? (
                    <span
                        ref={textRef}
                        className="text-primary"
                    ></span>
                ) : (
                    <span className='text-primary'>{slides[0]}</span>
                )}
                <span className='animate-pulse'>|</span>
            </h1>
            <RequestDemoButton size={"xl"} location='Home_hero' />
        </div>
    )
}

export default TypewriterComponent