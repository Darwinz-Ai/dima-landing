"use client";
import SectionWrapper from "@/components/shared/SectionWrapper"
import CoFounderCard from "../components/CoFounderCard"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import AutoScroll from "embla-carousel-auto-scroll"

const teamMembers: { name: string; title: string; }[] = [
    { name: "Rawan Youness", title: "Business Analyst" },
    { name: "Aya Hegab", title: "Jr. Backend Developer" },
    { name: "Nouf Alomran", title: "Marketing Specialist" },
    { name: "Mohamed AbdElAal", title: "Sr. Media Monitoring Consultant" },
    { name: "Annasimon Nessim Anwar", title: "Jr. Marketing & Client Relations" },
    { name: "Sarah Botros", title: "Jr. Tech Ops Engineer" },
    { name: "Salah Eldin Elnabrawy", title: "AI & ML Engineer" },
    { name: "Kanzy Aboualam", title: "Jr. Business Developer" },
    { name: "Nariman Farag", title: "Jr. QA Tester" },
    { name: "Youssef Kamal", title: "Client Relations & Business Dev. Lead" },
    { name: "Nada Al Wasemy", title: "Sr. PR & Media Analyst" },
    { name: "Mahmoud Reda", title: "Flutter Developer" },
    { name: "Zain Abo Almagd", title: "Backend & Tech Ops Engineer" },
    { name: "Omar Elmeligy", title: "Jr. Full Stack Developer" },
    { name: "Hussein Rizkana", title: "Technical Program Manager" },
    { name: "Maran Malak", title: "Jr. Backend Developer" },
    { name: "Karim Chehab", title: "Jr. Frontend Engineer" },
]

const foundersInfo = [
    {
        name: "Mohy Aboualam",
        title: "Co-founder & CEO",
        description: "8+ years in AI and digital technology. Former electrical engineer at Mott MacDonald (UK). First class honours graduate, Imperial College London.",
        url: "https://www.linkedin.com/in/maboualam/",
        image: "/about-us/mohy.png"
    },
    {
        name: "Emad El Azhary",
        title: "Co-founder",
        description: "30+ years in AI and software development. Former head of AI & big data at Vodafone Egypt. Founder of Intouch (1992), Egypt’s first internet service provider.",
        url: "https://www.linkedin.com/in/emad-elazhary-83a5631/",
        image: "/about-us/emad.png"
    },
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
                    {
                        foundersInfo.map((founder) => (
                            <CoFounderCard key={founder.name} founder={founder} />
                        ))
                    }
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
                        <CarouselItem className="basis-2/6" key={name}>
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