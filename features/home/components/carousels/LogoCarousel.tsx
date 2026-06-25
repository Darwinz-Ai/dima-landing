"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function LogoCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        if (!trackRef.current) return;

        tlRef.current = gsap.timeline({ repeat: -1 })
            .to(trackRef.current, {
                xPercent: -50, // Moves the track exactly halfway (hiding the first set of duplicated logos)
                duration: 30,
                ease: "none"
            });

    }, { scope: containerRef });

    const handleInteractiveHoverStates = () => {
        const container = containerRef.current;
        const tl = tlRef.current;
        if (!container || !tl) return;

        const handleMouseEnter = () => {
            //  Ease the timeScale (speed factor) down to 20% speed
            gsap.to(tl, { timeScale: 0.2, duration: 0.6, ease: "power2.out" });
        };

        const handleMouseLeave = () => {
            //  Ease the timeScale back to 100% normal speed
            gsap.to(tl, { timeScale: 1, duration: 0.6, ease: "power2.out" });
        };

        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            container.removeEventListener("mouseenter", handleMouseEnter);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };
    }

    useEffect(handleInteractiveHoverStates, []);

    return (
        /* Hides overflow and adds gradient fade masks to the edges */
        <div
            ref={containerRef}
            className="relative w-full overflow-hidden my-4 py-4
                       before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16 sm:before:w-28 before:bg-linear-to-r before:from-background before:to-transparent
                       after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16 sm:after:w-28 after:bg-linear-to-l after:from-background after:to-transparent"
        >
            {/* Infinite Marquee */}
            <div
                ref={trackRef}
                className="flex items-center gap-12 sm:gap-16 md:gap-20 w-max"
            >
                {[...Array(16), ...Array(16)].map((_, index) => {
                    const logoIndex = (index % 16) + 1;
                    return (
                        <div
                            key={index}
                            className="flex items-center justify-center h-16 sm:h-20 md:h-24 px-4 select-none"
                        >
                            <Image
                                src={`/logo-slider/${logoIndex}.webp`}
                                alt={`Partner Logo ${logoIndex}`}
                                width={140}
                                height={56}
                                className="object-contain w-auto max-h-full"
                                priority={index < 6}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}