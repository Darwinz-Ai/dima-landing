"use client";
import { useEffect, useState, useMemo } from "react";
import TestimonialCard from "./TestimonialCard";
import { useLocale } from "next-intl";
import { TestimonialType } from "@/types";

type Props = {
    items: TestimonialType[];
    autoplay?: boolean;
    interval?: number;
};

export default function TestimonialCarousel({
    items,
    autoplay = true,
    interval = 3500,
}: Props) {
    const locale = useLocale();
    const isRTL = locale === "ar";
    const [mounted, setMounted] = useState(false);

    // Duplicate list for smooth infinite looping
    const cards = useMemo(() => [...items], [items]);

    const [active, setActive] = useState(0);

    // Auto-rotation
    useEffect(() => {
        setMounted(true);
        if (!autoplay) return;
        const t = setInterval(() => {
            setActive((p) => (p + 1) % cards.length);
        }, interval);
        return () => clearInterval(t);
    }, [cards.length, autoplay, interval]);

    // if (!mounted) return null;

    const getPosition = (index: number) => {
        const len = cards.length;

        // distance relative to active card
        let diff = (index - active + len) % len;
        if (isRTL) diff = (active - index + len) % len;

        switch (diff) {
            case 0:
                return "center";
            case 1:
                return "right";
            case 2:
                return "far-right";
            case len - 1:
                return "left";
            case len - 2:
                return "far-left";
            default:
                return "hidden";
        }
    };

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden select-none">
            {cards.map((card, index) => (
                <div
                    key={index}
                    onClick={() => setActive(index)}
                    className={`absolute transition-all duration-500 ease-out ${getPosition(index)}`}
                >
                    <TestimonialCard {...card} />
                </div>
            ))}

            {/* Positioning & Animations */}
            <style jsx>
                {`.center {
  transform: translateX(0) scale(1);
  z-index: 30;
}

.left {
  transform: translateX(-240px) scale(0.9);
  z-index: 20;
}
.right {
  transform: translateX(240px) scale(0.9);
  z-index: 20;
}

.far-left {
  transform: translateX(-440px) scale(0.8);
  z-index: 10;
}
.far-right {
  transform: translateX(440px) scale(0.8);
  z-index: 10;
}

@media (max-width: 1024px) {
  .left { transform: translateX(-200px) scale(0.9); }
  .right { transform: translateX(200px) scale(0.9); }
  .far-left { transform: translateX(-360px) scale(0.8); }
  .far-right { transform: translateX(360px) scale(0.8); }
}

@media (max-width: 640px) {
  .left { transform: translateX(-150px) scale(0.9); }
  .right { transform: translateX(150px) scale(0.9); }
  .far-left { transform: translateX(-260px) scale(0.8); }
  .far-right { transform: translateX(260px) scale(0.8); }
}
            `}
            </style>
        </div>
    );
}
