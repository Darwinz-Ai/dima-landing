
import { Blog } from "@/types/blog"
import { BlogCard } from "./BlogCard"
import { PageSection } from "@/components/shared/PageSection"
import { EmptyState } from "@/components/shared/EmptyState"
import { LatestPostCard } from "./LatestPostCard"
import { getTranslations } from "next-intl/server"

export const BlogHero = async ({
    featured,
    latest,
}: {
    featured: Blog | null
    latest: Blog[]
}) => {
    const t = await getTranslations("Blogs");
    return (
        <PageSection className="mt-24 border-b border-line bg-surface">
            <div className="grid items-end gap-5 border-b border-line pb-5 md:grid-cols-[1.4fr_.6fr]">
                <div>
                    <span className="section-kicker">{t("dimaBlogs")}</span>
                    <h1 className="mt-2.5 max-w-170 text-[clamp(2.5rem,4.6vw,4.25rem)] leading-[.95] font-[650] tracking-[-.055em]">
                        {t("readSignal")}
                        <br />
                        {t("moveContext")}
                    </h1>
                </div>
                <p className="max-w-100 text-3.25 leading-[1.55] text-copy md:justify-self-end">
                    {t("heroDescription")}
                </p>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(18rem,.75fr)]">
                {featured ? (
                    <BlogCard post={featured} variant="featured" />
                ) : (
                    <EmptyState
                        className="min-h-64"
                        title={t("emptyStates.featured.title")}
                        description={t("emptyStates.featured.description")}
                    />
                )}

                <aside aria-labelledby="latest-posts-heading">
                    <div className="flex items-center justify-between border-b border-ink pb-2.5">
                        <h2 className="text-4 font-[520]" id="latest-posts-heading">
                            {t("latestBlogs")}
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
                            description={t("emptyStates.latest.description")}
                            headingLevel={3}
                        />
                    )}
                </aside>
            </div>
        </PageSection>
    )

}