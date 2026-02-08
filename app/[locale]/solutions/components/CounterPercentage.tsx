"use client";
import { useEffect, useRef, useState } from "react";
import { m, useMotionValue, useTransform, animate, easeOut, useInView } from "motion/react";

type CounterPercentageProps = {
    number: number;
    text: string;
    className?: string;
};

function CounterPercentage({ number, text, className }: CounterPercentageProps) {
    const [mounted, setMounted] = useState<boolean>(false);
    const count = useMotionValue(0);
    const rounded = useTransform(() => Math.round(count.get()));
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        setMounted(true)
        if (isInView) {
            const controls = animate(count, number, { duration: 3, ease: easeOut });
            return () => controls.stop();
        }
    }, [isInView, number, count]);

    return (
        <div ref={ref} className={`flex flex-col justify-center items-center gap-4 px-6 py-8 rounded-2xl bg-muted lg:bg-white ${className}`}>
            <span className="text-[26px] md:text-[30px] lg:text-[44px] font-extrabold text-primary">
                <m.span className="text-black">{!mounted ? number : rounded}</m.span>%
            </span>
            <p className="text-lg md:text-[20px] lg:text-[22px] font-medium text-center">{text}</p>
        </div>

    );
}

export default CounterPercentage;
