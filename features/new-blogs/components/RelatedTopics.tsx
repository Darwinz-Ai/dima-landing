import { getTranslations } from "next-intl/server"

import { PageSection } from "@/components/shared/PageSection"
import { SectionHeading } from "@/components/shared/SectionHeading"

import { TopicNav } from "./TopicNav"
import { BlogTopicSlug } from "../constants/topics"

export const RelatedTopics = async ({ slug }: { slug: BlogTopicSlug }) => {
    const t = await getTranslations("Blogs.topics")

    return (
        <PageSection className="border-t border-line bg-surface">
            <SectionHeading
                eyebrow={t("explore")}
                title={t("relatedTopics")}
                description={t("relatedTopicsDescription")}
            />
            <TopicNav currentSlug={slug} excludeSlug={slug} includeAll />
        </PageSection>
    )
}
