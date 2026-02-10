import SectionWrapper from "../../../../components/shared/SectionWrapper";
import PinnedScrollSection from "../components/PinnedScrollSection";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { IconArrowRight } from "@tabler/icons-react";
import MobileScrollingCard from "../components/MobileScrollingCard";
import { CardType } from "@/types";
import { getTranslations } from "next-intl/server";

async function ScrollingSection({ slug }: { slug: string }) {
    const t = await getTranslations(`Solutions.${slug}.scrollingSection`);
    const cards = t.raw("cards") as CardType[];
    return (
        <SectionWrapper className="mb-0">
            <div className="container mx-auto flex flex-col justify-center items-center gap-4 ">
                {/* Heading */}
                <h2 className="text-2xl md:text-[44px] text-center">{t("title")}</h2>
                <p className="text-xl font-light text-center hidden sm:block">{t("subTitle")}</p>

                {/* Pinned Scroll Section for desktop */}
                <div className="hidden lg:block">
                    <PinnedScrollSection cards={cards} slug={slug} />
                </div>

                {/* Card list for mobile */}
                <ul className="grid grid-cols-1 gap-6 lg:hidden">
                    {
                        cards.map((card, i) => (
                            <li key={card.title} className="my-4">
                                <MobileScrollingCard {...card} slug={slug} index={i}
                                />
                            </li>
                        ))
                    }
                </ul>

                {/* CTA mobile */}
                <div className="text-xl text-center font-semibold bg-black rounded-2xl px-6 py-4 mt-8 lg:hidden w-full flex flex-col md:flex-row justify-center items-center gap-4">
                    <h3 className="text-white">{t("cta")}</h3>

                    <Button className="lg:hidden flex justify-between py-2 pl-4 pr-2.5">
                        <Link href="/request-demo" className="text-[15px]">{t("requestDemo")}</Link>
                        <div className="w-7 h-7 rounded-full bg-white flex justify-center items-center">
                            <IconArrowRight color="black" />
                        </div>
                    </Button>
                </div>
            </div>
        </SectionWrapper>
    );
}

export default ScrollingSection;