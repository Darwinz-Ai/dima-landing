export const sideInfoIcons = [
  "/case-study-icons/challenge-icon.png",
  "/case-study-icons/solution-icon.png",
  "/case-study-icons/result-icon.png",
];

export type SolutionKey = "sl" | "pr" | "oi" | "mi" | "ci" | "im";

export interface SolutionAsset {
  icon: string;
  href: string;
  title: {
    en: string;
    ar: string;
  };
}

export const usedSolutionsAssets: Record<SolutionKey, SolutionAsset> = {
  sl: {
    icon: "https://firebasestorage.googleapis.com/v0/b/dima-landing.firebasestorage.app/o/Navbar%2Fnav-links%2Fsl.svg?alt=media&token=5462149c-87b4-4471-9783-fa9cf99cda2e",
    title: {
      en: "Social Listening & Analytics",
      ar: "الاستماع الاجتماعي والتحليلات",
    },
    href: "/solutions/social-listening-analytics",
  },
  pr: {
    icon: "https://firebasestorage.googleapis.com/v0/b/dima-landing.firebasestorage.app/o/Navbar%2Fnav-links%2Fpr.svg?alt=media&token=d8cd7d25-eced-4ed4-afd3-9564be8db2ea",
    title: {
      en: "PR & Comms",
      ar: " العلاقات العامة والاتصالات",
    },
    href: "/solutions/pr-comms",
  },
  oi: {
    icon: "https://firebasestorage.googleapis.com/v0/b/dima-landing.firebasestorage.app/o/Navbar%2Fnav-links%2Foi.svg?alt=media&token=cdcc2077-5cf0-4507-aa91-6728e1a18c96",
    title: {
      en: "Own Page Intelligence",
      ar: "معلومات الصفحة الخاصة",
    },
    href: "/solutions/own-page-intelligence",
  },
  mi: {
    icon: "https://firebasestorage.googleapis.com/v0/b/dima-landing.firebasestorage.app/o/Navbar%2Fnav-links%2Fmi.svg?alt=media&token=f0d86772-8efa-4c75-84d7-566483983dad",
    title: {
      en: "Market Intelligence",
      ar: "معلومات السوق",
    },
    href: "/solutions/market-intelligence",
  },
  ci: {
    icon: "https://firebasestorage.googleapis.com/v0/b/dima-landing.firebasestorage.app/o/Navbar%2Fnav-links%2Fci.svg?alt=media&token=9feaeb34-a7d5-48d1-b08e-23f36d487c6c",
    title: {
      en: "Consumer Insights",
      ar: "رؤى المستهلك",
    },
    href: "/solutions/consumer-insights",
  },
  im: {
    icon: "https://firebasestorage.googleapis.com/v0/b/dima-landing.firebasestorage.app/o/Navbar%2Fnav-links%2Fim.svg?alt=media&token=53f4360a-8a98-4f52-8070-2e3f47f36430",
    title: {
      en: "Influencer Marketing",
      ar: "تسويق المؤثرين",
    },
    href: "/solutions/influencer-marketing",
  },
};
