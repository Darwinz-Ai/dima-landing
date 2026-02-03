"use client";
import { motion, useMotionValue, animate, useInView } from "motion/react";
import React, { useEffect, useState, useRef } from "react";

type RadialGradientProgressProps = {
    size?: number;
    strokeWidth?: number;
    progress?: number;
    innerColor?: string;
    outerColor?: string;
    trackColor?: string;
    textColor?: string;
    duration?: number;
    suffix?: string;
    maxValue?: number;
    gapValue?: number;
};

const formatNumber = (num: number, suffix?: string | React.ReactNode) => {
    if (suffix === "M") return `${(num / 1_000_000).toFixed(0)}M+`;
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M+`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K+`;
    return Math.round(num).toString() + "%";
};

const RadialGradientProgress: React.FC<RadialGradientProgressProps> = ({
    size = 120,
    strokeWidth = 20,
    progress = 75,
    innerColor = "#11A8CF",
    outerColor = "#95DDEE",
    trackColor = "#ffffff",
    textColor = "#1f2937",
    duration = 1.5,
    suffix = "%",
    maxValue = 100,
    gapValue = 0
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    // Calculating final offset
    const gap = gapValue * circumference;
    const finalOffset = circumference - (progress / maxValue) * (circumference - gap);

    // Initializing MotionValues with final values for ssr
    const offset = useMotionValue(finalOffset);
    const [displayValue, setDisplayValue] = useState(progress);
    const [mounted, setMounted] = useState<boolean>(false);


    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        setMounted(true);
        if (!isInView) return;

        offset.set(circumference);
        setDisplayValue(0);

        const offsetAnimation = animate(offset, finalOffset, {
            duration,
            ease: "easeInOut",
        });

        const numberAnimation = animate(0, progress, {
            duration,
            ease: "easeInOut",
            onUpdate: (latest) => setDisplayValue(latest),
        });

        return () => {
            offsetAnimation.stop();
            numberAnimation.stop();
        };
    }, [isInView, progress, finalOffset, circumference, duration, offset, maxValue]);

    return (
        <div
            ref={ref}
            className="relative flex items-center justify-center"
            style={{ width: size, height: size }}
        >
            <svg width={size} height={size} className="-rotate-90">
                <defs>
                    <radialGradient id="radialGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="85%" stopColor={innerColor} />
                        <stop offset="100%" stopColor={outerColor} />
                    </radialGradient>
                </defs>

                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={trackColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                />

                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="url(#radialGradient)"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                />
            </svg>

            <motion.span
                className="absolute font-bold text-xl inline-flex items-center gap-1"
                style={{ color: textColor }}
            >
                {mounted ? formatNumber(displayValue, suffix) : formatNumber(progress, suffix)}
            </motion.span>
        </div>
    );
};

export default RadialGradientProgress;
