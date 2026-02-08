import { Icon } from "@tabler/icons-react";
import { CaseStudyValue } from "./case-studies";

export type HeroSlide = {
    image: string;
    translationKey: string;
};

export type EmpoweringAgenciesInfo = {
    title: string;
    description: string;
    value: number;
    suffix?: string;
    maxValue?: number;
    gapValue?: number;
    translationKey: string;
};

export type ConversationInfo = {
    title: string;
    subTitle: string;
    icon: Icon;
    animationPath: string;
    translationKey: string;
};

export type BrandCardInfo = {
    image: string;
    companyName: string;
    description: string;
};

export type QuestionAccordion = {
    question: string;
    answer: string;
};

export type TestimonialType = {
    quote: string;
    name: string;
    jobRole: string;
    companyLogo: string;
    translationKey: string;
};

export type CardType = {
    index: number;
    title: string;
    description: string;
    icon?: string;
    slug?: string;
    highlighted?: string
};

export type LayeredCardProps = {
    index: number;
    value: CaseStudyValue;
    title: string;
    suffix: string;
    isLast: boolean;
};

export type Video = {
    src: string;
    href?: string;
    alt?: string;
};
