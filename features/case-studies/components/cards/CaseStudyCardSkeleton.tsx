function CaseStudyCardSkeleton() {
    return (
        <article className="flex flex-col gap-4 p-8 shadow-[0_0_15px_rgba(0,0,0,0.07)] rounded-xl rounded-br-[96px] w-full h-full animate-pulse bg-white">
            <div className="space-y-3">
                <div className="h-6 w-32 rounded bg-muted"></div>
                <div className="h-4 w-40 rounded bg-muted"></div>
            </div>

            <div className="space-y-4">
                <div className="h-5 w-3/4 rounded bg-muted"></div>
                <div className="h-4 w-full rounded bg-muted"></div>
                <div className="h-4 w-5/6 rounded bg-muted"></div>
            </div>

            <div className="h-4 w-24 rounded bg-muted"></div>
        </article>
    );
}

export default CaseStudyCardSkeleton;

