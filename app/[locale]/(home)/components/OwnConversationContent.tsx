"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, easeOut, easeIn } from "motion/react";
import RequestDemoButton from "../../../../components/shared/form/RequestDemoButton";
import Lottie from "lottie-react";
import { ownConversationInfo } from "@/data/home-page";

const textVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: easeOut } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2, ease: easeIn } },
};

export type FeatureTranslations = Record<
  string,
  { title: string; description: string }
>;

type OwnConversationContentProps = {
  featureTranslations: FeatureTranslations;
  locale: string;
};

function OwnConversationContent({
  featureTranslations,
  locale,
}: OwnConversationContentProps) {
  const isRTL = locale === "ar";

  const [activeIndex, setActiveIndex] = useState<number>(3);
  const activeFeature = ownConversationInfo[activeIndex];
  const [mounted, setMounted] = useState<boolean>(false);

  // Auto-cycle through buttons every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ownConversationInfo.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll active button into view
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
    const button = buttonRefs.current[activeIndex];
    const container = containerRef.current;

    if (button && container) {
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;
      const containerWidth = container.offsetWidth;

      container.scrollTo({
        left: buttonLeft - containerWidth / 2 + buttonWidth / 2.5,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  return (
    <>
      {/* Scrollable Buttons */}
      <div
        ref={containerRef}
        className="w-full overflow-x-auto py-4 md:my-4 hide-scrollbar flex xl:justify-center"
      >
        <div className="flex gap-2 sm:gap-3 md:gap-4 px-2 sm:px-4 whitespace-nowrap w-max">
          {ownConversationInfo.map((feature, idx) => (
            <Button
              key={feature.translationKey}
              variant={activeIndex === idx ? "default" : "ghost"}
              size="xl"
              onClick={() => setActiveIndex(idx)}
              ref={(el) => {
                buttonRefs.current[idx] = el;
              }}
              className="inline-flex items-center gap-2 text-sm sm:text-base px-3 sm:px-4 md:px-6 shrink-0 tracking-normal"
            >
              <feature.icon className="w-6! h-6!" />
              <span>
                {featureTranslations[feature.translationKey]?.title ??
                  feature.translationKey}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* Image + Text */}
      <div
        className="flex flex-col xl:flex-row items-center justify-between xl:justify-center w-full rounded-4xl bg-no-repeat xl:bg-[url(https://firebasestorage.googleapis.com/v0/b/dima-landing.firebasestorage.app/o/HomePage%2FOwnConversation%2Fbg-vector.svg?alt=media&token=028ac753-b7f1-4a6e-925e-2e70467d8c5d)] bg-center"
        dir="ltr"
      >
        {/* Image Section */}
        <figure className="relative w-full max-w-[900px] h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[600px] overflow-hidden bg-linear-to-b xl:bg-none from-primary via-[#5FC9E7] to-[#AEEBFF] rounded-2xl">
          <Lottie
            animationData={activeFeature.animation}
            autoplay
            loop={false}
            className="absolute inset-0 w-full h-full object-contain z-10 p-6"
          />
        </figure>

        {/* Info + Button */}
        <div
          className={`flex flex-col justify-start text-center w-full xl:max-w-md z-30  lg:h-[500px] xl:h-[600px] xl:pl-22 pb-4 ${isRTL
            ? "text-right items-end xl:pr-6"
            : "items-start text-left"
            }`}
        >
          {!mounted ? (
            <div
              className={`w-full xl:flex-1 flex flex-col justify-center ${isRTL
                ? "items-end text-right"
                : "items-start text-left"
                } h-[175px]`}
            >
              <h3 className="text-2xl font-semibold my-4 sm:mb-6">
                {featureTranslations[activeFeature.translationKey]?.title ??
                  activeFeature.translationKey}
              </h3>
              <p className="text-base md:text-lg leading-relaxed">
                {featureTranslations[activeFeature.translationKey]
                  ?.description ?? ""}
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.translationKey}
                variants={textVariants}
                exit="exit"
                initial="hidden"
                animate="visible"
                className={`w-full xl:flex-1 flex flex-col justify-center ${isRTL
                  ? "items-end text-right"
                  : "items-start text-left"
                  } h-[175px]`}
              >
                <h3 className="text-2xl font-semibold my-4 sm:mb-6">
                  {featureTranslations[activeFeature.translationKey]?.title ??
                    activeFeature.translationKey}
                </h3>
                <p className="text-base md:text-lg leading-relaxed">
                  {featureTranslations[activeFeature.translationKey]
                    ?.description ?? ""}
                </p>
              </motion.div>
            </AnimatePresence>
          )}

          <div
            className={`xl:my-4 w-full xl:flex-1 flex ${isRTL ? "justify-end" : "justify-start"
              }`}
          >
            <RequestDemoButton size={"xl"} className="mt-4" />
          </div>
        </div>
      </div>
    </>
  );
}

export default OwnConversationContent;
