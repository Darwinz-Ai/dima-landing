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
    foundingDate: "2021",
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
  }
  const productJsonLd: WithContext<SoftwareApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://thedar.ai/en#product",
    name: "dima",
    alternateName: "dima AI Copilot",
    url: "https://thedar.ai/en",
    description: "dima is an Arabic-first AI copilot for media monitoring and brand intelligence. It helps marketers, brand managers, and PR professionals in the MENA region monitor traditional and social media, analyze sentiment, detect trends, and generate real-time insights. Unlike global tools, dima understands Arabic dialects, slang, and Franco-Arabic content.",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Media Monitoring Software",
    operatingSystem: "Web, iOs, Android",
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