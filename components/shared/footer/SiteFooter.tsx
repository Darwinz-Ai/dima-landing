"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import {
  ABOUT_URL,
  CASE_STUDIES_URL,
  CONTACT_EMAIL,
  DEMO_URL,
  INSIGHTS_URL,
  PRIVACY_URL,
  PLATFORMS,
} from "@/constants";

import { cn } from "@/lib/utils";
import { BrandLogo } from "../BrandLogo";
import { Icon } from "../Icon";
import LanguageSwitcher from "../LanguageSwitcher";
import { SOLUTIONS_CONSUMER_INSIGHTS_URL, SOLUTIONS_INFLUENCER_MARKETING_URL, SOLUTIONS_MARKET_INSIGHTS_URL, SOLUTIONS_OWN_INTELLIGENCE_URL, SOLUTIONS_PR_COMMS_URL, SOLUTIONS_SOCIAL_LISTENING_URL } from "@/constants/links";

const FooterColumn = ({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "flex flex-col items-start gap-3.25 [&_a]:text-2.75 [&_a]:leading-normal [&_a]:text-footer-copy [&_a:hover]:text-white [&_p]:text-2.75 [&_p]:leading-normal [&_p]:text-footer-copy",
      className
    )}
  >
    <h3 className="mb-1.75 text-3 font-medium tracking-[.15em] text-footer-label uppercase">
      {title}
    </h3>
    {children}
  </div>
);

export const SiteFooter = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Moved inside the component to access translations dynamically
  const footerGroups = [
    {
      title: t("solutions.title"),
      links: [
        { label: t("solutions.links.prComms.title"), href: SOLUTIONS_PR_COMMS_URL },
        { label: t("solutions.links.marketInsights.title"), href: SOLUTIONS_MARKET_INSIGHTS_URL },
        { label: t("solutions.links.socialListening.title"), href: SOLUTIONS_SOCIAL_LISTENING_URL },
        { label: t("solutions.links.consumerInsights.title"), href: SOLUTIONS_CONSUMER_INSIGHTS_URL },
        { label: t("solutions.links.ownIntelligence.title"), href: SOLUTIONS_OWN_INTELLIGENCE_URL },
        { label: t("solutions.links.influencerMarketing.title"), href: SOLUTIONS_INFLUENCER_MARKETING_URL },
      ],

    },
    {
      // Using resources title for Company/Resources section
      title: t("resources.title"),
      links: [
        { label: t("resources.links.aboutUs.title"), href: ABOUT_URL },
        { label: t("resources.links.caseStudies.title"), href: CASE_STUDIES_URL },
        { label: t("resources.links.blogs.title"), href: INSIGHTS_URL },
        { label: t("dima.requestDemo"), href: DEMO_URL },
      ],
    },
  ];

  return (
    <footer className="bg-ink text-white" dir={isRTL ? "rtl" : "ltr"}>
      <div className="page-container">
        <div className="grid grid-cols-[2fr_1fr_1fr_1.1fr] gap-17.5 pt-20.5 pb-18.75 max-sm:grid-cols-2 max-sm:gap-x-7.5 max-sm:gap-y-12.5 sm:max-md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-md:col-span-full">
            <BrandLogo light />
            <p className="mt-6.25 max-w-72.5 text-4 leading-[1.7] text-footer-copy/80">
              {t("dima.description")}
            </p>

            <div className="mt-6 flex gap-2 flex-wrap">
              {PLATFORMS.filter((p) => p.href !== null).map((social) => (
                <a
                  className="grid size-9 place-items-center border border-night-line text-footer-copy transition-colors hover:border-brand hover:text-brand rounded-sm"
                  href={social.href as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  key={social.label}
                >
                  <Icon icon={social.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {footerGroups.map((group) => (
            <FooterColumn title={group.title} key={group.title}>
              {group.links.map((link) => {
                // If it's a relative URL, use Next-Intl Link. Otherwise standard a tag.
                const isInternal = link.href.startsWith("/");

                return isInternal ? (
                  <Link href={link.href} key={link.label}>
                    {link.label}
                  </Link>
                ) : (
                  <a href={link.href} key={link.label} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                );
              })}
            </FooterColumn>
          ))}

          <FooterColumn title={t("getInTouch.title")} className="max-sm:col-span-full">
            <a href={`mailto:${t("getInTouch.mail") || CONTACT_EMAIL}`}>
              {t("getInTouch.mail") || CONTACT_EMAIL}
            </a>
            <p>{t("locations")}</p>

          </FooterColumn>
        </div>

        <div className="flex items-center gap-7 border-t border-night-line pt-6 pb-7 text-3.5 text-footer-label max-sm:flex-wrap">

          <span>
            {/* If you want to dynamically prepend the year, you can do: © {new Date().getFullYear()} TheDar.AI... */}
            {t("copyright")}
          </span>

          <a href={PRIVACY_URL}>{t("privacyPolicy")}</a>

          {/* Changed ml-auto to ms-auto (margin-inline-start) for correct alignment in RTL */}
          <a className="ms-auto max-sm:ms-0" href="#top">
            {t("backToTop")}
          </a>
        </div>
      </div>
    </footer>
  );
};