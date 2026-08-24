
import {
  ABOUT_URL,
  CASE_STUDIES_URL,
  CONTACT_EMAIL,
  DEMO_URL,
  INSIGHTS_URL,
  PRIVACY_URL,
  PLATFORMS,
} from "@/constants"

import { cn } from "@/lib/utils"
import { BrandLogo } from "../BrandLogo"
import { Icon } from "../Icon"

const footerGroups = [
  {
    title: "Solutions",
    links: [
      { label: "PR & Comms", href: "/#platform" },
      { label: "Market Insights", href: "/#platform" },
      { label: "Social Listening", href: "/#platform" },
      { label: "Consumer Insights", href: "/#platform" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: ABOUT_URL },
      { label: "Case studies", href: CASE_STUDIES_URL },
      { label: "Insights", href: INSIGHTS_URL },
      { label: "Request a demo", href: DEMO_URL },
    ],
  },
]

const FooterColumn = ({
  title,
  className = "",
  children,
}: {
  title: string
  className?: string
  children: React.ReactNode
}) => (
  <div
    className={cn(
      "flex flex-col items-start gap-3.25 [&_a]:text-2.75 [&_a]:leading-normal [&_a]:text-footer-copy [&_a:hover]:text-white [&_p]:text-2.75 [&_p]:leading-normal [&_p]:text-footer-copy",
      className
    )}
  >
    <h3 className="mb-1.75 text-2.5 font-medium tracking-[.15em] text-footer-label uppercase">
      {title}
    </h3>
    {children}
  </div>
)

export const SiteFooter = () => (
  <footer className="bg-ink text-white">
    <div className="page-container">
      <div className="grid grid-cols-[2fr_1fr_1fr_1.1fr] gap-17.5 pt-20.5 pb-18.75 max-sm:grid-cols-2 max-sm:gap-x-7.5 max-sm:gap-y-12.5 sm:max-md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="max-md:col-span-full">
          <BrandLogo light />
          <p className="mt-6.25 max-w-72.5 text-3 leading-[1.7] text-footer-copy/80">
            Your Arabic-first media monitoring and social listening copilot.
          </p>

          <div className="mt-6 flex gap-2">
            {PLATFORMS.filter((p) => p.href !== null).map((social) => (
              <a
                className="grid size-9 place-items-center border border-night-line text-footer-copy transition-colors hover:border-brand hover:text-brand"
                href={social.href}
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
            {group.links.map((link) => (
              <a href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </FooterColumn>
        ))}

        <FooterColumn title="Get in touch" className="max-sm:col-span-full">
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <p>Riyadh · Cairo · Abu Dhabi</p>
        </FooterColumn>
      </div>

      <div className="flex gap-7 border-t border-night-line pt-6 pb-7 text-2.5 text-footer-label max-sm:flex-wrap">
        <span>
          © {new Date().getFullYear()} TheDar.AI. All rights reserved.
        </span>
        <a href={PRIVACY_URL}>Privacy policy</a>
        <a className="ml-auto max-sm:ml-0" href="#top">
          Back to top ↑
        </a>
      </div>
    </div>
  </footer>
)
