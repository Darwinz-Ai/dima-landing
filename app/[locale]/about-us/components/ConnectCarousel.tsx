"use client";
import { useState } from "react";
import { useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function ConnectCarousel() {
    const locale = useLocale();
    const isRTL = locale === "ar";
    const [active, setActive] = useState(0);

    const cards = [
        {
            id: "ig-1",
            type: "portrait",
            origin: "instagram",
            content: (
                <video
                    src="https://firebasestorage.googleapis.com/v0/b/dima-landing.firebasestorage.app/o/AboutUs%2F__%D9%85%D9%88%20%D9%83%D9%84%20%D9%85%D8%A4%D8%AB%D8%B1%20%D9%8A%D9%86%D8%A7%D8%B3%D8%A8%20%D8%B9%D9%84%D8%A7%D9%85%D8%AA%D9%83%D9%88%D8%A7%D9%84%D8%A7%D8%AE%D8%AA%D9%8A%D8%A7%D8%B1%20%D8%A7%D9%84%D8%BA%D9%84%D8%B7%20%D9%85%D9%85%D9%83%D9%86%20%D9%8A%D9%83%D9%84%D9%81%D9%83%20%D9%83%D8%AB%D9%8A%D8%B1%D8%A7%D8%AE%D8%AA%D8%A7%D8%B1%20%D8%B5%D8%AD%20%D8%A8%D9%86%D8%A7%D8%A1%D9%8B%20%D8%B9%D9%84%D9%89-%E2%80%A2%20%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D9%81%D9%82%20%D9%85%D8%B9%20%D8%B9%D9%84%D8%A7%D9%85%D8%AA%D9%83%E2%80%A2%20.mp4?alt=media&token=5ab7af93-5f79-45ac-894d-9486043b3e07"
                    controls
                    className="w-full h-full rounded-[12px] object-cover"
                >
                    Your browser does not support the video tag.
                </video>
            ),
        },
        {
            id: "li-1",
            type: "landscape",
            origin: "linkedin",
            content: (
                <iframe
                    src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7294962534753722368?compact=1"
                    height="100%"
                    width="100%"
                    frameBorder="0"
                    allowFullScreen
                    title="LinkedIn Landscape 1"
                    loading="lazy"
                ></iframe>
            ),
        },
        {
            id: "li-2",
            type: "landscape",
            origin: "linkedin",
            content: (
                <iframe
                    src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7391391958411354112?compact=1"
                    height="100%"
                    width="100%"
                    frameBorder="0"
                    allowFullScreen
                    title="LinkedIn Landscape 2"
                    loading="lazy"
                ></iframe>
            ),
        },
    ];

    const handleGoToNext = () => setActive((p) => (p + 1) % cards.length);
    const handleGoToPrev = () => setActive((p) => (p - 1 + cards.length) % cards.length);

    const getPosition = (index: number) => {
        const len = cards.length;
        const diff = (index - active + len) % len;

        if (diff === 0) return "center";
        if (diff === 1) return "right";
        if (diff === len - 1) return "left";
        return "hidden";
    };

    return (
        <div className="container max-w-[1200px] bg-linear-to-r from-muted via-white to-muted rounded-[30px] p-4 relative overflow-hidden">
            <div className="hidden md:block absolute inset-0 pointer-events-none z-40 bg-[linear-gradient(to_right,#F7F7F7_0%,transparent_15%,transparent_85%,#F7F7F7_100%)]"></div>

            <div className="relative w-full h-[500px] md:h-[730px] flex items-center justify-center select-none z-0">
                {cards.map((card, index) => {
                    const pos = getPosition(index);
                    const isPortrait = card.type === "portrait";
                    const isCenter = pos === "center";

                    return (
                        <div
                            key={card.id}
                            onClick={() => setActive(index)}
                            className={cn(
                                "absolute transition-all duration-500 ease-in-out cursor-pointer",
                                isCenter ? "z-30 opacity-100 scale-100 translate-x-0" : "z-20 opacity-40 scale-75",
                                pos === "left" && (isRTL ? "translate-x-[150px] md:translate-x-[400px]" : "translate-x-[-150px] md:translate-x-[-450px]"),
                                pos === "right" && (isRTL ? "translate-x-[-150px] md:translate-x-[-450px]" : "translate-x-[150px] md:translate-x-[450px]"),
                                pos === "hidden" && "opacity-0 pointer-events-none"
                            )}
                        >
                            <article className={cn(
                                "relative bg-muted-foreground rounded-2xl flex flex-col justify-center items-center text-white shadow-xl overflow-hidden",
                                isPortrait ? "w-[280px] h-[450px] md:w-[380px] md:h-[650px]" : "w-[300px] h-[300px] md:w-[500px] md:h-[430px]"
                            )}>
                                {!isCenter && (
                                    <div className="absolute inset-0 z-20 bg-transparent cursor-pointer" />
                                )}

                                {/* Header Info Wrapper */}
                                <div className="absolute top-0 left-0 w-full bg-linear-to-b from-black/80 to-transparent h-20 md:h-[100px] z-20 pointer-events-none">
                                    <div className="flex items-center gap-2 p-4 md:p-6">
                                        <Avatar className="bg-white p-1 h-8 w-8 md:h-10 md:w-10">
                                            <AvatarImage src="/dima-logo/dima-logo.svg" />
                                            <AvatarFallback className="text-black text-xs">D</AvatarFallback>
                                        </Avatar>
                                        <div className="text-left">
                                            <p className="text-white font-bold text-xs md:text-sm">TheDar.AI</p>
                                            <p className="text-white/80 text-[10px] md:text-xs capitalize">{card.origin}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full bg-white h-full">
                                    {card.content}
                                </div>
                            </article>
                        </div>
                    );
                })}
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-4 py-4 relative z-50">
                <Button size="icon-sm" variant="outline" onClick={handleGoToPrev} className={cn("rounded-full bg-white/80", isRTL && "rotate-180")}>
                    <IconChevronLeft className="size-6" />
                </Button>
                <Button size="icon-sm" variant="outline" onClick={handleGoToNext} className={cn("rounded-full bg-white/80", isRTL && "rotate-180")}>
                    <IconChevronRight className="size-6" />
                </Button>
            </div>
        </div>
    );
}