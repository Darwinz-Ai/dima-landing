export const BLOG_TOPICS = [
    { slug: "media-monitoring" },
    { slug: "social-listening-and-reputation-monitoring" },
    { slug: "monitoring-and-analytics-tools" },
    { slug: "competitor-analysis" },
    { slug: "influencer-monitoring" },
    { slug: "crisis-management" },
] as const

export type BlogTopicSlug = (typeof BLOG_TOPICS)[number]["slug"]

export function isBlogTopicSlug(slug: string): slug is BlogTopicSlug {
    return BLOG_TOPICS.some((topic) => topic.slug === slug)
}

export function getTopicBySlug(slug: string) {
    return BLOG_TOPICS.find((topic) => topic.slug === slug)
}
