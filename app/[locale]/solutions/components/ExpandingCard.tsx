"use client";
import { CardType } from "@/types";
import { AnimatePresence, m } from "motion/react";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

type ExpandingCardProps = CardType & {
    isExpanded: boolean;
    onClick: () => void;
};

function ExpandingCard({ title, description, highlighted, isExpanded, onClick }: ExpandingCardProps) {
    const [mounted, setMounted] = useState<boolean>(false);
    const locale = useLocale();
    const isRTL = locale === "ar";

    const variants = {
        hidden: { opacity: 0, y: 20, transition: { duration: 0.5 } },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const activeExpanded = mounted ? isExpanded : true;

    const renderHighlightedText = (text: string, highlight?: string) => {
        if (!highlight) return text;

        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === highlight?.toLowerCase() ? (
                <span key={index} className="text-primary">{part}</span>
            ) : (
                <span key={index}>{part}</span>
            )
        );
    };

    useEffect(() => {
        setMounted(true);
    }, [])

    return (
        <div
            onClick={onClick}
            className={`bg-linear-to-b from-primary to-[#8A38F5] p-1 transition-all duration-500 rounded-3xl cursor-pointer min-h-52
      ${activeExpanded ? "basis-2/3" : "basis-1/3"}
      `}
        >
            <div className="bg-white transition-colors duration-300 px-6 py-3 rounded-[20px] h-full w-full flex flex-col justify-center min-h-52 lg:min-h-0">
                {/* For desktop */}
                <m.h3
                    layout
                    animate={{ textAlign: activeExpanded ? isRTL ? "right" : "left" : "center" }}
                    className={`hidden lg:block text-2xl font-semibold mb-2 ${activeExpanded && "text-primary"
                        } transition-colors duration-300`}
                >
                    {title}
                </m.h3>

                {/* For mobile */}
                <m.h3
                    layout="size"
                    animate={{ textAlign: activeExpanded ? isRTL ? "right" : "left" : "" }}
                    className={`lg:hidden text-2xl font-semibold mb-2 ${activeExpanded && "text-primary"
                        } transition-colors duration-300`}
                >
                    {title}
                </m.h3>

                <AnimatePresence mode="popLayout">
                    {activeExpanded && (
                        <m.p
                            variants={variants}
                            initial={mounted ? "hidden" : "visible"}
                            animate="visible"
                            className="mt-2"
                        >
                            {renderHighlightedText(description, highlighted)}
                        </m.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default ExpandingCard;
