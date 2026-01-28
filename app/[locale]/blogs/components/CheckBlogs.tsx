"use client";
import React from 'react'
import GroupedBlogs from './GroupedBlogs'
import { useTranslations } from 'next-intl'
import LoadingAnimation from '@/components/shared/LoadingAnimation'
import { notFound } from 'next/navigation'
import useBlogs from '../hooks/useBlogs'
import BlogCardSkeleton from './BlogCardSkeleton';
import BlogCard from './BlogCard';

const CheckBlogs = () => {
    const t = useTranslations("Blog")
    const { data: blogs, isLoading: blogsLoading, isError: blogsError } = useBlogs(4);
    if (blogsLoading) return <LoadingAnimation />
    if (blogsError) return notFound()
    return (
        <div className="container mx-auto">
            <div className="flex-1">
                <GroupedBlogs title={t("checkMoreBlogs")} hrefViewAll="/blogs">
                    {blogsError && <p>Failed to load more blogs</p>}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
                        {
                            blogsLoading
                                ? Array.from({ length: 4 }).map((_, i) => (
                                    <li key={`skeleton-blogs-${i}`}>
                                        <BlogCardSkeleton />
                                    </li>
                                ))
                                : blogs?.map((blog) => (
                                    <li key={blog.id}>
                                        <BlogCard blog={blog} />
                                    </li>
                                ))
                        }
                    </ul>
                </GroupedBlogs>
            </div>
        </div>
    )
}

export default CheckBlogs