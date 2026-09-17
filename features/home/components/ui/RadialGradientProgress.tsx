
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
    // duration = 1.5, // Unused when not animated
    suffix = "%",
    maxValue = 100,
    gapValue = 0
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const gap = gapValue * circumference;
    const finalOffset = circumference - (progress / maxValue) * (circumference - gap);

    return (
        <div
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
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="url(#radialGradient)"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={finalOffset}
                    strokeLinecap="round"
                />
            </svg>

            <span
                className="absolute font-bold text-xl inline-flex items-center gap-1"
                style={{ color: textColor }}
            >
                {formatNumber(progress, suffix)}
            </span>
        </div>
    );
};

export default RadialGradientProgress;