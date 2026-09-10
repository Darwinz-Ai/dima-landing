import { CaseStudyCompanyProfile } from "@/types"
import { getTranslations } from "next-intl/server";

interface CompanyProfileProps {
    companyProfile: CaseStudyCompanyProfile
}

const CompanyProfile = async ({ companyProfile }: CompanyProfileProps) => {
    const t = await getTranslations("CaseStudy")
    const { industry, organization, headquarters } = companyProfile;
    return (
        <div className="bg-[#F8F9FB] border-b border-gray-200">
            <div className="container mx-auto px-6 py-8 md:py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="flex flex-col gap-1 md:gap-2">
                        <span className="text-destructive text-[11px] md:text-sm font-bold uppercase tracking-widest">{t("industry")}</span>
                        <span className="text-gray-900 font-semibold text-base md:text-xl">{industry}</span>
                    </div>
                    <div className="flex flex-col gap-1 md:gap-2">
                        <span className="text-destructive text-[11px] md:text-sm font-bold uppercase tracking-widest">{t("organization")}</span>
                        <span className="text-gray-900 font-semibold text-base md:text-xl">{organization}</span>
                    </div>
                    <div className="flex flex-col gap-1 md:gap-2">
                        <span className="text-destructive text-[11px] md:text-sm font-bold uppercase tracking-widest">{t("headquarters")}</span>
                        <span className="text-gray-900 font-semibold text-base md:text-xl">{headquarters}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyProfile