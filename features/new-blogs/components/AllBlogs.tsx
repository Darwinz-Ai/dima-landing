import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { Blog } from "@/types/blog"
import PaginationWrapper from "@/features/case-studies/components/ui/PaginationWrapper";
import { PageSection } from "@/components/shared/PageSection";
import { EmptyState } from "@/components/shared/EmptyState";
import { BlogCard } from "./BlogCard";
import { TopicNav } from "./TopicNav";

interface AllBlogsProps {
    posts: Blog[]
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
    }
    title?: string
    description?: string
    currentTopicSlug?: string
    showTopicNav?: boolean
}

export const AllBlogs = async ({
    posts,
    pagination,
    title,
    description,
    currentTopicSlug,
    showTopicNav = false,
}: AllBlogsProps) => {
    const t = await getTranslations("Blogs")

    return (
        <PageSection className="scroll-mt-nav bg-surface" id="blog-results">
            <SectionHeading
                eyebrow={t("pageProgress", {
                    currentPage: pagination.currentPage,
                    totalPages: pagination.totalPages
                })}
                title={title ?? t("allBlogs")}
                description={description ?? t("blogsGridDescription", {
                    count: pagination.totalItems
                })}
            />

            {showTopicNav ? (
                <div className="mb-8">
                    <TopicNav currentSlug={currentTopicSlug} />
                </div>
            ) : null}

            {posts.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <BlogCard post={post} key={post.id} />
                    ))}
                </div>
            ) : (
                <EmptyState
                    className="py-12"
                    title={t("emptyStates.grid.title")}
                    description={currentTopicSlug
                        ? t("emptyStates.topic.description")
                        : t("emptyStates.grid.description")}
                    headingLevel={3}
                />
            )}

            <PaginationWrapper
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                gridId="blog-results"
            />
        </PageSection>
    )
}