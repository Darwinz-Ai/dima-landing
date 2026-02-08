"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export default function LogoCarousel() {
    const autoScrollPlugin = AutoScroll({ speed: 2, stopOnInteraction: false });

    return (
        <Carousel
            opts={{
                loop: true,
                dragFree: true,
                align: "start",
            }}
            plugins={[autoScrollPlugin]}
            className="w-full overflow-hidden my-4"
            dir="ltr"
        >
            <CarouselContent className="flex items-center gap-10 sm:gap-16 md:gap-20">
                {Array.from({ length: 14 }).map((_, index) => (
                    <CarouselItem
                        key={index}
                        className="
                            flex-none 
                            basis-[50%]    
                            md:basis-[20%]                         
                            lg:basis-[15%] 
                            xl:basis-[10%]
                        ">
                        <div className="flex items-center justify-center 
                                h-24 sm:h-[100px] md:h-[120px]">
                            <Image
                                src={`/logo-slider/${index + 1}.webp`}
                                alt={`Logo ${index}`}
                                width={220}
                                height={110}
                                className="object-contain w-auto h-full bg-white"
                                priority={index < 7}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
