import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type BaseSeoKey =
  | "App"
  | "Home"
  | "Blogs"
  | "CaseStudies"
  | "RequestDemo"
  | "Tools"
  | "PrivacyPolicy";

export type ToolsSeoKey =
  | "Tools-stack-consolidation-calculator"
  | "Tools-crisis-readiness-score"
  | "Tools-arabic-dialect"
  | "Tools-arabic-mention-analyzer"
  | "Tools-arabic-coverage-gap-audit";

export type SolutionsSeoKey =
  | "Solutions-social-listening-analytics"
  | "Solutions-pr-comms"
  | "Solutions-market-insights"
  | "Solutions-consumer-insights"
  | "Solutions-own-page-intelligence";

export type SeoKey = BaseSeoKey | ToolsSeoKey | SolutionsSeoKey;

type BuildMetadataOptions = {
  /** Extra metadata fields (e.g. openGraph, twitter, alternates, metadataBase, etc.) */
  overrides?: Metadata;
};

async function getSeoTranslations(locale: string, key: SeoKey) {
  const t = await getTranslations({
    locale,
    namespace: `SEO.${key}`,
  });

  const keywords: string[] = t.raw("keywords");

  return {
    title: t("title"),
    description: t("description"),
    keywords,
  };
}

export async function buildLocalizedMetadata(
  locale: string,
  key: SeoKey,
  { overrides }: BuildMetadataOptions = {}
): Promise<Metadata> {
  const base = await getSeoTranslations(locale, key);

  const metadata: Metadata = {
    title: base.title,
    description: base.description,
    ...(base.keywords ? { keywords: base.keywords } : {}),
    ...(overrides || {}),
  };

  return metadata;
}
