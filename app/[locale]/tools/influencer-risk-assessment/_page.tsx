import SectionWrapper from "@/components/shared/SectionWrapper";
import { RiskAssessmentForm } from "./components/RiskAssessmentForm";
import { useTranslations } from "next-intl";

function InfluencerRiskAssessmentPage() {
    const t = useTranslations("Tools.influencer-risk-assessment");
    const roles = t.raw("roles") as string[];
    return (
        <main>
            <SectionWrapper className="min-h-dvh mt-24">
                <div className="max-w-6xl container mx-auto space-y-12">
                    <div className="text-center space-y-6">
                        <div className="space-y-4">
                            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                                {t("title")}
                            </h1>
                            <p className="text-xl text-primary font-semibold">
                                {t("edition")}
                            </p>
                            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                {t("description")}
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground pt-4">
                            {
                                roles.map((role) => (
                                    <div key={role} className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                                        <span>{role}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <RiskAssessmentForm />
                </div>
            </SectionWrapper>
        </main>
    );
}

export default InfluencerRiskAssessmentPage;