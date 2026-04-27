"use client";
import { useLocale, useTranslations } from 'next-intl';

import AutoScroll from 'embla-carousel-auto-scroll'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

const teamMembers: string[] = [
    "Rawan Youness",
    "Aya Hegab",
    "Nouf Alomran",
    "Mohamed AbdElAal",
    "Annasimon Nessim Anwar",
    "Sarah Botros",
    "Salah Eldin Elnabrawy",
    "Kanzy Aboualam",
    "Nariman Farag",
    "Youssef Kamal",
    "Nada Al Wasemy",
    "Mahmoud Reda",
    "Zain Abo Almagd",
    "Omar Elmeligy",
    "Hussein Rizkana",
    "Maran Malak",
    "Karim Chehab"
]

const MembersCarousel = () => {
    const locale = useLocale();
    const isRTL = locale === "ar";

    const t = useTranslations("AboutUs.team");

    return (
        <Carousel
            className="my-4"
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
            <CarouselContent >
                {teamMembers.map((name) => (
                    <CarouselItem className="basis-full sm:basis-2/3 lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4" key={name}>
                        <div className="bg-muted p-4 rounded-xl">
                            <div className="flex justify-between items-center text-black">
                                <p>{name}</p>
                                <p>{t(name)}</p>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}

export default MembersCarousel