"use client";

import { useLocale } from "next-intl";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import AutoScroll from "embla-carousel-auto-scroll"
import Image from "next/image"; 3

const AboutUsCarousel = () => {
    const locale = useLocale();
    const isRTL = locale === "ar";
    return (
        <Carousel
            className="py-12 lg:py-10"
            opts={{
                loop: true,
                dragFree: true,
                align: "start",
                direction: isRTL ? "rtl" : "ltr"
            }}
            plugins={
                [AutoScroll({ stopOnInteraction: false })]
            }
        >
            <CarouselContent className="xl:px-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <CarouselItem className="basis-2/3 sm:basis-1/3 lg:basis-1/4 2xl:basis-1/5" key={i}>
                        <Image
                            key={`about-us-image-${i + 1}`}
                            src={`/about-us/${i + 1}.png`}
                            alt="About Us image"
                            width={383}
                            height={420}
                            className="px-2 sm:px-0"
                            priority={i < 2}
                            fetchPriority={i < 2 ? "high" : "low"}
                            sizes="(max-width: 640px) 66vw, (max-width: 1024px) 33vw, 25vw"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}

export default AboutUsCarousel