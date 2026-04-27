import { cn } from "@/lib/utils";

type BlogCardSkeletonProps = {
    orientation?: "horizontal" | "vertical";
    includeImage?: boolean;
};

function BlogCardSkeleton({ orientation = "vertical", includeImage = true }: BlogCardSkeletonProps) {
    const isHorizontal = orientation === "horizontal";

    return (
        <article className="group animate-pulse">
            <div className={cn(
                "flex flex-col gap-4 flex-1 ",
                isHorizontal ? "sm:flex-row sm:items-center" : "items-start"
            )}>
                {/* Image Skeleton */}
                {includeImage && (
                    <div className={cn(
                        "bg-muted rounded-xl overflow-hidden",
                        isHorizontal
                            ? "w-full sm:w-48 h-48 sm:h-28"
                            : "w-full min-h-[200px]"
                    )}></div>
                )}

                {/* Text content skeleton */}
                <div className="flex flex-col gap-4 flex-1 w-full">
                    {/* Tags skeleton */}
                    <ul className="flex flex-wrap gap-2 w-full">
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <li key={idx} className="bg-muted rounded-full w-16 h-5"></li>
                        ))}
                    </ul>

                    {/* Title skeleton */}
                    <div className="bg-muted rounded h-5 w-3/4"></div>

                    {/* Date skeleton */}
                    <div className="bg-muted rounded h-3 w-1/3"></div>
                </div>
            </div>
        </article>
    );
}

export default BlogCardSkeleton;
