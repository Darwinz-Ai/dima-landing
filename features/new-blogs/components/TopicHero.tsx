import { getTranslations } from "next-intl/server"

import { Badge } from "@/components/ui/badge"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { EmptyState } from "@/components/shared/EmptyState"
import { PageSection } from "@/components/shared/PageSection"
import { Link } from "@/i18n/navigation"
import { BlogCard } from "./BlogCard"
import { LatestPostCard } from "./LatestPostCard"

import { Blog } from "@/types/blog"
import { BlogTopicSlug } from "../constants/topics"

export const TopicHero = async ({
    slug,
    featured,
    latest,
    articleCount,
}: {
    slug: BlogTopicSlug
    featured: Blog | null
    latest: Blog[]
    articleCount: number
}) => {
    const t = await getTranslations("Blogs")
    const topicName = t(`topics.items.${slug}.name`)
    const topicDescription = t(`topics.items.${slug}.description`)

    return (
        <PageSection className="mt-24 border-b border-line bg-surface">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/blogs">{t("allBlogs")}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="rtl:rotate-180" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{topicName}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-6 grid items-end gap-5 border-b border-line pb-5 md:grid-cols-[1.4fr_.6fr]">
                <div className="flex flex-col gap-3">
                    <span className="section-kicker">{t("topics.kicker")}</span>
                    <h1 className="max-w-170 text-[clamp(2.5rem,4.6vw,4.25rem)] leading-[.95] font-[650] tracking-[-.055em]">
                        {topicName}
                    </h1>
                    <Badge variant={"outline"}>
                        {t("topics.articleCount", { count: articleCount })}
                    </Badge>
                </div>
                <p className="max-w-100 text-3.25 leading-[1.55] text-copy md:justify-self-end">
                    {topicDescription}
                </p>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(18rem,.75fr)]">
                {featured ? (
                    <BlogCard post={featured} variant="featured" />
                ) : (
                    <EmptyState
                        className="min-h-64"
                        title={t("emptyStates.featured.title")}
                        description={t("emptyStates.topic.description")}
                    />
                )}

                <aside aria-labelledby="topic-latest-heading">
                    <div className="flex items-center justify-between border-b border-ink pb-2.5">
                        <h2 className="text-4 font-[520]" id="topic-latest-heading">
                            {t("topics.latestInTopic")}
                        </h2>
                        <span className="font-mono text-3.5 tracking-widest uppercase text-brand">
                            {t("new")}
                        </span>
                    </div>
                    {latest.length > 0 ? (
                        <div className="divide-y divide-line">
                            {latest.map((post) => (
                                <LatestPostCard post={post} key={post.id} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            className="mt-3 min-h-48"
                            title={t("emptyStates.latest.title")}
                            description={t("emptyStates.topic.description")}
                            headingLevel={3}
                        />
                    )}
                </aside>
            </div>
        </PageSection>
    )
}
