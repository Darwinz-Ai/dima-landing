
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import SectionWrapper from "@/components/shared/SectionWrapper";
import QuestionsAccordion from "@/app/[locale]/(home)/components/QuestionsAccordion";
import { QuestionAccordion } from "@/types";
import { getTranslations } from "next-intl/server";

type QuestionsAnsweredSectionProps = {
    faqs: QuestionAccordion[];
};

async function QuestionsAnsweredSection({ faqs }: QuestionsAnsweredSectionProps) {
    const homeTranslations = await getTranslations("Home.questionsAnswered");

    return (
        <SectionWrapper>
            <div className={`container mx-auto max-w-6xl flex flex-col lg:flex-row justify-between gap-12`}>
                {/* Header */}
                <div className="space-y-6">
                    <h2 className="text-2xl lg:text-[44px] font-bold text-primary capitalize">{homeTranslations("title")}</h2>
                    <p className="text-muted-foreground text-lg">{homeTranslations("description")}</p>

                    {/* CTA */}
                    <div className="w-fit" dir="ltr">
                        <Link href="/request-demo" className="text-[15px]">
                            <Button className="flex justify-between py-2 pl-4 pr-2.5">
                                {homeTranslations("requestDemo")}
                                <div className="w-7 h-7 rounded-full bg-white flex justify-center items-center">
                                    <ArrowRight color="black" />
                                </div>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* FAQs */}
                <QuestionsAccordion items={faqs} />
            </div>
        </SectionWrapper>
    );
}

export default QuestionsAnsweredSection;
