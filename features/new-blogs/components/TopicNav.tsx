import { getTranslations } from "next-intl/server"

import { Badge } from "@/components/ui/badge"
import { Link } from "@/i18n/navigation"

import { BLOG_TOPICS } from "../constants/topics"

type TopicNavProps = {
    currentSlug?: string
    includeAll?: boolean
    excludeSlug?: string
}

export const TopicNav = async ({
    currentSlug,
    includeAll = true,
    excludeSlug,
}: TopicNavProps) => {
    const t = await getTranslations("Blogs.topics")
    const topics = BLOG_TOPICS.filter((topic) => topic.slug !== excludeSlug)

    return (
        <nav aria-label={t("explore")}>
            <ul className="flex flex-wrap gap-2">
                {includeAll ? (
                    <li>
                        <Badge
                            asChild
                            variant={!currentSlug ? "default" : "secondary"}
                        >
                            <Link href="/blogs#blog-results">
                                {t("allTopics")}
                            </Link>
                        </Badge>
                    </li>
                ) : null}
                {topics.map((topic) => {
                    const isActive = currentSlug === topic.slug

                    return (
                        <li key={topic.slug}>
                            <Badge
                                asChild
                                variant={isActive ? "default" : "secondary"}
                            >
                                <Link href={`/blogs/topics/${topic.slug}`}>
                                    {t(`items.${topic.slug}.name`)}
                                </Link>
                            </Badge>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}