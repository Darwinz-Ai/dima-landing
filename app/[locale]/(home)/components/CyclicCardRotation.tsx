"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type Card = {
    title: string;
    image: string;
};

type CyclicCardRotationProps = {
    cards: Card[];
    interval?: number;
    selectedIndex: number;
    onIndexChange: React.Dispatch<React.SetStateAction<number>>;
};

export default function CyclicCardRotation({
    cards,
    interval = 4000,
    selectedIndex,
    onIndexChange,
}: CyclicCardRotationProps) {

    const [ready, setReady] = useState(false)

    // Wait until the component is mounted to show the carousel
    useEffect(() => {
        setReady(true);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            onIndexChange((prev) => (prev + 1) % cards.length);
        }, interval);
        return () => clearInterval(timer);
    }, [cards.length, interval, onIndexChange]);
    const getPositionClass = (index: number) => {
        const diff = (index - selectedIndex + cards.length) % cards.length;
        switch (diff) {
            case 0:
                return "middle";
            case 1:
                return "right";
            case 2:
                return "far-right";
            case cards.length - 1:
                return "left";
            case cards.length - 2:
                return "far-left";
            default:
                return "hidden";
        }
    };

    return (
        <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
            {ready && cards.map((card, index) => (
                <div
                    key={card.title}
                    onClick={() => onIndexChange(index)}
                    className={`absolute w-60 h-56 scale-110 flex items-center justify-center rounded-2xl text-white font-semibold transition-all duration-500 ${getPositionClass(index)} cursor-pointer`}
                >
                    <div className="relative w-full h-full">
                        <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            sizes="240px"
                            className="object-contain drop-shadow-xl"
                            priority={true}
                            fetchPriority="high"

                        />
                    </div>
                </div>
            ))}

            <style jsx>{`
                .middle {
                    transform: translateX(0) scale(1);
                    z-index: 30;
                }
                .left {
                    transform: translateX(-120px) scale(0.9);
                    z-index: 20;
                }
                .right {
                    transform: translateX(120px) scale(0.9);
                    z-index: 20;
                }
                .far-left {
                    transform: translateX(-240px) scale(0.8);
                    z-index: 10;
                }
                .far-right {
                    transform: translateX(240px) scale(0.8);
                    z-index: 10;
                }
                .hidden {
                    transform: scale(0.7);
                    z-index: 0;
                }
            `}</style>
        </div>
    );
}
