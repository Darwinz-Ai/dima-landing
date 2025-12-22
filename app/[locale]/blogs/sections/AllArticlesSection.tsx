"use client";
import { useTranslations } from "next-intl";
import GroupedBlogs from "../components/GroupedBlogs";
import VideosSection from "./VideosSection";
import BlogCardSkeleton from "../components/BlogCardSkeleton";
import BlogCard from "../components/BlogCard";
import { useRef, useState } from "react";
import { usePaginatedBlogs } from "../hooks/usePaginatedBlogs";
import PaginationWrapper from "../../case-studies/components/PaginationWrapper";

const PAGE_SIZE = 16;

function AllArticlesSection() {
    const t = useTranslations("Blogs");
    // const { data: blogs, isLoading, isError } = useBlogs(16)
    const [pageIndex, setPageIndex] = useState(0);
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        totalPages,
        error
    } = usePaginatedBlogs(PAGE_SIZE);
    const blogGridRef = useRef<HTMLDivElement>(null);

    const pages = data?.pages ?? [];
    const currentPage = pages[pageIndex]?.blogs ?? [];

    const handlePrevious = () => {
        if (pageIndex === 0) return;
        setPageIndex((prev) => Math.max(prev - 1, 0))
        blogGridRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handleSelectPage = async (pageNumber: number) => {
        const targetIndex = pageNumber - 1;

        // If I'm currently on the page, or negative page or out of bounds page
        if (targetIndex === pageIndex || targetIndex < 0 || targetIndex >= totalPages) return;

        // Get page from cache
        if (targetIndex < pages.length) {
            setPageIndex(targetIndex);
            blogGridRef.current?.scrollIntoView({ behavior: "smooth" })
            return;
        }

        if (!hasNextPage) return;

        let currentPagesLength = pages.length;

        // Fetch next pages until the target index is reached
        while (targetIndex >= currentPagesLength) {
            const result = await fetchNextPage();
            const nextLength = result.data?.pages.length ?? currentPagesLength;

            if (nextLength === currentPagesLength)
                break;
            currentPagesLength = nextLength;
        }

        // Set the page we want to navigate to
        if (targetIndex < currentPagesLength) {
            setPageIndex(targetIndex)
            blogGridRef.current?.scrollIntoView({ behavior: "smooth" })
        }

    }

    const handleNext = async () => {
        if (pageIndex + 1 >= totalPages) return;
        await handleSelectPage(pageIndex + 2);
    }

    const canGoPrevious = pageIndex > 0;
    const canGoNext = pageIndex + 1 < totalPages;
    const currentPageNumber = Math.min(pageIndex + 1, totalPages);

    const shouldShowSkeletons = isLoading && pages.length === 0;


    return (
        <div className="container mx-auto flex justify-center items-center gap-8 w-full">
            <div className="flex-1" ref={blogGridRef}>
                <GroupedBlogs title={t("allBlogs")} includeViewAll={false} className="sm:flex-col" >
                    {/* First grid */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 w-full" >
                        {isError && <p>An error occurred: {error?.message}</p>}
                        {
                            shouldShowSkeletons
                                ? Array.from({ length: 8 }).map((_, i) => (
                                    <li key={`skeleton-grid1-${i}`}>
                                        <BlogCardSkeleton />
                                    </li>
                                ))
                                : currentPage?.slice(0, 8).map((blog) => (
                                    <li key={`blogs/${blog.id}`}>
                                        <BlogCard blog={blog} />
                                    </li>
                                ))
                        }
                    </ul>

                    <VideosSection title={t("videosSection.title")} />

                    {/* Second grid */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 w-full">
                        {isError && <p>Failed to load latest blogs</p>}
                        {
                            isLoading
                                ? Array.from({ length: 8 }).map((_, i) => (
                                    <li key={`skeleton-grid2-${i}`}>
                                        <BlogCardSkeleton />
                                    </li>
                                ))
                                : currentPage?.slice(8).map((blog) => (
                                    <li key={`blogs/${blog.id}`}>
                                        <BlogCard blog={blog} />
                                    </li>
                                ))
                        }
                    </ul>
                </GroupedBlogs>

                {/* Pagination Component */}
                <div className="my-4">
                    <PaginationWrapper
                        currentPage={currentPageNumber}
                        totalPages={totalPages}
                        canGoPrevious={canGoPrevious}
                        canGoNext={canGoNext}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                        onSelectPage={handleSelectPage}
                        isLoadingNext={isFetchingNextPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default AllArticlesSection;