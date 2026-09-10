import { getTranslations } from "next-intl/server"

import { Badge } from "@/components/ui/badge"
import CaseStudyBodyBlock from "./CaseStudyBodyBlock"
import HeroBackgroundDecorations from "./HeroBackgroundDecorations"
import CompanyProfile from "./CompanyProfile"
import StatsRow from "./StatsRow"

import { CaseStudy } from "@/types"

import { renderHeadline } from "../constants/helper"
import { FinalCta } from "@/features/new-home/final-cta/components/FinalCta"

interface HeroSectionProps {
    caseStudy: CaseStudy
}

const HeroSection = async ({ caseStudy }: HeroSectionProps) => {
    const t = await getTranslations("CaseStudy");
    return (
        <section className="w-full">
            <div className="w-full bg-[#351672] pb-16 px-6 relative overflow-hidden pt-24 md:pt-26">
                <HeroBackgroundDecorations />

                <div className="container mx-auto relative z-10">
                    {/* Top Logo Row */}
                    <div className="flex justify-between items-center mb-8 md:mb-12">
                        <div className="text-white text-3xl md:text-4xl font-extrabold tracking-wide flex items-start">
                            dima
                        </div>
                        <div className="text-white/80 text-2 md:text-xs font-semibold tracking-[0.3em] uppercase text-right">
                            {t("by")} THEDAR.AI
                        </div>
                    </div>

                    {/* Case Study Badge Row */}
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 md:mb-8">
                        <span className="text-brand text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
                            {caseStudy.type === "use cases" ? t("useCases") : t("customerSuccessStories")}
                        </span>
                        <Badge className="py-1.5 px-4 rounded-full border border-white/20 bg-white/5 text-white text-xs md:text-sm font-medium flex flex-wrap items-center gap-2 backdrop-blur-sm">
                            <span>{caseStudy.content.companyProfile.industry}</span>
                            <span className="opacity-50">&middot;</span>
                            <span>{caseStudy.content.companyProfile.headquarters}</span>
                        </Badge>
                    </div>

                    {/* Headline */}
                    <h1 className="text-white text-[2rem] md:text-[2.50rem] font-bold leading-[1.2] mb-10 md:mb-12 max-w-7xl">
                        {renderHeadline(
                            caseStudy?.content.headline.text,
                            caseStudy?.content.headline.highlight_blue,
                            caseStudy?.content.headline.highlight_orange,
                            caseStudy?.content.headline.highlight_pink
                        )}
                    </h1>

                    <StatsRow metrics={caseStudy.content.metrics} />
                </div>
            </div>

            <CompanyProfile companyProfile={caseStudy.content.companyProfile} />

            <div className="my-8">
                <CaseStudyBodyBlock
                    type="challenge"
                    title={caseStudy.content.body.challenge.header}
                    body={caseStudy.content.body.challenge.body}
                    imageSrc={caseStudy.content.body.challenge.image || undefined}
                    imageAlt="Case Study Example Chart"
                    orientation="text-image"
                />
                <CaseStudyBodyBlock
                    type="solution"
                    title={caseStudy.content.body.solution.header}
                    body={caseStudy.content.body.solution.body}
                    imageSrc={caseStudy.content.body.solution.image || undefined}
                    imageAlt="Case Study Example Chart"
                    orientation="image-text"
                />
                <CaseStudyBodyBlock
                    type="result"
                    title={caseStudy.content.body.result.header}
                    body={caseStudy.content.body.result.body}
                    orientation="image-text"
                />
            </div>

            <FinalCta />
        </section>
    )
}

export default HeroSection