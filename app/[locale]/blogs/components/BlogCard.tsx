import { cn, timeAgo } from "@/lib/utils";
import { Blog } from "@/types/blog";
import { useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

type BlogCardProps = {
    orientation?: "horizontal" | "vertical";
    includeImage?: boolean;
    blog: Blog
};

function BlogCard({ orientation = "vertical", includeImage = true, blog }: BlogCardProps) {
    const locale = useLocale();
    const isRTL = locale === "ar";
    const isHorizontal = orientation === "horizontal";

    return (
        <article className="group">
            <Link href={`/blogs/${blog.id}`} className={cn(
                "flex flex-col gap-4",
                isHorizontal ? "sm:flex-row sm:items-center" : "items-start"
            )}>
                {/* Image */}
                {includeImage && (
                    <figure
                        className={cn(
                            "relative aspect-square rounded-xl overflow-hidden",
                            isHorizontal ? "w-full sm:w-40" : "w-full"
                        )}
                    >
                        <Image
                            src={blog.thumbnail}
                            alt="blog image"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 25vw"
                            className="object-cover"

                        />
                    </figure>

                )}

                {/* Text content */}
                <div className="flex flex-col gap-4 flex-1">
                    {/* Tags */}
                    {/* <ul className="flex flex-wrap gap-2 w-full">
                        {blog.tags.map((tag) => (
                            <Badge className="bg-muted text-black font-bold text-xs capitalize" key={tag}>{tag}</Badge>
                        ))}
                    </ul> */}

                    <p className="font-bold group-hover:underline">
                        {blog.content.title}
                    </p>
                    <p className="text-xs">{blog.dateCreated.toDate().toLocaleDateString(isRTL ? "ar-EG" : "en-US", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                        numberingSystem: "latn"
                    })} ● {timeAgo(blog.dateCreated.toDate(), locale)}</p>
                </div>
            </Link>
        </article>
    );
}

export default BlogCard;
