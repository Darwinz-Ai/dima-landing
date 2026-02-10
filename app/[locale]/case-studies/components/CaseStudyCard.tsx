import { Badge } from "@/components/ui/badge";
import { CaseStudy } from "@/types";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

function CaseStudyCard(caseStudy: CaseStudy) {
    const t = useTranslations("CaseStudies");
    return (
        <Link href={`/case-studies/${caseStudy.id}`}>
            <article className="flex flex-col gap-4 p-8 shadow-[0_0_15px_rgba(0,0,0,0.07)] rounded-xl rounded-br-[96px] max-w-lg h-full bg-white">
                {/* Type */}
                <div className="flex justify-end">
                    <Badge className="bg-black">{caseStudy.content.type}</Badge>
                </div>

                {/* Metric */}
                <div className="space-x-2">
                    <span className="text-2xl lg:text-4xl font-bold text-primary">{caseStudy.content.metrics[1].value + caseStudy.content.metrics[1].suffix}</span>
                    <span className="font-medium text-gray-400">{caseStudy.content.metrics[1].title}</span>
                </div>

                {/* Text */}
                <h3 className="text-lg lg:text-[22px] font-bold">{caseStudy.content.title}</h3>
                <p>{caseStudy.content.description}</p>
                <p aria-label={`Read more about ${caseStudy.content.title}`} className="text-primary font-medium">{t("readMore")}</p>
            </article></Link>
    );
}

export default CaseStudyCard;