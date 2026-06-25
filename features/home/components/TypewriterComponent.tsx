"use client";
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from "@gsap/react";
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
    const cursorRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useGSAP(() => {
        if (!isMounted) return;
        gsap.registerPlugin(TextPlugin);

        // 1. Entrance Reveal
        gsap.from(".hero-element", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });

        // 2. Blinking Cursor
        gsap.to(cursorRef.current, {
            opacity: 0,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            duration: 0.4
        });

        // 3.  Typewriter Loop
        const tl = gsap.timeline({ repeat: -1, delay: 1 }); // Wait for the entrance reveal

        slides.forEach((slide) => {
            // Write text
            tl.to(textRef.current, {
                duration: slide.length * 0.05,
                text: { value: slide, rtl: false },
                ease: "none"
            })
                .to({}, { duration: 2.5 }) // Pause

                // Delete text
                .to(textRef.current, {
                    duration: slide.length * 0.02,
                    text: { value: "", rtl: true },
                    ease: "none"
                });
        });

    }, { scope: container, dependencies: [slides, isMounted] });

    return (
        <div ref={container} className="flex-1 space-y-6 w-full">
            <h1 className="hero-element text-[24px] md:text-[44px] mb-8 min-h-32 md:min-h-[198px] lg:min-h-[264px] xl:min-h-[264px] 2xl:min-h-[198px]">
                <span>{t("titlePrefix")}</span>{" "}
                {isMounted ? (
                    <>
                        <span ref={textRef} className="text-primary"></span>
                    </>
                ) : (
                    <>
                        <span className='text-primary'>{slides[0]}</span>
                    </>
                )}
                <span ref={cursorRef} className="font-light text-foreground ml-0.5">|</span>
            </h1>

            <div className="hero-element">
                <RequestDemoButton size={"xl"} location='Home_hero' />
            </div>
        </div>
    );
}

export default TypewriterComponent;