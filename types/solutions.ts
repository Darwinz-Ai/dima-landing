export type SolutionKey = "sl" | "pr" | "oi" | "mi" | "ci" | "im";

export type SolutionAsset = {
  icon: string;
  href: string;
  title: {
    en: string;
    ar: string;
  };
};

export type TestimonialAsset = {
  companyLogo: string;
  testimonialImage?: string;
};
