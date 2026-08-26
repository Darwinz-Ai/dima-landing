"use client";
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    return Math.round(num).toString() + (typeof suffix === 'string' ? suffix : "%");
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
    const gap = gapValue * circumference;
    const finalOffset = circumference - (progress / maxValue) * (circumference - gap);

    const [displayValue, setDisplayValue] = useState(0);
    const [mounted, setMounted] = useState<boolean>(false);

    // NEW: State to hold the actual DOM node of the scroller
    const [scrollerEl, setScrollerEl] = useState<Element | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<SVGCircleElement>(null);

    useEffect(() => {
        setMounted(true);
        // Find the scroller node in the DOM and save it to state
        const el = document.querySelector('#app-scroll-area [data-slot="scroll-area-viewport"]');
        if (el) {
            setScrollerEl(el);
        }
    }, []);

    useGSAP(() => {
        // GUARD: Do not let GSAP run until React finds the scroller element
        if (!scrollerEl || !containerRef.current || !circleRef.current) return;

        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                scroller: scrollerEl, // Pass the actual DOM element, not a string
                start: "top bottom-=100px",
                toggleActions: "play none none none",
            }
        });

        tl.fromTo(circleRef.current,
            { strokeDashoffset: circumference },
            {
                strokeDashoffset: finalOffset,
                duration: duration,
                ease: "power2.out"
            },
            0
        );

        const counter = { val: 0 };
        tl.to(counter, {
            val: progress,
            duration: duration,
            ease: "power2.out",
            onUpdate: () => {
                setDisplayValue(counter.val);
            }
        }, 0);

        // ADD scrollerEl to the dependencies array so GSAP runs once it is found
    }, { scope: containerRef, dependencies: [progress, finalOffset, scrollerEl] });

    return (
        <div
            ref={containerRef}
            className="relative flex items-center justify-center"
            style={{ width: size, height: size, filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.05))" }}
        >
            <svg width={size} height={size} className="rotate-30">
                <defs>
                    <radialGradient
                        id="radialGradient"
                        cx={size / 2}
                        cy={size / 2}
                        r={size / 2}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="75%" stopColor={innerColor} />
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

                <circle
                    ref={circleRef}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="url(#radialGradient)"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    strokeLinecap="round"
                />
            </svg>

            <span
                className="absolute font-bold text-xl inline-flex items-center gap-1"
                style={{ color: textColor }}
            >
                {formatNumber(mounted ? displayValue : progress, suffix)}
            </span>
        </div>
    );
};

export default RadialGradientProgress;  