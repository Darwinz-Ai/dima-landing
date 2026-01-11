import { CardType } from "@/types";
import SectionWrapper from "../../../../components/shared/SectionWrapper";
import EntrepriseCard from "../components/EnterpriseCard";
import { useTranslations } from "next-intl";

function CardsGrid({ slug }: { slug: string }) {
    const t = useTranslations(`Solutions.${slug}.cardsGrid`)
    const cards = t.raw("cards") as CardType[];
    // console.log(cards)
    return (
        <SectionWrapper>
            <div className="container mx-auto flex flex-col justify-center items-center gap-8 ">
                {/* Heading */}
                <h2 className="text-2xl lg:text-[44px] text-center mb-8 capitalize">{t("title")}</h2>

                {/* Cards */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
                    {cards.map((card) => (
                        <li key={card.title}>
                            <EntrepriseCard  {...card} />
                        </li>
                    ))}
                </ul>
            </div>
        </SectionWrapper>
    );
}

export default CardsGrid;