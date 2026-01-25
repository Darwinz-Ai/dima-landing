import { LanguageLink, NavLink, SocialMediaLink, SolutionLink } from "@/types";
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTiktok, IconBrandX, IconBrandYoutube } from "@tabler/icons-react";
import enFlag from "@/public/flags/en.png";
import arFlag from "@/public/flags/ar.png";

export const footerResourcesLinks: NavLink[] = [
  {
    title: "Case Studies",
    href: "/case-studies",
    translationKey: "caseStudies",
  },
  {
    title: "Blogs",
    href: "/blogs",
    translationKey: "blogs",
  },
];

export const dimaSolutions: SolutionLink[] = [
  {
    logo: "/nav-links/pr.svg",
    title: "PR & Comms",
    description: "Daily monitoring & coverage reports",
    href: "/solutions/pr-comms",
    translationKey: "prComms",
  },
  {
    logo: "/nav-links/mi.svg",
    title: "Market Insights",
    description: "Benchmark performance",
    href: "/solutions/market-insights",
    translationKey: "marketInsights",
  },
  {
    logo: "/nav-links/sl.svg",
    title: "Social Listening & Analytics",
    description: "Listen, analyze & act",
    href: "/solutions/social-listening-analytics",
    translationKey: "socialListening",
  },
  {
    logo: "/nav-links/ci.svg",
    title: "Consumer Insights",
    description: "Understand your audience everywhere",
    href: "/solutions/consumer-insights",
    translationKey: "consumerInsights",
  },
  {
    logo: "/nav-links/oi.svg",
    title: "Own Page Intelligence",
    description: "Elevate your social presence",
    href: "/solutions/own-page-intelligence",
    translationKey: "ownIntelligence",
  },
  {
    logo: "/nav-links/im.svg",
    title: "Influencer Marketing",
    description: "Find the right partners for your brand",
    href: "/solutions/influencer-marketing",
    translationKey: "influencerMarketing",
  },
  {
    logo: "/nav-links/ce.svg",
    title: "Customer Experience",
    description: "Collect & analyze reviews",
    href: "/solutions/customer-experience",
    translationKey: "customerExperience",
  },
];

export const socialMediaLinks: SocialMediaLink[] = [
  {
    href: "https://www.linkedin.com/company/darwinz-ai",
    icon: IconBrandLinkedin,
  },
  {
    href: "https://www.instagram.com/thedar.ai",
    icon: IconBrandInstagram,
  },
  {
    href: "https://web.facebook.com/people/TheDarAI/61585271307642/",
    icon: IconBrandFacebook,
  },
  {
    href: "https://www.tiktok.com/@thedar.ai",
    icon: IconBrandTiktok,
  },
  {
    href: "https://x.com/TheDarAI",
    icon: IconBrandX,
  },
  {
    href: "https://www.youtube.com/@dima-social",
    icon: IconBrandYoutube,
  },
];

export const languages: LanguageLink[] = [
  { locale: "en", label: "English", flag: enFlag },
  { locale: "ar", label: "العربية", flag: arFlag },
];
