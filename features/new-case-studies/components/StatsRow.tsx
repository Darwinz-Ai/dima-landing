import { CaseStudyMetrics } from "@/types"

interface StatsRowProps {
    metrics: CaseStudyMetrics[]
}

const StatsRow = ({ metrics }: StatsRowProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics?.slice(0, 3).map((metric, idx) => (
                <div
                    key={metric.title + idx}
                    className="border border-white/30 bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 flex flex-col justify-center"
                >
                    <div className={
                        [
                            "text-4xl md:text-5xl font-bold mb-3",
                            idx === 0 ? "text-brand" :
                                idx === 1 ? "text-accent" :
                                    "text-secondary"
                        ].join(" ")
                    }>
                        {`${metric.value}${metric.suffix || ""}`}
                    </div>
                    <div className="text-sm md:text-xl font-medium text-white/90">
                        {metric.title}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default StatsRow