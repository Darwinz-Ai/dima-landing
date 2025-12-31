"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, easeOut, useInView } from "motion/react";

type CounterPercentageProps = {
    number: number;
    text: string;
    className?: string;
};

function CounterPercentage({ number, text, className }: CounterPercentageProps) {
    const count = useMotionValue(0);
    const rounded = useTransform(() => Math.round(count.get()));
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, number, { duration: 3, ease: easeOut });
            return () => controls.stop();
        }
    }, [isInView, number, count]);

    return (
        <div ref={ref} className={`flex flex-col justify-center items-center gap-4 px-6 py-8 rounded-2xl bg-muted lg:bg-white ${className}`}>
            <span className="text-[26px] md:text-[30px] lg:text-[44px] font-extrabold text-primary">
                <motion.span className="text-black">{rounded}</motion.span>%
            </span>
            <p className="text-lg md:text-[20px] lg:text-[22px] font-medium text-center">{text}</p>
        </div>

    );
}

export default CounterPercentage;
