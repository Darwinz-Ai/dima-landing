"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import AutoScroll from "embla-carousel-auto-scroll"
import Image from "next/image"; 3

const TeamCarousel = () => {
    return (
        <Carousel
            className="py-12 lg:py-10"
            opts={{
                loop: true,
                dragFree: true,
                align: "start"
            }}
            plugins={
                [AutoScroll({ stopOnInteraction: false })]
            }
        >
            <CarouselContent >
                {Array.from({ length: 5 }).map((_, i) => (
                    <CarouselItem className="basis-1/4" key={i}>
                        <Image
                            key={`about-us-image-${i + 1}`}
                            src={`/about-us/${i + 1}.png`}
                            alt="About Us image"
                            width={383}
                            height={420}
                        />
                    </CarouselItem>
                ))}

            </CarouselContent>
        </Carousel>
    )
}

export default TeamCarousel