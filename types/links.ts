import { Icon } from "@tabler/icons-react";
import { StaticImageData } from "next/image";

export type NavLink = {
    title: string;
    href: string;
    icon?: string;
    translationKey: string;
};

export type SolutionLink = {
    title: string;
    description: string;
    logo: string;
    href: string;
    translationKey: string;
};

export type SocialMediaLink = {
    href: string;
    icon: Icon;
};

export type LanguageLink = {
    locale: string;
    label: string;
    flag: StaticImageData;
};

export type ToolLink = {
    href: string;
    translationKey: string;
};
