"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroImage() {
    const containerRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        gsap.fromTo(
            imageRef.current,
            { opacity: 0, scale: 1.05, filter: "blur(10px)", y: 20 },
            { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1.2, ease: "power3.out", delay: 0.2 }
        );

    }, { scope: containerRef });

    return (
        <figure
            ref={containerRef}
            className="relative w-full lg:flex-1 h-auto min-h-[300px] sm:min-h-[400px] md:min-h-[550px] perspective-[1000px]"
        >
            <Image
                ref={imageRef}
                src={`/hero-bg.png`}
                alt="dima Dashboard"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 50vw"
                priority={true}
                fetchPriority="high"
                className="object-contain"
            />
        </figure>
    );
}