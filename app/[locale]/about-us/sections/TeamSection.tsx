"use client";
import SectionWrapper from "@/components/shared/SectionWrapper"
import CoFounderCard from "../components/CoFounderCard"
import TeamCarousel from "../components/TeamCarousel"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import AutoScroll from "embla-carousel-auto-scroll"

const teamMembers: { name: string; title: string; }[] = [
    { name: "Rawan Youness", title: "Business Analyst" },
    { name: "Aya Hegab", title: "Junior Backend Developer" },
    { name: "Nouf Alomran", title: "Marketing Specialist" },
    { name: "Mohamed AbdElAal", title: "Senior Media Monitoring Consultant" },
    { name: "Annasimon Nessim Anwar", title: "TBA" },
    { name: "Sarah Botros", title: "TBA" },
    { name: "Salah Eldin Elnabrawy", title: "AI & ML Engineer" },
    { name: "Kanzy Aboualam", title: "Junior Business Developer" },
    { name: "Nariman Farag", title: "Junior QA Tester" },
    { name: "Youssef Kamal", title: "Client Relations & Business Dev. Lead" },
    { name: "Nada Al Wasemy", title: "Senior PR Research Consultant, Media Monitoring Expert & Media Analyst" },
    { name: "Mahmoud Reda", title: "Flutter Developer" },
    { name: "Zain Abo Almagd", title: "Backend & Technical Operations Engineer" },
    { name: "Omar Elmeligy", title: "Junior Full Stack Developer" },
    { name: "Hussein Rizkana", title: "Technical Program Manager" },
    { name: "Maran Malak", title: "Junior Backend Developer" },
    { name: "Karim Chehab", title: "Junior Frontend Engineer" },
]


const TeamSection = () => {
    return (
        <>
            <SectionWrapper className="space-y-12">
                <header>
                    <h2 className="text-[24px] md:text-[44px] font-normal text-center leading-tight max-w-4xl capitalize">
                        The team behind TheDar.AI
                    </h2>
                </header>

                <div className="flex items-center gap-16">
                    <CoFounderCard />
                    <CoFounderCard />
                </div>


            </SectionWrapper>

            <Carousel
                className="my-4"
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
                    {teamMembers.map(({ name, title }) => (
                        <CarouselItem className="basis-1/4" key={name}>
                            <div className="bg-muted p-4 rounded-xl">
                                <div className="flex justify-between items-center text-black">
                                    <p>{name}</p>
                                    <p>{title}</p>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}

                </CarouselContent>
            </Carousel>
        </>
    )
}

export default TeamSection