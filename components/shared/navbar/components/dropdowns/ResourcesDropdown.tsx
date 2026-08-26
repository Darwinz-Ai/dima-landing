import { Link } from "@/i18n/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { fetchBlogs } from "@/lib/firebase/blogsFunctions";
import Image from "next/image";
import { BlogsGraphic, FaqsGraphic } from "@/components/shared/ResourceGraphics";
import { Blog } from "@/types/blog";

const resourceLinks = [
    {
        href: "/blogs",
        translationKey: "blogs",
        Graphic: BlogsGraphic,
    },
    {
        href: "/faq",
        translationKey: "faqs",
        Graphic: FaqsGraphic,
    },
] as const;

async function ResourcesDropdown() {
    const t = await getTranslations("Navbar.resources");
    const locale = await getLocale();

    // 2. Fetch exactly 2 recent blogs instead of 3
    let latestBlogs: Blog[] = [];
    try {
        const blogs = await fetchBlogs(locale, [], 2);
        if (blogs && blogs.length > 0) {
            latestBlogs = blogs;
        }
    } catch (error) {
        console.error("Failed to load latest blogs for navbar", error);
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 w-full">

            {/* LEFT COLUMN: Large Navigation Cards */}
            <div className="flex-1 flex flex-col min-w-[350px]">
                <div>
                    <h2 className="text-3xl font-semibold">
                        {t("title")}
                    </h2>
                    <div
                        className="mb-6 h-0.5 w-8 bg-primary me-auto"
                    ></div>
                </div>

                <div className="flex flex-col gap-4">
                    {resourceLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            // 3. Upgraded to a large, chunky card with a subtle border/shadow on hover
                            className="group flex items-center gap-6 rounded-2xl border border-transparent p-3 transition-all hover:border-border hover:bg-surface hover:shadow-sm"
                        >
                            {/* 4. Large image container matching the "Solutions" style */}
                            {/* Center the graphic inside its figure by adding justify-center and items-center to figure */}
                            <figure className="relative h-[90px] w-[120px] shrink-0 overflow-hidden rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                                {/* 2. Render the custom SVG Graphic, passing tailwind classes so it sizes correctly and is centered */}
                                <div className="flex w-full h-full items-center justify-center">
                                    <link.Graphic className="w-full h-full object-contain p-1 mx-auto my-auto" />
                                </div>
                            </figure>

                            <div className="space-y-1.5">
                                {/* Increased font size for the link title */}
                                <p className="text-lg font-bold group-hover:text-primary transition-colors">
                                    {t(`links.${link.translationKey}.title`)}
                                </p>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {t(`links.${link.translationKey}.description`)}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* RIGHT COLUMN: 2 Stacked Latest Blogs (Larger Fonts) */}
            <div className="flex-1 flex flex-col md:w-[450px] border-t md:border-t-0 md:border-s border-border md:ps-8 pt-6 md:pt-0">
                <h3 className="text-3 font-semibold text-muted-foreground uppercase tracking-wider mb-6">
                    {t("latest")}
                </h3>

                {/* Increased gap between the two blogs */}
                <div className="flex flex-col gap-6">
                    {latestBlogs.length > 0 ? (
                        latestBlogs.map((blog) => (
                            <Link
                                key={blog.id}
                                href={`/blogs/${blog.id}`}
                                className="group flex items-start gap-5 rounded-xl hover:bg-surface p-3 -mx-3 transition-colors"
                            >
                                {/* 5. Much larger thumbnail for the 2-blog layout */}
                                {blog.thumbnail && (
                                    <div className="relative h-24 w-36 shrink-0 rounded-lg overflow-hidden bg-muted">
                                        <Image
                                            src={blog.thumbnail}
                                            alt={blog.content?.title || ""}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                )}

                                {/* 6. Increased font sizes for Title (text-base) and Description (text-xs) */}
                                <div className="flex flex-col justify-start overflow-hidden pt-1">
                                    <h4 className="text-base font-semibold line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                                        {blog.content?.title}
                                    </h4>
                                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                                        {blog.content?.description || "Read more..."}
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        // Updated Skeleton for 2 larger items
                        Array.from({ length: 2 }).map((_, idx) => (
                            <div key={`skeleton-${idx}`} className="flex items-start gap-5 p-3 animate-pulse">
                                <div className="h-24 w-36 rounded-lg bg-surface/50 shrink-0"></div>
                                <div className="space-y-3 w-full pt-1">
                                    <div className="h-5 bg-surface/50 rounded w-full"></div>
                                    <div className="h-4 bg-surface/50 rounded w-2/3"></div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default ResourcesDropdown;