"use client";

import { useEffect, useState } from "react";
import LogoCarousel from "../components/LogoCarousel";
import SectionWrapper from "../../../../components/shared/SectionWrapper";
import { useTranslations, useLocale } from "next-intl";
// import CyclicSwapCards from "../components/CyclicCardRotation";
import Typewriter from "typewriter-effect";
import RequestDemoButton from "../../../../components/shared/form/RequestDemoButton";
import Image from "next/image";
import { heroSlides } from "@/data/home-page";


export default function HeroSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const t = useTranslations("Home.hero");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const slides = heroSlides.map((slide) => ({
    title: t(slide.translationKey),
    image: slide.image,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % slides.length);
    }, 4000)

    return () => {
      clearInterval(interval);
    }
  }, [slides.length])

  return (
    <SectionWrapper className="flex-col justify-between min-h-dvh my-12">
      <div
        className={`container mx-auto flex flex-col lg:flex-row items-center justify-between overflow-hidden grow pb-8 gap-4`}
        id="hero-section"
      >
        {/* Left Side: Dynamic Text */}
        <div className="flex-1 space-y-6 w-full">

          <h1 className="text-[24px] md:text-[44px] mb-8 min-h-32 md:min-h-[198px] lg:min-h-[264px] xl:min-h-[198px] 2xl:min-h-[132px]">
            <span>{t("titlePrefix")}</span>{" "}
            <Typewriter
              options={{
                strings: [slides[selectedIndex].title],
                autoStart: true,
                delay: isRTL ? 160 : 35,
                deleteSpeed: isRTL ? 150 : 25,
                wrapperClassName: "text-primary",
                stringSplitter: (text: string) => {
                  if (isRTL) {
                    const words = text.split(" ");
                    return words.map(word => `${word} `)
                  }
                  return text.split("");
                },
              }}
              component={"span"}
            />
          </h1>
          <RequestDemoButton size={"xl"} />
        </div>

        {/* Right Side: Carousel*/}
        {/* <div className={`flex-1 mt-12 lg:mt-0 overflow-hidden mx-auto flex items-center w-full max-w-full h-80 md:h-[500px] lg:h-[600px] ${isRTL ? "lg:order-1" : "lg:order-2"}`}
          style={{
            backgroundImage: "url('/dima-carousel-background.webp')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <CyclicSwapCards
            cards={slides}
            selectedIndex={selectedIndex}
            onIndexChange={setSelectedIndex}
          />
        </div> */}

        {/* Right Side: Image */}
        <figure className="relative w-full lg:flex-1 aspect-1920/1793 h-auto min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
          <Image
            src={`/hero-bg-${locale}.png`}
            alt="Hero image"
            fill
            priority={true}
            fetchPriority="high"
            className="object-contain"
            quality={90}
          />
        </figure>
      </div>
      <div className="container mx-auto">
        <h2 className="text-[14px] sm:text-3xl text-center">{t("trustedBy")}</h2>
        <LogoCarousel />
      </div>
    </SectionWrapper>
  );
}
