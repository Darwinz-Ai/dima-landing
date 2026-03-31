"use client";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
    items: number[];

};

export default function ConnectCarousel({
    items,

}: Props) {
    const locale = useLocale();
    const isRTL = locale === "ar";

    const cards = items;
    const [active, setActive] = useState(0);

    const handleGoToNext = () => {
        setActive((p) => (p + 1) % cards.length);
    }
    const handleGoToPrev = () => {
        setActive((p) => (p - 1) % cards.length);
    }

    const getPosition = (index: number) => {
        const len = cards.length;
        let diff = (index - active + len) % len;
        if (isRTL) diff = (active - index + len) % len;

        switch (diff) {
            case 0:
                return "center";
            case 1:
                return "right";
            case 2:
                return "left";
            default:
                return "hidden";
        }
    };

    return (
        <div className="container bg-muted rounded-3xl p-4 relative">
            {/* Faded edges */}
            <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(to_right,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_10%,rgba(255,255,255,0)_90%,rgba(255,255,255,1)_100%)]"></div>

            {/* Cards */}
            <div className="relative w-full h-[730px] flex items-center justify-center overflow-hidden select-none z-0">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        onClick={() => setActive(index)}
                        className={`absolute transition-all duration-500 ease-out z-10 ${getPosition(index)}`}
                    >
                        <article className="w-[430px] h-[650px] bg-muted-foreground rounded-2xl flex justify-center items-center text-white">
                            <div className="absolute top-0 left-0 w-full bg-linear-to-b from-black/60 to-transparent h-[200px] rounded-2xl">
                                <div className="flex items-center gap-2 p-8">
                                    <Avatar size="lg">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>D</AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <p className="text-white">TheDar.Ai</p>
                                        <p className="text-muted-foreground">Tiktok</p>
                                    </div>
                                </div>
                            </div>
                            {card}
                        </article>
                    </div>
                ))}

                {/* Positioning & Animations */}
                <style jsx>
                    {`
.center {
  transform: translateX(0) scale(1);
  z-index: 30;
}
.left {
  transform: translateX(-500px) scale(0.9);
  z-index: 20;
}
.right {
  transform: translateX(500px) scale(0.9);
  z-index: 20;
}
.far-left, .far-right {
  display: none;
}

@media (max-width: 1024px) {
  .left { transform: translateX(-386px) scale(0.9); }
  .right { transform: translateX(386px) scale(0.9); }
}
@media (max-width: 640px) {
  .left { transform: translateX(-250px) scale(0.9); }
  .right { transform: translateX(250px) scale(0.9); }
}
                `}
                </style>
            </div>

            {/* Next/Prev Buttons */}
            <div className="flex justify-center items-center gap-4">
                <Button size={"icon-sm"} onClick={handleGoToPrev} className="flex items-center justify-center cursor-pointer">
                    <IconChevronLeft className="size-6" />
                </Button>
                <Button size={"icon-sm"} onClick={handleGoToNext} className="flex items-center justify-center cursor-pointer">
                    <IconChevronRight className="size-6" />
                </Button>
            </div>
        </div>
    );
}
