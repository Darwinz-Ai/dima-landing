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
            <div className="container mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col gap-2">
                        <span className="text-destructive text-sm md:text-base font-bold uppercase tracking-widest">{t("industry")}</span>
                        <span className="text-gray-900 font-semibold text-lg md:text-xl">{industry}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-destructive text-sm md:text-base font-bold uppercase tracking-widest">{t("organization")}</span>
                        <span className="text-gray-900 font-semibold text-lg md:text-xl">{organization}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-destructive text-sm md:text-base font-bold uppercase tracking-widest">{t("solution")}</span>
                        <span className="text-gray-900 font-semibold text-lg md:text-xl">{headquarters}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyProfile