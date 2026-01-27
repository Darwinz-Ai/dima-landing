import HeroSection from "./sections/HeroSection";
import EmpoweringAgenciesSection from "./sections/EmpoweringAgenciesSection";
import OwnConversationSection from "./sections/OwnConversationSection";
import DimaAiSection from "./sections/DimaAiSection";
import DimaSuiteSection from "./sections/DimaSuiteSection";
import CaseStudiesSection from "./sections/CaseStudiesSection";
import TestimonialSection from "./sections/TestimonialSection";
import QuestionsAnsweredSection from "@/app/[locale]/(home)/sections/QuestionsAnsweredSection";
import type { Metadata } from "next";
import RequestDemoSection from "@/components/shared/form/RequestDemoSection";
import { buildLocalizedMetadata } from "@/lib/seo";
import { Organization, SoftwareApplication, WithContext } from "schema-dts";
import JsonLd from "@/components/shared/JsonLd";

type HomePageProps = {
  params: Promise<{ locale: string }>
};

export async function generateMetadata(
  { params }: HomePageProps
): Promise<Metadata> {
  const { locale } = await params;
  return buildLocalizedMetadata(locale, "Home", {
    overrides: {
      metadataBase: new URL("https://thedar.ai"),
      openGraph: {
        url: `https://thedar.ai/${locale}`,
        siteName: "dima",
        locale,
        type: "website",
        images: [
          {
            url: "/og-image.png",
            width: 1200,
            height: 630,
            alt: "dima OG Image",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        images: ["/og-image.png"],
      },
      alternates: {
        canonical: `https://thedar.ai/${locale}`,
        languages: {
          en: "https://thedar.ai/en",
          ar: "https://thedar.ai/ar",
          "x-default": "https://thedar.ai/"
        }
      },
    },
  });
}

function HomePage() {
  const orgJsonLd: WithContext<Organization> = {
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
      addressCountry: "Kingdom of Saudi Arabia",
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
        addressCountry: "Kingdom of Saudi Arabia",
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
      "https://thedar.ai/en"
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
  const productJsonLd: WithContext<SoftwareApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://thedar.ai/en#product",
    name: "dima",
    alternateName: "dima AI Copilot",
    url: "https://thedar.ai/en",
    description: "dima is an Arabic-first AI copilot for media monitoring and brand intelligence. It helps marketers, brand managers, and PR professionals in the MENA region monitor traditional and social media, analyze sentiment, detect trends, and generate real-time insights. Unlike global tools, dima understands Arabic dialects, slang, and Franco-Arabic content.",
    creator: "TheDar.AI",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Media Monitoring Software",
    operatingSystem: "Web, iOs, Android",
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
      "https://thedar.ai/solutions/ci/build smarter campaigns.png",
      "https://thedar.ai/solutions/ci/uncover what drives.png",
      "https://thedar.ai/solutions/ci/understand ur audience.png",

      "https://thedar.ai/solutions/im/ensure.png",
      "https://thedar.ai/solutions/im/evaluate.png",
      "https://thedar.ai/solutions/im/measure.png",

      "https://thedar.ai/solutions/mi/Benchmark.png",
      "https://thedar.ai/solutions/mi/campaign impact.png",
      "https://thedar.ai/solutions/mi/Capitalize on market.png",

      "https://thedar.ai/solutions/oi/evaluate .png",
      "https://thedar.ai/solutions/oi/optimize your messaging.png",
      "https://thedar.ai/solutions/oi/Post when it matters.png",
      "https://thedar.ai/solutions/oi/turn comments into.png",

      "https://thedar.ai/solutions/pr/Client ready in every format.png",
      "https://thedar.ai/solutions/pr/eliminate.png",
      "https://thedar.ai/solutions/pr/Measure what matters.png",
      "https://thedar.ai/solutions/pr/see the whole narrative.png",
      "https://thedar.ai/solutions/pr/track.png",

      "https://thedar.ai/solutions/sl/communities.png",
      "https://thedar.ai/solutions/sl/go beyond mention.png",
      "https://thedar.ai/solutions/sl/Post vs comments.png",
      "https://thedar.ai/solutions/sl/Trend detection.png",
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
    hasPart: [
      {
        "@type": "WebApplication",
        name: "Social Listening & Analytics",
        description: "Monitor social media mentions, analyze sentiment, and get actionable insights with dima's AI-powered social listening solution."
      },
      {
        "@type": "WebApplication",
        name: "PR & Comms",
        description: "Manage public relations, track press coverage, and detect PR crises faster with dima's AI PR tools."
      },
      {
        "@type": "WebApplication",
        name: "Market Insights",
        description: "Gain deep market insights, monitor competitors, and track trends with AI-powered analytics from dima."
      },
      {
        "@type": "WebApplication",
        name: "Consumer Insights",
        description: "Understand customer behavior and sentiment, and make data-driven decisions with dima's consumer insights solution."
      },
      {
        "@type": "WebApplication",
        name: "Own Page Intelligence",
        description: "Analyze your own digital presence, measure content performance, and optimize engagement with AI insights."
      },
      {
        "@type": "WebApplication",
        name: "Influencer Marketing",
        description: "Discover, evaluate, and collaborate with influencers seamlessly. Measure campaign impact and maximize ROI with dima's AI-driven influencer marketing insights."
      },
    ],
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
    isFamilyFriendly: "True",
    isAccessibleForFree: "True",
  }
  return (
    <main className="h-full">
      <JsonLd data={[orgJsonLd, productJsonLd]} />
      <HeroSection />
      <EmpoweringAgenciesSection />
      <OwnConversationSection />
      <DimaAiSection />
      <DimaSuiteSection />
      <CaseStudiesSection />
      <TestimonialSection />
      <RequestDemoSection />
      <QuestionsAnsweredSection />
    </main>
  );
}

export default HomePage;