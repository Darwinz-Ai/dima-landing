"use client";

import { Scrollama, Step } from "react-scrollama";
import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { CardType } from "@/types";
import { solutionImages } from "@/data/solutions";

export default function PinnedScrollSection({ cards, slug }: { cards: CardType[], slug: string }) {
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const t = useTranslations(`Solutions.${slug}.scrollingSection`);

    const handleStepEnter = ({ data }: { data: number }) => {
        setCurrentStepIndex(data);
    };

    const scrollToStep = (index: number) => {
        const target = stepRefs.current[index];
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };
    const images = solutionImages[slug].scrollingSection;
    return (
        <div className="relative flex justify-center items-start">
            {/* Sticky image container */}
            <div className="sticky top-0 h-screen w-1/2 flex flex-col justify-center items-center">
                <figure
                    className="rounded-3xl bg-[linear-gradient(-125deg,#95DDEE_0%,#11A8CF_32%,#95DDEE_46%,#11A8CF_100%)] w-full max-w-[600px] aspect-6/5 relative overflow-hidden"
                >
                    <AnimatePresence mode="wait">
                        {images && (
                            <motion.div
                                key={images[currentStepIndex]}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15, ease: "easeIn" }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={images[currentStepIndex]}
                                    alt=""
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 600px"
                                    className="object-contain p-4"
                                    priority={true}
                                    fetchPriority="high"
                                    quality={90}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </figure>


                {/* CTA */}
                <div className="text-xl text-center font-semibold bg-black rounded-2xl px-6 py-4 mt-8 hidden w-full lg:flex flex-col md:flex-row justify-between items-center gap-2 max-w-[600px]">
                    <h3 className="text-white">{t("cta")}</h3>
                    <Button className="hidden lg:flex" dir="ltr">
                        <Link href="/request-demo" className="text-[15px]">{t("requestDemo")}</Link>
                        <div className="w-6 h-6 rounded-full bg-white flex justify-center items-center">
                            <ArrowRight color="black" />
                        </div>
                    </Button>
                </div>
            </div>

            {/* Scroll text section */}
            <div className="w-1/2 px-8">
                <Scrollama onStepEnter={handleStepEnter} offset={0.6}>
                    {cards.map((card, i) => (
                        <Step data={i} key={card.title}>
                            <div
                                ref={(element) => { stepRefs.current[i] = element }}
                                className="py-8 my-[43vh]"
                            >
                                <h2 className="text-4xl">{card.title}</h2>
                                <p className="text-2xl font-light mt-4">{card.description}</p>
                            </div>
                        </Step>
                    ))}
                </Scrollama>
            </div>

            {/* Indices */}
            <div className="sticky top-0 h-screen flex flex-col justify-center items-center gap-8 pl-10">
                {cards.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToStep(index)}
                        className={`transition-all duration-300 ${index === currentStepIndex ? "font-bold scale-110" : "font-light"
                            }`}
                    >
                        {(index + 1).toString().padStart(2, "0")}
                    </button>
                ))}
            </div>
        </div>
    );
}
