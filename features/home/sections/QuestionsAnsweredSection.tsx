
import { getTranslations } from "next-intl/server";

import SectionWrapper from "@/components/shared/SectionWrapper";
import QuestionsAccordion from "@/features/home/components/ui/QuestionsAccordion";
import RequestDemoButtonArrow from "@/components/shared/navbar/components/buttons/RequestDemoButtonArrow";

import { QuestionAccordion } from "@/types";

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
                    <RequestDemoButtonArrow location="Home_questions-answered" />
                </div>

                {/* FAQs */}
                <QuestionsAccordion items={faqs} />
            </div>
        </SectionWrapper>
    );
}

export default QuestionsAnsweredSection;
