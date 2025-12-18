
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SectionWrapper from "@/components/shared/SectionWrapper";
import QuestionsAccordion from "@/app/[locale]/(home)/components/QuestionsAccordion";

type QuestionsAnsweredSectionProps = {
    slug?: string
}

function QuestionsAnsweredSection({ slug }: QuestionsAnsweredSectionProps) {
    const t = useTranslations("Home.questionsAnswered");

    return (
        <SectionWrapper>
            <div className={`container mx-auto max-w-6xl flex flex-col lg:flex-row justify-between gap-12`}>
                {/* Header */}
                <div className="space-y-6">
                    <h2 className="text-2xl lg:text-[44px] font-bold text-primary capitalize">{t("title")}</h2>
                    <p className="text-muted-foreground text-lg">{t("description")}</p>

                    {/* CTA */}
                    <div className="w-fit" dir="ltr">
                        <Link href="/request-demo" className="text-[15px]">
                            <Button className="flex justify-between py-2 pl-4 pr-2.5">
                                {t("requestDemo")}
                                <div className="w-7 h-7 rounded-full bg-white flex justify-center items-center">
                                    <ArrowRight color="black" />
                                </div>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* FAQs */}
                <QuestionsAccordion pageSlug={slug} />
            </div>
        </SectionWrapper>
    );
}

export default QuestionsAnsweredSection;
