import React from 'react'
import GroupedBlogs from './GroupedBlogs'
import BlogCard from './BlogCard';
import { fetchBlogs } from '@/lib/firebase/blogsFunctions';
import { getLocale, getTranslations } from 'next-intl/server';

const CheckBlogs = async () => {
    const t = await getTranslations("Blog")
    const locale = await getLocale();

    try {
        const blogs = await fetchBlogs(locale, [], 4);
        return (
            <div className="container mx-auto">
                <div className="flex-1">
                    <GroupedBlogs title={t("checkMoreBlogs")} hrefViewAll="/blogs">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
                            {
                                blogs?.map((blog) => (
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
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
        return <p>Error: {errorMessage}</p>
    }
}

export default CheckBlogs