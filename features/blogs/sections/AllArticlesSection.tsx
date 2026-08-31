import { getTranslations } from "next-intl/server";

import GroupedBlogs from "@/features/blogs/components/ui/GroupedBlogs";
import BlogCard from "@/features/blogs/components/cards/BlogCard";
import PaginationWrapper from "@/features/case-studies/components/ui/PaginationWrapper";

import { Blog } from "@/types/blog";

type AllArticlesSectionProps = {
    blogs: Blog[];
    currentPage: number;
    totalPages: number;
};

export default async function AllArticlesSection({ blogs, currentPage, totalPages }: AllArticlesSectionProps) {
    const t = await getTranslations("Blogs");

    return (
        <div id="articles-grid" className="container mx-auto flex justify-center items-center gap-8 w-full scroll-mt-24">
            <div className="flex-1">
                <GroupedBlogs title={t("allBlogs")} includeViewAll={false} className="sm:flex-col" >
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 w-full">
                        {blogs.length === 0 && <p className="col-span-full">No articles found.</p>}
                        {blogs.map((blog) => (
                            <li key={`blogs/${blog.id}`}>
                                <BlogCard blog={blog} />
                            </li>
                        ))}
                    </ul>
                </GroupedBlogs>

                <div className="my-4">
                    <PaginationWrapper
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />
                </div>
            </div>
        </div>
    );
}