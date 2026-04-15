"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import TeamCard from "./TeamCard"
import AutoScroll from "embla-carousel-auto-scroll"

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
                {Array.from({ length: 10 }).map((_, i) => (
                    <CarouselItem className="basis-1/5" key={i}>
                        <TeamCard />
                    </CarouselItem>
                ))}

            </CarouselContent>
        </Carousel>
    )
}

export default TeamCarousel