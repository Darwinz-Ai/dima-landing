import { getTranslations } from "next-intl/server";
import { BreadcrumbList, Organization, Service, WebApplication, WithContext } from "schema-dts"

export const orgJsonLd: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://thedar.ai/en#organization",
    name: "TheDar.AI",
    alternateName: "Darwinz.AI",
    legalName: "TheDar.AI",
    url: "https://thedar.ai/en",
    logo: {
        "@type": "ImageObject",
        url: "https://thedar.ai/web-app-manifest-512x512.png",
        caption: "TheDar.AI Logo"
    },
    description: "TheDar.AI is a Saudi-Egyptian AI startup offering dima, an Arabic-first AI media monitoring copilot for MENA marketers, brand managers, and PR professionals. Built specifically for Arabic dialects, slang, and Franco-Arabic content.",
    slogan: "Arabic First Media Monitoring & Social Listening Copilot",
    address: {
        "@type": "PostalAddress",
        streetAddress: "King Abdullah Ibn Abdulaziz Saud Branch",
        addressLocality: "Riyadh",
        addressRegion: "Al Raed District",
        addressCountry: "SA",
        postalCode: "12354"
    },
    knowsLanguage: [
        {
            "@type": "Language",
            name: "Arabic",
            alternateName: "ar"
        },
        {
            "@type": "Language",
            name: "English",
            alternateName: "en"
        }
    ],
    founder: [
        {
            "@type": "Person",
            name: "Mohy Aboualam",
            jobTitle: "Co-Founder & CEO"
        },
        {
            "@type": "Person",
            name: "Emad Elazhary",
            jobTitle: "Co-Founder"
        }
    ],
    foundingDate: "2021",
    foundingLocation: {
        "@type": "Place",
        address: {
            "@type": "PostalAddress",
            streetAddress: "King Abdullah Ibn Abdulaziz Saud Branch",
            addressLocality: "Riyadh",
            addressRegion: "Al Raed District",
            addressCountry: "SA",
            postalCode: "12354"
        }
    },
    numberOfEmployees: {
        "@type": "QuantitativeValue",
        minValue: 10,
        maxValue: 50
    },
    sameAs: [
        "https://web.facebook.com/people/TheDarAI/61585271307642/",
        "https://x.com/TheDarAI",
        "https://www.instagram.com/thedar.ai",
        "https://www.youtube.com/@dima-social",
        "https://www.linkedin.com/company/thedar-ai/",
    ],
    knowsAbout: [
        "Artificial Intelligence",
        "Media Monitoring",
        "Arabic NLP",
        "Social Media Analytics",
        "Brand Management",
        "Public Relations",
        "Marketing Technology",
        "Arabic Language Processing",
        "Social Media Listening",
        "Brand Intelligence",
        "Dialect Detection",
        "Brand Monitoring",
        "Brand Metrics",
        "Franco-Arabic",
        "Sentiment Analysis"
    ],
    contactPoint: [
        {
            "@type": "ContactPoint",
            contactType: "request a demo",
            email: "info@thedar.ai",
            url: "https://thedar.ai/en/request-demo"
        }
    ],
    keywords: "Arabic AI, Media Monitoring, MENA Marketing, PR Technology, Social Listening, Brand Intelligence, Arabic NLP, Franco-Arabic, Dialect Detection, Media Analytics",
    award: [
        "Flat6Labs KSA Portfolio Company 2024",
        "Google Cloud Build Partner"
    ],
    email: "info@thedar.ai",
    areaServed: [
        { "@type": "Country", name: "Saudi Arabia", identifier: "SA" },
        { "@type": "Country", name: "United Arab Emirates", identifier: "AE" },
        { "@type": "Country", name: "Bahrain", identifier: "BH" },
        { "@type": "Country", name: "Oman", identifier: "OM" },
        { "@type": "Country", name: "Qatar", identifier: "QA" },
        { "@type": "Country", name: "Kuwait", identifier: "KW" },
        { "@type": "Country", name: "Egypt", identifier: "EG" },
        { "@type": "Country", name: "Morocco", identifier: "MA" },
        { "@type": "Country", name: "Algeria", identifier: "DZ" },
        { "@type": "Country", name: "Tunisia", identifier: "TN" },
        { "@type": "Country", name: "Libya", identifier: "LY" },
        { "@type": "Country", name: "Mauritania", identifier: "MR" }
    ],
}

export const productJsonLd: WithContext<WebApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://thedar.ai/en#product",
    name: "dima",
    alternateName: "dima AI Copilot",
    url: "https://thedar.ai/en",
    description: "dima is an Arabic-first AI copilot for media monitoring and brand intelligence. It helps marketers, brand managers, and PR professionals in the MENA region monitor traditional and social media, analyze sentiment, detect trends, and generate real-time insights. Unlike global tools, dima understands Arabic dialects, slang, and Franco-Arabic content.",
    creator: {
        "@id": "https://thedar.ai/en#organization"
    },
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Media Monitoring Software",
    operatingSystem: "Web",
    countriesSupported: ["SA", "AE", "BH", "OM", "QA", "KW", "EG", "MA", "DZ", "TN", "LY", "MR"],
    featureList: [
        "Social Listening & Analytics",
        "PR & Comms",
        "Own Page Intelligence",
        "Market Insights",
        "Influencer Marketing",
        "Consumer Insights",
        "Arabic-first AI with dialect and slang detection",
        "Franco-Arabic content understanding",
        "Real-time media monitoring across social, print, TV, and radio",
        "Sentiment analysis optimized for Arabic content",
        "Competitive benchmarking",
        "Crisis detection and alerts",
        "Custom reporting and dashboards",
        "Trend identification",
        "Brand perception analysis",
        "Multi-platform social listening",
        "Automated report generation",
        "Audience insights and demographics"
    ],
    screenshot: [
        "https://thedar.ai/solutions/ci/build%20smarter%20campaigns.png",
        "https://thedar.ai/solutions/ci/uncover%20what%20drives.png",
        "https://thedar.ai/solutions/ci/understand%20ur%20audience.png",

        "https://thedar.ai/solutions/im/ensure.png",
        "https://thedar.ai/solutions/im/evaluate.png",
        "https://thedar.ai/solutions/im/measure.png",

        "https://thedar.ai/solutions/mi/Benchmark.png",
        "https://thedar.ai/solutions/mi/campaign%20impact.png",
        "https://thedar.ai/solutions/mi/Capitalize%20on%20market.png",

        "https://thedar.ai/solutions/oi/evaluate%20.png",
        "https://thedar.ai/solutions/oi/optimize%20your%20messaging.png",
        "https://thedar.ai/solutions/oi/Post%20when%20it%20matters.png",
        "https://thedar.ai/solutions/oi/turn%20comments%20into.png",

        "https://thedar.ai/solutions/pr/Client%20ready%20in%20every%20format.png",
        "https://thedar.ai/solutions/pr/eliminate.png",
        "https://thedar.ai/solutions/pr/Measure%20what%20matters.png",
        "https://thedar.ai/solutions/pr/see%20the%20whole%20narrative.png",
        "https://thedar.ai/solutions/pr/track.png",

        "https://thedar.ai/solutions/sl/communities.png",
        "https://thedar.ai/solutions/sl/go%20beyond%20mention.png",
        "https://thedar.ai/solutions/sl/Post%20vs%20comments.png",
        "https://thedar.ai/solutions/sl/Trend%20detection.png",
    ],
    publisher: {
        "@id": "https://thedar.ai/en#organization"
    },
    sameAs: [
        "https://thedar.ai/en/solutions/social-listening-analytics",
        "https://thedar.ai/en/solutions/pr-comms",
        "https://thedar.ai/en/solutions/market-insights",
        "https://thedar.ai/en/solutions/influencer-marketing",
        "https://thedar.ai/en/solutions/own-page-intelligence",
        "https://thedar.ai/en/solutions/consumer-insights",
    ],
    potentialAction: {
        "@type": "CommunicateAction",
        target: {
            "@type": "EntryPoint",
            urlTemplate: "https://thedar.ai/en/request-demo",
            actionPlatform: [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform"
            ]
        }
    },
    keywords: [
        "dima",
        "media monitoring copilot",
        "AI media monitoring",
        "PR teams",
        "brand managers",
        "campaign tracking",
        "crisis detection",
        "competitor analysis",
        "automated reporting",
        "Arabic social listening"
    ],
    browserRequirements: "Requires JavaScript and HTML5",
    countryOfOrigin: "Kingdom of Saudi Arabia",
    dateCreated: "2024",
    isFamilyFriendly: true,
    isAccessibleForFree: true,
    audience: ["Brand Managers", "PR & Marketing Experts", "Communication Specialists", "Agencies and Enterprises", "MENA region"]
}

export const createBreadcrumbs = (parts: { name: string, path: string }[]): WithContext<BreadcrumbList> => {
    const domain = "https://thedar.ai";
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: parts.map((part, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: part.name,
            item: `${domain}${part.path}`
        }))
    }
}

export const getSolutionSchema = async (
    slug: string,
    locale: string,
    logoPath: string
) => {
    const t = await getTranslations("SEO");
    const localizedPath = `/${locale}`;

    const title = t(`Solutions-${slug}.title`)
    const description = t(`Solutions-${slug}.description`)

    const breadcrumbs = createBreadcrumbs([
        { name: "Home", path: localizedPath },
        { name: "Solutions", path: `${localizedPath}/solutions` },
        { name: title, path: `${localizedPath}/solutions/${slug}` },
    ]);

    const service: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: title,
        description: description,
        serviceType: `AI Powered ${title}`,
        logo: {
            "@type": "ImageObject",
            url: logoPath,
            caption: `Logo for ${slug}`
        },
        provider: {
            "@type": "Organization",
            "@id": "https://thedar.ai/en#organization",
            name: "TheDar.AI"
        },
        areaServed: [
            { "@type": "Country", name: "Saudi Arabia", identifier: "SA" },
            { "@type": "Country", name: "United Arab Emirates", identifier: "AE" },
            { "@type": "Country", name: "Bahrain", identifier: "BH" },
            { "@type": "Country", name: "Oman", identifier: "OM" },
            { "@type": "Country", name: "Qatar", identifier: "QA" },
            { "@type": "Country", name: "Kuwait", identifier: "KW" },
            { "@type": "Country", name: "Egypt", identifier: "EG" },
            { "@type": "Country", name: "Morocco", identifier: "MA" },
            { "@type": "Country", name: "Algeria", identifier: "DZ" },
            { "@type": "Country", name: "Tunisia", identifier: "TN" },
            { "@type": "Country", name: "Libya", identifier: "LY" },
            { "@type": "Country", name: "Mauritania", identifier: "MR" }
        ],
        audience: {
            "@type": "Audience",
            audienceType: "PR and Marketing Professionals"
        }
    };

    return [breadcrumbs, service];
};

