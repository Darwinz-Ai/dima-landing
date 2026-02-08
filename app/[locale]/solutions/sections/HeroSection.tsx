import Image from "next/image";
import SectionWrapper from "../../../../components/shared/SectionWrapper";
import LogoCarousel from "../../(home)/components/LogoCarousel";
import CounterPercentage from "../components/CounterPercentage";
import { useTranslations } from "next-intl";
import { solutionImages } from "@/data/solutions";

function HeroSection({ slug }: { slug: string }) {
    const t = useTranslations(`Solutions.${slug}.hero`);
    const metrics = t.raw("metrics") as { number: number, title: string }[];
    return (
        <SectionWrapper className="min-h-dvh mt-20">
            <div className="container mx-auto flex flex-col justify-center items-center gap-4">
                {/* Heading */}
                <h2 className="bg-black text-white uppercase w-fit p-1 rounded-sm italic tracking-wide">{t("title")}</h2>
                <h1 className="text-2xl lg:text-[48px] font-normal text-center capitalize">{t("subTitle")}</h1>

                {/* Images */}
                <div className="flex flex-col lg:flex-row justify-center items-center gap-4 mt-4">
                    {/* Mobile View - Single Hero Image */}
                    <figure className="relative w-[300px] md:w-[400px] md:hidden h-[322px]">
                        <Image
                            src={solutionImages[slug].heroSingle}
                            alt="Hero Image Mobile"
                            fill
                            sizes="(max-width: 768px) 300px, 400px"
                            className="object-contain"
                            priority={true}
                            fetchPriority="high"

                        />
                    </figure>

                    {/* Desktop View - Grouped Hero Images */}
                    <figure className="hidden md:block relative w-[711px] h-[383px]">
                        <Image
                            src={solutionImages[slug].heroGrouped}
                            alt="Hero Image Desktop"
                            fill
                            sizes="711px"
                            className="object-contain"
                            priority={true}
                            fetchPriority="high"

                        />
                    </figure>
                </div>

                {/* Logo Carousel */}
                <LogoCarousel />

                {/* Percentages */}
                <div className="grid w-full gap-3 
                grid-cols-2 
                lg:grid-cols-3">
                    {metrics.map((metric, i) => (
                        <CounterPercentage
                            key={metric.title}
                            number={metric.number}
                            text={metric.title}
                            className={i === 2 ? "col-span-2 lg:col-span-1" : ""}
                        />
                    ))}
                </div>

            </div>
        </SectionWrapper>
    );
}

export default HeroSection;