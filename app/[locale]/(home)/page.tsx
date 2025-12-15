import HeroSection from "./sections/HeroSection";
import EmpoweringAgenciesSection from "./sections/EmpoweringAgenciesSection";
import OwnConversationSection from "./sections/OwnConversationSection";
import DimaAiSection from "./sections/DimaAiSection";
import DimaSuiteSection from "./sections/DimaSuiteSection";
import CaseStudiesSection from "./sections/CaseStudiesSection";
import TestimonialSection from "./sections/TestimonialSection";
import QuestionsAnsweredSection from "@/app/[locale]/(home)/sections/QuestionsAnsweredSection";
import { Metadata } from "next";
import RequestDemoSection from "@/components/shared/form/RequestDemoSection";

export const metadata: Metadata = {
  title: "dima - Your Media Monitoring Copilot",
  description:
    "AI-powered media monitoring for marketers, PR teams, and brand managers. Track campaigns, detect crises, analyze competitors, and automate reporting — all in one place.",
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
    "Arabic social listening",
  ],
  metadataBase: new URL("https://thedar.ai"),

  openGraph: {
    title: "dima – Your Media Monitoring Copilot",
    description:
      "AI-powered media monitoring for marketers, PR teams, and brand managers. Track campaigns, detect crises, analyze competitors, and automate reporting — all in one place.",
    url: "https://thedar.ai",
    siteName: "dima",
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
    title: "dima – Your Media Monitoring Copilot",
    description:
      "AI-powered media monitoring for marketers, PR teams, and brand managers. Track campaigns, detect crises, analyze competitors, and automate reporting — all in one place.",
    images: ["/og-image.png"],
  },

  alternates: {
    canonical: "https://thedar.ai",
  },
};


function HomePage() {
  return (
    <main className="h-full">
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